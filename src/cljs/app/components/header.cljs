(ns app.components.header
  (:require [uix.core :as uix :refer [defui $ use-ref use-state]]
            ["lucide-react" :refer [FilePlus FolderOpen Save Download BookOpen MousePointer Square ArrowRight Undo2 Redo2 Trash2 ZoomIn ZoomOut Maximize2 PanelLeftClose PanelLeftOpen PanelRightClose PanelRightOpen PanelBottomClose PanelBottomOpen HelpCircle X]]
            ["app-src/core/store" :refer [store]]
            ["app-src/core/exporter" :refer [exportProjectToJson importProjectFromJson]]
            ["app-src/core/linter" :refer [runIDEF0Linter]]))

(defui header [{:keys [state onOpenExport onOpenHelp onToggleDiagnostics isDiagnosticsOpen]}]
  (let [file-input-ref (use-ref nil)
        [create-modal-open set-create-modal-open] (use-state false)
        active-tool (.-activeTool state)
        zoom (.-zoom state)
        left-open (.-leftPanelOpen state)
        right-open (.-rightPanelOpen state)
        history-len (.-length (.-history state))
        redo-len (.-length (.-redoStack state))
        selected-id (.-selectedObjectId state)
        selected-type (.-selectedObjectType state)
        project (.-project state)
        active-diag-id (.-activeDiagramId state)
        diagrams (when project (.-diagrams project))
        active-diag (when diagrams (.find diagrams (fn [d] (= (.-id d) active-diag-id))))
        is-context (and active-diag
                        (nil? (.-parentBlockId active-diag))
                        (or (= (.-code active-diag) "A0") (= (.-code active-diag) "A-0")))
        is-a0-with-block (and is-context (>= (.-length (.-blocks active-diag)) 1))

        handle-create
        (fn [_]
          (set-create-modal-open true))

        handle-save
        (fn [_]
          (let [issues (if (and project active-diag) (runIDEF0Linter project (.-id active-diag)) #js [])
                critical (.filter issues (fn [i] (= (.-severity i) "error")))]
            (when (> (.-length critical) 0)
              (let [err-list (.join (.map (.slice critical 0 3) (fn [e] (str "• " (.-message e)))) "\n")
                    proceed (js/confirm (str "Внимание: в диаграмме обнаружены критические ошибки линтера ("
                                             (.-length critical) "):\n\n" err-list "\n\nСохранить проект как черновик?"))]
                (when-not proceed
                  (throw (js/Error. "Save cancelled")))))
            (let [json (exportProjectToJson project)
                  blob (js/Blob. #js [json] #js {:type "application/json"})
                  url (.createObjectURL js/URL blob)
                  a (.createElement js/document "a")]
              (set! (.-href a) url)
              (set! (.-download a) (str (or (.-name project) "idef0-project") ".json"))
              (.click a)
              (.revokeObjectURL js/URL url))))

        handle-open-file
        (fn [^js e]
          (let [file (aget (.. e -target -files) 0)]
            (when file
              (let [reader (js/FileReader.)]
                (set! (.-onload reader)
                      (fn [^js evt]
                        (let [content (.. evt -target -result)
                              res (importProjectFromJson content)]
                          (if (and (.-success res) (.-project res))
                            (.importProject store (.-project res))
                            (js/alert (str "Ошибка при открытии проекта: " (.-error res)))))))
                (.readAsText reader file)
                (set! (.. e -target -value) "")))))

        handle-delete
        (fn [_]
          (when selected-id
            (cond
              (= selected-type "block")
              (when (js/confirm "Удалить выбранный функциональный блок и связанные потоки?")
                (.deleteBlock store selected-id))
              (= selected-type "arrow")
              (.deleteArrow store selected-id))))]

    ($ :header.header-bar {:data-testid "header-bar"}
       ($ :input {:type "file"
                  :ref file-input-ref
                  :on-change handle-open-file
                  :accept ".json"
                  :style {:display "none"}})

       ;; File Operations
       ($ :div.header-group
          ($ :button.btn-icon {:on-click handle-create :title "Создать новый проект" :data-testid "btn-create"}
             ($ FilePlus {:size 16}))
          ($ :button.btn-icon {:on-click (fn [_] (when (.-current file-input-ref) (.click (.-current file-input-ref))))
                               :title "Открыть проект JSON" :data-testid "btn-open"}
             ($ FolderOpen {:size 16}))
          ($ :button.btn-icon {:on-click handle-save :title "Сохранить проект в JSON" :data-testid "btn-save"}
             ($ Save {:size 16}))
          ($ :button.btn-icon {:on-click onOpenExport :title "Экспортировать векторный SVG или PNG" :data-testid "btn-export"}
             ($ Download {:size 16}))
          ($ :button.btn-icon {:on-click (fn [_] (.loadExample store)) :title "Загрузить эталонный пример IDEF0" :data-testid "btn-example"}
             ($ BookOpen {:size 16})))

       ($ :div.header-divider)

       ;; Core Tools
       ($ :div.header-group
          ($ :button.btn-icon {:class (when (= active-tool "select") "active")
                               :on-click (fn [_] (.setTool store "select"))
                               :title "Указатель [1 / V] (выбор и перемещение объектов)"
                               :data-testid "tool-select"}
             ($ MousePointer {:size 16}))
          ($ :button.btn-icon {:class (str (when (= active-tool "block") "active ")
                                           (when is-a0-with-block "opacity-40 cursor-not-allowed"))
                               :on-click (fn [_] (when-not is-a0-with-block (.setTool store "block")))
                               :disabled is-a0-with-block
                               :title (if is-a0-with-block
                                        "Блок: На контекстной диаграмме A0 допускается только один функциональный блок по стандарту IDEF0"
                                        "Блок [2 / B] (создание функционального блока)")
                               :data-testid "tool-block"}
             ($ Square {:size 16}))
          ($ :button.btn-icon {:class (when (= active-tool "arrow") "active")
                               :on-click (fn [_] (.setTool store "arrow"))
                               :title "Стрелка [3 / A] (проведение связей и потоков)"
                               :data-testid "tool-arrow"}
             ($ ArrowRight {:size 16})))

       ($ :div.header-divider)

       ;; Undo, Redo, Delete
       ($ :div.header-group
          ($ :button.btn-icon {:on-click (fn [_] (.undo store))
                               :disabled (zero? history-len)
                               :title "Отменить действие (Ctrl+Z)"
                               :data-testid "btn-undo"}
             ($ Undo2 {:size 16}))
          ($ :button.btn-icon {:on-click (fn [_] (.redo store))
                               :disabled (zero? redo-len)
                               :title "Повторить действие (Ctrl+Y)"
                               :data-testid "btn-redo"}
             ($ Redo2 {:size 16}))
          ($ :button.btn-icon {:on-click handle-delete
                               :disabled (nil? selected-id)
                               :title "Удалить выбранный объект (Delete / Backspace)"
                               :data-testid "btn-delete"}
             ($ Trash2 {:size 16})))

       ($ :div.header-divider)

       ;; Zoom
       ($ :div.header-group
          ($ :button.btn-icon {:on-click (fn [_] (.setZoom store (- zoom 0.1)))
                               :title "Уменьшить" :data-testid "btn-zoom-out"}
             ($ ZoomOut {:size 16}))
          ($ :span {:style {:font-size "11px" :min-width "42px" :text-align "center" :font-family "monospace"}}
             (str (Math/round (* zoom 100)) "%"))
          ($ :button.btn-icon {:on-click (fn [_] (.setZoom store (+ zoom 0.1)))
                               :title "Увеличить" :data-testid "btn-zoom-in"}
             ($ ZoomIn {:size 16}))
          ($ :button.btn-icon {:on-click (fn [_] (.setZoom store 1.0))
                               :title "Масштаб 100%" :data-testid "btn-zoom-100"}
             ($ Maximize2 {:size 16})))

       ($ :div.header-divider)
       ($ :div {:style {:flex 1}})

       ;; Panels & Help
       ($ :div.header-group
          ($ :button.btn-icon {:on-click onOpenHelp :title "Справка и горячие клавиши (? / F1)" :data-testid "btn-help"}
             ($ HelpCircle {:size 16}))
          ($ :button.btn-icon {:class (when left-open "active")
                               :on-click (fn [_] (.toggleLeftPanel store))
                               :title (if left-open "Скрыть дерево диаграмм" "Показать дерево диаграмм")
                               :data-testid "btn-toggle-left"}
             (if left-open ($ PanelLeftClose {:size 16}) ($ PanelLeftOpen {:size 16})))
          (when onToggleDiagnostics
            ($ :button.btn-icon {:class (when isDiagnosticsOpen "active")
                                 :on-click onToggleDiagnostics
                                 :title (if isDiagnosticsOpen "Скрыть нижнюю панель диагностики" "Показать нижнюю панель диагностики")
                                 :data-testid "btn-toggle-bottom"}
               (if isDiagnosticsOpen ($ PanelBottomClose {:size 16}) ($ PanelBottomOpen {:size 16}))))
          ($ :button.btn-icon {:class (when right-open "active")
                               :on-click (fn [_] (.toggleRightPanel store))
                               :title (if right-open "Скрыть панель свойств" "Показать панель свойств")
                               :data-testid "btn-toggle-right"}
             (if right-open ($ PanelRightClose {:size 16}) ($ PanelRightOpen {:size 16}))))

       ;; Custom Modal Dialog: Create New Project
       (when create-modal-open
         ($ :div.modal-backdrop {:data-testid "new-project-modal"
                                 :style {:position "fixed" :top 0 :left 0 :right 0 :bottom 0
                                         :background "rgba(0, 0, 0, 0.55)" :z-index 9999
                                         :display "flex" :align-items "center" :justify-content "center"
                                         :backdrop-filter "blur(2px)"}}
            ($ :div.modal-dialog {:style {:width "100%" :max-width "480px"
                                          :background "var(--bg-panel)"
                                          :border "1px solid var(--border-color)"
                                          :border-radius "8px"
                                          :box-shadow "0 16px 36px rgba(0,0,0,0.3)"
                                          :overflow "hidden"}}
               ($ :div.modal-header {:style {:display "flex" :align-items "center" :justify-content "space-between"
                                             :padding "16px 20px" :border-bottom "1px solid var(--border-color)"
                                             :background "var(--bg-panel-header)"}}
                  ($ :div {:style {:display "flex" :align-items "center" :gap "10px"
                                   :font-weight 600 :font-size "15px" :color "var(--text-primary)"}}
                     ($ FilePlus {:size 18 :color "var(--accent-primary)"})
                     ($ :span "Создать новый проект"))
                  ($ :button.btn-icon {:on-click (fn [_] (set-create-modal-open false))
                                       :data-testid "btn-close-new-project-modal"
                                       :title "Закрыть"}
                     ($ X {:size 16})))
               ($ :div.modal-body {:style {:padding "20px" :font-size "13px" :line-height "1.6" :color "var(--text-secondary)"}}
                  ($ :p {:style {:margin "0 0 8px 0" :font-size "14px" :color "var(--text-primary)" :font-weight 500}}
                     "Вы действительно хотите создать новый проект?")
                  ($ :p {:style {:margin 0 :font-size "12px" :color "var(--text-muted)"}}
                     "Все несохраненные изменения текущей модели будут удалены. Будет инициализирован чистый проект с контекстной диаграммой."))
               ($ :div.modal-footer {:style {:display "flex" :align-items "center" :justify-content "flex-end" :gap "10px"
                                             :padding "14px 20px" :border-top "1px solid var(--border-color)"
                                             :background "var(--bg-panel-header)"}}
                  ($ :button.btn {:on-click (fn [_] (set-create-modal-open false))
                                  :data-testid "btn-cancel-new-project"
                                  :style {:padding "7px 16px" :font-size "13px"}}
                     "Отмена")
                  ($ :button.btn.btn-primary {:on-click (fn [_]
                                                          (set-create-modal-open false)
                                                          (.resetProject store))
                                             :data-testid "btn-confirm-new-project"
                                             :style {:padding "7px 18px" :font-size "13px" :font-weight 500}}
                     "Создать проект"))))))))
