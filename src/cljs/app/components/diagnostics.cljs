(ns app.components.diagnostics
  (:require [uix.core :as uix :refer [defui $ use-state]]
            ["lucide-react" :refer [AlertCircle AlertTriangle CheckCircle2 X ExternalLink ShieldCheck]]
            ["app-src/core/store" :refer [store]]
            ["app-src/core/linter" :refer [runIDEF0Linter]]))

(defui diagnostics-panel [{:keys [state onClose]}]
  (let [[filter set-filter] (use-state "all")
        project (.-project state)
        active-id (.-activeDiagramId state)
        diagrams (when project (.-diagrams project))
        diag (when diagrams (.find diagrams (fn [d] (= (.-id d) active-id))))
        issues (if (and project diag) (runIDEF0Linter project (.-id diag)) #js [])
        errors (.-length (.filter issues (fn [i] (= (.-severity i) "error"))))
        warnings (.-length (.filter issues (fn [i] (= (.-severity i) "warning"))))
        filtered (cond
                   (= filter "error") (.filter issues (fn [i] (= (.-severity i) "error")))
                   (= filter "warning") (.filter issues (fn [i] (= (.-severity i) "warning")))
                   :else issues)]
    ($ :div.diagnostics-panel {:data-testid "diagnostics-panel"
                               :style {:width "100%"
                                       :height "220px"
                                       :max-height "35vh"
                                       :background "var(--bg-panel, #ffffff)"
                                       :border-top "2px solid var(--border-color, #e2e8f0)"
                                       :box-shadow "0 -4px 16px rgba(0, 0, 0, 0.06)"
                                       :display "flex"
                                       :flex-direction "column"
                                       :flex-shrink 0
                                       :z-index 20}}
       ;; Header
       ($ :div {:style {:display "flex" :align-items "center" :justify-content "space-between"
                        :padding "8px 16px" :border-bottom "1px solid var(--border-color, #e2e8f0)"
                        :background "var(--bg-card, #f8fafc)"}}
          ($ :div {:style {:display "flex" :align-items "center" :gap "12px"}}
             ($ :div {:style {:display "flex" :align-items "center" :gap "6px"
                              :font-weight 600 :font-size "13px" :color "var(--text-primary, #0f172a)"}}
                ($ ShieldCheck {:size 16 :color "#2563eb"})
                ($ :span "Диагностика"))
             ($ :div {:style {:display "flex" :gap "4px"}}
                ($ :button {:on-click (fn [_] (set-filter "all"))
                            :style {:padding "2px 8px" :font-size "11px" :border-radius "4px"
                                    :border "1px solid var(--border-color, #cbd5e1)"
                                    :background (if (= filter "all") "#2563eb" "transparent")
                                    :color (if (= filter "all") "#ffffff" "var(--text-secondary, #475569)")
                                    :cursor "pointer" :font-weight (if (= filter "all") 600 400)}}
                   (str "Все (" (.-length issues) ")"))
                ($ :button {:on-click (fn [_] (set-filter "error"))
                            :style {:padding "2px 8px" :font-size "11px" :border-radius "4px"
                                    :border "1px solid var(--border-color, #cbd5e1)"
                                    :background (if (= filter "error") "#dc2626" "transparent")
                                    :color (if (= filter "error") "#ffffff" "var(--text-secondary, #475569)")
                                    :cursor "pointer" :font-weight (if (= filter "error") 600 400)}}
                   (str "Ошибки (" errors ")"))
                ($ :button {:on-click (fn [_] (set-filter "warning"))
                            :style {:padding "2px 8px" :font-size "11px" :border-radius "4px"
                                    :border "1px solid var(--border-color, #cbd5e1)"
                                    :background (if (= filter "warning") "#d97706" "transparent")
                                    :color (if (= filter "warning") "#ffffff" "var(--text-secondary, #475569)")
                                    :cursor "pointer" :font-weight (if (= filter "warning") 600 400)}}
                   (str "Предупреждения (" warnings ")"))))

          ($ :button.btn-icon {:on-click onClose :title "Закрыть панель диагностики"
                               :data-testid "btn-close-diagnostics"
                               :style {:width "24px" :height "24px" :padding "2px"}}
             ($ X {:size 16})))

       ;; Body
       ($ :div {:style {:flex 1 :overflow-y "auto" :padding "10px 16px"}}
          (cond
            (zero? (.-length issues))
            ($ :div {:style {:display "flex" :flex-direction "column" :align-items "center"
                             :justify-content "center" :height "100%" :gap "6px"
                             :color "var(--text-muted, #64748b)"}}
               ($ CheckCircle2 {:size 28 :color "#16a34a"})
               ($ :div {:style {:font-weight 600 :color "#16a34a" :font-size "13px"}}
                  "Все правила соблюдены"))

            (zero? (.-length filtered))
            ($ :div {:style {:text-align "center" :padding "24px" :color "var(--text-muted, #64748b)" :font-size "13px"}}
               "Нет замечаний в выбранной категории")

            :else
            ($ :div {:style {:display "flex" :flex-direction "column" :gap "8px"}}
               (map-indexed
                (fn [idx issue]
                  (let [is-err (= (.-severity issue) "error")]
                    ($ :div {:key idx
                             :data-testid (str "diagnostic-item-" idx)
                             :style {:display "flex" :align-items "flex-start" :justify-content "space-between"
                                     :gap "12px" :padding "8px 12px" :border-radius "6px"
                                     :background (if is-err "rgba(239, 68, 68, 0.06)" "rgba(245, 158, 11, 0.06)")
                                     :border (str "1px solid " (if is-err "rgba(239, 68, 68, 0.2)" "rgba(245, 158, 11, 0.2)"))}}
                       ($ :div {:style {:display "flex" :align-items "flex-start" :gap "8px" :flex 1}}
                          ($ :div {:style {:margin-top "2px"}}
                             (if is-err
                               ($ AlertCircle {:size 16 :color "#dc2626"})
                               ($ AlertTriangle {:size 16 :color "#d97706"})))
                          ($ :div {:style {:display "flex" :flex-direction "column" :gap "2px"}}
                             ($ :div {:style {:display "flex" :align-items "center" :gap "6px"}}
                                ($ :span {:style {:font-family "monospace" :font-size "10px" :font-weight 700
                                                  :padding "1px 5px" :border-radius "3px"
                                                  :background (if is-err "#fee2e2" "#fef3c7")
                                                  :color (if is-err "#991b1b" "#92400e")}}
                                   (.-ruleId issue))
                                ($ :span {:style {:font-size "12px" :font-weight 600 :color "var(--text-primary, #0f172a)"}}
                                   (if is-err "Ошибка" "Предупреждение")))
                             ($ :div {:style {:font-size "12px" :color "var(--text-secondary, #334155)" :line-height 1.4}}
                                (.-message issue))))

                       (when (or (.-blockId issue) (.-arrowId issue))
                         ($ :button.btn-tool
                            {:on-click (fn [_]
                                         (if (.-blockId issue)
                                           (.selectObject store (.-blockId issue) "block")
                                           (.selectObject store (.-arrowId issue) "arrow")))
                             :style {:padding "3px 8px" :font-size "11px" :white-space "nowrap"}
                             :title "Выделить объект на холсте"}
                            ($ ExternalLink {:size 12})
                            ($ :span "Показать"))))))
                (js->clj filtered))))))))
