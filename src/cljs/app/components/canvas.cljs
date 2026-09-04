(ns app.components.canvas
  (:require [uix.core :as uix :refer [defui $ use-ref]]
            ["app-src/core/store" :refer [store]]
            ["app-src/core/geometry" :refer [CANVAS_WIDTH CANVAS_HEIGHT]]
            ["app-src/components/canvas/CanvasDefs" :default CanvasDefs]
            ["app-src/components/canvas/CanvasBlock" :default CanvasBlock]
            ["app-src/components/canvas/CanvasArrow" :default CanvasArrow]
            ["app-src/components/canvas/CanvasArrowHandles" :default CanvasArrowHandles]
            ["app-src/components/canvas/CanvasJunction" :default CanvasJunction]
            ["app-src/components/canvas/CanvasDraftOverlay" :default CanvasDraftOverlay]
            ["app-src/components/canvas/useCanvasDnd" :refer [useCanvasDnd]]))

(defui canvas [{:keys [state onCursorChange]}]
  (let [project (.-project state)
        active-diagram-id (.-activeDiagramId state)
        selected-object-id (.-selectedObjectId state)
        selected-object-type (.-selectedObjectType state)
        active-tool (.-activeTool state)
        zoom (.-zoom state)
        grid-visible (.-gridVisible state)
        diagrams (if project (.-diagrams project) #js [])
        diag (.find diagrams (fn [d] (= (.-id d) active-diagram-id)))
        svg-ref (use-ref nil)]

    (if-not diag
      ($ :div.canvas-viewport {:data-testid "canvas-empty"}
         ($ :div {:style {:color "var(--text-muted)"}} "Диаграмма не найдена"))

      (let [dnd (useCanvasDnd #js {:diag diag
                                   :activeTool active-tool
                                   :zoom zoom
                                   :svgRef svg-ref
                                   :onCursorChange onCursorChange})
            drag-state (.-dragState dnd)
            editing-block-id (.-editingBlockId dnd)
            set-editing-block-id (.-setEditingBlockId dnd)
            editing-arrow-id (.-editingArrowId dnd)
            set-editing-arrow-id (.-setEditingArrowId dnd)
            edit-text (.-editText dnd)
            set-edit-text (.-setEditText dnd)
            get-svg-coordinates (.-getSvgCoordinates dnd)
            handle-canvas-mouse-move (.-handleCanvasMouseMove dnd)
            handle-canvas-mouse-down (.-handleCanvasMouseDown dnd)
            handle-block-mouse-down (.-handleBlockMouseDown dnd)
            handle-resize-handle-mouse-down (.-handleResizeHandleMouseDown dnd)
            handle-block-double-click (.-handleBlockDoubleClick dnd)
            handle-arrow-click (.-handleArrowClick dnd)
            handle-arrow-double-click (.-handleArrowDoubleClick dnd)
            handle-inline-key-down (.-handleInlineKeyDown dnd)
            start-arrow-from-snap (.-startArrowFromSnap dnd)
            start-segment-drag (.-startSegmentDrag dnd)
            start-endpoint-drag (.-startEndpointDrag dnd)
            start-label-drag (.-startLabelDrag dnd)
            start-junction-drag (.-startJunctionDrag dnd)

            handle-viewport-wheel
            (fn [^js e]
              (when (or (.-ctrlKey e) (.-metaKey e))
                (.preventDefault e)
                (let [delta (if (< (.-deltaY e) 0) 0.08 -0.08)
                      new-zoom (Math/max 0.2 (Math/min 2.5 (/ (Math/round (* (+ zoom delta) 100)) 100)))]
                  (.setZoom store new-zoom))))

            selected-arrow (when (= selected-object-type "arrow")
                             (.find (.-arrows diag) (fn [a] (= (.-id a) selected-object-id))))]

        ($ :div.canvas-viewport
           {:on-mouse-move handle-canvas-mouse-move
            :on-wheel handle-viewport-wheel
            :data-testid "canvas-viewport"}
           ($ :div.canvas-sheet-wrapper
              {:style {:width (str (* CANVAS_WIDTH zoom) "px")
                       :height (str (* CANVAS_HEIGHT zoom) "px")
                       :position "relative"}}
              ($ :svg
                 {:ref svg-ref
                  :id "idef0-diagram"
                  :class "canvas-svg"
                  :viewBox (str "0 0 " CANVAS_WIDTH " " CANVAS_HEIGHT)
                  :width (* CANVAS_WIDTH zoom)
                  :height (* CANVAS_HEIGHT zoom)
                  :on-mouse-down handle-canvas-mouse-down
                  :data-testid "idef0-svg-canvas"}
                 ($ CanvasDefs {:gridVisible grid-visible})

                 ;; Dynamic arrow markers
                 ($ :defs
                    (for [arr (array-seq (.-arrows diag))]
                      (let [arr-id (.-id arr)]
                        ($ :marker {:key (str "marker-" arr-id)
                                    :id (str "marker-arrow-" arr-id)
                                    :viewBox "0 0 10 10"
                                    :refX "8"
                                    :refY "5"
                                    :markerWidth "6"
                                    :markerHeight "6"
                                    :orient "auto-start-reverse"}
                           ($ :path {:d "M 0,1.5 L 8,5 L 0,8.5 Z"
                                     :fill (if (= selected-object-id arr-id) "var(--accent-primary, #2563eb)" "#000000")})))))

                 ;; Canvas Background Sheet
                 ($ :rect {:width "100%" :height "100%" :fill "#ffffff" :id "background"})

                 ;; In-flight Snap and Draft Overlays
                 ($ CanvasDraftOverlay {:dragState drag-state :diag diag :activeTool active-tool})

                 ;; Arrows / Flows
                 (for [arrow (array-seq (.-arrows diag))]
                   ($ CanvasArrow {:key (.-id arrow)
                                   :arrow arrow
                                   :diag diag
                                   :isSelected (and (= selected-object-id (.-id arrow)) (= selected-object-type "arrow"))
                                   :activeTool active-tool
                                   :editingArrowId editing-arrow-id
                                   :getSvgCoordinates get-svg-coordinates
                                   :onArrowClick handle-arrow-click
                                   :onArrowDoubleClick handle-arrow-double-click
                                   :onStartArrowFromSnap start-arrow-from-snap
                                   :onStartSegmentDrag start-segment-drag
                                   :onStartLabelDrag start-label-drag}))

                 ;; Junctions (Branch / Merge Dots)
                 (for [junc (array-seq (.-junctions diag))]
                   (let [parent-arr (.find (.-arrows diag) (fn [a] (= (.-id a) (.-parentArrowId junc))))
                         dot-color (if (and parent-arr (.-color parent-arr)) (.-color parent-arr) "#000000")
                         is-dragging (and drag-state (= (.-type drag-state) "junction_drag") (= (.-juncId drag-state) (.-id junc)))]
                     ($ CanvasJunction {:key (.-id junc)
                                        :junction junc
                                        :activeTool active-tool
                                        :dotColor dot-color
                                        :isDraggingThis is-dragging
                                        :getSvgCoordinates get-svg-coordinates
                                        :onStartJunctionDrag start-junction-drag})))

                 ;; Functional Blocks
                 ($ :g {:id "blocks"}
                    (for [block (array-seq (.-blocks diag))]
                      ($ CanvasBlock {:key (.-id block)
                                      :block block
                                      :diag diag
                                      :isSelected (and (= selected-object-id (.-id block)) (= selected-object-type "block"))
                                      :editingBlockId editing-block-id
                                      :onBlockMouseDown handle-block-mouse-down
                                      :onBlockDoubleClick handle-block-double-click
                                      :onResizeHandleMouseDown handle-resize-handle-mouse-down})))

                 ;; Top-layer handles for selected arrow
                 (when selected-arrow
                   ($ CanvasArrowHandles {:arrow selected-arrow
                                          :activeTool active-tool
                                          :getSvgCoordinates get-svg-coordinates
                                          :onStartEndpointDrag start-endpoint-drag})))

              ;; Inline HTML Text Editors
              (when editing-block-id
                (when-let [block (.find (.-blocks diag) (fn [b] (= (.-id b) editing-block-id)))]
                  ($ :div {:style {:position "absolute"
                                   :left (str (* (+ (.-x block) 4) zoom) "px")
                                   :top (str (* (+ (.-y block) 4) zoom) "px")
                                   :width (str (* (- (.-width block) 8) zoom) "px")
                                   :height (str (* (- (.-height block) 8) zoom) "px")
                                   :display "flex"
                                   :align-items "center"
                                   :justify-content "center"
                                   :padding "4px"
                                   :z-index 30}}
                     ($ :textarea {:autoFocus true
                                   :class "form-input"
                                   :style {:width "100%"
                                           :height "100%"
                                           :text-align "center"
                                           :font-weight "bold"
                                           :font-size (str (* 13 zoom) "px")
                                           :background "#ffffff"
                                           :color "#000000"
                                           :border "2px dashed var(--accent)"
                                           :border-radius "3px"
                                           :outline "none"
                                           :resize "none"}
                                   :value edit-text
                                   :on-change (fn [^js e] (set-edit-text (.. e -target -value)))
                                   :on-key-down handle-inline-key-down
                                   :on-blur (fn [_]
                                              (.updateBlock store editing-block-id #js {:name edit-text})
                                              (set-editing-block-id nil))
                                   :data-testid "inline-block-editor"}))))

              (when editing-arrow-id
                (let [arrow (.find (.-arrows diag) (fn [a] (= (.-id a) editing-arrow-id)))
                      lx (* (or (when-let [lp (.-labelPos arrow)] (.-x lp))
                                (if arrow (+ (.-x (aget (.-points arrow) 0)) 10) 100))
                            zoom)
                      ly (* (or (when-let [lp (.-labelPos arrow)] (.-y lp))
                                (if arrow (- (.-y (aget (.-points arrow) 0)) 10) 100))
                            zoom)]
                  ($ :div {:style {:position "absolute"
                                   :left (str lx "px")
                                   :top (str ly "px")
                                   :z-index 30}}
                     ($ :textarea {:autoFocus true
                                   :class "form-input"
                                   :rows 1
                                   :style {:font-weight 500
                                           :font-size (str (* 12 zoom) "px")
                                           :background "#ffffff"
                                           :border "1px dashed var(--accent)"
                                           :border-radius "3px"
                                           :outline "none"
                                           :resize "none"
                                           :white-space "pre"}
                                   :value edit-text
                                   :on-change (fn [^js e] (set-edit-text (.. e -target -value)))
                                   :on-key-down handle-inline-key-down
                                   :on-blur (fn [_]
                                              (.updateArrow store editing-arrow-id #js {:label edit-text})
                                              (set-editing-arrow-id nil))
                                   :data-testid "inline-arrow-editor"}))))))))))
