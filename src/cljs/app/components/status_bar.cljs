(ns app.components.status-bar
  (:require [uix.core :as uix :refer [defui $]]
            ["lucide-react" :refer [XCircle AlertTriangle]]
            ["app-src/core/linter" :refer [runIDEF0Linter]]))

(defui status-bar [{:keys [state cursorPos onToggleDiagnostics isDiagnosticsOpen]}]
  (let [project (.-project state)
        active-id (.-activeDiagramId state)
        autosave-status (.-autosaveStatus state)
        diagrams (when project (.-diagrams project))
        diag (when diagrams (.find diagrams (fn [d] (= (.-id d) active-id))))
        issues (if (and project diag) (runIDEF0Linter project (.-id diag)) #js [])
        errors (.-length (.filter issues (fn [i] (= (.-severity i) "error"))))
        warnings (.-length (.filter issues (fn [i] (= (.-severity i) "warning"))))
        x (Math/round (or (.-x cursorPos) 0))
        y (Math/round (or (.-y cursorPos) 0))]
    ($ :footer.status-bar {:data-testid "status-bar"
                           :style {:display "flex"
                                   :align-items "center"
                                   :justify-content "space-between"
                                   :padding "0 12px"}}
       ;; Left side: Diagnostics badges
       ($ :div {:style {:display "flex" :align-items "center" :gap "8px"}}
          ($ :div.status-item
             {:data-testid "status-linter"
              :on-click onToggleDiagnostics
              :style {:cursor (if onToggleDiagnostics "pointer" "default")
                      :user-select "none"
                      :display "flex"
                      :align-items "center"
                      :gap "10px"
                      :padding "2px 8px"
                      :border-radius "4px"
                      :background (if isDiagnosticsOpen "var(--bg-hover, #f1f5f9)" "transparent")
                      :outline (if isDiagnosticsOpen "1px solid var(--accent-primary, #2563eb)" "none")}
              :title "Открыть / закрыть панель диагностики правил IDEF0"}
             ($ :div {:data-testid "status-error-badge"
                      :style {:display "flex"
                              :align-items "center"
                              :gap "4px"
                              :color (if (> errors 0) "#ef4444" "var(--text-secondary, #64748b)")
                              :font-weight 600
                              :font-size "12px"}}
                ($ XCircle {:size 14 :style {:color (if (> errors 0) "#ef4444" "#94a3b8")}})
                ($ :span errors))
             ($ :div {:data-testid "status-warning-badge"
                      :style {:display "flex"
                              :align-items "center"
                              :gap "4px"
                              :color (if (> warnings 0) "#f59e0b" "var(--text-secondary, #64748b)")
                              :font-weight 600
                              :font-size "12px"}}
                ($ AlertTriangle {:size 14 :style {:color (if (> warnings 0) "#f59e0b" "#94a3b8")}})
                ($ :span warnings))))

       ;; Right side: Coordinates & Autosave
       ($ :div {:style {:display "flex" :align-items "center" :gap "16px"}}
          ($ :div.status-item {:data-testid "status-coords"
                               :style {:font-family "monospace" :font-size "11px"}}
             ($ :span (str "X: " x ", Y: " y)))
          ($ :div.status-item {:data-testid "status-autosave"}
             ($ :span.status-badge {:class (if (= autosave-status "saved") "success" "warning")}
                (if (= autosave-status "saved") "Сохранено" "Сохранение...")))))))
