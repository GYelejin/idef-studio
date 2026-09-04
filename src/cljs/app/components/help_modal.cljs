(ns app.components.help-modal
  (:require [uix.core :as uix :refer [defui $]]
            ["lucide-react" :refer [X Keyboard HelpCircle BookOpen]]))

(def shortcuts
  [{:key "1 или V" :label "Инструмент «Указатель» (выбор и перемещение блоков)"}
   {:key "2 или B" :label "Инструмент «Блок» (создание функционального блока)"}
   {:key "3 или A" :label "Инструмент «Стрелка» (проведение связей и потоков)"}
   {:key "4 или L" :label "Инструмент «Метка и выноска» (перемещение метки и линия выноски)"}
   {:key "Ctrl + Z" :label "Отменить последнее действие"}
   {:key "Ctrl + Y / Ctrl + Shift + Z" :label "Повторить отмененное действие"}
   {:key "Delete / Backspace" :label "Удалить выбранный блок или стрелку"}
   {:key "Двойной клик" :label "Быстрое редактирование текста блока или стрелки на холсте"}
   {:key "Ctrl + Колесико мыши" :label "Плавное масштабирование холста"}
   {:key "Колесико мыши" :label "Вертикальная прокрутка холста / панели"}
   {:key "Escape" :label "Сброс выбора / закрытие модальных окон"}
   {:key "?" :label "Открыть эту справку по горячим клавишам"}])

(def icom-rules
  [{:role "Вход (слева)" :desc "Материалы, информация или сырье, преобразуемые функцией в выход."}
   {:role "Управление (сверху)" :desc "Правила, регламенты, стандарты, управляющие выполнением функции."}
   {:role "Выход (справа)" :desc "Результат выполнения функции (готовая продукция, отчеты, статус)."}
   {:role "Механизм (снизу)" :desc "Ресурсы, исполняющие функцию (персонал, оборудование, ПО)."}])

(defui help-modal [{:keys [onClose]}]
  ($ :div.modal-backdrop {:data-testid "help-modal"}
     ($ :div.modal-dialog {:style {:max-width "640px"}}
        ($ :div.modal-header
           ($ :span {:style {:display "flex" :align-items "center" :gap "8px"}}
              ($ HelpCircle {:size 16})
              ($ :span "Справка и горячие клавиши IDEF0"))
           ($ :button.btn-icon {:on-click onClose :data-testid "btn-close-help-modal"}
              ($ X {:size 16})))

        ($ :div.modal-body {:style {:max-height "70vh" :overflow-y "auto"}}
           ;; Section: Shortcuts
           ($ :div {:style {:margin-bottom "20px"}}
              ($ :div {:style {:display "flex" :align-items "center" :gap "6px"
                               :font-weight 600 :font-size "13px" :margin-bottom "10px"}}
                 ($ Keyboard {:size 15})
                 ($ :span "Горячие клавиши"))
              ($ :div {:style {:display "grid" :grid-template-columns "1fr" :gap "6px"}}
                 (for [{:keys [key label]} shortcuts]
                   ($ :div {:key key
                            :style {:display "flex" :align-items "center" :justify-content "space-between"
                                    :padding "6px 10px" :background "var(--bg-card)"
                                    :border "1px solid var(--border-color)" :border-radius "6px"
                                    :font-size "12px"}}
                      ($ :span {:style {:color "var(--text-secondary)"}} label)
                      ($ :kbd {:style {:background "var(--bg-panel-header)"
                                       :border "1px solid var(--border-color)"
                                       :border-radius "4px" :padding "2px 8px"
                                       :font-family "monospace" :font-size "11px"
                                       :font-weight 600 :color "var(--accent-primary)"
                                       :white-space "nowrap"}}
                         key)))))

           ;; Section: ICOM Principle
           ($ :div
              ($ :div {:style {:display "flex" :align-items "center" :gap "6px"
                               :font-weight 600 :font-size "13px" :margin-bottom "10px"}}
                 ($ BookOpen {:size 15})
                 ($ :span "Семантика потоков стандарта IDEF0"))
              ($ :div {:style {:display "grid" :grid-template-columns "1fr" :gap "6px"}}
                 (for [{:keys [role desc]} icom-rules]
                   ($ :div {:key role
                            :style {:padding "8px 10px" :background "var(--bg-card)"
                                    :border "1px solid var(--border-color)" :border-radius "6px"
                                    :font-size "12px"}}
                      ($ :div {:style {:font-weight 600 :color "var(--accent-primary)" :margin-bottom "2px"}}
                         role)
                      ($ :div {:style {:color "var(--text-secondary)"}}
                         desc)))))))))
