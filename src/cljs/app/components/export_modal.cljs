(ns app.components.export-modal
  (:require [uix.core :as uix :refer [defui $ use-state use-memo]]
            ["lucide-react" :refer [X Download FileCode Image Eye FolderArchive]]
            ["app-src/core/exporter" :refer [exportDiagramToSvg exportSvgToPngBlob exportDiagramsToZip]]
            ["app-src/core/geometry" :refer [getBlockCode]]))

(defui export-modal [{:keys [state onClose]}]
  (let [project (.-project state)
        active-diagram-id (.-activeDiagramId state)
        diagrams (if project (.-diagrams project) #js [])
        [format set-format] (use-state "svg")
        [selected-ids set-selected-ids] (use-state (into #{} (map #(.-id %) (array-seq diagrams))))
        [preview-diag-id set-preview-diag-id] (use-state (or active-diagram-id (when-let [d (aget diagrams 0)] (.-id d)) ""))
        [is-exporting set-is-exporting] (use-state false)

        preview-diag (use-memo
                      (fn []
                        (or (.find diagrams (fn [d] (= (.-id d) preview-diag-id)))
                            (aget diagrams 0)
                            nil))
                      [diagrams preview-diag-id])

        preview-svg (use-memo
                     (fn []
                       (if preview-diag
                         (exportDiagramToSvg preview-diag)
                         ""))
                     [preview-diag])

        toggle-diag
        (fn [diag-id]
          (set-selected-ids (fn [prev]
                              (if (contains? prev diag-id)
                                (disj prev diag-id)
                                (conj prev diag-id)))))

        select-all
        (fn []
          (set-selected-ids (into #{} (map #(.-id %) (array-seq diagrams)))))

        deselect-all
        (fn []
          (set-selected-ids #{}))

        handle-download
        (fn []
          (let [chosen (.filter diagrams (fn [d] (contains? selected-ids (.-id d))))]
            (when (> (.-length chosen) 0)
              (set-is-exporting true)
              (-> (js/Promise.resolve)
                  (.then
                   (fn []
                     (if (= (.-length chosen) 1)
                       (let [diag (aget chosen 0)
                             safe-title (-> (or (.-title diag) "diagram")
                                            (.replace #"[/\\:*?\"<>|]" "_")
                                            (.substring 0 (min 40 (count (or (.-title diag) "diagram")))))
                             file-name (str (.-code diag) "_" safe-title)]
                         (if (= format "svg")
                           (let [svg-content (exportDiagramToSvg diag)
                                 blob (js/Blob. #js [svg-content] #js {:type "image/svg+xml;charset=utf-8"})
                                 url (.createObjectURL js/URL blob)
                                 a (.createElement js/document "a")]
                             (set! (.-href a) url)
                             (set! (.-download a) (str file-name ".svg"))
                             (.click a)
                             (.revokeObjectURL js/URL url))
                           (-> (exportSvgToPngBlob (exportDiagramToSvg diag) 2)
                               (.then (fn [png-blob]
                                        (let [url (.createObjectURL js/URL png-blob)
                                              a (.createElement js/document "a")]
                                          (set! (.-href a) url)
                                          (set! (.-download a) (str file-name ".png"))
                                          (.click a)
                                          (.revokeObjectURL js/URL url)))))))
                       ;; Multiple diagrams -> zip
                       (-> (exportDiagramsToZip chosen format)
                           (.then (fn [zip-blob]
                                    (let [url (.createObjectURL js/URL zip-blob)
                                          a (.createElement js/document "a")
                                          safe-proj (-> (or (.-name project) "idef0-project")
                                                        (.replace #"[/\\:*?\"<>|]" "_"))]
                                      (set! (.-href a) url)
                                      (set! (.-download a) (str safe-proj "_" format "_diagrams.zip"))
                                      (.click a)
                                      (.revokeObjectURL js/URL url))))))))
                  (.then (fn [] (onClose)))
                  (.catch (fn [err] (js/alert (str "Ошибка при экспорте: " (or (.-message err) err)))))
                  (.finally (fn [] (set-is-exporting false)))))))

        selected-count (count selected-ids)]

    ($ :div.modal-backdrop {:data-testid "export-modal" :id "import-export-modal"}
       ($ :div.modal-dialog
          {:data-testid "import-export-modal"
           :style {:width "940px" :max-width "95vw" :height "620px" :max-height "92vh"
                   :display "flex" :flex-direction "column"}}
          ;; Header
          ($ :div.modal-header
             ($ :div {:style {:display "flex" :align-items "center" :gap "8px"}}
                ($ Download {:size 18 :color "#2563eb"})
                ($ :span {:style {:font-weight 600 :font-size "15px"}} "Экспорт диаграмм IDEF0"))
             ($ :button.btn-icon {:on-click onClose :data-testid "btn-close-modal"}
                ($ X {:size 16})))

          ;; Body
          ($ :div.modal-body
             {:style {:flex 1 :display "grid" :grid-template-columns "360px 1fr"
                      :gap "16px" :padding "16px" :overflow "hidden"}}
             ;; Left Column
             ($ :div {:style {:display "flex" :flex-direction "column" :gap "14px" :overflow-y "auto"}}
                ;; Format Selection
                ($ :div.form-group {:style {:margin-bottom 0}}
                   ($ :label.form-label {:style {:font-weight 600}} "Формат графики")
                   ($ :div {:style {:display "grid" :grid-template-columns "1fr 1fr" :gap "8px"}}
                      ($ :button.btn-tool {:class (when (= format "svg") "active")
                                           :on-click (fn [_] (set-format "svg"))
                                           :style {:justify-content "center" :gap "6px" :height "36px"}
                                           :data-testid "export-format-svg"}
                         ($ FileCode {:size 16})
                         ($ :span "Векторный SVG"))
                      ($ :button.btn-tool {:class (when (= format "png") "active")
                                           :on-click (fn [_] (set-format "png"))
                                           :style {:justify-content "center" :gap "6px" :height "36px"}
                                           :data-testid "export-format-png"}
                         ($ Image {:size 16})
                         ($ :span "Растровый PNG (2x)"))))

                ;; Diagram Selection
                ($ :div.form-group {:style {:flex 1 :display "flex" :flex-direction "column" :margin-bottom 0}}
                   ($ :div {:style {:display "flex" :align-items "center" :justify-content "space-between" :margin-bottom "6px"}}
                      ($ :label.form-label {:style {:font-weight 600 :margin 0}}
                         (str "Диаграммы (" selected-count " из " (.-length diagrams) ")"))
                      ($ :div {:style {:display "flex" :gap "6px"}}
                         ($ :button {:on-click select-all
                                     :style {:background "none" :border "none" :color "var(--accent-primary, #2563eb)"
                                             :font-size "11px" :cursor "pointer" :padding 0}}
                            "Выбрать все")
                         ($ :span {:style {:color "var(--text-muted)"}} "|")
                         ($ :button {:on-click deselect-all
                                     :style {:background "none" :border "none" :color "var(--text-muted)"
                                             :font-size "11px" :cursor "pointer" :padding 0}}
                            "Снять все")))

                   ;; Diagram items list
                   ($ :div {:style {:flex 1 :overflow-y "auto" :border "1px solid var(--border-color, #e2e8f0)"
                                   :border-radius "6px" :background "var(--bg-card, #f8fafc)"
                                   :padding "4px" :display "flex" :flex-direction "column" :gap "4px"}}
                      (for [diag (array-seq diagrams)]
                        (let [diag-id (.-id diag)
                              diag-code (.-code diag)
                              diag-title (.-title diag)
                              is-checked (contains? selected-ids diag-id)
                              is-previewing (= preview-diag-id diag-id)
                              is-context (nil? (.-parentBlockId diag))
                              block-names (.join (.map (.-blocks diag) (fn [b] (getBlockCode diag-code (.-nodeNumber b)))) ", ")]
                          ($ :div {:key diag-id
                                   :style {:display "flex" :align-items "center" :justify-content "space-between"
                                           :padding "6px 8px" :border-radius "5px"
                                           :background (if is-previewing "#eff6ff" "#ffffff")
                                           :border (if is-previewing "1px solid #93c5fd" "1px solid var(--border-color, #e2e8f0)")
                                           :cursor "pointer"}
                                   :on-click (fn [_] (set-preview-diag-id diag-id))
                                   :data-testid (str "export-diag-item-" diag-code)}
                             ($ :div {:style {:display "flex" :align-items "center" :gap "8px" :flex 1 :min-width 0}}
                                ($ :input {:type "checkbox"
                                           :checked is-checked
                                           :on-change (fn [^js e]
                                                        (.stopPropagation e)
                                                        (toggle-diag diag-id))
                                           :on-click (fn [^js e] (.stopPropagation e))
                                           :style {:cursor "pointer" :width "15px" :height "15px" :accent-color "#2563eb"}
                                           :data-testid (str "checkbox-diag-" diag-code)})
                                ($ :span {:style {:font-family "monospace" :font-weight 700 :font-size "11px"
                                                  :background (if is-checked "#2563eb" "#94a3b8")
                                                  :color "#ffffff" :padding "1px 5px" :border-radius "4px"}}
                                   diag-code)
                                ($ :div {:style {:display "flex" :flex-direction "column" :min-width 0 :flex 1}}
                                   ($ :span {:style {:font-size "12px" :font-weight 500 :color "var(--text-primary, #0f172a)"
                                                     :overflow "hidden" :text-overflow "ellipsis" :white-space "nowrap"}
                                             :title diag-title}
                                      (.replace diag-title #"^(Контекстная диаграмма:\s*|Декомпозиция:\s*)" ""))
                                   ($ :span {:style {:font-size "10px" :color "var(--text-muted, #64748b)"}}
                                      (if is-context "Контекстный блок A0" (str "Блоки диаграммы: " block-names)))))

                             ($ :button.btn-icon
                                {:style {:width "22px" :height "22px" :padding 0 :opacity (if is-previewing 1 0.6)}
                                 :on-click (fn [^js e]
                                             (.stopPropagation e)
                                             (set-preview-diag-id diag-id))
                                 :title "Предпросмотр этой диаграммы"}
                                ($ Eye {:size 13 :color (if is-previewing "#2563eb" "currentColor")})))))))

                ;; Summary info
                ($ :div {:style {:font-size "11px" :color "var(--text-secondary, #475569)"
                                 :background "var(--bg-card, #f8fafc)" :padding "8px 10px"
                                 :border-radius "6px" :border "1px solid var(--border-color, #e2e8f0)"
                                 :display "flex" :align-items "center" :gap "6px"}}
                   (cond
                     (> selected-count 1)
                     ($ :<>
                        ($ FolderArchive {:size 14 :color "#2563eb"})
                        ($ :span (str "Будет скачан ZIP-архив (" selected-count " файлов ." format ")")))

                     (= selected-count 1)
                     ($ :<>
                        ($ Download {:size 14 :color "#16a34a"})
                        ($ :span (str "Будет скачан 1 файл ." format)))

                     :else
                     ($ :span {:style {:color "#dc2626"}} "Выберите хотя бы одну диаграмму для экспорта")))

                ;; Action buttons
                ($ :div {:style {:display "flex" :gap "8px"}}
                   ($ :button.btn-tool.primary
                      {:disabled (or (zero? selected-count) is-exporting)
                       :on-click handle-download
                       :style {:flex 1 :justify-content "center" :height "36px" :font-weight 600}
                       :data-testid "btn-do-export"}
                      ($ Download {:size 16})
                      ($ :span (if is-exporting
                                 "Экспорт..."
                                 (if (> selected-count 1)
                                   (str "Скачать ZIP (" selected-count ")")
                                   (str "Скачать ." (.toUpperCase format))))))
                   ($ :button.btn-tool {:on-click onClose :style {:height "36px"}}
                      "Отмена")))

             ;; Right Column: Live SVG Preview
             ($ :div {:style {:display "flex" :flex-direction "column"
                              :border "1px solid var(--border-color, #cbd5e1)"
                              :border-radius "8px" :background "#ffffff" :overflow "hidden"}}
                ($ :div {:style {:padding "6px 12px" :background "var(--bg-card, #f8fafc)"
                                 :border-bottom "1px solid var(--border-color, #e2e8f0)"
                                 :display "flex" :align-items "center" :justify-content "space-between"
                                 :font-size "12px" :font-weight 600 :color "var(--text-primary, #0f172a)"}}
                   ($ :span (str "Предпросмотр: [" (when preview-diag (.-code preview-diag)) "] "
                                 (when preview-diag (.-title preview-diag))))
                   ($ :span {:style {:font-size "11px" :color "var(--text-muted)" :font-weight 400}}
                      "1600 × 900 px"))

                ($ :div {:style {:flex 1 :display "flex" :align-items "center" :justify-content "center"
                                 :padding "8px" :background "#f1f5f9" :overflow "hidden"}}
                   (if (and preview-svg (> (count preview-svg) 0))
                     ($ :div {:style {:width "100%" :height "100%" :display "flex"
                                      :align-items "center" :justify-content "center"
                                      :background "#ffffff" :box-shadow "0 2px 8px rgba(0,0,0,0.06)"
                                      :border-radius "4px" :overflow "hidden"}
                              :dangerouslySetInnerHTML {:__html preview-svg}})
                     ($ :div {:style {:color "var(--text-muted)"}}
                        "Нет данных для отображения")))))))))
