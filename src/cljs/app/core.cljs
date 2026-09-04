(ns app.core
  (:require [uix.core :as uix :refer [defui $ use-state use-effect]]
            [app.components.header :refer [header]]
            [app.components.status-bar :refer [status-bar]]
            [app.components.help-modal :refer [help-modal]]
            [app.components.diagnostics :refer [diagnostics-panel]]
            [app.components.tree :refer [tree]]
            [app.components.inspector :refer [inspector]]
            [app.components.export-modal :refer [export-modal]]
            [app.components.canvas :refer [canvas]]
            ["app-src/core/store" :refer [store]]
            ["app-src/core/linter" :refer [runIDEF0Linter]]
            ["lucide-react" :refer [ChevronLeft ChevronRight]]))

;; Register linter globally for debugging/e2e
(set! (.-__IDEF0_LINTER__ js/window) runIDEF0Linter)

(defui app [_props]
  (let [[state set-state] (use-state (.getState store))
        [cursor-pos set-cursor-pos] (use-state #js {:x 0 :y 0})
        [export-open set-export-open] (use-state false)
        [help-open set-help-open] (use-state false)
        [diagnostics-open set-diagnostics-open] (use-state false)]

    ;; Subscribe to store updates
    (use-effect
     (fn []
       (let [unsub (.subscribe store (fn [new-state]
                                       (set-state (js/Object.assign #js {} new-state))))]
         (fn [] (unsub))))
     [])

    ;; Global Keyboard Shortcuts
    (use-effect
     (fn []
       (let [handle-key-down
             (fn [^js e]
               (let [key (.-key e)
                     active-el (.-activeElement js/document)
                     tag-name (when active-el (.-tagName active-el))]
                 (cond
                   (or (= key "?") (= key "F1"))
                   (do
                     (.preventDefault e)
                     (set-help-open true))

                   (or (= tag-name "INPUT") (= tag-name "TEXTAREA"))
                   nil

                   (and (or (.-ctrlKey e) (.-metaKey e)) (= (.toLowerCase key) "z"))
                   (do
                     (.preventDefault e)
                     (if (.-shiftKey e)
                       (.redo store)
                       (.undo store)))

                   (and (or (.-ctrlKey e) (.-metaKey e)) (= (.toLowerCase key) "y"))
                   (do
                     (.preventDefault e)
                     (if (.-shiftKey e)
                       (.redo store)
                       (.redo store)))

                   (or (= key "Delete") (= key "Backspace"))
                   (when (.-selectedObjectId state)
                     (.preventDefault e)
                     (let [obj-id (.-selectedObjectId state)
                           obj-type (.-selectedObjectType state)]
                       (cond
                         (= obj-type "block") (.deleteBlock store obj-id)
                         (= obj-type "arrow") (.deleteArrow store obj-id))))

                   (= key "Escape")
                   (do
                     (set-help-open false)
                     (set-export-open false)
                     (.selectObject store nil nil))

                   (= key "1") (.setTool store "select")
                   (= key "2") (.setTool store "block")
                   (= key "3") (.setTool store "arrow")
                   (or (= key "v") (= key "V")) (.setTool store "select")
                   (or (= key "b") (= key "B")) (.setTool store "block")
                   (or (= key "a") (= key "A")) (.setTool store "arrow")
                   (or (= key "=") (= key "+")) (.setZoom store (+ (.-zoom state) 0.1))
                   (= key "-") (.setZoom store (- (.-zoom state) 0.1))
                   (= key "0") (.setZoom store 1.0))))]
         (.addEventListener js/window "keydown" handle-key-down)
         (fn [] (.removeEventListener js/window "keydown" handle-key-down))))
     [(.-selectedObjectId state) (.-selectedObjectType state)])

    ($ :div.app-container
       ($ header {:state state
                  :onOpenExport (fn [& _] (set-export-open true))
                  :onOpenHelp (fn [& _] (set-help-open true))
                  :onToggleDiagnostics (fn [& _] (set-diagnostics-open (not diagnostics-open)))
                  :isDiagnosticsOpen diagnostics-open})

       ($ :div.workspace-container {:style {:position "relative"}}
          ($ tree {:state state})

          (when-not (.-leftPanelOpen state)
            ($ :button.btn-icon.floating-edge-tab.left
               {:style {:position "absolute" :left 0 :top "50%" :transform "translateY(-50%)"
                        :z-index 40 :background "var(--bg-panel)" :border "1px solid var(--border-color)"
                        :border-left "none" :border-radius "0 6px 6px 0" :padding "8px 2px"
                        :box-shadow "2px 0 8px rgba(0,0,0,0.1)" :cursor "pointer"}
                :on-click (fn [_] (.toggleLeftPanel store))
                :title "Показать дерево диаграмм"
                :data-testid "btn-floating-left-toggle"}
               ($ ChevronRight {:size 14})))

          ($ canvas {:state state
                     :onCursorChange set-cursor-pos})

          (when-not (.-rightPanelOpen state)
            ($ :button.btn-icon.floating-edge-tab.right
               {:style {:position "absolute" :right 0 :top "50%" :transform "translateY(-50%)"
                        :z-index 40 :background "var(--bg-panel)" :border "1px solid var(--border-color)"
                        :border-right "none" :border-radius "6px 0 0 6px" :padding "8px 2px"
                        :box-shadow "-2px 0 8px rgba(0,0,0,0.1)" :cursor "pointer"}
                :on-click (fn [_] (.toggleRightPanel store))
                :title "Показать панель свойств"
                :data-testid "btn-floating-right-toggle"}
               ($ ChevronLeft {:size 14})))

          ($ inspector {:state state}))

       (when diagnostics-open
         ($ diagnostics-panel {:state state
                               :onClose (fn [& _] (set-diagnostics-open false))}))

       ($ status-bar {:state state
                      :cursorPos cursor-pos
                      :onToggleDiagnostics (fn [& _] (set-diagnostics-open (not diagnostics-open)))
                      :isDiagnosticsOpen diagnostics-open})

       (when export-open
         ($ export-modal {:state state
                          :isOpen export-open
                          :onClose (fn [& _] (set-export-open false))}))

       (when help-open
         ($ help-modal {:onClose (fn [& _] (set-help-open false))})))))
