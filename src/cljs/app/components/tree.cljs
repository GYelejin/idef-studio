(ns app.components.tree
  (:require [uix.core :as uix :refer [defui $ use-state use-effect use-ref]]
            ["lucide-react" :refer [Network AlertCircle AlertTriangle X ChevronDown ChevronRight GitMerge]]
            ["app-src/core/store" :refer [store]]
            ["app-src/core/linter" :refer [runIDEF0Linter]]
            ["app-src/core/geometry" :refer [getBlockCode]]))

(defn clean-title [title]
  (if (string? title)
    (-> title
        (.replace #"^(Контекстная диаграмма:\s*|Декомпозиция:\s*)" "")
        (.trim))
    ""))

(defui tree [{:keys [state]}]
  (let [project (.-project state)
        active-diagram-id (.-activeDiagramId state)
        selected-object-id (.-selectedObjectId state)
        diagrams (if project (.-diagrams project) #js [])
        [panel-width set-panel-width] (use-state 270)
        [expanded-nodes set-expanded-nodes] (use-state (js-obj))
        is-resizing (use-ref false)

        toggle-expand
        (fn [node-id ^js e]
          (.stopPropagation e)
          (set-expanded-nodes
           (fn [prev]
             (let [copy (js/Object.assign (js-obj) prev)
                   current-val (aget copy node-id)]
               (aset copy node-id (if (false? current-val) true false))
               copy))))

        handle-select-diagram
        (fn [diag-id]
          (.switchDiagram store diag-id)
          (let [target-diag (.find diagrams (fn [d] (= (.-id d) diag-id)))]
            (when (and target-diag (nil? (.-parentBlockId target-diag)) (aget (.-blocks target-diag) 0))
              (.selectObject store (.-id (aget (.-blocks target-diag) 0)) "block"))))

        handle-select-block
        (fn [diag-id block-id]
          (when (not= active-diagram-id diag-id)
            (.switchDiagram store diag-id))
          (.selectObject store block-id "block"))]

    ;; Auto-expand active diagram chain
    (use-effect
     (fn []
       (when project
         (let [to-expand (js-obj)]
           (loop [cur (.find diagrams (fn [d] (= (.-id d) active-diagram-id)))]
             (when cur
               (aset to-expand (.-id cur) true)
               (if-let [p-id (.-parentBlockId cur)]
                 (do
                   (aset to-expand p-id true)
                   (recur (.find diagrams (fn [d] (.some (.-blocks d) (fn [b] (= (.-id b) p-id)))))))
                 nil)))
           (set-expanded-nodes (fn [prev] (js/Object.assign (js-obj) prev to-expand))))))
     [active-diagram-id project])

    ;; Panel resize handler
    (use-effect
     (fn []
       (let [handle-mouse-move
             (fn [^js e]
               (when (.-current is-resizing)
                 (let [new-w (Math/max 200 (Math/min 500 (.-clientX e)))]
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

    (letfn [(render-block-list [diag depth]
              ($ :div {:style {:position "relative"
                               :padding-left "20px"
                               :margin-left "12px"
                               :border-left "1.5px solid var(--border-color, #e2e8f0)"
                               :display "flex"
                               :flex-direction "column"
                               :gap "2px"
                               :margin-top "1px"}}
                 (for [blk (array-seq (.-blocks diag))]
                   (let [blk-id (.-id blk)
                         blk-num (.-nodeNumber blk)
                         blk-name (.-name blk)
                         is-block-selected (and (= selected-object-id blk-id)
                                                (= active-diagram-id (.-id diag)))
                         block-code (getBlockCode (.-code diag) blk-num)
                         child-diag (.find diagrams (fn [d]
                                                      (or (= (.-parentBlockId d) blk-id)
                                                          (and (.-decompDiagramId blk)
                                                               (= (.-id d) (.-decompDiagramId blk))))))
                         is-block-expanded (not (false? (aget expanded-nodes blk-id)))]
                     ($ :div {:key blk-id :style {:position "relative"}}
                        ;; Connector line
                        ($ :div {:style {:position "absolute"
                                         :left "-20px"
                                         :top "14px"
                                         :width "16px"
                                         :height "1.5px"
                                         :background "var(--border-color, #e2e8f0)"}})

                        ;; Block Node Row
                        ($ :div {:class (str "tree-node" (when is-block-selected " active"))
                                 :style {:display "flex"
                                         :align-items "center"
                                         :gap "6px"
                                         :padding "4px 6px"
                                         :border-radius "5px"
                                         :cursor "pointer"
                                         :background (if is-block-selected "var(--accent-subtle, #eff6ff)" "transparent")
                                         :border (if is-block-selected "1px solid var(--accent-primary, #2563eb)" "1px solid transparent")}
                                 :on-click (fn [_] (handle-select-block (.-id diag) blk-id))
                                 :data-testid (if (and (nil? (.-parentBlockId diag)) (zero? blk-num))
                                                (str "tree-node-block-" block-code)
                                                (str "tree-node-" block-code))}
                           (if child-diag
                             ($ :button {:on-click (fn [e] (toggle-expand blk-id e))
                                         :style {:background "none" :border "none" :padding "0"
                                                 :display "flex" :align-items "center" :cursor "pointer"
                                                 :color "var(--text-muted)"}
                                         :title (if is-block-expanded "Свернуть" "Развернуть")}
                                (if is-block-expanded ($ ChevronDown {:size 13}) ($ ChevronRight {:size 13})))
                             ($ :span {:style {:width "13px"}}))

                           ($ :span {:style {:font-family "monospace"
                                             :font-weight 700
                                             :font-size "11px"
                                             :background (if is-block-selected "#2563eb" "var(--bg-card, #f1f5f9)")
                                             :color (if is-block-selected "#ffffff" "var(--text-secondary, #475569)")
                                             :padding "1px 5px"
                                             :border-radius "4px"
                                             :border "1px solid var(--border-color, #cbd5e1)"}}
                              block-code)

                           ($ :span {:style {:flex 1
                                             :overflow "hidden"
                                             :text-overflow "ellipsis"
                                             :white-space "nowrap"
                                             :font-size "11px"
                                             :color (if is-block-selected "#1e293b" "var(--text-secondary, #334155)")}
                                     :title (.replace blk-name #"\n" " ")}
                              (.replace blk-name #"\n" " "))

                           ;; Quick Decompose Button
                           (when-not child-diag
                             ($ :button.btn-icon
                                {:style {:width "20px" :height "20px" :padding "2px" :opacity 0.7}
                                 :title (str "Декомпозировать блок " block-code)
                                 :on-click (fn [^js e]
                                             (.stopPropagation e)
                                             (.switchDiagram store (.-id diag))
                                             (.decomposeBlock store blk-id))
                                 :data-testid (str "btn-decompose-tree-" block-code)}
                                ($ GitMerge {:size 12}))))

                        ;; Sub-decomposition of this Block
                        (when (and child-diag is-block-expanded)
                          (render-block-list child-diag (inc depth))))))))

            (render-diagram-hierarchy [diag depth]
              (let [diag-id (.-id diag)
                    diag-code (.-code diag)
                    is-root-context (nil? (.-parentBlockId diag))
                    root-block (aget (.-blocks diag) 0)
                    is-active (if is-root-context
                                (and (= active-diagram-id diag-id)
                                     (or (nil? selected-object-id)
                                         (and root-block (= selected-object-id (.-id root-block)))))
                                (= diag-id active-diagram-id))
                    is-expanded (not (false? (aget expanded-nodes diag-id)))
                    issues (if project (runIDEF0Linter project diag-id) #js [])
                    errors (.-length (.filter issues (fn [i] (= (.-severity i) "error"))))
                    warnings (.-length (.filter issues (fn [i] (= (.-severity i) "warning"))))
                    root-child-diag (when is-root-context
                                      (.find diagrams (fn [d]
                                                        (and root-block
                                                             (or (= (.-parentBlockId d) (.-id root-block))
                                                                 (and (.-decompDiagramId root-block)
                                                                      (= (.-id d) (.-decompDiagramId root-block))))))))
                    has-children (if is-root-context
                                   (boolean (and root-child-diag (> (.-length (.-blocks root-child-diag)) 0)))
                                   (> (.-length (.-blocks diag)) 0))
                    display-title (if (and is-root-context root-block (.-name root-block))
                                    (.replace (.-name root-block) #"\n" " ")
                                    (.-title diag))]
                ($ :div {:key diag-id :style {:display "flex" :flex-direction "column" :gap "2px"}}
                   ;; Diagram Row
                   ($ :div {:class (str "tree-node" (when is-active " active"))
                            :style {:display "flex"
                                    :align-items "center"
                                    :gap "6px"
                                    :padding "5px 8px"
                                    :border-radius "6px"
                                    :cursor "pointer"
                                    :background (if is-active "var(--accent-subtle, #eff6ff)" "transparent")
                                    :border (if is-active "1px solid var(--accent-primary, #2563eb)" "1px solid transparent")}
                            :on-click (fn [_] (handle-select-diagram diag-id))
                            :data-testid (if is-root-context "tree-node-A0" (str "tree-node-diag-" diag-code))}
                      (if has-children
                        ($ :button {:on-click (fn [e] (toggle-expand diag-id e))
                                    :style {:background "none" :border "none" :padding "0"
                                            :display "flex" :align-items "center" :cursor "pointer"
                                            :color "var(--text-muted)"}
                                    :title (if is-expanded "Свернуть" "Развернуть")}
                           (if is-expanded ($ ChevronDown {:size 14}) ($ ChevronRight {:size 14})))
                        ($ :span {:style {:width "14px"}}))

                      ($ :span {:style {:font-family "monospace"
                                        :font-weight 700
                                        :font-size "11px"
                                        :background (if is-active "#2563eb" "var(--bg-card, #f1f5f9)")
                                        :color (if is-active "#ffffff" "var(--text-secondary, #475569)")
                                        :padding "1px 5px"
                                        :border-radius "4px"
                                        :border "1px solid var(--border-color, #cbd5e1)"}}
                         diag-code)

                      ($ :span {:style {:flex 1
                                        :overflow "hidden"
                                        :text-overflow "ellipsis"
                                        :white-space "nowrap"
                                        :font-size "12px"
                                        :font-weight (if is-active 600 500)
                                        :color "var(--text-primary)"}
                                :title (clean-title display-title)}
                         (clean-title display-title))

                      (when (> errors 0)
                        ($ :span {:title (str errors " ошибок") :style {:color "var(--danger)" :display "flex"}}
                           ($ AlertCircle {:size 13})))

                      (when (and (> warnings 0) (zero? errors))
                        ($ :span {:title (str warnings " предупреждений") :style {:color "var(--warning)" :display "flex"}}
                           ($ AlertTriangle {:size 13}))))

                   ;; Children
                   (when (and is-expanded is-root-context root-child-diag)
                     (render-block-list root-child-diag (inc depth)))
                   (when (and is-expanded (not is-root-context) (> (.-length (.-blocks diag)) 0))
                     (render-block-list diag (inc depth))))))]

      (let [root-diagrams (.filter diagrams (fn [d] (nil? (.-parentBlockId d))))
            orphan-diagrams (.filter diagrams (fn [d]
                                                (if (nil? (.-parentBlockId d))
                                                  false
                                                  (not (.some diagrams (fn [pd]
                                                                         (.some (.-blocks pd)
                                                                                (fn [b] (= (.-id b) (.-parentBlockId d))))))))))
            left-panel-open (.-leftPanelOpen state)]
        ($ :aside {:class (str "side-panel left" (when-not left-panel-open " collapsed"))
                   :style {:width (if left-panel-open (str panel-width "px") 0)}
                   :data-testid "diagram-tree-panel"}
           ($ :div.panel-header
              ($ :span {:style {:display "flex" :align-items "center" :gap "6px"}}
                 ($ Network {:size 14})
                 ($ :span "Дерево"))
              ($ :div {:style {:display "flex" :align-items "center" :gap "2px"}}
                 ($ :button.btn-icon {:on-click (fn [_] (.toggleLeftPanel store))
                                      :title "Скрыть дерево"
                                      :data-testid "btn-collapse-left"}
                    ($ X {:size 15}))))

           ($ :div.panel-body {:style {:padding "8px 6px" :overflow-y "auto"}}
              ($ :div {:style {:display "flex" :flex-direction "column" :gap "4px"}}
                 (for [rd (array-seq root-diagrams)]
                   (render-diagram-hierarchy rd 0))
                 (for [od (array-seq orphan-diagrams)]
                   (render-diagram-hierarchy od 1))))

           (when left-panel-open
             ($ :div.panel-resize-handle.right-edge
                {:on-mouse-down (fn [^js e]
                                  (.preventDefault e)
                                  (set! (.-current is-resizing) true)
                                  (set! (.. js/document -body -style -cursor) "ew-resize"))
                 :title "Потяните для изменения ширины панели"
                 :data-testid "resize-handle-left"})))))))
