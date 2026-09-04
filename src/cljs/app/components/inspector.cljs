(ns app.components.inspector
  (:require [uix.core :as uix :refer [defui $ use-state use-effect use-ref]]
            ["lucide-react" :refer [Sliders X]]
            ["app-src/core/store" :refer [store]]
            ["app-src/components/inspector/ProjectInspector" :default ProjectInspector]
            ["app-src/components/inspector/BlockInspector" :default BlockInspector]
            ["app-src/components/inspector/ArrowInspector" :default ArrowInspector]))

(defui inspector [{:keys [state]}]
  (let [project (.-project state)
        active-diagram-id (.-activeDiagramId state)
        selected-object-id (.-selectedObjectId state)
        selected-object-type (.-selectedObjectType state)
        diagrams (if project (.-diagrams project) #js [])
        diag (.find diagrams (fn [d] (= (.-id d) active-diagram-id)))
        [panel-width set-panel-width] (use-state 340)
        [collapsed-sections set-collapsed-sections] (use-state (js-obj))
        is-resizing (use-ref false)

        toggle-section
        (fn [role]
          (set-collapsed-sections
           (fn [prev]
             (let [copy (js/Object.assign (js-obj) prev)
                   cur (aget copy role)]
               (aset copy role (not cur))
               copy))))]

    ;; Panel resize handler
    (use-effect
     (fn []
       (let [handle-mouse-move
             (fn [^js e]
               (when (.-current is-resizing)
                 (let [new-w (Math/max 280 (Math/min 650 (- js/window.innerWidth (.-clientX e))))]
                   (set-panel-width new-w))))
             handle-mouse-up
             (fn []
               (set! (.-current is-resizing) false)
               (set! (.. js/document -body -style -cursor) "default"))]
         (.addEventListener js/window "mousemove" handle-mouse-move)
         (.addEventListener js/window "mouseup" handle-mouse-up)
         (fn []
           (.removeEventListener js/window "mousemove" handle-mouse-move)
           (.removeEventListener js/window "mouseup" handle-mouse-up))))
     [])

    (when diag
      (let [selected-block (when (= selected-object-type "block")
                             (.find (.-blocks diag) (fn [b] (= (.-id b) selected-object-id))))
            selected-arrow (when (= selected-object-type "arrow")
                             (.find (.-arrows diag) (fn [a] (= (.-id a) selected-object-id))))
            right-panel-open (.-rightPanelOpen state)
            title-text (cond
                         selected-block "Блок"
                         selected-arrow "Стрелка"
                         :else "Проект")]
        ($ :aside {:class (str "side-panel right" (when-not right-panel-open " collapsed"))
                   :style {:width (if right-panel-open (str panel-width "px") 0)}
                   :data-testid "inspector-panel"}
           (when right-panel-open
             ($ :div.panel-resize-handle.left-edge
                {:on-mouse-down (fn [^js e]
                                  (.preventDefault e)
                                  (set! (.-current is-resizing) true)
                                  (set! (.. js/document -body -style -cursor) "ew-resize"))
                 :title "Изменить ширину"
                 :data-testid "resize-handle-right"}))

           ($ :div.panel-header
              ($ :span {:style {:display "flex" :align-items "center" :gap "6px"}}
                 ($ Sliders {:size 14})
                 ($ :span title-text))
              ($ :button.btn-icon {:on-click (fn [_] (.toggleRightPanel store))
                                   :title "Скрыть панель"
                                   :data-testid "btn-collapse-right"}
                 ($ X {:size 15})))

           (cond
             selected-block
             ($ BlockInspector {:block selected-block
                                :state state
                                :collapsedSections collapsed-sections
                                :toggleSection toggle-section})

             selected-arrow
             ($ ArrowInspector {:arrow selected-arrow
                                :state state})

             :else
             ($ ProjectInspector {:state state})))))))
