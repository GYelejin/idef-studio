# 🧪 Реестр модульных тестов IDEF0 Studio (Test Catalog)

Настоящий документ содержит полный перечень, спецификацию и матрицу покрытия всех автоматизированных модульных тестов кодовой базы **IDEF0 Studio**.
Каждый тест размещен в **отдельном изолированном файле** со своим порядковым номером (от **01** до **475**) и строгой структурированной документацией в соответствии со стандартами качества ПО.

Текущий статус тестового набора: **475 pass / 0 fail (100% SUCCESS)**, **800 проверок `expect()`**.
Общее покрытие кодовой базы: **99.47% строк (Lines)**, **92.78% функций (Functions)**.

---

## 📊 Матрица классов эквивалентности и тестов (1–475)

| № | Файл теста | Название теста | Класс эквивалентности | Статус |
|---|---|---|---|:---:|
| **01** | [`01-f01-border-left-to-block-input.test.ts`](./unit/01-f01-border-left-to-block-input.test.ts) | Входной поток: Левая граница -> Вход блока (Вход) | `F1 (Border Left -> Block Input)` | ✅ PASS |
| **02** | [`02-f02-border-top-to-block-control.test.ts`](./unit/02-f02-border-top-to-block-control.test.ts) | Управляющий поток: Верхняя граница -> Верх блока (Управление) | `F2 (Border Top -> Block Control)` | ✅ PASS |
| **03** | [`03-f03-border-bottom-to-block-mechanism.test.ts`](./unit/03-f03-border-bottom-to-block-mechanism.test.ts) | Поток механизма: Нижняя граница -> Низ блока (Механизм) | `F3 (Border Bottom -> Block Mechanism)` | ✅ PASS |
| **04** | [`04-f04-block-output-to-border-right.test.ts`](./unit/04-f04-block-output-to-border-right.test.ts) | Выходной поток: Выход блока -> Правая граница (Выход) | `F4 (Block Output -> Border Right)` | ✅ PASS |
| **05** | [`05-f05-forward-block-to-block-input.test.ts`](./unit/05-f05-forward-block-to-block-input.test.ts) | Прямая межблочная связь: Выход Блока 1 -> Вход Блока 2 | `F5 (Block Output -> Block Input Forward)` | ✅ PASS |
| **06** | [`06-f06-forward-block-to-block-control.test.ts`](./unit/06-f06-forward-block-to-block-control.test.ts) | Прямая межблочная связь: Выход Блока 1 -> Управление Блока 2 | `F6 (Block Output -> Block Control Forward)` | ✅ PASS |
| **07** | [`07-f07-forward-block-to-block-mechanism.test.ts`](./unit/07-f07-forward-block-to-block-mechanism.test.ts) | Прямая межблочная связь: Выход Блока 1 -> Механизм Блока 2 | `F7 (Block Output -> Block Mechanism Forward)` | ✅ PASS |
| **08** | [`08-f08-feedback-loop-output-to-control.test.ts`](./unit/08-f08-feedback-loop-output-to-control.test.ts) | Обратная связь по управлению: Выход Блока 2 -> Управление Блока 1 | `F8 (Feedback Loop Output -> Control)` | ✅ PASS |
| **09** | [`09-f09-feedback-loop-output-to-input.test.ts`](./unit/09-f09-feedback-loop-output-to-input.test.ts) | Обратная связь по входу: Выход Блока 2 -> Вход Блока 1 | `F9 (Feedback Loop Output -> Input)` | ✅ PASS |
| **10** | [`10-f10-feedback-loop-output-to-mechanism.test.ts`](./unit/10-f10-feedback-loop-output-to-mechanism.test.ts) | Обратная связь по механизму: Выход Блока 2 -> Механизм Блока 1 | `F10 (Feedback Loop Output -> Mechanism)` | ✅ PASS |
| **100** | [`100-name02-format-arrow-display-name.test.ts`](./unit/100-name02-format-arrow-display-name.test.ts) | Именование: Формирование автоматического отображаемого имени стрелки | `NAME-02 (Arrow Display Name Formatting)` | ✅ PASS |
| **101** | [`101-adj01-move-block-with-top-control-arrow.test.ts`](./unit/101-adj01-move-block-with-top-control-arrow.test.ts) | Адаптация: Смещение блока с подключенной стрелкой Управления | `ADJ-01 (Block Move Control Adjustment)` | ✅ PASS |
| **102** | [`102-adj02-move-block-with-bottom-mechanism-arrow.test.ts`](./unit/102-adj02-move-block-with-bottom-mechanism-arrow.test.ts) | Адаптация: Смещение блока с подключенной стрелкой Механизма | `ADJ-02 (Block Move Mechanism Adjustment)` | ✅ PASS |
| **103** | [`103-adj03-move-block-with-right-output-arrow.test.ts`](./unit/103-adj03-move-block-with-right-output-arrow.test.ts) | Адаптация: Смещение блока с исходящей стрелкой Выхода | `ADJ-03 (Block Move Output Adjustment)` | ✅ PASS |
| **104** | [`104-adj04-move-block-with-self-loop.test.ts`](./unit/104-adj04-move-block-with-self-loop.test.ts) | Адаптация: Смещение блока с циклическим потоком (Self Loop) | `ADJ-04 (Block Move Self Loop Adjustment)` | ✅ PASS |
| **105** | [`105-adj05-resize-block-scale-top-control-port.test.ts`](./unit/105-adj05-resize-block-scale-top-control-port.test.ts) | Адаптация: Масштабирование блока с пересчетом верхнего порта Управления | `ADJ-05 (Block Resize Control Port Adjustment)` | ✅ PASS |
| **106** | [`106-adj06-resize-block-scale-bottom-mechanism-port.test.ts`](./unit/106-adj06-resize-block-scale-bottom-mechanism-port.test.ts) | Адаптация: Масштабирование блока с пересчетом нижнего порта Механизма | `ADJ-06 (Block Resize Mechanism Port Adjustment)` | ✅ PASS |
| **107** | [`107-adj07-resize-block-scale-right-output-port.test.ts`](./unit/107-adj07-resize-block-scale-right-output-port.test.ts) | Адаптация: Масштабирование блока с пересчетом правого порта Выхода | `ADJ-07 (Block Resize Output Port Adjustment)` | ✅ PASS |
| **108** | [`108-reconn01-reconnect-arrow-to-border-target.test.ts`](./unit/108-reconn01-reconnect-arrow-to-border-target.test.ts) | Переподключение: Переключение конца стрелки на правую границу холста | `RECONN-01 (Reconnect Arrow to Border Target)` | ✅ PASS |
| **109** | [`109-reconn02-reconnect-arrow-to-border-source.test.ts`](./unit/109-reconn02-reconnect-arrow-to-border-source.test.ts) | Переподключение: Переключение начала стрелки на левую границу холста | `RECONN-02 (Reconnect Arrow to Border Source)` | ✅ PASS |
| **11** | [`11-f11-self-loop.test.ts`](./unit/11-f11-self-loop.test.ts) | Самозамыкающийся поток: Выход блока -> Вход того же блока | `F11 (Self Loop)` | ✅ PASS |
| **110** | [`110-reconn03-reconnect-arrow-to-junction.test.ts`](./unit/110-reconn03-reconnect-arrow-to-junction.test.ts) | Переподключение: Подключение начала стрелки к узлу ветвления | `RECONN-03 (Reconnect Arrow to Junction Source)` | ✅ PASS |
| **111** | [`111-reconn04-clean-orphan-junction-on-disconnect.test.ts`](./unit/111-reconn04-clean-orphan-junction-on-disconnect.test.ts) | Переподключение: Удаление узла при отключении единственной ветви | `RECONN-04 (Orphan Junction Clean on Disconnect)` | ✅ PASS |
| **112** | [`112-val01-validate-all-intersections-detect-block-collision.test.ts`](./unit/112-val01-validate-all-intersections-detect-block-collision.test.ts) | Пересечения: Обнаружение коллизии стрелки с телом блока через validateAllIntersections | `VAL-01 (All Intersections Block Collision)` | ✅ PASS |
| **113** | [`113-val02-validate-all-intersections-allow-clean-diagram.test.ts`](./unit/113-val02-validate-all-intersections-allow-clean-diagram.test.ts) | Пересечения: Валидация чистой корректной диаграммы | `VAL-02 (All Intersections Clean Pass)` | ✅ PASS |
| **114** | [`114-decomp01-find-parent-diagram.test.ts`](./unit/114-decomp01-find-parent-diagram.test.ts) | Декомпозиция: Определение родительской диаграммы по parentBlockId | `DECOMP-01 (Find Parent Diagram)` | ✅ PASS |
| **115** | [`115-decomp02-can-decompose-block.test.ts`](./unit/115-decomp02-can-decompose-block.test.ts) | Декомпозиция: Проверка статуса декомпозиции блока | `DECOMP-02 (Can Decompose Block Check)` | ✅ PASS |
| **116** | [`116-lint13-passthrough-arrows-forbidden-on-decomp.test.ts`](./unit/116-lint13-passthrough-arrows-forbidden-on-decomp.test.ts) | Линтер: Запрет сквозных стрелок граница-граница на декомпозиции (FR-LINT-06) | `LINT-13 (Decomposition Passthrough Arrow Warning)` | ✅ PASS |
| **117** | [`117-lint14-broken-merge-junction-detection.test.ts`](./unit/117-lint14-broken-merge-junction-detection.test.ts) | Линтер: Обнаружение разрыва ссылки в узле слияния (FR-LINT-06) | `LINT-14 (Broken Merge Reference Detection)` | ✅ PASS |
| **118** | [`118-lint15-collinear-overlap-warning.test.ts`](./unit/118-lint15-collinear-overlap-warning.test.ts) | Линтер: Предупреждение о коллинеарном наложении стрелок (FR-LINT-05) | `LINT-15 (Collinear Overlap Linter Warning)` | ✅ PASS |
| **119** | [`119-math01-distance-to-segment-projection.test.ts`](./unit/119-math01-distance-to-segment-projection.test.ts) | Математика: Расчет расстояния и проекции точки на отрезок | `MATH-01 (Distance to Segment Projection)` | ✅ PASS |
| **12** | [`12-f12-branch-to-block-input.test.ts`](./unit/12-f12-branch-to-block-input.test.ts) | Ветвление: Узел разветвления -> Вход блока | `F12 (Branch -> Block Input)` | ✅ PASS |
| **120** | [`120-math02-simplify-collinear-merging.test.ts`](./unit/120-math02-simplify-collinear-merging.test.ts) | Математика: Слияние избыточных коллинеарных точек (simplifyCollinear) | `MATH-02 (Collinear Point Simplification)` | ✅ PASS |
| **121** | [`121-math03-clamp-label-to-canvas.test.ts`](./unit/121-math03-clamp-label-to-canvas.test.ts) | Геометрия: Ограничение координат текстовой подписи пределами листа | `MATH-03 (Clamp Label to Canvas)` | ✅ PASS |
| **122** | [`122-export01-clean-svg-marker-definitions.test.ts`](./unit/122-export01-clean-svg-marker-definitions.test.ts) | Экспорт: Наличие определений маркеров стрелок в генерируемом SVG | `EXPORT-01 (SVG Marker Definitions)` | ✅ PASS |
| **123** | [`123-export02-project-json-version-metadata.test.ts`](./unit/123-export02-project-json-version-metadata.test.ts) | Сериализация: Валидация заголовков и схемы в экспортированном JSON | `EXPORT-02 (JSON Version Metadata)` | ✅ PASS |
| **124** | [`124-history01-can-undo-can-redo-predicates.test.ts`](./unit/124-history01-can-undo-can-redo-predicates.test.ts) | История: Доступность отмены и повтора действий (undo / redo) | `HIST-01 (Can Undo and Can Redo State)` | ✅ PASS |
| **125** | [`125-history02-clear-redo-on-new-action.test.ts`](./unit/125-history02-clear-redo-on-new-action.test.ts) | История: Очистка стека Redo при выполнении нового действия после отмены | `HIST-02 (Redo Stack Invalidation)` | ✅ PASS |
| **126** | [`126-store04-select-object-and-selection-state.test.ts`](./unit/126-store04-select-object-and-selection-state.test.ts) | Хранилище: Выбор активного элемента на диаграмме (selectObject) | `STORE-04 (Object Selection Management)` | ✅ PASS |
| **127** | [`127-store05-set-tool-and-active-tool-mode.test.ts`](./unit/127-store05-set-tool-and-active-tool-mode.test.ts) | Хранилище: Переключение активного инструмента холста (setTool) | `STORE-05 (Tool Selection State)` | ✅ PASS |
| **128** | [`128-store06-set-zoom-and-zoom-clamping.test.ts`](./unit/128-store06-set-zoom-and-zoom-clamping.test.ts) | Хранилище: Масштабирование холста (setZoom) | `STORE-06 (Canvas Zoom State)` | ✅ PASS |
| **129** | [`129-store07-set-pan-offset.test.ts`](./unit/129-store07-set-pan-offset.test.ts) | Хранилище: Панорамирование холста (setPan) | `STORE-07 (Canvas Pan Offset)` | ✅ PASS |
| **13** | [`13-f13-branch-to-block-control.test.ts`](./unit/13-f13-branch-to-block-control.test.ts) | Ветвление: Узел разветвления -> Управление блока | `F13 (Branch -> Block Control)` | ✅ PASS |
| **130** | [`130-store08-toggle-panels-visibility.test.ts`](./unit/130-store08-toggle-panels-visibility.test.ts) | Хранилище: Переключение видимости боковых панелей (дерево, инспектор) | `STORE-08 (Panel Visibility Toggles)` | ✅ PASS |
| **131** | [`131-move01-move-block-with-outflow-to-border.test.ts`](./unit/131-move01-move-block-with-outflow-to-border.test.ts) | Адаптация: Смещение блока с выходом на правую границу | `MOVE-01 (Block Move Outflow Adjustment)` | ✅ PASS |
| **132** | [`132-move02-move-block-with-inflow-from-border.test.ts`](./unit/132-move02-move-block-with-inflow-from-border.test.ts) | Адаптация: Смещение блока со входом с левой границы | `MOVE-02 (Block Move Inflow Adjustment)` | ✅ PASS |
| **133** | [`133-move03-move-block-with-branch-attached-to-moving-trunk.test.ts`](./unit/133-move03-move-block-with-branch-attached-to-moving-trunk.test.ts) | Адаптация: Смещение блока-источника ствола с привязанным ответвлением | `MOVE-03 (Block Move with Branch on Trunk)` | ✅ PASS |
| **134** | [`134-move04-move-block-with-orthogonal-elbow-routing.test.ts`](./unit/134-move04-move-block-with-orthogonal-elbow-routing.test.ts) | Адаптация: Смещение целевого блока с пересчетом ортогональных колен | `MOVE-04 (Block Move Orthogonal Elbows)` | ✅ PASS |
| **135** | [`135-name03-resolve-branch-parent-by-proximity.test.ts`](./unit/135-name03-resolve-branch-parent-by-proximity.test.ts) | Именование: Определение родителя стрелки по геометрической близости сегмента | `NAME-03 (Branch Parent by Geometry Proximity)` | ✅ PASS |
| **136** | [`136-name04-display-name-fallback-unnamed.test.ts`](./unit/136-name04-display-name-fallback-unnamed.test.ts) | Именование: Резервное наименование безымянной стрелки | `NAME-04 (Fallback Display Name Formatting)` | ✅ PASS |
| **137** | [`137-reconn05-reconnect-arrow-target-to-block-top.test.ts`](./unit/137-reconn05-reconnect-arrow-target-to-block-top.test.ts) | Переподключение: Переключение конца стрелки на верхнюю грань блока (Управление) | `RECONN-05 (Reconnect Target to Block Top)` | ✅ PASS |
| **138** | [`138-reconn06-reconnect-arrow-target-to-block-bottom.test.ts`](./unit/138-reconn06-reconnect-arrow-target-to-block-bottom.test.ts) | Переподключение: Переключение конца стрелки на нижнюю грань блока (Механизм) | `RECONN-06 (Reconnect Target to Block Bottom)` | ✅ PASS |
| **139** | [`139-reconn07-reconnect-arrow-target-to-block-left.test.ts`](./unit/139-reconn07-reconnect-arrow-target-to-block-left.test.ts) | Переподключение: Переключение конца стрелки на левую грань блока (Вход) | `RECONN-07 (Reconnect Target to Block Left)` | ✅ PASS |
| **14** | [`14-f14-branch-to-block-mechanism.test.ts`](./unit/14-f14-branch-to-block-mechanism.test.ts) | Ветвление: Узел разветвления -> Механизм блока | `F14 (Branch -> Block Mechanism)` | ✅ PASS |
| **140** | [`140-geom09-shift-horizontal-segment-orthogonal-invariant.test.ts`](./unit/140-geom09-shift-horizontal-segment-orthogonal-invariant.test.ts) | Геометрия: Смещение горизонтального сегмента стрелки | `GEOM-09 (Shift Horizontal Segment)` | ✅ PASS |
| **141** | [`141-geom10-shift-vertical-segment-orthogonal-invariant.test.ts`](./unit/141-geom10-shift-vertical-segment-orthogonal-invariant.test.ts) | Геометрия: Смещение вертикального сегмента стрелки | `GEOM-10 (Shift Vertical Segment)` | ✅ PASS |
| **142** | [`142-geom11-remove-bend-point-from-arrow.test.ts`](./unit/142-geom11-remove-bend-point-from-arrow.test.ts) | Геометрия: Удаление промежуточной вершины излома стрелки (removeArrowPoint) | `GEOM-11 (Remove Arrow Bend Point)` | ✅ PASS |
| **143** | [`143-geom12-straighten-segment-minimal-delta.test.ts`](./unit/143-geom12-straighten-segment-minimal-delta.test.ts) | Геометрия: Спрямление геометрии стрелки к прямой линии (straightenArrow) | `GEOM-12 (Straighten Arrow Minimal Delta)` | ✅ PASS |
| **144** | [`144-router01-route-from-top-border-to-block-control.test.ts`](./unit/144-router01-route-from-top-border-to-block-control.test.ts) | Трассировка: Построение ортогонального пути от верхней границы к Управлению | `ROUTE-01 (Route Top Border to Block Control)` | ✅ PASS |
| **145** | [`145-router02-route-from-bottom-border-to-block-mechanism.test.ts`](./unit/145-router02-route-from-bottom-border-to-block-mechanism.test.ts) | Трассировка: Построение ортогонального пути от нижней границы к Механизму | `ROUTE-02 (Route Bottom Border to Block Mechanism)` | ✅ PASS |
| **146** | [`146-router03-route-with-horizontal-offset-three-points.test.ts`](./unit/146-router03-route-with-horizontal-offset-three-points.test.ts) | Трассировка: Построение 3-точечного L-образного маршрута | `ROUTE-03 (Route Three Point L-Shape)` | ✅ PASS |
| **147** | [`147-router04-route-feedback-loop-four-points.test.ts`](./unit/147-router04-route-feedback-loop-four-points.test.ts) | Трассировка: Построение петли обратной связи (Feedback loop) | `ROUTE-04 (Route Feedback Loop Around Blocks)` | ✅ PASS |
| **148** | [`148-inter01-check-segment-intersection-crossing.test.ts`](./unit/148-inter01-check-segment-intersection-crossing.test.ts) | Пересечения: Обнаружение перпендикулярного пересечения отрезков | `INTER-01 (Perpendicular Segment Crossing)` | ✅ PASS |
| **149** | [`149-inter02-check-segment-intersection-collinear.test.ts`](./unit/149-inter02-check-segment-intersection-collinear.test.ts) | Пересечения: Запрет коллинеарного наложения двух отрезков | `INTER-02 (Collinear Segment Overlap Detection)` | ✅ PASS |
| **15** | [`15-f15-branch-to-border-right.test.ts`](./unit/15-f15-branch-to-border-right.test.ts) | Ветвление: Узел разветвления -> Правая граница холста | `F15 (Branch -> Border Right)` | ✅ PASS |
| **150** | [`150-inter03-check-segment-block-collision-edge-touching.test.ts`](./unit/150-inter03-check-segment-block-collision-edge-touching.test.ts) | Пересечения: Разрешение касания внешней грани блока без проникновения | `INTER-03 (Segment Block Edge Contact Allowed)` | ✅ PASS |
| **151** | [`151-store09-set-endpoint-key-unattached-source.test.ts`](./unit/151-store09-set-endpoint-key-unattached-source.test.ts) | Хранилище: Открепление начала стрелки (setArrowEndpointKey 'unattached') | `STORE-09 (Set Endpoint Key Unattached Source)` | ✅ PASS |
| **152** | [`152-store10-set-endpoint-key-unattached-target.test.ts`](./unit/152-store10-set-endpoint-key-unattached-target.test.ts) | Хранилище: Открепление конца стрелки (setArrowEndpointKey 'unattached') | `STORE-10 (Set Endpoint Key Unattached Target)` | ✅ PASS |
| **153** | [`153-store11-forbid-both-endpoints-unattached-via-key.test.ts`](./unit/153-store11-forbid-both-endpoints-unattached-via-key.test.ts) | Хранилище: Запрет одновременного открепления обоих концов стрелки | `STORE-11 (Forbid Both Unattached Endpoints via Key)` | ✅ PASS |
| **154** | [`154-store12-set-endpoint-key-border-top.test.ts`](./unit/154-store12-set-endpoint-key-border-top.test.ts) | Хранилище: Переключение эндпоинта на верхнюю границу (border:top) | `STORE-12 (Set Endpoint Key Border Top)` | ✅ PASS |
| **155** | [`155-store13-set-endpoint-key-border-bottom.test.ts`](./unit/155-store13-set-endpoint-key-border-bottom.test.ts) | Хранилище: Переключение эндпоинта на нижнюю границу (border:bottom) | `STORE-13 (Set Endpoint Key Border Bottom)` | ✅ PASS |
| **156** | [`156-store14-set-endpoint-key-block-port.test.ts`](./unit/156-store14-set-endpoint-key-block-port.test.ts) | Хранилище: Переключение конца на грань другого блока (block:id:side) | `STORE-14 (Set Endpoint Key Block Port)` | ✅ PASS |
| **157** | [`157-store15-set-endpoint-key-branch-junction.test.ts`](./unit/157-store15-set-endpoint-key-branch-junction.test.ts) | Хранилище: Создание ветвления через setArrowEndpointKey ('junction:branch:trunkId') | `STORE-15 (Set Endpoint Key Branch Junction)` | ✅ PASS |
| **158** | [`158-store16-remove-arrow-segment-middle.test.ts`](./unit/158-store16-remove-arrow-segment-middle.test.ts) | Хранилище: Удаление промежуточного сегмента стрелки (removeArrowSegment) | `STORE-16 (Remove Arrow Segment Middle)` | ✅ PASS |
| **159** | [`159-store17-update-arrow-point-coord-start.test.ts`](./unit/159-store17-update-arrow-point-coord-start.test.ts) | Хранилище: Обновление координаты начальной точки (updateArrowPointCoord) | `STORE-17 (Update Arrow Point Coord Start)` | ✅ PASS |
| **16** | [`16-f16-merge-from-block-output.test.ts`](./unit/16-f16-merge-from-block-output.test.ts) | Слияние: Выход блока -> Узел слияния | `F16 (Block Output -> Merge)` | ✅ PASS |
| **160** | [`160-store18-update-arrow-point-coord-end.test.ts`](./unit/160-store18-update-arrow-point-coord-end.test.ts) | Хранилище: Обновление координаты конечной точки (updateArrowPointCoord) | `STORE-18 (Update Arrow Point Coord End)` | ✅ PASS |
| **161** | [`161-math04-snap-label-horizontal-above.test.ts`](./unit/161-math04-snap-label-horizontal-above.test.ts) | Математика: Примагничивание подписи выше горизонтального сегмента | `MATH-04 (Snap Label Horizontal Above)` | ✅ PASS |
| **162** | [`162-math05-snap-label-horizontal-below.test.ts`](./unit/162-math05-snap-label-horizontal-below.test.ts) | Математика: Примагничивание подписи ниже горизонтального сегмента | `MATH-05 (Snap Label Horizontal Below)` | ✅ PASS |
| **163** | [`163-math06-snap-label-vertical-right.test.ts`](./unit/163-math06-snap-label-vertical-right.test.ts) | Математика: Примагничивание подписи справа от вертикального сегмента | `MATH-06 (Snap Label Vertical Right)` | ✅ PASS |
| **164** | [`164-math07-snap-label-vertical-left.test.ts`](./unit/164-math07-snap-label-vertical-left.test.ts) | Математика: Примагничивание подписи слева от вертикального сегмента | `MATH-07 (Snap Label Vertical Left)` | ✅ PASS |
| **165** | [`165-math08-snap-label-remote-leader-active.test.ts`](./unit/165-math08-snap-label-remote-leader-active.test.ts) | Математика: Активация линии-выноски при удалении текста от стрелки | `MATH-08 (Snap Label Remote Leader Active)` | ✅ PASS |
| **166** | [`166-math09-distance-to-segment-projection-outside-start.test.ts`](./unit/166-math09-distance-to-segment-projection-outside-start.test.ts) | Математика: Дистанция до проекции вне начала отрезка | `MATH-09 (Distance to Segment Outside Start)` | ✅ PASS |
| **167** | [`167-math10-distance-to-segment-projection-outside-end.test.ts`](./unit/167-math10-distance-to-segment-projection-outside-end.test.ts) | Математика: Дистанция до проекции вне конца отрезка | `MATH-10 (Distance to Segment Outside End)` | ✅ PASS |
| **168** | [`168-math11-collinear-simplification-zigzag.test.ts`](./unit/168-math11-collinear-simplification-zigzag.test.ts) | Математика: Устранение избыточных промежуточных точек на вертикали | `MATH-11 (Collinear Simplification Vertical)` | ✅ PASS |
| **169** | [`169-math12-generate-leader-points-nearest-segment.test.ts`](./unit/169-math12-generate-leader-points-nearest-segment.test.ts) | Математика: Построение точек выноски к ближайшему звену стрелки | `MATH-12 (Generate Leader Points Nearest Segment)` | ✅ PASS |
| **17** | [`17-f17-merge-from-border.test.ts`](./unit/17-f17-merge-from-border.test.ts) | Слияние: Объединение выходов блоков в общую шину слияния | `F17 (Block Outputs -> Merge Bus)` | ✅ PASS |
| **170** | [`170-math13-clamp-label-near-right-edge.test.ts`](./unit/170-math13-clamp-label-near-right-edge.test.ts) | Математика: Удержание длинного текста подписи в пределах правого края листа | `MATH-13 (Clamp Label Near Right Edge)` | ✅ PASS |
| **171** | [`171-router05-avoid-intermediate-block-detour-horizontal.test.ts`](./unit/171-router05-avoid-intermediate-block-detour-horizontal.test.ts) | Трассировка: Обход промежуточного блока по вертикали (avoidBlockObstacles) | `ROUTE-05 (Avoid Block Detour Horizontal)` | ✅ PASS |
| **172** | [`172-router06-avoid-intermediate-block-detour-vertical.test.ts`](./unit/172-router06-avoid-intermediate-block-detour-vertical.test.ts) | Трассировка: Обход промежуточного блока по горизонтали | `ROUTE-06 (Avoid Block Detour Vertical)` | ✅ PASS |
| **173** | [`173-router07-route-stepped-horizontal-entry-from-left.test.ts`](./unit/173-router07-route-stepped-horizontal-entry-from-left.test.ts) | Трассировка: Ступенчатый ввод с левой границы при значительном смещении по Y | `ROUTE-07 (Stepped Horizontal Entry from Left)` | ✅ PASS |
| **174** | [`174-router08-route-stepped-vertical-entry-from-top.test.ts`](./unit/174-router08-route-stepped-vertical-entry-from-top.test.ts) | Трассировка: Ступенчатый ввод с верхней границы при смещении по X | `ROUTE-08 (Stepped Vertical Entry from Top)` | ✅ PASS |
| **175** | [`175-router09-route-stepped-horizontal-exit-to-right.test.ts`](./unit/175-router09-route-stepped-horizontal-exit-to-right.test.ts) | Трассировка: Ступенчатый вывод на правую границу при смещении по Y | `ROUTE-09 (Stepped Horizontal Exit to Right)` | ✅ PASS |
| **176** | [`176-resize05-resize-block-scale-two-point-arrow-to-border.test.ts`](./unit/176-resize05-resize-block-scale-two-point-arrow-to-border.test.ts) | Масштабирование: Адаптация прямой стрелки к границе листа (2 точки) | `RESIZE-05 (Scale 2-Point Arrow to Border)` | ✅ PASS |
| **177** | [`177-resize06-resize-block-three-point-arrow-target-top.test.ts`](./unit/177-resize06-resize-block-three-point-arrow-target-top.test.ts) | Масштабирование: Адаптация 3-точечной стрелки к верхней грани блока | `RESIZE-06 (Scale 3-Point Arrow Target Top)` | ✅ PASS |
| **178** | [`178-resize07-resize-block-three-point-arrow-target-left.test.ts`](./unit/178-resize07-resize-block-three-point-arrow-target-left.test.ts) | Масштабирование: Адаптация 3-точечной стрелки к левой грани блока | `RESIZE-07 (Scale 3-Point Arrow Target Left)` | ✅ PASS |
| **179** | [`179-resize08-resize-block-scale-source-on-left-face.test.ts`](./unit/179-resize08-resize-block-scale-source-on-left-face.test.ts) | Масштабирование: Пропорциональное смещение источника на левой грани | `RESIZE-08 (Scale Source on Left Face)` | ✅ PASS |
| **18** | [`18-f18-unattached-stub-validation.test.ts`](./unit/18-f18-unattached-stub-validation.test.ts) | Неприсоединенный конец: Одиночный свободный конец стрелки | `F18 (Unattached Stub)` | ✅ PASS |
| **180** | [`180-resize09-resize-block-scale-source-on-top-face.test.ts`](./unit/180-resize09-resize-block-scale-source-on-top-face.test.ts) | Масштабирование: Пропорциональное смещение источника на верхней грани | `RESIZE-09 (Scale Source on Top Face)` | ✅ PASS |
| **181** | [`181-lint13-error-arrow-source-missing-block.test.ts`](./unit/181-lint13-error-arrow-source-missing-block.test.ts) | Линтер: Ошибка ссылки на несуществующий блок-источник (FR-LINT-03) | `LINT-13 (Missing Source Block Reference)` | ✅ PASS |
| **182** | [`182-lint14-error-arrow-target-missing-block.test.ts`](./unit/182-lint14-error-arrow-target-missing-block.test.ts) | Линтер: Ошибка ссылки на несуществующий блок-приемник (FR-LINT-03) | `LINT-14 (Missing Target Block Reference)` | ✅ PASS |
| **183** | [`183-lint15-error-arrow-source-outside-block-bounds.test.ts`](./unit/183-lint15-error-arrow-source-outside-block-bounds.test.ts) | Линтер: Ошибка начала стрелки вне геометрических границ блока | `LINT-15 (Source Outside Block Bounds)` | ✅ PASS |
| **184** | [`184-lint16-error-arrow-target-outside-block-bounds.test.ts`](./unit/184-lint16-error-arrow-target-outside-block-bounds.test.ts) | Линтер: Ошибка окончания стрелки в воздухе вне границ блока | `LINT-16 (Target Outside Block Bounds)` | ✅ PASS |
| **185** | [`185-lint17-warn-vertical-segment-cuts-label-text.test.ts`](./unit/185-lint17-warn-vertical-segment-cuts-label-text.test.ts) | Линтер: Предупреждение о перекрытии подписи вертикальным сегментом (FR-LINT-07) | `LINT-17 (Vertical Segment Label Overlap)` | ✅ PASS |
| **186** | [`186-lint18-boundary-balance-missing-output-in-child.test.ts`](./unit/186-lint18-boundary-balance-missing-output-in-child.test.ts) | Линтер: Дисбаланс граничных стрелок (отсутствует Выход в дочерней диаграмме) | `LINT-18 (Boundary Balance Missing Child Output)` | ✅ PASS |
| **187** | [`187-lint19-boundary-balance-missing-input-in-child.test.ts`](./unit/187-lint19-boundary-balance-missing-input-in-child.test.ts) | Линтер: Дисбаланс граничных стрелок (отсутствует Вход в декомпозиции) | `LINT-19 (Boundary Balance Missing Child Input)` | ✅ PASS |
| **188** | [`188-lint20-unattached-stub-arrow-warning.test.ts`](./unit/188-lint20-unattached-stub-arrow-warning.test.ts) | Линтер: Предупреждение о неподключенной стрелке-заглушке (FR-LINT-06) | `LINT-20 (Unattached Stub Arrow Warning)` | ✅ PASS |
| **189** | [`189-lint21-collinear-overlap-warning.test.ts`](./unit/189-lint21-collinear-overlap-warning.test.ts) | Линтер: Предупреждение о наложении коллинеарных стрелок (FR-LINT-05) | `LINT-21 (Collinear Overlap Linter Warning)` | ✅ PASS |
| **19** | [`19-m01-reconnect-target-endpoint.test.ts`](./unit/19-m01-reconnect-target-endpoint.test.ts) | Мутация M1: Переподключение целевого конца стрелки | `M1 (Dynamic Target Reconnection)` | ✅ PASS |
| **190** | [`190-lint22-clean-diagram-no-issues.test.ts`](./unit/190-lint22-clean-diagram-no-issues.test.ts) | Линтер: Отсутствие замечаний на эталонной корректной диаграмме | `LINT-22 (Clean Diagram Zero Issues)` | ✅ PASS |
| **191** | [`191-io05-import-reject-non-object-json.test.ts`](./unit/191-io05-import-reject-non-object-json.test.ts) | Импорт/Экспорт: Отклонение невалидного JSON (примитивы вместо объекта) | `IO-05 (Import Reject Non Object JSON)` | ✅ PASS |
| **192** | [`192-io06-import-reject-missing-system-fields.test.ts`](./unit/192-io06-import-reject-missing-system-fields.test.ts) | Импорт/Экспорт: Отклонение проекта без обязательных полей (id, name, diagrams) | `IO-06 (Import Reject Missing System Fields)` | ✅ PASS |
| **193** | [`193-io07-import-reject-duplicate-diagram-id.test.ts`](./unit/193-io07-import-reject-duplicate-diagram-id.test.ts) | Импорт/Экспорт: Отклонение проекта с дубликатами ID диаграмм | `IO-07 (Import Reject Duplicate Diagram ID)` | ✅ PASS |
| **194** | [`194-io08-import-reject-duplicate-block-id.test.ts`](./unit/194-io08-import-reject-duplicate-block-id.test.ts) | Импорт/Экспорт: Отклонение диаграммы с дубликатами ID блоков | `IO-08 (Import Reject Duplicate Block ID)` | ✅ PASS |
| **195** | [`195-io09-import-reject-invalid-block-coordinates.test.ts`](./unit/195-io09-import-reject-invalid-block-coordinates.test.ts) | Импорт/Экспорт: Отклонение нечисловых координат блоков | `IO-09 (Import Reject Invalid Block Coordinates)` | ✅ PASS |
| **196** | [`196-io10-import-project-string-via-store.test.ts`](./unit/196-io10-import-project-string-via-store.test.ts) | Хранилище: Загрузка проекта из JSON-строки (store.importProject) | `IO-10 (Import Project String via Store)` | ✅ PASS |
| **197** | [`197-io11-import-project-reject-invalid-via-store.test.ts`](./unit/197-io11-import-project-reject-invalid-via-store.test.ts) | Хранилище: Защита от повреждения состояния при сбое импорта (store.importProject) | `IO-11 (Import Protect State on Failure)` | ✅ PASS |
| **198** | [`198-proj07-load-example-in-store.test.ts`](./unit/198-proj07-load-example-in-store.test.ts) | Проект: Загрузка эталонной демонстрационной модели (store.loadExample) | `PROJ-07 (Load Example in Store)` | ✅ PASS |
| **199** | [`199-proj08-create-junction-via-store.test.ts`](./unit/199-proj08-create-junction-via-store.test.ts) | Проект: Создание узла ветвления через store.createJunction | `PROJ-08 (Create Junction via Store)` | ✅ PASS |
| **20** | [`20-m02-reconnect-source-endpoint.test.ts`](./unit/20-m02-reconnect-source-endpoint.test.ts) | Мутация M2: Переподключение исходного конца стрелки | `M2 (Dynamic Source Reconnection)` | ✅ PASS |
| **200** | [`200-proj09-full-lifecycle-create-connect-decompose-export.test.ts`](./unit/200-proj09-full-lifecycle-create-connect-decompose-export.test.ts) | Проект: Полный сквозной цикл проектирования (E2E Lifecycle) | `PROJ-09 (Full E2E Lifecycle)` | ✅ PASS |
| **201** | [`201-move05-move-block-feedback-bypass-loop-under-blocks.test.ts`](./unit/201-move05-move-block-feedback-bypass-loop-under-blocks.test.ts) | Адаптация: Построение петли обратной связи под блоками (Subcase B1 Feedback) | `MOVE-05 (Block Move Feedback Loop Under Blocks)` | ✅ PASS |
| **202** | [`202-move06-move-block-forward-right-to-control-top.test.ts`](./unit/202-move06-move-block-forward-right-to-control-top.test.ts) | Адаптация: Стрелка с Выхода на Управление вперед (Subcase B2 Forward) | `MOVE-06 (Block Move Right to Top Forward)` | ✅ PASS |
| **203** | [`203-move07-move-block-backward-right-to-control-top.test.ts`](./unit/203-move07-move-block-backward-right-to-control-top.test.ts) | Адаптация: Стрелка с Выхода на Управление назад (Subcase B2 Backward) | `MOVE-07 (Block Move Right to Top Backward)` | ✅ PASS |
| **204** | [`204-move08-move-block-default-stepped-orthogonal-routing.test.ts`](./unit/204-move08-move-block-default-stepped-orthogonal-routing.test.ts) | Адаптация: Ступенчатая 4-точечная трассировка по умолчанию | `MOVE-08 (Block Move Default 4-Point Stepped)` | ✅ PASS |
| **205** | [`205-move09-move-block-stepped-outflow-to-right-border.test.ts`](./unit/205-move09-move-block-stepped-outflow-to-right-border.test.ts) | Адаптация: 4-точечный ступенчатый вывод на правую границу (Case D n=4) | `MOVE-09 (Block Move Stepped Outflow to Border)` | ✅ PASS |
| **206** | [`206-move10-move-block-branch-junction-slides-n2.test.ts`](./unit/206-move10-move-block-branch-junction-slides-n2.test.ts) | Адаптация: Скольжение узла ветвления вдоль ствола (Case E n=2) | `MOVE-10 (Block Move Branch Junction Slides n=2)` | ✅ PASS |
| **207** | [`207-move11-move-block-branch-junction-shifts-corner-n3.test.ts`](./unit/207-move11-move-block-branch-junction-shifts-corner-n3.test.ts) | Адаптация: Подстройка угла 3-точечного ответвления (Case E n=3) | `MOVE-11 (Block Move Branch Shifts Corner n=3)` | ✅ PASS |
| **208** | [`208-move12-move-block-branch-multipoint-n5.test.ts`](./unit/208-move12-move-block-branch-multipoint-n5.test.ts) | Адаптация: Многозвенное ответвление при сдвиге блока (Case E n>=5) | `MOVE-12 (Block Move Multi-point Branch n>=5)` | ✅ PASS |
| **209** | [`209-move13-move-block-merge-arrow-shifts-into-junction.test.ts`](./unit/209-move13-move-block-merge-arrow-shifts-into-junction.test.ts) | Адаптация: Слияние стрелки в узел магистрали (Case F Merge) | `MOVE-13 (Block Move Merge Arrow into Junction)` | ✅ PASS |
| **21** | [`21-m03-shift-segment-orthogonal-invariant.test.ts`](./unit/21-m03-shift-segment-orthogonal-invariant.test.ts) | Мутация M3: Сдвиг сегмента стрелки со строгой ортогональностью | `M3 (Segment Shift & Orthogonality Invariant)` | ✅ PASS |
| **210** | [`210-move14-move-block-synchronize-first-segment-label.test.ts`](./unit/210-move14-move-block-synchronize-first-segment-label.test.ts) | Адаптация: Синхронное перемещение подписи на первом сегменте | `MOVE-14 (Synchronize First Segment Label)` | ✅ PASS |
| **211** | [`211-move15-move-block-synchronize-last-segment-label.test.ts`](./unit/211-move15-move-block-synchronize-last-segment-label.test.ts) | Адаптация: Синхронное перемещение подписи на последнем сегменте | `MOVE-15 (Synchronize Last Segment Label)` | ✅ PASS |
| **212** | [`212-name05-resolve-arrow-parent-direct-reference.test.ts`](./unit/212-name05-resolve-arrow-parent-direct-reference.test.ts) | Именование: Определение родителя стрелки по прямой ссылке ID | `NAME-05 (Arrow Parent Direct ID Reference)` | ✅ PASS |
| **213** | [`213-name06-resolve-arrow-parent-waypoint-on-horizontal-segment.test.ts`](./unit/213-name06-resolve-arrow-parent-waypoint-on-horizontal-segment.test.ts) | Именование: Поиск родителя по совпадению точки на горизонтальном отрезке | `NAME-06 (Arrow Parent Waypoint on Horizontal)` | ✅ PASS |
| **214** | [`214-name07-resolve-arrow-parent-waypoint-on-vertical-segment.test.ts`](./unit/214-name07-resolve-arrow-parent-waypoint-on-vertical-segment.test.ts) | Именование: Поиск родителя по совпадению точки на вертикальном отрезке | `NAME-07 (Arrow Parent Waypoint on Vertical)` | ✅ PASS |
| **215** | [`215-name08-display-name-branch-prefix-formatting.test.ts`](./unit/215-name08-display-name-branch-prefix-formatting.test.ts) | Именование: Форматирование префикса ответвления 'Ответвление от <Родитель>' | `NAME-08 (Branch Prefix Formatting)` | ✅ PASS |
| **216** | [`216-junc06-junction-sync-merge-arrow-n2.test.ts`](./unit/216-junc06-junction-sync-merge-arrow-n2.test.ts) | Синхронизация узлов: Слияние из 2 точек (synchronizeJunctions) | `JUNC-06 (Sync Merge Arrow n=2)` | ✅ PASS |
| **217** | [`217-junc07-junction-sync-merge-arrow-n3-source-top.test.ts`](./unit/217-junc07-junction-sync-merge-arrow-n3-source-top.test.ts) | Синхронизация узлов: Слияние из 3 точек с источником на верхней грани | `JUNC-07 (Sync Merge Arrow n=3 Source Top)` | ✅ PASS |
| **218** | [`218-junc08-junction-sync-merge-arrow-n3-source-left.test.ts`](./unit/218-junc08-junction-sync-merge-arrow-n3-source-left.test.ts) | Синхронизация узлов: Слияние из 3 точек с источником на левой грани | `JUNC-08 (Sync Merge Arrow n=3 Source Left)` | ✅ PASS |
| **219** | [`219-junc09-junction-sync-with-leader-line.test.ts`](./unit/219-junc09-junction-sync-with-leader-line.test.ts) | Синхронизация узлов: Обновление выноски подписи при сдвиге узла | `JUNC-09 (Sync Junction with Leader Line)` | ✅ PASS |
| **22** | [`22-m04-remove-corner-bend-point.test.ts`](./unit/22-m04-remove-corner-bend-point.test.ts) | Мутация M4: Удаление излома стрелки по клику | `M4 (Corner Handle Bend Deletion)` | ✅ PASS |
| **220** | [`220-resize10-resize-block-scale-four-point-arrow.test.ts`](./unit/220-resize10-resize-block-scale-four-point-arrow.test.ts) | Масштабирование: Адаптация 4-точечной стрелки (pts[1].y / pts[2].y) | `RESIZE-10 (Scale 4-Point Arrow on Resize)` | ✅ PASS |
| **221** | [`221-resize11-resize-block-leader-line-update.test.ts`](./unit/221-resize11-resize-block-leader-line-update.test.ts) | Масштабирование: Пересчет выноски подписи при ресайзе блока | `RESIZE-11 (Leader Line Update on Resize)` | ✅ PASS |
| **222** | [`222-store19-shift-arrow-segment-with-branch-junction.test.ts`](./unit/222-store19-shift-arrow-segment-with-branch-junction.test.ts) | Хранилище: Смещение сегмента ствола со встроенным узлом ветвления | `STORE-19 (Shift Segment with Branch Junction)` | ✅ PASS |
| **223** | [`223-store20-shift-arrow-segment-with-merge-junction.test.ts`](./unit/223-store20-shift-arrow-segment-with-merge-junction.test.ts) | Хранилище: Смещение сегмента ствола со встроенным узлом слияния | `STORE-20 (Shift Segment with Merge Junction)` | ✅ PASS |
| **224** | [`224-store21-set-endpoint-key-merge-junction.test.ts`](./unit/224-store21-set-endpoint-key-merge-junction.test.ts) | Хранилище: Создание узла слияния через setArrowEndpointKey ('junction:merge:trunkId') | `STORE-21 (Set Endpoint Key Merge Junction)` | ✅ PASS |
| **225** | [`225-store22-set-endpoint-key-border-left.test.ts`](./unit/225-store22-set-endpoint-key-border-left.test.ts) | Хранилище: Привязка стрелки к левой границе (border:left) | `STORE-22 (Set Endpoint Key Border Left)` | ✅ PASS |
| **226** | [`226-store23-set-endpoint-key-border-right.test.ts`](./unit/226-store23-set-endpoint-key-border-right.test.ts) | Хранилище: Привязка стрелки к правой границе (border:right) | `STORE-23 (Set Endpoint Key Border Right)` | ✅ PASS |
| **227** | [`227-router10-route-stepped-vertical-entry-from-bottom.test.ts`](./unit/227-router10-route-stepped-vertical-entry-from-bottom.test.ts) | Трассировка: Ступенчатый ввод с нижней границы к Механизму | `ROUTE-10 (Stepped Vertical Entry from Bottom)` | ✅ PASS |
| **228** | [`228-router11-route-feedback-loop-under-blocks.test.ts`](./unit/228-router11-route-feedback-loop-under-blocks.test.ts) | Трассировка: Ортогональная петля обратной связи вокруг препятствий | `ROUTE-11 (Route Feedback Loop Under Blocks)` | ✅ PASS |
| **229** | [`229-snap07-snap-to-left-border-points.test.ts`](./unit/229-snap07-snap-to-left-border-points.test.ts) | Привязка: Магнитный захват к левой границе холста (Вход) | `SNAP-07 (Snap to Left Border Points)` | ✅ PASS |
| **23** | [`23-m05-translate-block-lockstep-arrows.test.ts`](./unit/23-m05-translate-block-lockstep-arrows.test.ts) | Мутация M5: Перемещение блока с синхронным ведением стрелок | `M5 (Block Dragging Lockstep Update)` | ✅ PASS |
| **230** | [`230-snap08-snap-to-right-border-points.test.ts`](./unit/230-snap08-snap-to-right-border-points.test.ts) | Привязка: Магнитный захват к правой границе холста (Выход) | `SNAP-08 (Snap to Right Border Points)` | ✅ PASS |
| **231** | [`231-io12-export-svg-to-png-blob-with-dom-mock.test.ts`](./unit/231-io12-export-svg-to-png-blob-with-dom-mock.test.ts) | Экспорт: Конвертация SVG в PNG Blob с мокированием HTML5 Canvas | `IO-12 (Export SVG to PNG Blob with DOM Mock)` | ✅ PASS |
| **232** | [`232-io13-export-diagrams-to-zip-png-format.test.ts`](./unit/232-io13-export-diagrams-to-zip-png-format.test.ts) | Экспорт: Архивирование нескольких диаграмм в ZIP (PNG) | `IO-13 (Export Diagrams to ZIP PNG)` | ✅ PASS |
| **233** | [`233-io14-import-reject-damaged-diagram-structure.test.ts`](./unit/233-io14-import-reject-damaged-diagram-structure.test.ts) | Импорт: Отклонение диаграммы с поврежденной внутренней структурой | `IO-14 (Import Reject Damaged Diagram Structure)` | ✅ PASS |
| **234** | [`234-inter04-adjacent-segments-same-arrow-allowed.test.ts`](./unit/234-inter04-adjacent-segments-same-arrow-allowed.test.ts) | Коллизии: Разрешение смежных сегментов одной и той же стрелки | `INTER-04 (Adjacent Segments Same Arrow Allowed)` | ✅ PASS |
| **235** | [`235-inter05-endpoints-meet-at-junction-allowed.test.ts`](./unit/235-inter05-endpoints-meet-at-junction-allowed.test.ts) | Коллизии: Разрешение пересечения в точке зарегистрированного узла | `INTER-05 (Endpoints Meet at Junction Allowed)` | ✅ PASS |
| **236** | [`236-inter06-horizontal-segments-shared-branch-allowed.test.ts`](./unit/236-inter06-horizontal-segments-shared-branch-allowed.test.ts) | Коллизии: Разрешение наложения параллельных звеньев в связке ствол-ветвь | `INTER-06 (Horizontal Shared Branch Allowed)` | ✅ PASS |
| **237** | [`237-inter07-vertical-segments-shared-branch-allowed.test.ts`](./unit/237-inter07-vertical-segments-shared-branch-allowed.test.ts) | Коллизии: Разрешение наложения вертикальных звеньев ствола и ветви | `INTER-07 (Vertical Shared Branch Allowed)` | ✅ PASS |
| **238** | [`238-inter08-vertical-collinear-overlap-error.test.ts`](./unit/238-inter08-vertical-collinear-overlap-error.test.ts) | Коллизии: Обнаружение запрещенного наложения несвязанных вертикалей | `INTER-08 (Vertical Collinear Overlap Error)` | ✅ PASS |
| **239** | [`239-val06-reject-top-border-to-non-top-side.test.ts`](./unit/239-val06-reject-top-border-to-non-top-side.test.ts) | Валидация: Запрет ввода с верхней границы в боковую грань блока | `VAL-06 (Reject Top Border to Non-Top Side)` | ✅ PASS |
| **24** | [`24-m06-resize-block-scale-ports.test.ts`](./unit/24-m06-resize-block-scale-ports.test.ts) | Мутация M6: Масштабирование блока с пропорциональным сдвигом портов | `M6 (Block Resizing & Port Scaling)` | ✅ PASS |
| **240** | [`240-val07-reject-bottom-border-to-non-bottom-side.test.ts`](./unit/240-val07-reject-bottom-border-to-non-bottom-side.test.ts) | Валидация: Запрет ввода с нижней границы в боковую грань | `VAL-07 (Reject Bottom Border to Non-Bottom Side)` | ✅ PASS |
| **241** | [`241-val08-reject-border-target-from-non-right-side.test.ts`](./unit/241-val08-reject-border-target-from-non-right-side.test.ts) | Валидация: Запрет выхода на границу не из блока | `VAL-08 (Reject Border Target From Non-Right Side)` | ✅ PASS |
| **242** | [`242-val09-reject-branch-to-non-right-border.test.ts`](./unit/242-val09-reject-branch-to-non-right-border.test.ts) | Валидация: Запрет ветвления на верхнюю границу холста | `VAL-09 (Reject Branch to Non-Right Border)` | ✅ PASS |
| **243** | [`243-val10-reject-merge-from-non-right-block-side.test.ts`](./unit/243-val10-reject-merge-from-non-right-block-side.test.ts) | Валидация: Запрет слияния из верхней грани блока | `VAL-10 (Reject Merge From Non-Right Block Side)` | ✅ PASS |
| **244** | [`244-snap09-snap-to-top-border.test.ts`](./unit/244-snap09-snap-to-top-border.test.ts) | Привязка: Захват курсора у верхней границы холста (Управление) | `SNAP-09 (Snap to Top Border Control)` | ✅ PASS |
| **245** | [`245-snap10-snap-to-bottom-border.test.ts`](./unit/245-snap10-snap-to-bottom-border.test.ts) | Привязка: Захват курсора у нижней границы холста (Механизм) | `SNAP-10 (Snap to Bottom Border Mechanism)` | ✅ PASS |
| **246** | [`246-snap11-snap-segment-with-draft-source.test.ts`](./unit/246-snap11-snap-segment-with-draft-source.test.ts) | Привязка: Захват сегмента стрелки с учетом валидации драфт-источника | `SNAP-11 (Snap Segment With Draft Source)` | ✅ PASS |
| **247** | [`247-snap12-snap-segment-with-draft-target.test.ts`](./unit/247-snap12-snap-segment-with-draft-target.test.ts) | Привязка: Захват сегмента стрелки как источника ответвления для драфт-цели | `SNAP-12 (Snap Segment With Draft Target)` | ✅ PASS |
| **248** | [`248-snap13-snap-competition-border-vs-segment.test.ts`](./unit/248-snap13-snap-competition-border-vs-segment.test.ts) | Привязка: Конкуренция расстояний между границей и сегментом стрелки | `SNAP-13 (Snap Competition Border vs Segment)` | ✅ PASS |
| **249** | [`249-junc10-junction-sync-locate-parent-by-proximity.test.ts`](./unit/249-junc10-junction-sync-locate-parent-by-proximity.test.ts) | Синхронизация узлов: Поиск родительского ствола по геометрической близости | `JUNC-10 (Locate Parent by Proximity)` | ✅ PASS |
| **25** | [`25-m07-label-placement-and-leader-line.test.ts`](./unit/25-m07-label-placement-and-leader-line.test.ts) | Мутация M7: Позиционирование подписи и расчет выноски (Leader Line) | `M7 (Dynamic Label Placement & Leader Line)` | ✅ PASS |
| **250** | [`250-junc11-junction-sync-three-point-branch-horizontal.test.ts`](./unit/250-junc11-junction-sync-three-point-branch-horizontal.test.ts) | Синхронизация узлов: Адаптация 3-точечной горизонтальной ветви | `JUNC-11 (Sync 3-Point Horizontal Branch)` | ✅ PASS |
| **251** | [`251-junc12-junction-sync-four-point-merge-arrow-rebuilt.test.ts`](./unit/251-junc12-junction-sync-four-point-merge-arrow-rebuilt.test.ts) | Синхронизация узлов: Полный пересчет 4-точечной стрелки слияния | `JUNC-12 (Sync 4-Point Merge Rebuilt)` | ✅ PASS |
| **252** | [`252-router12-direct-two-point-entry-border-left.test.ts`](./unit/252-router12-direct-two-point-entry-border-left.test.ts) | Трассировка: Прямая 2-точечная линия с левой границы при соосности по Y | `ROUTE-12 (Direct 2-Point Entry Border Left)` | ✅ PASS |
| **253** | [`253-router13-direct-two-point-entry-border-top.test.ts`](./unit/253-router13-direct-two-point-entry-border-top.test.ts) | Трассировка: Прямая 2-точечная вертикаль с верхней границы при соосности по X | `ROUTE-13 (Direct 2-Point Entry Border Top)` | ✅ PASS |
| **254** | [`254-router14-direct-two-point-entry-border-bottom.test.ts`](./unit/254-router14-direct-two-point-entry-border-bottom.test.ts) | Трассировка: Прямая 2-точечная вертикаль с нижней границы при соосности по X | `ROUTE-14 (Direct 2-Point Entry Border Bottom)` | ✅ PASS |
| **255** | [`255-router15-direct-two-point-exit-block-right.test.ts`](./unit/255-router15-direct-two-point-exit-block-right.test.ts) | Трассировка: Прямой 2-точечный вывод на правую границу при соосности по Y | `ROUTE-15 (Direct 2-Point Exit Block Right)` | ✅ PASS |
| **256** | [`256-router16-five-point-detour-right-to-top.test.ts`](./unit/256-router16-five-point-detour-right-to-top.test.ts) | Трассировка: 5-точечный обход от Выхода к Управлению при близких блоках | `ROUTE-16 (Five-Point Detour Right to Top)` | ✅ PASS |
| **257** | [`257-router17-five-point-detour-right-to-bottom.test.ts`](./unit/257-router17-five-point-detour-right-to-bottom.test.ts) | Трассировка: 5-точечный обход от Выхода к Механизму при близких блоках | `ROUTE-17 (Five-Point Detour Right to Bottom)` | ✅ PASS |
| **258** | [`258-router18-direct-two-point-branch-to-top.test.ts`](./unit/258-router18-direct-two-point-branch-to-top.test.ts) | Трассировка: Прямой 2-точечный спуск от узла ветвления к Управлению | `ROUTE-18 (Direct 2-Point Branch to Top)` | ✅ PASS |
| **259** | [`259-router19-six-point-detour-junction-to-block-left.test.ts`](./unit/259-router19-six-point-detour-junction-to-block-left.test.ts) | Трассировка: 6-точечный обходной маршрут от узла ко Входу блока позади | `ROUTE-19 (Six-Point Detour Junction to Block Left)` | ✅ PASS |
| **26** | [`26-blk01-allocate-sequential-node-numbers.test.ts`](./unit/26-blk01-allocate-sequential-node-numbers.test.ts) | Блоки: Автоматическая последовательная нумерация (1, 2, 3...) | `BLK-01 (Sequential Node Numbering)` | ✅ PASS |
| **260** | [`260-router20-branch-to-block-right-stepped.test.ts`](./unit/260-router20-branch-to-block-right-stepped.test.ts) | Трассировка: Маршрутизация ветви в правую грань блока | `ROUTE-20 (Branch to Block Right Stepped)` | ✅ PASS |
| **261** | [`261-move16-move-block-four-point-inflows-from-borders.test.ts`](./unit/261-move16-move-block-four-point-inflows-from-borders.test.ts) | Адаптация: 4-точечные входящие стрелки с границ при перемещении блока | `MOVE-16 (Block Move 4-Point Inflows From Borders)` | ✅ PASS |
| **262** | [`262-store24-reconnect-target-adapts-source-border.test.ts`](./unit/262-store24-reconnect-target-adapts-source-border.test.ts) | Хранилище: Автоматическая смена стороны границы при перепривязке целевого порта | `STORE-24 (Reconnect Target Adapts Source Border)` | ✅ PASS |
| **263** | [`263-store25-reconnect-target-to-arrow-segment-merge.test.ts`](./unit/263-store25-reconnect-target-to-arrow-segment-merge.test.ts) | Хранилище: Перепривязка конца стрелки к сегменту другого потока (Слияние) | `STORE-25 (Reconnect Target to Arrow Segment)` | ✅ PASS |
| **264** | [`264-store26-update-arrow-role-and-toggle-leader.test.ts`](./unit/264-store26-update-arrow-role-and-toggle-leader.test.ts) | Хранилище: Обновление роли стрелки и переключение линии-выноски | `STORE-26 (Update Arrow Role and Toggle Leader)` | ✅ PASS |
| **265** | [`265-store27-editor-store-pub-sub-color-and-reset-route.test.ts`](./unit/265-store27-editor-store-pub-sub-color-and-reset-route.test.ts) | Хранилище: Подписка на события, окраска блока и сброс трассы стрелки | `STORE-27 (EditorStore PubSub Color Reset Route)` | ✅ PASS |
| **266** | [`266-io15-export-png-reject-null-context.test.ts`](./unit/266-io15-export-png-reject-null-context.test.ts) | Экспорт: Ошибка при недоступности 2D контекста Canvas | `IO-15 (Export PNG Null Context Error)` | ✅ PASS |
| **267** | [`267-io16-export-png-reject-null-blob.test.ts`](./unit/267-io16-export-png-reject-null-blob.test.ts) | Экспорт: Ошибка при сбое генерации Blob из Canvas | `IO-16 (Export PNG Null Blob Error)` | ✅ PASS |
| **268** | [`268-io17-export-png-reject-image-error.test.ts`](./unit/268-io17-export-png-reject-image-error.test.ts) | Экспорт: Ошибка при сбое декодирования SVG в Image | `IO-17 (Export PNG Image Load Error)` | ✅ PASS |
| **269** | [`269-io18-export-png-catch-render-exception.test.ts`](./unit/269-io18-export-png-catch-render-exception.test.ts) | Экспорт: Перехват исключения при отрисовке в Canvas | `IO-18 (Export PNG Catch Render Exception)` | ✅ PASS |
| **27** | [`27-blk02-clamp-block-to-canvas-boundaries.test.ts`](./unit/27-blk02-clamp-block-to-canvas-boundaries.test.ts) | Блоки: Ограничение координат пределами холста (Boundary Clamping) | `BLK-02 (Canvas Boundary Clamping)` | ✅ PASS |
| **270** | [`270-lint23-both-endpoints-unattached-error.test.ts`](./unit/270-lint23-both-endpoints-unattached-error.test.ts) | Линтер: Ошибка при одновременной отвязке обоих концов стрелки (FR-LINT-06) | `LINT-23 (Both Endpoints Unattached Error)` | ✅ PASS |
| **271** | [`271-store28-reconnect-target-unattached-when-src-unattached.test.ts`](./unit/271-store28-reconnect-target-unattached-when-src-unattached.test.ts) | Хранилище: Запрет открепления цели при уже открепленном источнике | `STORE-28 (Reject Both Unattached on Target)` | ✅ PASS |
| **272** | [`272-store29-reconnect-source-unattached-when-tgt-unattached.test.ts`](./unit/272-store29-reconnect-source-unattached-when-tgt-unattached.test.ts) | Хранилище: Запрет открепления источника при уже открепленной цели | `STORE-29 (Reject Both Unattached on Source)` | ✅ PASS |
| **273** | [`273-store30-reconnect-endpoint-invalid-connection-rejected.test.ts`](./unit/273-store30-reconnect-endpoint-invalid-connection-rejected.test.ts) | Хранилище: Отклонение переподключения стрелки с нарушением правил IDEF0 | `STORE-30 (Reconnect Invalid Rejected)` | ✅ PASS |
| **274** | [`274-store31-set-endpoint-key-unknown-arrow-id.test.ts`](./unit/274-store31-set-endpoint-key-unknown-arrow-id.test.ts) | Хранилище: Защита setArrowEndpointKey при несуществующем ID стрелки | `STORE-31 (Endpoint Key Unknown Arrow ID)` | ✅ PASS |
| **275** | [`275-store32-set-endpoint-key-unattached-both-rejected.test.ts`](./unit/275-store32-set-endpoint-key-unattached-both-rejected.test.ts) | Хранилище: Запрет setArrowEndpointKey('unattached') при уже открепленном конце | `STORE-32 (Endpoint Key Both Unattached Rejected)` | ✅ PASS |
| **276** | [`276-store33-set-endpoint-key-invalid-border-side.test.ts`](./unit/276-store33-set-endpoint-key-invalid-border-side.test.ts) | Хранилище: Отклонение неизвестного префикса в ключе эндпоинта | `STORE-33 (Endpoint Key Invalid Prefix)` | ✅ PASS |
| **277** | [`277-store34-set-endpoint-key-missing-block-id.test.ts`](./unit/277-store34-set-endpoint-key-missing-block-id.test.ts) | Хранилище: Отклонение ключа эндпоинта с отсутствующим блоком | `STORE-34 (Endpoint Key Missing Block ID)` | ✅ PASS |
| **278** | [`278-store35-set-endpoint-key-invalid-junction-mode.test.ts`](./unit/278-store35-set-endpoint-key-invalid-junction-mode.test.ts) | Хранилище: Отклонение недопустимого режима узла в ключе эндпоинта | `STORE-35 (Endpoint Key Invalid Junction Mode)` | ✅ PASS |
| **279** | [`279-lint24-arrow-source-outside-vertical-bounds.test.ts`](./unit/279-lint24-arrow-source-outside-vertical-bounds.test.ts) | Линтер: Выход источника стрелки за вертикальные границы блока (FR-LINT-03) | `LINT-24 (Source Outside Vertical Bounds)` | ✅ PASS |
| **28** | [`28-blk03-block-deletion-and-history-undo.test.ts`](./unit/28-blk03-block-deletion-and-history-undo.test.ts) | Блоки: Удаление функционального блока и отмена через Undo | `BLK-03 (Block Deletion and Undo)` | ✅ PASS |
| **280** | [`280-lint25-arrow-target-outside-horizontal-bounds.test.ts`](./unit/280-lint25-arrow-target-outside-horizontal-bounds.test.ts) | Линтер: Вход стрелки в верхнюю грань вне ширины блока (FR-LINT-03) | `LINT-25 (Target Outside Horizontal Bounds)` | ✅ PASS |
| **281** | [`281-lint26-arrow-segment-outside-canvas-bounds.test.ts`](./unit/281-lint26-arrow-segment-outside-canvas-bounds.test.ts) | Линтер: Выход линии стрелки за пределы листа A4 (FR-LINT-03) | `LINT-26 (Arrow Outside Canvas Bounds)` | ✅ PASS |
| **282** | [`282-store36-create-arrow-invalid-connection-null.test.ts`](./unit/282-store36-create-arrow-invalid-connection-null.test.ts) | Хранилище: Возврат null при попытке создания недопустимой стрелки | `STORE-36 (Create Arrow Invalid Connection Null)` | ✅ PASS |
| **283** | [`283-store37-delete-arrow-safe-on-ghost-id.test.ts`](./unit/283-store37-delete-arrow-safe-on-ghost-id.test.ts) | Хранилище: Безопасность deleteArrow при несуществующем ID | `STORE-37 (Delete Arrow Safe Ghost ID)` | ✅ PASS |
| **284** | [`284-store38-set-arrow-role-returns-false-on-ghost-id.test.ts`](./unit/284-store38-set-arrow-role-returns-false-on-ghost-id.test.ts) | Хранилище: Возврат false в setArrowRole при несуществующем ID стрелки | `STORE-38 (Set Arrow Role Ghost ID)` | ✅ PASS |
| **285** | [`285-store39-set-arrow-role-rejects-geometry-mismatch.test.ts`](./unit/285-store39-set-arrow-role-rejects-geometry-mismatch.test.ts) | Хранилище: Адаптация портов и геометрии при смене роли стрелки | `STORE-39 (Set Arrow Role Port Adaptation)` | ✅ PASS |
| **286** | [`286-store40-recompute-arrow-route-safe-on-empty-points.test.ts`](./unit/286-store40-recompute-arrow-route-safe-on-empty-points.test.ts) | Хранилище: Безопасность recomputeArrowRoute при отсутствии точек | `STORE-40 (Recompute Route Safe Empty Points)` | ✅ PASS |
| **287** | [`287-store41-set-arrow-pinned-safe-on-ghost-id.test.ts`](./unit/287-store41-set-arrow-pinned-safe-on-ghost-id.test.ts) | Хранилище: Безопасность setArrowPinned при несуществующем ID стрелки | `STORE-41 (Set Arrow Pinned Ghost ID)` | ✅ PASS |
| **288** | [`288-store42-delete-block-deselects-selected-block.test.ts`](./unit/288-store42-delete-block-deselects-selected-block.test.ts) | Хранилище: Сброс выделения при удалении активного блока | `STORE-42 (Delete Block Deselects Selected Block)` | ✅ PASS |
| **289** | [`289-store43-move-junction-locates-parent-by-proximity.test.ts`](./unit/289-store43-move-junction-locates-parent-by-proximity.test.ts) | Хранилище: Восстановление родителя при перемещении узла | `STORE-43 (Move Junction Locates Parent Proximity)` | ✅ PASS |
| **29** | [`29-blk04-block-decomposition-to-child-diagram.test.ts`](./unit/29-blk04-block-decomposition-to-child-diagram.test.ts) | Блоки: Декомпозиция блока в дочернюю диаграмму | `BLK-04 (Hierarchical Decomposition)` | ✅ PASS |
| **290** | [`290-store44-move-junction-clamps-margin-from-endpoints.test.ts`](./unit/290-store44-move-junction-clamps-margin-from-endpoints.test.ts) | Хранилище: Ограничение смещения узла защитным отступом 15px от концов стрелки | `STORE-44 (Move Junction Clamps Margin 15px)` | ✅ PASS |
| **291** | [`291-store45-delete-junction-removes-junction-and-branches.test.ts`](./unit/291-store45-delete-junction-removes-junction-and-branches.test.ts) | Хранилище: Обновление входящих стрелок слияния при сдвиге узла | `STORE-45 (Update Merge Arrows On Junction Move)` | ✅ PASS |
| **292** | [`292-proj10-restore-project-from-local-storage.test.ts`](./unit/292-proj10-restore-project-from-local-storage.test.ts) | Инициализация: Восстановление проекта из localStorage | `PROJ-10 (Restore Project From LocalStorage)` | ✅ PASS |
| **293** | [`293-proj11-corrupt-local-storage-fallback-clean-project.test.ts`](./unit/293-proj11-corrupt-local-storage-fallback-clean-project.test.ts) | Инициализация: Безопасный откат к чистому проекту при поврежденном localStorage | `PROJ-11 (Corrupt LocalStorage Fallback Clean Project)` | ✅ PASS |
| **294** | [`294-store46-import-direct-project-object.test.ts`](./unit/294-store46-import-direct-project-object.test.ts) | Хранилище: Импорт проекта из готового JS-объекта Project | `STORE-46 (Import Direct Project Object)` | ✅ PASS |
| **295** | [`295-store47-import-project-empty-diagrams-rejected.test.ts`](./unit/295-store47-import-project-empty-diagrams-rejected.test.ts) | Хранилище: Отклонение импорта проекта без единой диаграммы | `STORE-47 (Import Empty Diagrams Rejected)` | ✅ PASS |
| **296** | [`296-store48-decompose-already-decomposed-block-switches.test.ts`](./unit/296-store48-decompose-already-decomposed-block-switches.test.ts) | Хранилище: Повторная декомпозиция переключает на существующую дочернюю схему | `STORE-48 (Decompose Already Decomposed Block)` | ✅ PASS |
| **297** | [`297-store49-decompose-parent-control-and-mechanism-inflows.test.ts`](./unit/297-store49-decompose-parent-control-and-mechanism-inflows.test.ts) | Хранилище: Наследование входящих стрелок Управления и Механизма при декомпозиции | `STORE-49 (Decompose Parent Control Mechanism Inflows)` | ✅ PASS |
| **298** | [`298-store50-history-stack-capped-at-50.test.ts`](./unit/298-store50-history-stack-capped-at-50.test.ts) | Хранилище: Ограничение глубины истории изменений 50 снимками | `STORE-50 (History Stack Capped at 50)` | ✅ PASS |
| **299** | [`299-store51-history-undo-restores-valid-active-diagram.test.ts`](./unit/299-store51-history-undo-restores-valid-active-diagram.test.ts) | Хранилище: Безопасное восстановление activeDiagramId при откате | `STORE-51 (History Undo Restores Active Diagram)` | ✅ PASS |
| **30** | [`30-blk05-proportional-port-scaling-on-resize.test.ts`](./unit/30-blk05-proportional-port-scaling-on-resize.test.ts) | Блоки: Пропорциональный сдвиг портов при изменении ширины и высоты | `BLK-05 (Port Scaling Math)` | ✅ PASS |
| **300** | [`300-lint27-linter-registry-query-and-unregister.test.ts`](./unit/300-lint27-linter-registry-query-and-unregister.test.ts) | Линтер: Реестр правил — получение списков, выбор по ID и отмена регистрации | `LINT-27 (Linter Registry Query and Unregister)` | ✅ PASS |
| **301** | [`301-store52-editor-store-state-grid-and-commits.test.ts`](./unit/301-store52-editor-store-state-grid-and-commits.test.ts) | Хранилище: Методы getState, toggleGrid, commitBlockMove и commitBlockResize | `STORE-52 (EditorStore State Grid and Commits)` | ✅ PASS |
| **302** | [`302-store53-set-arrow-path-mode-and-legacy.test.ts`](./unit/302-store53-set-arrow-path-mode-and-legacy.test.ts) | Хранилище: Режимы трассировки стрелок (setArrowPathMode и _legacySetArrowPathMode) | `STORE-53 (Set Arrow Path Mode and Legacy)` | ✅ PASS |
| **303** | [`303-store54-straighten-arrow-horiz-to-vert.test.ts`](./unit/303-store54-straighten-arrow-horiz-to-vert.test.ts) | Хранилище: Спрямление стрелки из горизонтальной грани в вертикальную (right -> top) | `STORE-54 (Straighten Arrow Horiz to Vert)` | ✅ PASS |
| **304** | [`304-store55-straighten-arrow-vert-to-horiz.test.ts`](./unit/304-store55-straighten-arrow-vert-to-horiz.test.ts) | Хранилище: Спрямление стрелки ветвления из узла во вход блока | `STORE-55 (Straighten Arrow Vert to Horiz)` | ✅ PASS |
| **305** | [`305-store56-straighten-arrow-both-horizontal.test.ts`](./unit/305-store56-straighten-arrow-both-horizontal.test.ts) | Хранилище: Спрямление стрелки при соосных горизонтальных портах | `STORE-56 (Straighten Arrow Both Horizontal)` | ✅ PASS |
| **306** | [`306-store57-straighten-arrow-both-vertical.test.ts`](./unit/306-store57-straighten-arrow-both-vertical.test.ts) | Хранилище: Спрямление стрелки при вертикальной связи | `STORE-57 (Straighten Arrow Both Vertical)` | ✅ PASS |
| **307** | [`307-store58-set-flow-family-color-propagation.test.ts`](./unit/307-store58-set-flow-family-color-propagation.test.ts) | Хранилище: Каскадное окрашивание семейства потоков (setFlowFamilyColor) | `STORE-58 (Set Flow Family Color Propagation)` | ✅ PASS |
| **308** | [`308-store59-create-arrow-segment-source-creates-branch-junction.test.ts`](./unit/308-store59-create-arrow-segment-source-creates-branch-junction.test.ts) | Хранилище: Автоматическое создание узла ветвления при клике в сегмент стрелки | `STORE-59 (Create Arrow Segment Source Creates Junction)` | ✅ PASS |
| **309** | [`309-store60-create-arrow-segment-target-creates-merge-junction.test.ts`](./unit/309-store60-create-arrow-segment-target-creates-merge-junction.test.ts) | Хранилище: Автоматическое создание узла слияния при клике в сегмент стрелки | `STORE-60 (Create Arrow Segment Target Creates Junction)` | ✅ PASS |
| **31** | [`31-seg01-clamp-shifted-segment-to-block-boundary.test.ts`](./unit/31-seg01-clamp-shifted-segment-to-block-boundary.test.ts) | Сегменты: Ограничение сдвига сегмента габаритами подключенного блока | `SEG-01 (Segment Clamping)` | ✅ PASS |
| **310** | [`310-store61-unpin-boundary-arrow-resets-alignment.test.ts`](./unit/310-store61-unpin-boundary-arrow-resets-alignment.test.ts) | Хранилище: Автовыравнивание граничной стрелки при откреплении (pinned: false) | `STORE-61 (Unpin Boundary Arrow Resets Alignment)` | ✅ PASS |
| **311** | [`311-store62-shift-segment-updates-source-junction-y.test.ts`](./unit/311-store62-shift-segment-updates-source-junction-y.test.ts) | Хранилище: Синхронизация координаты Y узла при сдвиге родительского ствола | `STORE-62 (Shift Trunk Segment Updates Junction Y)` | ✅ PASS |
| **312** | [`312-store63-shift-segment-updates-source-junction-x.test.ts`](./unit/312-store63-shift-segment-updates-source-junction-x.test.ts) | Хранилище: Синхронизация координаты X узла при сдвиге вертикального сегмента | `STORE-63 (Shift Segment Updates Source Junction X)` | ✅ PASS |
| **313** | [`313-store64-shift-vertical-segment-clamps-block-width.test.ts`](./unit/313-store64-shift-vertical-segment-clamps-block-width.test.ts) | Хранилище: Ограничение сдвига стрелки Управления шириной блока | `STORE-64 (Shift Vertical Segment Clamps Block Width)` | ✅ PASS |
| **314** | [`314-store65-remove-arrow-point-simplifies-collinear.test.ts`](./unit/314-store65-remove-arrow-point-simplifies-collinear.test.ts) | Хранилище: Удаление промежуточной точки стрелки (removeArrowPoint) | `STORE-65 (Remove Arrow Point Simplifies Collinear)` | ✅ PASS |
| **315** | [`315-store66-remove-arrow-segment-rebuilds-route.test.ts`](./unit/315-store66-remove-arrow-segment-rebuilds-route.test.ts) | Хранилище: Удаление сегмента ломаной стрелки (removeArrowSegment) | `STORE-66 (Remove Arrow Segment Rebuilds Route)` | ✅ PASS |
| **316** | [`316-name03-parent-arrow-target-arrow-segment.test.ts`](./unit/316-name03-parent-arrow-target-arrow-segment.test.ts) | Именование: Определение родителя стрелки слияния по target.id | `NAME-03 (Parent Arrow Target Segment)` | ✅ PASS |
| **317** | [`317-name04-parent-arrow-vertical-waypoint-match.test.ts`](./unit/317-name04-parent-arrow-vertical-waypoint-match.test.ts) | Именование: Определение родителя по совпадению с вертикальным сегментом | `NAME-04 (Parent Arrow Vertical Waypoint Match)` | ✅ PASS |
| **318** | [`318-layout03-auto-layout-safe-on-empty-blocks.test.ts`](./unit/318-layout03-auto-layout-safe-on-empty-blocks.test.ts) | Компоновка: Безопасность autoLayoutIdef0 при отсутствии блоков | `LAYOUT-03 (Auto Layout Safe Empty Blocks)` | ✅ PASS |
| **319** | [`319-junc13-sync-junctions-four-point-child-branch.test.ts`](./unit/319-junc13-sync-junctions-four-point-child-branch.test.ts) | Синхронизация узлов: Перетрассировка 4-точечной ветви при сдвиге родителя | `JUNC-13 (Sync Junctions Four Point Child Branch)` | ✅ PASS |
| **32** | [`32-seg02-remove-intermediate-segment-inspector.test.ts`](./unit/32-seg02-remove-intermediate-segment-inspector.test.ts) | Сегменты: Удаление промежуточного сегмента через инспектор | `SEG-02 (Segment Removal via Inspector)` | ✅ PASS |
| **320** | [`320-junc14-sync-junctions-diagonal-two-point-merge.test.ts`](./unit/320-junc14-sync-junctions-diagonal-two-point-merge.test.ts) | Синхронизация узлов: Ортогонализация 2-точечной диагональной стрелки слияния | `JUNC-14 (Sync Junctions Diagonal Two Point Merge)` | ✅ PASS |
| **321** | [`321-inter09-collinear-horizontal-overlap-detected.test.ts`](./unit/321-inter09-collinear-horizontal-overlap-detected.test.ts) | Пересечения: Детекция недопустимого нахлеста горизонтальных звеньев | `INTER-09 (Collinear Horizontal Overlap Detected)` | ✅ PASS |
| **322** | [`322-store67-delete-snapshot-removes-snapshot.test.ts`](./unit/322-store67-delete-snapshot-removes-snapshot.test.ts) | Хранилище: Удаление контрольной точки проекта (deleteSnapshot) | `STORE-67 (Delete Snapshot Removes Snapshot)` | ✅ PASS |
| **323** | [`323-store68-restore-snapshot-ghost-id-returns-false.test.ts`](./unit/323-store68-restore-snapshot-ghost-id-returns-false.test.ts) | Хранилище: Защита при восстановлении несуществующего снимка проекта | `STORE-68 (Restore Snapshot Ghost ID Returns False)` | ✅ PASS |
| **324** | [`324-store69-move-junction-vertical-parent-clamps-margin.test.ts`](./unit/324-store69-move-junction-vertical-parent-clamps-margin.test.ts) | Хранилище: Защитный отступ узла на вертикальном родительском стволе | `STORE-69 (Move Junction Vertical Parent Clamps Margin)` | ✅ PASS |
| **325** | [`325-store70-move-junction-updates-three-point-branch-to-top.test.ts`](./unit/325-store70-move-junction-updates-three-point-branch-to-top.test.ts) | Хранилище: Пересчет 3-точечной ветви Управления при сдвиге узла | `STORE-70 (Move Junction Updates Three Point Branch To Top)` | ✅ PASS |
| **326** | [`326-snap14-block-corner-exclusion-returns-null.test.ts`](./unit/326-snap14-block-corner-exclusion-returns-null.test.ts) | Примагничивание: Исключение углов блока из зоны захвата портов | `SNAP-14 (Block Corner Exclusion Returns Null)` | ✅ PASS |
| **327** | [`327-snap15-reject-left-border-when-draft-target-invalid.test.ts`](./unit/327-snap15-reject-left-border-when-draft-target-invalid.test.ts) | Примагничивание: Отклонение захвата левой границы при невалидной цели | `SNAP-15 (Reject Left Border When Draft Target Invalid)` | ✅ PASS |
| **328** | [`328-snap16-reject-right-border-when-draft-source-invalid.test.ts`](./unit/328-snap16-reject-right-border-when-draft-source-invalid.test.ts) | Примагничивание: Отклонение захвата правой границы при невалидном источнике | `SNAP-16 (Reject Right Border When Draft Source Invalid)` | ✅ PASS |
| **329** | [`329-resize04-adapt-three-point-arrow-target-top.test.ts`](./unit/329-resize04-adapt-three-point-arrow-target-top.test.ts) | Адаптация при ресайзе: Синхронизация 3-точечной входящей стрелки сверху | `RESIZE-04 (Adapt Three Point Arrow Target Top)` | ✅ PASS |
| **33** | [`33-seg03-remove-multi-bend-corner.test.ts`](./unit/33-seg03-remove-multi-bend-corner.test.ts) | Сегменты: Удаление угловой вершины на многоступенчатом маршруте | `SEG-03 (Corner Bend Removal Multi-step)` | ✅ PASS |
| **330** | [`330-resize05-adapt-three-point-arrow-source-bottom.test.ts`](./unit/330-resize05-adapt-three-point-arrow-source-bottom.test.ts) | Адаптация при ресайзе: Синхронизация 3-точечной исходящей стрелки снизу | `RESIZE-05 (Adapt Three Point Arrow Source Bottom)` | ✅ PASS |
| **331** | [`331-resize06-adapt-arrow-source-left-target-right.test.ts`](./unit/331-resize06-adapt-arrow-source-left-target-right.test.ts) | Адаптация при ресайзе: Синхронизация стрелок на левой и правой гранях | `RESIZE-06 (Adapt Source Left Target Right)` | ✅ PASS |
| **332** | [`332-resize07-adapt-four-point-arrow-intermediate-points.test.ts`](./unit/332-resize07-adapt-four-point-arrow-intermediate-points.test.ts) | Адаптация при ресайзе: Выравнивание промежуточных звеньев 4-точечной стрелки | `RESIZE-07 (Adapt Four Point Arrow Intermediate Points)` | ✅ PASS |
| **333** | [`333-snap17-reject-top-border-when-draft-target-invalid.test.ts`](./unit/333-snap17-reject-top-border-when-draft-target-invalid.test.ts) | Примагничивание: Отклонение верхней границы при невалидной цели | `SNAP-17 (Reject Top Border When Draft Target Invalid)` | ✅ PASS |
| **334** | [`334-snap18-reject-bottom-border-when-draft-target-invalid.test.ts`](./unit/334-snap18-reject-bottom-border-when-draft-target-invalid.test.ts) | Примагничивание: Отклонение нижней границы при невалидной цели | `SNAP-18 (Reject Bottom Border When Draft Target Invalid)` | ✅ PASS |
| **335** | [`335-snap19-find-snap-target-valid-draft-source-and-segment.test.ts`](./unit/335-snap19-find-snap-target-valid-draft-source-and-segment.test.ts) | Примагничивание: Успешный захват сегмента стрелки с валидным draftSource | `SNAP-19 (Find Snap Target Valid Source And Segment)` | ✅ PASS |
| **336** | [`336-snap20-find-snap-target-valid-draft-target-and-segment.test.ts`](./unit/336-snap20-find-snap-target-valid-draft-target-and-segment.test.ts) | Примагничивание: Успешный захват сегмента стрелки с валидной draftTarget | `SNAP-20 (Find Snap Target Valid Target And Segment)` | ✅ PASS |
| **337** | [`337-name05-get-arrow-parent-returns-null-open-air.test.ts`](./unit/337-name05-get-arrow-parent-returns-null-open-air.test.ts) | Именование: Возврат null при отсутствии родителя у стрелки в открытом поле | `NAME-05 (Get Arrow Parent Returns Null Open Air)` | ✅ PASS |
| **338** | [`338-store71-history-ops-redo-restores-state.test.ts`](./unit/338-store71-history-ops-redo-restores-state.test.ts) | Хранилище: Повтор отмененного действия через HistoryOps.redo | `STORE-71 (History Ops Redo Restores State)` | ✅ PASS |
| **339** | [`339-store72-set-arrow-role-mechanism-adapts-bottom.test.ts`](./unit/339-store72-set-arrow-role-mechanism-adapts-bottom.test.ts) | Хранилище: Адаптация портов к нижней грани при смене роли на Механизм | `STORE-72 (Set Arrow Role Mechanism Adapts Bottom)` | ✅ PASS |
| **34** | [`34-seg04-straighten-arrow-minimal-delta.test.ts`](./unit/34-seg04-straighten-arrow-minimal-delta.test.ts) | Сегменты: Спрямление стрелки при минимальном смещении (<= 10px) | `SEG-04 (Arrow Straightening Threshold)` | ✅ PASS |
| **340** | [`340-store73-set-arrow-role-input-adapts-left.test.ts`](./unit/340-store73-set-arrow-role-input-adapts-left.test.ts) | Хранилище: Адаптация портов к левой грани при смене роли на Вход | `STORE-73 (Set Arrow Role Input Adapts Left)` | ✅ PASS |
| **341** | [`341-store74-set-arrow-role-outflow-adapts-right.test.ts`](./unit/341-store74-set-arrow-role-outflow-adapts-right.test.ts) | Хранилище: Адаптация исходящей стрелки к правой границе листа | `STORE-74 (Set Arrow Role Outflow Adapts Right)` | ✅ PASS |
| **342** | [`342-store75-set-arrow-role-outflow-adapts-top.test.ts`](./unit/342-store75-set-arrow-role-outflow-adapts-top.test.ts) | Хранилище: Адаптация исходящей стрелки к верхней границе листа | `STORE-75 (Set Arrow Role Outflow Adapts Top)` | ✅ PASS |
| **343** | [`343-store76-unpin-arrow-to-right-border-aligns-y.test.ts`](./unit/343-store76-unpin-arrow-to-right-border-aligns-y.test.ts) | Хранилище: Выравнивание Y целевой правой границы при сбросе фиксации | `STORE-76 (Unpin Arrow To Right Border Aligns Y)` | ✅ PASS |
| **344** | [`344-store77-legacy-set-arrow-path-mode-aligns-target-border.test.ts`](./unit/344-store77-legacy-set-arrow-path-mode-aligns-target-border.test.ts) | Хранилище: Выравнивание портов границы в _legacySetArrowPathMode('auto') | `STORE-77 (Legacy Set Arrow Path Mode Aligns Border)` | ✅ PASS |
| **345** | [`345-store78-shift-vertical-trunk-updates-children.test.ts`](./unit/345-store78-shift-vertical-trunk-updates-children.test.ts) | Хранилище: Каскадный пересчет дочерних стрелок при сдвиге вертикального ствола | `STORE-78 (Shift Vertical Trunk Updates Children)` | ✅ PASS |
| **346** | [`346-store79-straighten-arrow-to-right-border-aligns-y.test.ts`](./unit/346-store79-straighten-arrow-to-right-border-aligns-y.test.ts) | Хранилище: Спрямление стрелки к правой границе холста | `STORE-79 (Straighten Arrow Right Border Aligns Y)` | ✅ PASS |
| **347** | [`347-store80-straighten-arrow-to-top-border-aligns-x.test.ts`](./unit/347-store80-straighten-arrow-to-top-border-aligns-x.test.ts) | Хранилище: Спрямление стрелки к верхней границе холста | `STORE-80 (Straighten Arrow Top Border Aligns X)` | ✅ PASS |
| **348** | [`348-router21-near-aligned-y-two-point-direct-line.test.ts`](./unit/348-router21-near-aligned-y-two-point-direct-line.test.ts) | Трассировка: Построение прямого 2-точечного отрезка при малой несоосности по Y | `ROUTE-21 (Near Aligned Y Two Point Line)` | ✅ PASS |
| **349** | [`349-router22-detour-to-right-side-corridor.test.ts`](./unit/349-router22-detour-to-right-side-corridor.test.ts) | Трассировка: Обходной коридор при вводе в правую сторону блока спереди | `ROUTE-22 (Detour To Right Side Corridor)` | ✅ PASS |
| **35** | [`35-seg05-preserve-strict-orthogonality-on-all-segments.test.ts`](./unit/35-seg05-preserve-strict-orthogonality-on-all-segments.test.ts) | Сегменты: Инвариант строгой ортогональности (100% прямые углы) | `SEG-05 (Strict Orthogonality Invariant)` | ✅ PASS |
| **350** | [`350-math08-steep-diagonal-segment-vertical-orientation.test.ts`](./unit/350-math08-steep-diagonal-segment-vertical-orientation.test.ts) | Математика: Определение вертикальной ориентации для крутого диагонального отрезка | `MATH-08 (Steep Diagonal Vertical Orientation)` | ✅ PASS |
| **351** | [`351-move06-collapse-to-direct-line-on-near-y.test.ts`](./unit/351-move06-collapse-to-direct-line-on-near-y.test.ts) | Перемещение блока: Схлопывание в прямой горизонтальный отрезок при совмещении по высоте | `MOVE-06 (Collapse To Direct Line On Near Y)` | ✅ PASS |
| **352** | [`352-move07-two-point-arrow-between-blocks-vertical-shift.test.ts`](./unit/352-move07-two-point-arrow-between-blocks-vertical-shift.test.ts) | Перемещение блока: Сдвиг 2-точечной стрелки между блоками | `MOVE-07 (Two Point Arrow Vertical Shift)` | ✅ PASS |
| **353** | [`353-move08-incoming-mechanism-four-point-safe-corridor.test.ts`](./unit/353-move08-incoming-mechanism-four-point-safe-corridor.test.ts) | Перемещение блока: Пересчет 4-точечной входящей стрелки Механизма снизу | `MOVE-08 (Incoming Mechanism Four Point Safe Corridor)` | ✅ PASS |
| **354** | [`354-move09-incoming-input-four-point-safe-corridor.test.ts`](./unit/354-move09-incoming-input-four-point-safe-corridor.test.ts) | Перемещение блока: Пересчет 4-точечной входящей стрелки Входа слева | `MOVE-09 (Incoming Input Four Point Safe Corridor)` | ✅ PASS |
| **355** | [`355-move10-multi-point-incoming-boundary-arrow.test.ts`](./unit/355-move10-multi-point-incoming-boundary-arrow.test.ts) | Перемещение блока: Адаптация многоточечной (>4) входящей граничной стрелки | `MOVE-10 (Multi Point Incoming Boundary Arrow)` | ✅ PASS |
| **356** | [`356-move11-boundary-arrow-auto-mode-recalculates-route.test.ts`](./unit/356-move11-boundary-arrow-auto-mode-recalculates-route.test.ts) | Перемещение блока: Перетрассировка граничного выхода в автоматическом режиме | `MOVE-11 (Boundary Arrow Auto Mode Recalculates Route)` | ✅ PASS |
| **357** | [`357-move12-two-point-vertical-arrow-to-border.test.ts`](./unit/357-move12-two-point-vertical-arrow-to-border.test.ts) | Перемещение блока: Горизонтальное смещение 2-точечной вертикальной стрелки к границе | `MOVE-12 (Two Point Vertical Arrow To Border)` | ✅ PASS |
| **358** | [`358-move13-four-point-arrow-to-top-bottom-border.test.ts`](./unit/358-move13-four-point-arrow-to-top-bottom-border.test.ts) | Перемещение блока: Адаптация 4-точечной стрелки к верхней/нижней границе | `MOVE-13 (Four Point Arrow To Top/Bottom Border)` | ✅ PASS |
| **359** | [`359-move14-multi-point-outgoing-arrow-to-border.test.ts`](./unit/359-move14-multi-point-outgoing-arrow-to-border.test.ts) | Перемещение блока: Адаптация первого сегмента 5-точечной исходящей стрелки к границе | `MOVE-14 (Multi Point Outgoing Arrow To Border)` | ✅ PASS |
| **36** | [`36-geom01-direct-two-point-orthogonal-line.test.ts`](./unit/36-geom01-direct-two-point-orthogonal-line.test.ts) | Геометрия: Генерация SVG-пути для прямого отрезка из 2 точек | `GEOM-01 (Direct SVG Line Path)` | ✅ PASS |
| **360** | [`360-move15-four-point-child-branch-from-junction.test.ts`](./unit/360-move15-four-point-child-branch-from-junction.test.ts) | Перемещение блока: Адаптация 4-точечной ветви от узла к перемещаемому блоку | `MOVE-15 (Four Point Child Branch From Junction)` | ✅ PASS |
| **361** | [`361-move16-merge-arrow-channel-clearance-protection.test.ts`](./unit/361-move16-merge-arrow-channel-clearance-protection.test.ts) | Перемещение блока: Защита зазора вертикального канала стрелки слияния (минимум 20px) | `MOVE-16 (Merge Arrow Channel Clearance Protection)` | ✅ PASS |
| **362** | [`362-move17-self-loop-arrow-shifts-label-pos.test.ts`](./unit/362-move17-self-loop-arrow-shifts-label-pos.test.ts) | Перемещение блока: Сдвиг подписи стрелки самозацикливания (self-loop) | `MOVE-17 (Self Loop Arrow Shifts Label Pos)` | ✅ PASS |
| **363** | [`363-move18-label-on-middle-horizontal-segment-shifts-y.test.ts`](./unit/363-move18-label-on-middle-horizontal-segment-shifts-y.test.ts) | Перемещение блока: Синхронизация подписи на промежуточном горизонтальном звене | `MOVE-18 (Label On Horizontal Segment Shifts Y)` | ✅ PASS |
| **364** | [`364-move19-label-on-middle-vertical-segment-shifts-x.test.ts`](./unit/364-move19-label-on-middle-vertical-segment-shifts-x.test.ts) | Перемещение блока: Синхронизация подписи на промежуточном вертикальном звене | `MOVE-19 (Label On Vertical Segment Shifts X)` | ✅ PASS |
| **365** | [`365-recon09-drop-target-inside-block-for-border-top.test.ts`](./unit/365-recon09-drop-target-inside-block-for-border-top.test.ts) | Перепривязка стрелки: Бросок конца стрелки внутрь блока для граничного Управления | `RECON-09 (Drop Target Inside Block For Border Top)` | ✅ PASS |
| **366** | [`366-recon10-drop-target-inside-block-for-border-bottom.test.ts`](./unit/366-recon10-drop-target-inside-block-for-border-bottom.test.ts) | Перепривязка стрелки: Бросок конца стрелки внутрь блока для граничного Механизма | `RECON-10 (Drop Target Inside Block For Border Bottom)` | ✅ PASS |
| **367** | [`367-recon11-drop-target-inside-block-for-border-left.test.ts`](./unit/367-recon11-drop-target-inside-block-for-border-left.test.ts) | Перепривязка стрелки: Бросок конца стрелки внутрь блока для граничного Входа | `RECON-11 (Drop Target Inside Block For Border Left)` | ✅ PASS |
| **368** | [`368-recon12-drop-target-inside-block-inter-block-left.test.ts`](./unit/368-recon12-drop-target-inside-block-inter-block-left.test.ts) | Перепривязка стрелки: Бросок межблочной стрелки внутрь следующего блока | `RECON-12 (Drop Target Inside Block Inter Block Left)` | ✅ PASS |
| **369** | [`369-recon13-drop-target-inside-block-inter-block-top.test.ts`](./unit/369-recon13-drop-target-inside-block-inter-block-top.test.ts) | Перепривязка стрелки: Бросок межблочной стрелки сверху внутрь блока (Управление) | `RECON-13 (Drop Target Inside Block Inter Block Top)` | ✅ PASS |
| **37** | [`37-geom02-rounded-arc-generation-at-corners.test.ts`](./unit/37-geom02-rounded-arc-generation-at-corners.test.ts) | Геометрия: Генерация плавных дуг скругления в углах (радиус 6px) | `GEOM-02 (Rounded Corner Arcs)` | ✅ PASS |
| **370** | [`370-recon14-drop-target-in-open-space-creates-unattached.test.ts`](./unit/370-recon14-drop-target-in-open-space-creates-unattached.test.ts) | Перепривязка стрелки: Бросок конца стрелки в пустое место холста (unattached) | `RECON-14 (Drop Target In Open Space Creates Unattached)` | ✅ PASS |
| **371** | [`371-recon15-drop-source-inside-block-snaps-to-right.test.ts`](./unit/371-recon15-drop-source-inside-block-snaps-to-right.test.ts) | Перепривязка стрелки: Бросок начала стрелки внутрь блока (Выход источника) | `RECON-15 (Drop Source Inside Block Snaps To Right)` | ✅ PASS |
| **372** | [`372-recon16-drop-source-in-open-space-creates-unattached.test.ts`](./unit/372-recon16-drop-source-in-open-space-creates-unattached.test.ts) | Перепривязка стрелки: Бросок начала стрелки в пустое место холста (unattached) | `RECON-16 (Drop Source In Open Space Creates Unattached)` | ✅ PASS |
| **373** | [`373-recon17-set-endpoint-key-target-top-moves-border.test.ts`](./unit/373-recon17-set-endpoint-key-target-top-moves-border.test.ts) | Перепривязка стрелки: Синхронизация границы холста при выборе верхнего порта через ключ | `RECON-17 (Set Endpoint Key Target Top Moves Border)` | ✅ PASS |
| **374** | [`374-recon18-set-endpoint-key-target-bottom-moves-border.test.ts`](./unit/374-recon18-set-endpoint-key-target-bottom-moves-border.test.ts) | Перепривязка стрелки: Синхронизация границы холста при выборе нижнего порта через ключ | `RECON-18 (Set Endpoint Key Target Bottom Moves Border)` | ✅ PASS |
| **375** | [`375-recon19-set-endpoint-key-target-left-moves-border.test.ts`](./unit/375-recon19-set-endpoint-key-target-left-moves-border.test.ts) | Перепривязка стрелки: Синхронизация границы холста при выборе левого порта через ключ | `RECON-19 (Set Endpoint Key Target Left Moves Border)` | ✅ PASS |
| **376** | [`376-junc15-move-junction-clamps-horizontal-end-margin.test.ts`](./unit/376-junc15-move-junction-clamps-horizontal-end-margin.test.ts) | Узлы: Ограничение смещения узла не ближе 15px к концу горизонтальной стрелки | `JUNC-15 (Move Junction Clamps Horizontal End Margin)` | ✅ PASS |
| **377** | [`377-junc16-move-junction-clamps-vertical-end-margin.test.ts`](./unit/377-junc16-move-junction-clamps-vertical-end-margin.test.ts) | Узлы: Ограничение смещения узла не ближе 15px к концу вертикальной стрелки | `JUNC-16 (Move Junction Clamps Vertical End Margin)` | ✅ PASS |
| **378** | [`378-junc17-move-junction-four-point-merge-and-leader.test.ts`](./unit/378-junc17-move-junction-four-point-merge-and-leader.test.ts) | Узлы: Перетрассировка 4-точечной стрелки слияния и выноски при сдвиге узла | `JUNC-17 (Move Junction Four Point Merge And Leader)` | ✅ PASS |
| **379** | [`379-math09-vertical-parent-horizontal-branch-lead-in.test.ts`](./unit/379-math09-vertical-parent-horizontal-branch-lead-in.test.ts) | Математика: Формирование скоса ветвления на вертикальном родительском стволе | `MATH-09 (Vertical Parent Horizontal Branch Lead In)` | ✅ PASS |
| **38** | [`38-geom03-obstacle-avoidance-around-blocks.test.ts`](./unit/38-geom03-obstacle-avoidance-around-blocks.test.ts) | Геометрия: Огибание функциональных блоков коридором стрелки | `GEOM-03 (Obstacle Avoidance)` | ✅ PASS |
| **380** | [`380-math10-vertical-parent-horizontal-merge-lead-in.test.ts`](./unit/380-math10-vertical-parent-horizontal-merge-lead-in.test.ts) | Математика: Формирование скоса слияния на вертикальном родительском стволе | `MATH-10 (Vertical Parent Horizontal Merge Lead In)` | ✅ PASS |
| **381** | [`381-recon20-reject-target-unattached-when-source-unattached.test.ts`](./unit/381-recon20-reject-target-unattached-when-source-unattached.test.ts) | Перепривязка стрелки: Запрет отвязывания цели при непривязанном источнике | `RECON-20 (Reject Target Unattached When Source Unattached)` | ✅ PASS |
| **382** | [`382-recon21-reject-source-unattached-when-target-unattached.test.ts`](./unit/382-recon21-reject-source-unattached-when-target-unattached.test.ts) | Перепривязка стрелки: Запрет отвязывания источника при непривязанной цели | `RECON-21 (Reject Source Unattached When Target Unattached)` | ✅ PASS |
| **383** | [`383-recon22-reconnect-target-cleans-up-old-junction.test.ts`](./unit/383-recon22-reconnect-target-cleans-up-old-junction.test.ts) | Перепривязка стрелки: Удаление старого узла при отрыве цели стрелки | `RECON-22 (Reconnect Target Cleans Up Old Junction)` | ✅ PASS |
| **384** | [`384-recon23-reconnect-source-cleans-up-old-junction.test.ts`](./unit/384-recon23-reconnect-source-cleans-up-old-junction.test.ts) | Перепривязка стрелки: Удаление старого узла при отрыве источника ветви | `RECON-23 (Reconnect Source Cleans Up Old Junction)` | ✅ PASS |
| **385** | [`385-recon24-reconnect-source-to-segment-creates-junction.test.ts`](./unit/385-recon24-reconnect-source-to-segment-creates-junction.test.ts) | Перепривязка стрелки: Создание узла ветвления при перепривязке источника к сегменту | `RECON-24 (Reconnect Source To Segment Creates Junction)` | ✅ PASS |
| **386** | [`386-recon25-reconnect-arrow-with-leader-updates-leader-points.test.ts`](./unit/386-recon25-reconnect-arrow-with-leader-updates-leader-points.test.ts) | Перепривязка стрелки: Пересчет выносной линии при перепривязке стрелки | `RECON-25 (Reconnect Arrow With Leader Updates Points)` | ✅ PASS |
| **387** | [`387-store81-branch-inherits-parent-trunk-color.test.ts`](./unit/387-store81-branch-inherits-parent-trunk-color.test.ts) | Хранилище: Наследование цвета родительского ствола при создании ветви | `STORE-81 (Branch Inherits Parent Trunk Color)` | ✅ PASS |
| **388** | [`388-store82-reset-arrow-route-recalculates-leader-points.test.ts`](./unit/388-store82-reset-arrow-route-recalculates-leader-points.test.ts) | Хранилище: Пересчет выноски при сбросе маршрута стрелки | `STORE-82 (Reset Arrow Route Recalculates Leader Points)` | ✅ PASS |
| **389** | [`389-store83-shift-trunk-updates-child-leader-points.test.ts`](./unit/389-store83-shift-trunk-updates-child-leader-points.test.ts) | Хранилище: Каскадный пересчет выноски дочерней ветви при сдвиге родительского ствола | `STORE-83 (Shift Trunk Updates Child Leader Points)` | ✅ PASS |
| **39** | [`39-geom04-reject-snap-in-corner-exclusion-zone.test.ts`](./unit/39-geom04-reject-snap-in-corner-exclusion-zone.test.ts) | Геометрия: Запрет прилипания в угловой зоне отчуждения (< 5px от угла) | `GEOM-04 (Corner Exclusion Zone)` | ✅ PASS |
| **390** | [`390-store84-shift-trunk-updates-merge-leader-points.test.ts`](./unit/390-store84-shift-trunk-updates-merge-leader-points.test.ts) | Хранилище: Каскадный пересчет выноски стрелки слияния при сдвиге родительского ствола | `STORE-84 (Shift Trunk Updates Merge Leader Points)` | ✅ PASS |
| **391** | [`391-store85-remove-arrow-point-recalculates-leader.test.ts`](./unit/391-store85-remove-arrow-point-recalculates-leader.test.ts) | Хранилище: Пересчет выноски при удалении промежуточной точки стрелки | `STORE-85 (Remove Arrow Point Recalculates Leader)` | ✅ PASS |
| **392** | [`392-store86-remove-arrow-segment-recalculates-leader.test.ts`](./unit/392-store86-remove-arrow-segment-recalculates-leader.test.ts) | Хранилище: Пересчет выноски при удалении сегмента стрелки | `STORE-86 (Remove Arrow Segment Recalculates Leader)` | ✅ PASS |
| **393** | [`393-junc18-move-junction-reroutes-diagonal-two-point-branch.test.ts`](./unit/393-junc18-move-junction-reroutes-diagonal-two-point-branch.test.ts) | Узлы: Ортогонализация 2-точечной ветви при смещении узла | `JUNC-18 (Move Junction Reroutes Diagonal Two Point Branch)` | ✅ PASS |
| **394** | [`394-junc19-move-junction-updates-three-point-merge-from-top.test.ts`](./unit/394-junc19-move-junction-updates-three-point-merge-from-top.test.ts) | Узлы: Адаптация 3-точечной стрелки слияния при сдвиге узла | `JUNC-19 (Move Junction Updates Three Point Merge)` | ✅ PASS |
| **395** | [`395-math11-points-to-svg-path-collinear-and-zero-length.test.ts`](./unit/395-math11-points-to-svg-path-collinear-and-zero-length.test.ts) | Математика: Прямые отрезки L вместо дуг при нулевой длине и коллинеарности | `MATH-11 (Points To SVG Path Collinear And Zero Length)` | ✅ PASS |
| **396** | [`396-math12-zero-length-segment-source-side-top.test.ts`](./unit/396-math12-zero-length-segment-source-side-top.test.ts) | Математика: Вертикальная ориентация вырожденного сегмента при контакте сверху | `MATH-12 (Zero Length Segment Source Side Top)` | ✅ PASS |
| **397** | [`397-router23-build-orthogonal-route-empty-blocks.test.ts`](./unit/397-router23-build-orthogonal-route-empty-blocks.test.ts) | Трассировка: Построение ортогонального маршрута при пустом массиве блоков | `ROUTE-23 (Build Orthogonal Route Empty Blocks)` | ✅ PASS |
| **398** | [`398-router24-route-into-bottom-with-matching-x.test.ts`](./unit/398-router24-route-into-bottom-with-matching-x.test.ts) | Трассировка: Прямой 2-точечный вертикальный ввод в нижнюю грань | `ROUTE-24 (Route Into Bottom With Matching X)` | ✅ PASS |
| **399** | [`399-move20-rebind-label-to-alternate-orientation-segment.test.ts`](./unit/399-move20-rebind-label-to-alternate-orientation-segment.test.ts) | Перемещение блока: Перепривязка подписи к альтернативному сегменту при смене ориентации | `MOVE-20 (Rebind Label To Alternate Orientation Segment)` | ✅ PASS |
| **40** | [`40-geom05-allow-perpendicular-crossing.test.ts`](./unit/40-geom05-allow-perpendicular-crossing.test.ts) | Геометрия: Разрешение перпендикулярного пересечения стрелок | `GEOM-05 (Perpendicular Crossing Standard)` | ✅ PASS |
| **400** | [`400-resize08-adapt-three-point-arrow-lateral-sides.test.ts`](./unit/400-resize08-adapt-three-point-arrow-lateral-sides.test.ts) | Адаптация при ресайзе: Синхронизация 3-точечной стрелки на боковых гранях | `RESIZE-08 (Adapt Three Point Arrow Lateral Sides)` | ✅ PASS |
| **401** | [`401-recon26-drop-target-inside-block-snaps-to-bottom.test.ts`](./unit/401-recon26-drop-target-inside-block-snaps-to-bottom.test.ts) | Перепривязка стрелки: Бросок конца стрелки снизу внутрь блока (Механизм) | `RECON-26 (Drop Target Inside Block Snaps To Bottom)` | ✅ PASS |
| **402** | [`402-recon27-reconnect-source-updates-border-right-y.test.ts`](./unit/402-recon27-reconnect-source-updates-border-right-y.test.ts) | Перепривязка стрелки: Выравнивание правого граничного выхода при смене источника | `RECON-27 (Reconnect Source Updates Border Right Y)` | ✅ PASS |
| **403** | [`403-recon28-reconnect-source-invalid-side-rejected.test.ts`](./unit/403-recon28-reconnect-source-invalid-side-rejected.test.ts) | Перепривязка стрелки: Запрет привязки источника стрелки к невалидной грани | `RECON-28 (Reconnect Source Invalid Side Rejected)` | ✅ PASS |
| **404** | [`404-recon29-set-endpoint-key-cleans-up-old-branch-junction.test.ts`](./unit/404-recon29-set-endpoint-key-cleans-up-old-branch-junction.test.ts) | Перепривязка стрелки: Удаление узла ветвления при смене ключа источника через инспектор | `RECON-29 (Set Endpoint Key Cleans Up Old Branch Junction)` | ✅ PASS |
| **405** | [`405-recon30-set-endpoint-key-cleans-up-old-merge-junction.test.ts`](./unit/405-recon30-set-endpoint-key-cleans-up-old-merge-junction.test.ts) | Перепривязка стрелки: Удаление узла слияния при смене ключа цели через инспектор | `RECON-30 (Set Endpoint Key Cleans Up Old Merge Junction)` | ✅ PASS |
| **406** | [`406-geom21-shift-segment-attached-to-junction-updates-junction-y.test.ts`](./unit/406-geom21-shift-segment-attached-to-junction-updates-junction-y.test.ts) | Геометрия: Синхронизация сегмента у узла при попытке сдвига | `GEOM-21 (Shift Segment Attached To Junction Synchronizes With Trunk)` | ✅ PASS |
| **407** | [`407-geom22-shift-segment-attached-to-junction-updates-junction-x.test.ts`](./unit/407-geom22-shift-segment-attached-to-junction-updates-junction-x.test.ts) | Геометрия: Сдвиг вертикального сегмента у узла обновляет координату X узла | `GEOM-22 (Shift Segment Attached To Junction Updates Junction X)` | ✅ PASS |
| **408** | [`408-geom23-shift-vertical-segment-clamped-to-block-width.test.ts`](./unit/408-geom23-shift-vertical-segment-clamped-to-block-width.test.ts) | Геометрия: Ограничение сдвига вертикального сегмента шириной блока | `GEOM-23 (Shift Vertical Segment Clamped To Block Width)` | ✅ PASS |
| **409** | [`409-geom24-shift-trunk-segment-updates-merge-arrow-x.test.ts`](./unit/409-geom24-shift-trunk-segment-updates-merge-arrow-x.test.ts) | Геометрия: Синхронизация координаты X входящего слияния при сдвиге ствола | `GEOM-24 (Shift Trunk Segment Updates Merge Arrow X)` | ✅ PASS |
| **41** | [`41-geom06-prohibit-collinear-overlap.test.ts`](./unit/41-geom06-prohibit-collinear-overlap.test.ts) | Геометрия: Запрет коллинеарного наложения стрелок | `GEOM-06 (Collinear Overlap Prohibited)` | ✅ PASS |
| **410** | [`410-geom25-remove-arrow-point-four-points-fallback.test.ts`](./unit/410-geom25-remove-arrow-point-four-points-fallback.test.ts) | Геометрия: Перетрассировка 4-точечной стрелки при удалении точки | `GEOM-25 (Remove Arrow Point Four Points Fallback)` | ✅ PASS |
| **411** | [`411-geom26-remove-arrow-segment-edge-fallback.test.ts`](./unit/411-geom26-remove-arrow-segment-edge-fallback.test.ts) | Геометрия: Перетрассировка при удалении крайнего сегмента стрелки | `GEOM-26 (Remove Arrow Segment Edge Fallback)` | ✅ PASS |
| **412** | [`412-store87-create-arrow-empty-points-auto-routes.test.ts`](./unit/412-store87-create-arrow-empty-points-auto-routes.test.ts) | Хранилище: Автотрассировка при создании стрелки с пустым массивом points | `STORE-87 (Create Arrow Empty Points Auto Routes)` | ✅ PASS |
| **413** | [`413-store88-change-arrow-role-to-output-recalculates-target.test.ts`](./unit/413-store88-change-arrow-role-to-output-recalculates-target.test.ts) | Хранилище: Пересчет целевого порта при смене роли стрелки на Выход | `STORE-88 (Change Arrow Role To Output Recalculates Target)` | ✅ PASS |
| **414** | [`414-store89-change-arrow-role-updates-leader-points.test.ts`](./unit/414-store89-change-arrow-role-updates-leader-points.test.ts) | Хранилище: Пересчет выноски текста при смене роли стрелки | `STORE-89 (Change Arrow Role Updates Leader Points)` | ✅ PASS |
| **415** | [`415-store90-straighten-arrow-border-source-adjusts-coord.test.ts`](./unit/415-store90-straighten-arrow-border-source-adjusts-coord.test.ts) | Хранилище: Спрямление граничной стрелки выравнивает координату границы | `STORE-90 (Straighten Arrow Border Source Adjusts Coord)` | ✅ PASS |
| **416** | [`416-junc20-move-junction-reroutes-four-point-child-branch.test.ts`](./unit/416-junc20-move-junction-reroutes-four-point-child-branch.test.ts) | Узлы: Перетрассировка 4-точечной ветви при смещении родительского узла | `JUNC-20 (Move Junction Reroutes Four Point Child Branch)` | ✅ PASS |
| **417** | [`417-router25-route-into-top-when-source-below-target.test.ts`](./unit/417-router25-route-into-top-when-source-below-target.test.ts) | Трассировка: Обходной коридор входа в верхнюю грань блока снизу | `ROUTE-25 (Route Into Top When Source Below Target)` | ✅ PASS |
| **418** | [`418-router26-route-into-bottom-when-source-above-target.test.ts`](./unit/418-router26-route-into-bottom-when-source-above-target.test.ts) | Трассировка: Обходной коридор входа в нижнюю грань блока сверху | `ROUTE-26 (Route Into Bottom When Source Above Target)` | ✅ PASS |
| **419** | [`419-resize09-adapt-three-point-arrow-source-right-side.test.ts`](./unit/419-resize09-adapt-three-point-arrow-source-right-side.test.ts) | Адаптация при ресайзе: Синхронизация 3-точечной стрелки, исходящей справа | `RESIZE-09 (Adapt Three Point Arrow Source Right Side)` | ✅ PASS |
| **42** | [`42-geom07-detect-arrow-block-body-penetration.test.ts`](./unit/42-geom07-detect-arrow-block-body-penetration.test.ts) | Геометрия: Запрет сквозного пересечения тела блока стрелкой | `GEOM-07 (Block Body Penetration Prohibited)` | ✅ PASS |
| **420** | [`420-move21-auto-mode-arrow-recalculates-route-on-block-move.test.ts`](./unit/420-move21-auto-mode-arrow-recalculates-route-on-block-move.test.ts) | Перемещение блока: Автотрассировка стрелки при перемещении блока | `MOVE-21 (Auto Mode Arrow Recalculates Route On Block Move)` | ✅ PASS |
| **421** | [`421-xsect06-check-segment-collinear-horizontal-overlap.test.ts`](./unit/421-xsect06-check-segment-collinear-horizontal-overlap.test.ts) | Пересечения: Фиксация коллинеарного наложения горизонтальных отрезков | `XSECT-06 (Check Segment Collinear Horizontal Overlap)` | ✅ PASS |
| **422** | [`422-move22-middle-horizontal-segment-shifts-label-y.test.ts`](./unit/422-move22-middle-horizontal-segment-shifts-label-y.test.ts) | Перемещение блока: Сдвиг подписи на промежуточном горизонтальном коридоре петли | `MOVE-22 (Middle Horizontal Segment Shifts Label Y)` | ✅ PASS |
| **423** | [`423-move23-middle-vertical-segment-shifts-label-x.test.ts`](./unit/423-move23-middle-vertical-segment-shifts-label-x.test.ts) | Перемещение блока: Сдвиг подписи на промежуточном вертикальном коридоре | `MOVE-23 (Middle Vertical Segment Shifts Label X)` | ✅ PASS |
| **424** | [`424-recon31-fallback-two-points-target-reconnect.test.ts`](./unit/424-recon31-fallback-two-points-target-reconnect.test.ts) | Перепривязка стрелки: Защитный fallback [srcPt, tgtPt] при сбое роутера цели | `RECON-31 (Fallback Two Points Target Reconnect)` | ✅ PASS |
| **425** | [`425-recon32-fallback-two-points-source-reconnect.test.ts`](./unit/425-recon32-fallback-two-points-source-reconnect.test.ts) | Перепривязка стрелки: Защитный fallback [srcPt, tgtPt] при сбое роутера источника | `RECON-32 (Fallback Two Points Source Reconnect)` | ✅ PASS |
| **426** | [`426-math13-points-to-svg-path-three-collinear-points.test.ts`](./unit/426-math13-points-to-svg-path-three-collinear-points.test.ts) | Математика: Прямой шаг L curr без скругления при развороте потока на 180 градусов | `MATH-13 (Points To SVG Path Collinear U-Turn Without Arc)` | ✅ PASS |
| **427** | [`427-math14-vertical-trunk-upward-branch-bevel.test.ts`](./unit/427-math14-vertical-trunk-upward-branch-bevel.test.ts) | Математика: Скос ветвления на вертикальном стволе с восходящим потоком | `MATH-14 (Vertical Trunk Upward Branch Bevel)` | ✅ PASS |
| **428** | [`428-math15-vertical-trunk-upward-merge-bevel.test.ts`](./unit/428-math15-vertical-trunk-upward-merge-bevel.test.ts) | Математика: Скос слияния на вертикальном стволе с восходящим потоком | `MATH-15 (Vertical Trunk Upward Merge Bevel)` | ✅ PASS |
| **429** | [`429-router27-route-into-top-when-source-lower-than-target.test.ts`](./unit/429-router27-route-into-top-when-source-lower-than-target.test.ts) | Трассировка: Обходной коридор входа в верхнюю грань при расположении источника ниже цели | `ROUTE-27 (Route Into Top When Source Lower Than Target)` | ✅ PASS |
| **43** | [`43-geom08-magnetic-snapping-to-targets.test.ts`](./unit/43-geom08-magnetic-snapping-to-targets.test.ts) | Геометрия: Магнитное прилипание к граням блоков и границам | `GEOM-08 (Magnetic Snapping Engine)` | ✅ PASS |
| **430** | [`430-router28-route-into-bottom-when-source-higher-than-target.test.ts`](./unit/430-router28-route-into-bottom-when-source-higher-than-target.test.ts) | Трассировка: Обходной коридор входа в нижнюю грань при расположении источника выше цели | `ROUTE-28 (Route Into Bottom When Source Higher Than Target)` | ✅ PASS |
| **431** | [`431-recon33-set-endpoint-key-source-unattached-cleans-junction.test.ts`](./unit/431-recon33-set-endpoint-key-source-unattached-cleans-junction.test.ts) | Перепривязка стрелки: Очистка узла источника при выборе 'unattached' через ключ | `RECON-33 (Set Endpoint Key Source Unattached Cleans Junction)` | ✅ PASS |
| **432** | [`432-recon34-set-endpoint-key-target-unattached-cleans-junction.test.ts`](./unit/432-recon34-set-endpoint-key-target-unattached-cleans-junction.test.ts) | Перепривязка стрелки: Очистка узла цели при выборе 'unattached' через ключ | `RECON-34 (Set Endpoint Key Target Unattached Cleans Junction)` | ✅ PASS |
| **433** | [`433-recon35-set-endpoint-key-source-border-cleans-junction.test.ts`](./unit/433-recon35-set-endpoint-key-source-border-cleans-junction.test.ts) | Перепривязка стрелки: Очистка узла источника при переключении на границу через ключ | `RECON-35 (Set Endpoint Key Source Border Cleans Junction)` | ✅ PASS |
| **434** | [`434-router29-route-into-bottom-when-lower-with-dx.test.ts`](./unit/434-router29-route-into-bottom-when-lower-with-dx.test.ts) | Трассировка: 3-точечный заход ветви от узла в нижнюю грань снизу | `ROUTE-29 (Route Into Bottom When Lower With DX)` | ✅ PASS |
| **435** | [`435-router30-route-into-left-side-small-dy.test.ts`](./unit/435-router30-route-into-left-side-small-dy.test.ts) | Трассировка: Прямой 2-точечный горизонтальный ввод во входную грань | `ROUTE-30 (Route Into Left Side Small DY)` | ✅ PASS |
| **436** | [`436-junc21-move-junction-updates-child-leader-points.test.ts`](./unit/436-junc21-move-junction-updates-child-leader-points.test.ts) | Узлы: Обновление выноски дочерней ветви при смещении родительского узла | `JUNC-21 (Move Junction Updates Child Leader Points)` | ✅ PASS |
| **437** | [`437-junc22-move-junction-updates-three-point-merge-from-top.test.ts`](./unit/437-junc22-move-junction-updates-three-point-merge-from-top.test.ts) | Узлы: Синхронизация промежуточной точки 3-точечного слияния сверху | `JUNC-22 (Move Junction Updates Three Point Merge From Top)` | ✅ PASS |
| **438** | [`438-math16-horizontal-parent-opposite-flow-branch.test.ts`](./unit/438-math16-horizontal-parent-opposite-flow-branch.test.ts) | Математика: Пропуск скоса ветвления при противоположном направлении потока | `MATH-16 (Horizontal Parent Opposite Flow Branch)` | ✅ PASS |
| **439** | [`439-math17-vertical-parent-opposite-flow-branch.test.ts`](./unit/439-math17-vertical-parent-opposite-flow-branch.test.ts) | Математика: Пропуск скоса ветвления при противоположном вертикальном потоке | `MATH-17 (Vertical Parent Opposite Flow Branch)` | ✅ PASS |
| **44** | [`44-lint01-validate-block-count-bounds.test.ts`](./unit/44-lint01-validate-block-count-bounds.test.ts) | Линтер: Проверка правила FR-LINT-01 (рекомендация от 3 до 6 блоков) | `LINT-01 (Block Count Recommendation)` | ✅ PASS |
| **440** | [`440-math18-horizontal-parent-opposite-flow-merge.test.ts`](./unit/440-math18-horizontal-parent-opposite-flow-merge.test.ts) | Математика: Пропуск скоса слияния при противоположном горизонтальном потоке | `MATH-18 (Horizontal Parent Opposite Flow Merge)` | ✅ PASS |
| **441** | [`441-math19-vertical-parent-opposite-flow-merge.test.ts`](./unit/441-math19-vertical-parent-opposite-flow-merge.test.ts) | Математика: Пропуск скоса слияния при противоположном вертикальном потоке | `MATH-19 (Vertical Parent Opposite Flow Merge)` | ✅ PASS |
| **442** | [`442-store91-set-flow-family-color-propagates-to-parent-trunk.test.ts`](./unit/442-store91-set-flow-family-color-propagates-to-parent-trunk.test.ts) | Хранилище: Каскадная передача цвета семейству потока от дочерней ветви к родительскому стволу | `STORE-91 (Set Flow Family Color Propagates To Parent Trunk)` | ✅ PASS |
| **443** | [`443-store92-set-arrow-unpinned-aligns-border-left-source-y.test.ts`](./unit/443-store92-set-arrow-unpinned-aligns-border-left-source-y.test.ts) | Хранилище: Автовыравнивание левой границы источника при снятии фиксации стрелки | `STORE-92 (Set Arrow Unpinned Aligns Border Left Source Y)` | ✅ PASS |
| **444** | [`444-store93-set-arrow-unpinned-aligns-border-top-source-x.test.ts`](./unit/444-store93-set-arrow-unpinned-aligns-border-top-source-x.test.ts) | Хранилище: Автовыравнивание верхней границы источника при снятии фиксации стрелки | `STORE-93 (Set Arrow Unpinned Aligns Border Top Source X)` | ✅ PASS |
| **445** | [`445-store94-set-arrow-unpinned-aligns-border-top-target-x.test.ts`](./unit/445-store94-set-arrow-unpinned-aligns-border-top-target-x.test.ts) | Хранилище: Автовыравнивание верхней границы цели при снятии фиксации стрелки | `STORE-94 (Set Arrow Unpinned Aligns Border Top Target X)` | ✅ PASS |
| **446** | [`446-store95-legacy-set-arrow-path-mode-auto.test.ts`](./unit/446-store95-legacy-set-arrow-path-mode-auto.test.ts) | Хранилище: Автовыравнивание и пересчет выноски при _legacySetArrowPathMode('auto') | `STORE-95 (Legacy Set Arrow Path Mode Auto)` | ✅ PASS |
| **447** | [`447-store96-recompute-arrow-route-with-leader.test.ts`](./unit/447-store96-recompute-arrow-route-with-leader.test.ts) | Хранилище: Пересчет выноски при вызове recomputeArrowRoute | `STORE-96 (Recompute Arrow Route With Leader)` | ✅ PASS |
| **448** | [`448-store97-set-arrow-pinned-true-with-leader.test.ts`](./unit/448-store97-set-arrow-pinned-true-with-leader.test.ts) | Хранилище: Пересчет выноски при вызове recomputeArrowRoute с флагом showLeader | `STORE-97 (Recompute Arrow Route With Leader Line)` | ✅ PASS |
| **449** | [`449-geom27-shift-last-segment-of-merge-arrow.test.ts`](./unit/449-geom27-shift-last-segment-of-merge-arrow.test.ts) | Геометрия: Сдвиг завершающего сегмента стрелки слияния, прикрепленной к узлу | `GEOM-27 (Shift Last Segment Of Merge Arrow)` | ✅ PASS |
| **45** | [`45-lint02-validate-boundary-arrow-balance.test.ts`](./unit/45-lint02-validate-boundary-arrow-balance.test.ts) | Линтер: Проверка баланса граничных стрелок (FR-LINT-04) | `LINT-02 (Boundary Arrow Balance)` | ✅ PASS |
| **450** | [`450-geom28-shift-vertical-segment-from-block-bottom-clamps-x.test.ts`](./unit/450-geom28-shift-vertical-segment-from-block-bottom-clamps-x.test.ts) | Геометрия: Ограничение сдвига сегмента стрелки с нижней грани блока | `GEOM-28 (Shift Vertical Segment From Block Bottom Clamps X)` | ✅ PASS |
| **451** | [`451-geom29-remove-arrow-point-vertical-incoming-corner.test.ts`](./unit/451-geom29-remove-arrow-point-vertical-incoming-corner.test.ts) | Геометрия: Вычисление угла при удалении точки с вертикальным входящим звеном | `GEOM-29 (Remove Arrow Point Vertical Incoming Corner)` | ✅ PASS |
| **452** | [`452-geom30-remove-arrow-segment-last-segment-fallback.test.ts`](./unit/452-geom30-remove-arrow-segment-last-segment-fallback.test.ts) | Геометрия: Перетрассировка при удалении последнего сегмента стрелки | `GEOM-30 (Remove Arrow Segment Last Segment Fallback)` | ✅ PASS |
| **453** | [`453-router31-route-into-bottom-vertical-direct.test.ts`](./unit/453-router31-route-into-bottom-vertical-direct.test.ts) | Трассировка: Прямой вертикальный ввод снизу в нижнюю грань блока | `ROUTE-31 (Route Into Bottom Vertical Direct)` | ✅ PASS |
| **454** | [`454-router32-segment-intersects-any-block-empty.test.ts`](./unit/454-router32-segment-intersects-any-block-empty.test.ts) | Трассировка: Обнаружение коллизии вертикального сегмента с телом блока | `ROUTE-32 (Check Segment Block Collision Vertical)` | ✅ PASS |
| **455** | [`455-move24-multi-point-loop-corridor-adaptation.test.ts`](./unit/455-move24-multi-point-loop-corridor-adaptation.test.ts) | Перемещение блока: Адаптация 4-точечной стрелки с правой грани | `MOVE-24 (Adapt Four Point Arrow Source Right Side)` | ✅ PASS |
| **456** | [`456-store98-update-arrow-clamps-label-and-updates-leader.test.ts`](./unit/456-store98-update-arrow-clamps-label-and-updates-leader.test.ts) | Хранилище: Удержание подписи и пересчет выноски при updateArrow | `STORE-98 (Update Arrow Clamps Label And Updates Leader)` | ✅ PASS |
| **457** | [`457-store99-legacy-set-arrow-path-mode-source-top-aligns-x.test.ts`](./unit/457-store99-legacy-set-arrow-path-mode-source-top-aligns-x.test.ts) | Хранилище: Выравнивание X при _legacySetArrowPathMode со стрелкой сверху | `STORE-99 (Legacy Set Arrow Path Mode Source Top Aligns X)` | ✅ PASS |
| **458** | [`458-geom31-shift-vertical-trunk-updates-child-branch-and-leader.test.ts`](./unit/458-geom31-shift-vertical-trunk-updates-child-branch-and-leader.test.ts) | Геометрия: Синхронизация вертикальной ветви и выноски при сдвиге вертикального ствола | `GEOM-31 (Shift Vertical Trunk Updates Child Branch And Leader)` | ✅ PASS |
| **459** | [`459-geom32-shift-vertical-trunk-updates-incoming-merge.test.ts`](./unit/459-geom32-shift-vertical-trunk-updates-incoming-merge.test.ts) | Геометрия: Синхронизация входящей стрелки слияния при сдвиге вертикального ствола | `GEOM-32 (Shift Vertical Trunk Updates Incoming Merge)` | ✅ PASS |
| **46** | [`46-lint03-detect-unattached-arrows-and-stubs.test.ts`](./unit/46-lint03-detect-unattached-arrows-and-stubs.test.ts) | Линтер: Обнаружение неприсоединенных стрелок (FR-LINT-06) | `LINT-03 (Unattached Arrow Detection)` | ✅ PASS |
| **460** | [`460-geom33-shift-segment-updates-own-leader-points.test.ts`](./unit/460-geom33-shift-segment-updates-own-leader-points.test.ts) | Геометрия: Обновление выносной линии перемещаемой стрелки | `GEOM-33 (Shift Segment Updates Own Leader Points)` | ✅ PASS |
| **461** | [`461-geom34-reset-arrow-route-updates-leader-points.test.ts`](./unit/461-geom34-reset-arrow-route-updates-leader-points.test.ts) | Геометрия: Обновление выносной линии при straightenArrow | `GEOM-34 (Straighten Arrow Updates Leader Points)` | ✅ PASS |
| **462** | [`462-geom35-shift-horizontal-trunk-updates-incoming-merge.test.ts`](./unit/462-geom35-shift-horizontal-trunk-updates-incoming-merge.test.ts) | Геометрия: Синхронизация горизонтального слияния при сдвиге горизонтального ствола | `GEOM-35 (Shift Horizontal Trunk Updates Incoming Merge)` | ✅ PASS |
| **463** | [`463-move25-boundary-inflow-auto-mode-recalculates-on-block-move.test.ts`](./unit/463-move25-boundary-inflow-auto-mode-recalculates-on-block-move.test.ts) | Перемещение блока: Пересчет граничной входящей стрелки в режиме auto | `MOVE-25 (Boundary Inflow Auto Mode Recalculates On Block Move)` | ✅ PASS |
| **464** | [`464-move26-multi-point-inflow-adjusts-horizontal-last-segment.test.ts`](./unit/464-move26-multi-point-inflow-adjusts-horizontal-last-segment.test.ts) | Перемещение блока: Адаптация завершающего горизонтального сегмента многоточечного входа | `MOVE-26 (Multi Point Inflow Adjusts Horizontal Last Segment)` | ✅ PASS |
| **465** | [`465-move27-multi-point-outflow-adjusts-horizontal-first-segment.test.ts`](./unit/465-move27-multi-point-outflow-adjusts-horizontal-first-segment.test.ts) | Перемещение блока: Адаптация первого горизонтального сегмента многоточечного выхода | `MOVE-27 (Multi Point Outflow Adjusts Horizontal First Segment)` | ✅ PASS |
| **466** | [`466-move28-middle-vertical-corridor-shifts-label-x.test.ts`](./unit/466-move28-middle-vertical-corridor-shifts-label-x.test.ts) | Перемещение блока: Сдвиг подписи по оси X на промежуточном вертикальном звене | `MOVE-28 (Middle Vertical Corridor Shifts Label X)` | ✅ PASS |
| **467** | [`467-geom36-remove-arrow-point-horizontal-incoming-corner.test.ts`](./unit/467-geom36-remove-arrow-point-horizontal-incoming-corner.test.ts) | Геометрия: Вычисление угла при удалении точки с горизонтальным входящим звеном | `GEOM-36 (Remove Arrow Point Horizontal Incoming Corner)` | ✅ PASS |
| **468** | [`468-geom37-remove-arrow-point-fallback-build-route.test.ts`](./unit/468-geom37-remove-arrow-point-fallback-build-route.test.ts) | Геометрия: Защитный вызов buildOrthogonalRoute при сжатии стрелки в removeArrowPoint | `GEOM-37 (Remove Arrow Point Fallback Build Route)` | ✅ PASS |
| **469** | [`469-geom38-remove-arrow-segment-index-zero-fallback.test.ts`](./unit/469-geom38-remove-arrow-segment-index-zero-fallback.test.ts) | Геометрия: Перетрассировка при удалении нулевого сегмента многоточечной стрелки | `GEOM-38 (Remove Arrow Segment Index Zero Fallback)` | ✅ PASS |
| **47** | [`47-lint04-detect-non-orthogonal-routes.test.ts`](./unit/47-lint04-detect-non-orthogonal-routes.test.ts) | Линтер: Обнаружение неортогональных маршрутов (FR-LINT-03) | `LINT-04 (Non-Orthogonal Route Warning)` | ✅ PASS |
| **470** | [`470-geom39-remove-arrow-segment-fallback-build-route.test.ts`](./unit/470-geom39-remove-arrow-segment-fallback-build-route.test.ts) | Геометрия: Защитный вызов buildOrthogonalRoute при сжатии в removeArrowSegment | `GEOM-39 (Remove Arrow Segment Fallback Build Route)` | ✅ PASS |
| **471** | [`471-move29-inflow-from-right-border-four-points.test.ts`](./unit/471-move29-inflow-from-right-border-four-points.test.ts) | Перемещение блока: Адаптация 4-точечной входящей стрелки с правой границы листа | `MOVE-29 (Inflow From Right Border Four Points)` | ✅ PASS |
| **472** | [`472-move30-multi-point-inflow-vertical-last-segment.test.ts`](./unit/472-move30-multi-point-inflow-vertical-last-segment.test.ts) | Перемещение блока: Адаптация вертикального завершающего сегмента многоточечного входа | `MOVE-30 (Multi Point Inflow Vertical Last Segment)` | ✅ PASS |
| **473** | [`473-move31-multi-point-outflow-vertical-first-segment.test.ts`](./unit/473-move31-multi-point-outflow-vertical-first-segment.test.ts) | Перемещение блока: Адаптация вертикального начального сегмента многоточечного выхода | `MOVE-31 (Multi Point Outflow Vertical First Segment)` | ✅ PASS |
| **474** | [`474-geom40-shift-horizontal-trunk-updates-horizontal-merge-tail.test.ts`](./unit/474-geom40-shift-horizontal-trunk-updates-horizontal-merge-tail.test.ts) | Геометрия: Обновление хвоста горизонтального слияния при сдвиге горизонтального ствола | `GEOM-40 (Shift Horizontal Trunk Updates Horizontal Merge Tail)` | ✅ PASS |
| **475** | [`475-geom41-shift-vertical-trunk-updates-vertical-merge-tail.test.ts`](./unit/475-geom41-shift-vertical-trunk-updates-vertical-merge-tail.test.ts) | Геометрия: Обновление хвоста вертикального слияния при сдвиге вертикального ствола | `GEOM-41 (Shift Vertical Trunk Updates Vertical Merge Tail)` | ✅ PASS |
| **48** | [`48-lint05-detect-label-segment-collisions.test.ts`](./unit/48-lint05-detect-label-segment-collisions.test.ts) | Линтер: Обнаружение наложения подписи на стрелку (FR-LINT-07) | `LINT-05 (Label Segment Collision)` | ✅ PASS |
| **49** | [`49-lint06-warn-missing-control-or-mechanism.test.ts`](./unit/49-lint06-warn-missing-control-or-mechanism.test.ts) | Линтер: Предупреждение об отсутствии управления или механизма | `LINT-06 (Missing ICOM Semantics)` | ✅ PASS |
| **50** | [`50-neg01-forbid-border-to-border-connection.test.ts`](./unit/50-neg01-forbid-border-to-border-connection.test.ts) | Негативный: Запрет соединения граница-граница | `NEG-01 (Border-to-Border Prohibition)` | ✅ PASS |
| **51** | [`51-neg02-forbid-junction-to-junction-connection.test.ts`](./unit/51-neg02-forbid-junction-to-junction-connection.test.ts) | Негативный: Запрет соединения узел-узел (Junction-to-Junction) | `NEG-02 (Junction-to-Junction Prohibition)` | ✅ PASS |
| **52** | [`52-neg03-forbid-both-endpoints-unattached.test.ts`](./unit/52-neg03-forbid-both-endpoints-unattached.test.ts) | Негативный: Запрет стрелки с двумя неприсоединенными концами | `NEG-03 (Both Endpoints Unattached Prohibition)` | ✅ PASS |
| **53** | [`53-neg04-forbid-second-block-on-context-diagram.test.ts`](./unit/53-neg04-forbid-second-block-on-context-diagram.test.ts) | Негативный: Запрет создания второго блока на контекстной диаграмме A0 | `NEG-04 (Single Context Block Restriction)` | ✅ PASS |
| **54** | [`54-io01-export-and-import-json-model.test.ts`](./unit/54-io01-export-and-import-json-model.test.ts) | Сериализация: Экспорт и импорт модели проекта в JSON | `IO-01 (JSON Serialization Roundtrip)` | ✅ PASS |
| **55** | [`55-io02-reject-malformed-json-import.test.ts`](./unit/55-io02-reject-malformed-json-import.test.ts) | Сериализация: Отклонение некорректного JSON при импорте | `IO-02 (Malformed JSON Rejection)` | ✅ PASS |
| **56** | [`56-io03-export-clean-svg-diagram.test.ts`](./unit/56-io03-export-clean-svg-diagram.test.ts) | Экспорт: Генерация чистого векторного SVG по стандарту IDEF0 | `IO-03 (SVG Diagram Export)` | ✅ PASS |
| **57** | [`57-io04-export-multi-diagram-zip-archive.test.ts`](./unit/57-io04-export-multi-diagram-zip-archive.test.ts) | Экспорт: Пакетный экспорт диаграмм в единый ZIP-архив | `IO-04 (Multi-diagram ZIP Export)` | ✅ PASS |
| **58** | [`58-store01-history-undo-redo-stack.test.ts`](./unit/58-store01-history-undo-redo-stack.test.ts) | Хранилище: Управление стеком истории Undo / Redo | `STORE-01 (History Undo/Redo Stack)` | ✅ PASS |
| **59** | [`59-store02-autolayout-diagonal-distribution.test.ts`](./unit/59-store02-autolayout-diagonal-distribution.test.ts) | Хранилище: Автоматическая диагональная раскладка блоков («Лесенка») | `STORE-02 (Diagonal Auto-Layout)` | ✅ PASS |
| **60** | [`60-store03-hierarchical-node-naming.test.ts`](./unit/60-store03-hierarchical-node-naming.test.ts) | Хранилище: Расчет иерархических кодов блоков (A0, A1, A1.1...) | `STORE-03 (Hierarchical Code Computation)` | ✅ PASS |
| **61** | [`61-neg05-forbid-source-from-block-input.test.ts`](./unit/61-neg05-forbid-source-from-block-input.test.ts) | Негативный: Запрет исходящей стрелки из левой грани блока (Вход) | `NEG-05 (Block Input Source Prohibited)` | ✅ PASS |
| **62** | [`62-neg06-forbid-source-from-block-control.test.ts`](./unit/62-neg06-forbid-source-from-block-control.test.ts) | Негативный: Запрет исходящей стрелки из верхней грани блока (Управление) | `NEG-06 (Block Control Source Prohibited)` | ✅ PASS |
| **63** | [`63-neg07-forbid-source-from-block-mechanism.test.ts`](./unit/63-neg07-forbid-source-from-block-mechanism.test.ts) | Негативный: Запрет исходящей стрелки из нижней грани блока (Механизм) | `NEG-07 (Block Mechanism Source Prohibited)` | ✅ PASS |
| **64** | [`64-neg08-forbid-target-into-block-output.test.ts`](./unit/64-neg08-forbid-target-into-block-output.test.ts) | Негативный: Запрет входящей стрелки в правую грань блока (Выход) | `NEG-08 (Block Output Target Prohibited)` | ✅ PASS |
| **65** | [`65-neg09-forbid-source-from-right-border.test.ts`](./unit/65-neg09-forbid-source-from-right-border.test.ts) | Негативный: Запрет начала стрелки с правой границы холста | `NEG-09 (Right Border Source Prohibited)` | ✅ PASS |
| **66** | [`66-neg10-forbid-target-into-left-border.test.ts`](./unit/66-neg10-forbid-target-into-left-border.test.ts) | Негативный: Запрет окончания стрелки на левой границе холста | `NEG-10 (Left Border Target Prohibited)` | ✅ PASS |
| **67** | [`67-neg11-forbid-mismatched-border-to-block-face.test.ts`](./unit/67-neg11-forbid-mismatched-border-to-block-face.test.ts) | Негативный: Запрет несоответствия семантики границы и грани блока | `NEG-11 (Mismatched Border Face Prohibited)` | ✅ PASS |
| **68** | [`68-neg12-forbid-border-source-merging-into-junction.test.ts`](./unit/68-neg12-forbid-border-source-merging-into-junction.test.ts) | Негативный: Запрет прямого слияния стрелки с границы в существующий поток | `NEG-12 (Border Merge Prohibited)` | ✅ PASS |
| **69** | [`69-neg13-forbid-branch-to-non-right-border.test.ts`](./unit/69-neg13-forbid-branch-to-non-right-border.test.ts) | Негативный: Запрет ветвления потока на левую, верхнюю или нижнюю границу | `NEG-13 (Branch to Non-Right Border Prohibited)` | ✅ PASS |
| **70** | [`70-snap01-snap-to-block-top-control.test.ts`](./unit/70-snap01-snap-to-block-top-control.test.ts) | Прилипание: Магнитный захват верхней грани блока (роль control) | `SNAP-01 (Snap to Block Control)` | ✅ PASS |
| **71** | [`71-snap02-snap-to-block-bottom-mechanism.test.ts`](./unit/71-snap02-snap-to-block-bottom-mechanism.test.ts) | Прилипание: Магнитный захват нижней грани блока (роль mechanism) | `SNAP-02 (Snap to Block Mechanism)` | ✅ PASS |
| **72** | [`72-snap03-snap-to-block-right-output.test.ts`](./unit/72-snap03-snap-to-block-right-output.test.ts) | Прилипание: Магнитный захват правой грани блока (роль output) | `SNAP-03 (Snap to Block Output)` | ✅ PASS |
| **73** | [`73-snap04-border-snap-points.test.ts`](./unit/73-snap04-border-snap-points.test.ts) | Прилипание: Захват границ холста через getBorderSnapPoint | `SNAP-04 (Border Snap Target Selection)` | ✅ PASS |
| **74** | [`74-snap05-arrow-segment-snap.test.ts`](./unit/74-snap05-arrow-segment-snap.test.ts) | Прилипание: Захват промежуточного сегмента существующей стрелки | `SNAP-05 (Arrow Segment Snapping)` | ✅ PASS |
| **75** | [`75-snap06-find-snap-target-integration.test.ts`](./unit/75-snap06-find-snap-target-integration.test.ts) | Прилипание: Комплексный поиск ближайшей цели через findSnapTarget | `SNAP-06 (Integrated Snap Target Engine)` | ✅ PASS |
| **76** | [`76-junc01-move-junction-along-horizontal-segment.test.ts`](./unit/76-junc01-move-junction-along-horizontal-segment.test.ts) | Узлы: Перемещение узла ветвления вдоль горизонтального сегмента | `JUNC-01 (Horizontal Junction Movement)` | ✅ PASS |
| **77** | [`77-junc02-clamp-junction-to-segment-endpoints.test.ts`](./unit/77-junc02-clamp-junction-to-segment-endpoints.test.ts) | Узлы: Ограничение перемещения узла с отступом от концов сегмента (>= 15px) | `JUNC-02 (Junction Endpoint Clamping)` | ✅ PASS |
| **78** | [`78-junc03-sync-branch-arrows-on-junction-move.test.ts`](./unit/78-junc03-sync-branch-arrows-on-junction-move.test.ts) | Узлы: Синхронное обновление маршрута дочерней ветви при смещении узла | `JUNC-03 (Branch Synchronization on Move)` | ✅ PASS |
| **79** | [`79-junc04-prune-orphan-junctions.test.ts`](./unit/79-junc04-prune-orphan-junctions.test.ts) | Узлы: Автоматическая очистка сиротских узлов без стрелок (synchronizeJunctions) | `JUNC-04 (Orphan Junction Pruning)` | ✅ PASS |
| **80** | [`80-junc05-sync-merge-arrows-on-junction-move.test.ts`](./unit/80-junc05-sync-merge-arrows-on-junction-move.test.ts) | Узлы: Синхронное обновление входящей стрелки слияния при сдвиге узла | `JUNC-05 (Merge Synchronization on Move)` | ✅ PASS |
| **81** | [`81-arr01-set-arrow-role.test.ts`](./unit/81-arr01-set-arrow-role.test.ts) | Стрелки: Смена ICOM-роли стрелки через инспектор | `ARR-01 (Change Arrow Role)` | ✅ PASS |
| **82** | [`82-arr02-toggle-leader-visibility.test.ts`](./unit/82-arr02-toggle-leader-visibility.test.ts) | Стрелки: Переключение режима выноски подписи стрелки (toggleLeader) | `ARR-02 (Toggle Leader Line)` | ✅ PASS |
| **83** | [`83-arr03-delete-arrow-and-cascade-branches.test.ts`](./unit/83-arr03-delete-arrow-and-cascade-branches.test.ts) | Стрелки: Удаление стрелки с очисткой зависимых узлов ветвления | `ARR-03 (Delete Arrow Cascade)` | ✅ PASS |
| **84** | [`84-arr04-set-arrow-pinned-state.test.ts`](./unit/84-arr04-set-arrow-pinned-state.test.ts) | Стрелки: Фиксация геометрии стрелки (setArrowPinned) | `ARR-04 (Arrow Pinning State)` | ✅ PASS |
| **85** | [`85-arr05-reset-arrow-route-to-auto.test.ts`](./unit/85-arr05-reset-arrow-route-to-auto.test.ts) | Стрелки: Сброс ручных изломов к автоматическому ортогональному маршруту | `ARR-05 (Reset Arrow Route)` | ✅ PASS |
| **86** | [`86-arr06-set-flow-family-color.test.ts`](./unit/86-arr06-set-flow-family-color.test.ts) | Стрелки: Установка цвета семейства потока для ствола и ответвлений | `ARR-06 (Flow Family Coloring)` | ✅ PASS |
| **87** | [`87-proj01-reset-project-state.test.ts`](./unit/87-proj01-reset-project-state.test.ts) | Проект: Сброс проекта в начальное состояние (resetProject) | `PROJ-01 (Reset Project State)` | ✅ PASS |
| **88** | [`88-proj02-update-project-metadata.test.ts`](./unit/88-proj02-update-project-metadata.test.ts) | Проект: Обновление метаданных проекта (updateProjectMeta) | `PROJ-02 (Update Project Metadata)` | ✅ PASS |
| **89** | [`89-proj03-switch-active-diagram.test.ts`](./unit/89-proj03-switch-active-diagram.test.ts) | Проект: Переключение активной диаграммы проекта (switchDiagram) | `PROJ-03 (Switch Active Diagram)` | ✅ PASS |
| **90** | [`90-proj04-create-custom-diagram.test.ts`](./unit/90-proj04-create-custom-diagram.test.ts) | Проект: Создание произвольной диаграммы в проекте (createDiagram) | `PROJ-04 (Create Custom Diagram)` | ✅ PASS |
| **91** | [`91-proj05-save-and-restore-project-snapshot.test.ts`](./unit/91-proj05-save-and-restore-project-snapshot.test.ts) | Проект: Сохранение и восстановление снимка проекта (Snapshot) | `PROJ-05 (Project Snapshot Engine)` | ✅ PASS |
| **92** | [`92-proj06-delete-project-snapshot.test.ts`](./unit/92-proj06-delete-project-snapshot.test.ts) | Проект: Удаление сохраненного снимка проекта | `PROJ-06 (Delete Project Snapshot)` | ✅ PASS |
| **93** | [`93-lint07-warn-too-many-blocks.test.ts`](./unit/93-lint07-warn-too-many-blocks.test.ts) | Линтер: Предупреждение о перегруженной диаграмме (> 6 блоков) | `LINT-07 (Excessive Block Count Warning)` | ✅ PASS |
| **94** | [`94-lint08-error-block-too-small.test.ts`](./unit/94-lint08-error-block-too-small.test.ts) | Линтер: Ошибка недопустимо малого размера блока (< 100x60px) | `LINT-08 (Minimum Block Size Error)` | ✅ PASS |
| **95** | [`95-lint09-warn-block-too-large.test.ts`](./unit/95-lint09-warn-block-too-large.test.ts) | Линтер: Предупреждение о чрезмерно большом блоке (> 800x600px) | `LINT-09 (Maximum Block Size Warning)` | ✅ PASS |
| **96** | [`96-lint10-error-block-out-of-bounds.test.ts`](./unit/96-lint10-error-block-out-of-bounds.test.ts) | Линтер: Ошибка выхода блока за границы формата листа A4 | `LINT-10 (Block Canvas Out of Bounds Error)` | ✅ PASS |
| **97** | [`97-lint11-boundary-arrow-imbalance-detection.test.ts`](./unit/97-lint11-boundary-arrow-imbalance-detection.test.ts) | Линтер: Обнаружение дисбаланса граничных стрелок между уровнями | `LINT-11 (Boundary Imbalance Error Detection)` | ✅ PASS |
| **98** | [`98-lint12-broken-junction-parent-reference.test.ts`](./unit/98-lint12-broken-junction-parent-reference.test.ts) | Линтер: Обнаружение разрыва ссылки на родительский поток в узле | `LINT-12 (Broken Branch Reference Detection)` | ✅ PASS |
| **99** | [`99-name01-resolve-arrow-parent-hierarchy.test.ts`](./unit/99-name01-resolve-arrow-parent-hierarchy.test.ts) | Именование: Определение родительской стрелки через getArrowParent | `NAME-01 (Arrow Parent Resolution)` | ✅ PASS |

---

## 📝 Полная спецификация сценариев тестирования

### ТЕСТ №01: Входной поток: Левая граница -> Вход блока (Вход)

* **Файл**: [`tests/unit/01-f01-border-left-to-block-input.test.ts`](./unit/01-f01-border-left-to-block-input.test.ts)
* **Класс эквивалентности**: `F1 (Border Left -> Block Input)`
* **Описание**: Проверяет создание и ортогональную трассировку стрелки от левой границы холста к левой грани блока.

#### Предусловия:
* - Инициализирована диаграмма декомпозиции A1.
* - На диаграмме создан блок (300, 200).

#### Выполняемые действия:
1. Задать стрелку с началом на левой границе ({ type: 'border', side: 'left', point: { x: 30, y: 265 } }).
2. Указать цель на левой грани блока ({ type: 'block', side: 'left', point: { x: 300, y: 265 } }).
3. Проверить создание стрелки в store.

#### Ожидаемый результат:
Стрелка создана с ролью 'input', соединяет левую границу холста со входом блока.

---

### ТЕСТ №02: Управляющий поток: Верхняя граница -> Верх блока (Управление)

* **Файл**: [`tests/unit/02-f02-border-top-to-block-control.test.ts`](./unit/02-f02-border-top-to-block-control.test.ts)
* **Класс эквивалентности**: `F2 (Border Top -> Block Control)`
* **Описание**: Проверяет создание управляющего потока от верхней границы диаграммы к верхней грани блока.

#### Предусловия:
* - Инициализирована диаграмма A1.
* - На диаграмме создан блок.

#### Выполняемые действия:
1. Задать стрелку от верхней границы к верхней грани блока.
2. Проверить присвоение роли control.

#### Ожидаемый результат:
Стрелка зарегистрирована с ролью 'control', вертикально входит в блок сверху.

---

### ТЕСТ №03: Поток механизма: Нижняя граница -> Низ блока (Механизм)

* **Файл**: [`tests/unit/03-f03-border-bottom-to-block-mechanism.test.ts`](./unit/03-f03-border-bottom-to-block-mechanism.test.ts)
* **Класс эквивалентности**: `F3 (Border Bottom -> Block Mechanism)`
* **Описание**: Проверяет создание стрелки механизма снизу от нижней границы холста к нижней грани блока.

#### Предусловия:
* - Инициализирована диаграмма A1.
* - На холсте присутствует блок.

#### Выполняемые действия:
1. Задать стрелку от нижней границы снизу вверх к нижней грани блока.
2. Проверить роль 'mechanism'.

#### Ожидаемый результат:
Стрелка создана с ролью 'mechanism', направлена снизу вверх.

---

### ТЕСТ №04: Выходной поток: Выход блока -> Правая граница (Выход)

* **Файл**: [`tests/unit/04-f04-block-output-to-border-right.test.ts`](./unit/04-f04-block-output-to-border-right.test.ts)
* **Класс эквивалентности**: `F4 (Block Output -> Border Right)`
* **Описание**: Проверяет создание стрелки выхода, выходящей из правой грани блока и уходящей за правую границу холста.

#### Предусловия:
* - Диаграмма A1 активна.
* - Блок размещен на холсте.

#### Выполняемые действия:
1. Задать стрелку с правой грани блока на правую границу.
2. Проверить роль 'output'.

#### Ожидаемый результат:
Стрелка зарегистрирована с ролью 'output', направлена слева направо к границе.

---

### ТЕСТ №05: Прямая межблочная связь: Выход Блока 1 -> Вход Блока 2

* **Файл**: [`tests/unit/05-f05-forward-block-to-block-input.test.ts`](./unit/05-f05-forward-block-to-block-input.test.ts)
* **Класс эквивалентности**: `F5 (Block Output -> Block Input Forward)`
* **Описание**: Проверяет создание прямой связи между двумя блоками по диагонали (выход первого во вход второго).

#### Предусловия:
* - Диаграмма A1 содержит Блок 1 (200, 200) и Блок 2 (500, 350).

#### Выполняемые действия:
1. Соединить правую грань Блока 1 с левой гранью Блока 2.
2. Построить ортогональный маршрут.

#### Ожидаемый результат:
Стрелка построена со ступенчатым ортогональным Z-маршрутом, роль равна 'input'.

---

### ТЕСТ №06: Прямая межблочная связь: Выход Блока 1 -> Управление Блока 2

* **Файл**: [`tests/unit/06-f06-forward-block-to-block-control.test.ts`](./unit/06-f06-forward-block-to-block-control.test.ts)
* **Класс эквивалентности**: `F6 (Block Output -> Block Control Forward)`
* **Описание**: Проверяет создание связи от выхода первого блока к верхней грани (управлению) второго блока.

#### Предусловия:
* - Диаграмма A1 содержит Блок 1 (200, 200) и Блок 2 (550, 400).

#### Выполняемые действия:
1. Соединить правую грань Блока 1 с верхней гранью Блока 2.
2. Построить ортогональный маршрут.

#### Ожидаемый результат:
Стрелка успешно создана, роль равна 'control', конечная грань — 'top'.

---

### ТЕСТ №07: Прямая межблочная связь: Выход Блока 1 -> Механизм Блока 2

* **Файл**: [`tests/unit/07-f07-forward-block-to-block-mechanism.test.ts`](./unit/07-f07-forward-block-to-block-mechanism.test.ts)
* **Класс эквивалентности**: `F7 (Block Output -> Block Mechanism Forward)`
* **Описание**: Проверяет создание связи от выхода первого блока к нижней грани (механизму) второго блока.

#### Предусловия:
* - Диаграмма A1 содержит Блок 1 (200, 200) и Блок 2 (550, 100).

#### Выполняемые действия:
1. Соединить правую грань Блока 1 с нижней гранью Блока 2.
2. Построить ортогональный маршрут.

#### Ожидаемый результат:
Стрелка создана с ролью 'mechanism', конечная сторона — 'bottom'.

---

### ТЕСТ №08: Обратная связь по управлению: Выход Блока 2 -> Управление Блока 1

* **Файл**: [`tests/unit/08-f08-feedback-loop-output-to-control.test.ts`](./unit/08-f08-feedback-loop-output-to-control.test.ts)
* **Класс эквивалентности**: `F8 (Feedback Loop Output -> Control)`
* **Описание**: Проверяет построение огибающей петли обратной связи (Feedback Loop) справа налево через верхний коридор диаграммы.

#### Предусловия:
* - Диаграмма A1 содержит Блок 1 (200, 300) и Блок 2 (600, 450).

#### Выполняемые действия:
1. Провести стрелку от выхода Блока 2 к верхнему управлению Блока 1.
2. Построить огибающий маршрут.

#### Ожидаемый результат:
Петля обратной связи построена с коридором выше обоих блоков, роль равна 'control'.

---

### ТЕСТ №09: Обратная связь по входу: Выход Блока 2 -> Вход Блока 1

* **Файл**: [`tests/unit/09-f09-feedback-loop-output-to-input.test.ts`](./unit/09-f09-feedback-loop-output-to-input.test.ts)
* **Класс эквивалентности**: `F9 (Feedback Loop Output -> Input)`
* **Описание**: Проверяет построение обратной связи от выхода последующего блока к входу предшествующего блока.

#### Предусловия:
* - Диаграмма A1 содержит Блок 1 (200, 200) и Блок 2 (600, 350).

#### Выполняемые действия:
1. Провести стрелку от выхода Блока 2 к левой грани Блока 1.
2. Рассчитать огибающий маршрут.

#### Ожидаемый результат:
Петля обратной связи корректно огибает блоки и заходит в левую грань Блока 1.

---

### ТЕСТ №10: Обратная связь по механизму: Выход Блока 2 -> Механизм Блока 1

* **Файл**: [`tests/unit/10-f10-feedback-loop-output-to-mechanism.test.ts`](./unit/10-f10-feedback-loop-output-to-mechanism.test.ts)
* **Класс эквивалентности**: `F10 (Feedback Loop Output -> Mechanism)`
* **Описание**: Проверяет построение обратной петли через нижний коридор к механизму предшествующего блока.

#### Предусловия:
* - Диаграмма A1 содержит Блок 1 и Блок 2.

#### Выполняемые действия:
1. Провести стрелку от выхода Блока 2 к нижней грани Блока 1.
2. Построить нижний ортогональный коридор.

#### Ожидаемый результат:
Стрелка построена с нижним огибающим коридором, роль равна 'mechanism'.

---

### ТЕСТ №100: Именование: Формирование автоматического отображаемого имени стрелки

* **Файл**: [`tests/unit/100-name02-format-arrow-display-name.test.ts`](./unit/100-name02-format-arrow-display-name.test.ts)
* **Класс эквивалентности**: `NAME-02 (Arrow Display Name Formatting)`
* **Описание**: Проверяет генерацию названия безымянной ветви как 'Ответвление от «<Родитель>»'.

#### Предусловия:
* - Безымянная стрелка ответвляется от магистрали 'Нефтепродукт'.

#### Выполняемые действия:
1. Вызвать getArrowDisplayName(branch, diag).
2. Проверить сгенерированную строку.

#### Ожидаемый результат:
Сформировано наименование 'Ответвление от «Нефтепродукт»'.

---

### ТЕСТ №101: Адаптация: Смещение блока с подключенной стрелкой Управления

* **Файл**: [`tests/unit/101-adj01-move-block-with-top-control-arrow.test.ts`](./unit/101-adj01-move-block-with-top-control-arrow.test.ts)
* **Класс эквивалентности**: `ADJ-01 (Block Move Control Adjustment)`
* **Описание**: Проверяет смещение функционального блока с автоматической адаптацией стрелки Управления, входящей в верхнюю грань.

#### Предусловия:
* - Блок со стрелкой Управления сверху.

#### Выполняемые действия:
1. Сместить блок на (50, 50).
2. Вызвать adjustArrowOnBlockMove.
3. Проверить конечное смещение стрелки.

#### Ожидаемый результат:
Стрелка Управления сохраняет ортогональность и смещает точку входа в блок.

---

### ТЕСТ №102: Адаптация: Смещение блока с подключенной стрелкой Механизма

* **Файл**: [`tests/unit/102-adj02-move-block-with-bottom-mechanism-arrow.test.ts`](./unit/102-adj02-move-block-with-bottom-mechanism-arrow.test.ts)
* **Класс эквивалентности**: `ADJ-02 (Block Move Mechanism Adjustment)`
* **Описание**: Проверяет адаптацию стрелки Механизма при смещении блока.

#### Предусловия:
* - Блок со стрелкой Механизма снизу.

#### Выполняемые действия:
1. Сместить блок на (40, -30).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Стрелка Механизма синхронно следует за нижней гранью блока.

---

### ТЕСТ №103: Адаптация: Смещение блока с исходящей стрелкой Выхода

* **Файл**: [`tests/unit/103-adj03-move-block-with-right-output-arrow.test.ts`](./unit/103-adj03-move-block-with-right-output-arrow.test.ts)
* **Класс эквивалентности**: `ADJ-03 (Block Move Output Adjustment)`
* **Описание**: Проверяет смещение начальной точки стрелки Выхода при перемещении блока-источника.

#### Предусловия:
* - Блок со стрелкой Выхода на правую границу.

#### Выполняемые действия:
1. Сместить блок на (60, 40).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Начальная точка стрелки Выхода смещается вместе с правой гранью блока.

---

### ТЕСТ №104: Адаптация: Смещение блока с циклическим потоком (Self Loop)

* **Файл**: [`tests/unit/104-adj04-move-block-with-self-loop.test.ts`](./unit/104-adj04-move-block-with-self-loop.test.ts)
* **Класс эквивалентности**: `ADJ-04 (Block Move Self Loop Adjustment)`
* **Описание**: Проверяет параллельный перенос всех точек циклической стрелки при перемещении замкнутого на себя блока.

#### Предусловия:
* - Блок с циклической обратной связью (Self Loop).

#### Выполняемые действия:
1. Сместить блок на (100, 50).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Все точки циклической стрелки смещаются на (dx: 100, dy: 50) без искажения формы петли.

---

### ТЕСТ №105: Адаптация: Масштабирование блока с пересчетом верхнего порта Управления

* **Файл**: [`tests/unit/105-adj05-resize-block-scale-top-control-port.test.ts`](./unit/105-adj05-resize-block-scale-top-control-port.test.ts)
* **Класс эквивалентности**: `ADJ-05 (Block Resize Control Port Adjustment)`
* **Описание**: Проверяет пропорциональное масштабирование X-координаты верхнего порта при изменении ширины блока.

#### Предусловия:
* - Блок расширен с ширины 200 до 400px.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize.
2. Проверить пропорциональное смещение точки входа.

#### Ожидаемый результат:
Порт Управления смещен пропорционально коэффициенту расширения грани блока.

---

### ТЕСТ №106: Адаптация: Масштабирование блока с пересчетом нижнего порта Механизма

* **Файл**: [`tests/unit/106-adj06-resize-block-scale-bottom-mechanism-port.test.ts`](./unit/106-adj06-resize-block-scale-bottom-mechanism-port.test.ts)
* **Класс эквивалентности**: `ADJ-06 (Block Resize Mechanism Port Adjustment)`
* **Описание**: Проверяет пересчет положения порта Механизма при изменении высоты и ширины блока.

#### Предусловия:
* - Блок увеличен по высоте с 100 до 200px.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize.
2. Проверить координату Y нижнего порта.

#### Ожидаемый результат:
Точка подключения Механизма перемещается на новую нижнюю грань (y: 400).

---

### ТЕСТ №107: Адаптация: Масштабирование блока с пересчетом правого порта Выхода

* **Файл**: [`tests/unit/107-adj07-resize-block-scale-right-output-port.test.ts`](./unit/107-adj07-resize-block-scale-right-output-port.test.ts)
* **Класс эквивалентности**: `ADJ-07 (Block Resize Output Port Adjustment)`
* **Описание**: Проверяет смещение точки Выхода на новую правую грань блока.

#### Предусловия:
* - Блок расширен по ширине со 150 до 300px.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize.
2. Проверить координату X правого порта.

#### Ожидаемый результат:
Точка Выхода смещена на координату новой правой грани (x: 500).

---

### ТЕСТ №108: Переподключение: Переключение конца стрелки на правую границу холста

* **Файл**: [`tests/unit/108-reconn01-reconnect-arrow-to-border-target.test.ts`](./unit/108-reconn01-reconnect-arrow-to-border-target.test.ts)
* **Класс эквивалентности**: `RECONN-01 (Reconnect Arrow to Border Target)`
* **Описание**: Проверяет операцию reconnectArrowEndpoint со сменой целевого приемника на правую границу.

#### Предусловия:
* - Стрелка между двумя блоками.

#### Выполняемые действия:
1. Переподключить конец стрелки на правую границу холста.
2. Проверить целевой эндпоинт.

#### Ожидаемый результат:
Конец стрелки успешно подключен к правой границе (side: 'right', role: 'output').

---

### ТЕСТ №109: Переподключение: Переключение начала стрелки на левую границу холста

* **Файл**: [`tests/unit/109-reconn02-reconnect-arrow-to-border-source.test.ts`](./unit/109-reconn02-reconnect-arrow-to-border-source.test.ts)
* **Класс эквивалентности**: `RECONN-02 (Reconnect Arrow to Border Source)`
* **Описание**: Проверяет смену источника стрелки на внешнюю левую границу.

#### Предусловия:
* - Стрелка соединяет блок 1 и блок 2.

#### Выполняемые действия:
1. Переподключить начало стрелки к левой границе.
2. Проверить источник.

#### Ожидаемый результат:
Источник стрелки успешно переключен на левую границу.

---

### ТЕСТ №11: Самозамыкающийся поток: Выход блока -> Вход того же блока

* **Файл**: [`tests/unit/11-f11-self-loop.test.ts`](./unit/11-f11-self-loop.test.ts)
* **Класс эквивалентности**: `F11 (Self Loop)`
* **Описание**: Проверяет построение циклирующего потока (Self Loop) от выхода блока к его собственному входу.

#### Предусловия:
* - Диаграмма A1 содержит один блок (300, 200).

#### Выполняемые действия:
1. Соединить правый выход блока с его левым входом.
2. Построить огибающий ортогональный контур.

#### Ожидаемый результат:
Петля огибает блок сверху/снизу и возвращается в левую грань блока.

---

### ТЕСТ №110: Переподключение: Подключение начала стрелки к узлу ветвления

* **Файл**: [`tests/unit/110-reconn03-reconnect-arrow-to-junction.test.ts`](./unit/110-reconn03-reconnect-arrow-to-junction.test.ts)
* **Класс эквивалентности**: `RECONN-03 (Reconnect Arrow to Junction Source)`
* **Описание**: Проверяет превращение стрелки в дочернюю ветвь путем переподключения начала к узлу junction.

#### Предусловия:
* - Магистраль с узлом ветвления и отдельная стрелка.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с целью junction.
2. Проверить источник стрелки.

#### Ожидаемый результат:
Стрелка успешно переподключена к узлу ветвления.

---

### ТЕСТ №111: Переподключение: Удаление узла при отключении единственной ветви

* **Файл**: [`tests/unit/111-reconn04-clean-orphan-junction-on-disconnect.test.ts`](./unit/111-reconn04-clean-orphan-junction-on-disconnect.test.ts)
* **Класс эквивалентности**: `RECONN-04 (Orphan Junction Clean on Disconnect)`
* **Описание**: Проверяет автоматическую очистку узла junction, если от него отключили единственную дочернюю стрелку.

#### Предусловия:
* - Узел ветвления с одной дочерней стрелкой.

#### Выполняемые действия:
1. Отключить стрелку от узла, переподключив к блоку.
2. Проверить список узлов.

#### Ожидаемый результат:
Осиротевший узел автоматически удален из диаграммы.

---

### ТЕСТ №112: Пересечения: Обнаружение коллизии стрелки с телом блока через validateAllIntersections

* **Файл**: [`tests/unit/112-val01-validate-all-intersections-detect-block-collision.test.ts`](./unit/112-val01-validate-all-intersections-detect-block-collision.test.ts)
* **Класс эквивалентности**: `VAL-01 (All Intersections Block Collision)`
* **Описание**: Проверяет детекцию пересечения отрезка стрелки с внутренней областью функционального блока.

#### Предусловия:
* - Стрелка пробивает функциональный блок насквозь.

#### Выполняемые действия:
1. Вызвать validateAllIntersections.
2. Проверить ошибки коллизии.

#### Ожидаемый результат:
Обнаружена недопустимая коллизия type: 'block_collision'.

---

### ТЕСТ №113: Пересечения: Валидация чистой корректной диаграммы

* **Файл**: [`tests/unit/113-val02-validate-all-intersections-allow-clean-diagram.test.ts`](./unit/113-val02-validate-all-intersections-allow-clean-diagram.test.ts)
* **Класс эквивалентности**: `VAL-02 (All Intersections Clean Pass)`
* **Описание**: Проверяет отсутствие ложных срабатываний в validateAllIntersections для диаграммы без наложений.

#### Предусловия:
* - Корректный поток, входящий в грань блока.

#### Выполняемые действия:
1. Вызвать validateAllIntersections.
2. Проверить массив замечаний.

#### Ожидаемый результат:
Массив замечаний пуст (issues.length === 0).

---

### ТЕСТ №114: Декомпозиция: Определение родительской диаграммы по parentBlockId

* **Файл**: [`tests/unit/114-decomp01-find-parent-diagram.test.ts`](./unit/114-decomp01-find-parent-diagram.test.ts)
* **Класс эквивалентности**: `DECOMP-01 (Find Parent Diagram)`
* **Описание**: Проверяет поиск диаграммы верхнего уровня по родительскому блоку.

#### Предусловия:
* - Создана декомпозиция блока A0.

#### Выполняемые действия:
1. Проверить свойство parentBlockId дочерней диаграммы.
2. Найти диаграмму-родитель в проекте.

#### Ожидаемый результат:
Родительская диаграмма A0 успешно найдена.

---

### ТЕСТ №115: Декомпозиция: Проверка статуса декомпозиции блока

* **Файл**: [`tests/unit/115-decomp02-can-decompose-block.test.ts`](./unit/115-decomp02-can-decompose-block.test.ts)
* **Класс эквивалентности**: `DECOMP-02 (Can Decompose Block Check)`
* **Описание**: Проверяет фиксацию decompDiagramId у блока после выполнения декомпозиции.

#### Предусловия:
* - Блок не имеет декомпозиции (decompDiagramId === null).

#### Выполняемые действия:
1. Вызвать decomposeBlock.
2. Проверить decompDiagramId.

#### Ожидаемый результат:
Блок содержит валидный идентификатор дочерней диаграммы.

---

### ТЕСТ №116: Линтер: Запрет сквозных стрелок граница-граница на декомпозиции (FR-LINT-06)

* **Файл**: [`tests/unit/116-lint13-passthrough-arrows-forbidden-on-decomp.test.ts`](./unit/116-lint13-passthrough-arrows-forbidden-on-decomp.test.ts)
* **Класс эквивалентности**: `LINT-13 (Decomposition Passthrough Arrow Warning)`
* **Описание**: Проверяет стандарт IDEF0: на диаграмме декомпозиции стрелка не может идти напрямую от границы к границе без входа в блок.

#### Предусловия:
* - Диаграмма A1 содержит 2 блока и сквозную стрелку граница -> граница.

#### Выполняемые действия:
1. Запустить линтер.
2. Проверить диагностику FR-LINT-06.

#### Ожидаемый результат:
Обнаружено нарушение FR-LINT-06 о недопустимости сквозной стрелки.

---

### ТЕСТ №117: Линтер: Обнаружение разрыва ссылки в узле слияния (FR-LINT-06)

* **Файл**: [`tests/unit/117-lint14-broken-merge-junction-detection.test.ts`](./unit/117-lint14-broken-merge-junction-detection.test.ts)
* **Класс эквивалентности**: `LINT-14 (Broken Merge Reference Detection)`
* **Описание**: Проверяет обнаружение стрелки слияния, указывающей на несуществующий узел junction.

#### Предусловия:
* - Стрелка слияния ссылается на отсутствующий узел.

#### Выполняемые действия:
1. Запустить линтер.
2. Проверить ошибку FR-LINT-06.

#### Ожидаемый результат:
Обнаружена ошибка битой ссылки в узле слияния.

---

### ТЕСТ №118: Линтер: Предупреждение о коллинеарном наложении стрелок (FR-LINT-05)

* **Файл**: [`tests/unit/118-lint15-collinear-overlap-warning.test.ts`](./unit/118-lint15-collinear-overlap-warning.test.ts)
* **Класс эквивалентности**: `LINT-15 (Collinear Overlap Linter Warning)`
* **Описание**: Проверяет обнаружение наложения параллельных отрезков разных стрелок на одной линии.

#### Предусловия:
* - Две стрелки частично перекрываются на горизонтали Y=300.

#### Выполняемые действия:
1. Запустить runIDEF0Linter.
2. Проверить предупреждение FR-LINT-05.

#### Ожидаемый результат:
Линтер сигнализирует о недопустимом наложении трасс.

---

### ТЕСТ №119: Математика: Расчет расстояния и проекции точки на отрезок

* **Файл**: [`tests/unit/119-math01-distance-to-segment-projection.test.ts`](./unit/119-math01-distance-to-segment-projection.test.ts)
* **Класс эквивалентности**: `MATH-01 (Distance to Segment Projection)`
* **Описание**: Проверяет вычисление дистанции и ортогональной проекции точки на горизонтальный и вертикальный отрезок.

#### Предусловия:
* - Отрезок от (100, 100) до (400, 100).

#### Выполняемые действия:
1. Задать точку (200, 150).
2. Вызвать distanceToSegment.

#### Ожидаемый результат:
Дистанция равна 50, проекция строго в точке (200, 100).

---

### ТЕСТ №12: Ветвление: Узел разветвления -> Вход блока

* **Файл**: [`tests/unit/12-f12-branch-to-block-input.test.ts`](./unit/12-f12-branch-to-block-input.test.ts)
* **Класс эквивалентности**: `F12 (Branch -> Block Input)`
* **Описание**: Проверяет создание ответвления от ствола магистральной стрелки ко входу функционального блока.

#### Предусловия:
* - Диаграмма A1 содержит магистральную стрелку и блоки.

#### Выполняемые действия:
1. Создать блок и магистральную стрелку от левой границы ко входу блока.
2. Зарегистрировать узел ветвления junction на стволе стрелки.
3. Создать дочернюю стрелку от узла ветвления ко второму блоку.

#### Ожидаемый результат:
Стрелка ветвления успешно создана с source.type === "junction".

---

### ТЕСТ №120: Математика: Слияние избыточных коллинеарных точек (simplifyCollinear)

* **Файл**: [`tests/unit/120-math02-simplify-collinear-merging.test.ts`](./unit/120-math02-simplify-collinear-merging.test.ts)
* **Класс эквивалентности**: `MATH-02 (Collinear Point Simplification)`
* **Описание**: Проверяет удаление лишних промежуточных точек на одной прямой линии.

#### Предусловия:
* - Линия из 4 последовательных горизонтальных точек на Y=100.

#### Выполняемые действия:
1. Вызвать simplifyCollinear.
2. Проверить длину массива точек.

#### Ожидаемый результат:
Точки слиты в один отрезок из 2 граничных точек.

---

### ТЕСТ №121: Геометрия: Ограничение координат текстовой подписи пределами листа

* **Файл**: [`tests/unit/121-math03-clamp-label-to-canvas.test.ts`](./unit/121-math03-clamp-label-to-canvas.test.ts)
* **Класс эквивалентности**: `MATH-03 (Clamp Label to Canvas)`
* **Описание**: Проверяет удержание позиции текста стрелки внутри печатного листа A4.

#### Предусловия:
* - Точка подписи с отрицательными координатами (-50, -20).

#### Выполняемые действия:
1. Вызвать clampLabelToCanvas.
2. Проверить скорректированные координаты.

#### Ожидаемый результат:
Координаты подписи скорректированы с безопасным отступом от края холста.

---

### ТЕСТ №122: Экспорт: Наличие определений маркеров стрелок в генерируемом SVG

* **Файл**: [`tests/unit/122-export01-clean-svg-marker-definitions.test.ts`](./unit/122-export01-clean-svg-marker-definitions.test.ts)
* **Класс эквивалентности**: `EXPORT-01 (SVG Marker Definitions)`
* **Описание**: Проверяет экспорт векторного SVG с корректным треугольным наконечником стрелки marker-end.

#### Предусловия:
* - Диаграмма содержит функциональный блок и стрелку.

#### Выполняемые действия:
1. Вызвать exportDiagramToSvg.
2. Проверить наличие тега marker.

#### Ожидаемый результат:
Векторный SVG содержит корректное геометрическое определение наконечника стрелки.

---

### ТЕСТ №123: Сериализация: Валидация заголовков и схемы в экспортированном JSON

* **Файл**: [`tests/unit/123-export02-project-json-version-metadata.test.ts`](./unit/123-export02-project-json-version-metadata.test.ts)
* **Класс эквивалентности**: `EXPORT-02 (JSON Version Metadata)`
* **Описание**: Проверяет корректность сериализации проекта в JSON со всеми метаданными.

#### Предусловия:
* - Проект с диаграммами и метаданными.

#### Выполняемые действия:
1. Вызвать exportProjectToJson.
2. Распарсить результат JSON.parse.

#### Ожидаемый результат:
JSON содержит поля name, author, version и массив diagrams.

---

### ТЕСТ №124: История: Доступность отмены и повтора действий (undo / redo)

* **Файл**: [`tests/unit/124-history01-can-undo-can-redo-predicates.test.ts`](./unit/124-history01-can-undo-can-redo-predicates.test.ts)
* **Класс эквивалентности**: `HIST-01 (Can Undo and Can Redo State)`
* **Описание**: Проверяет изменение глубины стека history и redoStack при совершении и отмене действий.

#### Предусловия:
* - Начальное состояние редактора.

#### Выполняемые действия:
1. Проверить history.length.
2. Создать блок на новой диаграмме.
3. Вызвать undo, проверить redoStack.length > 0.

#### Ожидаемый результат:
Стеки истории точно отражают доступность Undo/Redo.

---

### ТЕСТ №125: История: Очистка стека Redo при выполнении нового действия после отмены

* **Файл**: [`tests/unit/125-history02-clear-redo-on-new-action.test.ts`](./unit/125-history02-clear-redo-on-new-action.test.ts)
* **Класс эквивалентности**: `HIST-02 (Redo Stack Invalidation)`
* **Описание**: Проверяет сброс ветки Redo при совершении нового изменения после Undo.

#### Предусловия:
* - Выполнена отмена действия (Undo), в стеке redoStack есть записи.

#### Выполняемые действия:
1. Совершить новое действие (создать блок).
2. Проверить redoStack.length.

#### Ожидаемый результат:
Стек redoStack очищен (redoStack.length === 0).

---

### ТЕСТ №126: Хранилище: Выбор активного элемента на диаграмме (selectObject)

* **Файл**: [`tests/unit/126-store04-select-object-and-selection-state.test.ts`](./unit/126-store04-select-object-and-selection-state.test.ts)
* **Класс эквивалентности**: `STORE-04 (Object Selection Management)`
* **Описание**: Проверяет фиксацию выделения блока, стрелки и сброс выделения при клике в пустоту.

#### Предусловия:
* - Диаграмма содержит блок и стрелку.

#### Выполняемые действия:
1. Выделить блок.
2. Выделить стрелку.
3. Снять выделение.

#### Ожидаемый результат:
Состояние выделения в store точно отражает выбранный элемент.

---

### ТЕСТ №127: Хранилище: Переключение активного инструмента холста (setTool)

* **Файл**: [`tests/unit/127-store05-set-tool-and-active-tool-mode.test.ts`](./unit/127-store05-set-tool-and-active-tool-mode.test.ts)
* **Класс эквивалентности**: `STORE-05 (Tool Selection State)`
* **Описание**: Проверяет переключение рабочих инструментов редактора: select, block, arrow.

#### Предусловия:
* - Редактор запущен.

#### Выполняемые действия:
1. Установить инструмент 'block'.
2. Установить инструмент 'arrow'.
3. Вернуть 'select'.

#### Ожидаемый результат:
Инструмент в хранилище переключается корректно.

---

### ТЕСТ №128: Хранилище: Масштабирование холста (setZoom)

* **Файл**: [`tests/unit/128-store06-set-zoom-and-zoom-clamping.test.ts`](./unit/128-store06-set-zoom-and-zoom-clamping.test.ts)
* **Класс эквивалентности**: `STORE-06 (Canvas Zoom State)`
* **Описание**: Проверяет обновление коэффициента зума холста.

#### Предусловия:
* - Текущий зум равен 1.0.

#### Выполняемые действия:
1. Установить зум 1.5.
2. Установить зум 2.0.

#### Ожидаемый результат:
Значение зума в store точно обновляется.

---

### ТЕСТ №129: Хранилище: Панорамирование холста (setPan)

* **Файл**: [`tests/unit/129-store07-set-pan-offset.test.ts`](./unit/129-store07-set-pan-offset.test.ts)
* **Класс эквивалентности**: `STORE-07 (Canvas Pan Offset)`
* **Описание**: Проверяет сохранение смещения видимой области холста.

#### Предусловия:
* - Смещение холста (0, 0).

#### Выполняемые действия:
1. Сместить холст на (150, -80).
2. Проверить pan в store.

#### Ожидаемый результат:
Координаты панорамирования сохранены в состоянии редактора.

---

### ТЕСТ №13: Ветвление: Узел разветвления -> Управление блока

* **Файл**: [`tests/unit/13-f13-branch-to-block-control.test.ts`](./unit/13-f13-branch-to-block-control.test.ts)
* **Класс эквивалентности**: `F13 (Branch -> Block Control)`
* **Описание**: Проверяет создание ответвления от горизонтального магистрального потока к верхней грани блока (управлению).

#### Предусловия:
* - Диаграмма A1 содержит магистральную стрелку и блок.

#### Выполняемые действия:
1. Создать ствол управления сверху.
2. Поставить узел ветвления.
3. Направить ветвь в верхнюю грань блока.

#### Ожидаемый результат:
Стрелка ветвления имеет роль "control" и входит в верхнюю грань блока.

---

### ТЕСТ №130: Хранилище: Переключение видимости боковых панелей (дерево, инспектор)

* **Файл**: [`tests/unit/130-store08-toggle-panels-visibility.test.ts`](./unit/130-store08-toggle-panels-visibility.test.ts)
* **Класс эквивалентности**: `STORE-08 (Panel Visibility Toggles)`
* **Описание**: Проверяет сворачивание и разворачивание левой панели дерева и правой панели свойств.

#### Предусловия:
* - Боковые панели открыты.

#### Выполняемые действия:
1. Вызвать toggleLeftPanel.
2. Вызвать toggleRightPanel.
3. Проверить флаги.

#### Ожидаемый результат:
Флаги видимости панелей переключаются корректно.

---

### ТЕСТ №131: Адаптация: Смещение блока с выходом на правую границу

* **Файл**: [`tests/unit/131-move01-move-block-with-outflow-to-border.test.ts`](./unit/131-move01-move-block-with-outflow-to-border.test.ts)
* **Класс эквивалентности**: `MOVE-01 (Block Move Outflow Adjustment)`
* **Описание**: Проверяет адаптацию стрелки, идущей от правой грани перемещаемого блока к правой границе холста.

#### Предусловия:
* - Блок со стрелкой Выхода на правую границу.

#### Выполняемые действия:
1. Сместить блок на (80, 50).
2. Вызвать adjustArrowOnBlockMove.
3. Проверить координаты начала и конца стрелки.

#### Ожидаемый результат:
Начало стрелки следует за блоком, конец удерживается на правой границе.

---

### ТЕСТ №132: Адаптация: Смещение блока со входом с левой границы

* **Файл**: [`tests/unit/132-move02-move-block-with-inflow-from-border.test.ts`](./unit/132-move02-move-block-with-inflow-from-border.test.ts)
* **Класс эквивалентности**: `MOVE-02 (Block Move Inflow Adjustment)`
* **Описание**: Проверяет адаптацию входящей стрелки с левой границы при перемещении целевого блока.

#### Предусловия:
* - Блок с входящей стрелкой от левой границы.

#### Выполняемые действия:
1. Сместить блок на (50, 40).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Точка входа смещается синхронно с левой гранью блока.

---

### ТЕСТ №133: Адаптация: Смещение блока-источника ствола с привязанным ответвлением

* **Файл**: [`tests/unit/133-move03-move-block-with-branch-attached-to-moving-trunk.test.ts`](./unit/133-move03-move-block-with-branch-attached-to-moving-trunk.test.ts)
* **Класс эквивалентности**: `MOVE-03 (Block Move with Branch on Trunk)`
* **Описание**: Проверяет смещение магистральной стрелки с синхронным пересчетом координат узла ветвления и дочерней ветви.

#### Предусловия:
* - Магистраль между блоками имеет узел ветвления.

#### Выполняемые действия:
1. Сместить первый блок на (50, 30).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Ствол перемещен, геометрия ветви сохраняет целостность соединения.

---

### ТЕСТ №134: Адаптация: Смещение целевого блока с пересчетом ортогональных колен

* **Файл**: [`tests/unit/134-move04-move-block-with-orthogonal-elbow-routing.test.ts`](./unit/134-move04-move-block-with-orthogonal-elbow-routing.test.ts)
* **Класс эквивалентности**: `MOVE-04 (Block Move Orthogonal Elbows)`
* **Описание**: Проверяет сохранение 90-градусных колен между смещенными по вертикали блоками.

#### Предусловия:
* - Два блока соединены Z-образной ортогональной стрелкой.

#### Выполняемые действия:
1. Сместить целевой блок на 100px вниз.
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Ортогональная стрелка удлиняет вертикальный участок, сохраняя все прямые углы.

---

### ТЕСТ №135: Именование: Определение родителя стрелки по геометрической близости сегмента

* **Файл**: [`tests/unit/135-name03-resolve-branch-parent-by-proximity.test.ts`](./unit/135-name03-resolve-branch-parent-by-proximity.test.ts)
* **Класс эквивалентности**: `NAME-03 (Branch Parent by Geometry Proximity)`
* **Описание**: Проверяет определение родительского потока по расстоянию от точки ветвления до сегмента ствола.

#### Предусловия:
* - Стрелка ответвления начинается в 2px от ствола без явного ID узла.

#### Выполняемые действия:
1. Вызвать getArrowParent.
2. Проверить нахождение родителя.

#### Ожидаемый результат:
Родительская стрелка успешно определена по близости точек.

---

### ТЕСТ №136: Именование: Резервное наименование безымянной стрелки

* **Файл**: [`tests/unit/136-name04-display-name-fallback-unnamed.test.ts`](./unit/136-name04-display-name-fallback-unnamed.test.ts)
* **Класс эквивалентности**: `NAME-04 (Fallback Display Name Formatting)`
* **Описание**: Проверяет возврат читаемого плейсхолдера при отсутствии подписи и родителя.

#### Предусловия:
* - Стрелка без текста и без узла ветвления.

#### Выполняемые действия:
1. Вызвать getArrowDisplayName.
2. Проверить возвращенную строку.

#### Ожидаемый результат:
Возвращается строка 'Без названия' или 'Поток'.

---

### ТЕСТ №137: Переподключение: Переключение конца стрелки на верхнюю грань блока (Управление)

* **Файл**: [`tests/unit/137-reconn05-reconnect-arrow-target-to-block-top.test.ts`](./unit/137-reconn05-reconnect-arrow-target-to-block-top.test.ts)
* **Класс эквивалентности**: `RECONN-05 (Reconnect Target to Block Top)`
* **Описание**: Проверяет смену целевой контактной грани на верхнюю с автоматическим присвоением роли 'control'.

#### Предусловия:
* - Стрелка направлена в левую грань блока.

#### Выполняемые действия:
1. Переподключить конец стрелки к верхней грани блока.
2. Проверить target.side и target.role.

#### Ожидаемый результат:
Целевая сторона стрелки изменена на 'top' с ролью 'control'.

---

### ТЕСТ №138: Переподключение: Переключение конца стрелки на нижнюю грань блока (Механизм)

* **Файл**: [`tests/unit/138-reconn06-reconnect-arrow-target-to-block-bottom.test.ts`](./unit/138-reconn06-reconnect-arrow-target-to-block-bottom.test.ts)
* **Класс эквивалентности**: `RECONN-06 (Reconnect Target to Block Bottom)`
* **Описание**: Проверяет переподключение стрелки к нижней контактной грани блока.

#### Предусловия:
* - Стрелка направлена в левую грань блока.

#### Выполняемые действия:
1. Переподключить конец к нижней грани блока.
2. Проверить обновленный эндпоинт.

#### Ожидаемый результат:
Целевой эндпоинт указывает на нижнюю грань блока.

---

### ТЕСТ №139: Переподключение: Переключение конца стрелки на левую грань блока (Вход)

* **Файл**: [`tests/unit/139-reconn07-reconnect-arrow-target-to-block-left.test.ts`](./unit/139-reconn07-reconnect-arrow-target-to-block-left.test.ts)
* **Класс эквивалентности**: `RECONN-07 (Reconnect Target to Block Left)`
* **Описание**: Проверяет подключение приемника стрелки к левой грани блока (Вход).

#### Предусловия:
* - Стрелка направлена в верхнюю грань блока.

#### Выполняемые действия:
1. Переподключить конец к левой грани.
2. Проверить target.side.

#### Ожидаемый результат:
Целевая грань стрелки успешно переключена на 'left'.

---

### ТЕСТ №14: Ветвление: Узел разветвления -> Механизм блока

* **Файл**: [`tests/unit/14-f14-branch-to-block-mechanism.test.ts`](./unit/14-f14-branch-to-block-mechanism.test.ts)
* **Класс эквивалентности**: `F14 (Branch -> Block Mechanism)`
* **Описание**: Проверяет создание ответвления от магистрали ресурсов к нижней грани блока.

#### Предусловия:
* - Диаграмма A1 с блоком и магистральной стрелкой механизма.

#### Выполняемые действия:
1. Поставить узел ветвления на магистрали механизма.
2. Направить ветвь в нижнюю грань блока.

#### Ожидаемый результат:
Ветвь механизма успешно создана с ролью "mechanism".

---

### ТЕСТ №140: Геометрия: Смещение горизонтального сегмента стрелки

* **Файл**: [`tests/unit/140-geom09-shift-horizontal-segment-orthogonal-invariant.test.ts`](./unit/140-geom09-shift-horizontal-segment-orthogonal-invariant.test.ts)
* **Класс эквивалентности**: `GEOM-09 (Shift Horizontal Segment)`
* **Описание**: Проверяет смещение горизонтального звена стрелки по оси Y с автоматической подстройкой соседних вертикальных звеньев.

#### Предусловия:
* - Стрелка из 5 точек с промежуточным горизонтальным сегментом между блоками.

#### Выполняемые действия:
1. Вызвать shiftArrowSegment.
2. Проверить Y-координаты смещенного отрезка.

#### Ожидаемый результат:
Сегмент смещен на новую координату Y, ортогональность сохранена.

---

### ТЕСТ №141: Геометрия: Смещение вертикального сегмента стрелки

* **Файл**: [`tests/unit/141-geom10-shift-vertical-segment-orthogonal-invariant.test.ts`](./unit/141-geom10-shift-vertical-segment-orthogonal-invariant.test.ts)
* **Класс эквивалентности**: `GEOM-10 (Shift Vertical Segment)`
* **Описание**: Проверяет смещение промежуточного вертикального сегмента стрелки по оси X.

#### Предусловия:
* - Стрелка с вертикальным сегментом между блоками.

#### Выполняемые действия:
1. Сместить вертикальный сегмент на новую координату X.
2. Проверить X-координаты отрезка.

#### Ожидаемый результат:
Вертикальный сегмент сместился, сохраняя 90-градусные углы.

---

### ТЕСТ №142: Геометрия: Удаление промежуточной вершины излома стрелки (removeArrowPoint)

* **Файл**: [`tests/unit/142-geom11-remove-bend-point-from-arrow.test.ts`](./unit/142-geom11-remove-bend-point-from-arrow.test.ts)
* **Класс эквивалентности**: `GEOM-11 (Remove Arrow Bend Point)`
* **Описание**: Проверяет удаление точки излома по индексу с пересчетом ортогональной связи между соседними вершинами.

#### Предусловия:
* - Стрелка состоит из 6 точек между блоками.

#### Выполняемые действия:
1. Вызвать removeArrowPoint.
2. Проверить длину массива points.

#### Ожидаемый результат:
Количество точек уменьшено, излом удален.

---

### ТЕСТ №143: Геометрия: Спрямление геометрии стрелки к прямой линии (straightenArrow)

* **Файл**: [`tests/unit/143-geom12-straighten-segment-minimal-delta.test.ts`](./unit/143-geom12-straighten-segment-minimal-delta.test.ts)
* **Класс эквивалентности**: `GEOM-12 (Straighten Arrow Minimal Delta)`
* **Описание**: Проверяет вызов straightenArrow для сброса сложного маршрута к прямой ортогональной связи.

#### Предусловия:
* - Стрелка с изломами между блоками на одном уровне Y.

#### Выполняемые действия:
1. Вызвать straightenArrow.
2. Проверить результат.

#### Ожидаемый результат:
Стрелка спрямлена.

---

### ТЕСТ №144: Трассировка: Построение ортогонального пути от верхней границы к Управлению

* **Файл**: [`tests/unit/144-router01-route-from-top-border-to-block-control.test.ts`](./unit/144-router01-route-from-top-border-to-block-control.test.ts)
* **Класс эквивалентности**: `ROUTE-01 (Route Top Border to Block Control)`
* **Описание**: Проверяет генерацию чистого вертикального отрезка для управляющего потока.

#### Предусловия:
* - Начало на верхней границе, цель на верхней грани блока на одной оси X.

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить массив точек.

#### Ожидаемый результат:
Сгенерирована строго вертикальная траектория.

---

### ТЕСТ №145: Трассировка: Построение ортогонального пути от нижней границы к Механизму

* **Файл**: [`tests/unit/145-router02-route-from-bottom-border-to-block-mechanism.test.ts`](./unit/145-router02-route-from-bottom-border-to-block-mechanism.test.ts)
* **Класс эквивалентности**: `ROUTE-02 (Route Bottom Border to Block Mechanism)`
* **Описание**: Проверяет генерацию вертикальной трассы для стрелки механизма снизу.

#### Предусловия:
* - Начало на нижней границе, цель на нижней грани блока.

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить ориентацию звеньев.

#### Ожидаемый результат:
Построен вертикальный маршрут к нижней грани блока.

---

### ТЕСТ №146: Трассировка: Построение 3-точечного L-образного маршрута

* **Файл**: [`tests/unit/146-router03-route-with-horizontal-offset-three-points.test.ts`](./unit/146-router03-route-with-horizontal-offset-three-points.test.ts)
* **Класс эквивалентности**: `ROUTE-03 (Route Three Point L-Shape)`
* **Описание**: Проверяет ортогональное соединение двух точек, смещенных по горизонтали и вертикали, через 1 угол (3 точки).

#### Предусловия:
* - Источник (Выход, x: 300, y: 200), приемник (Управление, x: 500, y: 300).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить ортогональность излома.

#### Ожидаемый результат:
Построен L-образный маршрут с прямым углом.

---

### ТЕСТ №147: Трассировка: Построение петли обратной связи (Feedback loop)

* **Файл**: [`tests/unit/147-router04-route-feedback-loop-four-points.test.ts`](./unit/147-router04-route-feedback-loop-four-points.test.ts)
* **Класс эквивалентности**: `ROUTE-04 (Route Feedback Loop Around Blocks)`
* **Описание**: Проверяет построение обходного ортогонального маршрута для возврата потока справа налево.

#### Предусловия:
* - Источник справа (x: 700, y: 300), приемник слева (x: 200, y: 150).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить количество точек (>= 4).

#### Ожидаемый результат:
Построен обходной маршрут обратной связи.

---

### ТЕСТ №148: Пересечения: Обнаружение перпендикулярного пересечения отрезков

* **Файл**: [`tests/unit/148-inter01-check-segment-intersection-crossing.test.ts`](./unit/148-inter01-check-segment-intersection-crossing.test.ts)
* **Класс эквивалентности**: `INTER-01 (Perpendicular Segment Crossing)`
* **Описание**: Проверяет обнаружение допустимого прямого крестообразного пересечения двух стрелок.

#### Предусловия:
* - Горизонтальный отрезок (100, 200) -> (400, 200) и вертикальный (250, 100) -> (250, 300).

#### Выполняемые действия:
1. Вызвать checkSegmentIntersection.
2. Проверить hasIntersection и isAllowed.

#### Ожидаемый результат:
Пересечение зафиксировано как допустимое (isAllowed: true, type: 'perpendicular').

---

### ТЕСТ №149: Пересечения: Запрет коллинеарного наложения двух отрезков

* **Файл**: [`tests/unit/149-inter02-check-segment-intersection-collinear.test.ts`](./unit/149-inter02-check-segment-intersection-collinear.test.ts)
* **Класс эквивалентности**: `INTER-02 (Collinear Segment Overlap Detection)`
* **Описание**: Проверяет запрет наложения двух параллельных отрезков стрелок на одной прямой.

#### Предусловия:
* - Два частично перекрывающихся горизонтальных отрезка на Y=200.

#### Выполняемые действия:
1. Вызвать checkSegmentIntersection.
2. Проверить isAllowed.

#### Ожидаемый результат:
Наложение отклонено как недопустимое (isAllowed: false, type: 'collinear').

---

### ТЕСТ №15: Ветвление: Узел разветвления -> Правая граница холста

* **Файл**: [`tests/unit/15-f15-branch-to-border-right.test.ts`](./unit/15-f15-branch-to-border-right.test.ts)
* **Класс эквивалентности**: `F15 (Branch -> Border Right)`
* **Описание**: Проверяет создание ответвления от выходного ствола блока к внешней правой границе холста.

#### Предусловия:
* - Диаграмма A1 со стволом стрелки от блока к правой границе.

#### Выполняемые действия:
1. Создать блок и стрелку выхода к правой границе.
2. Поставить узел ветвления.
3. Протянуть вторую ветвь к правой границе.

#### Ожидаемый результат:
Ветвь направлена на правую границу ({ type: "border", side: "right" }).

---

### ТЕСТ №150: Пересечения: Разрешение касания внешней грани блока без проникновения

* **Файл**: [`tests/unit/150-inter03-check-segment-block-collision-edge-touching.test.ts`](./unit/150-inter03-check-segment-block-collision-edge-touching.test.ts)
* **Класс эквивалентности**: `INTER-03 (Segment Block Edge Contact Allowed)`
* **Описание**: Проверяет стандарт IDEF0: касание стрелкой контактной грани блока не является внутренней коллизией.

#### Предусловия:
* - Отрезок касается внешней границы блока в контактном порту.

#### Выполняемые действия:
1. Вызвать checkSegmentBlockCollision.
2. Проверить результат.

#### Ожидаемый результат:
Коллизия внутрь тела не зафиксирована (возвращает false).

---

### ТЕСТ №151: Хранилище: Открепление начала стрелки (setArrowEndpointKey 'unattached')

* **Файл**: [`tests/unit/151-store09-set-endpoint-key-unattached-source.test.ts`](./unit/151-store09-set-endpoint-key-unattached-source.test.ts)
* **Класс эквивалентности**: `STORE-09 (Set Endpoint Key Unattached Source)`
* **Описание**: Проверяет преобразование начала стрелки в неподключенный эндпоинт типа 'unattached'.

#### Предусловия:
* - Стрелка между двумя блоками.

#### Выполняемые действия:
1. Вызвать store.setArrowEndpointKey(a.id, 'source', 'unattached').
2. Проверить arrow.source.type и pinned.

#### Ожидаемый результат:
arrow.source.type === 'unattached', arrow.pinned === true.

---

### ТЕСТ №152: Хранилище: Открепление конца стрелки (setArrowEndpointKey 'unattached')

* **Файл**: [`tests/unit/152-store10-set-endpoint-key-unattached-target.test.ts`](./unit/152-store10-set-endpoint-key-unattached-target.test.ts)
* **Класс эквивалентности**: `STORE-10 (Set Endpoint Key Unattached Target)`
* **Описание**: Проверяет преобразование конца стрелки в неподключенный эндпоинт.

#### Предусловия:
* - Стрелка между двумя блоками.

#### Выполняемые действия:
1. Вызвать store.setArrowEndpointKey(a.id, 'target', 'unattached').
2. Проверить arrow.target.type.

#### Ожидаемый результат:
arrow.target.type === 'unattached'.

---

### ТЕСТ №153: Хранилище: Запрет одновременного открепления обоих концов стрелки

* **Файл**: [`tests/unit/153-store11-forbid-both-endpoints-unattached-via-key.test.ts`](./unit/153-store11-forbid-both-endpoints-unattached-via-key.test.ts)
* **Класс эквивалентности**: `STORE-11 (Forbid Both Unattached Endpoints via Key)`
* **Описание**: Проверяет отклонение операции открепления, если противоположный конец уже не привязан.

#### Предусловия:
* - Стрелка с одним уже неподключенным концом.

#### Выполняемые действия:
1. Попытаться вызвать setArrowEndpointKey('unattached') на втором конце.
2. Проверить возвращенное значение.

#### Ожидаемый результат:
Операция отклонена (возвращает false).

---

### ТЕСТ №154: Хранилище: Переключение эндпоинта на верхнюю границу (border:top)

* **Файл**: [`tests/unit/154-store12-set-endpoint-key-border-top.test.ts`](./unit/154-store12-set-endpoint-key-border-top.test.ts)
* **Класс эквивалентности**: `STORE-12 (Set Endpoint Key Border Top)`
* **Описание**: Проверяет подключение источника стрелки к верхней границе листа.

#### Предусловия:
* - Стрелка направлена в верхнюю грань блока.

#### Выполняемые действия:
1. Вызвать store.setArrowEndpointKey(a.id, 'source', 'border:top').
2. Проверить arrow.source.side и arrow.source.point.y.

#### Ожидаемый результат:
arrow.source.side === 'top', arrow.source.point.y === 40.

---

### ТЕСТ №155: Хранилище: Переключение эндпоинта на нижнюю границу (border:bottom)

* **Файл**: [`tests/unit/155-store13-set-endpoint-key-border-bottom.test.ts`](./unit/155-store13-set-endpoint-key-border-bottom.test.ts)
* **Класс эквивалентности**: `STORE-13 (Set Endpoint Key Border Bottom)`
* **Описание**: Проверяет подключение источника стрелки к нижней границе листа.

#### Предусловия:
* - Стрелка направлена в нижнюю грань блока.

#### Выполняемые действия:
1. Вызвать store.setArrowEndpointKey(a.id, 'source', 'border:bottom').
2. Проверить эндпоинт.

#### Ожидаемый результат:
arrow.source.side === 'bottom', arrow.source.type === 'border'.

---

### ТЕСТ №156: Хранилище: Переключение конца на грань другого блока (block:id:side)

* **Файл**: [`tests/unit/156-store14-set-endpoint-key-block-port.test.ts`](./unit/156-store14-set-endpoint-key-block-port.test.ts)
* **Класс эквивалентности**: `STORE-14 (Set Endpoint Key Block Port)`
* **Описание**: Проверяет перепривязку конца стрелки к порту другого блока через составной ключ.

#### Предусловия:
* - Стрелка между блоками b1 и b2, существует третий блок b3.

#### Выполняемые действия:
1. Вызвать store.setArrowEndpointKey(a.id, 'target', `block:${b3.id}:left`).
2. Проверить arrow.target.id.

#### Ожидаемый результат:
arrow.target.id === b3.id, arrow.target.side === 'left'.

---

### ТЕСТ №157: Хранилище: Создание ветвления через setArrowEndpointKey ('junction:branch:trunkId')

* **Файл**: [`tests/unit/157-store15-set-endpoint-key-branch-junction.test.ts`](./unit/157-store15-set-endpoint-key-branch-junction.test.ts)
* **Класс эквивалентности**: `STORE-15 (Set Endpoint Key Branch Junction)`
* **Описание**: Проверяет автоматическое создание узла ветвления на стволе при привязке источника дочерней стрелки.

#### Предусловия:
* - Магистральная стрелка и изолированная стрелка.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey('source', `junction:branch:${trunk.id}`).
2. Проверить массив diag.junctions.

#### Ожидаемый результат:
Создан узел типа 'branch', дочерняя стрелка ссылается на junction.

---

### ТЕСТ №158: Хранилище: Удаление промежуточного сегмента стрелки (removeArrowSegment)

* **Файл**: [`tests/unit/158-store16-remove-arrow-segment-middle.test.ts`](./unit/158-store16-remove-arrow-segment-middle.test.ts)
* **Класс эквивалентности**: `STORE-16 (Remove Arrow Segment Middle)`
* **Описание**: Проверяет удаление лишнего промежуточного звена сложного маршрута.

#### Предусловия:
* - Стрелка из 6 точек.

#### Выполняемые действия:
1. Вызвать store.removeArrowSegment(a.id, 2).
2. Проверить пересчет точек.

#### Ожидаемый результат:
Количество точек уменьшено, сегмент удален.

---

### ТЕСТ №159: Хранилище: Обновление координаты начальной точки (updateArrowPointCoord)

* **Файл**: [`tests/unit/159-store17-update-arrow-point-coord-start.test.ts`](./unit/159-store17-update-arrow-point-coord-start.test.ts)
* **Класс эквивалентности**: `STORE-17 (Update Arrow Point Coord Start)`
* **Описание**: Проверяет обновление Y-координаты нулевой точки стрелки с синхронизацией source.point.

#### Предусловия:
* - Стрелка между блоками.

#### Выполняемые действия:
1. Вызвать store.updateArrowPointCoord(a.id, 0, 'y', 230).
2. Проверить a.points[0].y и a.source.point.y.

#### Ожидаемый результат:
Координаты точки и источника обновлены до 230.

---

### ТЕСТ №16: Слияние: Выход блока -> Узел слияния

* **Файл**: [`tests/unit/16-f16-merge-from-block-output.test.ts`](./unit/16-f16-merge-from-block-output.test.ts)
* **Класс эквивалентности**: `F16 (Block Output -> Merge)`
* **Описание**: Проверяет вливание выходного потока блока в магистральную стрелку через узел слияния (Merge Junction).

#### Предусловия:
* - Диаграмма A1 содержит блоки и принимающий магистральный поток выхода.

#### Выполняемые действия:
1. Создать Блок 1 и стрелку выхода к границе.
2. Поставить узел слияния merge на стволе.
3. Соединить выход Блока 2 с узлом слияния.

#### Ожидаемый результат:
Стрелка слияния оканчивается в узле слияния ({ type: "junction", id: junc.id }).

---

### ТЕСТ №160: Хранилище: Обновление координаты конечной точки (updateArrowPointCoord)

* **Файл**: [`tests/unit/160-store18-update-arrow-point-coord-end.test.ts`](./unit/160-store18-update-arrow-point-coord-end.test.ts)
* **Класс эквивалентности**: `STORE-18 (Update Arrow Point Coord End)`
* **Описание**: Проверяет обновление координаты X конечной точки с синхронизацией target.point.

#### Предусловия:
* - Стрелка между блоками.

#### Выполняемые действия:
1. Вызвать store.updateArrowPointCoord(a.id, 1, 'x', 700).
2. Проверить a.target.point.x.

#### Ожидаемый результат:
target.point.x === 700.

---

### ТЕСТ №161: Математика: Примагничивание подписи выше горизонтального сегмента

* **Файл**: [`tests/unit/161-math04-snap-label-horizontal-above.test.ts`](./unit/161-math04-snap-label-horizontal-above.test.ts)
* **Класс эквивалентности**: `MATH-04 (Snap Label Horizontal Above)`
* **Описание**: Проверяет привязку подписи стрелки на 12px выше горизонтального отрезка без линии-выноски.

#### Предусловия:
* - Горизонтальная стрелка, курсор подписи на 10px выше линии.

#### Выполняемые действия:
1. Вызвать snapLabelToArrow.
2. Проверить showLeader и labelPos.y.

#### Ожидаемый результат:
showLeader === false, labelPos.y === seg.y - 12.

---

### ТЕСТ №162: Математика: Примагничивание подписи ниже горизонтального сегмента

* **Файл**: [`tests/unit/162-math05-snap-label-horizontal-below.test.ts`](./unit/162-math05-snap-label-horizontal-below.test.ts)
* **Класс эквивалентности**: `MATH-05 (Snap Label Horizontal Below)`
* **Описание**: Проверяет привязку подписи стрелки на 18px ниже горизонтального отрезка.

#### Предусловия:
* - Горизонтальная стрелка, курсор подписи на 8px ниже линии.

#### Выполняемые действия:
1. Вызвать snapLabelToArrow.
2. Проверить labelPos.y.

#### Ожидаемый результат:
labelPos.y === seg.y + 18, showLeader === false.

---

### ТЕСТ №163: Математика: Примагничивание подписи справа от вертикального сегмента

* **Файл**: [`tests/unit/163-math06-snap-label-vertical-right.test.ts`](./unit/163-math06-snap-label-vertical-right.test.ts)
* **Класс эквивалентности**: `MATH-06 (Snap Label Vertical Right)`
* **Описание**: Проверяет привязку подписи стрелки на 8px правее вертикального сегмента.

#### Предусловия:
* - Вертикальная стрелка, курсор на 5px правее.

#### Выполняемые действия:
1. Вызвать snapLabelToArrow.
2. Проверить labelPos.x.

#### Ожидаемый результат:
labelPos.x === seg.x + 8.

---

### ТЕСТ №164: Математика: Примагничивание подписи слева от вертикального сегмента

* **Файл**: [`tests/unit/164-math07-snap-label-vertical-left.test.ts`](./unit/164-math07-snap-label-vertical-left.test.ts)
* **Класс эквивалентности**: `MATH-07 (Snap Label Vertical Left)`
* **Описание**: Проверяет привязку подписи стрелки на 8px левее вертикального сегмента.

#### Предусловия:
* - Вертикальная стрелка, курсор на 6px левее.

#### Выполняемые действия:
1. Вызвать snapLabelToArrow.
2. Проверить labelPos.x.

#### Ожидаемый результат:
labelPos.x === seg.x - 8.

---

### ТЕСТ №165: Математика: Активация линии-выноски при удалении текста от стрелки

* **Файл**: [`tests/unit/165-math08-snap-label-remote-leader-active.test.ts`](./unit/165-math08-snap-label-remote-leader-active.test.ts)
* **Класс эквивалентности**: `MATH-08 (Snap Label Remote Leader Active)`
* **Описание**: Проверяет автоматическое включение выноски (showLeader: true) при дистанции > 25px.

#### Предусловия:
* - Стрелка на Y=200, подпись унесена на Y=300.

#### Выполняемые действия:
1. Вызвать snapLabelToArrow.
2. Проверить showLeader и массив leaderPoints.

#### Ожидаемый результат:
showLeader === true, leaderPoints.length >= 2.

---

### ТЕСТ №166: Математика: Дистанция до проекции вне начала отрезка

* **Файл**: [`tests/unit/166-math09-distance-to-segment-projection-outside-start.test.ts`](./unit/166-math09-distance-to-segment-projection-outside-start.test.ts)
* **Класс эквивалентности**: `MATH-09 (Distance to Segment Outside Start)`
* **Описание**: Проверяет дистанцию от внешней точки до начала отрезка.

#### Предусловия:
* - Отрезок (100, 100) -> (300, 100), точка (50, 100).

#### Выполняемые действия:
1. Вызвать distanceToSegment.
2. Проверить dist и proj.

#### Ожидаемый результат:
dist === 50, proj.x === 100, proj.y === 100.

---

### ТЕСТ №167: Математика: Дистанция до проекции вне конца отрезка

* **Файл**: [`tests/unit/167-math10-distance-to-segment-projection-outside-end.test.ts`](./unit/167-math10-distance-to-segment-projection-outside-end.test.ts)
* **Класс эквивалентности**: `MATH-10 (Distance to Segment Outside End)`
* **Описание**: Проверяет дистанцию от точки за пределами конца отрезка.

#### Предусловия:
* - Отрезок (100, 100) -> (300, 100), точка (350, 100).

#### Выполняемые действия:
1. Вызвать distanceToSegment.
2. Проверить proj.

#### Ожидаемый результат:
dist === 50, proj.x === 300.

---

### ТЕСТ №168: Математика: Устранение избыточных промежуточных точек на вертикали

* **Файл**: [`tests/unit/168-math11-collinear-simplification-zigzag.test.ts`](./unit/168-math11-collinear-simplification-zigzag.test.ts)
* **Класс эквивалентности**: `MATH-11 (Collinear Simplification Vertical)`
* **Описание**: Проверяет объединение цепочки вертикальных точек (200, 100) -> (200, 200) -> (200, 300) в 2 точки.

#### Предусловия:
* - Массив из 3 коллинеарных точек.

#### Выполняемые действия:
1. Вызвать simplifyCollinear.
2. Проверить длину результата.

#### Ожидаемый результат:
Результат содержит ровно 2 граничные точки.

---

### ТЕСТ №169: Математика: Построение точек выноски к ближайшему звену стрелки

* **Файл**: [`tests/unit/169-math12-generate-leader-points-nearest-segment.test.ts`](./unit/169-math12-generate-leader-points-nearest-segment.test.ts)
* **Класс эквивалентности**: `MATH-12 (Generate Leader Points Nearest Segment)`
* **Описание**: Проверяет генерацию точек выноски от текста к проекции на стрелке.

#### Предусловия:
* - Стрелка из 2 точек, подпись в стороне.

#### Выполняемые действия:
1. Вызвать generateLeaderPoints.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен массив точек, оканчивающийся на линии стрелки Y=200.

---

### ТЕСТ №17: Слияние: Объединение выходов блоков в общую шину слияния

* **Файл**: [`tests/unit/17-f17-merge-from-border.test.ts`](./unit/17-f17-merge-from-border.test.ts)
* **Класс эквивалентности**: `F17 (Block Outputs -> Merge Bus)`
* **Описание**: Проверяет слияние нескольких выходных потоков в единую шину в соответствии с РД IDEF0.

#### Предусловия:
* - Диаграмма A1 содержит два блока и узел слияния.

#### Выполняемые действия:
1. Создать общую магистраль выхода.
2. Создать узел слияния merge.
3. Присоединить приток к узлу слияния.

#### Ожидаемый результат:
Стрелка успешно зарегистрирована с целевым узлом слияния.

---

### ТЕСТ №170: Математика: Удержание длинного текста подписи в пределах правого края листа

* **Файл**: [`tests/unit/170-math13-clamp-label-near-right-edge.test.ts`](./unit/170-math13-clamp-label-near-right-edge.test.ts)
* **Класс эквивалентности**: `MATH-13 (Clamp Label Near Right Edge)`
* **Описание**: Проверяет ограничение координаты X текста, если курсор выходит за пределы листа (x: 1650).

#### Предусловия:
* - Координата X = 1650 выходит за границу CANVAS_WIDTH - margin (1580).

#### Выполняемые действия:
1. Вызвать clampLabelToCanvas.
2. Проверить X.

#### Ожидаемый результат:
X ограничен числом 1580.

---

### ТЕСТ №171: Трассировка: Обход промежуточного блока по вертикали (avoidBlockObstacles)

* **Файл**: [`tests/unit/171-router05-avoid-intermediate-block-detour-horizontal.test.ts`](./unit/171-router05-avoid-intermediate-block-detour-horizontal.test.ts)
* **Класс эквивалентности**: `ROUTE-05 (Avoid Block Detour Horizontal)`
* **Описание**: Проверяет построение обходного коридора вокруг функционального блока, лежащего на пути стрелки.

#### Предусловия:
* - Блок-препятствие расположен между началом и концом стрелки.

#### Выполняемые действия:
1. Вызвать avoidBlockObstacles.
2. Проверить наличие обходных точек.

#### Ожидаемый результат:
Сгенерирован маршрут обхода препятствия.

---

### ТЕСТ №172: Трассировка: Обход промежуточного блока по горизонтали

* **Файл**: [`tests/unit/172-router06-avoid-intermediate-block-detour-vertical.test.ts`](./unit/172-router06-avoid-intermediate-block-detour-vertical.test.ts)
* **Класс эквивалентности**: `ROUTE-06 (Avoid Block Detour Vertical)`
* **Описание**: Проверяет обход блока при вертикальном прохождении стрелки сверху вниз сквозь блок.

#### Предусловия:
* - Вертикальный отрезок (400, 50) -> (400, 500) пересекает блок в (300, 200).

#### Выполняемые действия:
1. Вызвать avoidBlockObstacles.
2. Проверить обходные координаты X.

#### Ожидаемый результат:
Маршрут содержит точки обхода левее или правее блока.

---

### ТЕСТ №173: Трассировка: Ступенчатый ввод с левой границы при значительном смещении по Y

* **Файл**: [`tests/unit/173-router07-route-stepped-horizontal-entry-from-left.test.ts`](./unit/173-router07-route-stepped-horizontal-entry-from-left.test.ts)
* **Класс эквивалентности**: `ROUTE-07 (Stepped Horizontal Entry from Left)`
* **Описание**: Проверяет построение 4-точечного ортогонального ввода от левой границы к левой грани блока при deltaY > 10.

#### Предусловия:
* - Источник (border, left, y: 100), цель (block, left, y: 300).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить количество точек.

#### Ожидаемый результат:
Построен ступенчатый 4-точечный маршрут.

---

### ТЕСТ №174: Трассировка: Ступенчатый ввод с верхней границы при смещении по X

* **Файл**: [`tests/unit/174-router08-route-stepped-vertical-entry-from-top.test.ts`](./unit/174-router08-route-stepped-vertical-entry-from-top.test.ts)
* **Класс эквивалентности**: `ROUTE-08 (Stepped Vertical Entry from Top)`
* **Описание**: Проверяет построение ортогональной трассы от верхней границы к верхней грани блока при смещении по горизонтали.

#### Предусловия:
* - Источник (border, top, x: 200), цель (block, top, x: 500).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить звенья.

#### Ожидаемый результат:
Сгенерирован ортогональный маршрут к верхней грани блока.

---

### ТЕСТ №175: Трассировка: Ступенчатый вывод на правую границу при смещении по Y

* **Файл**: [`tests/unit/175-router09-route-stepped-horizontal-exit-to-right.test.ts`](./unit/175-router09-route-stepped-horizontal-exit-to-right.test.ts)
* **Класс эквивалентности**: `ROUTE-09 (Stepped Horizontal Exit to Right)`
* **Описание**: Проверяет построение ортогонального вывода от правой грани блока к правой границе листа.

#### Предусловия:
* - Источник (block, right, y: 200), цель (border, right, y: 400).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить точки.

#### Ожидаемый результат:
Построен ступенчатый ортогональный маршрут к правой границе.

---

### ТЕСТ №176: Масштабирование: Адаптация прямой стрелки к границе листа (2 точки)

* **Файл**: [`tests/unit/176-resize05-resize-block-scale-two-point-arrow-to-border.test.ts`](./unit/176-resize05-resize-block-scale-two-point-arrow-to-border.test.ts)
* **Класс эквивалентности**: `RESIZE-05 (Scale 2-Point Arrow to Border)`
* **Описание**: Проверяет синхронное смещение граничной точки стрелки при изменении размера блока по высоте.

#### Предусловия:
* - Блок со стрелкой Выхода на правую границу.

#### Выполняемые действия:
1. Изменить размер блока по высоте на +60px.
2. Вызвать adjustArrowOnBlockResize.

#### Ожидаемый результат:
Оба конца 2-точечной стрелки выравниваются на одной высоте Y.

---

### ТЕСТ №177: Масштабирование: Адаптация 3-точечной стрелки к верхней грани блока

* **Файл**: [`tests/unit/177-resize06-resize-block-three-point-arrow-target-top.test.ts`](./unit/177-resize06-resize-block-three-point-arrow-target-top.test.ts)
* **Класс эквивалентности**: `RESIZE-06 (Scale 3-Point Arrow Target Top)`
* **Описание**: Проверяет подстройку промежуточного излома 3-точечной стрелки при горизонтальном растяжении целевого блока.

#### Предусловия:
* - 3-точечная стрелка входит в верхнюю грань блока.

#### Выполняемые действия:
1. Растянуть блок по ширине на +100px.
2. Вызвать adjustArrowOnBlockResize.

#### Ожидаемый результат:
Промежуточная точка pts[1].x выровнена с целевым портом target.point.x.

---

### ТЕСТ №178: Масштабирование: Адаптация 3-точечной стрелки к левой грани блока

* **Файл**: [`tests/unit/178-resize07-resize-block-three-point-arrow-target-left.test.ts`](./unit/178-resize07-resize-block-three-point-arrow-target-left.test.ts)
* **Класс эквивалентности**: `RESIZE-07 (Scale 3-Point Arrow Target Left)`
* **Описание**: Проверяет подстройку промежуточной точки 3-точечной входящей стрелки при изменении высоты блока.

#### Предусловия:
* - 3-точечная стрелка входит в левую грань блока.

#### Выполняемые действия:
1. Изменить высоту блока на +80px.
2. Вызвать adjustArrowOnBlockResize.

#### Ожидаемый результат:
Промежуточная точка pts[1].y выровнена с целевым портом target.point.y.

---

### ТЕСТ №179: Масштабирование: Пропорциональное смещение источника на левой грани

* **Файл**: [`tests/unit/179-resize08-resize-block-scale-source-on-left-face.test.ts`](./unit/179-resize08-resize-block-scale-source-on-left-face.test.ts)
* **Класс эквивалентности**: `RESIZE-08 (Scale Source on Left Face)`
* **Описание**: Проверяет пропорциональное масштабирование координаты Y порта на левой контактной грани.

#### Предусловия:
* - Блок со стрелкой, начинающейся на левой грани.

#### Выполняемые действия:
1. Изменить высоту блока с 100 до 200px.
2. Вызвать adjustArrowOnBlockResize.

#### Ожидаемый результат:
Порт смещен пропорционально новой высоте.

---

### ТЕСТ №18: Неприсоединенный конец: Одиночный свободный конец стрелки

* **Файл**: [`tests/unit/18-f18-unattached-stub-validation.test.ts`](./unit/18-f18-unattached-stub-validation.test.ts)
* **Класс эквивалентности**: `F18 (Unattached Stub)`
* **Описание**: Проверяет поддержку стрелки со свободным (неприсоединенным) концом в процессе построения модели.

#### Предусловия:
* - Диаграмма A1 содержит блок.

#### Выполняемые действия:
1. Создать стрелку, где source привязан к блоку, а target имеет type === 'unattached'.
2. Проверить корректность структуры объекта стрелки.

#### Ожидаемый результат:
Стрелка успешно создана со свободным концом (target.type === 'unattached').

---

### ТЕСТ №180: Масштабирование: Пропорциональное смещение источника на верхней грани

* **Файл**: [`tests/unit/180-resize09-resize-block-scale-source-on-top-face.test.ts`](./unit/180-resize09-resize-block-scale-source-on-top-face.test.ts)
* **Класс эквивалентности**: `RESIZE-09 (Scale Source on Top Face)`
* **Описание**: Проверяет пропорциональное масштабирование координаты X порта на верхней грани блока.

#### Предусловия:
* - Блок шириной 200px растянут до 300px.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize.
2. Проверить source.point.x.

#### Ожидаемый результат:
source.point.x смещен пропорционально увеличению ширины.

---

### ТЕСТ №181: Линтер: Ошибка ссылки на несуществующий блок-источник (FR-LINT-03)

* **Файл**: [`tests/unit/181-lint13-error-arrow-source-missing-block.test.ts`](./unit/181-lint13-error-arrow-source-missing-block.test.ts)
* **Класс эквивалентности**: `LINT-13 (Missing Source Block Reference)`
* **Описание**: Проверяет фиксацию ошибки валидатором, если стрелка ссылается на удаленный или несуществующий блок-источник.

#### Предусловия:
* - Стрелка указывает source.id на 'missing-block'.

#### Выполняемые действия:
1. Запустить geometryOrthoRule.
2. Проверить наличие issues с severity 'error'.

#### Ожидаемый результат:
Линтер зафиксировал ошибку отсутствия блока-источника.

---

### ТЕСТ №182: Линтер: Ошибка ссылки на несуществующий блок-приемник (FR-LINT-03)

* **Файл**: [`tests/unit/182-lint14-error-arrow-target-missing-block.test.ts`](./unit/182-lint14-error-arrow-target-missing-block.test.ts)
* **Класс эквивалентности**: `LINT-14 (Missing Target Block Reference)`
* **Описание**: Проверяет фиксацию ошибки валидатором при ссылке на отсутствующий целевой блок.

#### Предусловия:
* - Стрелка указывает target.id на 'missing-target'.

#### Выполняемые действия:
1. Запустить geometryOrthoRule.
2. Проверить issues.

#### Ожидаемый результат:
Зафиксирована ошибка валидации целевого блока.

---

### ТЕСТ №183: Линтер: Ошибка начала стрелки вне геометрических границ блока

* **Файл**: [`tests/unit/183-lint15-error-arrow-source-outside-block-bounds.test.ts`](./unit/183-lint15-error-arrow-source-outside-block-bounds.test.ts)
* **Класс эквивалентности**: `LINT-15 (Source Outside Block Bounds)`
* **Описание**: Проверяет обнаружение оторванной стрелки, начинающейся в воздухе за пределами грани блока.

#### Предусловия:
* - Блок x: 200..400, y: 100..200; стрелка начинается в X=500 на верхней грани.

#### Выполняемые действия:
1. Запустить geometryOrthoRule.
2. Проверить issues.

#### Ожидаемый результат:
Зафиксирована ошибка выхода порта за габариты блока.

---

### ТЕСТ №184: Линтер: Ошибка окончания стрелки в воздухе вне границ блока

* **Файл**: [`tests/unit/184-lint16-error-arrow-target-outside-block-bounds.test.ts`](./unit/184-lint16-error-arrow-target-outside-block-bounds.test.ts)
* **Класс эквивалентности**: `LINT-16 (Target Outside Block Bounds)`
* **Описание**: Проверяет обнаружение стрелки, оканчивающейся в воздухе за пределами грани целевого блока.

#### Предусловия:
* - Блок y: 200..300; стрелка входит в левую грань на Y=450.

#### Выполняемые действия:
1. Запустить geometryOrthoRule.
2. Проверить issues.

#### Ожидаемый результат:
Зафиксирована ошибка входа стрелки вне габаритов блока.

---

### ТЕСТ №185: Линтер: Предупреждение о перекрытии подписи вертикальным сегментом (FR-LINT-07)

* **Файл**: [`tests/unit/185-lint17-warn-vertical-segment-cuts-label-text.test.ts`](./unit/185-lint17-warn-vertical-segment-cuts-label-text.test.ts)
* **Класс эквивалентности**: `LINT-17 (Vertical Segment Label Overlap)`
* **Описание**: Проверяет обнаружение коллизии вертикальной стрелки, рассекающей текст подписи другой стрелки.

#### Предусловия:
* - Горизонтальная стрелка с текстом в (300, 200), вертикальная стрелка проходит через X=320.

#### Выполняемые действия:
1. Запустить labelOverlapRule.
2. Проверить issues.

#### Ожидаемый результат:
Зафиксировано предупреждение FR-LINT-07 о перекрытии подписи.

---

### ТЕСТ №186: Линтер: Дисбаланс граничных стрелок (отсутствует Выход в дочерней диаграмме)

* **Файл**: [`tests/unit/186-lint18-boundary-balance-missing-output-in-child.test.ts`](./unit/186-lint18-boundary-balance-missing-output-in-child.test.ts)
* **Класс эквивалентности**: `LINT-18 (Boundary Balance Missing Child Output)`
* **Описание**: Проверяет обнаружение отсутствующего выхода родительского блока на диаграмме декомпозиции.

#### Предусловия:
* - Родительский блок имеет 2 выхода, в декомпозиции представлен только 1.

#### Выполняемые действия:
1. Запустить boundaryBalanceRule.
2. Проверить issues.

#### Ожидаемый результат:
Зафиксировано нарушение баланса граничных стрелок.

---

### ТЕСТ №187: Линтер: Дисбаланс граничных стрелок (отсутствует Вход в декомпозиции)

* **Файл**: [`tests/unit/187-lint19-boundary-balance-missing-input-in-child.test.ts`](./unit/187-lint19-boundary-balance-missing-input-in-child.test.ts)
* **Класс эквивалентности**: `LINT-19 (Boundary Balance Missing Child Input)`
* **Описание**: Проверяет обнаружение пропавшего входного потока родительского блока на дочерней схеме.

#### Предусловия:
* - Родительский блок принимает сырье со стороны входа, на дочерней схеме входных стрелок нет.

#### Выполняемые действия:
1. Запустить boundaryBalanceRule.
2. Проверить issues.

#### Ожидаемый результат:
Зафиксировано нарушение баланса входов.

---

### ТЕСТ №188: Линтер: Предупреждение о неподключенной стрелке-заглушке (FR-LINT-06)

* **Файл**: [`tests/unit/188-lint20-unattached-stub-arrow-warning.test.ts`](./unit/188-lint20-unattached-stub-arrow-warning.test.ts)
* **Класс эквивалентности**: `LINT-20 (Unattached Stub Arrow Warning)`
* **Описание**: Проверяет обнаружение стрелки, у которой один из концов не подключен ни к блоку, ни к границе.

#### Предусловия:
* - Стрелка с эндпоинтом типа 'unattached'.

#### Выполняемые действия:
1. Запустить unattachedArrowRule.
2. Проверить issues.

#### Ожидаемый результат:
Зафиксировано предупреждение о неподключенной стрелке.

---

### ТЕСТ №189: Линтер: Предупреждение о наложении коллинеарных стрелок (FR-LINT-05)

* **Файл**: [`tests/unit/189-lint21-collinear-overlap-warning.test.ts`](./unit/189-lint21-collinear-overlap-warning.test.ts)
* **Класс эквивалентности**: `LINT-21 (Collinear Overlap Linter Warning)`
* **Описание**: Проверяет обнаружение двух стрелок, частично перекрывающихся по одной оси.

#### Предусловия:
* - Две стрелки частично накладываются на отрезке от (250, 300) до (400, 300).

#### Выполняемые действия:
1. Запустить intersectionsRule.
2. Проверить issues.

#### Ожидаемый результат:
Зафиксировано предупреждение FR-LINT-05 о коллинеарном перекрытии линий.

---

### ТЕСТ №19: Мутация M1: Переподключение целевого конца стрелки

* **Файл**: [`tests/unit/19-m01-reconnect-target-endpoint.test.ts`](./unit/19-m01-reconnect-target-endpoint.test.ts)
* **Класс эквивалентности**: `M1 (Dynamic Target Reconnection)`
* **Описание**: Проверяет динамическое переподключение целевого конца стрелки от одного блока к другому.

#### Предусловия:
* - Диаграмма содержит Блок 1, Блок 2, Блок 3 и стрелку от Блока 1 к Блоку 2.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint для изменения цели стрелки на Блок 3.
2. Проверить обновление target.id.

#### Ожидаемый результат:
Цель стрелки обновлена на Блок 3.

---

### ТЕСТ №190: Линтер: Отсутствие замечаний на эталонной корректной диаграмме

* **Файл**: [`tests/unit/190-lint22-clean-diagram-no-issues.test.ts`](./unit/190-lint22-clean-diagram-no-issues.test.ts)
* **Класс эквивалентности**: `LINT-22 (Clean Diagram Zero Issues)`
* **Описание**: Проверяет работу линтера на чистой, полностью связной диаграмме без коллизий и нарушений стандарта.

#### Предусловия:
* - Корректная диаграмма декомпозиции с 3 блоками.

#### Выполняемые действия:
1. Запустить runIDEF0Linter на диаграмме.
2. Проверить массив issues.

#### Ожидаемый результат:
issues.filter(i => i.severity === 'error').length === 0.

---

### ТЕСТ №191: Импорт/Экспорт: Отклонение невалидного JSON (примитивы вместо объекта)

* **Файл**: [`tests/unit/191-io05-import-reject-non-object-json.test.ts`](./unit/191-io05-import-reject-non-object-json.test.ts)
* **Класс эквивалентности**: `IO-05 (Import Reject Non Object JSON)`
* **Описание**: Проверяет отклонение парсинга, если JSON содержит строку, число или null вместо объекта проекта.

#### Предусловия:
* - Строка JSON '12345'.

#### Выполняемые действия:
1. Вызвать importProjectFromJson.
2. Проверить результат.

#### Ожидаемый результат:
success === false, ошибка 'Файл не содержит валидный JSON объект'.

---

### ТЕСТ №192: Импорт/Экспорт: Отклонение проекта без обязательных полей (id, name, diagrams)

* **Файл**: [`tests/unit/192-io06-import-reject-missing-system-fields.test.ts`](./unit/192-io06-import-reject-missing-system-fields.test.ts)
* **Класс эквивалентности**: `IO-06 (Import Reject Missing System Fields)`
* **Описание**: Проверяет отклонение импорта структуры, в которой отсутствует список diagrams или name.

#### Предусловия:
* - JSON-объект без массива diagrams.

#### Выполняемые действия:
1. Вызвать importProjectFromJson.
2. Проверить success.

#### Ожидаемый результат:
success === false, зафиксирована ошибка структуры.

---

### ТЕСТ №193: Импорт/Экспорт: Отклонение проекта с дубликатами ID диаграмм

* **Файл**: [`tests/unit/193-io07-import-reject-duplicate-diagram-id.test.ts`](./unit/193-io07-import-reject-duplicate-diagram-id.test.ts)
* **Класс эквивалентности**: `IO-07 (Import Reject Duplicate Diagram ID)`
* **Описание**: Проверяет целостность идентификаторов при импорте.

#### Предусловия:
* - Проект с двумя диаграммами с одинаковым id 'diag-duplicate'.

#### Выполняемые действия:
1. Вызвать importProjectFromJson.
2. Проверить success.

#### Ожидаемый результат:
success === false, ошибка дубликата идентификатора диаграммы.

---

### ТЕСТ №194: Импорт/Экспорт: Отклонение диаграммы с дубликатами ID блоков

* **Файл**: [`tests/unit/194-io08-import-reject-duplicate-block-id.test.ts`](./unit/194-io08-import-reject-duplicate-block-id.test.ts)
* **Класс эквивалентности**: `IO-08 (Import Reject Duplicate Block ID)`
* **Описание**: Проверяет отклонение проекта с одинаковыми идентификаторами функциональных блоков.

#### Предусловия:
* - Диаграмма содержит два блока с id 'block-dup'.

#### Выполняемые действия:
1. Вызвать importProjectFromJson.
2. Проверить success.

#### Ожидаемый результат:
success === false, ошибка дубликата блока.

---

### ТЕСТ №195: Импорт/Экспорт: Отклонение нечисловых координат блоков

* **Файл**: [`tests/unit/195-io09-import-reject-invalid-block-coordinates.test.ts`](./unit/195-io09-import-reject-invalid-block-coordinates.test.ts)
* **Класс эквивалентности**: `IO-09 (Import Reject Invalid Block Coordinates)`
* **Описание**: Проверяет валидацию числового формата координат и размеров блоков при десериализации.

#### Предусловия:
* - Блок содержит x: 'не число'.

#### Выполняемые действия:
1. Вызвать importProjectFromJson.
2. Проверить результат.

#### Ожидаемый результат:
success === false, ошибка некорректных координат.

---

### ТЕСТ №196: Хранилище: Загрузка проекта из JSON-строки (store.importProject)

* **Файл**: [`tests/unit/196-io10-import-project-string-via-store.test.ts`](./unit/196-io10-import-project-string-via-store.test.ts)
* **Класс эквивалентности**: `IO-10 (Import Project String via Store)`
* **Описание**: Проверяет загрузку корректного JSON проекта напрямую через фасадное API хранилища.

#### Предусловия:
* - Валидная JSON-строка проекта.

#### Выполняемые действия:
1. Вызвать store.importProject(validJson).
2. Проверить activeDiagramId и name.

#### Ожидаемый результат:
Проект успешно загружен, активная диаграмма установлена.

---

### ТЕСТ №197: Хранилище: Защита от повреждения состояния при сбое импорта (store.importProject)

* **Файл**: [`tests/unit/197-io11-import-project-reject-invalid-via-store.test.ts`](./unit/197-io11-import-project-reject-invalid-via-store.test.ts)
* **Класс эквивалентности**: `IO-11 (Import Protect State on Failure)`
* **Описание**: Проверяет сохранение неизменным исходного состояния при попытке импорта битого JSON.

#### Предусловия:
* - Хранилище с рабочим проектом.

#### Выполняемые действия:
1. Передать невалидную строку в store.importProject('{ broken json').
2. Проверить возвращаемое значение и целостность проекта.

#### Ожидаемый результат:
Возвращено false, исходный проект сохранен.

---

### ТЕСТ №198: Проект: Загрузка эталонной демонстрационной модели (store.loadExample)

* **Файл**: [`tests/unit/198-proj07-load-example-in-store.test.ts`](./unit/198-proj07-load-example-in-store.test.ts)
* **Класс эквивалентности**: `PROJ-07 (Load Example in Store)`
* **Описание**: Проверяет инициализацию эталонного технологического процесса в хранилище.

#### Предусловия:
* - Пустой проект.

#### Выполняемые действия:
1. Вызвать store.loadExample().
2. Проверить количество диаграмм и активную схему.

#### Ожидаемый результат:
Загружен демонстрационный пример с диаграммами A0 и A1.

---

### ТЕСТ №199: Проект: Создание узла ветвления через store.createJunction

* **Файл**: [`tests/unit/199-proj08-create-junction-via-store.test.ts`](./unit/199-proj08-create-junction-via-store.test.ts)
* **Класс эквивалентности**: `PROJ-08 (Create Junction via Store)`
* **Описание**: Проверяет регистрацию нового узла на активной диаграмме.

#### Предусловия:
* - Активная диаграмма в хранилище.

#### Выполняемые действия:
1. Вызвать store.createJunction('branch', { x: 500, y: 300 }).
2. Проверить массив диаграммы junctions.

#### Ожидаемый результат:
Узел зарегистрирован, присвоен уникальный id.

---

### ТЕСТ №20: Мутация M2: Переподключение исходного конца стрелки

* **Файл**: [`tests/unit/20-m02-reconnect-source-endpoint.test.ts`](./unit/20-m02-reconnect-source-endpoint.test.ts)
* **Класс эквивалентности**: `M2 (Dynamic Source Reconnection)`
* **Описание**: Проверяет динамическое переподключение исходного конца стрелки с границы на функциональный блок.

#### Предусловия:
* - Стрелка соединяет левую границу холста с Блоком 2.

#### Выполняемые действия:
1. Переподключить источник стрелки с границы на правый выход Блока 1.
2. Проверить тип источника source.type === 'block'.

#### Ожидаемый результат:
Источник стрелки успешно изменен на Блок 1.

---

### ТЕСТ №200: Проект: Полный сквозной цикл проектирования (E2E Lifecycle)

* **Файл**: [`tests/unit/200-proj09-full-lifecycle-create-connect-decompose-export.test.ts`](./unit/200-proj09-full-lifecycle-create-connect-decompose-export.test.ts)
* **Класс эквивалентности**: `PROJ-09 (Full E2E Lifecycle)`
* **Описание**: Проверяет полный сквозной сценарий пользователя: инициализация проекта -> создание блоков -> соединение стрелками -> декомпозиция -> экспорт в векторный SVG.

#### Предусловия:
* - Чистое хранилище.

#### Выполняемые действия:
1. Создать блоки b1 и b2.
2. Соединить их стрелкой Выхода.
3. Декомпозировать блок b1 на дочернюю диаграмму.
4. Экспортировать родительскую и дочернюю схемы в SVG.

#### Ожидаемый результат:
Полный цикл выполнен без ошибок, экспортированы валидные SVG-документы.

---

### ТЕСТ №201: Адаптация: Построение петли обратной связи под блоками (Subcase B1 Feedback)

* **Файл**: [`tests/unit/201-move05-move-block-feedback-bypass-loop-under-blocks.test.ts`](./unit/201-move05-move-block-feedback-bypass-loop-under-blocks.test.ts)
* **Класс эквивалентности**: `MOVE-05 (Block Move Feedback Loop Under Blocks)`
* **Описание**: Проверяет построение обходного маршрута под блоками, когда источник смещен правее приемника.

#### Предусловия:
* - Блок 1 правее Блока 2, стрелка идет справа налево.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить количество точек (>= 6).

#### Ожидаемый результат:
Стрелка обходит блоки снизу с сохранением ортогональности.

---

### ТЕСТ №202: Адаптация: Стрелка с Выхода на Управление вперед (Subcase B2 Forward)

* **Файл**: [`tests/unit/202-move06-move-block-forward-right-to-control-top.test.ts`](./unit/202-move06-move-block-forward-right-to-control-top.test.ts)
* **Класс эквивалентности**: `MOVE-06 (Block Move Right to Top Forward)`
* **Описание**: Проверяет трассировку L-образной стрелки из 3 точек от Выхода к Управлению целевого блока правее.

#### Предусловия:
* - Блок 1 левее Блока 2, стрелка Выход -> Управление.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить points.length === 3.

#### Ожидаемый результат:
arrow.points.length === 3 с прямым углом.

---

### ТЕСТ №203: Адаптация: Стрелка с Выхода на Управление назад (Subcase B2 Backward)

* **Файл**: [`tests/unit/203-move07-move-block-backward-right-to-control-top.test.ts`](./unit/203-move07-move-block-backward-right-to-control-top.test.ts)
* **Класс эквивалентности**: `MOVE-07 (Block Move Right to Top Backward)`
* **Описание**: Проверяет обход над блоками при направлении с Выхода правого блока на Управление левого блока.

#### Предусловия:
* - Блок 1 правее Блока 2, стрелка Выход -> Управление.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить points.length === 5.

#### Ожидаемый результат:
arrow.points.length === 5, обход над блоками.

---

### ТЕСТ №204: Адаптация: Ступенчатая 4-точечная трассировка по умолчанию

* **Файл**: [`tests/unit/204-move08-move-block-default-stepped-orthogonal-routing.test.ts`](./unit/204-move08-move-block-default-stepped-orthogonal-routing.test.ts)
* **Класс эквивалентности**: `MOVE-08 (Block Move Default 4-Point Stepped)`
* **Описание**: Проверяет построение стандартной ступенчатой трассы через midX.

#### Предусловия:
* - Стрелка между блоками со смещением по диагонали.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить точки.

#### Ожидаемый результат:
Стрелка содержит 4 точки с перегибом в midX.

---

### ТЕСТ №205: Адаптация: 4-точечный ступенчатый вывод на правую границу (Case D n=4)

* **Файл**: [`tests/unit/205-move09-move-block-stepped-outflow-to-right-border.test.ts`](./unit/205-move09-move-block-stepped-outflow-to-right-border.test.ts)
* **Класс эквивалентности**: `MOVE-09 (Block Move Stepped Outflow to Border)`
* **Описание**: Проверяет пересчет промежуточных звеньев ступенчатой стрелки на правую границу при сдвиге блока.

#### Предусловия:
* - Стрелка из 4 точек идет от блока на правую границу.

#### Выполняемые действия:
1. Сместить блок на (50, 40).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Начало смещено, промежуточный вертикальный коридор адаптирован.

---

### ТЕСТ №206: Адаптация: Скольжение узла ветвления вдоль ствола (Case E n=2)

* **Файл**: [`tests/unit/206-move10-move-block-branch-junction-slides-n2.test.ts`](./unit/206-move10-move-block-branch-junction-slides-n2.test.ts)
* **Класс эквивалентности**: `MOVE-10 (Block Move Branch Junction Slides n=2)`
* **Описание**: Проверяет скольжение точки ветвления по стволу при горизонтальном перемещении целевого блока 2-точечной ветви.

#### Предусловия:
* - Вертикальное ответвление из 2 точек от ствола к Управлению целевого блока.

#### Выполняемые действия:
1. Сместить целевой блок на dx=80.
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
junc.point.x смещается на +80, удерживая стрелку вертикальной.

---

### ТЕСТ №207: Адаптация: Подстройка угла 3-точечного ответвления (Case E n=3)

* **Файл**: [`tests/unit/207-move11-move-block-branch-junction-shifts-corner-n3.test.ts`](./unit/207-move11-move-block-branch-junction-shifts-corner-n3.test.ts)
* **Класс эквивалентности**: `MOVE-11 (Block Move Branch Shifts Corner n=3)`
* **Описание**: Проверяет сохранение позиции узла на стволе со смещением промежуточного угла ветвления вслед за целевым блоком.

#### Предусловия:
* - 3-точечное ответвление от неподвижного узла.

#### Выполняемые действия:
1. Сместить целевой блок на (40, 50).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
junc.point остается на месте, угол pts[1].x следует за блоком.

---

### ТЕСТ №208: Адаптация: Многозвенное ответвление при сдвиге блока (Case E n>=5)

* **Файл**: [`tests/unit/208-move12-move-block-branch-multipoint-n5.test.ts`](./unit/208-move12-move-block-branch-multipoint-n5.test.ts)
* **Класс эквивалентности**: `MOVE-12 (Block Move Multi-point Branch n>=5)`
* **Описание**: Проверяет адаптацию сложной обходной ветви при сдвиге блока-приемника.

#### Предусловия:
* - Ветвь из 5 точек входит в блок.

#### Выполняемые действия:
1. Сместить блок на (30, 40).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Целевая точка и предпоследняя точка смещаются синхронно.

---

### ТЕСТ №209: Адаптация: Слияние стрелки в узел магистрали (Case F Merge)

* **Файл**: [`tests/unit/209-move13-move-block-merge-arrow-shifts-into-junction.test.ts`](./unit/209-move13-move-block-merge-arrow-shifts-into-junction.test.ts)
* **Класс эквивалентности**: `MOVE-13 (Block Move Merge Arrow into Junction)`
* **Описание**: Проверяет смещение стрелки слияния при перемещении блока-источника.

#### Предусловия:
* - Стрелка идет от блока в узел слияния.

#### Выполняемые действия:
1. Сместить блок на (50, 30).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Начало стрелки смещается синхронно с блоком.

---

### ТЕСТ №21: Мутация M3: Сдвиг сегмента стрелки со строгой ортогональностью

* **Файл**: [`tests/unit/21-m03-shift-segment-orthogonal-invariant.test.ts`](./unit/21-m03-shift-segment-orthogonal-invariant.test.ts)
* **Класс эквивалентности**: `M3 (Segment Shift & Orthogonality Invariant)`
* **Описание**: Проверяет смещение параллельного коридора сегмента с сохранением 100% ортогональности всех смежных сегментов.

#### Предусловия:
* - Диаграмма содержит стрелку со ступенчатым маршрутом из 4 точек.

#### Выполняемые действия:
1. Сдвинуть промежуточный вертикальный сегмент на 50px по оси X.
2. Проверить, что обновленный маршрут сохраняет строго прямые углы (dx === 0 || dy === 0).

#### Ожидаемый результат:
Сегмент смещен, каждый смежный сегмент строго вертикален или строго горизонтален.

---

### ТЕСТ №210: Адаптация: Синхронное перемещение подписи на первом сегменте

* **Файл**: [`tests/unit/210-move14-move-block-synchronize-first-segment-label.test.ts`](./unit/210-move14-move-block-synchronize-first-segment-label.test.ts)
* **Класс эквивалентности**: `MOVE-14 (Synchronize First Segment Label)`
* **Описание**: Проверяет следование текста подписи за блоком-источником при его перемещении.

#### Предусловия:
* - Подпись привязана к начальному горизонтальному сегменту.

#### Выполняемые действия:
1. Сместить блок-источник на (40, 60).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
labelPos.x и labelPos.y смещены на (40, 60).

---

### ТЕСТ №211: Адаптация: Синхронное перемещение подписи на последнем сегменте

* **Файл**: [`tests/unit/211-move15-move-block-synchronize-last-segment-label.test.ts`](./unit/211-move15-move-block-synchronize-last-segment-label.test.ts)
* **Класс эквивалентности**: `MOVE-15 (Synchronize Last Segment Label)`
* **Описание**: Проверяет следование текста подписи за целевым блоком.

#### Предусловия:
* - Подпись привязана к последнему сегменту стрелки.

#### Выполняемые действия:
1. Сместить целевой блок на (50, 40).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
Подпись перемещается синхронно с целевым портом.

---

### ТЕСТ №212: Именование: Определение родителя стрелки по прямой ссылке ID

* **Файл**: [`tests/unit/212-name05-resolve-arrow-parent-direct-reference.test.ts`](./unit/212-name05-resolve-arrow-parent-direct-reference.test.ts)
* **Класс эквивалентности**: `NAME-05 (Arrow Parent Direct ID Reference)`
* **Описание**: Проверяет нахождение родительского потока, если эндпоинт явно ссылается на ID стрелки.

#### Предусловия:
* - Стрелка ответвления с source.id === 'trunk-id'.

#### Выполняемые действия:
1. Вызвать getArrowParent.
2. Проверить parent.id.

#### Ожидаемый результат:
parent?.id === 'trunk-id'.

---

### ТЕСТ №213: Именование: Поиск родителя по совпадению точки на горизонтальном отрезке

* **Файл**: [`tests/unit/213-name06-resolve-arrow-parent-waypoint-on-horizontal-segment.test.ts`](./unit/213-name06-resolve-arrow-parent-waypoint-on-horizontal-segment.test.ts)
* **Класс эквивалентности**: `NAME-06 (Arrow Parent Waypoint on Horizontal)`
* **Описание**: Проверяет геометрический поиск ствола, когда точка начала ветви лежит на горизонтальной линии.

#### Предусловия:
* - Ствол на Y=200, ветвь начинается в (400, 200).

#### Выполняемые действия:
1. Вызвать getArrowParent.
2. Проверить результат.

#### Ожидаемый результат:
Родительская стрелка успешно обнаружена.

---

### ТЕСТ №214: Именование: Поиск родителя по совпадению точки на вертикальном отрезке

* **Файл**: [`tests/unit/214-name07-resolve-arrow-parent-waypoint-on-vertical-segment.test.ts`](./unit/214-name07-resolve-arrow-parent-waypoint-on-vertical-segment.test.ts)
* **Класс эквивалентности**: `NAME-07 (Arrow Parent Waypoint on Vertical)`
* **Описание**: Проверяет геометрический поиск ствола, когда начало ветви лежит на вертикальном звене.

#### Предусловия:
* - Ствол проходит вертикально по X=350, ветвь отходит вбок.

#### Выполняемые действия:
1. Вызвать getArrowParent.
2. Проверить результат.

#### Ожидаемый результат:
Ствол определен в качестве родителя.

---

### ТЕСТ №215: Именование: Форматирование префикса ответвления 'Ответвление от <Родитель>'

* **Файл**: [`tests/unit/215-name08-display-name-branch-prefix-formatting.test.ts`](./unit/215-name08-display-name-branch-prefix-formatting.test.ts)
* **Класс эквивалентности**: `NAME-08 (Branch Prefix Formatting)`
* **Описание**: Проверяет формирование автоматического читаемого имени безымянного ответвления от подписанного ствола.

#### Предусловия:
* - Ствол с именем 'Основное сырье', дочерняя ветвь без имени.

#### Выполняемые действия:
1. Вызвать getArrowDisplayName.
2. Проверить строку.

#### Ожидаемый результат:
Возвращается 'Ответвление от «Основное сырье»'.

---

### ТЕСТ №216: Синхронизация узлов: Слияние из 2 точек (synchronizeJunctions)

* **Файл**: [`tests/unit/216-junc06-junction-sync-merge-arrow-n2.test.ts`](./unit/216-junc06-junction-sync-merge-arrow-n2.test.ts)
* **Класс эквивалентности**: `JUNC-06 (Sync Merge Arrow n=2)`
* **Описание**: Проверяет пересчет стрелки слияния при смещении узла на стволе.

#### Предусловия:
* - Стрелка слияния из 2 точек входит в узел junc.

#### Выполняемые действия:
1. Сместить junc.point на Y=300.
2. Вызвать synchronizeJunctions.

#### Ожидаемый результат:
Конечная точка стрелки обновлена до новой позиции узла.

---

### ТЕСТ №217: Синхронизация узлов: Слияние из 3 точек с источником на верхней грани

* **Файл**: [`tests/unit/217-junc07-junction-sync-merge-arrow-n3-source-top.test.ts`](./unit/217-junc07-junction-sync-merge-arrow-n3-source-top.test.ts)
* **Класс эквивалентности**: `JUNC-07 (Sync Merge Arrow n=3 Source Top)`
* **Описание**: Проверяет обновление промежуточных точек L-образного слияния сверху.

#### Предусловия:
* - Стрелка слияния начинается сверху (role: 'control').

#### Выполняемые действия:
1. Сместить узел junc.point.
2. Вызвать synchronizeJunctions.

#### Ожидаемый результат:
Промежуточный угол подстраивается под Y узла.

---

### ТЕСТ №218: Синхронизация узлов: Слияние из 3 точек с источником на левой грани

* **Файл**: [`tests/unit/218-junc08-junction-sync-merge-arrow-n3-source-left.test.ts`](./unit/218-junc08-junction-sync-merge-arrow-n3-source-left.test.ts)
* **Класс эквивалентности**: `JUNC-08 (Sync Merge Arrow n=3 Source Left)`
* **Описание**: Проверяет обновление промежуточного вертикального канала слияния слева.

#### Предусловия:
* - Стрелка слияния начинается слева.

#### Выполняемые действия:
1. Сместить узел junc.point.
2. Вызвать synchronizeJunctions.

#### Ожидаемый результат:
Промежуточный канал выравнивается по X узла.

---

### ТЕСТ №219: Синхронизация узлов: Обновление выноски подписи при сдвиге узла

* **Файл**: [`tests/unit/219-junc09-junction-sync-with-leader-line.test.ts`](./unit/219-junc09-junction-sync-with-leader-line.test.ts)
* **Класс эквивалентности**: `JUNC-09 (Sync Junction with Leader Line)`
* **Описание**: Проверяет пересчет координат линии выноски (leaderPoints) при смещении родительского узла.

#### Предусловия:
* - Стрелка ответвления имеет showLeader === true.

#### Выполняемые действия:
1. Вызвать synchronizeJunctions.
2. Проверить leaderPoints.

#### Ожидаемый результат:
Координаты выноски успешно обновлены.

---

### ТЕСТ №22: Мутация M4: Удаление излома стрелки по клику

* **Файл**: [`tests/unit/22-m04-remove-corner-bend-point.test.ts`](./unit/22-m04-remove-corner-bend-point.test.ts)
* **Класс эквивалентности**: `M4 (Corner Handle Bend Deletion)`
* **Описание**: Проверяет удаление вершины излома стрелки и спрямление прилегающих сегментов.

#### Предусловия:
* - Стрелка имеет сложный ступенчатый маршрут из 6 точек.

#### Выполняемые действия:
1. Вызвать removeArrowPoint для угловой точки (индекс 2).
2. Проверить сокращение количества точек и спрямление стрелки.

#### Ожидаемый результат:
Излом удален, маршрут спрямлен.

---

### ТЕСТ №220: Масштабирование: Адаптация 4-точечной стрелки (pts[1].y / pts[2].y)

* **Файл**: [`tests/unit/220-resize10-resize-block-scale-four-point-arrow.test.ts`](./unit/220-resize10-resize-block-scale-four-point-arrow.test.ts)
* **Класс эквивалентности**: `RESIZE-10 (Scale 4-Point Arrow on Resize)`
* **Описание**: Проверяет выравнивание горизонтальных звеньев 4-точечной стрелки при ресайзе блока.

#### Предусловия:
* - 4-точечная стрелка подключена к блоку.

#### Выполняемые действия:
1. Изменить размеры блока.
2. Вызвать adjustArrowOnBlockResize.

#### Ожидаемый результат:
pts[1].y выровнена с pts[0].y.

---

### ТЕСТ №221: Масштабирование: Пересчет выноски подписи при ресайзе блока

* **Файл**: [`tests/unit/221-resize11-resize-block-leader-line-update.test.ts`](./unit/221-resize11-resize-block-leader-line-update.test.ts)
* **Класс эквивалентности**: `RESIZE-11 (Leader Line Update on Resize)`
* **Описание**: Проверяет обновление leaderPoints стрелки с выноской при изменении размера подключенного блока.

#### Предусловия:
* - Стрелка с включенной выноской (showLeader: true).

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize.
2. Проверить leaderPoints.

#### Ожидаемый результат:
leaderPoints обновлены с учетом нового положения портов.

---

### ТЕСТ №222: Хранилище: Смещение сегмента ствола со встроенным узлом ветвления

* **Файл**: [`tests/unit/222-store19-shift-arrow-segment-with-branch-junction.test.ts`](./unit/222-store19-shift-arrow-segment-with-branch-junction.test.ts)
* **Класс эквивалентности**: `STORE-19 (Shift Segment with Branch Junction)`
* **Описание**: Проверяет автоматическое синхронное перемещение узла ветвления и дочерней стрелки при сдвиге сегмента ствола.

#### Предусловия:
* - Ствол содержит узел ветвления и дочернюю ветвь к блоку 3.

#### Выполняемые действия:
1. Вызвать store.shiftArrowSegment.
2. Проверить junc.point.

#### Ожидаемый результат:
Узел ветвления смещен на новый уровень координаты.

---

### ТЕСТ №223: Хранилище: Смещение сегмента ствола со встроенным узлом слияния

* **Файл**: [`tests/unit/223-store20-shift-arrow-segment-with-merge-junction.test.ts`](./unit/223-store20-shift-arrow-segment-with-merge-junction.test.ts)
* **Класс эквивалентности**: `STORE-20 (Shift Segment with Merge Junction)`
* **Описание**: Проверяет перемещение узла слияния и конца входящей стрелки при сдвиге несущего сегмента ствола.

#### Предусловия:
* - Ствол содержит узел слияния и входящую стрелку слияния.

#### Выполняемые действия:
1. Вызвать store.shiftArrowSegment.
2. Проверить junc.point.

#### Ожидаемый результат:
Узел слияния смещен на новую координату.

---

### ТЕСТ №224: Хранилище: Создание узла слияния через setArrowEndpointKey ('junction:merge:trunkId')

* **Файл**: [`tests/unit/224-store21-set-endpoint-key-merge-junction.test.ts`](./unit/224-store21-set-endpoint-key-merge-junction.test.ts)
* **Класс эквивалентности**: `STORE-21 (Set Endpoint Key Merge Junction)`
* **Описание**: Проверяет создание узла типа 'merge' на стволе при привязке конца стрелки.

#### Предусловия:
* - Магистраль и стрелка, выходящая из правой грани блока 3.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey(incoming.id, 'target', `junction:merge:${trunk.id}`).
2. Проверить массив junctions.

#### Ожидаемый результат:
Создан узел типа 'merge', стрелка ссылается на узел.

---

### ТЕСТ №225: Хранилище: Привязка стрелки к левой границе (border:left)

* **Файл**: [`tests/unit/225-store22-set-endpoint-key-border-left.test.ts`](./unit/225-store22-set-endpoint-key-border-left.test.ts)
* **Класс эквивалентности**: `STORE-22 (Set Endpoint Key Border Left)`
* **Описание**: Проверяет переключение источника стрелки на левую границу холста.

#### Предусловия:
* - Стрелка между двумя блоками.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey(a.id, 'source', 'border:left').
2. Проверить source.side и source.type.

#### Ожидаемый результат:
source.type === 'border', source.side === 'left'.

---

### ТЕСТ №226: Хранилище: Привязка стрелки к правой границе (border:right)

* **Файл**: [`tests/unit/226-store23-set-endpoint-key-border-right.test.ts`](./unit/226-store23-set-endpoint-key-border-right.test.ts)
* **Класс эквивалентности**: `STORE-23 (Set Endpoint Key Border Right)`
* **Описание**: Проверяет переключение цели стрелки на правую границу листа.

#### Предусловия:
* - Стрелка выходит из правой грани блока.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey(a.id, 'target', 'border:right').
2. Проверить target.side.

#### Ожидаемый результат:
target.side === 'right', role === 'output'.

---

### ТЕСТ №227: Трассировка: Ступенчатый ввод с нижней границы к Механизму

* **Файл**: [`tests/unit/227-router10-route-stepped-vertical-entry-from-bottom.test.ts`](./unit/227-router10-route-stepped-vertical-entry-from-bottom.test.ts)
* **Класс эквивалентности**: `ROUTE-10 (Stepped Vertical Entry from Bottom)`
* **Описание**: Проверяет построение ортогонального ввода от нижней границы к нижней грани блока при смещении по горизонтали.

#### Предусловия:
* - Источник (border, bottom, x: 200), цель (block, bottom, x: 500).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить точки.

#### Ожидаемый результат:
Построен ступенчатый ортогональный маршрут к нижней грани блока.

---

### ТЕСТ №228: Трассировка: Ортогональная петля обратной связи вокруг препятствий

* **Файл**: [`tests/unit/228-router11-route-feedback-loop-under-blocks.test.ts`](./unit/228-router11-route-feedback-loop-under-blocks.test.ts)
* **Класс эквивалентности**: `ROUTE-11 (Route Feedback Loop Under Blocks)`
* **Описание**: Проверяет обходное ортогональное соединение Выхода правого блока со Входом левого блока вокруг промежуточного препятствия.

#### Предусловия:
* - Источник справа (800, 250), цель слева (200, 250), между ними блок-препятствие.

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute с передачей блоков-препятствий.
2. Проверить количество точек (>= 4) и их ортогональность.

#### Ожидаемый результат:
Сгенерирован обходной маршрут без коллизий.

---

### ТЕСТ №229: Привязка: Магнитный захват к левой границе холста (Вход)

* **Файл**: [`tests/unit/229-snap07-snap-to-left-border-points.test.ts`](./unit/229-snap07-snap-to-left-border-points.test.ts)
* **Класс эквивалентности**: `SNAP-07 (Snap to Left Border Points)`
* **Описание**: Проверяет срабатывание магнитного захвата при приближении курсора к левому краю листа.

#### Предусловия:
* - Курсор в точке (35, 300).

#### Выполняемые действия:
1. Вызвать findSnapTarget для 'start'.
2. Проверить snap.type и snap.side.

#### Ожидаемый результат:
snap.type === 'border', snap.side === 'left', role === 'input'.

---

### ТЕСТ №23: Мутация M5: Перемещение блока с синхронным ведением стрелок

* **Файл**: [`tests/unit/23-m05-translate-block-lockstep-arrows.test.ts`](./unit/23-m05-translate-block-lockstep-arrows.test.ts)
* **Класс эквивалентности**: `M5 (Block Dragging Lockstep Update)`
* **Описание**: Проверяет синхронное смещение всех подключенных стрелок и узлов ветвления при перетаскивании блока.

#### Предусловия:
* - Диаграмма содержит блок (300, 200) и подключенную входную стрелку.

#### Выполняемые действия:
1. Переместить блок на (+100px, +50px).
2. Проверить, что целевая точка стрелки сместилась синхронно с блоком.

#### Ожидаемый результат:
Блок перемещен на (400, 250), точка подключения стрелки сдвинулась на аналогичную дельту.

---

### ТЕСТ №230: Привязка: Магнитный захват к правой границе холста (Выход)

* **Файл**: [`tests/unit/230-snap08-snap-to-right-border-points.test.ts`](./unit/230-snap08-snap-to-right-border-points.test.ts)
* **Класс эквивалентности**: `SNAP-08 (Snap to Right Border Points)`
* **Описание**: Проверяет срабатывание магнитного захвата конца стрелки при приближении к правому краю листа.

#### Предусловия:
* - Курсор в точке (1565, 300).

#### Выполняемые действия:
1. Вызвать findSnapTarget для 'end'.
2. Проверить snap.side и role.

#### Ожидаемый результат:
snap.side === 'right', role === 'output'.

---

### ТЕСТ №231: Экспорт: Конвертация SVG в PNG Blob с мокированием HTML5 Canvas

* **Файл**: [`tests/unit/231-io12-export-svg-to-png-blob-with-dom-mock.test.ts`](./unit/231-io12-export-svg-to-png-blob-with-dom-mock.test.ts)
* **Класс эквивалентности**: `IO-12 (Export SVG to PNG Blob with DOM Mock)`
* **Описание**: Проверяет успешное преобразование SVG в растровый PNG Blob с эмуляцией Image и Canvas API.

#### Предусловия:
* - Мокирование глобальных объектов Image, document.createElement и URL.

#### Выполняемые действия:
1. Вызвать exportSvgToPngBlob.
2. Проверить полученный Blob.

#### Ожидаемый результат:
Возвращен Blob с типом 'image/png'.

---

### ТЕСТ №232: Экспорт: Архивирование нескольких диаграмм в ZIP (PNG)

* **Файл**: [`tests/unit/232-io13-export-diagrams-to-zip-png-format.test.ts`](./unit/232-io13-export-diagrams-to-zip-png-format.test.ts)
* **Класс эквивалентности**: `IO-13 (Export Diagrams to ZIP PNG)`
* **Описание**: Проверяет экспорт проекта в ZIP-архив с конвертацией страниц в формат PNG.

#### Предусловия:
* - Диаграмма с блоком и замоканный Canvas.

#### Выполняемые действия:
1. Вызвать exportDiagramsToZip(diagrams, 'png').
2. Проверить итоговый ZIP Blob.

#### Ожидаемый результат:
Создан валидный архив Blob.

---

### ТЕСТ №233: Импорт: Отклонение диаграммы с поврежденной внутренней структурой

* **Файл**: [`tests/unit/233-io14-import-reject-damaged-diagram-structure.test.ts`](./unit/233-io14-import-reject-damaged-diagram-structure.test.ts)
* **Класс эквивалентности**: `IO-14 (Import Reject Damaged Diagram Structure)`
* **Описание**: Проверяет отклонение файла, если у диаграммы отсутствует code или blocks не является массивом.

#### Предусловия:
* - JSON-строка с поврежденной диаграммой.

#### Выполняемые действия:
1. Вызвать importProjectFromJson.
2. Проверить res.success === false.

#### Ожидаемый результат:
Импорт отклонен с понятным сообщением об ошибке.

---

### ТЕСТ №234: Коллизии: Разрешение смежных сегментов одной и той же стрелки

* **Файл**: [`tests/unit/234-inter04-adjacent-segments-same-arrow-allowed.test.ts`](./unit/234-inter04-adjacent-segments-same-arrow-allowed.test.ts)
* **Класс эквивалентности**: `INTER-04 (Adjacent Segments Same Arrow Allowed)`
* **Описание**: Проверяет, что стык двух смежных сегментов в одной стрелке всегда считается допустимым.

#### Предусловия:
* - Два звена одной стрелки стыкуются в точке (200, 200).

#### Выполняемые действия:
1. Вызвать checkSegmentIntersection.
2. Проверить isAllowed.

#### Ожидаемый результат:
isAllowed === true, hasIntersection === false.

---

### ТЕСТ №235: Коллизии: Разрешение пересечения в точке зарегистрированного узла

* **Файл**: [`tests/unit/235-inter05-endpoints-meet-at-junction-allowed.test.ts`](./unit/235-inter05-endpoints-meet-at-junction-allowed.test.ts)
* **Класс эквивалентности**: `INTER-05 (Endpoints Meet at Junction Allowed)`
* **Описание**: Проверяет, что совпадение концов стрелок в точке узла ветвления/слияния считается легитимным.

#### Предусловия:
* - Две разные стрелки сходятся в точке узла (300, 150).

#### Выполняемые действия:
1. Вызвать checkSegmentIntersection с передачей junctions.
2. Проверить res.isAllowed.

#### Ожидаемый результат:
res.isAllowed === true, res.hasIntersection === true.

---

### ТЕСТ №236: Коллизии: Разрешение наложения параллельных звеньев в связке ствол-ветвь

* **Файл**: [`tests/unit/236-inter06-horizontal-segments-shared-branch-allowed.test.ts`](./unit/236-inter06-horizontal-segments-shared-branch-allowed.test.ts)
* **Класс эквивалентности**: `INTER-06 (Horizontal Shared Branch Allowed)`
* **Описание**: Проверяет отсутствие ложной ошибки коллизии при совпадении горизонтальных звеньев ствола и его дочерней ветви.

#### Предусловия:
* - Узел ветвления связывает ствол a1 и ветвь a2.

#### Выполняемые действия:
1. Вызвать checkSegmentIntersection.
2. Проверить res.isAllowed.

#### Ожидаемый результат:
res.isAllowed === true.

---

### ТЕСТ №237: Коллизии: Разрешение наложения вертикальных звеньев ствола и ветви

* **Файл**: [`tests/unit/237-inter07-vertical-segments-shared-branch-allowed.test.ts`](./unit/237-inter07-vertical-segments-shared-branch-allowed.test.ts)
* **Класс эквивалентности**: `INTER-07 (Vertical Shared Branch Allowed)`
* **Описание**: Проверяет отсутствие ложного срабатывания коллизии при совпадении вертикальных звеньев связанных стрелок.

#### Предусловия:
* - Узел ветвления связывает вертикальные звенья.

#### Выполняемые действия:
1. Вызвать checkSegmentIntersection.
2. Проверить res.isAllowed.

#### Ожидаемый результат:
res.isAllowed === true.

---

### ТЕСТ №238: Коллизии: Обнаружение запрещенного наложения несвязанных вертикалей

* **Файл**: [`tests/unit/238-inter08-vertical-collinear-overlap-error.test.ts`](./unit/238-inter08-vertical-collinear-overlap-error.test.ts)
* **Класс эквивалентности**: `INTER-08 (Vertical Collinear Overlap Error)`
* **Описание**: Проверяет фиксацию ошибки коллизии при частичном перекрытии двух независимых вертикальных линий.

#### Предусловия:
* - Две независимые стрелки имеют наложение по X=250.

#### Выполняемые действия:
1. Вызвать checkSegmentIntersection.
2. Проверить res.type и isAllowed.

#### Ожидаемый результат:
res.isAllowed === false, res.type === 'overlap'.

---

### ТЕСТ №239: Валидация: Запрет ввода с верхней границы в боковую грань блока

* **Файл**: [`tests/unit/239-val06-reject-top-border-to-non-top-side.test.ts`](./unit/239-val06-reject-top-border-to-non-top-side.test.ts)
* **Класс эквивалентности**: `VAL-06 (Reject Top Border to Non-Top Side)`
* **Описание**: Проверяет отклонение стрелки, идущей от верхней границы листа в левую грань блока.

#### Предусловия:
* - Источник: border top, цель: block left.

#### Выполняемые действия:
1. Вызвать validateArrowConnection.
2. Проверить результат.

#### Ожидаемый результат:
valid === false, причина указывает на недопустимость входа управления не в верхнюю грань.

---

### ТЕСТ №24: Мутация M6: Масштабирование блока с пропорциональным сдвигом портов

* **Файл**: [`tests/unit/24-m06-resize-block-scale-ports.test.ts`](./unit/24-m06-resize-block-scale-ports.test.ts)
* **Класс эквивалентности**: `M6 (Block Resizing & Port Scaling)`
* **Описание**: Проверяет пропорциональный пересчет позиций точек подключения стрелок вдоль грани при изменении ширины/высоты блока.

#### Предусловия:
* - Диаграмма содержит блок 200x100 и стрелку в центре грани.

#### Выполняемые действия:
1. Увеличить высоту блока со 100 до 200.
2. Проверить пропорциональный пересчет Y-координаты порта.

#### Ожидаемый результат:
Координата точки подключения стрелки пропорционально сместилась вдоль растянутой грани.

---

### ТЕСТ №240: Валидация: Запрет ввода с нижней границы в боковую грань

* **Файл**: [`tests/unit/240-val07-reject-bottom-border-to-non-bottom-side.test.ts`](./unit/240-val07-reject-bottom-border-to-non-bottom-side.test.ts)
* **Класс эквивалентности**: `VAL-07 (Reject Bottom Border to Non-Bottom Side)`
* **Описание**: Проверяет отклонение стрелки с нижней границы (Механизм), направленной не в нижнюю сторону блока (например, во Вход).

#### Предусловия:
* - Источник: border bottom, цель: block left.

#### Выполняемые действия:
1. Вызвать validateArrowConnection.
2. Проверить результат.

#### Ожидаемый результат:
valid === false, причина указывает на Механизм.

---

### ТЕСТ №241: Валидация: Запрет выхода на границу не из блока

* **Файл**: [`tests/unit/241-val08-reject-border-target-from-non-right-side.test.ts`](./unit/241-val08-reject-border-target-from-non-right-side.test.ts)
* **Класс эквивалентности**: `VAL-08 (Reject Border Target From Non-Right Side)`
* **Описание**: Проверяет отклонение вывода на границу холста, если источник не является правой гранью блока.

#### Предусловия:
* - Источник: unattached, цель: border top.

#### Выполняемые действия:
1. Вызвать validateArrowConnection.
2. Проверить результат.

#### Ожидаемый результат:
valid === false, требование выхода только из правой стороны блока.

---

### ТЕСТ №242: Валидация: Запрет ветвления на верхнюю границу холста

* **Файл**: [`tests/unit/242-val09-reject-branch-to-non-right-border.test.ts`](./unit/242-val09-reject-branch-to-non-right-border.test.ts)
* **Класс эквивалентности**: `VAL-09 (Reject Branch to Non-Right Border)`
* **Описание**: Проверяет отклонение ответвления от сегмента стрелки на верхнюю границу листа.

#### Предусловия:
* - Источник: junction, цель: border top.

#### Выполняемые действия:
1. Вызвать validateArrowConnection.
2. Проверить результат.

#### Ожидаемый результат:
valid === false, выход на границу разрешен только из блока.

---

### ТЕСТ №243: Валидация: Запрет слияния из верхней грани блока

* **Файл**: [`tests/unit/243-val10-reject-merge-from-non-right-block-side.test.ts`](./unit/243-val10-reject-merge-from-non-right-block-side.test.ts)
* **Класс эквивалентности**: `VAL-10 (Reject Merge From Non-Right Block Side)`
* **Описание**: Проверяет отклонение попытки слияния стрелки в существующий поток из грани Управления (top).

#### Предусловия:
* - Источник: block top, цель: junction.

#### Выполняемые действия:
1. Вызвать validateArrowConnection.
2. Проверить результат.

#### Ожидаемый результат:
valid === false, запрет выхода из грани Управления.

---

### ТЕСТ №244: Привязка: Захват курсора у верхней границы холста (Управление)

* **Файл**: [`tests/unit/244-snap09-snap-to-top-border.test.ts`](./unit/244-snap09-snap-to-top-border.test.ts)
* **Класс эквивалентности**: `SNAP-09 (Snap to Top Border Control)`
* **Описание**: Проверяет магнитный захват вблизи верхней границы листа при создании входящей стрелки.

#### Предусловия:
* - Курсор в точке (300, 45).

#### Выполняемые действия:
1. Вызвать findSnapTarget для 'start'.
2. Проверить side и role.

#### Ожидаемый результат:
snap.side === 'top', snap.role === 'control'.

---

### ТЕСТ №245: Привязка: Захват курсора у нижней границы холста (Механизм)

* **Файл**: [`tests/unit/245-snap10-snap-to-bottom-border.test.ts`](./unit/245-snap10-snap-to-bottom-border.test.ts)
* **Класс эквивалентности**: `SNAP-10 (Snap to Bottom Border Mechanism)`
* **Описание**: Проверяет магнитный захват вблизи нижней границы листа.

#### Предусловия:
* - Курсор в точке (400, 860).

#### Выполняемые действия:
1. Вызвать findSnapTarget для 'start'.
2. Проверить side и role.

#### Ожидаемый результат:
snap.side === 'bottom', snap.role === 'mechanism'.

---

### ТЕСТ №246: Привязка: Захват сегмента стрелки с учетом валидации драфт-источника

* **Файл**: [`tests/unit/246-snap11-snap-segment-with-draft-source.test.ts`](./unit/246-snap11-snap-segment-with-draft-source.test.ts)
* **Класс эквивалентности**: `SNAP-11 (Snap Segment With Draft Source)`
* **Описание**: Проверяет захват сегмента стрелки как цели слияния при наличии корректного драфт-источника (блок right).

#### Предусловия:
* - Драфт-источник: block right, курсор рядом со стрелкой.

#### Выполняемые действия:
1. Вызвать findSnapTarget.
2. Проверить результат.

#### Ожидаемый результат:
snap.type === 'arrow_segment'.

---

### ТЕСТ №247: Привязка: Захват сегмента стрелки как источника ответвления для драфт-цели

* **Файл**: [`tests/unit/247-snap12-snap-segment-with-draft-target.test.ts`](./unit/247-snap12-snap-segment-with-draft-target.test.ts)
* **Класс эквивалентности**: `SNAP-12 (Snap Segment With Draft Target)`
* **Описание**: Проверяет захват сегмента стрелки для создания ответвления в сторону драфт-цели (блок top).

#### Предусловия:
* - Драфт-цель: block top, курсор у сегмента.

#### Выполняемые действия:
1. Вызвать findSnapTarget.
2. Проверить результат.

#### Ожидаемый результат:
snap.type === 'arrow_segment'.

---

### ТЕСТ №248: Привязка: Конкуренция расстояний между границей и сегментом стрелки

* **Файл**: [`tests/unit/248-snap13-snap-competition-border-vs-segment.test.ts`](./unit/248-snap13-snap-competition-border-vs-segment.test.ts)
* **Класс эквивалентности**: `SNAP-13 (Snap Competition Border vs Segment)`
* **Описание**: Проверяет выбор более близкой цели захвата при одновременном нахождении рядом границы и стрелки.

#### Предусловия:
* - Курсор в точке (32, 200) ближе к левой границе (X=30), чем к началу сегмента.

#### Выполняемые действия:
1. Вызвать findSnapTarget.
2. Проверить результат.

#### Ожидаемый результат:
Выбрана более близкая граница (border).

---

### ТЕСТ №249: Синхронизация узлов: Поиск родительского ствола по геометрической близости

* **Файл**: [`tests/unit/249-junc10-junction-sync-locate-parent-by-proximity.test.ts`](./unit/249-junc10-junction-sync-locate-parent-by-proximity.test.ts)
* **Класс эквивалентности**: `JUNC-10 (Locate Parent by Proximity)`
* **Описание**: Проверяет восстановление связи узла с родительским стволом при отсутствии parentArrowId по попаданию в сегмент.

#### Предусловия:
* - Узел без parentArrowId лежит на линии ствола.

#### Выполняемые действия:
1. Вызвать synchronizeJunctions.
2. Проверить junc.parentArrowId.

#### Ожидаемый результат:
junc.parentArrowId автоматически восстановлен.

---

### ТЕСТ №25: Мутация M7: Позиционирование подписи и расчет выноски (Leader Line)

* **Файл**: [`tests/unit/25-m07-label-placement-and-leader-line.test.ts`](./unit/25-m07-label-placement-and-leader-line.test.ts)
* **Класс эквивалентности**: `M7 (Dynamic Label Placement & Leader Line)`
* **Описание**: Проверяет динамическое смещение текстовой подписи стрелки и расчет ломаной линии выноски (молнии) при удалении текста от сегмента.

#### Предусловия:
* - Стрелка имеет подпись и включенный флаг выноски leaderLine.

#### Выполняемые действия:
1. Сместить позицию подписи стрелки в сторону от линии на 80px.
2. Вычислить точки выносной линии.
3. Проверить, что начальная точка лежит на стрелке, а конечная — у подписи.

#### Ожидаемый результат:
Выносная линия построена, соединяет коридор стрелки с удаленной подписью.

---

### ТЕСТ №250: Синхронизация узлов: Адаптация 3-точечной горизонтальной ветви

* **Файл**: [`tests/unit/250-junc11-junction-sync-three-point-branch-horizontal.test.ts`](./unit/250-junc11-junction-sync-three-point-branch-horizontal.test.ts)
* **Класс эквивалентности**: `JUNC-11 (Sync 3-Point Horizontal Branch)`
* **Описание**: Проверяет пересчет точек 3-точечной ветви при смещении узла ветвления.

#### Предусловия:
* - 3-точечная ветвь отходит от узла.

#### Выполняемые действия:
1. Сместить узел и вызвать synchronizeJunctions.
2. Проверить child.points[0].

#### Ожидаемый результат:
Начало ветви child.points[0] совмещено с узлом.

---

### ТЕСТ №251: Синхронизация узлов: Полный пересчет 4-точечной стрелки слияния

* **Файл**: [`tests/unit/251-junc12-junction-sync-four-point-merge-arrow-rebuilt.test.ts`](./unit/251-junc12-junction-sync-four-point-merge-arrow-rebuilt.test.ts)
* **Класс эквивалентности**: `JUNC-12 (Sync 4-Point Merge Rebuilt)`
* **Описание**: Проверяет полную перетрассировку через buildOrthogonalRoute для стрелки слияния из 4 и более точек.

#### Предусловия:
* - Стрелка слияния из 4 точек входит в узел.

#### Выполняемые действия:
1. Сместить узел и вызвать synchronizeJunctions.
2. Проверить конечную точку стрелки.

#### Ожидаемый результат:
Конечная точка стрелки совпадает с новой позицией узла.

---

### ТЕСТ №252: Трассировка: Прямая 2-точечная линия с левой границы при соосности по Y

* **Файл**: [`tests/unit/252-router12-direct-two-point-entry-border-left.test.ts`](./unit/252-router12-direct-two-point-entry-border-left.test.ts)
* **Класс эквивалентности**: `ROUTE-12 (Direct 2-Point Entry Border Left)`
* **Описание**: Проверяет построение прямой 2-точечной линии со Входа листа в блок при разнице Y <= 10px.

#### Предусловия:
* - Источник (border, left, y: 200), цель (block, left, y: 205).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить points.length === 2.

#### Ожидаемый результат:
Возвращен 2-точечный прямой отрезок.

---

### ТЕСТ №253: Трассировка: Прямая 2-точечная вертикаль с верхней границы при соосности по X

* **Файл**: [`tests/unit/253-router13-direct-two-point-entry-border-top.test.ts`](./unit/253-router13-direct-two-point-entry-border-top.test.ts)
* **Класс эквивалентности**: `ROUTE-13 (Direct 2-Point Entry Border Top)`
* **Описание**: Проверяет построение прямого 2-точечного спуска от верхней границы листа к блоку при разнице X <= 10px.

#### Предусловия:
* - Источник (border, top, x: 400), цель (block, top, x: 405).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить points.length === 2.

#### Ожидаемый результат:
Возвращена вертикальная 2-точечная линия.

---

### ТЕСТ №254: Трассировка: Прямая 2-точечная вертикаль с нижней границы при соосности по X

* **Файл**: [`tests/unit/254-router14-direct-two-point-entry-border-bottom.test.ts`](./unit/254-router14-direct-two-point-entry-border-bottom.test.ts)
* **Класс эквивалентности**: `ROUTE-14 (Direct 2-Point Entry Border Bottom)`
* **Описание**: Проверяет построение прямого 2-точечного ввода Механизма снизу при разнице X <= 10px.

#### Предусловия:
* - Источник (border, bottom, x: 450), цель (block, bottom, x: 455).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить points.length === 2.

#### Ожидаемый результат:
Возвращена прямая 2-точечная линия снизу.

---

### ТЕСТ №255: Трассировка: Прямой 2-точечный вывод на правую границу при соосности по Y

* **Файл**: [`tests/unit/255-router15-direct-two-point-exit-block-right.test.ts`](./unit/255-router15-direct-two-point-exit-block-right.test.ts)
* **Класс эквивалентности**: `ROUTE-15 (Direct 2-Point Exit Block Right)`
* **Описание**: Проверяет построение прямой 2-точечной линии от Выхода блока на правую границу холста при Y <= 10px.

#### Предусловия:
* - Источник (block, right, y: 250), цель (border, right, y: 255).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить points.length === 2.

#### Ожидаемый результат:
Возвращен прямой горизонтальный 2-точечный отрезок.

---

### ТЕСТ №256: Трассировка: 5-точечный обход от Выхода к Управлению при близких блоках

* **Файл**: [`tests/unit/256-router16-five-point-detour-right-to-top.test.ts`](./unit/256-router16-five-point-detour-right-to-top.test.ts)
* **Класс эквивалентности**: `ROUTE-16 (Five-Point Detour Right to Top)`
* **Описание**: Проверяет построение 5-точечного обходного коридора, когда источник правее, но ниже цели.

#### Предусловия:
* - Источник (400, 200), цель (450, 205).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить points.length === 5.

#### Ожидаемый результат:
Построен 5-точечный обходной коридор над блоком.

---

### ТЕСТ №257: Трассировка: 5-точечный обход от Выхода к Механизму при близких блоках

* **Файл**: [`tests/unit/257-router17-five-point-detour-right-to-bottom.test.ts`](./unit/257-router17-five-point-detour-right-to-bottom.test.ts)
* **Класс эквивалентности**: `ROUTE-17 (Five-Point Detour Right to Bottom)`
* **Описание**: Проверяет построение 5-точечного обхода под блоками к Механизму.

#### Предусловия:
* - Источник (400, 300), цель (450, 295).

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить points.length === 5.

#### Ожидаемый результат:
Построен 5-точечный обходной коридор под блоком.

---

### ТЕСТ №258: Трассировка: Прямой 2-точечный спуск от узла ветвления к Управлению

* **Файл**: [`tests/unit/258-router18-direct-two-point-branch-to-top.test.ts`](./unit/258-router18-direct-two-point-branch-to-top.test.ts)
* **Класс эквивалентности**: `ROUTE-18 (Direct 2-Point Branch to Top)`
* **Описание**: Проверяет построение строго вертикального прямого спуска от узла ветвления к верхней грани блока.

#### Предусловия:
* - Узел ветвления соосен порту Управления по X.

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить points.length === 2.

#### Ожидаемый результат:
Возвращена 2-точечная вертикальная линия.

---

### ТЕСТ №259: Трассировка: 6-точечный обходной маршрут от узла ко Входу блока позади

* **Файл**: [`tests/unit/259-router19-six-point-detour-junction-to-block-left.test.ts`](./unit/259-router19-six-point-detour-junction-to-block-left.test.ts)
* **Класс эквивалентности**: `ROUTE-19 (Six-Point Detour Junction to Block Left)`
* **Описание**: Проверяет построение обходного коридора из 6 точек, когда узел ветвления расположен правее и выше целевого входа блока.

#### Предусловия:
* - Узел (600, 200), блок-вход (300, 350).

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить points.length === 6.

#### Ожидаемый результат:
Построена ортогональная петля обхода из 6 точек.

---

### ТЕСТ №26: Блоки: Автоматическая последовательная нумерация (1, 2, 3...)

* **Файл**: [`tests/unit/26-blk01-allocate-sequential-node-numbers.test.ts`](./unit/26-blk01-allocate-sequential-node-numbers.test.ts)
* **Класс эквивалентности**: `BLK-01 (Sequential Node Numbering)`
* **Описание**: Проверяет последовательное присвоение номеров узлов 1, 2, 3, 4 при добавлении блоков на диаграмму декомпозиции.

#### Предусловия:
* - Диаграмма A1 пуста.

#### Выполняемые действия:
1. Создать 4 блока подряд.
2. Проверить значения nodeNumber у каждого блока.

#### Ожидаемый результат:
Блоки получают порядковые номера 1, 2, 3, 4 без пропусков.

---

### ТЕСТ №260: Трассировка: Маршрутизация ветви в правую грань блока

* **Файл**: [`tests/unit/260-router20-branch-to-block-right-stepped.test.ts`](./unit/260-router20-branch-to-block-right-stepped.test.ts)
* **Класс эквивалентности**: `ROUTE-20 (Branch to Block Right Stepped)`
* **Описание**: Проверяет трассировку ответвления в правую грань блока (выход) при прямом и обратном расположении.

#### Предусловия:
* - Узел левее и правее целевой правой грани.

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute для обоих случаев.
2. Проверить ортогональность.

#### Ожидаемый результат:
Оба маршрута строго ортогональны.

---

### ТЕСТ №261: Адаптация: 4-точечные входящие стрелки с границ при перемещении блока

* **Файл**: [`tests/unit/261-move16-move-block-four-point-inflows-from-borders.test.ts`](./unit/261-move16-move-block-four-point-inflows-from-borders.test.ts)
* **Класс эквивалентности**: `MOVE-16 (Block Move 4-Point Inflows From Borders)`
* **Описание**: Проверяет адаптацию 4-точечных входящих стрелок с верхней и нижней границ холста при сдвиге целевого блока.

#### Предусловия:
* - 4-точечные стрелки сверху и снизу.

#### Выполняемые действия:
1. Сместить блок на (30, 20).
2. Вызвать adjustArrowOnBlockMove.

#### Ожидаемый результат:
pts[1] и pts[2] пересчитаны с сохранением ортогональности.

---

### ТЕСТ №262: Хранилище: Автоматическая смена стороны границы при перепривязке целевого порта

* **Файл**: [`tests/unit/262-store24-reconnect-target-adapts-source-border.test.ts`](./unit/262-store24-reconnect-target-adapts-source-border.test.ts)
* **Класс эквивалентности**: `STORE-24 (Reconnect Target Adapts Source Border)`
* **Описание**: Проверяет переключение источника граничной стрелки на 'top'/'control' при переподключении цели к верхней грани блока.

#### Предусловия:
* - Стрелка от левой границы холста.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с target на block top.
2. Проверить arrow.source.side и role.

#### Ожидаемый результат:
source.side === 'top', role === 'control'.

---

### ТЕСТ №263: Хранилище: Перепривязка конца стрелки к сегменту другого потока (Слияние)

* **Файл**: [`tests/unit/263-store25-reconnect-target-to-arrow-segment-merge.test.ts`](./unit/263-store25-reconnect-target-to-arrow-segment-merge.test.ts)
* **Класс эквивалентности**: `STORE-25 (Reconnect Target to Arrow Segment)`
* **Описание**: Проверяет создание узла слияния при перетаскивании конца стрелки на сегмент существующего потока.

#### Предусловия:
* - Магистральный поток и боковой поток.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с target.type === 'arrow_segment'.
2. Проверить junctions.

#### Ожидаемый результат:
Создан узел типа 'merge'.

---

### ТЕСТ №264: Хранилище: Обновление роли стрелки и переключение линии-выноски

* **Файл**: [`tests/unit/264-store26-update-arrow-role-and-toggle-leader.test.ts`](./unit/264-store26-update-arrow-role-and-toggle-leader.test.ts)
* **Класс эквивалентности**: `STORE-26 (Update Arrow Role and Toggle Leader)`
* **Описание**: Проверяет смену роли стрелки через updateArrow и переключение видимости выноски через toggleLeader.

#### Предусловия:
* - Стрелка в состоянии приложения.

#### Выполняемые действия:
1. Вызвать store.updateArrow(a.id, { role: 'control' }).
2. Вызвать store.toggleLeader(a.id).

#### Ожидаемый результат:
Роль обновлена, showLeader переключен в true, сгенерированы leaderPoints.

---

### ТЕСТ №265: Хранилище: Подписка на события, окраска блока и сброс трассы стрелки

* **Файл**: [`tests/unit/265-store27-editor-store-pub-sub-color-and-reset-route.test.ts`](./unit/265-store27-editor-store-pub-sub-color-and-reset-route.test.ts)
* **Класс эквивалентности**: `STORE-27 (EditorStore PubSub Color Reset Route)`
* **Описание**: Проверяет подписку на обновления состояния, изменение цвета блока и сброс маршрута стрелки к автоматическому.

#### Предусловия:
* - Экземпляр EditorStore.

#### Выполняемые действия:
1. Подписаться через store.subscribe.
2. Вызвать setBlockColor и resetArrowRoute.
3. Отписаться.

#### Ожидаемый результат:
Слушатель уведомлен дважды, цвет блока сохранен, трасса сброшена, после отписки вызовы прекращены.

---

### ТЕСТ №266: Экспорт: Ошибка при недоступности 2D контекста Canvas

* **Файл**: [`tests/unit/266-io15-export-png-reject-null-context.test.ts`](./unit/266-io15-export-png-reject-null-context.test.ts)
* **Класс эквивалентности**: `IO-15 (Export PNG Null Context Error)`
* **Описание**: Проверяет отклонение промиса с понятной ошибкой при сбое получения 2D-контекста Canvas.

#### Предусловия:
* - Мокирование Canvas с getContext returning null.

#### Выполняемые действия:
1. Вызвать exportSvgToPngBlob.
2. Ожидать отклонения с ошибкой.

#### Ожидаемый результат:
Промис отклонен с 'Canvas 2D context unavailable'.

---

### ТЕСТ №267: Экспорт: Ошибка при сбое генерации Blob из Canvas

* **Файл**: [`tests/unit/267-io16-export-png-reject-null-blob.test.ts`](./unit/267-io16-export-png-reject-null-blob.test.ts)
* **Класс эквивалентности**: `IO-16 (Export PNG Null Blob Error)`
* **Описание**: Проверяет отклонение промиса при возврате null из canvas.toBlob.

#### Предусловия:
* - Мокирование Canvas с toBlob((cb) => cb(null)).

#### Выполняемые действия:
1. Вызвать exportSvgToPngBlob.
2. Ожидать отклонения.

#### Ожидаемый результат:
Промис отклонен с 'Не удалось сгенерировать PNG файл'.

---

### ТЕСТ №268: Экспорт: Ошибка при сбое декодирования SVG в Image

* **Файл**: [`tests/unit/268-io17-export-png-reject-image-error.test.ts`](./unit/268-io17-export-png-reject-image-error.test.ts)
* **Класс эквивалентности**: `IO-17 (Export PNG Image Load Error)`
* **Описание**: Проверяет отклонение промиса при срабатывании события onerror у объекта Image.

#### Предусловия:
* - Image с вызовом onerror.

#### Выполняемые действия:
1. Вызвать exportSvgToPngBlob.
2. Ожидать отклонения.

#### Ожидаемый результат:
Промис отклонен с сообщением 'Ошибка загрузки SVG в растровый конвертер'.

---

### ТЕСТ №269: Экспорт: Перехват исключения при отрисовке в Canvas

* **Файл**: [`tests/unit/269-io18-export-png-catch-render-exception.test.ts`](./unit/269-io18-export-png-catch-render-exception.test.ts)
* **Класс эквивалентности**: `IO-18 (Export PNG Catch Render Exception)`
* **Описание**: Проверяет перехват непредвиденного исключения в блоке try-catch обработчика onload.

#### Предусловия:
* - Canvas с выбросом ошибки в drawImage.

#### Выполняемые действия:
1. Вызвать exportSvgToPngBlob.
2. Ожидать перехвата исключения.

#### Ожидаемый результат:
Исключение поймано и передано в reject.

---

### ТЕСТ №27: Блоки: Ограничение координат пределами холста (Boundary Clamping)

* **Файл**: [`tests/unit/27-blk02-clamp-block-to-canvas-boundaries.test.ts`](./unit/27-blk02-clamp-block-to-canvas-boundaries.test.ts)
* **Класс эквивалентности**: `BLK-02 (Canvas Boundary Clamping)`
* **Описание**: Проверяет удержание блока внутри допустимой рабочей области холста (не вылезая за границы).

#### Предусловия:
* - Диаграмма A1 содержит блок.

#### Выполняемые действия:
1. Попытаться переместить блок за пределы холста (например, x: -500, y: -500).
2. Проверить скорректированные координаты блока.

#### Ожидаемый результат:
Координаты блока ограничены минимальным допустимым отступом холста.

---

### ТЕСТ №270: Линтер: Ошибка при одновременной отвязке обоих концов стрелки (FR-LINT-06)

* **Файл**: [`tests/unit/270-lint23-both-endpoints-unattached-error.test.ts`](./unit/270-lint23-both-endpoints-unattached-error.test.ts)
* **Класс эквивалентности**: `LINT-23 (Both Endpoints Unattached Error)`
* **Описание**: Проверяет обнаружение стрелки, у которой и начало, и конец отвязаны.

#### Предусловия:
* - Стрелка с source.type === 'unattached' и target.type === 'unattached'.

#### Выполняемые действия:
1. Запустить unattachedArrowRule.
2. Проверить issues.

#### Ожидаемый результат:
Зафиксирована ошибка 'полностью отвязана'.

---

### ТЕСТ №271: Хранилище: Запрет открепления цели при уже открепленном источнике

* **Файл**: [`tests/unit/271-store28-reconnect-target-unattached-when-src-unattached.test.ts`](./unit/271-store28-reconnect-target-unattached-when-src-unattached.test.ts)
* **Класс эквивалентности**: `STORE-28 (Reject Both Unattached on Target)`
* **Описание**: Проверяет отклонение попытки переподключить цель в unattached, если начало стрелки уже не привязано.

#### Предусловия:
* - Стрелка с unattached источником.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint('target', { type: 'unattached' }).
2. Проверить возврат false.

#### Ожидаемый результат:
Возвращен false, операция отклонена.

---

### ТЕСТ №272: Хранилище: Запрет открепления источника при уже открепленной цели

* **Файл**: [`tests/unit/272-store29-reconnect-source-unattached-when-tgt-unattached.test.ts`](./unit/272-store29-reconnect-source-unattached-when-tgt-unattached.test.ts)
* **Класс эквивалентности**: `STORE-29 (Reject Both Unattached on Source)`
* **Описание**: Проверяет отклонение попытки переподключить источник в unattached при открепленной цели.

#### Предусловия:
* - Стрелка с unattached целью.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint('source', { type: 'unattached' }).
2. Проверить возврат false.

#### Ожидаемый результат:
Возвращен false, операция отклонена.

---

### ТЕСТ №273: Хранилище: Отклонение переподключения стрелки с нарушением правил IDEF0

* **Файл**: [`tests/unit/273-store30-reconnect-endpoint-invalid-connection-rejected.test.ts`](./unit/273-store30-reconnect-endpoint-invalid-connection-rejected.test.ts)
* **Класс эквивалентности**: `STORE-30 (Reconnect Invalid Rejected)`
* **Описание**: Проверяет отклонение попытки переподключить стрелку в недопустимую конфигурацию (например, выход во вход блока справа налево).

#### Предусловия:
* - Стрелка между блоками.

#### Выполняемые действия:
1. Попытаться переподключить цель в правую грань блока (Выход).
2. Проверить возврат false.

#### Ожидаемый результат:
Возвращен false, валидация отклонила операцию.

---

### ТЕСТ №274: Хранилище: Защита setArrowEndpointKey при несуществующем ID стрелки

* **Файл**: [`tests/unit/274-store31-set-endpoint-key-unknown-arrow-id.test.ts`](./unit/274-store31-set-endpoint-key-unknown-arrow-id.test.ts)
* **Класс эквивалентности**: `STORE-31 (Endpoint Key Unknown Arrow ID)`
* **Описание**: Проверяет возврат false при вызове setArrowEndpointKey для несуществующего идентификатора стрелки.

#### Предусловия:
* - Пустая диаграмма.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey('non-existent', 'source', 'border:left').
2. Проверить результат.

#### Ожидаемый результат:
Возвращен false, состояние не повреждено.

---

### ТЕСТ №275: Хранилище: Запрет setArrowEndpointKey('unattached') при уже открепленном конце

* **Файл**: [`tests/unit/275-store32-set-endpoint-key-unattached-both-rejected.test.ts`](./unit/275-store32-set-endpoint-key-unattached-both-rejected.test.ts)
* **Класс эквивалентности**: `STORE-32 (Endpoint Key Both Unattached Rejected)`
* **Описание**: Проверяет отклонение вызова setArrowEndpointKey в режим 'unattached', если противоположный конец уже откреплен.

#### Предусловия:
* - Стрелка с unattached источником.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey(a.id, 'target', 'unattached').
2. Проверить результат.

#### Ожидаемый результат:
Возвращен false.

---

### ТЕСТ №276: Хранилище: Отклонение неизвестного префикса в ключе эндпоинта

* **Файл**: [`tests/unit/276-store33-set-endpoint-key-invalid-border-side.test.ts`](./unit/276-store33-set-endpoint-key-invalid-border-side.test.ts)
* **Класс эквивалентности**: `STORE-33 (Endpoint Key Invalid Prefix)`
* **Описание**: Проверяет возврат false при передаче неизвестного типа сущности в ключе эндпоинта.

#### Предусловия:
* - Стрелка в состоянии.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey с невалидным префиксом 'unknown_type:val'.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен false.

---

### ТЕСТ №277: Хранилище: Отклонение ключа эндпоинта с отсутствующим блоком

* **Файл**: [`tests/unit/277-store34-set-endpoint-key-missing-block-id.test.ts`](./unit/277-store34-set-endpoint-key-missing-block-id.test.ts)
* **Класс эквивалентности**: `STORE-34 (Endpoint Key Missing Block ID)`
* **Описание**: Проверяет возврат false при попытке привязать стрелку к несуществующему блоку 'block:phantom:left'.

#### Предусловия:
* - Стрелка на диаграмме.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey с 'block:phantom:left'.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен false.

---

### ТЕСТ №278: Хранилище: Отклонение недопустимого режима узла в ключе эндпоинта

* **Файл**: [`tests/unit/278-store35-set-endpoint-key-invalid-junction-mode.test.ts`](./unit/278-store35-set-endpoint-key-invalid-junction-mode.test.ts)
* **Класс эквивалентности**: `STORE-35 (Endpoint Key Invalid Junction Mode)`
* **Описание**: Проверяет отклонение некорректного типа узла 'junction:unknown_mode:targetId'.

#### Предусловия:
* - Стрелка на диаграмме.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey с 'junction:twist:trunk'.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен false.

---

### ТЕСТ №279: Линтер: Выход источника стрелки за вертикальные границы блока (FR-LINT-03)

* **Файл**: [`tests/unit/279-lint24-arrow-source-outside-vertical-bounds.test.ts`](./unit/279-lint24-arrow-source-outside-vertical-bounds.test.ts)
* **Класс эквивалентности**: `LINT-24 (Source Outside Vertical Bounds)`
* **Описание**: Проверяет фиксацию ошибки линтера, если контактный порт стрелки на левой/правой грани блока выходит за границы по Y.

#### Предусловия:
* - Блок Y в диапазоне [200, 300], стрелка начинается в Y=350.

#### Выполняемые действия:
1. Запустить geometryOrthoRule.
2. Проверить issues.

#### Ожидаемый результат:
Обнаружена ошибка 'начинается вне границ блока'.

---

### ТЕСТ №28: Блоки: Удаление функционального блока и отмена через Undo

* **Файл**: [`tests/unit/28-blk03-block-deletion-and-history-undo.test.ts`](./unit/28-blk03-block-deletion-and-history-undo.test.ts)
* **Класс эквивалентности**: `BLK-03 (Block Deletion and Undo)`
* **Описание**: Проверяет удаление блока вместе со всеми привязанными к нему стрелками и полное восстановление через стек истории Undo.

#### Предусловия:
* - Диаграмма A1 содержит блок и подключенную стрелку.

#### Выполняемые действия:
1. Удалить блок вызовом deleteBlock.
2. Проверить удаление блока и каскадное удаление стрелки.
3. Вызвать undo и проверить восстановление блока и стрелки.

#### Ожидаемый результат:
Блок и стрелка удаляются, а после undo возвращаются в исходное состояние.

---

### ТЕСТ №280: Линтер: Вход стрелки в верхнюю грань вне ширины блока (FR-LINT-03)

* **Файл**: [`tests/unit/280-lint25-arrow-target-outside-horizontal-bounds.test.ts`](./unit/280-lint25-arrow-target-outside-horizontal-bounds.test.ts)
* **Класс эквивалентности**: `LINT-25 (Target Outside Horizontal Bounds)`
* **Описание**: Проверяет фиксацию ошибки линтера, если стрелка Управления входит правее блока.

#### Предусловия:
* - Блок X в диапазоне [200, 400], стрелка входит в X=450.

#### Выполняемые действия:
1. Запустить geometryOrthoRule.
2. Проверить issues.

#### Ожидаемый результат:
Обнаружена ошибка 'оканчивается в воздухе вне границ блока'.

---

### ТЕСТ №281: Линтер: Выход линии стрелки за пределы листа A4 (FR-LINT-03)

* **Файл**: [`tests/unit/281-lint26-arrow-segment-outside-canvas-bounds.test.ts`](./unit/281-lint26-arrow-segment-outside-canvas-bounds.test.ts)
* **Класс эквивалентности**: `LINT-26 (Arrow Outside Canvas Bounds)`
* **Описание**: Проверяет обнаружение вылета звена стрелки за границы листа холста.

#### Предусловия:
* - Стрелка с точкой X=5 (меньше минимального поля 15px).

#### Выполняемые действия:
1. Запустить geometryOrthoRule.
2. Проверить issues.

#### Ожидаемый результат:
Обнаружена ошибка 'выходит за пределы листа холста A4'.

---

### ТЕСТ №282: Хранилище: Возврат null при попытке создания недопустимой стрелки

* **Файл**: [`tests/unit/282-store36-create-arrow-invalid-connection-null.test.ts`](./unit/282-store36-create-arrow-invalid-connection-null.test.ts)
* **Класс эквивалентности**: `STORE-36 (Create Arrow Invalid Connection Null)`
* **Описание**: Проверяет, что store.createArrow возвращает null при попытке создать стрелку из границы листа в границу листа напрямую.

#### Предусловия:
* - Попытка создания стрелки border -> border.

#### Выполняемые действия:
1. Вызвать store.createArrow.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен null, стрелка не добавлена.

---

### ТЕСТ №283: Хранилище: Безопасность deleteArrow при несуществующем ID

* **Файл**: [`tests/unit/283-store37-delete-arrow-safe-on-ghost-id.test.ts`](./unit/283-store37-delete-arrow-safe-on-ghost-id.test.ts)
* **Класс эквивалентности**: `STORE-37 (Delete Arrow Safe Ghost ID)`
* **Описание**: Проверяет безаварийное выполнение deleteArrow при передаче фантомного идентификатора стрелки.

#### Предусловия:
* - Диаграмма со стрелкой.

#### Выполняемые действия:
1. Вызвать deleteArrow('ghost-arrow').
2. Проверить массив стрелок.

#### Ожидаемый результат:
Количество стрелок не изменилось, ошибок не возникло.

---

### ТЕСТ №284: Хранилище: Возврат false в setArrowRole при несуществующем ID стрелки

* **Файл**: [`tests/unit/284-store38-set-arrow-role-returns-false-on-ghost-id.test.ts`](./unit/284-store38-set-arrow-role-returns-false-on-ghost-id.test.ts)
* **Класс эквивалентности**: `STORE-38 (Set Arrow Role Ghost ID)`
* **Описание**: Проверяет возврат false при попытке изменить роль у несуществующей стрелки.

#### Предусловия:
* - Пустое хранилище.

#### Выполняемые действия:
1. Вызвать setArrowRole('ghost', 'control').
2. Проверить результат.

#### Ожидаемый результат:
Возвращен false.

---

### ТЕСТ №285: Хранилище: Адаптация портов и геометрии при смене роли стрелки

* **Файл**: [`tests/unit/285-store39-set-arrow-role-rejects-geometry-mismatch.test.ts`](./unit/285-store39-set-arrow-role-rejects-geometry-mismatch.test.ts)
* **Класс эквивалентности**: `STORE-39 (Set Arrow Role Port Adaptation)`
* **Описание**: Проверяет пересчет контактных портов и маршрута при изменении роли стрелки с Входа на Управление.

#### Предусловия:
* - Стрелка входит в левую грань блока (роль 'input').

#### Выполняемые действия:
1. Вызвать setArrowRole(a.id, 'control').
2. Проверить результат и адаптацию целевого порта на 'top'.

#### Ожидаемый результат:
Возвращен true, целевой порт перемещен на верхнюю грань блока.

---

### ТЕСТ №286: Хранилище: Безопасность recomputeArrowRoute при отсутствии точек

* **Файл**: [`tests/unit/286-store40-recompute-arrow-route-safe-on-empty-points.test.ts`](./unit/286-store40-recompute-arrow-route-safe-on-empty-points.test.ts)
* **Класс эквивалентности**: `STORE-40 (Recompute Route Safe Empty Points)`
* **Описание**: Проверяет, что пересчет маршрута не вызывает падения, если массив points пуст.

#### Предусловия:
* - Стрелка с points: [].

#### Выполняемые действия:
1. Вызвать store.recomputeArrowRoute(arrow).
2. Проверить результат.

#### Ожидаемый результат:
Вызов выполнен без исключений.

---

### ТЕСТ №287: Хранилище: Безопасность setArrowPinned при несуществующем ID стрелки

* **Файл**: [`tests/unit/287-store41-set-arrow-pinned-safe-on-ghost-id.test.ts`](./unit/287-store41-set-arrow-pinned-safe-on-ghost-id.test.ts)
* **Класс эквивалентности**: `STORE-41 (Set Arrow Pinned Ghost ID)`
* **Описание**: Проверяет безопасную обработку вызова фиксации стрелки с фантомным ID.

#### Предусловия:
* - Пустое хранилище.

#### Выполняемые действия:
1. Вызвать setArrowPinned('ghost', true).
2. Проверить отсутствие ошибок.

#### Ожидаемый результат:
Ошибок нет, приложение стабильно.

---

### ТЕСТ №288: Хранилище: Сброс выделения при удалении активного блока

* **Файл**: [`tests/unit/288-store42-delete-block-deselects-selected-block.test.ts`](./unit/288-store42-delete-block-deselects-selected-block.test.ts)
* **Класс эквивалентности**: `STORE-42 (Delete Block Deselects Selected Block)`
* **Описание**: Проверяет автоматический сброс selectedObjectId и selectedObjectType в null при удалении выделенного блока.

#### Предусловия:
* - Блок создан и выбран.

#### Выполняемые действия:
1. Вызвать store.deleteBlock(b.id).
2. Проверить selectedObjectId.

#### Ожидаемый результат:
selectedObjectId === null, selectedObjectType === null.

---

### ТЕСТ №289: Хранилище: Восстановление родителя при перемещении узла

* **Файл**: [`tests/unit/289-store43-move-junction-locates-parent-by-proximity.test.ts`](./unit/289-store43-move-junction-locates-parent-by-proximity.test.ts)
* **Класс эквивалентности**: `STORE-43 (Move Junction Locates Parent Proximity)`
* **Описание**: Проверяет автоматическое определение родительского ствола по близости к сегменту при вызове moveJunction без parentArrowId.

#### Предусловия:
* - Узел без parentArrowId лежит рядом со стволом.

#### Выполняемые действия:
1. Вызвать moveJunction.
2. Проверить parentArrowId.

#### Ожидаемый результат:
parentArrowId восстановлен.

---

### ТЕСТ №29: Блоки: Декомпозиция блока в дочернюю диаграмму

* **Файл**: [`tests/unit/29-blk04-block-decomposition-to-child-diagram.test.ts`](./unit/29-blk04-block-decomposition-to-child-diagram.test.ts)
* **Класс эквивалентности**: `BLK-04 (Hierarchical Decomposition)`
* **Описание**: Проверяет создание дочерней диаграммы декомпозиции с генерацией правильного кода диаграммы.

#### Предусловия:
* - Инициализирован проект с контекстной диаграммой A0 и блоком A0.

#### Выполняемые действия:
1. Вызвать decomposeBlock для корневого блока A0.
2. Проверить появление дочерней диаграммы с кодом A1.
3. Проверить привязку parentBlockId.

#### Ожидаемый результат:
Создана дочерняя диаграмма с кодом A1, привязанная к родительскому блоку.

---

### ТЕСТ №290: Хранилище: Ограничение смещения узла защитным отступом 15px от концов стрелки

* **Файл**: [`tests/unit/290-store44-move-junction-clamps-margin-from-endpoints.test.ts`](./unit/290-store44-move-junction-clamps-margin-from-endpoints.test.ts)
* **Класс эквивалентности**: `STORE-44 (Move Junction Clamps Margin 15px)`
* **Описание**: Проверяет принудительное удержание узла на расстоянии не ближе 15px к началу и концу сегмента.

#### Предусловия:
* - Ствол от (100, 200) до (500, 200).

#### Выполняемые действия:
1. Переместить узел в точку (105, 200).
2. Проверить junc.point.x >= 115.

#### Ожидаемый результат:
Координата ограничена отступом 15px от начала.

---

### ТЕСТ №291: Хранилище: Обновление входящих стрелок слияния при сдвиге узла

* **Файл**: [`tests/unit/291-store45-delete-junction-removes-junction-and-branches.test.ts`](./unit/291-store45-delete-junction-removes-junction-and-branches.test.ts)
* **Класс эквивалентности**: `STORE-45 (Update Merge Arrows On Junction Move)`
* **Описание**: Проверяет синхронизацию входящих 3-точечных и 4-точечных стрелок слияния при перемещении целевого узла.

#### Предусловия:
* - Ствол и узел слияния, к которому сходится стрелка слияния из блока.

#### Выполняемые действия:
1. Переместить узел через moveJunction.
2. Проверить пересчет промежуточных точек входящих стрелок.

#### Ожидаемый результат:
Точки входящих стрелок согласованы с новым положением узла.

---

### ТЕСТ №292: Инициализация: Восстановление проекта из localStorage

* **Файл**: [`tests/unit/292-proj10-restore-project-from-local-storage.test.ts`](./unit/292-proj10-restore-project-from-local-storage.test.ts)
* **Класс эквивалентности**: `PROJ-10 (Restore Project From LocalStorage)`
* **Описание**: Проверяет загрузку сохраненного проекта при старте приложения через createInitialProject.

#### Предусловия:
* - В localStorage сохранен валидный проект.

#### Выполняемые действия:
1. Вызвать createInitialProject.
2. Проверить загруженный проект.

#### Ожидаемый результат:
Проект загружен из хранилища браузера.

---

### ТЕСТ №293: Инициализация: Безопасный откат к чистому проекту при поврежденном localStorage

* **Файл**: [`tests/unit/293-proj11-corrupt-local-storage-fallback-clean-project.test.ts`](./unit/293-proj11-corrupt-local-storage-fallback-clean-project.test.ts)
* **Класс эквивалентности**: `PROJ-11 (Corrupt LocalStorage Fallback Clean Project)`
* **Описание**: Проверяет защиту от падения приложения и откат к эталонной чистой модели при обнаружении битого JSON в localStorage.

#### Предусловия:
* - В localStorage записана битая строка 'corrupt{json'.

#### Выполняемые действия:
1. Вызвать createInitialProject.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен чистый новый проект с контекстной диаграммой A0.

---

### ТЕСТ №294: Хранилище: Импорт проекта из готового JS-объекта Project

* **Файл**: [`tests/unit/294-store46-import-direct-project-object.test.ts`](./unit/294-store46-import-direct-project-object.test.ts)
* **Класс эквивалентности**: `STORE-46 (Import Direct Project Object)`
* **Описание**: Проверяет вызов store.importProject с прямой передачей типизированного объекта Project.

#### Предусловия:
* - Объект Project.

#### Выполняемые действия:
1. Вызвать store.importProject(projectObject).
2. Проверить активный проект.

#### Ожидаемый результат:
Проект успешно загружен в состояние приложения.

---

### ТЕСТ №295: Хранилище: Отклонение импорта проекта без единой диаграммы

* **Файл**: [`tests/unit/295-store47-import-project-empty-diagrams-rejected.test.ts`](./unit/295-store47-import-project-empty-diagrams-rejected.test.ts)
* **Класс эквивалентности**: `STORE-47 (Import Empty Diagrams Rejected)`
* **Описание**: Проверяет отклонение проекта с пустым списком диаграмм diagrams: [].

#### Предусловия:
* - Проект с diagrams: [].

#### Выполняемые действия:
1. Вызвать store.importProject.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен false, импорт отклонен.

---

### ТЕСТ №296: Хранилище: Повторная декомпозиция переключает на существующую дочернюю схему

* **Файл**: [`tests/unit/296-store48-decompose-already-decomposed-block-switches.test.ts`](./unit/296-store48-decompose-already-decomposed-block-switches.test.ts)
* **Класс эквивалентности**: `STORE-48 (Decompose Already Decomposed Block)`
* **Описание**: Проверяет, что повторный вызов decomposeBlock для уже декомпозированного блока не дублирует схемы, а переключает активную диаграмму.

#### Предусловия:
* - Корневой блок диаграммы A0.

#### Выполняемые действия:
1. Вызвать store.decomposeBlock(rootBlock.id).
2. Вернуться на A0 через switchDiagram('diag-a0').
3. Вызвать store.decomposeBlock(rootBlock.id) повторно.
4. Сравнить возвращенные идентификаторы.

#### Ожидаемый результат:
Возвращен один и тот же ID, произошел возврат на дочернюю диаграмму.

---

### ТЕСТ №297: Хранилище: Наследование входящих стрелок Управления и Механизма при декомпозиции

* **Файл**: [`tests/unit/297-store49-decompose-parent-control-and-mechanism-inflows.test.ts`](./unit/297-store49-decompose-parent-control-and-mechanism-inflows.test.ts)
* **Класс эквивалентности**: `STORE-49 (Decompose Parent Control Mechanism Inflows)`
* **Описание**: Проверяет автоматическое создание граничных стрелок Управления (сверху) и Механизма (снизу) на дочерней схеме.

#### Предусловия:
* - Родительский блок имеет входящие стрелки control и mechanism.

#### Выполняемые действия:
1. Вызвать decomposeBlock.
2. Проверить созданные граничные стрелки на дочерней схеме.

#### Ожидаемый результат:
Созданы граничные стрелки с side: 'top' и side: 'bottom'.

---

### ТЕСТ №298: Хранилище: Ограничение глубины истории изменений 50 снимками

* **Файл**: [`tests/unit/298-store50-history-stack-capped-at-50.test.ts`](./unit/298-store50-history-stack-capped-at-50.test.ts)
* **Класс эквивалентности**: `STORE-50 (History Stack Capped at 50)`
* **Описание**: Проверяет ограничение размера стека истории 50 элементами при выполнении более 50 последовательных операций.

#### Предусловия:
* - Хранилище EditorStore.

#### Выполняемые действия:
1. Выполнить 55 вызовов pushHistory.
2. Проверить store.state.history.length.

#### Ожидаемый результат:
Длина истории равна ровно 50 (более ранние снимки вытеснены).

---

### ТЕСТ №299: Хранилище: Безопасное восстановление activeDiagramId при откате

* **Файл**: [`tests/unit/299-store51-history-undo-restores-valid-active-diagram.test.ts`](./unit/299-store51-history-undo-restores-valid-active-diagram.test.ts)
* **Класс эквивалентности**: `STORE-51 (History Undo Restores Active Diagram)`
* **Описание**: Проверяет восстановление корректного activeDiagramId на diagrams[0].id, если сохраненная в истории активная схема была удалена.

#### Предусловия:
* - Удаление схемы с последующим undo.

#### Выполняемые действия:
1. Изменить activeDiagramId на несуществующий.
2. Выполнить store.undo().

#### Ожидаемый результат:
activeDiagramId сброшен на доступную валидную диаграмму.

---

### ТЕСТ №30: Блоки: Пропорциональный сдвиг портов при изменении ширины и высоты

* **Файл**: [`tests/unit/30-blk05-proportional-port-scaling-on-resize.test.ts`](./unit/30-blk05-proportional-port-scaling-on-resize.test.ts)
* **Класс эквивалентности**: `BLK-05 (Port Scaling Math)`
* **Описание**: Проверяет корректность масштабирования координат точек подключения стрелок при одновременном изменении ширины и высоты блока.

#### Предусловия:
* - Блок 200x120 со стрелкой на высоте 50% грани.

#### Выполняемые действия:
1. Изменить размер блока до 300x240.
2. Проверить пропорциональный сдвиг стрелки на новую середину грани.

#### Ожидаемый результат:
Стрелка остается строго в геометрическом центре увеличенной грани.

---

### ТЕСТ №300: Линтер: Реестр правил — получение списков, выбор по ID и отмена регистрации

* **Файл**: [`tests/unit/300-lint27-linter-registry-query-and-unregister.test.ts`](./unit/300-lint27-linter-registry-query-and-unregister.test.ts)
* **Класс эквивалентности**: `LINT-27 (Linter Registry Query and Unregister)`
* **Описание**: Проверяет методы getRules, getRule и unregister у синглтона linterRegistry.

#### Предусловия:
* - Стандартный реестр правил linterRegistry.

#### Выполняемые действия:
1. Вызвать getRules() и getRule('FR-LINT-01').
2. Зарегистрировать и затем удалить временное правило через unregister.

#### Ожидаемый результат:
Методы возвращают ожидаемые объекты, unregister возвращает true.

---

### ТЕСТ №301: Хранилище: Методы getState, toggleGrid, commitBlockMove и commitBlockResize

* **Файл**: [`tests/unit/301-store52-editor-store-state-grid-and-commits.test.ts`](./unit/301-store52-editor-store-state-grid-and-commits.test.ts)
* **Класс эквивалентности**: `STORE-52 (EditorStore State Grid and Commits)`
* **Описание**: Проверяет получение состояния через getState, переключение сетки toggleGrid и сохранение истории при фиксации перемещения и изменения размера блока.

#### Предусловия:
* - Экземпляр EditorStore.

#### Выполняемые действия:
1. Вызвать getState() и toggleGrid().
2. Вызвать commitBlockMove и commitBlockResize.

#### Ожидаемый результат:
Сетка переключена, история сохранена.

---

### ТЕСТ №302: Хранилище: Режимы трассировки стрелок (setArrowPathMode и _legacySetArrowPathMode)

* **Файл**: [`tests/unit/302-store53-set-arrow-path-mode-and-legacy.test.ts`](./unit/302-store53-set-arrow-path-mode-and-legacy.test.ts)
* **Класс эквивалентности**: `STORE-53 (Set Arrow Path Mode and Legacy)`
* **Описание**: Проверяет фиксацию стрелки через setArrowPathMode и возврат в автоматический режим через _legacySetArrowPathMode.

#### Предусловия:
* - Стрелка на диаграмме.

#### Выполняемые действия:
1. Вызвать store.setArrowPathMode(a.id, 'pinned').
2. Вызвать store._legacySetArrowPathMode(a.id, 'auto').

#### Ожидаемый результат:
Стрелка успешно переключает режимы фиксации трассы.

---

### ТЕСТ №303: Хранилище: Спрямление стрелки из горизонтальной грани в вертикальную (right -> top)

* **Файл**: [`tests/unit/303-store54-straighten-arrow-horiz-to-vert.test.ts`](./unit/303-store54-straighten-arrow-horiz-to-vert.test.ts)
* **Класс эквивалентности**: `STORE-54 (Straighten Arrow Horiz to Vert)`
* **Описание**: Проверяет спрямление стрелки между правой гранью блока и верхней гранью следующего блока в 3 ортогональные точки.

#### Предусловия:
* - Стрелка из block1 right в block2 top.

#### Выполняемые действия:
1. Вызвать store.straightenArrow(a.id).
2. Проверить points.length === 3.

#### Ожидаемый результат:
Маршрут спрямлен в L-образную ортогональную ломаную из 3 точек.

---

### ТЕСТ №304: Хранилище: Спрямление стрелки ветвления из узла во вход блока

* **Файл**: [`tests/unit/304-store55-straighten-arrow-vert-to-horiz.test.ts`](./unit/304-store55-straighten-arrow-vert-to-horiz.test.ts)
* **Класс эквивалентности**: `STORE-55 (Straighten Arrow Vert to Horiz)`
* **Описание**: Проверяет спрямление стрелки от узла ветвления ко входу блока в 3 ортогональные точки.

#### Предусловия:
* - Стрелка от узла ветвления ко входу блока.

#### Выполняемые действия:
1. Вызвать store.straightenArrow(branch.id).
2. Проверить points.length.

#### Ожидаемый результат:
Построена 3-точечная ортогональная трасса.

---

### ТЕСТ №305: Хранилище: Спрямление стрелки при соосных горизонтальных портах

* **Файл**: [`tests/unit/305-store56-straighten-arrow-both-horizontal.test.ts`](./unit/305-store56-straighten-arrow-both-horizontal.test.ts)
* **Класс эквивалентности**: `STORE-56 (Straighten Arrow Both Horizontal)`
* **Описание**: Проверяет спрямление стрелки между правой гранью и левой гранью блоков в строго горизонтальный отрезок.

#### Предусловия:
* - Стрелка из block1 right в block2 left.

#### Выполняемые действия:
1. Вызвать store.straightenArrow(a.id).
2. Проверить соосность Y точек.

#### Ожидаемый результат:
Стрелка выровнена в прямую горизонтальную линию.

---

### ТЕСТ №306: Хранилище: Спрямление стрелки при вертикальной связи

* **Файл**: [`tests/unit/306-store57-straighten-arrow-both-vertical.test.ts`](./unit/306-store57-straighten-arrow-both-vertical.test.ts)
* **Класс эквивалентности**: `STORE-57 (Straighten Arrow Both Vertical)`
* **Описание**: Проверяет спрямление стрелки между верхней границей и верхней гранью блока по вертикали.

#### Предусловия:
* - Стрелка из border top в block top.

#### Выполняемые действия:
1. Вызвать store.straightenArrow(a.id).
2. Проверить соосность X точек.

#### Ожидаемый результат:
Стрелка выровнена в строго вертикальную линию.

---

### ТЕСТ №307: Хранилище: Каскадное окрашивание семейства потоков (setFlowFamilyColor)

* **Файл**: [`tests/unit/307-store58-set-flow-family-color-propagation.test.ts`](./unit/307-store58-set-flow-family-color-propagation.test.ts)
* **Класс эквивалентности**: `STORE-58 (Set Flow Family Color Propagation)`
* **Описание**: Проверяет распространение выбранного цвета на весь ствол и все дочерние ответвления через узел.

#### Предусловия:
* - Ствол и ответвление через узел.

#### Выполняемые действия:
1. Вызвать store.setFlowFamilyColor(trunk.id, '#10b981').
2. Проверить цвет ствола и дочерней ветви.

#### Ожидаемый результат:
И ствол, и ветвь окрашены в '#10b981'.

---

### ТЕСТ №308: Хранилище: Автоматическое создание узла ветвления при клике в сегмент стрелки

* **Файл**: [`tests/unit/308-store59-create-arrow-segment-source-creates-branch-junction.test.ts`](./unit/308-store59-create-arrow-segment-source-creates-branch-junction.test.ts)
* **Класс эквивалентности**: `STORE-59 (Create Arrow Segment Source Creates Junction)`
* **Описание**: Проверяет создание узла типа 'branch' в массиве junctions при указании source.type === 'arrow_segment'.

#### Предусловия:
* - Ствол стрелки.

#### Выполняемые действия:
1. Создать новую стрелку с source.type: 'arrow_segment'.
2. Проверить появление узла ветвления.

#### Ожидаемый результат:
Создан узел ветвления, стрелка подключена к узлу.

---

### ТЕСТ №309: Хранилище: Автоматическое создание узла слияния при клике в сегмент стрелки

* **Файл**: [`tests/unit/309-store60-create-arrow-segment-target-creates-merge-junction.test.ts`](./unit/309-store60-create-arrow-segment-target-creates-merge-junction.test.ts)
* **Класс эквивалентности**: `STORE-60 (Create Arrow Segment Target Creates Junction)`
* **Описание**: Проверяет создание узла типа 'merge' при создании стрелки с target.type === 'arrow_segment'.

#### Предусловия:
* - Ствол стрелки.

#### Выполняемые действия:
1. Создать стрелку с target.type: 'arrow_segment'.
2. Проверить появление узла слияния.

#### Ожидаемый результат:
Создан узел слияния, стрелка зарегистрирована как входящая.

---

### ТЕСТ №31: Сегменты: Ограничение сдвига сегмента габаритами подключенного блока

* **Файл**: [`tests/unit/31-seg01-clamp-shifted-segment-to-block-boundary.test.ts`](./unit/31-seg01-clamp-shifted-segment-to-block-boundary.test.ts)
* **Класс эквивалентности**: `SEG-01 (Segment Clamping)`
* **Описание**: Проверяет ограничение коридора сегмента стрелки с отступом 15px от угла блока, исключая вылет стрелки за пределы грани.

#### Предусловия:
* - Блок высотой 130px с подключенной стрелкой.

#### Выполняемые действия:
1. Попытаться сдвинуть конечный сегмент стрелки выше верхнего края блока.
2. Проверить ограничение координаты сдвига.

#### Ожидаемый результат:
Сдвиг ограничен зоной [block.y + 15, block.y + height - 15].

---

### ТЕСТ №310: Хранилище: Автовыравнивание граничной стрелки при откреплении (pinned: false)

* **Файл**: [`tests/unit/310-store61-unpin-boundary-arrow-resets-alignment.test.ts`](./unit/310-store61-unpin-boundary-arrow-resets-alignment.test.ts)
* **Класс эквивалентности**: `STORE-61 (Unpin Boundary Arrow Resets Alignment)`
* **Описание**: Проверяет выравнивание координаты граничной точки со входом блока при вызове setArrowPinned(false).

#### Предусловия:
* - Граничная стрелка с source: border top и target: block top.

#### Выполняемые действия:
1. Вызвать store.setArrowPinned(a.id, false).
2. Проверить совпадение X источника и цели.

#### Ожидаемый результат:
Координата X граничной точки выровнена по порту блока.

---

### ТЕСТ №311: Хранилище: Синхронизация координаты Y узла при сдвиге родительского ствола

* **Файл**: [`tests/unit/311-store62-shift-segment-updates-source-junction-y.test.ts`](./unit/311-store62-shift-segment-updates-source-junction-y.test.ts)
* **Класс эквивалентности**: `STORE-62 (Shift Trunk Segment Updates Junction Y)`
* **Описание**: Проверяет каскадное обновление координаты Y узла при сдвиге горизонтального сегмента родительского ствола.

#### Предусловия:
* - Ствол и узел ветвления с дочерней стрелкой.

#### Выполняемые действия:
1. Вызвать store.shiftArrowSegment для ствола.
2. Проверить junc.point.y.

#### Ожидаемый результат:
Координата Y узла переместилась вместе со стволом.

---

### ТЕСТ №312: Хранилище: Синхронизация координаты X узла при сдвиге вертикального сегмента

* **Файл**: [`tests/unit/312-store63-shift-segment-updates-source-junction-x.test.ts`](./unit/312-store63-shift-segment-updates-source-junction-x.test.ts)
* **Класс эквивалентности**: `STORE-63 (Shift Segment Updates Source Junction X)`
* **Описание**: Проверяет обновление координаты X узла при сдвиге начального вертикального отрезка ответвления.

#### Предусловия:
* - Вертикальное ответвление от узла.

#### Выполняемые действия:
1. Вызвать store.shiftArrowSegment(branch.id, 0, 480).
2. Проверить junc.point.x === 480.

#### Ожидаемый результат:
Координата X узла синхронно обновлена.

---

### ТЕСТ №313: Хранилище: Ограничение сдвига стрелки Управления шириной блока

* **Файл**: [`tests/unit/313-store64-shift-vertical-segment-clamps-block-width.test.ts`](./unit/313-store64-shift-vertical-segment-clamps-block-width.test.ts)
* **Класс эквивалентности**: `STORE-64 (Shift Vertical Segment Clamps Block Width)`
* **Описание**: Проверяет удержание контактного порта в пределах [block.x + 15, block.x + block.width - 15] при попытке сдвинуть вертикальный сегмент за пределы блока.

#### Предусловия:
* - Стрелка в верхнюю грань блока (X от 300 до 510).

#### Выполняемые действия:
1. Вызвать shiftArrowSegment со значением X=600.
2. Проверить ограничение X не более 495.

#### Ожидаемый результат:
Координата ограничена 495px (отступ 15px от правого края блока).

---

### ТЕСТ №314: Хранилище: Удаление промежуточной точки стрелки (removeArrowPoint)

* **Файл**: [`tests/unit/314-store65-remove-arrow-point-simplifies-collinear.test.ts`](./unit/314-store65-remove-arrow-point-simplifies-collinear.test.ts)
* **Класс эквивалентности**: `STORE-65 (Remove Arrow Point Simplifies Collinear)`
* **Описание**: Проверяет удаление избыточного изгиба стрелки и пересчет ортогонального угла.

#### Предусловия:
* - 5-точечная стрелка.

#### Выполняемые действия:
1. Вызвать store.removeArrowPoint(a.id, 2).
2. Проверить points.length.

#### Ожидаемый результат:
Точка удалена, трасса ортогонализирована.

---

### ТЕСТ №315: Хранилище: Удаление сегмента ломаной стрелки (removeArrowSegment)

* **Файл**: [`tests/unit/315-store66-remove-arrow-segment-rebuilds-route.test.ts`](./unit/315-store66-remove-arrow-segment-rebuilds-route.test.ts)
* **Класс эквивалентности**: `STORE-66 (Remove Arrow Segment Rebuilds Route)`
* **Описание**: Проверяет схлопывание сегмента стрелки при вызове removeArrowSegment.

#### Предусловия:
* - Многоточечная стрелка.

#### Выполняемые действия:
1. Вызвать store.removeArrowSegment(a.id, 1).
2. Проверить результат.

#### Ожидаемый результат:
Сегмент удален, маршрут валиден.

---

### ТЕСТ №316: Именование: Определение родителя стрелки слияния по target.id

* **Файл**: [`tests/unit/316-name03-parent-arrow-target-arrow-segment.test.ts`](./unit/316-name03-parent-arrow-target-arrow-segment.test.ts)
* **Класс эквивалентности**: `NAME-03 (Parent Arrow Target Segment)`
* **Описание**: Проверяет обнаружение родительской стрелки через getArrowParent, когда целевой эндпоинт стрелки имеет тип 'arrow_segment'.

#### Предусловия:
* - Стрелка с target.type: 'arrow_segment', target.id: trunk.id.

#### Выполняемые действия:
1. Вызвать getArrowParent.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен объект родительской стрелки trunk.

---

### ТЕСТ №317: Именование: Определение родителя по совпадению с вертикальным сегментом

* **Файл**: [`tests/unit/317-name04-parent-arrow-vertical-waypoint-match.test.ts`](./unit/317-name04-parent-arrow-vertical-waypoint-match.test.ts)
* **Класс эквивалентности**: `NAME-04 (Parent Arrow Vertical Waypoint Match)`
* **Описание**: Проверяет определение родительской стрелки по геометрическому совпадению точки ветвления с вертикальным участком ствола.

#### Предусловия:
* - Ствол с вертикальным звеном от (400, 100) до (400, 500). Ветвь начинается в (400, 250).

#### Выполняемые действия:
1. Вызвать getArrowParent.
2. Проверить найденный родитель.

#### Ожидаемый результат:
Родитель определен по вертикальной соосности.

---

### ТЕСТ №318: Компоновка: Безопасность autoLayoutIdef0 при отсутствии блоков

* **Файл**: [`tests/unit/318-layout03-auto-layout-safe-on-empty-blocks.test.ts`](./unit/318-layout03-auto-layout-safe-on-empty-blocks.test.ts)
* **Класс эквивалентности**: `LAYOUT-03 (Auto Layout Safe Empty Blocks)`
* **Описание**: Проверяет, что вызов autoLayoutIdef0 на пустой диаграмме без блоков возвращает диаграмму без изменений и не выбрасывает ошибок.

#### Предусловия:
* - Диаграмма с blocks: [].

#### Выполняемые действия:
1. Вызвать autoLayoutIdef0.
2. Проверить результат.

#### Ожидаемый результат:
Возвращена та же диаграмма.

---

### ТЕСТ №319: Синхронизация узлов: Перетрассировка 4-точечной ветви при сдвиге родителя

* **Файл**: [`tests/unit/319-junc13-sync-junctions-four-point-child-branch.test.ts`](./unit/319-junc13-sync-junctions-four-point-child-branch.test.ts)
* **Класс эквивалентности**: `JUNC-13 (Sync Junctions Four Point Child Branch)`
* **Описание**: Проверяет пересчет маршрута через buildOrthogonalRoute для 4-точечной дочерней стрелки при вызове synchronizeJunctions.

#### Предусловия:
* - 4-точечная ветвь от узла.

#### Выполняемые действия:
1. Вызвать synchronizeJunctions(diag).
2. Проверить точки ветви.

#### Ожидаемый результат:
Точки ветви синхронизированы с узлом.

---

### ТЕСТ №32: Сегменты: Удаление промежуточного сегмента через инспектор

* **Файл**: [`tests/unit/32-seg02-remove-intermediate-segment-inspector.test.ts`](./unit/32-seg02-remove-intermediate-segment-inspector.test.ts)
* **Класс эквивалентности**: `SEG-02 (Segment Removal via Inspector)`
* **Описание**: Проверяет удаление одного из промежуточных сегментов через панель сегментов инспектора и корректное перестроение маршрута.

#### Предусловия:
* - Стрелка состоит из 5 точек (4 сегмента).

#### Выполняемые действия:
1. Вызвать removeArrowSegment для промежуточного сегмента.
2. Проверить уменьшение числа точек маршрута.

#### Ожидаемый результат:
Сегмент удален, маршрут сохраняет целостность и ортогональность.

---

### ТЕСТ №320: Синхронизация узлов: Ортогонализация 2-точечной диагональной стрелки слияния

* **Файл**: [`tests/unit/320-junc14-sync-junctions-diagonal-two-point-merge.test.ts`](./unit/320-junc14-sync-junctions-diagonal-two-point-merge.test.ts)
* **Класс эквивалентности**: `JUNC-14 (Sync Junctions Diagonal Two Point Merge)`
* **Описание**: Проверяет ортогонализацию диагональной 2-точечной стрелки слияния при вызове synchronizeJunctions.

#### Предусловия:
* - Стрелка слияния из 2 диагональных точек.

#### Выполняемые действия:
1. Вызвать synchronizeJunctions(diag).
2. Проверить ортогональность.

#### Ожидаемый результат:
Диагональная стрелка перестроена в ортогональный маршрут.

---

### ТЕСТ №321: Пересечения: Детекция недопустимого нахлеста горизонтальных звеньев

* **Файл**: [`tests/unit/321-inter09-collinear-horizontal-overlap-detected.test.ts`](./unit/321-inter09-collinear-horizontal-overlap-detected.test.ts)
* **Класс эквивалентности**: `INTER-09 (Collinear Horizontal Overlap Detected)`
* **Описание**: Проверяет обнаружение ошибки коллинеарного наложения двух независимых горизонтальных стрелок на одной высоте Y.

#### Предусловия:
* - Два отрезка на Y=200: (100, 200)-(400, 200) и (300, 200)-(600, 200).

#### Выполняемые действия:
1. Вызвать checkSegmentIntersection.
2. Проверить результат.

#### Ожидаемый результат:
hasIntersection === true, isAllowed === false, type === 'overlap'.

---

### ТЕСТ №322: Хранилище: Удаление контрольной точки проекта (deleteSnapshot)

* **Файл**: [`tests/unit/322-store67-delete-snapshot-removes-snapshot.test.ts`](./unit/322-store67-delete-snapshot-removes-snapshot.test.ts)
* **Класс эквивалентности**: `STORE-67 (Delete Snapshot Removes Snapshot)`
* **Описание**: Проверяет удаление снимка состояния проекта по идентификатору через HistoryOps.deleteSnapshot.

#### Предусловия:
* - Сохраненная контрольная точка проекта.

#### Выполняемые действия:
1. Вызвать HistoryOps.deleteSnapshot(state, snap.id).
2. Проверить массив снимков.

#### Ожидаемый результат:
Снимок удален из списка снимков.

---

### ТЕСТ №323: Хранилище: Защита при восстановлении несуществующего снимка проекта

* **Файл**: [`tests/unit/323-store68-restore-snapshot-ghost-id-returns-false.test.ts`](./unit/323-store68-restore-snapshot-ghost-id-returns-false.test.ts)
* **Класс эквивалентности**: `STORE-68 (Restore Snapshot Ghost ID Returns False)`
* **Описание**: Проверяет возврат false при попытке восстановить проект из фантомного снимка.

#### Предусловия:
* - Хранилище без снимков.

#### Выполняемые действия:
1. Вызвать HistoryOps.restoreSnapshot(state, 'ghost-snap').
2. Проверить результат.

#### Ожидаемый результат:
Возвращен false, проект не изменен.

---

### ТЕСТ №324: Хранилище: Защитный отступ узла на вертикальном родительском стволе

* **Файл**: [`tests/unit/324-store69-move-junction-vertical-parent-clamps-margin.test.ts`](./unit/324-store69-move-junction-vertical-parent-clamps-margin.test.ts)
* **Класс эквивалентности**: `STORE-69 (Move Junction Vertical Parent Clamps Margin)`
* **Описание**: Проверяет принудительное ограничение смещения узла по оси Y не ближе 15px к началу вертикального ствола Управления.

#### Предусловия:
* - Вертикальный ствол Управления от границы top (Y=40) до блока top (Y=300).

#### Выполняемые действия:
1. Переместить узел в точку (400, 45).
2. Проверить junc.point.y >= 55.

#### Ожидаемый результат:
Координата Y ограничена отступом 15px от границы (не ближе 55).

---

### ТЕСТ №325: Хранилище: Пересчет 3-точечной ветви Управления при сдвиге узла

* **Файл**: [`tests/unit/325-store70-move-junction-updates-three-point-branch-to-top.test.ts`](./unit/325-store70-move-junction-updates-three-point-branch-to-top.test.ts)
* **Класс эквивалентности**: `STORE-70 (Move Junction Updates Three Point Branch To Top)`
* **Описание**: Проверяет обновление промежуточной точки 3-точечной ветви, входящей в верхнюю грань блока (Управление), при смещении родительского узла.

#### Предусловия:
* - 3-точечная ветвь в грань 'top'.

#### Выполняемые действия:
1. Вызвать store.moveJunction.
2. Проверить координаты points[1].

#### Ожидаемый результат:
Промежуточная точка согласована с новым положением узла.

---

### ТЕСТ №326: Примагничивание: Исключение углов блока из зоны захвата портов

* **Файл**: [`tests/unit/326-snap14-block-corner-exclusion-returns-null.test.ts`](./unit/326-snap14-block-corner-exclusion-returns-null.test.ts)
* **Класс эквивалентности**: `SNAP-14 (Block Corner Exclusion Returns Null)`
* **Описание**: Проверяет возврат null при попытке примагничивания в непосредственной близости от угла блока (в пределах 5px).

#### Предусловия:
* - Блок в (200, 200), курсор в (202, 202).

#### Выполняемые действия:
1. Вызвать getBlockSnapPoint.
2. Проверить возврат null.

#### Ожидаемый результат:
Возвращен null, угловая зона исключена.

---

### ТЕСТ №327: Примагничивание: Отклонение захвата левой границы при невалидной цели

* **Файл**: [`tests/unit/327-snap15-reject-left-border-when-draft-target-invalid.test.ts`](./unit/327-snap15-reject-left-border-when-draft-target-invalid.test.ts)
* **Класс эквивалентности**: `SNAP-15 (Reject Left Border When Draft Target Invalid)`
* **Описание**: Проверяет отказ в захвате левой границы листа, если драфт-цель представляет собой несовместимый порт (например, левую границу холста).

#### Предусловия:
* - draftTarget: border left.

#### Выполняемые действия:
1. Вызвать getBorderSnapPoint у координаты X=25.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен null, захват отклонен валидатором.

---

### ТЕСТ №328: Примагничивание: Отклонение захвата правой границы при невалидном источнике

* **Файл**: [`tests/unit/328-snap16-reject-right-border-when-draft-source-invalid.test.ts`](./unit/328-snap16-reject-right-border-when-draft-source-invalid.test.ts)
* **Класс эквивалентности**: `SNAP-16 (Reject Right Border When Draft Source Invalid)`
* **Описание**: Проверяет отказ в захвате правой границы листа, если драфт-источник представляет собой правую границу листа.

#### Предусловия:
* - draftSource: border right.

#### Выполняемые действия:
1. Вызвать getBorderSnapPoint у правой границы (X=1575).
2. Проверить результат.

#### Ожидаемый результат:
Возвращен null, захват отклонен.

---

### ТЕСТ №329: Адаптация при ресайзе: Синхронизация 3-точечной входящей стрелки сверху

* **Файл**: [`tests/unit/329-resize04-adapt-three-point-arrow-target-top.test.ts`](./unit/329-resize04-adapt-three-point-arrow-target-top.test.ts)
* **Класс эквивалентности**: `RESIZE-04 (Adapt Three Point Arrow Target Top)`
* **Описание**: Проверяет пересчет промежуточной точки 3-точечной стрелки Управления при масштабировании целевого блока.

#### Предусловия:
* - Блок увеличивается по ширине.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize с объектом Block.
2. Проверить points[1].x.

#### Ожидаемый результат:
Точка points[1].x выровнена по новому положению порта блока.

---

### ТЕСТ №33: Сегменты: Удаление угловой вершины на многоступенчатом маршруте

* **Файл**: [`tests/unit/33-seg03-remove-multi-bend-corner.test.ts`](./unit/33-seg03-remove-multi-bend-corner.test.ts)
* **Класс эквивалентности**: `SEG-03 (Corner Bend Removal Multi-step)`
* **Описание**: Проверяет последовательное удаление вершин изломов с автоматическим объединением коллинеарных сегментов.

#### Предусловия:
* - Стрелка имеет сложный ступенчатый маршрут из 6 точек с 4 изломами.

#### Выполняемые действия:
1. Удалить промежуточную угловую вершину (индекс 2).
2. Проверить пересчет маршрута.

#### Ожидаемый результат:
Излом удален, количество точек уменьшено.

---

### ТЕСТ №330: Адаптация при ресайзе: Синхронизация 3-точечной исходящей стрелки снизу

* **Файл**: [`tests/unit/330-resize05-adapt-three-point-arrow-source-bottom.test.ts`](./unit/330-resize05-adapt-three-point-arrow-source-bottom.test.ts)
* **Класс эквивалентности**: `RESIZE-05 (Adapt Three Point Arrow Source Bottom)`
* **Описание**: Проверяет пересчет промежуточного изгиба 3-точечной стрелки, выходящей из нижней грани блока, при его ресайзе.

#### Предусловия:
* - Блок масштабируется.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize с объектом Block.
2. Проверить points[1].x.

#### Ожидаемый результат:
Точка points[1].x выровнена по новому положению порта выхода снизу.

---

### ТЕСТ №331: Адаптация при ресайзе: Синхронизация стрелок на левой и правой гранях

* **Файл**: [`tests/unit/331-resize06-adapt-arrow-source-left-target-right.test.ts`](./unit/331-resize06-adapt-arrow-source-left-target-right.test.ts)
* **Класс эквивалентности**: `RESIZE-06 (Adapt Source Left Target Right)`
* **Описание**: Проверяет пересчет контактных портов стрелок, присоединенных к левой грани источника и правой грани цели, при изменении габаритов блоков.

#### Предусловия:
* - Блок источника и блок цели изменяют размеры.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize для левой грани источника.
2. Вызвать adjustArrowOnBlockResize для правой грани цели.

#### Ожидаемый результат:
Точки контактов пропорционально пересчитаны по новым размерам.

---

### ТЕСТ №332: Адаптация при ресайзе: Выравнивание промежуточных звеньев 4-точечной стрелки

* **Файл**: [`tests/unit/332-resize07-adapt-four-point-arrow-intermediate-points.test.ts`](./unit/332-resize07-adapt-four-point-arrow-intermediate-points.test.ts)
* **Класс эквивалентности**: `RESIZE-07 (Adapt Four Point Arrow Intermediate Points)`
* **Описание**: Проверяет сохранение ортогональности промежуточных звеньев 4-точечной стрелки (pts[1].y = pts[0].y и pts[2].y = pts[3].y).

#### Предусловия:
* - 4-точечная стрелка.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize.
2. Проверить ортогональность первого и последнего звеньев.

#### Ожидаемый результат:
Звенья ортогональны и выровнены по портам.

---

### ТЕСТ №333: Примагничивание: Отклонение верхней границы при невалидной цели

* **Файл**: [`tests/unit/333-snap17-reject-top-border-when-draft-target-invalid.test.ts`](./unit/333-snap17-reject-top-border-when-draft-target-invalid.test.ts)
* **Класс эквивалентности**: `SNAP-17 (Reject Top Border When Draft Target Invalid)`
* **Описание**: Проверяет отклонение верхней границы листа (Управление), если целевой порт несовместим (например, выход на правую границу напрямую).

#### Предусловия:
* - draftTarget: border right.

#### Выполняемые действия:
1. Вызвать getBorderSnapPoint у верхней границы (Y=35).
2. Проверить результат.

#### Ожидаемый результат:
Возвращен null, захват отклонен.

---

### ТЕСТ №334: Примагничивание: Отклонение нижней границы при невалидной цели

* **Файл**: [`tests/unit/334-snap18-reject-bottom-border-when-draft-target-invalid.test.ts`](./unit/334-snap18-reject-bottom-border-when-draft-target-invalid.test.ts)
* **Класс эквивалентности**: `SNAP-18 (Reject Bottom Border When Draft Target Invalid)`
* **Описание**: Проверяет отказ в захвате нижней границы листа (Механизм), если цель несовместима со входом Механизма.

#### Предусловия:
* - draftTarget: border right.

#### Выполняемые действия:
1. Вызвать getBorderSnapPoint у нижней границы (Y=870).
2. Проверить результат.

#### Ожидаемый результат:
Возвращен null, захват отклонен.

---

### ТЕСТ №335: Примагничивание: Успешный захват сегмента стрелки с валидным draftSource

* **Файл**: [`tests/unit/335-snap19-find-snap-target-valid-draft-source-and-segment.test.ts`](./unit/335-snap19-find-snap-target-valid-draft-source-and-segment.test.ts)
* **Класс эквивалентности**: `SNAP-19 (Find Snap Target Valid Source And Segment)`
* **Описание**: Проверяет успешный захват сегмента ствола при начале стрелки из правой грани блока (валидное слияние).

#### Предусловия:
* - Ствол стрелки и блок-источник.

#### Выполняемые действия:
1. Вызвать findSnapTarget около ствола с draftSource от правой грани блока.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен объект SnapTarget типа segment.

---

### ТЕСТ №336: Примагничивание: Успешный захват сегмента стрелки с валидной draftTarget

* **Файл**: [`tests/unit/336-snap20-find-snap-target-valid-draft-target-and-segment.test.ts`](./unit/336-snap20-find-snap-target-valid-draft-target-and-segment.test.ts)
* **Класс эквивалентности**: `SNAP-20 (Find Snap Target Valid Target And Segment)`
* **Описание**: Проверяет захват сегмента ствола как источника при ответвлении в верхнюю грань блока (Управление).

#### Предусловия:
* - Ствол стрелки и блок-цель.

#### Выполняемые действия:
1. Вызвать findSnapTarget около ствола с draftTarget к грани top блока.
2. Проверить результат.

#### Ожидаемый результат:
Сегмент захвачен в качестве источника ответвления.

---

### ТЕСТ №337: Именование: Возврат null при отсутствии родителя у стрелки в открытом поле

* **Файл**: [`tests/unit/337-name05-get-arrow-parent-returns-null-open-air.test.ts`](./unit/337-name05-get-arrow-parent-returns-null-open-air.test.ts)
* **Класс эквивалентности**: `NAME-05 (Get Arrow Parent Returns Null Open Air)`
* **Описание**: Проверяет возврат null функцией getArrowParent, если начало стрелки не пересекает ни один сегмент диаграммы.

#### Предусловия:
* - Стрелка в открытом пространстве листа.

#### Выполняемые действия:
1. Вызвать getArrowParent.
2. Проверить результат.

#### Ожидаемый результат:
Возвращен null.

---

### ТЕСТ №338: Хранилище: Повтор отмененного действия через HistoryOps.redo

* **Файл**: [`tests/unit/338-store71-history-ops-redo-restores-state.test.ts`](./unit/338-store71-history-ops-redo-restores-state.test.ts)
* **Класс эквивалентности**: `STORE-71 (History Ops Redo Restores State)`
* **Описание**: Проверяет восстановление состояния из стека redoStack при вызове HistoryOps.redo.

#### Предусловия:
* - Выполнены действие, undo и последующий redo.

#### Выполняемые действия:
1. Изменить имя проекта, сделать undo.
2. Вызвать HistoryOps.redo(state).

#### Ожидаемый результат:
Состояние восстановлено, redoStack уменьшился.

---

### ТЕСТ №339: Хранилище: Адаптация портов к нижней грани при смене роли на Механизм

* **Файл**: [`tests/unit/339-store72-set-arrow-role-mechanism-adapts-bottom.test.ts`](./unit/339-store72-set-arrow-role-mechanism-adapts-bottom.test.ts)
* **Класс эквивалентности**: `STORE-72 (Set Arrow Role Mechanism Adapts Bottom)`
* **Описание**: Проверяет перенос граничной точки на нижнюю границу (Y=865) и контактного порта на нижнюю сторону блока при вызове setArrowRole(id, 'mechanism').

#### Предусловия:
* - Входящая стрелка.

#### Выполняемые действия:
1. Вызвать store.setArrowRole(a.id, 'mechanism').
2. Проверить source.side === 'bottom' и target.side === 'bottom'.

#### Ожидаемый результат:
Стрелка адаптирована как Механизм снизу.

---

### ТЕСТ №34: Сегменты: Спрямление стрелки при минимальном смещении (<= 10px)

* **Файл**: [`tests/unit/34-seg04-straighten-arrow-minimal-delta.test.ts`](./unit/34-seg04-straighten-arrow-minimal-delta.test.ts)
* **Класс эквивалентности**: `SEG-04 (Arrow Straightening Threshold)`
* **Описание**: Проверяет сохранение 100% прямого сегмента без лишних изломов при дельте координат менее 10px.

#### Предусловия:
* - Две точки имеют смещение по Y равное 6px (<= 10px порог спрямления).

#### Выполняемые действия:
1. Построить ортогональный маршрут между точками с deltaY = 6px.
2. Проверить количество точек маршрута.

#### Ожидаемый результат:
Маршрут спрямлен до 2 точек без паразитных изломов.

---

### ТЕСТ №340: Хранилище: Адаптация портов к левой грани при смене роли на Вход

* **Файл**: [`tests/unit/340-store73-set-arrow-role-input-adapts-left.test.ts`](./unit/340-store73-set-arrow-role-input-adapts-left.test.ts)
* **Класс эквивалентности**: `STORE-73 (Set Arrow Role Input Adapts Left)`
* **Описание**: Проверяет адаптацию граничной точки к левой границе (X=30) и контактного порта к левой стороне блока при вызове setArrowRole(id, 'input').

#### Предусловия:
* - Стрелка Управления сверху.

#### Выполняемые действия:
1. Вызвать store.setArrowRole(a.id, 'input').
2. Проверить source.side === 'left' и target.side === 'left'.

#### Ожидаемый результат:
Стрелка адаптирована как Вход слева.

---

### ТЕСТ №341: Хранилище: Адаптация исходящей стрелки к правой границе листа

* **Файл**: [`tests/unit/341-store74-set-arrow-role-outflow-adapts-right.test.ts`](./unit/341-store74-set-arrow-role-outflow-adapts-right.test.ts)
* **Класс эквивалентности**: `STORE-74 (Set Arrow Role Outflow Adapts Right)`
* **Описание**: Проверяет перенос целевой границы на правую сторону листа (X=1580) при вызове setArrowRole(id, 'output').

#### Предусловия:
* - Исходящая стрелка из блока.

#### Выполняемые действия:
1. Вызвать store.setArrowRole(a.id, 'output').
2. Проверить target.side === 'right'.

#### Ожидаемый результат:
Целевая граница установлена на правую сторону.

---

### ТЕСТ №342: Хранилище: Адаптация исходящей стрелки к верхней границе листа

* **Файл**: [`tests/unit/342-store75-set-arrow-role-outflow-adapts-top.test.ts`](./unit/342-store75-set-arrow-role-outflow-adapts-top.test.ts)
* **Класс эквивалентности**: `STORE-75 (Set Arrow Role Outflow Adapts Top)`
* **Описание**: Проверяет перенос целевой границы на верхнюю сторону листа (Y=40) при вызове setArrowRole(id, 'control').

#### Предусловия:
* - Исходящая стрелка.

#### Выполняемые действия:
1. Вызвать store.setArrowRole(a.id, 'control').
2. Проверить target.side === 'top'.

#### Ожидаемый результат:
Целевая граница установлена сверху.

---

### ТЕСТ №343: Хранилище: Выравнивание Y целевой правой границы при сбросе фиксации

* **Файл**: [`tests/unit/343-store76-unpin-arrow-to-right-border-aligns-y.test.ts`](./unit/343-store76-unpin-arrow-to-right-border-aligns-y.test.ts)
* **Класс эквивалентности**: `STORE-76 (Unpin Arrow To Right Border Aligns Y)`
* **Описание**: Проверяет выравнивание координаты Y целевой правой границы с координатой Y источника при вызове setArrowPinned(false).

#### Предусловия:
* - Стрелка с target: border right.

#### Выполняемые действия:
1. Вызвать store.setArrowPinned(a.id, false).
2. Проверить target.point.y === source.point.y.

#### Ожидаемый результат:
Координата Y цели выровнена по источнику.

---

### ТЕСТ №344: Хранилище: Выравнивание портов границы в _legacySetArrowPathMode('auto')

* **Файл**: [`tests/unit/344-store77-legacy-set-arrow-path-mode-aligns-target-border.test.ts`](./unit/344-store77-legacy-set-arrow-path-mode-aligns-target-border.test.ts)
* **Класс эквивалентности**: `STORE-77 (Legacy Set Arrow Path Mode Aligns Border)`
* **Описание**: Проверяет автоматическое выравнивание целевой границы и регенерацию выноски при переключении режима трассы в auto.

#### Предусловия:
* - Стрелка с выноской.

#### Выполняемые действия:
1. Вызвать store._legacySetArrowPathMode(a.id, 'auto').
2. Проверить выравнивание и наличие leaderPoints.

#### Ожидаемый результат:
Трасса выровнена, точки выноски пересчитаны.

---

### ТЕСТ №345: Хранилище: Каскадный пересчет дочерних стрелок при сдвиге вертикального ствола

* **Файл**: [`tests/unit/345-store78-shift-vertical-trunk-updates-children.test.ts`](./unit/345-store78-shift-vertical-trunk-updates-children.test.ts)
* **Класс эквивалентности**: `STORE-78 (Shift Vertical Trunk Updates Children)`
* **Описание**: Проверяет смещение узлов ветвления и перетрассировку дочерних стрелок при сдвиге вертикального участка ствола через shiftArrowSegment.

#### Предусловия:
* - Вертикальный ствол с дочерней ветвью.

#### Выполняемые действия:
1. Вызвать store.shiftArrowSegment для вертикального участка ствола.
2. Проверить координату X узла.

#### Ожидаемый результат:
Координата X узла синхронно обновлена.

---

### ТЕСТ №346: Хранилище: Спрямление стрелки к правой границе холста

* **Файл**: [`tests/unit/346-store79-straighten-arrow-to-right-border-aligns-y.test.ts`](./unit/346-store79-straighten-arrow-to-right-border-aligns-y.test.ts)
* **Класс эквивалентности**: `STORE-79 (Straighten Arrow Right Border Aligns Y)`
* **Описание**: Проверяет выравнивание координаты Y целевой точки на правой границе холста по координате Y источника при вызове straightenArrow.

#### Предусловия:
* - Стрелка block right -> border right.

#### Выполняемые действия:
1. Вызвать store.straightenArrow(a.id).
2. Проверить соосность Y.

#### Ожидаемый результат:
Координата Y границы выровнена с портом блока.

---

### ТЕСТ №347: Хранилище: Спрямление стрелки к верхней границе холста

* **Файл**: [`tests/unit/347-store80-straighten-arrow-to-top-border-aligns-x.test.ts`](./unit/347-store80-straighten-arrow-to-top-border-aligns-x.test.ts)
* **Класс эквивалентности**: `STORE-80 (Straighten Arrow Top Border Aligns X)`
* **Описание**: Проверяет выравнивание координаты X границы холста при вызове straightenArrow для стрелки между узлом и верхней границей.

#### Предусловия:
* - Стрелка с вертикальными эндпоинтами.

#### Выполняемые действия:
1. Вызвать store.straightenArrow(a.id).
2. Проверить соосность X.

#### Ожидаемый результат:
Координата X границы выровнена с источником.

---

### ТЕСТ №348: Трассировка: Построение прямого 2-точечного отрезка при малой несоосности по Y

* **Файл**: [`tests/unit/348-router21-near-aligned-y-two-point-direct-line.test.ts`](./unit/348-router21-near-aligned-y-two-point-direct-line.test.ts)
* **Класс эквивалентности**: `ROUTE-21 (Near Aligned Y Two Point Line)`
* **Описание**: Проверяет схлопывание трассы в 2-точечный прямой отрезок, когда разница по оси Y между портом выхода и входа составляет менее 10px.

#### Предусловия:
* - Источник (200, 254), цель (500, 250) — разница 4px.

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить points.length === 2.

#### Ожидаемый результат:
Построена прямая линия из 2 точек.

---

### ТЕСТ №349: Трассировка: Обходной коридор при вводе в правую сторону блока спереди

* **Файл**: [`tests/unit/349-router22-detour-to-right-side-corridor.test.ts`](./unit/349-router22-detour-to-right-side-corridor.test.ts)
* **Класс эквивалентности**: `ROUTE-22 (Detour To Right Side Corridor)`
* **Описание**: Проверяет построение обходного коридора вокруг блока при подключении в его правую грань, когда источник расположен левее блока.

#### Предусловия:
* - Источник (200, 100), цель (500, 300) на правой грани.

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить points.length >= 4.

#### Ожидаемый результат:
Построен обходной коридор.

---

### ТЕСТ №35: Сегменты: Инвариант строгой ортогональности (100% прямые углы)

* **Файл**: [`tests/unit/35-seg05-preserve-strict-orthogonality-on-all-segments.test.ts`](./unit/35-seg05-preserve-strict-orthogonality-on-all-segments.test.ts)
* **Класс эквивалентности**: `SEG-05 (Strict Orthogonality Invariant)`
* **Описание**: Проверяет инвариант: ни один сегмент маршрута не может быть диагональным (каждый отрезок строго параллелен оси X либо оси Y).

#### Предусловия:
* - Маршрут построен ортогональным роутером между произвольными точками.

#### Выполняемые действия:
1. Сгенерировать маршруты для различных взаимных конфигураций.
2. Проверить каждый отрезок на условие p1.x === p2.x || p1.y === p2.y.

#### Ожидаемый результат:
100% сегментов строго горизонтальны либо вертикальны.

---

### ТЕСТ №350: Математика: Определение вертикальной ориентации для крутого диагонального отрезка

* **Файл**: [`tests/unit/350-math08-steep-diagonal-segment-vertical-orientation.test.ts`](./unit/350-math08-steep-diagonal-segment-vertical-orientation.test.ts)
* **Класс эквивалентности**: `MATH-08 (Steep Diagonal Vertical Orientation)`
* **Описание**: Проверяет присвоение orientation: 'vertical' отрезку, у которого приращение по Y строго больше приращения по X (dy > dx).

#### Предусловия:
* - Отрезок от (100, 100) до (102, 180) (dx=2, dy=80).

#### Выполняемые действия:
1. Вызвать getSegmentsFromPoints.
2. Проверить segs[0].orientation === 'vertical'.

#### Ожидаемый результат:
Сегменту присвоена вертикальная ориентация.

---

### ТЕСТ №351: Перемещение блока: Схлопывание в прямой горизонтальный отрезок при совмещении по высоте

* **Файл**: [`tests/unit/351-move06-collapse-to-direct-line-on-near-y.test.ts`](./unit/351-move06-collapse-to-direct-line-on-near-y.test.ts)
* **Класс эквивалентности**: `MOVE-06 (Collapse To Direct Line On Near Y)`
* **Описание**: Проверяет автоматическое спрямление трассы в 2 точки (pSrc, pTgt), когда в процессе перетаскивания блока разница высот между портами становится <= 10px.

#### Предусловия:
* - Два блока, блок 1 смещается так, что Y выхода совпадает с Y входа блока 2.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить points.length === 2.

#### Ожидаемый результат:
Трасса схлопнута в прямую линию из 2 точек.

---

### ТЕСТ №352: Перемещение блока: Сдвиг 2-точечной стрелки между блоками

* **Файл**: [`tests/unit/352-move07-two-point-arrow-between-blocks-vertical-shift.test.ts`](./unit/352-move07-two-point-arrow-between-blocks-vertical-shift.test.ts)
* **Класс эквивалентности**: `MOVE-07 (Two Point Arrow Vertical Shift)`
* **Описание**: Проверяет обновление Y координат 2-точечной стрелки при вертикальном перемещении блока источника.

#### Предусловия:
* - 2-точечная горизонтальная стрелка между блоками.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove(arrow, b1, 0, 30).
2. Проверить points[0].y.

#### Ожидаемый результат:
Координата Y источника сместилась на +30px.

---

### ТЕСТ №353: Перемещение блока: Пересчет 4-точечной входящей стрелки Механизма снизу

* **Файл**: [`tests/unit/353-move08-incoming-mechanism-four-point-safe-corridor.test.ts`](./unit/353-move08-incoming-mechanism-four-point-safe-corridor.test.ts)
* **Класс эквивалентности**: `MOVE-08 (Incoming Mechanism Four Point Safe Corridor)`
* **Описание**: Проверяет адаптацию безопасного коридора для 4-точечной стрелки Механизма из нижней границы листа при перемещении блока вверх.

#### Предусловия:
* - 4-точечная входящая стрелка снизу.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove с перемещением блока вверх (dy = -50).
2. Проверить ортогональность points[1] и points[2].

#### Ожидаемый результат:
Коридор пересчитан с соблюдением безопасных отступов.

---

### ТЕСТ №354: Перемещение блока: Пересчет 4-точечной входящей стрелки Входа слева

* **Файл**: [`tests/unit/354-move09-incoming-input-four-point-safe-corridor.test.ts`](./unit/354-move09-incoming-input-four-point-safe-corridor.test.ts)
* **Класс эквивалентности**: `MOVE-09 (Incoming Input Four Point Safe Corridor)`
* **Описание**: Проверяет адаптацию 4-точечной входящей стрелки с левой границы листа при сдвиге блока вправо/влево.

#### Предусловия:
* - 4-точечная стрелка Входа.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить выравнивание X точек.

#### Ожидаемый результат:
Точки points[1].x и points[2].x согласованы.

---

### ТЕСТ №355: Перемещение блока: Адаптация многоточечной (>4) входящей граничной стрелки

* **Файл**: [`tests/unit/355-move10-multi-point-incoming-boundary-arrow.test.ts`](./unit/355-move10-multi-point-incoming-boundary-arrow.test.ts)
* **Класс эквивалентности**: `MOVE-10 (Multi Point Incoming Boundary Arrow)`
* **Описание**: Проверяет адаптацию последнего сегмента многоточечной (5 точек) огибающей стрелки при перемещении целевого блока.

#### Предусловия:
* - 5-точечная стрелка из верхней границы в блок.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить points[n-2].y.

#### Ожидаемый результат:
Последнее звено адаптировано к новой позиции порта блока.

---

### ТЕСТ №356: Перемещение блока: Перетрассировка граничного выхода в автоматическом режиме

* **Файл**: [`tests/unit/356-move11-boundary-arrow-auto-mode-recalculates-route.test.ts`](./unit/356-move11-boundary-arrow-auto-mode-recalculates-route.test.ts)
* **Класс эквивалентности**: `MOVE-11 (Boundary Arrow Auto Mode Recalculates Route)`
* **Описание**: Проверяет автоматический пересчет ортогонального маршрута через buildOrthogonalRoute при сдвиге блока с исходящей стрелкой в режиме auto.

#### Предусловия:
* - Стрелка в pathMode: 'auto'.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить points.

#### Ожидаемый результат:
Маршрут перетрассирован роутером.

---

### ТЕСТ №357: Перемещение блока: Горизонтальное смещение 2-точечной вертикальной стрелки к границе

* **Файл**: [`tests/unit/357-move12-two-point-vertical-arrow-to-border.test.ts`](./unit/357-move12-two-point-vertical-arrow-to-border.test.ts)
* **Класс эквивалентности**: `MOVE-12 (Two Point Vertical Arrow To Border)`
* **Описание**: Проверяет обновление целевой координаты X на границе листа при горизонтальном смещении блока со стрелкой, направленной вверх/вниз.

#### Предусловия:
* - 2-точечная вертикальная стрелка к верхней границе.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove(arrow, b, 40, 0).
2. Проверить target.point.x.

#### Ожидаемый результат:
Целевая координата X на границе синхронно сместилась на +40px.

---

### ТЕСТ №358: Перемещение блока: Адаптация 4-точечной стрелки к верхней/нижней границе

* **Файл**: [`tests/unit/358-move13-four-point-arrow-to-top-bottom-border.test.ts`](./unit/358-move13-four-point-arrow-to-top-bottom-border.test.ts)
* **Класс эквивалентности**: `MOVE-13 (Four Point Arrow To Top/Bottom Border)`
* **Описание**: Проверяет обновление промежуточных точек 4-точечной исходящей стрелки к верхней границе листа при перемещении блока.

#### Предусловия:
* - 4-точечная стрелка block right -> border top.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить points[1].y === points[0].y.

#### Ожидаемый результат:
Ортогональность первого сегмента сохранена.

---

### ТЕСТ №359: Перемещение блока: Адаптация первого сегмента 5-точечной исходящей стрелки к границе

* **Файл**: [`tests/unit/359-move14-multi-point-outgoing-arrow-to-border.test.ts`](./unit/359-move14-multi-point-outgoing-arrow-to-border.test.ts)
* **Класс эквивалентности**: `MOVE-14 (Multi Point Outgoing Arrow To Border)`
* **Описание**: Проверяет сдвиг начального горизонтального сегмента многоточечной стрелки к границе при перемещении блока-источника.

#### Предусловия:
* - 5-точечная стрелка к правой границе.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить points[1].y === points[0].y.

#### Ожидаемый результат:
Первый сегмент сохранен горизонтальным при сдвиге по высоте.

---

### ТЕСТ №36: Геометрия: Генерация SVG-пути для прямого отрезка из 2 точек

* **Файл**: [`tests/unit/36-geom01-direct-two-point-orthogonal-line.test.ts`](./unit/36-geom01-direct-two-point-orthogonal-line.test.ts)
* **Класс эквивалентности**: `GEOM-01 (Direct SVG Line Path)`
* **Описание**: Проверяет конвертацию массива из двух точек в SVG path с командой M и L.

#### Предусловия:
* - Заданы 2 точки (x1: 100, y1: 200) и (x2: 400, y2: 200).

#### Выполняемые действия:
1. Вызвать pointsToSvgPath.
2. Проверить сгенерированную строку формата 'M 100,200 L 400,200'.

#### Ожидаемый результат:
Сформирован валидный путь 'M 100,200 L 400,200'.

---

### ТЕСТ №360: Перемещение блока: Адаптация 4-точечной ветви от узла к перемещаемому блоку

* **Файл**: [`tests/unit/360-move15-four-point-child-branch-from-junction.test.ts`](./unit/360-move15-four-point-child-branch-from-junction.test.ts)
* **Класс эквивалентности**: `MOVE-15 (Four Point Child Branch From Junction)`
* **Описание**: Проверяет обновление предпоследней точки 4-точечной ветви при перемещении целевого блока.

#### Предусловия:
* - Узел и 4-точечная дочерняя стрелка.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove.
2. Проверить points[n-2].

#### Ожидаемый результат:
Предпоследняя точка выровнена по целевому порту блока.

---

### ТЕСТ №361: Перемещение блока: Защита зазора вертикального канала стрелки слияния (минимум 20px)

* **Файл**: [`tests/unit/361-move16-merge-arrow-channel-clearance-protection.test.ts`](./unit/361-move16-merge-arrow-channel-clearance-protection.test.ts)
* **Класс эквивалентности**: `MOVE-16 (Merge Arrow Channel Clearance Protection)`
* **Описание**: Проверяет принудительное смещение вертикального канала и узла слияния вправо на безопасные 20px, если блок пододвигается вплотную к каналу.

#### Предусловия:
* - Стрелка слияния из 3 точек в узел.

#### Выполняемые действия:
1. Сдвинуть блок вправо в сторону узла.
2. Проверить pts[1].x >= pts[0].x + 20.

#### Ожидаемый результат:
Вертикальный канал и узел отодвинуты с соблюдением минимального зазора 20px.

---

### ТЕСТ №362: Перемещение блока: Сдвиг подписи стрелки самозацикливания (self-loop)

* **Файл**: [`tests/unit/362-move17-self-loop-arrow-shifts-label-pos.test.ts`](./unit/362-move17-self-loop-arrow-shifts-label-pos.test.ts)
* **Класс эквивалентности**: `MOVE-17 (Self Loop Arrow Shifts Label Pos)`
* **Описание**: Проверяет синхронный сдвиг координат labelPos стрелки самозацикливания (петли на тот же блок) при перемещении блока на (dx, dy).

#### Предусловия:
* - Стрелка соединяет блок сам с собой (isSource && isTarget).

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove(arrow, b, 30, 40).
2. Проверить смещение labelPos.

#### Ожидаемый результат:
Координаты подписи сместились ровно на (+30, +40).

---

### ТЕСТ №363: Перемещение блока: Синхронизация подписи на промежуточном горизонтальном звене

* **Файл**: [`tests/unit/363-move18-label-on-middle-horizontal-segment-shifts-y.test.ts`](./unit/363-move18-label-on-middle-horizontal-segment-shifts-y.test.ts)
* **Класс эквивалентности**: `MOVE-18 (Label On Horizontal Segment Shifts Y)`
* **Описание**: Проверяет вертикальное смещение подписи вслед за смещением горизонтального звена стрелки при перемещении блока.

#### Предусловия:
* - Стрелка с подписью на среднем горизонтальном сегменте.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove с dy = 50.
2. Проверить labelPos.y.

#### Ожидаемый результат:
Подпись сместилась по оси Y вместе с горизонтальным сегментом.

---

### ТЕСТ №364: Перемещение блока: Синхронизация подписи на промежуточном вертикальном звене

* **Файл**: [`tests/unit/364-move19-label-on-middle-vertical-segment-shifts-x.test.ts`](./unit/364-move19-label-on-middle-vertical-segment-shifts-x.test.ts)
* **Класс эквивалентности**: `MOVE-19 (Label On Vertical Segment Shifts X)`
* **Описание**: Проверяет горизонтальное смещение подписи вслед за смещением вертикального звена стрелки при горизонтальном перемещении блока.

#### Предусловия:
* - Стрелка с подписью на вертикальном звене.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove с dx = 60.
2. Проверить labelPos.x.

#### Ожидаемый результат:
Подпись сместилась по оси X вместе с вертикальным сегментом.

---

### ТЕСТ №365: Перепривязка стрелки: Бросок конца стрелки внутрь блока для граничного Управления

* **Файл**: [`tests/unit/365-recon09-drop-target-inside-block-for-border-top.test.ts`](./unit/365-recon09-drop-target-inside-block-for-border-top.test.ts)
* **Класс эквивалентности**: `RECON-09 (Drop Target Inside Block For Border Top)`
* **Описание**: Проверяет автоматическую привязку к верхней грани блока (Управление) при отпускании конца стрелки, идущей с верхней границы листа, внутри прямоугольника блока.

#### Предусловия:
* - Стрелка с верхней границы листа.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с точкой отпускания внутри блока (400, 350).
2. Проверить target.side === 'top' и role === 'control'.

#### Ожидаемый результат:
Стрелка автоматически привязана к верхнему порту Управления.

---

### ТЕСТ №366: Перепривязка стрелки: Бросок конца стрелки внутрь блока для граничного Механизма

* **Файл**: [`tests/unit/366-recon10-drop-target-inside-block-for-border-bottom.test.ts`](./unit/366-recon10-drop-target-inside-block-for-border-bottom.test.ts)
* **Класс эквивалентности**: `RECON-10 (Drop Target Inside Block For Border Bottom)`
* **Описание**: Проверяет автоматическую привязку к нижней грани блока (Механизм) при отпускании конца стрелки с нижней границы внутри блока.

#### Предусловия:
* - Стрелка с нижней границы листа.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с точкой внутри блока.
2. Проверить target.side === 'bottom' и role === 'mechanism'.

#### Ожидаемый результат:
Стрелка автоматически привязана к нижнему порту Механизма.

---

### ТЕСТ №367: Перепривязка стрелки: Бросок конца стрелки внутрь блока для граничного Входа

* **Файл**: [`tests/unit/367-recon11-drop-target-inside-block-for-border-left.test.ts`](./unit/367-recon11-drop-target-inside-block-for-border-left.test.ts)
* **Класс эквивалентности**: `RECON-11 (Drop Target Inside Block For Border Left)`
* **Описание**: Проверяет автоматическую привязку к левой грани блока (Вход) при броске конца стрелки с левой границы листа внутрь блока.

#### Предусловия:
* - Стрелка с левой границы листа.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с точкой внутри блока.
2. Проверить target.side === 'left' и role === 'input'.

#### Ожидаемый результат:
Стрелка автоматически привязана к левому порту Входа.

---

### ТЕСТ №368: Перепривязка стрелки: Бросок межблочной стрелки внутрь следующего блока

* **Файл**: [`tests/unit/368-recon12-drop-target-inside-block-inter-block-left.test.ts`](./unit/368-recon12-drop-target-inside-block-inter-block-left.test.ts)
* **Класс эквивалентности**: `RECON-12 (Drop Target Inside Block Inter Block Left)`
* **Описание**: Проверяет автоматическую привязку межблочной стрелки, исходящей слева от блока, к левой грани (Вход) при броске внутрь блока.

#### Предусловия:
* - Стрелка из блока 1 (x=100), блок 2 расположен правее (x=500).

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с точкой внутри блока 2.
2. Проверить target.side === 'left'.

#### Ожидаемый результат:
Стрелка автоматически привязана к левому входу блока 2.

---

### ТЕСТ №369: Перепривязка стрелки: Бросок межблочной стрелки сверху внутрь блока (Управление)

* **Файл**: [`tests/unit/369-recon13-drop-target-inside-block-inter-block-top.test.ts`](./unit/369-recon13-drop-target-inside-block-inter-block-top.test.ts)
* **Класс эквивалентности**: `RECON-13 (Drop Target Inside Block Inter Block Top)`
* **Описание**: Проверяет автоматическую привязку межблочной стрелки, исходящей выше блока, к верхней грани (Управление) при броске внутрь блока.

#### Предусловия:
* - Стрелка начинается выше блока цели.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с точкой внутри блока 2.
2. Проверить target.side === 'top'.

#### Ожидаемый результат:
Стрелка автоматически привязана к верхнему порту Управления.

---

### ТЕСТ №37: Геометрия: Генерация плавных дуг скругления в углах (радиус 6px)

* **Файл**: [`tests/unit/37-geom02-rounded-arc-generation-at-corners.test.ts`](./unit/37-geom02-rounded-arc-generation-at-corners.test.ts)
* **Класс эквивалентности**: `GEOM-02 (Rounded Corner Arcs)`
* **Описание**: Проверяет генерацию дуги скругления (SVG arc command A) в вершинах прямых углов излома стрелки.

#### Предусловия:
* - Заданы 3 ортогональные точки, образующие угол 90 градусов.

#### Выполняемые действия:
1. Вызвать pointsToSvgPath со скруглением.
2. Проверить наличие команды дуги 'A' в полученном SVG-пути.

#### Ожидаемый результат:
В строке SVG path присутствует скругление угла через команду 'A'.

---

### ТЕСТ №370: Перепривязка стрелки: Бросок конца стрелки в пустое место холста (unattached)

* **Файл**: [`tests/unit/370-recon14-drop-target-in-open-space-creates-unattached.test.ts`](./unit/370-recon14-drop-target-in-open-space-creates-unattached.test.ts)
* **Класс эквивалентности**: `RECON-14 (Drop Target In Open Space Creates Unattached)`
* **Описание**: Проверяет создание неприсоединенного конца стрелки с типом 'unattached' в координатах отпускания мыши в свободном пространстве холста.

#### Предусловия:
* - Стрелка из блока.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint в свободное место (700, 500).
2. Проверить target.type === 'unattached' и target.point.

#### Ожидаемый результат:
Конец стрелки стал непривязанным (unattached) в координатах (700, 500).

---

### ТЕСТ №371: Перепривязка стрелки: Бросок начала стрелки внутрь блока (Выход источника)

* **Файл**: [`tests/unit/371-recon15-drop-source-inside-block-snaps-to-right.test.ts`](./unit/371-recon15-drop-source-inside-block-snaps-to-right.test.ts)
* **Класс эквивалентности**: `RECON-15 (Drop Source Inside Block Snaps To Right)`
* **Описание**: Проверяет автоматическую привязку источника стрелки к правой грани блока (Выход) при отпускании начала стрелки внутри блока.

#### Предусловия:
* - Стрелка во вход блока 2.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint для 'source' с точкой внутри блока 1.
2. Проверить source.side === 'right'.

#### Ожидаемый результат:
Начало стрелки привязано к правой стороне блока как Выход.

---

### ТЕСТ №372: Перепривязка стрелки: Бросок начала стрелки в пустое место холста (unattached)

* **Файл**: [`tests/unit/372-recon16-drop-source-in-open-space-creates-unattached.test.ts`](./unit/372-recon16-drop-source-in-open-space-creates-unattached.test.ts)
* **Класс эквивалентности**: `RECON-16 (Drop Source In Open Space Creates Unattached)`
* **Описание**: Проверяет создание неприсоединенного начала стрелки в координатах мыши при отпускании в свободном поле листа.

#### Предусловия:
* - Стрелка, входящая в блок.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint для 'source' в пустое место (150, 400).
2. Проверить source.type === 'unattached'.

#### Ожидаемый результат:
Начало стрелки стало непривязанным (unattached).

---

### ТЕСТ №373: Перепривязка стрелки: Синхронизация границы холста при выборе верхнего порта через ключ

* **Файл**: [`tests/unit/373-recon17-set-endpoint-key-target-top-moves-border.test.ts`](./unit/373-recon17-set-endpoint-key-target-top-moves-border.test.ts)
* **Класс эквивалентности**: `RECON-17 (Set Endpoint Key Target Top Moves Border)`
* **Описание**: Проверяет автоматический перенос граничного источника стрелки на верхнюю границу листа (Y=40) при выборе цели 'block:b1:top' через инспектор.

#### Предусловия:
* - Граничная стрелка.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey(state, a.id, 'target', 'block:b1:top').
2. Проверить source.side === 'top' и source.point.y === 40.

#### Ожидаемый результат:
Граница источника автоматически перенесена на верхнюю кромку листа.

---

### ТЕСТ №374: Перепривязка стрелки: Синхронизация границы холста при выборе нижнего порта через ключ

* **Файл**: [`tests/unit/374-recon18-set-endpoint-key-target-bottom-moves-border.test.ts`](./unit/374-recon18-set-endpoint-key-target-bottom-moves-border.test.ts)
* **Класс эквивалентности**: `RECON-18 (Set Endpoint Key Target Bottom Moves Border)`
* **Описание**: Проверяет автоматический перенос граничного источника на нижнюю границу (Y=865) при выборе цели 'block:b1:bottom' через инспектор.

#### Предусловия:
* - Граничная стрелка.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey для цели 'block:b1:bottom'.
2. Проверить source.side === 'bottom'.

#### Ожидаемый результат:
Граница источника перенесена на нижнюю кромку листа.

---

### ТЕСТ №375: Перепривязка стрелки: Синхронизация границы холста при выборе левого порта через ключ

* **Файл**: [`tests/unit/375-recon19-set-endpoint-key-target-left-moves-border.test.ts`](./unit/375-recon19-set-endpoint-key-target-left-moves-border.test.ts)
* **Класс эквивалентности**: `RECON-19 (Set Endpoint Key Target Left Moves Border)`
* **Описание**: Проверяет перенос граничного источника на левую границу (X=30) при выборе цели 'block:b1:left' через инспектор.

#### Предусловия:
* - Граничная стрелка.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey для цели 'block:b1:left'.
2. Проверить source.side === 'left'.

#### Ожидаемый результат:
Граница источника перенесена на левую кромку листа.

---

### ТЕСТ №376: Узлы: Ограничение смещения узла не ближе 15px к концу горизонтальной стрелки

* **Файл**: [`tests/unit/376-junc15-move-junction-clamps-horizontal-end-margin.test.ts`](./unit/376-junc15-move-junction-clamps-horizontal-end-margin.test.ts)
* **Класс эквивалентности**: `JUNC-15 (Move Junction Clamps Horizontal End Margin)`
* **Описание**: Проверяет принудительное ограничение координаты узла ветвления на расстоянии не ближе 15px до цели горизонтального родительского ствола.

#### Предусловия:
* - Горизонтальный ствол заканчивается в точке X=700.

#### Выполняемые действия:
1. Переместить узел в точку X=695.
2. Проверить junc.point.x <= 685.

#### Ожидаемый результат:
Узел удержан на безопасном расстоянии 15px от конца стрелки.

---

### ТЕСТ №377: Узлы: Ограничение смещения узла не ближе 15px к концу вертикальной стрелки

* **Файл**: [`tests/unit/377-junc16-move-junction-clamps-vertical-end-margin.test.ts`](./unit/377-junc16-move-junction-clamps-vertical-end-margin.test.ts)
* **Класс эквивалентности**: `JUNC-16 (Move Junction Clamps Vertical End Margin)`
* **Описание**: Проверяет принудительное ограничение координаты узла не ближе 15px до конца вертикального ствола Управления.

#### Предусловия:
* - Вертикальный ствол от Y=40 до Y=400.

#### Выполняемые действия:
1. Сдвинуть узел в точку Y=395.
2. Проверить junc.point.y <= 385.

#### Ожидаемый результат:
Узел удержан на безопасном расстоянии 15px от цели.

---

### ТЕСТ №378: Узлы: Перетрассировка 4-точечной стрелки слияния и выноски при сдвиге узла

* **Файл**: [`tests/unit/378-junc17-move-junction-four-point-merge-and-leader.test.ts`](./unit/378-junc17-move-junction-four-point-merge-and-leader.test.ts)
* **Класс эквивалентности**: `JUNC-17 (Move Junction Four Point Merge And Leader)`
* **Описание**: Проверяет пересчет маршрута 4-точечной стрелки слияния и синхронизацию точек выноски leaderPoints при перемещении узла.

#### Предусловия:
* - Стрелка слияния с выноской.

#### Выполняемые действия:
1. Переместить узел слияния.
2. Проверить points и leaderPoints.

#### Ожидаемый результат:
Маршрут перетрассирован, точки выноски обновлены.

---

### ТЕСТ №379: Математика: Формирование скоса ветвления на вертикальном родительском стволе

* **Файл**: [`tests/unit/379-math09-vertical-parent-horizontal-branch-lead-in.test.ts`](./unit/379-math09-vertical-parent-horizontal-branch-lead-in.test.ts)
* **Класс эквивалентности**: `MATH-09 (Vertical Parent Horizontal Branch Lead In)`
* **Описание**: Проверяет добавление 15px скоса в getRenderPointsForArrow для горизонтальной ветви, отходящей от вертикального ствола Управления.

#### Предусловия:
* - Вертикальный ствол и горизонтальная ветвь.

#### Выполняемые действия:
1. Вызвать getRenderPointsForArrow.
2. Проверить добавление направляющей точки скоса.

#### Ожидаемый результат:
В массив точек добавлен начальный скос по направлению потока.

---

### ТЕСТ №38: Геометрия: Огибание функциональных блоков коридором стрелки

* **Файл**: [`tests/unit/38-geom03-obstacle-avoidance-around-blocks.test.ts`](./unit/38-geom03-obstacle-avoidance-around-blocks.test.ts)
* **Класс эквивалентности**: `GEOM-03 (Obstacle Avoidance)`
* **Описание**: Проверяет автоматическое огибание функционального блока, расположенного между источником и целью стрелки.

#### Предусловия:
* - Блок-препятствие расположен прямо на пути прямой линии между точками.

#### Выполняемые действия:
1. Построить ортогональный маршрут через область с блоком-препятствием.
2. Проверить пересечение сегментов стрелки с телом блока.

#### Ожидаемый результат:
Маршрут огибает блок снаружи с отступом не менее 20px, ноль пересечений с телом блока.

---

### ТЕСТ №380: Математика: Формирование скоса слияния на вертикальном родительском стволе

* **Файл**: [`tests/unit/380-math10-vertical-parent-horizontal-merge-lead-in.test.ts`](./unit/380-math10-vertical-parent-horizontal-merge-lead-in.test.ts)
* **Класс эквивалентности**: `MATH-10 (Vertical Parent Horizontal Merge Lead In)`
* **Описание**: Проверяет добавление 15px скоса в getRenderPointsForArrow для горизонтальной стрелки, вливающейся в вертикальный ствол.

#### Предусловия:
* - Вертикальный ствол и стрелка слияния.

#### Выполняемые действия:
1. Вызвать getRenderPointsForArrow для стрелки слияния.
2. Проверить добавление завершающего скоса.

#### Ожидаемый результат:
В массив точек добавлен завершающий скос слияния.

---

### ТЕСТ №381: Перепривязка стрелки: Запрет отвязывания цели при непривязанном источнике

* **Файл**: [`tests/unit/381-recon20-reject-target-unattached-when-source-unattached.test.ts`](./unit/381-recon20-reject-target-unattached-when-source-unattached.test.ts)
* **Класс эквивалентности**: `RECON-20 (Reject Target Unattached When Source Unattached)`
* **Описание**: Проверяет отклонение отвязывания цели стрелки в пустоту, если её источник уже является непривязанным (unattached), предотвращая появление стрелок, полностью висящих в воздухе.

#### Предусловия:
* - Стрелка с source.type === 'unattached'.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint для цели в свободное поле холста.
2. Проверить возврат false и предупреждение.

#### Ожидаемый результат:
Операция отклонена (false), оба конца не могут быть одновременно отвязаны.

---

### ТЕСТ №382: Перепривязка стрелки: Запрет отвязывания источника при непривязанной цели

* **Файл**: [`tests/unit/382-recon21-reject-source-unattached-when-target-unattached.test.ts`](./unit/382-recon21-reject-source-unattached-when-target-unattached.test.ts)
* **Класс эквивалентности**: `RECON-21 (Reject Source Unattached When Target Unattached)`
* **Описание**: Проверяет отклонение отвязывания источника стрелки, если её цель уже является непривязанной.

#### Предусловия:
* - Стрелка с target.type === 'unattached'.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint для источника в свободное поле холста.
2. Проверить возврат false.

#### Ожидаемый результат:
Операция отклонена (false).

---

### ТЕСТ №383: Перепривязка стрелки: Удаление старого узла при отрыве цели стрелки

* **Файл**: [`tests/unit/383-recon22-reconnect-target-cleans-up-old-junction.test.ts`](./unit/383-recon22-reconnect-target-cleans-up-old-junction.test.ts)
* **Класс эквивалентности**: `RECON-22 (Reconnect Target Cleans Up Old Junction)`
* **Описание**: Проверяет автоматическое удаление узла слияния из массива junctions при перепривязке стрелки слияния в свободное поле.

#### Предусловия:
* - Стрелка с target.type: 'junction'.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint для цели в свободное поле.
2. Проверить удаление узла из diag.junctions.

#### Ожидаемый результат:
Осиротевший узел слияния удален.

---

### ТЕСТ №384: Перепривязка стрелки: Удаление старого узла при отрыве источника ветви

* **Файл**: [`tests/unit/384-recon23-reconnect-source-cleans-up-old-junction.test.ts`](./unit/384-recon23-reconnect-source-cleans-up-old-junction.test.ts)
* **Класс эквивалентности**: `RECON-23 (Reconnect Source Cleans Up Old Junction)`
* **Описание**: Проверяет автоматическое удаление узла ветвления из массива junctions при перепривязке источника ветви в свободное поле.

#### Предусловия:
* - Стрелка с source.type: 'junction'.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint для источника в свободное поле.
2. Проверить удаление узла.

#### Ожидаемый результат:
Осиротевший узел ветвления удален.

---

### ТЕСТ №385: Перепривязка стрелки: Создание узла ветвления при перепривязке источника к сегменту

* **Файл**: [`tests/unit/385-recon24-reconnect-source-to-segment-creates-junction.test.ts`](./unit/385-recon24-reconnect-source-to-segment-creates-junction.test.ts)
* **Класс эквивалентности**: `RECON-24 (Reconnect Source To Segment Creates Junction)`
* **Описание**: Проверяет генерацию нового узла типа 'branch' в диаграмме при перепривязке источника к сегменту другой стрелки.

#### Предусловия:
* - Стрелка ствола и независимая стрелка.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с newEndpoint типа 'arrow_segment'.
2. Проверить появление нового узла ветвления.

#### Ожидаемый результат:
Создан узел типа 'branch', стрелка подключена к узлу.

---

### ТЕСТ №386: Перепривязка стрелки: Пересчет выносной линии при перепривязке стрелки

* **Файл**: [`tests/unit/386-recon25-reconnect-arrow-with-leader-updates-leader-points.test.ts`](./unit/386-recon25-reconnect-arrow-with-leader-updates-leader-points.test.ts)
* **Класс эквивалентности**: `RECON-25 (Reconnect Arrow With Leader Updates Points)`
* **Описание**: Проверяет автоматический пересчет массива точек выноски leaderPoints при перепривязке стрелки с активной выноской текста.

#### Предусловия:
* - Стрелка с showLeader: true и labelPos.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint для целевого блока.
2. Проверить наличие и валидность leaderPoints.

#### Ожидаемый результат:
Точки выносной линии пересчитаны.

---

### ТЕСТ №387: Хранилище: Наследование цвета родительского ствола при создании ветви

* **Файл**: [`tests/unit/387-store81-branch-inherits-parent-trunk-color.test.ts`](./unit/387-store81-branch-inherits-parent-trunk-color.test.ts)
* **Класс эквивалентности**: `STORE-81 (Branch Inherits Parent Trunk Color)`
* **Описание**: Проверяет автоматическое присвоение цвета родительского ствола (color) новой дочерней ветви при её создании от узла ветвления на цветном стволе.

#### Предусловия:
* - Цветной родительский ствол (color: '#f59e0b') и узел ветвления.

#### Выполняемые действия:
1. Создать дочернюю ветвь от узла junc.id.
2. Проверить цвет созданной ветви.

#### Ожидаемый результат:
Дочерняя ветвь унаследовала цвет '#f59e0b'.

---

### ТЕСТ №388: Хранилище: Пересчет выноски при сбросе маршрута стрелки

* **Файл**: [`tests/unit/388-store82-reset-arrow-route-recalculates-leader-points.test.ts`](./unit/388-store82-reset-arrow-route-recalculates-leader-points.test.ts)
* **Класс эквивалентности**: `STORE-82 (Reset Arrow Route Recalculates Leader Points)`
* **Описание**: Проверяет автоматическую регенерацию точек выносной линии при вызове resetArrowRoute для стрелки с выноской.

#### Предусловия:
* - Стрелка с showLeader: true и произвольной трассой.

#### Выполняемые действия:
1. Вызвать store.resetArrowRoute(a.id).
2. Проверить leaderPoints.

#### Ожидаемый результат:
Точки выноски согласованы с новым сброшенным маршрутом.

---

### ТЕСТ №389: Хранилище: Каскадный пересчет выноски дочерней ветви при сдвиге родительского ствола

* **Файл**: [`tests/unit/389-store83-shift-trunk-updates-child-leader-points.test.ts`](./unit/389-store83-shift-trunk-updates-child-leader-points.test.ts)
* **Класс эквивалентности**: `STORE-83 (Shift Trunk Updates Child Leader Points)`
* **Описание**: Проверяет обновление точек выносной линии leaderPoints у дочерней стрелки при перемещении сегмента родительского ствола.

#### Предусловия:
* - Ствол и дочерняя ветвь с выноской.

#### Выполняемые действия:
1. Сдвинуть сегмент ствола через shiftArrowSegment.
2. Проверить leaderPoints у дочерней ветви.

#### Ожидаемый результат:
Выноска дочерней стрелки синхронно пересчитана.

---

### ТЕСТ №39: Геометрия: Запрет прилипания в угловой зоне отчуждения (< 5px от угла)

* **Файл**: [`tests/unit/39-geom04-reject-snap-in-corner-exclusion-zone.test.ts`](./unit/39-geom04-reject-snap-in-corner-exclusion-zone.test.ts)
* **Класс эквивалентности**: `GEOM-04 (Corner Exclusion Zone)`
* **Описание**: Проверяет запрет размещения портов стрелок в углах блока (отступ менее 5px от угловых вершин блока запрещен стандартом).

#### Предусловия:
* - Блок расположен на координатах (300, 200), угол в точке (300, 200).

#### Выполняемые действия:
1. Проверить валидацию точки подключения на расстоянии 2px от угла блока.
2. Проверить отклонение точки правилом валидации.

#### Ожидаемый результат:
Точка привязки в угловой зоне отклоняется валидатором.

---

### ТЕСТ №390: Хранилище: Каскадный пересчет выноски стрелки слияния при сдвиге родительского ствола

* **Файл**: [`tests/unit/390-store84-shift-trunk-updates-merge-leader-points.test.ts`](./unit/390-store84-shift-trunk-updates-merge-leader-points.test.ts)
* **Класс эквивалентности**: `STORE-84 (Shift Trunk Updates Merge Leader Points)`
* **Описание**: Проверяет обновление точек выносной линии leaderPoints у стрелки слияния при сдвиге сегмента принимающего ствола.

#### Предусловия:
* - Ствол и стрелка слияния с выноской.

#### Выполняемые действия:
1. Сдвинуть сегмент ствола через shiftArrowSegment.
2. Проверить leaderPoints стрелки слияния.

#### Ожидаемый результат:
Выноска стрелки слияния пересчитана.

---

### ТЕСТ №391: Хранилище: Пересчет выноски при удалении промежуточной точки стрелки

* **Файл**: [`tests/unit/391-store85-remove-arrow-point-recalculates-leader.test.ts`](./unit/391-store85-remove-arrow-point-recalculates-leader.test.ts)
* **Класс эквивалентности**: `STORE-85 (Remove Arrow Point Recalculates Leader)`
* **Описание**: Проверяет обновление точек выносной линии при удалении промежуточного изгиба стрелки через removeArrowPoint.

#### Предусловия:
* - Стрелка с 5 точками и выноской.

#### Выполняемые действия:
1. Вызвать removeArrowPoint.
2. Проверить leaderPoints.

#### Ожидаемый результат:
Выноска пересчитана для сокращенной трассы.

---

### ТЕСТ №392: Хранилище: Пересчет выноски при удалении сегмента стрелки

* **Файл**: [`tests/unit/392-store86-remove-arrow-segment-recalculates-leader.test.ts`](./unit/392-store86-remove-arrow-segment-recalculates-leader.test.ts)
* **Класс эквивалентности**: `STORE-86 (Remove Arrow Segment Recalculates Leader)`
* **Описание**: Проверяет обновление точек выносной линии при удалении сегмента стрелки через removeArrowSegment.

#### Предусловия:
* - Стрелка с несколькими сегментами и выноской.

#### Выполняемые действия:
1. Вызвать removeArrowSegment.
2. Проверить leaderPoints.

#### Ожидаемый результат:
Выноска пересчитана.

---

### ТЕСТ №393: Узлы: Ортогонализация 2-точечной ветви при смещении узла

* **Файл**: [`tests/unit/393-junc18-move-junction-reroutes-diagonal-two-point-branch.test.ts`](./unit/393-junc18-move-junction-reroutes-diagonal-two-point-branch.test.ts)
* **Класс эквивалентности**: `JUNC-18 (Move Junction Reroutes Diagonal Two Point Branch)`
* **Описание**: Проверяет ортогонализацию 2-точечной дочерней стрелки через buildOrthogonalRoute при смещении узла, сделавшем её диагональной.

#### Предусловия:
* - Узел соединен со входом блока прямой линией.

#### Выполняемые действия:
1. Сместить узел по оси Y.
2. Проверить points.length >= 3.

#### Ожидаемый результат:
Диагональная 2-точечная стрелка перестроена в ортогональную ломаную.

---

### ТЕСТ №394: Узлы: Адаптация 3-точечной стрелки слияния при сдвиге узла

* **Файл**: [`tests/unit/394-junc19-move-junction-updates-three-point-merge-from-top.test.ts`](./unit/394-junc19-move-junction-updates-three-point-merge-from-top.test.ts)
* **Класс эквивалентности**: `JUNC-19 (Move Junction Updates Three Point Merge)`
* **Описание**: Проверяет обновление промежуточного угла 3-точечной стрелки слияния при смещении узла на магистрали.

#### Предусловия:
* - Ствол между блоками и 3-точечная стрелка слияния из правого выхода блока 3.

#### Выполняемые действия:
1. Сместить узел через moveJunction.
2. Проверить points[1].x === junc.point.x.

#### Ожидаемый результат:
Промежуточный изгиб выровнен по X узла.

---

### ТЕСТ №395: Математика: Прямые отрезки L вместо дуг при нулевой длине и коллинеарности

* **Файл**: [`tests/unit/395-math11-points-to-svg-path-collinear-and-zero-length.test.ts`](./unit/395-math11-points-to-svg-path-collinear-and-zero-length.test.ts)
* **Класс эквивалентности**: `MATH-11 (Points To SVG Path Collinear And Zero Length)`
* **Описание**: Проверяет генерацию SVG-команд L x,y без дуговых скруглений A при нулевой длине сегментов (len === 0) или строгой коллинеарности (cross < 0.001).

#### Предусловия:
* - Массив точек с нулевым смещением и прямым участком.

#### Выполняемые действия:
1. Вызвать pointsToSvgPath с точками [(0,0), (0,0), (100,0)].
2. Проверить полученную строку SVG path.

#### Ожидаемый результат:
В строке пути отсутствуют команды скругления 'A', трасса построена прямыми отрезками 'L'.

---

### ТЕСТ №396: Математика: Вертикальная ориентация вырожденного сегмента при контакте сверху

* **Файл**: [`tests/unit/396-math12-zero-length-segment-source-side-top.test.ts`](./unit/396-math12-zero-length-segment-source-side-top.test.ts)
* **Класс эквивалентности**: `MATH-12 (Zero Length Segment Source Side Top)`
* **Описание**: Проверяет присвоение вертикальной ориентации (orientation: 'vertical') отрезку нулевой длины (dx=0, dy=0), начинающемуся на верхней грани блока (sourceSide: 'top').

#### Предусловия:
* - Две совпадающие точки.

#### Выполняемые действия:
1. Вызвать getSegmentsFromPoints с sourceSide: 'top'.
2. Проверить orientation первого сегмента.

#### Ожидаемый результат:
Ориентация определена как 'vertical'.

---

### ТЕСТ №397: Трассировка: Построение ортогонального маршрута при пустом массиве блоков

* **Файл**: [`tests/unit/397-router23-build-orthogonal-route-empty-blocks.test.ts`](./unit/397-router23-build-orthogonal-route-empty-blocks.test.ts)
* **Класс эквивалентности**: `ROUTE-23 (Build Orthogonal Route Empty Blocks)`
* **Описание**: Проверяет возврат прямого ортогонального маршрута без падений при вызове buildOrthogonalRoute с blocks: [].

#### Предусловия:
* - Эндпоинты источника и цели, blocks = [].

#### Выполняемые действия:
1. Вызвать buildOrthogonalRoute.
2. Проверить points.length >= 2.

#### Ожидаемый результат:
Построен валидный ортогональный маршрут.

---

### ТЕСТ №398: Трассировка: Прямой 2-точечный вертикальный ввод в нижнюю грань

* **Файл**: [`tests/unit/398-router24-route-into-bottom-with-matching-x.test.ts`](./unit/398-router24-route-into-bottom-with-matching-x.test.ts)
* **Класс эквивалентности**: `ROUTE-24 (Route Into Bottom With Matching X)`
* **Описание**: Проверяет построение строго вертикального 2-точечного отрезка при подключении в нижнюю грань блока снизу при соосности X (dX <= 10px, pStart.y > pEnd.y).

#### Предусловия:
* - Источник (500, 700), цель (502, 500) на нижней грани блока.

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить points.length === 2.

#### Ожидаемый результат:
Построен прямой вертикальный отрезок из 2 точек.

---

### ТЕСТ №399: Перемещение блока: Перепривязка подписи к альтернативному сегменту при смене ориентации

* **Файл**: [`tests/unit/399-move20-rebind-label-to-alternate-orientation-segment.test.ts`](./unit/399-move20-rebind-label-to-alternate-orientation-segment.test.ts)
* **Класс эквивалентности**: `MOVE-20 (Rebind Label To Alternate Orientation Segment)`
* **Описание**: Проверяет корректное сохранение и обновление координат labelPos при смещении блока, когда привязанный сегмент меняет ориентацию.

#### Предусловия:
* - Стрелка с надписью.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove с перемещением блока.
2. Проверить координаты labelPos.

#### Ожидаемый результат:
Координаты подписи валидны и согласованы с новым положением сегментов.

---

### ТЕСТ №40: Геометрия: Разрешение перпендикулярного пересечения стрелок

* **Файл**: [`tests/unit/40-geom05-allow-perpendicular-crossing.test.ts`](./unit/40-geom05-allow-perpendicular-crossing.test.ts)
* **Класс эквивалентности**: `GEOM-05 (Perpendicular Crossing Standard)`
* **Описание**: Проверяет соответствие стандарту IDEF0: прямое перпендикулярное пересечение двух стрелок под 90 градусов является валидным.

#### Предусловия:
* - Горизонтальная стрелка пересекает вертикальную стрелку под прямым углом.

#### Выполняемые действия:
1. Проверить обнаружение пересечения.
2. Убедиться, что пересечение не трактуется как коллинеарная ошибка.

#### Ожидаемый результат:
Перпендикулярное пересечение разрешено стандартом IDEF0.

---

### ТЕСТ №400: Адаптация при ресайзе: Синхронизация 3-точечной стрелки на боковых гранях

* **Файл**: [`tests/unit/400-resize08-adapt-three-point-arrow-lateral-sides.test.ts`](./unit/400-resize08-adapt-three-point-arrow-lateral-sides.test.ts)
* **Класс эквивалентности**: `RESIZE-08 (Adapt Three Point Arrow Lateral Sides)`
* **Описание**: Проверяет обновление промежуточной точки 3-точечной стрелки, входящей в левую грань (Вход) или выходящей из правой грани (Выход), при изменении высоты блока.

#### Предусловия:
* - 3-точечная стрелка на боковой грани блока.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize.
2. Проверить points[1].y === target.point.y.

#### Ожидаемый результат:
Промежуточная точка выровнена по высоте бокового контактного порта.

---

### ТЕСТ №401: Перепривязка стрелки: Бросок конца стрелки снизу внутрь блока (Механизм)

* **Файл**: [`tests/unit/401-recon26-drop-target-inside-block-snaps-to-bottom.test.ts`](./unit/401-recon26-drop-target-inside-block-snaps-to-bottom.test.ts)
* **Класс эквивалентности**: `RECON-26 (Drop Target Inside Block Snaps To Bottom)`
* **Описание**: Проверяет автоматическую привязку цели к нижней грани блока (Механизм) при отпускании конца стрелки внутри блока, когда источник находится ниже блока.

#### Предусловия:
* - Стрелка с источником ниже целевого блока.

#### Выполняемые действия:
1. Вызвать reconnectArrowEndpoint с точкой внутри блока.
2. Проверить target.side === 'bottom' и role === 'mechanism'.

#### Ожидаемый результат:
Стрелка привязана к нижней грани (Механизм).

---

### ТЕСТ №402: Перепривязка стрелки: Выравнивание правого граничного выхода при смене источника

* **Файл**: [`tests/unit/402-recon27-reconnect-source-updates-border-right-y.test.ts`](./unit/402-recon27-reconnect-source-updates-border-right-y.test.ts)
* **Класс эквивалентности**: `RECON-27 (Reconnect Source Updates Border Right Y)`
* **Описание**: Проверяет автоматическое выравнивание координаты Y целевой правой границы (target.point.y) по высоте нового источника при перепривязке начала стрелки к блоку.

#### Предусловия:
* - Стрелка, идущая на правую границу листа.

#### Выполняемые действия:
1. Перепривязать источник к новому блоку на высоте Y=400.
2. Проверить целевую точку target.point.y === 400.

#### Ожидаемый результат:
Целевая граница листа выровнена по высоте нового блока.

---

### ТЕСТ №403: Перепривязка стрелки: Запрет привязки источника стрелки к невалидной грани

* **Файл**: [`tests/unit/403-recon28-reconnect-source-invalid-side-rejected.test.ts`](./unit/403-recon28-reconnect-source-invalid-side-rejected.test.ts)
* **Класс эквивалентности**: `RECON-28 (Reconnect Source Invalid Side Rejected)`
* **Описание**: Проверяет отклонение перепривязки источника стрелки к левой грани блока (источник в IDEF0 может быть только с правой грани).

#### Предусловия:
* - Стрелка между блоками.

#### Выполняемые действия:
1. Попытаться перепривязать источник к side: 'left'.
2. Проверить возврат false.

#### Ожидаемый результат:
Операция отклонена (false).

---

### ТЕСТ №404: Перепривязка стрелки: Удаление узла ветвления при смене ключа источника через инспектор

* **Файл**: [`tests/unit/404-recon29-set-endpoint-key-cleans-up-old-branch-junction.test.ts`](./unit/404-recon29-set-endpoint-key-cleans-up-old-branch-junction.test.ts)
* **Класс эквивалентности**: `RECON-29 (Set Endpoint Key Cleans Up Old Branch Junction)`
* **Описание**: Проверяет удаление старого узла ветвления из diag.junctions при смене порта источника через setArrowEndpointKey.

#### Предусловия:
* - Ветвь от узла ствола.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey для источника на блок.
2. Проверить отсутствие старого узла в diag.junctions.

#### Ожидаемый результат:
Старый узел ветвления очищен.

---

### ТЕСТ №405: Перепривязка стрелки: Удаление узла слияния при смене ключа цели через инспектор

* **Файл**: [`tests/unit/405-recon30-set-endpoint-key-cleans-up-old-merge-junction.test.ts`](./unit/405-recon30-set-endpoint-key-cleans-up-old-merge-junction.test.ts)
* **Класс эквивалентности**: `RECON-30 (Set Endpoint Key Cleans Up Old Merge Junction)`
* **Описание**: Проверяет удаление старого узла слияния из diag.junctions при смене порта цели стрелки слияния через setArrowEndpointKey.

#### Предусловия:
* - Стрелка слияния в узел ствола.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey для цели на блок.
2. Проверить отсутствие узла.

#### Ожидаемый результат:
Старый узел слияния очищен.

---

### ТЕСТ №406: Геометрия: Синхронизация сегмента у узла при попытке сдвига

* **Файл**: [`tests/unit/406-geom21-shift-segment-attached-to-junction-updates-junction-y.test.ts`](./unit/406-geom21-shift-segment-attached-to-junction-updates-junction-y.test.ts)
* **Класс эквивалентности**: `GEOM-21 (Shift Segment Attached To Junction Synchronizes With Trunk)`
* **Описание**: Проверяет сохранение целостности и синхронизацию узла ветвления и первого сегмента дочерней стрелки с родительской магистралью через synchronizeJunctions.

#### Предусловия:
* - Стрелка ветви с source.type: 'junction'.

#### Выполняемые действия:
1. Вызвать shiftArrowSegment для первого сегмента ветви.
2. Проверить согласованность координат узла и точки привязки ветви.

#### Ожидаемый результат:
Координаты узла и начала ветви согласованы и привязаны к стволу.

---

### ТЕСТ №407: Геометрия: Сдвиг вертикального сегмента у узла обновляет координату X узла

* **Файл**: [`tests/unit/407-geom22-shift-segment-attached-to-junction-updates-junction-x.test.ts`](./unit/407-geom22-shift-segment-attached-to-junction-updates-junction-x.test.ts)
* **Класс эквивалентности**: `GEOM-22 (Shift Segment Attached To Junction Updates Junction X)`
* **Описание**: Проверяет синхронное смещение координаты X узла слияния при сдвиге последнего вертикального сегмента входящей стрелки.

#### Предусловия:
* - Стрелка слияния с target.type: 'junction'.

#### Выполняемые действия:
1. Сдвинуть последний сегмент стрелки по горизонтали на X=530.
2. Проверить junc.point.x === 530.

#### Ожидаемый результат:
Координата X узла синхронизирована.

---

### ТЕСТ №408: Геометрия: Ограничение сдвига вертикального сегмента шириной блока

* **Файл**: [`tests/unit/408-geom23-shift-vertical-segment-clamped-to-block-width.test.ts`](./unit/408-geom23-shift-vertical-segment-clamped-to-block-width.test.ts)
* **Класс эквивалентности**: `GEOM-23 (Shift Vertical Segment Clamped To Block Width)`
* **Описание**: Проверяет удержание координаты X вертикального сегмента стрелки Управления/Механизма в пределах ширины блока (clampToRange(newCoord, block.x, block.x + block.width)).

#### Предусловия:
* - Блок x=300..510, вертикальная стрелка.

#### Выполняемые действия:
1. Сдвинуть сегмент далеко влево (X=100).
2. Проверить удержание X >= 300.

#### Ожидаемый результат:
Сегмент удержан на левой границе блока X=300.

---

### ТЕСТ №409: Геометрия: Синхронизация координаты X входящего слияния при сдвиге ствола

* **Файл**: [`tests/unit/409-geom24-shift-trunk-segment-updates-merge-arrow-x.test.ts`](./unit/409-geom24-shift-trunk-segment-updates-merge-arrow-x.test.ts)
* **Класс эквивалентности**: `GEOM-24 (Shift Trunk Segment Updates Merge Arrow X)`
* **Описание**: Проверяет синхронный сдвиг координаты X последнего сегмента входящей стрелки слияния при перемещении сегмента магистрали.

#### Предусловия:
* - Ствол и стрелка слияния в узел ствола.

#### Выполняемые действия:
1. Сдвинуть сегмент ствола.
2. Проверить координату точки контакта стрелки слияния.

#### Ожидаемый результат:
Точка контакта стрелки слияния обновлена.

---

### ТЕСТ №41: Геометрия: Запрет коллинеарного наложения стрелок

* **Файл**: [`tests/unit/41-geom06-prohibit-collinear-overlap.test.ts`](./unit/41-geom06-prohibit-collinear-overlap.test.ts)
* **Класс эквивалентности**: `GEOM-06 (Collinear Overlap Prohibited)`
* **Описание**: Проверяет выявление недопустимого параллельного перекрытия сегментов разных стрелок на одной прямой.

#### Предусловия:
* - Два параллельных горизонтальных сегмента лежат на одной координате Y и пересекаются по X.

#### Выполняемые действия:
1. Проверить факт коллинеарного перекрытия между отрезками [100..400] и [200..500].
2. Убедиться в фиксации коллинеарности.

#### Ожидаемый результат:
Коллинеарное наложение зафиксировано для предотвращения слияния линий.

---

### ТЕСТ №410: Геометрия: Перетрассировка 4-точечной стрелки при удалении точки

* **Файл**: [`tests/unit/410-geom25-remove-arrow-point-four-points-fallback.test.ts`](./unit/410-geom25-remove-arrow-point-four-points-fallback.test.ts)
* **Класс эквивалентности**: `GEOM-25 (Remove Arrow Point Four Points Fallback)`
* **Описание**: Проверяет автоматический вызов buildOrthogonalRoute при вызове removeArrowPoint на стрелке из 4 точек, гарантируя сохранение валидной ортогональности.

#### Предусловия:
* - Стрелка из 4 точек.

#### Выполняемые действия:
1. Вызвать removeArrowPoint(a.id, 1).
2. Проверить points.length >= 2.

#### Ожидаемый результат:
Стрелка успешно перетрассирована роутером.

---

### ТЕСТ №411: Геометрия: Перетрассировка при удалении крайнего сегмента стрелки

* **Файл**: [`tests/unit/411-geom26-remove-arrow-segment-edge-fallback.test.ts`](./unit/411-geom26-remove-arrow-segment-edge-fallback.test.ts)
* **Класс эквивалентности**: `GEOM-26 (Remove Arrow Segment Edge Fallback)`
* **Описание**: Проверяет автоматический вызов buildOrthogonalRoute при попытке удаления крайнего сегмента (segmentIndex === 0).

#### Предусловия:
* - Многоточечная стрелка.

#### Выполняемые действия:
1. Вызвать removeArrowSegment(a.id, 0).
2. Проверить сохранение корректного маршрута.

#### Ожидаемый результат:
Стрелка сохранена и перетрассирована.

---

### ТЕСТ №412: Хранилище: Автотрассировка при создании стрелки с пустым массивом points

* **Файл**: [`tests/unit/412-store87-create-arrow-empty-points-auto-routes.test.ts`](./unit/412-store87-create-arrow-empty-points-auto-routes.test.ts)
* **Класс эквивалентности**: `STORE-87 (Create Arrow Empty Points Auto Routes)`
* **Описание**: Проверяет автоматическое построение маршрута через buildOrthogonalRoute при вызове createArrow с points: [].

#### Предусловия:
* - Блоки источника и цели.

#### Выполняемые действия:
1. Вызвать store.createArrow с points: [].
2. Проверить points.length >= 2.

#### Ожидаемый результат:
Маршрут автоматически проложен роутером.

---

### ТЕСТ №413: Хранилище: Пересчет целевого порта при смене роли стрелки на Выход

* **Файл**: [`tests/unit/413-store88-change-arrow-role-to-output-recalculates-target.test.ts`](./unit/413-store88-change-arrow-role-to-output-recalculates-target.test.ts)
* **Класс эквивалентности**: `STORE-88 (Change Arrow Role To Output Recalculates Target)`
* **Описание**: Проверяет пересчет целевой точки контакта на правую сторону целевого блока при установке роли 'output' через setArrowRole.

#### Предусловия:
* - Стрелка между блоками.

#### Выполняемые действия:
1. Вызвать store.setArrowRole(a.id, 'output').
2. Проверить updated.role === 'output'.

#### Ожидаемый результат:
Целевой порт перенесен на правую сторону блока.

---

### ТЕСТ №414: Хранилище: Пересчет выноски текста при смене роли стрелки

* **Файл**: [`tests/unit/414-store89-change-arrow-role-updates-leader-points.test.ts`](./unit/414-store89-change-arrow-role-updates-leader-points.test.ts)
* **Класс эквивалентности**: `STORE-89 (Change Arrow Role Updates Leader Points)`
* **Описание**: Проверяет синхронный пересчет точек выносной линии leaderPoints при вызове setArrowRole для стрелки с выноской.

#### Предусловия:
* - Стрелка с showLeader: true и labelPos.

#### Выполняемые действия:
1. Вызвать store.setArrowRole(a.id, 'control').
2. Проверить leaderPoints.

#### Ожидаемый результат:
Выноска синхронизирована с новым маршрутом.

---

### ТЕСТ №415: Хранилище: Спрямление граничной стрелки выравнивает координату границы

* **Файл**: [`tests/unit/415-store90-straighten-arrow-border-source-adjusts-coord.test.ts`](./unit/415-store90-straighten-arrow-border-source-adjusts-coord.test.ts)
* **Класс эквивалентности**: `STORE-90 (Straighten Arrow Border Source Adjusts Coord)`
* **Описание**: Проверяет адаптацию координаты граничного источника (source.point.y) при спрямлении стрелки через straightenArrow.

#### Предусловия:
* - Стрелка с левой границы листа.

#### Выполняемые действия:
1. Вызвать straightenArrow(a.id).
2. Проверить выравнивание source.point.y по target.point.y.

#### Ожидаемый результат:
Координата границы листа выровнена по цели.

---

### ТЕСТ №416: Узлы: Перетрассировка 4-точечной ветви при смещении родительского узла

* **Файл**: [`tests/unit/416-junc20-move-junction-reroutes-four-point-child-branch.test.ts`](./unit/416-junc20-move-junction-reroutes-four-point-child-branch.test.ts)
* **Класс эквивалентности**: `JUNC-20 (Move Junction Reroutes Four Point Child Branch)`
* **Описание**: Проверяет вызов buildOrthogonalRoute для дочерней ветви из 4+ точек при смещении узла на магистрали.

#### Предусловия:
* - Ствол и 4-точечная дочерняя ветвь.

#### Выполняемые действия:
1. Сместить узел через moveJunction.
2. Проверить points[0].x === junc.point.x.

#### Ожидаемый результат:
Начало дочерней ветви смещено вслед за узлом.

---

### ТЕСТ №417: Трассировка: Обходной коридор входа в верхнюю грань блока снизу

* **Файл**: [`tests/unit/417-router25-route-into-top-when-source-below-target.test.ts`](./unit/417-router25-route-into-top-when-source-below-target.test.ts)
* **Класс эквивалентности**: `ROUTE-25 (Route Into Top When Source Below Target)`
* **Описание**: Проверяет построение безопасного огибающего коридора со stepY = pEnd.y - 30 при трассировке в верхний порт блока (Управление), когда источник расположен ниже блока.

#### Предусловия:
* - Источник (600, 500), цель на верхней грани блока (400, 200).

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить минимальную координату Y в маршруте.

#### Ожидаемый результат:
Построен безопасный обходной путь с заходом сверху.

---

### ТЕСТ №418: Трассировка: Обходной коридор входа в нижнюю грань блока сверху

* **Файл**: [`tests/unit/418-router26-route-into-bottom-when-source-above-target.test.ts`](./unit/418-router26-route-into-bottom-when-source-above-target.test.ts)
* **Класс эквивалентности**: `ROUTE-26 (Route Into Bottom When Source Above Target)`
* **Описание**: Проверяет построение огибающего коридора со stepY = pEnd.y + 30 при трассировке в нижний порт блока (Механизм), когда источник расположен выше блока.

#### Предусловия:
* - Источник (200, 100), цель на нижней грани блока (500, 400).

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить максимальную координату Y в маршруте.

#### Ожидаемый результат:
Построен безопасный обходной путь с заходом снизу.

---

### ТЕСТ №419: Адаптация при ресайзе: Синхронизация 3-точечной стрелки, исходящей справа

* **Файл**: [`tests/unit/419-resize09-adapt-three-point-arrow-source-right-side.test.ts`](./unit/419-resize09-adapt-three-point-arrow-source-right-side.test.ts)
* **Класс эквивалентности**: `RESIZE-09 (Adapt Three Point Arrow Source Right Side)`
* **Описание**: Проверяет обновление промежуточной точки pts[1].y = arrow.source.point.y для 3-точечной стрелки, выходящей из правой грани блока, при изменении его высоты.

#### Предусловия:
* - 3-точечная стрелка из правого выхода блока.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockResize с изменением высоты блока.
2. Проверить points[1].y === source.point.y.

#### Ожидаемый результат:
Промежуточная точка выровнена по новой высоте выхода.

---

### ТЕСТ №42: Геометрия: Запрет сквозного пересечения тела блока стрелкой

* **Файл**: [`tests/unit/42-geom07-detect-arrow-block-body-penetration.test.ts`](./unit/42-geom07-detect-arrow-block-body-penetration.test.ts)
* **Класс эквивалентности**: `GEOM-07 (Block Body Penetration Prohibited)`
* **Описание**: Проверяет запрет прохождения линии стрелки насквозь через тело функционального блока.

#### Предусловия:
* - Блок расположен в координатах (300, 200, 200, 120).
* - Отрезок проходит от (100, 260) до (700, 260).

#### Выполняемые действия:
1. Вызвать функцию checkSegmentBlockCollision.
2. Проверить результат детекции коллизии.

#### Ожидаемый результат:
Коллизия с телом блока обнаружена (collides === true).

---

### ТЕСТ №420: Перемещение блока: Автотрассировка стрелки при перемещении блока

* **Файл**: [`tests/unit/420-move21-auto-mode-arrow-recalculates-route-on-block-move.test.ts`](./unit/420-move21-auto-mode-arrow-recalculates-route-on-block-move.test.ts)
* **Класс эквивалентности**: `MOVE-21 (Auto Mode Arrow Recalculates Route On Block Move)`
* **Описание**: Проверяет полный пересчет маршрута стрелки с pathMode: 'auto' через buildOrthogonalRoute при смещении связанного блока.

#### Предусловия:
* - Стрелка в режиме auto между двумя блоками.

#### Выполняемые действия:
1. Вызвать adjustArrowOnBlockMove с перемещением блока b1.
2. Проверить points.length >= 2.

#### Ожидаемый результат:
Маршрут автоматически перетрассирован.

---

### ТЕСТ №421: Пересечения: Фиксация коллинеарного наложения горизонтальных отрезков

* **Файл**: [`tests/unit/421-xsect06-check-segment-collinear-horizontal-overlap.test.ts`](./unit/421-xsect06-check-segment-collinear-horizontal-overlap.test.ts)
* **Класс эквивалентности**: `XSECT-06 (Check Segment Collinear Horizontal Overlap)`
* **Описание**: Проверяет обнаружение недопустимого коллинеарного наложения двух независимых горизонтальных сегментов стрелок на одной высоте Y при перекрытии диапазона X.

#### Предусловия:
* - Два отрезка на Y=200 с перекрывающимся диапазоном X (100..400 и 250..500).

#### Выполняемые действия:
1. Вызвать checkSegmentIntersection.
2. Проверить hasIntersection: true, isAllowed: false, type: 'overlap'.

#### Ожидаемый результат:
Зафиксировано коллинеарное наложение сегментов.

---

### ТЕСТ №422: Перемещение блока: Сдвиг подписи на промежуточном горизонтальном коридоре петли

* **Файл**: [`tests/unit/422-move22-middle-horizontal-segment-shifts-label-y.test.ts`](./unit/422-move22-middle-horizontal-segment-shifts-label-y.test.ts)
* **Класс эквивалентности**: `MOVE-22 (Middle Horizontal Segment Shifts Label Y)`
* **Описание**: Проверяет синхронный сдвиг координаты Y подписи стрелки, привязанной к промежуточному горизонтальному сегменту 6-точечной петли обратной связи.

#### Предусловия:
* - 6-точечная стрелка с подписью на среднем горизонтальном звене.

#### Выполняемые действия:
1. Сместить блок b1 вниз по оси Y.
2. Проверить смещение координаты labelPos.y.

#### Ожидаемый результат:
Подпись корректно смещена вслед за промежуточным коридором.

---

### ТЕСТ №423: Перемещение блока: Сдвиг подписи на промежуточном вертикальном коридоре

* **Файл**: [`tests/unit/423-move23-middle-vertical-segment-shifts-label-x.test.ts`](./unit/423-move23-middle-vertical-segment-shifts-label-x.test.ts)
* **Класс эквивалентности**: `MOVE-23 (Middle Vertical Segment Shifts Label X)`
* **Описание**: Проверяет синхронный сдвиг координаты X подписи стрелки, привязанной к промежуточному вертикальному звену.

#### Предусловия:
* - Стрелка с подписью на среднем вертикальном звене.

#### Выполняемые действия:
1. Сместить блок b1 по оси X.
2. Проверить смещение координаты labelPos.x.

#### Ожидаемый результат:
Координата X подписи синхронизирована с промежуточным звеном.

---

### ТЕСТ №424: Перепривязка стрелки: Защитный fallback [srcPt, tgtPt] при сбое роутера цели

* **Файл**: [`tests/unit/424-recon31-fallback-two-points-target-reconnect.test.ts`](./unit/424-recon31-fallback-two-points-target-reconnect.test.ts)
* **Класс эквивалентности**: `RECON-31 (Fallback Two Points Target Reconnect)`
* **Описание**: Проверяет срабатывание защитной ветки points = [srcPt, tgtPt] при отпускании цели стрелки в пустое место, если роутер вернул пустой массив точек.

#### Предусловия:
* - Стрелка из блока.

#### Выполняемые действия:
1. Замокать buildOrthogonalRoute на возврат [].
2. Вызвать reconnectArrowEndpoint для target в свободное поле.
3. Проверить points.length === 2.

#### Ожидаемый результат:
Стрелке безопасно присвоен прямой 2-точечный отрезок [srcPt, tgtPt].

---

### ТЕСТ №425: Перепривязка стрелки: Защитный fallback [srcPt, tgtPt] при сбое роутера источника

* **Файл**: [`tests/unit/425-recon32-fallback-two-points-source-reconnect.test.ts`](./unit/425-recon32-fallback-two-points-source-reconnect.test.ts)
* **Класс эквивалентности**: `RECON-32 (Fallback Two Points Source Reconnect)`
* **Описание**: Проверяет срабатывание защитной ветки points = [srcPt, tgtPt] при отпускании источника стрелки в пустое место холста, если роутер вернул пустой массив точек.

#### Предусловия:
* - Стрелка во вход блока.

#### Выполняемые действия:
1. Замокать buildOrthogonalRoute на возврат [].
2. Вызвать reconnectArrowEndpoint для source в свободное поле.
3. Проверить points.length === 2.

#### Ожидаемый результат:
Стрелке безопасно присвоен 2-точечный отрезок [srcPt, tgtPt].

---

### ТЕСТ №426: Математика: Прямой шаг L curr без скругления при развороте потока на 180 градусов

* **Файл**: [`tests/unit/426-math13-points-to-svg-path-three-collinear-points.test.ts`](./unit/426-math13-points-to-svg-path-three-collinear-points.test.ts)
* **Класс эквивалентности**: `MATH-13 (Points To SVG Path Collinear U-Turn Without Arc)`
* **Описание**: Проверяет генерацию прямого шага L curr.x,curr.y без дуги при развороте вектора сегмента на 180 градусов (коллинеарный разворот, dot < 0, cross < 0.001).

#### Предусловия:
* - Три точки с разворотом: (0, 0), (100, 0), (50, 0).

#### Выполняемые действия:
1. Вызвать pointsToSvgPath.
2. Проверить результат.

#### Ожидаемый результат:
Сгенерирован прямой шаг 'L 100,0' без дуги 'A'.

---

### ТЕСТ №427: Математика: Скос ветвления на вертикальном стволе с восходящим потоком

* **Файл**: [`tests/unit/427-math14-vertical-trunk-upward-branch-bevel.test.ts`](./unit/427-math14-vertical-trunk-upward-branch-bevel.test.ts)
* **Класс эквивалентности**: `MATH-14 (Vertical Trunk Upward Branch Bevel)`
* **Описание**: Проверяет добавление скоса ветвления для горизонтальной ветви, отходящей от вертикального ствола с направлением потока снизу вверх (pEnd.y < pStart.y).

#### Предусловия:
* - Вертикальный ствол снизу вверх (Y от 800 до 100) и горизонтальная ветвь.

#### Выполняемые действия:
1. Вызвать getRenderPointsForArrow.
2. Проверить добавление скоса.

#### Ожидаемый результат:
Добавлен скос с учетом восходящего направления потока.

---

### ТЕСТ №428: Математика: Скос слияния на вертикальном стволе с восходящим потоком

* **Файл**: [`tests/unit/428-math15-vertical-trunk-upward-merge-bevel.test.ts`](./unit/428-math15-vertical-trunk-upward-merge-bevel.test.ts)
* **Класс эквивалентности**: `MATH-15 (Vertical Trunk Upward Merge Bevel)`
* **Описание**: Проверяет добавление скоса слияния для стрелки, входящей в вертикальный ствол с восходящим потоком.

#### Предусловия:
* - Вертикальный ствол снизу вверх и входящая горизонтальная стрелка слияния.

#### Выполняемые действия:
1. Вызвать getRenderPointsForArrow.
2. Проверить добавление скоса.

#### Ожидаемый результат:
Добавлен скос слияния по направлению вверх.

---

### ТЕСТ №429: Трассировка: Обходной коридор входа в верхнюю грань при расположении источника ниже цели

* **Файл**: [`tests/unit/429-router27-route-into-top-when-source-lower-than-target.test.ts`](./unit/429-router27-route-into-top-when-source-lower-than-target.test.ts)
* **Класс эквивалентности**: `ROUTE-27 (Route Into Top When Source Lower Than Target)`
* **Описание**: Проверяет расчет stepY = pEnd.y - 30 и формирование безопасной петли захода в верхний порт блока (Управление), когда источник лежит ниже целевого контакта.

#### Предусловия:
* - Источник (100, 500), цель (500, 200) на грани side: 'top'.

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить точки трассы.

#### Ожидаемый результат:
Построен маршрут с заходом сверху с высотой Y = 170.

---

### ТЕСТ №43: Геометрия: Магнитное прилипание к граням блоков и границам

* **Файл**: [`tests/unit/43-geom08-magnetic-snapping-to-targets.test.ts`](./unit/43-geom08-magnetic-snapping-to-targets.test.ts)
* **Класс эквивалентности**: `GEOM-08 (Magnetic Snapping Engine)`
* **Описание**: Проверяет притяжение курсора к граням блока при наведении в радиусе прилипания 25px.

#### Предусловия:
* - Блок расположен на координатах (400, 300).

#### Выполняемые действия:
1. Задать курсор на расстоянии 10px от грани блока (x: 390, y: 350).
2. Вызвать findSnapTarget.
3. Проверить захват цели прилипания.

#### Ожидаемый результат:
Точка прилипает к левой грани блока с точной координатой x: 400.

---

### ТЕСТ №430: Трассировка: Обходной коридор входа в нижнюю грань при расположении источника выше цели

* **Файл**: [`tests/unit/430-router28-route-into-bottom-when-source-higher-than-target.test.ts`](./unit/430-router28-route-into-bottom-when-source-higher-than-target.test.ts)
* **Класс эквивалентности**: `ROUTE-28 (Route Into Bottom When Source Higher Than Target)`
* **Описание**: Проверяет расчет stepY = pEnd.y + 30 и формирование безопасной петли захода в нижний порт блока (Механизм), когда источник лежит выше целевого контакта.

#### Предусловия:
* - Источник (100, 200), цель (500, 400) на грани side: 'bottom'.

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить точки трассы.

#### Ожидаемый результат:
Построен маршрут с заходом снизу с высотой Y = 430.

---

### ТЕСТ №431: Перепривязка стрелки: Очистка узла источника при выборе 'unattached' через ключ

* **Файл**: [`tests/unit/431-recon33-set-endpoint-key-source-unattached-cleans-junction.test.ts`](./unit/431-recon33-set-endpoint-key-source-unattached-cleans-junction.test.ts)
* **Класс эквивалентности**: `RECON-33 (Set Endpoint Key Source Unattached Cleans Junction)`
* **Описание**: Проверяет удаление старого узла ветвления из diag.junctions при установке источника в статус 'unattached' через setArrowEndpointKey.

#### Предусловия:
* - Стрелка ветви от узла ствола.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey(state, branch.id, 'source', 'unattached').
2. Проверить удаление узла.

#### Ожидаемый результат:
Узел ветвления удален из диаграммы.

---

### ТЕСТ №432: Перепривязка стрелки: Очистка узла цели при выборе 'unattached' через ключ

* **Файл**: [`tests/unit/432-recon34-set-endpoint-key-target-unattached-cleans-junction.test.ts`](./unit/432-recon34-set-endpoint-key-target-unattached-cleans-junction.test.ts)
* **Класс эквивалентности**: `RECON-34 (Set Endpoint Key Target Unattached Cleans Junction)`
* **Описание**: Проверяет удаление узла слияния из diag.junctions при установке цели в статус 'unattached' через setArrowEndpointKey.

#### Предусловия:
* - Стрелка слияния в узел ствола.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey(state, merge.id, 'target', 'unattached').
2. Проверить удаление узла.

#### Ожидаемый результат:
Узел слияния удален из диаграммы.

---

### ТЕСТ №433: Перепривязка стрелки: Очистка узла источника при переключении на границу через ключ

* **Файл**: [`tests/unit/433-recon35-set-endpoint-key-source-border-cleans-junction.test.ts`](./unit/433-recon35-set-endpoint-key-source-border-cleans-junction.test.ts)
* **Класс эквивалентности**: `RECON-35 (Set Endpoint Key Source Border Cleans Junction)`
* **Описание**: Проверяет удаление старого узла ветвления при переключении источника стрелки на границу листа ('border:left') через setArrowEndpointKey.

#### Предусловия:
* - Стрелка ветви от узла.

#### Выполняемые действия:
1. Вызвать setArrowEndpointKey(state, branch.id, 'source', 'border:left').
2. Проверить удаление узла.

#### Ожидаемый результат:
Старый узел ветвления удален.

---

### ТЕСТ №434: Трассировка: 3-точечный заход ветви от узла в нижнюю грань снизу

* **Файл**: [`tests/unit/434-router29-route-into-bottom-when-lower-with-dx.test.ts`](./unit/434-router29-route-into-bottom-when-lower-with-dx.test.ts)
* **Класс эквивалентности**: `ROUTE-29 (Route Into Bottom When Lower With DX)`
* **Описание**: Проверяет построение 3-точечного ортогонального пути [pStart, (pEnd.x, pStart.y), pEnd] при подключении ветви от узла снизу в нижнюю грань блока со смещением по горизонтали.

#### Предусловия:
* - Источник — узел ветвления (100, 500), цель на нижней грани блока (300, 400).

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить points.length === 3.

#### Ожидаемый результат:
Построен 3-точечный ортогональный маршрут.

---

### ТЕСТ №435: Трассировка: Прямой 2-точечный горизонтальный ввод во входную грань

* **Файл**: [`tests/unit/435-router30-route-into-left-side-small-dy.test.ts`](./unit/435-router30-route-into-left-side-small-dy.test.ts)
* **Класс эквивалентности**: `ROUTE-30 (Route Into Left Side Small DY)`
* **Описание**: Проверяет построение строго горизонтального 2-точечного пути при подключении в левую грань блока (Вход) при практически равной высоте (dY <= 10).

#### Предусловия:
* - Источник (100, 200), цель (300, 204) на левой грани блока.

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить points.length === 2 и Y === pStart.y.

#### Ожидаемый результат:
Построен прямой 2-точечный горизонтальный отрезок.

---

### ТЕСТ №436: Узлы: Обновление выноски дочерней ветви при смещении родительского узла

* **Файл**: [`tests/unit/436-junc21-move-junction-updates-child-leader-points.test.ts`](./unit/436-junc21-move-junction-updates-child-leader-points.test.ts)
* **Класс эквивалентности**: `JUNC-21 (Move Junction Updates Child Leader Points)`
* **Описание**: Проверяет автоматический пересчет точек выносной линии leaderPoints у дочерней ветви при смещении узла ветвления.

#### Предусловия:
* - Ствол и дочерняя ветвь с showLeader: true и labelPos.

#### Выполняемые действия:
1. Сместить узел через moveJunction.
2. Проверить наличие и корректность leaderPoints у ветви.

#### Ожидаемый результат:
Точки выноски согласованы с новым положением узла.

---

### ТЕСТ №437: Узлы: Синхронизация промежуточной точки 3-точечного слияния сверху

* **Файл**: [`tests/unit/437-junc22-move-junction-updates-three-point-merge-from-top.test.ts`](./unit/437-junc22-move-junction-updates-three-point-merge-from-top.test.ts)
* **Класс эквивалентности**: `JUNC-22 (Move Junction Updates Three Point Merge From Top)`
* **Описание**: Проверяет обновление промежуточной точки (points[1].y = junc.point.y) для 3-точечной входящей стрелки слияния со стороны 'top'.

#### Предусловия:
* - Ствол и 3-точечная стрелка слияния из top.

#### Выполняемые действия:
1. Сместить узел по оси Y.
2. Проверить points[1].y === junc.point.y.

#### Ожидаемый результат:
Промежуточная точка выровнена по высоте узла.

---

### ТЕСТ №438: Математика: Пропуск скоса ветвления при противоположном направлении потока

* **Файл**: [`tests/unit/438-math16-horizontal-parent-opposite-flow-branch.test.ts`](./unit/438-math16-horizontal-parent-opposite-flow-branch.test.ts)
* **Класс эквивалентности**: `MATH-16 (Horizontal Parent Opposite Flow Branch)`
* **Описание**: Проверяет отсутствие добавления скоса в getRenderPointsForArrow, если горизонтальная ветвь направлена в противоположную сторону относительно течения родительского ствола.

#### Предусловия:
* - Ствол слева направо (100..800), ветвь справа налево (400..200).

#### Выполняемые действия:
1. Вызвать getRenderPointsForArrow.
2. Проверить points.length без изменений.

#### Ожидаемый результат:
Скос не добавлен (сохранена исходная длина массива точек).

---

### ТЕСТ №439: Математика: Пропуск скоса ветвления при противоположном вертикальном потоке

* **Файл**: [`tests/unit/439-math17-vertical-parent-opposite-flow-branch.test.ts`](./unit/439-math17-vertical-parent-opposite-flow-branch.test.ts)
* **Класс эквивалентности**: `MATH-17 (Vertical Parent Opposite Flow Branch)`
* **Описание**: Проверяет отсутствие добавления скоса в getRenderPointsForArrow, если вертикальная ветвь направлена навстречу родительскому стволу.

#### Предусловия:
* - Ствол сверху вниз (40..800), ветвь снизу вверх (400..200).

#### Выполняемые действия:
1. Вызвать getRenderPointsForArrow.
2. Проверить points.length без изменений.

#### Ожидаемый результат:
Скос не добавлен.

---

### ТЕСТ №44: Линтер: Проверка правила FR-LINT-01 (рекомендация от 3 до 6 блоков)

* **Файл**: [`tests/unit/44-lint01-validate-block-count-bounds.test.ts`](./unit/44-lint01-validate-block-count-bounds.test.ts)
* **Класс эквивалентности**: `LINT-01 (Block Count Recommendation)`
* **Описание**: Проверяет генерацию предупреждения линтера, если на диаграмме декомпозиции менее 3 или более 6 блоков.

#### Предусловия:
* - Диаграмма A1 содержит только 2 функциональных блока.

#### Выполняемые действия:
1. Запустить runIDEF0Linter для диаграммы.
2. Проверить наличие предупреждения FR-LINT-01.

#### Ожидаемый результат:
Линтер выдает предупреждение о несоблюдении правила 3-6 блоков.

---

### ТЕСТ №440: Математика: Пропуск скоса слияния при противоположном горизонтальном потоке

* **Файл**: [`tests/unit/440-math18-horizontal-parent-opposite-flow-merge.test.ts`](./unit/440-math18-horizontal-parent-opposite-flow-merge.test.ts)
* **Класс эквивалентности**: `MATH-18 (Horizontal Parent Opposite Flow Merge)`
* **Описание**: Проверяет отсутствие добавления скоса в getRenderPointsForArrow, если входящая стрелка слияния вливается навстречу течению горизонтального ствола.

#### Предусловия:
* - Ствол слева направо, входящая стрелка справа налево.

#### Выполняемые действия:
1. Вызвать getRenderPointsForArrow для стрелки слияния.
2. Проверить points.length без изменений.

#### Ожидаемый результат:
Скос слияния не добавлен.

---

### ТЕСТ №441: Математика: Пропуск скоса слияния при противоположном вертикальном потоке

* **Файл**: [`tests/unit/441-math19-vertical-parent-opposite-flow-merge.test.ts`](./unit/441-math19-vertical-parent-opposite-flow-merge.test.ts)
* **Класс эквивалентности**: `MATH-19 (Vertical Parent Opposite Flow Merge)`
* **Описание**: Проверяет отсутствие добавления скоса в getRenderPointsForArrow, если входящая стрелка слияния вливается навстречу течению вертикального ствола.

#### Предусловия:
* - Ствол сверху вниз, входящая стрелка снизу вверх.

#### Выполняемые действия:
1. Вызвать getRenderPointsForArrow.
2. Проверить points.length без изменений.

#### Ожидаемый результат:
Скос слияния не добавлен.

---

### ТЕСТ №442: Хранилище: Каскадная передача цвета семейству потока от дочерней ветви к родительскому стволу

* **Файл**: [`tests/unit/442-store91-set-flow-family-color-propagates-to-parent-trunk.test.ts`](./unit/442-store91-set-flow-family-color-propagates-to-parent-trunk.test.ts)
* **Класс эквивалентности**: `STORE-91 (Set Flow Family Color Propagates To Parent Trunk)`
* **Описание**: Проверяет распространение цвета на родительский ствол при вызове setFlowFamilyColor на дочерней стрелке ветвления.

#### Предусловия:
* - Ствол и дочерняя ветвь.

#### Выполняемые действия:
1. Вызвать setFlowFamilyColor(branch.id, '#ef4444').
2. Проверить цвет родительского ствола trunk.color === '#ef4444'.

#### Ожидаемый результат:
Цвет родительского ствола каскадно обновлен.

---

### ТЕСТ №443: Хранилище: Автовыравнивание левой границы источника при снятии фиксации стрелки

* **Файл**: [`tests/unit/443-store92-set-arrow-unpinned-aligns-border-left-source-y.test.ts`](./unit/443-store92-set-arrow-unpinned-aligns-border-left-source-y.test.ts)
* **Класс эквивалентности**: `STORE-92 (Set Arrow Unpinned Aligns Border Left Source Y)`
* **Описание**: Проверяет автоматическое выравнивание source.point.y по target.point.y при сбросе флага фиксации pinned в false для стрелки с левой границы листа.

#### Предусловия:
* - Зафиксированная стрелка с левой границы листа.

#### Выполняемые действия:
1. Вызвать store.setArrowPinned(a.id, false).
2. Проверить source.point.y === target.point.y.

#### Ожидаемый результат:
Координата границы Y автоматически выровнена по цели.

---

### ТЕСТ №444: Хранилище: Автовыравнивание верхней границы источника при снятии фиксации стрелки

* **Файл**: [`tests/unit/444-store93-set-arrow-unpinned-aligns-border-top-source-x.test.ts`](./unit/444-store93-set-arrow-unpinned-aligns-border-top-source-x.test.ts)
* **Класс эквивалентности**: `STORE-93 (Set Arrow Unpinned Aligns Border Top Source X)`
* **Описание**: Проверяет автоматическое выравнивание source.point.x по target.point.x при сбросе pinned в false для стрелки с верхней границы листа.

#### Предусловия:
* - Зафиксированная стрелка Управления.

#### Выполняемые действия:
1. Вызвать store.setArrowPinned(a.id, false).
2. Проверить source.point.x === target.point.x.

#### Ожидаемый результат:
Координата границы X выровнена по целевому порту.

---

### ТЕСТ №445: Хранилище: Автовыравнивание верхней границы цели при снятии фиксации стрелки

* **Файл**: [`tests/unit/445-store94-set-arrow-unpinned-aligns-border-top-target-x.test.ts`](./unit/445-store94-set-arrow-unpinned-aligns-border-top-target-x.test.ts)
* **Класс эквивалентности**: `STORE-94 (Set Arrow Unpinned Aligns Border Top Target X)`
* **Описание**: Проверяет автоматическое выравнивание target.point.x по source.point.x при сбросе pinned в false для стрелки, уходящей на верхнюю границу листа.

#### Предусловия:
* - Зафиксированная стрелка к верхней границе.

#### Выполняемые действия:
1. Вызвать store.setArrowPinned(a.id, false).
2. Проверить target.point.x === source.point.x.

#### Ожидаемый результат:
Координата целевой границы X выровнена по источнику.

---

### ТЕСТ №446: Хранилище: Автовыравнивание и пересчет выноски при _legacySetArrowPathMode('auto')

* **Файл**: [`tests/unit/446-store95-legacy-set-arrow-path-mode-auto.test.ts`](./unit/446-store95-legacy-set-arrow-path-mode-auto.test.ts)
* **Класс эквивалентности**: `STORE-95 (Legacy Set Arrow Path Mode Auto)`
* **Описание**: Проверяет синхронизацию граничных портов и пересчет выносной линии leaderPoints при переключении режима стрелки в 'auto' через _legacySetArrowPathMode.

#### Предусловия:
* - Стрелка с выноской и смещенной границей.

#### Выполняемые действия:
1. Вызвать _legacySetArrowPathMode(a.id, 'auto').
2. Проверить pathMode: 'auto' и leaderPoints.

#### Ожидаемый результат:
Режим обновлен на 'auto', выноска пересчитана.

---

### ТЕСТ №447: Хранилище: Пересчет выноски при вызове recomputeArrowRoute

* **Файл**: [`tests/unit/447-store96-recompute-arrow-route-with-leader.test.ts`](./unit/447-store96-recompute-arrow-route-with-leader.test.ts)
* **Класс эквивалентности**: `STORE-96 (Recompute Arrow Route With Leader)`
* **Описание**: Проверяет удержание позиции подписи clampLabelToCanvas и обновление leaderPoints при принудительном вызове recomputeArrowRoute.

#### Предусловия:
* - Стрелка с showLeader: true и labelPos.

#### Выполняемые действия:
1. Вызвать store.recomputeArrowRoute(a).
2. Проверить leaderPoints.

#### Ожидаемый результат:
Точки выносной линии успешно обновлены.

---

### ТЕСТ №448: Хранилище: Пересчет выноски при вызове recomputeArrowRoute с флагом showLeader

* **Файл**: [`tests/unit/448-store97-set-arrow-pinned-true-with-leader.test.ts`](./unit/448-store97-set-arrow-pinned-true-with-leader.test.ts)
* **Класс эквивалентности**: `STORE-97 (Recompute Arrow Route With Leader Line)`
* **Описание**: Проверяет вызов generateLeaderPoints внутри recomputeArrowRoute для стрелки с активной выноской текста.

#### Предусловия:
* - Стрелка с showLeader: true и labelPos.

#### Выполняемые действия:
1. Вызвать store.recomputeArrowRoute(a).
2. Проверить генерацию leaderPoints.

#### Ожидаемый результат:
Точки выноски успешно сгенерированы.

---

### ТЕСТ №449: Геометрия: Сдвиг завершающего сегмента стрелки слияния, прикрепленной к узлу

* **Файл**: [`tests/unit/449-geom27-shift-last-segment-of-merge-arrow.test.ts`](./unit/449-geom27-shift-last-segment-of-merge-arrow.test.ts)
* **Класс эквивалентности**: `GEOM-27 (Shift Last Segment Of Merge Arrow)`
* **Описание**: Проверяет обновление целевой точки стрелки слияния и координаты Y узла при перемещении последнего горизонтального сегмента стрелки слияния.

#### Предусловия:
* - Ствол и стрелка слияния в узел ствола.

#### Выполняемые действия:
1. Сдвинуть последний сегмент стрелки слияния.
2. Проверить сохранение корректного положения стрелки.

#### Ожидаемый результат:
Сегмент стрелки слияния успешно сдвинут.

---

### ТЕСТ №45: Линтер: Проверка баланса граничных стрелок (FR-LINT-04)

* **Файл**: [`tests/unit/45-lint02-validate-boundary-arrow-balance.test.ts`](./unit/45-lint02-validate-boundary-arrow-balance.test.ts)
* **Класс эквивалентности**: `LINT-02 (Boundary Arrow Balance)`
* **Описание**: Проверяет соответствие внешних стрелок родительского блока и граничных стрелок дочерней диаграммы декомпозиции.

#### Предусловия:
* - Родительский блок имеет входную стрелку, а дочерняя диаграмма не содержит граничного входа.

#### Выполняемые действия:
1. Запустить линтер для дочерней диаграммы.
2. Проверить диагностику баланса стрелок.

#### Ожидаемый результат:
Зафиксировано предупреждение о нарушении баланса граничных стрелок.

---

### ТЕСТ №450: Геометрия: Ограничение сдвига сегмента стрелки с нижней грани блока

* **Файл**: [`tests/unit/450-geom28-shift-vertical-segment-from-block-bottom-clamps-x.test.ts`](./unit/450-geom28-shift-vertical-segment-from-block-bottom-clamps-x.test.ts)
* **Класс эквивалентности**: `GEOM-28 (Shift Vertical Segment From Block Bottom Clamps X)`
* **Описание**: Проверяет удержание координаты X вертикального сегмента стрелки, выходящей из нижней грани блока, в пределах [block.x + 15, block.x + block.width - 15].

#### Предусловия:
* - Стрелка из нижней грани блока.

#### Выполняемые действия:
1. Сдвинуть сегмент далеко за пределы блока (X=900).
2. Проверить удержание координаты X <= block.x + block.width - 15.

#### Ожидаемый результат:
Сегмент удержан на правой границе блока.

---

### ТЕСТ №451: Геометрия: Вычисление угла при удалении точки с вертикальным входящим звеном

* **Файл**: [`tests/unit/451-geom29-remove-arrow-point-vertical-incoming-corner.test.ts`](./unit/451-geom29-remove-arrow-point-vertical-incoming-corner.test.ts)
* **Класс эквивалентности**: `GEOM-29 (Remove Arrow Point Vertical Incoming Corner)`
* **Описание**: Проверяет расчет точки излома corner = (pPrev.x, pNext.y) при удалении точки из 5-точечной стрелки, когда входящее звено вертикально (prevIsHoriz=false).

#### Предусловия:
* - 5-точечная стрелка с вертикальным вторым звеном.

#### Выполняемые действия:
1. Вызвать removeArrowPoint(a.id, 2).
2. Проверить points.length === 4.

#### Ожидаемый результат:
Точка удалена, трасса сохранила ортогональность.

---

### ТЕСТ №452: Геометрия: Перетрассировка при удалении последнего сегмента стрелки

* **Файл**: [`tests/unit/452-geom30-remove-arrow-segment-last-segment-fallback.test.ts`](./unit/452-geom30-remove-arrow-segment-last-segment-fallback.test.ts)
* **Класс эквивалентности**: `GEOM-30 (Remove Arrow Segment Last Segment Fallback)`
* **Описание**: Проверяет автоматический вызов buildOrthogonalRoute при попытке удаления последнего сегмента стрелки (segmentIndex >= segs.length - 1).

#### Предусловия:
* - Многоточечная стрелка.

#### Выполняемые действия:
1. Вызвать removeArrowSegment для последнего сегмента.
2. Проверить сохранение валидного пути.

#### Ожидаемый результат:
Стрелка сохранена и перетрассирована.

---

### ТЕСТ №453: Трассировка: Прямой вертикальный ввод снизу в нижнюю грань блока

* **Файл**: [`tests/unit/453-router31-route-into-bottom-vertical-direct.test.ts`](./unit/453-router31-route-into-bottom-vertical-direct.test.ts)
* **Класс эквивалентности**: `ROUTE-31 (Route Into Bottom Vertical Direct)`
* **Описание**: Проверяет построение прямого 2-точечного вертикального отрезка [pStart, (pStart.x, pEnd.y)] при соосности X (dX <= 10) и заходе снизу в нижний порт блока.

#### Предусловия:
* - Источник (400, 600), цель (402, 400) на грани side: 'bottom'.

#### Выполняемые действия:
1. Вызвать buildRawOrthogonalRoute.
2. Проверить points.length === 2.

#### Ожидаемый результат:
Построен прямой 2-точечный вертикальный отрезок.

---

### ТЕСТ №454: Трассировка: Обнаружение коллизии вертикального сегмента с телом блока

* **Файл**: [`tests/unit/454-router32-segment-intersects-any-block-empty.test.ts`](./unit/454-router32-segment-intersects-any-block-empty.test.ts)
* **Класс эквивалентности**: `ROUTE-32 (Check Segment Block Collision Vertical)`
* **Описание**: Проверяет фиксацию пересечения вертикального отрезка стрелки с телом функционального блока (checkSegmentBlockCollision).

#### Предусловия:
* - Блок (200, 200, w=200, h=100) и вертикальный отрезок, проходящий через X=300 от Y=100 до Y=400.

#### Выполняемые действия:
1. Вызвать checkSegmentBlockCollision.
2. Проверить результат true.

#### Ожидаемый результат:
Зафиксировано пересечение (true).

---

### ТЕСТ №455: Перемещение блока: Адаптация 4-точечной стрелки с правой грани

* **Файл**: [`tests/unit/455-move24-multi-point-loop-corridor-adaptation.test.ts`](./unit/455-move24-multi-point-loop-corridor-adaptation.test.ts)
* **Класс эквивалентности**: `MOVE-24 (Adapt Four Point Arrow Source Right Side)`
* **Описание**: Проверяет адаптацию промежуточных звеньев (pts[1].x = pts[0].x, pts[2].x = pts[3].x) 4-точечной стрелки, выходящей с правой стороны блока, при перемещении блока источника.

#### Предусловия:
* - 4-точечная стрелка из правого выхода блока.

#### Выполняемые действия:
1. Переместить блок b1.
2. Проверить обновление координат стрелки.

#### Ожидаемый результат:
Промежуточные звенья согласованы с новым положением выхода.

---

### ТЕСТ №456: Хранилище: Удержание подписи и пересчет выноски при updateArrow

* **Файл**: [`tests/unit/456-store98-update-arrow-clamps-label-and-updates-leader.test.ts`](./unit/456-store98-update-arrow-clamps-label-and-updates-leader.test.ts)
* **Класс эквивалентности**: `STORE-98 (Update Arrow Clamps Label And Updates Leader)`
* **Описание**: Проверяет автоматический вызов clampLabelToCanvas и generateLeaderPoints при изменении свойств стрелки с активной выносной линией через updateArrow.

#### Предусловия:
* - Стрелка с showLeader: true и labelPos.

#### Выполняемые действия:
1. Вызвать store.updateArrow(a.id, { label: 'Новый текст' }).
2. Проверить пересчет leaderPoints.

#### Ожидаемый результат:
Подпись удержана на полотне, выносная линия обновлена.

---

### ТЕСТ №457: Хранилище: Выравнивание X при _legacySetArrowPathMode со стрелкой сверху

* **Файл**: [`tests/unit/457-store99-legacy-set-arrow-path-mode-source-top-aligns-x.test.ts`](./unit/457-store99-legacy-set-arrow-path-mode-source-top-aligns-x.test.ts)
* **Класс эквивалентности**: `STORE-99 (Legacy Set Arrow Path Mode Source Top Aligns X)`
* **Описание**: Проверяет выравнивание source.point.x по target.point.x при переключении стрелки с верхней границы в 'auto' через _legacySetArrowPathMode.

#### Предусловия:
* - Стрелка Управления с верхней границы листа.

#### Выполняемые действия:
1. Вызвать store._legacySetArrowPathMode(a.id, 'auto').
2. Проверить source.point.x === target.point.x.

#### Ожидаемый результат:
Граничный порт X выровнен по блоку назначения.

---

### ТЕСТ №458: Геометрия: Синхронизация вертикальной ветви и выноски при сдвиге вертикального ствола

* **Файл**: [`tests/unit/458-geom31-shift-vertical-trunk-updates-child-branch-and-leader.test.ts`](./unit/458-geom31-shift-vertical-trunk-updates-child-branch-and-leader.test.ts)
* **Класс эквивалентности**: `GEOM-31 (Shift Vertical Trunk Updates Child Branch And Leader)`
* **Описание**: Проверяет обновление координаты child.points[1].x и пересчет leaderPoints дочерней ветви при сдвиге вертикального сегмента родительского ствола.

#### Предусловия:
* - Трасса со стволом, имеющим вертикальный сегмент 1.

#### Выполняемые действия:
1. Сдвинуть вертикальный сегмент ствола через shiftArrowSegment.
2. Проверить child.points[0].x и leaderPoints.

#### Ожидаемый результат:
Дочерняя ветвь и выноска согласованы с новым положением ствола.

---

### ТЕСТ №459: Геометрия: Синхронизация входящей стрелки слияния при сдвиге вертикального ствола

* **Файл**: [`tests/unit/459-geom32-shift-vertical-trunk-updates-incoming-merge.test.ts`](./unit/459-geom32-shift-vertical-trunk-updates-incoming-merge.test.ts)
* **Класс эквивалентности**: `GEOM-32 (Shift Vertical Trunk Updates Incoming Merge)`
* **Описание**: Проверяет обновление последней и предпоследней точек входящей стрелки слияния при сдвиге вертикального сегмента ствола.

#### Предусловия:
* - Трасса со стволом, имеющим вертикальный сегмент 1.

#### Выполняемые действия:
1. Сдвинуть ствол по оси X.
2. Проверить смещение incoming.points[lastIdx].x.

#### Ожидаемый результат:
Точки слияния согласованы со стволом.

---

### ТЕСТ №46: Линтер: Обнаружение неприсоединенных стрелок (FR-LINT-06)

* **Файл**: [`tests/unit/46-lint03-detect-unattached-arrows-and-stubs.test.ts`](./unit/46-lint03-detect-unattached-arrows-and-stubs.test.ts)
* **Класс эквивалентности**: `LINT-03 (Unattached Arrow Detection)`
* **Описание**: Проверяет генерацию ошибки линтера при наличии стрелки со свободным неприсоединенным концом.

#### Предусловия:
* - Диаграмма содержит стрелку с target.type === 'unattached'.

#### Выполняемые действия:
1. Запустить линтер.
2. Проверить наличие ошибки FR-LINT-06.

#### Ожидаемый результат:
Обнаружена ошибка высокой важности о неприсоединенной стрелке.

---

### ТЕСТ №460: Геометрия: Обновление выносной линии перемещаемой стрелки

* **Файл**: [`tests/unit/460-geom33-shift-segment-updates-own-leader-points.test.ts`](./unit/460-geom33-shift-segment-updates-own-leader-points.test.ts)
* **Класс эквивалентности**: `GEOM-33 (Shift Segment Updates Own Leader Points)`
* **Описание**: Проверяет вызов generateLeaderPoints для самой перемещаемой стрелки при выполнении shiftArrowSegment.

#### Предусловия:
* - Стрелка с showLeader: true и labelPos.

#### Выполняемые действия:
1. Сдвинуть сегмент стрелки через shiftArrowSegment.
2. Проверить leaderPoints.

#### Ожидаемый результат:
Выносная линия перемещаемой стрелки обновлена.

---

### ТЕСТ №461: Геометрия: Обновление выносной линии при straightenArrow

* **Файл**: [`tests/unit/461-geom34-reset-arrow-route-updates-leader-points.test.ts`](./unit/461-geom34-reset-arrow-route-updates-leader-points.test.ts)
* **Класс эквивалентности**: `GEOM-34 (Straighten Arrow Updates Leader Points)`
* **Описание**: Проверяет обновление leaderPoints стрелки при спрямлении её маршрута через ArrowGeometryOps.straightenArrow.

#### Предусловия:
* - Стрелка с showLeader: true и labelPos.

#### Выполняемые действия:
1. Вызвать ArrowGeometryOps.straightenArrow(state, a.id).
2. Проверить leaderPoints.

#### Ожидаемый результат:
Выносная линия обновлена после спрямления маршрута.

---

### ТЕСТ №462: Геометрия: Синхронизация горизонтального слияния при сдвиге горизонтального ствола

* **Файл**: [`tests/unit/462-geom35-shift-horizontal-trunk-updates-incoming-merge.test.ts`](./unit/462-geom35-shift-horizontal-trunk-updates-incoming-merge.test.ts)
* **Класс эквивалентности**: `GEOM-35 (Shift Horizontal Trunk Updates Incoming Merge)`
* **Описание**: Проверяет обновление предпоследней точки incoming.points[lastIdx - 1].y стрелки слияния при смещении горизонтального ствола.

#### Предусловия:
* - Горизонтальный ствол и входящая стрелка слияния.

#### Выполняемые действия:
1. Сдвинуть ствол по Y.
2. Проверить обновление координаты Y у входящей стрелки.

#### Ожидаемый результат:
Координаты слияния синхронизированы по высоте ствола.

---

### ТЕСТ №463: Перемещение блока: Пересчет граничной входящей стрелки в режиме auto

* **Файл**: [`tests/unit/463-move25-boundary-inflow-auto-mode-recalculates-on-block-move.test.ts`](./unit/463-move25-boundary-inflow-auto-mode-recalculates-on-block-move.test.ts)
* **Класс эквивалентности**: `MOVE-25 (Boundary Inflow Auto Mode Recalculates On Block Move)`
* **Описание**: Проверяет автоматический вызов buildOrthogonalRoute при перемещении блока назначения для граничной входящей стрелки в режиме pathMode: 'auto'.

#### Предусловия:
* - Входящая стрелка с границы с pathMode: 'auto'.

#### Выполняемые действия:
1. Сместить целевой блок b.
2. Проверить пересчет точек arrow.points.

#### Ожидаемый результат:
Трасса стрелки пересчитана роутером.

---

### ТЕСТ №464: Перемещение блока: Адаптация завершающего горизонтального сегмента многоточечного входа

* **Файл**: [`tests/unit/464-move26-multi-point-inflow-adjusts-horizontal-last-segment.test.ts`](./unit/464-move26-multi-point-inflow-adjusts-horizontal-last-segment.test.ts)
* **Класс эквивалентности**: `MOVE-26 (Multi Point Inflow Adjusts Horizontal Last Segment)`
* **Описание**: Проверяет обновление pts[n - 2].y = pts[n - 1].y при перемещении целевого блока для граничной стрелки из 5+ точек с горизонтальным входом.

#### Предусловия:
* - Стрелка из 5 точек с горизонтальным входом в блок.

#### Выполняемые действия:
1. Сместить целевой блок b по оси Y.
2. Проверить pts[3].y === pts[4].y.

#### Ожидаемый результат:
Завершающий сегмент адаптирован по высоте.

---

### ТЕСТ №465: Перемещение блока: Адаптация первого горизонтального сегмента многоточечного выхода

* **Файл**: [`tests/unit/465-move27-multi-point-outflow-adjusts-horizontal-first-segment.test.ts`](./unit/465-move27-multi-point-outflow-adjusts-horizontal-first-segment.test.ts)
* **Класс эквивалентности**: `MOVE-27 (Multi Point Outflow Adjusts Horizontal First Segment)`
* **Описание**: Проверяет обновление pts[1].y = pts[0].y при перемещении блока источника для граничной стрелки из 5+ точек с горизонтальным выходом.

#### Предусловия:
* - Стрелка из 5 точек к правой границе.

#### Выполняемые действия:
1. Сместить блок источника b по оси Y.
2. Проверить pts[1].y === pts[0].y.

#### Ожидаемый результат:
Начальный горизонтальный сегмент адаптирован по высоте источника.

---

### ТЕСТ №466: Перемещение блока: Сдвиг подписи по оси X на промежуточном вертикальном звене

* **Файл**: [`tests/unit/466-move28-middle-vertical-corridor-shifts-label-x.test.ts`](./unit/466-move28-middle-vertical-corridor-shifts-label-x.test.ts)
* **Класс эквивалентности**: `MOVE-28 (Middle Vertical Corridor Shifts Label X)`
* **Описание**: Проверяет обновление координаты labelPos.x подписи при смещении промежуточного вертикального коридора 4-точечной стрелки.

#### Предусловия:
* - 4-точечная стрелка с подписью на среднем вертикальном звене (seg 1).

#### Выполняемые действия:
1. Сместить блок b1 по оси X на 60px.
2. Проверить смещение координаты labelPos.x с 600 до 630.

#### Ожидаемый результат:
Подпись синхронно смещена по оси X.

---

### ТЕСТ №467: Геометрия: Вычисление угла при удалении точки с горизонтальным входящим звеном

* **Файл**: [`tests/unit/467-geom36-remove-arrow-point-horizontal-incoming-corner.test.ts`](./unit/467-geom36-remove-arrow-point-horizontal-incoming-corner.test.ts)
* **Класс эквивалентности**: `GEOM-36 (Remove Arrow Point Horizontal Incoming Corner)`
* **Описание**: Проверяет расчет точки излома corner = (pPrev.x, pNext.y) при удалении точки из 5-точечной стрелки, когда входящее звено строго горизонтально (prevIsHoriz=true).

#### Предусловия:
* - 5-точечная стрелка с горизонтальным первым звеном.

#### Выполняемые действия:
1. Вызвать removeArrowPoint(a.id, 1).
2. Проверить points.length === 4.

#### Ожидаемый результат:
Точка удалена, трасса сохранила ортогональность.

---

### ТЕСТ №468: Геометрия: Защитный вызов buildOrthogonalRoute при сжатии стрелки в removeArrowPoint

* **Файл**: [`tests/unit/468-geom37-remove-arrow-point-fallback-build-route.test.ts`](./unit/468-geom37-remove-arrow-point-fallback-build-route.test.ts)
* **Класс эквивалентности**: `GEOM-37 (Remove Arrow Point Fallback Build Route)`
* **Описание**: Проверяет защитное перестроение стрелки через buildOrthogonalRoute при сокращении точек до менее 2 (points.length < 2) в removeArrowPoint.

#### Предусловия:
* - 5-точечная стрелка.

#### Выполняемые действия:
1. Замокать simplifyCollinear один раз на возврат [].
2. Вызвать removeArrowPoint(a.id, 2).
3. Проверить восстановление точек.

#### Ожидаемый результат:
Стрелка успешно восстановлена роутером.

---

### ТЕСТ №469: Геометрия: Перетрассировка при удалении нулевого сегмента многоточечной стрелки

* **Файл**: [`tests/unit/469-geom38-remove-arrow-segment-index-zero-fallback.test.ts`](./unit/469-geom38-remove-arrow-segment-index-zero-fallback.test.ts)
* **Класс эквивалентности**: `GEOM-38 (Remove Arrow Segment Index Zero Fallback)`
* **Описание**: Проверяет вызов buildOrthogonalRoute при передаче segmentIndex <= 0 в removeArrowSegment для стрелки из 5+ точек.

#### Предусловия:
* - 5-точечная стрелка.

#### Выполняемые действия:
1. Вызвать removeArrowSegment(a.id, 0).
2. Проверить перетрассировку.

#### Ожидаемый результат:
Стрелка перетрассирована через роутер.

---

### ТЕСТ №47: Линтер: Обнаружение неортогональных маршрутов (FR-LINT-03)

* **Файл**: [`tests/unit/47-lint04-detect-non-orthogonal-routes.test.ts`](./unit/47-lint04-detect-non-orthogonal-routes.test.ts)
* **Класс эквивалентности**: `LINT-04 (Non-Orthogonal Route Warning)`
* **Описание**: Проверяет выявление диагональных или наклонных отрезков стрелок, нарушающих стандарт IDEF0.

#### Предусловия:
* - Диаграмма содержит стрелку с диагональным сегментом (dx !== 0 && dy !== 0).

#### Выполняемые действия:
1. Запустить проверку линтера.
2. Проверить появление предупреждения FR-LINT-03.

#### Ожидаемый результат:
Зафиксировано предупреждение о неортогональности сегмента.

---

### ТЕСТ №470: Геометрия: Защитный вызов buildOrthogonalRoute при сжатии в removeArrowSegment

* **Файл**: [`tests/unit/470-geom39-remove-arrow-segment-fallback-build-route.test.ts`](./unit/470-geom39-remove-arrow-segment-fallback-build-route.test.ts)
* **Класс эквивалентности**: `GEOM-39 (Remove Arrow Segment Fallback Build Route)`
* **Описание**: Проверяет перестроение стрелки через buildOrthogonalRoute при points.length < 2 в removeArrowSegment.

#### Предусловия:
* - 5-точечная стрелка.

#### Выполняемые действия:
1. Замокать simplifyCollinear один раз на [].
2. Вызвать removeArrowSegment(a.id, 1).
3. Проверить восстановление.

#### Ожидаемый результат:
Стрелка успешно перестроена.

---

### ТЕСТ №471: Перемещение блока: Адаптация 4-точечной входящей стрелки с правой границы листа

* **Файл**: [`tests/unit/471-move29-inflow-from-right-border-four-points.test.ts`](./unit/471-move29-inflow-from-right-border-four-points.test.ts)
* **Класс эквивалентности**: `MOVE-29 (Inflow From Right Border Four Points)`
* **Описание**: Проверяет адаптацию промежуточных точек (pts[1].x = pts[0].x, pts[2].x = pts[3].x, pts[2].y = pts[1].y) при перемещении блока, в который входит 4-точечная стрелка с правой границы.

#### Предусловия:
* - 4-точечная входящая стрелка с правой границы.

#### Выполняемые действия:
1. Сместить блок b.
2. Проверить адаптацию точек.

#### Ожидаемый результат:
Стрелка корректно адаптирована при перемещении блока назначения.

---

### ТЕСТ №472: Перемещение блока: Адаптация вертикального завершающего сегмента многоточечного входа

* **Файл**: [`tests/unit/472-move30-multi-point-inflow-vertical-last-segment.test.ts`](./unit/472-move30-multi-point-inflow-vertical-last-segment.test.ts)
* **Класс эквивалентности**: `MOVE-30 (Multi Point Inflow Vertical Last Segment)`
* **Описание**: Проверяет обновление pts[n - 2].x = pts[n - 1].x при перемещении целевого блока для граничной стрелки из 5+ точек с вертикальным заходом (lastSegIsHoriz=false).

#### Предусловия:
* - 5-точечная стрелка с вертикальным входом в блок.

#### Выполняемые действия:
1. Сместить целевой блок b по оси X.
2. Проверить pts[3].x === pts[4].x.

#### Ожидаемый результат:
Предпоследняя точка по X согласована с точкой контакта.

---

### ТЕСТ №473: Перемещение блока: Адаптация вертикального начального сегмента многоточечного выхода

* **Файл**: [`tests/unit/473-move31-multi-point-outflow-vertical-first-segment.test.ts`](./unit/473-move31-multi-point-outflow-vertical-first-segment.test.ts)
* **Класс эквивалентности**: `MOVE-31 (Multi Point Outflow Vertical First Segment)`
* **Описание**: Проверяет обновление pts[1].x = pts[0].x при перемещении блока источника для граничной стрелки из 5+ точек с вертикальным выходом (firstSegIsHoriz=false).

#### Предусловия:
* - 5-точечная стрелка с вертикальным выходом.

#### Выполняемые действия:
1. Сместить блок b по оси X.
2. Проверить pts[1].x === pts[0].x.

#### Ожидаемый результат:
Вторая точка по X согласована с выходом блока.

---

### ТЕСТ №474: Геометрия: Обновление хвоста горизонтального слияния при сдвиге горизонтального ствола

* **Файл**: [`tests/unit/474-geom40-shift-horizontal-trunk-updates-horizontal-merge-tail.test.ts`](./unit/474-geom40-shift-horizontal-trunk-updates-horizontal-merge-tail.test.ts)
* **Класс эквивалентности**: `GEOM-40 (Shift Horizontal Trunk Updates Horizontal Merge Tail)`
* **Описание**: Проверяет обновление точки incoming.points[lastIdx - 1].y стрелки слияния с горизонтальным заходом в узел при смещении ствола по оси Y.

#### Предусловия:
* - Горизонтальный ствол и входящая стрелка слияния с горизонтальным заходом.

#### Выполняемые действия:
1. Сдвинуть сегмент ствола по оси Y.
2. Проверить обновление points[lastIdx - 1].y у слияния.

#### Ожидаемый результат:
Хвост стрелки слияния синхронно смещен по оси Y.

---

### ТЕСТ №475: Геометрия: Обновление хвоста вертикального слияния при сдвиге вертикального ствола

* **Файл**: [`tests/unit/475-geom41-shift-vertical-trunk-updates-vertical-merge-tail.test.ts`](./unit/475-geom41-shift-vertical-trunk-updates-vertical-merge-tail.test.ts)
* **Класс эквивалентности**: `GEOM-41 (Shift Vertical Trunk Updates Vertical Merge Tail)`
* **Описание**: Проверяет обновление точки incoming.points[lastIdx - 1].x стрелки слияния с вертикальным заходом при сдвиге вертикального ствола по оси X.

#### Предусловия:
* - Ствол с вертикальным звеном и стрелка слияния с вертикальным заходом.

#### Выполняемые действия:
1. Сдвинуть вертикальный сегмент ствола по оси X.
2. Проверить обновление points[lastIdx - 1].x у слияния.

#### Ожидаемый результат:
Хвост стрелки слияния синхронно смещен по оси X.

---

### ТЕСТ №48: Линтер: Обнаружение наложения подписи на стрелку (FR-LINT-07)

* **Файл**: [`tests/unit/48-lint05-detect-label-segment-collisions.test.ts`](./unit/48-lint05-detect-label-segment-collisions.test.ts)
* **Класс эквивалентности**: `LINT-05 (Label Segment Collision)`
* **Описание**: Проверяет предупреждение линтера, если текстовая подпись стрелки перекрывается сегментом стрелки.

#### Предусловия:
* - Координаты текстовой подписи совпадают с горизонтальным сегментом стрелки.

#### Выполняемые действия:
1. Запустить линтер.
2. Проверить наличие сообщения FR-LINT-07.

#### Ожидаемый результат:
Предупреждение о перекрытии подписи сегментом стрелки успешно сформировано.

---

### ТЕСТ №49: Линтер: Предупреждение об отсутствии управления или механизма

* **Файл**: [`tests/unit/49-lint06-warn-missing-control-or-mechanism.test.ts`](./unit/49-lint06-warn-missing-control-or-mechanism.test.ts)
* **Класс эквивалентности**: `LINT-06 (Missing ICOM Semantics)`
* **Описание**: Проверяет соответствие стандарту IDEF0: каждый блок должен иметь вход управления (Управление) и механизм (Механизм).

#### Предусловия:
* - Блок имеет только вход (Вход) и выход (Выход), но не имеет Control.

#### Выполняемые действия:
1. Выполнить проверку линтером.
2. Проверить наличие предупреждения об отсутствии управления.

#### Ожидаемый результат:
Линтер выдает предупреждение об отсутствии управляющего воздействия у блока.

---

### ТЕСТ №50: Негативный: Запрет соединения граница-граница

* **Файл**: [`tests/unit/50-neg01-forbid-border-to-border-connection.test.ts`](./unit/50-neg01-forbid-border-to-border-connection.test.ts)
* **Класс эквивалентности**: `NEG-01 (Border-to-Border Prohibition)`
* **Описание**: Проверяет запрет создания сквозных стрелок от границы диаграммы к границе диаграммы без прохождения через блок.

#### Предусловия:
* - Попытка создания стрелки от левой границы к правой границе холста.

#### Выполняемые действия:
1. Вызвать validateArrowConnection для источника border и цели border.
2. Проверить результат валидации.

#### Ожидаемый результат:
Валидатор возвращает valid === false с запретом прямого транзита граница-граница.

---

### ТЕСТ №51: Негативный: Запрет соединения узел-узел (Junction-to-Junction)

* **Файл**: [`tests/unit/51-neg02-forbid-junction-to-junction-connection.test.ts`](./unit/51-neg02-forbid-junction-to-junction-connection.test.ts)
* **Класс эквивалентности**: `NEG-02 (Junction-to-Junction Prohibition)`
* **Описание**: Проверяет запрет прямого соединения узла ветвления/слияния с другим узлом ветвления/слияния.

#### Предусловия:
* - Попытка провести стрелку между двумя узлами junction.

#### Выполняемые действия:
1. Вызвать validateArrowConnection со связкой junction -> junction.
2. Проверить отклонение связи.

#### Ожидаемый результат:
Связь узел-узел отклоняется валидатором (valid === false).

---

### ТЕСТ №52: Негативный: Запрет стрелки с двумя неприсоединенными концами

* **Файл**: [`tests/unit/52-neg03-forbid-both-endpoints-unattached.test.ts`](./unit/52-neg03-forbid-both-endpoints-unattached.test.ts)
* **Класс эквивалентности**: `NEG-03 (Both Endpoints Unattached Prohibition)`
* **Описание**: Проверяет запрет создания висящей в воздухе стрелки, у которой и начало, и конец являются неприсоединенными.

#### Предусловия:
* - Стрелка имеет source.type === 'unattached' и target.type === 'unattached'.

#### Выполняемые действия:
1. Вызвать validateArrowConnection.
2. Проверить результат валидации.

#### Ожидаемый результат:
Стрелка с двумя неприсоединенными концами строго запрещена.

---

### ТЕСТ №53: Негативный: Запрет создания второго блока на контекстной диаграмме A0

* **Файл**: [`tests/unit/53-neg04-forbid-second-block-on-context-diagram.test.ts`](./unit/53-neg04-forbid-second-block-on-context-diagram.test.ts)
* **Класс эквивалентности**: `NEG-04 (Single Context Block Restriction)`
* **Описание**: Проверяет стандарт IDEF0: на контекстной диаграмме A0 допускается строго единственный функциональный блок нулевого уровня.

#### Предусловия:
* - Активна контекстная диаграмма A0, на ней уже есть 1 блок.

#### Выполняемые действия:
1. Вызвать store.createBlock на диаграмме A0.
2. Проверить возврат null и сохранение ровно 1 блока.

#### Ожидаемый результат:
Создание второго блока отклонено, на A0 остается строго один блок.

---

### ТЕСТ №54: Сериализация: Экспорт и импорт модели проекта в JSON

* **Файл**: [`tests/unit/54-io01-export-and-import-json-model.test.ts`](./unit/54-io01-export-and-import-json-model.test.ts)
* **Класс эквивалентности**: `IO-01 (JSON Serialization Roundtrip)`
* **Описание**: Проверяет полный цикл экспорта проекта в JSON и обратного импорта с сохранением всех блоков, стрелок и свойств.

#### Предусловия:
* - В store загружена модель с диаграммами A0 и A1.

#### Выполняемые действия:
1. Экспортировать проект в строку JSON.
2. Загрузить JSON через importProjectFromJson.
3. Проверить совпадение структуры данных.

#### Ожидаемый результат:
Импортированный проект идентичен исходному (roundtrip fidelity 100%).

---

### ТЕСТ №55: Сериализация: Отклонение некорректного JSON при импорте

* **Файл**: [`tests/unit/55-io02-reject-malformed-json-import.test.ts`](./unit/55-io02-reject-malformed-json-import.test.ts)
* **Класс эквивалентности**: `IO-02 (Malformed JSON Rejection)`
* **Описание**: Проверяет безопасную обработку поврежденных JSON файлов без сбоя приложения.

#### Предусловия:
* - Подается битая строка JSON.

#### Выполняемые действия:
1. Вызвать importProjectFromJson с некорректной строкой '{ bad: json }'.
2. Проверить возврат false.

#### Ожидаемый результат:
Импорт безопасно отклонен, возвращен false.

---

### ТЕСТ №56: Экспорт: Генерация чистого векторного SVG по стандарту IDEF0

* **Файл**: [`tests/unit/56-io03-export-clean-svg-diagram.test.ts`](./unit/56-io03-export-clean-svg-diagram.test.ts)
* **Класс эквивалентности**: `IO-03 (SVG Diagram Export)`
* **Описание**: Проверяет экспорт диаграммы в SVG с маркерами стрелок, сеткой и блоками.

#### Предусловия:
* - В store загружена модель диаграммы.

#### Выполняемые действия:
1. Вызвать exportDiagramToSvg.
2. Проверить наличие тега <svg>, маркеров и прямоугольников блоков.

#### Ожидаемый результат:
Сформирована валидная строка SVG с корректными размерами и разметкой.

---

### ТЕСТ №57: Экспорт: Пакетный экспорт диаграмм в единый ZIP-архив

* **Файл**: [`tests/unit/57-io04-export-multi-diagram-zip-archive.test.ts`](./unit/57-io04-export-multi-diagram-zip-archive.test.ts)
* **Класс эквивалентности**: `IO-04 (Multi-diagram ZIP Export)`
* **Описание**: Проверяет генерацию ZIP-архива, содержащего SVG-файлы всех диаграмм модели.

#### Предусловия:
* - Проект содержит 2 диаграммы (A0 и A1).

#### Выполняемые действия:
1. Вызвать exportDiagramsToZip с массивом диаграмм.
2. Проверить создание бинарного Blob-архива.

#### Ожидаемый результат:
ZIP-архив успешно сгенерирован и содержит данные.

---

### ТЕСТ №58: Хранилище: Управление стеком истории Undo / Redo

* **Файл**: [`tests/unit/58-store01-history-undo-redo-stack.test.ts`](./unit/58-store01-history-undo-redo-stack.test.ts)
* **Класс эквивалентности**: `STORE-01 (History Undo/Redo Stack)`
* **Описание**: Проверяет многократную отмену и повторение действий в стеке истории EditorStore.

#### Предусловия:
* - Диаграмма A1 активна.

#### Выполняемые действия:
1. Создать Блок 1.
2. Создать Блок 2.
3. Выполнить undo дважды и redo один раз.

#### Ожидаемый результат:
Количество блоков последовательно меняется 2 -> 1 -> 0 -> 1.

---

### ТЕСТ №59: Хранилище: Автоматическая диагональная раскладка блоков («Лесенка»)

* **Файл**: [`tests/unit/59-store02-autolayout-diagonal-distribution.test.ts`](./unit/59-store02-autolayout-diagonal-distribution.test.ts)
* **Класс эквивалентности**: `STORE-02 (Diagonal Auto-Layout)`
* **Описание**: Проверяет распределение блоков диагонали сверху вниз слева направо по стандарту IDEF0.

#### Предусловия:
* - На диаграмме созданы 3 блока в произвольных позициях.

#### Выполняемые действия:
1. Вызвать autoLayoutBlocks.
2. Проверить, что x1 < x2 < x3 и y1 < y2 < y3.

#### Ожидаемый результат:
Блоки упорядочены по строгой диагонали («лесенке»).

---

### ТЕСТ №60: Хранилище: Расчет иерархических кодов блоков (A0, A1, A1.1...)

* **Файл**: [`tests/unit/60-store03-hierarchical-node-naming.test.ts`](./unit/60-store03-hierarchical-node-naming.test.ts)
* **Класс эквивалентности**: `STORE-03 (Hierarchical Code Computation)`
* **Описание**: Проверяет вычисление иерархических префиксов номеров блоков на разных уровнях декомпозиции.

#### Предусловия:
* - Инициализирована модель декомпозиции.

#### Выполняемые действия:
1. Проверить код блока на диаграмме A0.
2. Проверить код блока на диаграмме A1.

#### Ожидаемый результат:
Код вычисляется корректно в соответствии со стандартами IDEF0.

---

### ТЕСТ №61: Негативный: Запрет исходящей стрелки из левой грани блока (Вход)

* **Файл**: [`tests/unit/61-neg05-forbid-source-from-block-input.test.ts`](./unit/61-neg05-forbid-source-from-block-input.test.ts)
* **Класс эквивалентности**: `NEG-05 (Block Input Source Prohibited)`
* **Описание**: Проверяет запрет создания исходящей стрелки из левой грани функционального блока (Вход — только приёмник).

#### Предусловия:
* - Инициализированы 2 блока на холсте.

#### Выполняемые действия:
1. Задать стрелку с началом на левой грани Блока 1 (side: 'left').
2. Вызвать validateArrowConnection.
3. Проверить результат валидации valid === false.

#### Ожидаемый результат:
Связь отклонена: стрелка не может выходить из левой стороны блока.

---

### ТЕСТ №62: Негативный: Запрет исходящей стрелки из верхней грани блока (Управление)

* **Файл**: [`tests/unit/62-neg06-forbid-source-from-block-control.test.ts`](./unit/62-neg06-forbid-source-from-block-control.test.ts)
* **Класс эквивалентности**: `NEG-06 (Block Control Source Prohibited)`
* **Описание**: Проверяет запрет создания исходящей стрелки из верхней грани блока (Управление — только приёмник).

#### Предусловия:
* - Инициализированы блоки на холсте.

#### Выполняемые действия:
1. Задать стрелку с началом на верхней грани блока (side: 'top').
2. Вызвать validateArrowConnection.

#### Ожидаемый результат:
Связь отклонена: стрелка не может выходить из верхней стороны блока.

---

### ТЕСТ №63: Негативный: Запрет исходящей стрелки из нижней грани блока (Механизм)

* **Файл**: [`tests/unit/63-neg07-forbid-source-from-block-mechanism.test.ts`](./unit/63-neg07-forbid-source-from-block-mechanism.test.ts)
* **Класс эквивалентности**: `NEG-07 (Block Mechanism Source Prohibited)`
* **Описание**: Проверяет запрет создания исходящей стрелки из нижней грани блока (Механизм — только приёмник).

#### Предусловия:
* - Инициализированы блоки на холсте.

#### Выполняемые действия:
1. Задать стрелку с началом на нижней грани блока (side: 'bottom').
2. Вызвать validateArrowConnection.

#### Ожидаемый результат:
Связь отклонена: стрелка не может выходить из нижней стороны блока.

---

### ТЕСТ №64: Негативный: Запрет входящей стрелки в правую грань блока (Выход)

* **Файл**: [`tests/unit/64-neg08-forbid-target-into-block-output.test.ts`](./unit/64-neg08-forbid-target-into-block-output.test.ts)
* **Класс эквивалентности**: `NEG-08 (Block Output Target Prohibited)`
* **Описание**: Проверяет запрет направления стрелки в правую грань блока (Выход — только источник).

#### Предусловия:
* - Инициализированы блоки на холсте.

#### Выполняемые действия:
1. Направить стрелку в правую грань целевого блока (side: 'right').
2. Вызвать validateArrowConnection.

#### Ожидаемый результат:
Связь отклонена: стрелка не может входить в правую сторону блока.

---

### ТЕСТ №65: Негативный: Запрет начала стрелки с правой границы холста

* **Файл**: [`tests/unit/65-neg09-forbid-source-from-right-border.test.ts`](./unit/65-neg09-forbid-source-from-right-border.test.ts)
* **Класс эквивалентности**: `NEG-09 (Right Border Source Prohibited)`
* **Описание**: Проверяет стандарт IDEF0: правая граница холста служит только стоком для выходов системы.

#### Предусловия:
* - Попытка начать стрелку от правой границы холста.

#### Выполняемые действия:
1. Задать начало стрелки на правой границе (type: 'border', side: 'right').
2. Вызвать validateArrowConnection.

#### Ожидаемый результат:
Связь отклонена: правая граница только для выходов.

---

### ТЕСТ №66: Негативный: Запрет окончания стрелки на левой границе холста

* **Файл**: [`tests/unit/66-neg10-forbid-target-into-left-border.test.ts`](./unit/66-neg10-forbid-target-into-left-border.test.ts)
* **Класс эквивалентности**: `NEG-10 (Left Border Target Prohibited)`
* **Описание**: Проверяет стандарт IDEF0: левая граница холста служит только источником внешних входов.

#### Предусловия:
* - Попытка направить стрелку в левую границу холста.

#### Выполняемые действия:
1. Задать цель стрелки на левой границе (type: 'border', side: 'left').
2. Вызвать validateArrowConnection.

#### Ожидаемый результат:
Связь отклонена: левая граница только источник входов.

---

### ТЕСТ №67: Негативный: Запрет несоответствия семантики границы и грани блока

* **Файл**: [`tests/unit/67-neg11-forbid-mismatched-border-to-block-face.test.ts`](./unit/67-neg11-forbid-mismatched-border-to-block-face.test.ts)
* **Класс эквивалентности**: `NEG-11 (Mismatched Border Face Prohibited)`
* **Описание**: Проверяет запрет входа стрелки с левой границы (Вход) в верхнюю грань блока (Управление).

#### Предусловия:
* - Блок на холсте.

#### Выполняемые действия:
1. Соединить левую границу с верхней гранью блока.
2. Вызвать validateArrowConnection.

#### Ожидаемый результат:
Связь отклонена: стрелка с левой границы может входить только в левую сторону блока.

---

### ТЕСТ №68: Негативный: Запрет прямого слияния стрелки с границы в существующий поток

* **Файл**: [`tests/unit/68-neg12-forbid-border-source-merging-into-junction.test.ts`](./unit/68-neg12-forbid-border-source-merging-into-junction.test.ts)
* **Класс эквивалентности**: `NEG-12 (Border Merge Prohibited)`
* **Описание**: Проверяет запрет слияния граничного потока напрямую в магистраль без участия функционального блока.

#### Предусловия:
* - На диаграмме присутствует узел слияния junction.

#### Выполняемые действия:
1. Задать стрелку от границы холста к узлу junction.
2. Вызвать validateArrowConnection.

#### Ожидаемый результат:
Связь отклонена: стрелка с границы холста не может сливаться с существующим потоком напрямую.

---

### ТЕСТ №69: Негативный: Запрет ветвления потока на левую, верхнюю или нижнюю границу

* **Файл**: [`tests/unit/69-neg13-forbid-branch-to-non-right-border.test.ts`](./unit/69-neg13-forbid-branch-to-non-right-border.test.ts)
* **Класс эквивалентности**: `NEG-13 (Branch to Non-Right Border Prohibited)`
* **Описание**: Проверяет запрет ответвления из узла junction на любую границу, кроме правой (Выход).

#### Предусловия:
* - Узел ветвления junction на стволе стрелки.

#### Выполняемые действия:
1. Направить ветвь из узла junction на левую границу холста.
2. Вызвать validateArrowConnection.

#### Ожидаемый результат:
Связь отклонена (valid === false).

---

### ТЕСТ №70: Прилипание: Магнитный захват верхней грани блока (роль control)

* **Файл**: [`tests/unit/70-snap01-snap-to-block-top-control.test.ts`](./unit/70-snap01-snap-to-block-top-control.test.ts)
* **Класс эквивалентности**: `SNAP-01 (Snap to Block Control)`
* **Описание**: Проверяет захват курсора верхней гранью блока с автоматическим назначением роли 'control'.

#### Предусловия:
* - Блок расположен на (400, 200, 210, 130).

#### Выполняемые действия:
1. Задать точку около верхней грани блока (450, 205).
2. Вызвать getBlockSnapPoint.
3. Проверить параметры захваченной цели.

#### Ожидаемый результат:
Точка примагничена к верхней грани (side: 'top', role: 'control', y: 200).

---

### ТЕСТ №71: Прилипание: Магнитный захват нижней грани блока (роль mechanism)

* **Файл**: [`tests/unit/71-snap02-snap-to-block-bottom-mechanism.test.ts`](./unit/71-snap02-snap-to-block-bottom-mechanism.test.ts)
* **Класс эквивалентности**: `SNAP-02 (Snap to Block Mechanism)`
* **Описание**: Проверяет захват курсора нижней гранью блока с автоматическим назначением роли 'mechanism'.

#### Предусловия:
* - Блок расположен на (400, 200, 210, 130).

#### Выполняемые действия:
1. Задать точку около нижней грани блока (450, 325).
2. Вызвать getBlockSnapPoint.
3. Проверить параметры захваченной цели.

#### Ожидаемый результат:
Точка примагничена к нижней грани (side: 'bottom', role: 'mechanism', y: 330).

---

### ТЕСТ №72: Прилипание: Магнитный захват правой грани блока (роль output)

* **Файл**: [`tests/unit/72-snap03-snap-to-block-right-output.test.ts`](./unit/72-snap03-snap-to-block-right-output.test.ts)
* **Класс эквивалентности**: `SNAP-03 (Snap to Block Output)`
* **Описание**: Проверяет захват курсора правой гранью блока с автоматическим назначением роли 'output'.

#### Предусловия:
* - Блок расположен на (400, 200, 210, 130).

#### Выполняемые действия:
1. Задать точку около правой грани блока (605, 265).
2. Вызвать getBlockSnapPoint.

#### Ожидаемый результат:
Точка примагничена к правой грани (side: 'right', role: 'output', x: 610).

---

### ТЕСТ №73: Прилипание: Захват границ холста через getBorderSnapPoint

* **Файл**: [`tests/unit/73-snap04-border-snap-points.test.ts`](./unit/73-snap04-border-snap-points.test.ts)
* **Класс эквивалентности**: `SNAP-04 (Border Snap Target Selection)`
* **Описание**: Проверяет притяжение курсора к границам холста (Left -> input, Top -> control, Right -> output, Bottom -> mechanism).

#### Предусловия:
* - Курсор расположен вблизи границ холста.

#### Выполняемые действия:
1. Проверить прилипание к левой границе (x=35).
2. Проверить прилипание к верхней границе (y=45).

#### Ожидаемый результат:
Определены цели прилипания с ролями 'input' и 'control'.

---

### ТЕСТ №74: Прилипание: Захват промежуточного сегмента существующей стрелки

* **Файл**: [`tests/unit/74-snap05-arrow-segment-snap.test.ts`](./unit/74-snap05-arrow-segment-snap.test.ts)
* **Класс эквивалентности**: `SNAP-05 (Arrow Segment Snapping)`
* **Описание**: Проверяет притягивание точки к сегменту стрелки для создания узлов ветвления или слияния.

#### Предусловия:
* - Стрелка с горизонтальным сегментом от (100, 200) до (500, 200).

#### Выполняемые действия:
1. Задать точку около сегмента (x: 250, y: 205).
2. Вызвать getArrowSegmentSnapPoint.

#### Ожидаемый результат:
Точка спроецирована на сегмент с координатой y: 200.

---

### ТЕСТ №75: Прилипание: Комплексный поиск ближайшей цели через findSnapTarget

* **Файл**: [`tests/unit/75-snap06-find-snap-target-integration.test.ts`](./unit/75-snap06-find-snap-target-integration.test.ts)
* **Класс эквивалентности**: `SNAP-06 (Integrated Snap Target Engine)`
* **Описание**: Проверяет работу главного диспетчера прилипания findSnapTarget с учетом блоков, стрелок и границ.

#### Предусловия:
* - На диаграмме присутствует функциональный блок.

#### Выполняемые действия:
1. Вызвать findSnapTarget в окрестности грани блока.
2. Проверить приоритетный выбор цели.

#### Ожидаемый результат:
Возвращена цель прилипания на грани блока.

---

### ТЕСТ №76: Узлы: Перемещение узла ветвления вдоль горизонтального сегмента

* **Файл**: [`tests/unit/76-junc01-move-junction-along-horizontal-segment.test.ts`](./unit/76-junc01-move-junction-along-horizontal-segment.test.ts)
* **Класс эквивалентности**: `JUNC-01 (Horizontal Junction Movement)`
* **Описание**: Проверяет перемещение узла ветвления вдоль сегмента стрелки вызовом moveJunction.

#### Предусловия:
* - Стрелка имеет узел ветвления на горизонтальном отрезке.

#### Выполняемые действия:
1. Сместить узел на новую позицию по оси X.
2. Проверить проекцию точки узла на сегмент.

#### Ожидаемый результат:
Узел смещен на новую координату X, координата Y осталась на линии сегмента.

---

### ТЕСТ №77: Узлы: Ограничение перемещения узла с отступом от концов сегмента (>= 15px)

* **Файл**: [`tests/unit/77-junc02-clamp-junction-to-segment-endpoints.test.ts`](./unit/77-junc02-clamp-junction-to-segment-endpoints.test.ts)
* **Класс эквивалентности**: `JUNC-02 (Junction Endpoint Clamping)`
* **Описание**: Проверяет ограничение движения узла ветвления, предотвращающее наложение на концы стрелки.

#### Предусловия:
* - Стрелка от (30, 265) до (500, 265) с узлом.

#### Выполняемые действия:
1. Попытаться переместить узел вплотную к началу стрелки (x: 35).
2. Проверить отступ не менее 15px.

#### Ожидаемый результат:
Координата X узла ограничена отступом (x >= 45).

---

### ТЕСТ №78: Узлы: Синхронное обновление маршрута дочерней ветви при смещении узла

* **Файл**: [`tests/unit/78-junc03-sync-branch-arrows-on-junction-move.test.ts`](./unit/78-junc03-sync-branch-arrows-on-junction-move.test.ts)
* **Класс эквивалентности**: `JUNC-03 (Branch Synchronization on Move)`
* **Описание**: Проверяет синхронное смещение начальной точки подключенной ветви при движении узла ветвления.

#### Предусловия:
* - Узел ветвления соединяет ствол и дочернюю ветвь.

#### Выполняемые действия:
1. Сместить узел на 100px вправо.
2. Проверить первую точку дочерней ветви branch.points[0].

#### Ожидаемый результат:
Начальная точка ветви синхронно перемещена вслед за узлом.

---

### ТЕСТ №79: Узлы: Автоматическая очистка сиротских узлов без стрелок (synchronizeJunctions)

* **Файл**: [`tests/unit/79-junc04-prune-orphan-junctions.test.ts`](./unit/79-junc04-prune-orphan-junctions.test.ts)
* **Класс эквивалентности**: `JUNC-04 (Orphan Junction Pruning)`
* **Описание**: Проверяет удаление узлов junction, не имеющих подключенных дочерних или входящих стрелок.

#### Предусловия:
* - На диаграмме создан узел без подключенных стрелок.

#### Выполняемые действия:
1. Вызвать synchronizeJunctions.
2. Проверить список узлов.

#### Ожидаемый результат:
Неиспользуемый узел автоматически удален.

---

### ТЕСТ №80: Узлы: Синхронное обновление входящей стрелки слияния при сдвиге узла

* **Файл**: [`tests/unit/80-junc05-sync-merge-arrows-on-junction-move.test.ts`](./unit/80-junc05-sync-merge-arrows-on-junction-move.test.ts)
* **Класс эквивалентности**: `JUNC-05 (Merge Synchronization on Move)`
* **Описание**: Проверяет синхронное смещение конечной точки стрелки притока при перемещении узла слияния.

#### Предусловия:
* - Узел слияния объединяет магистраль и входящую стрелку притока.

#### Выполняемые действия:
1. Сместить узел слияния.
2. Проверить координаты конца стрелки притока.

#### Ожидаемый результат:
Конечная точка стрелки притока точно совпадает с новой координатой узла слияния.

---

### ТЕСТ №81: Стрелки: Смена ICOM-роли стрелки через инспектор

* **Файл**: [`tests/unit/81-arr01-set-arrow-role.test.ts`](./unit/81-arr01-set-arrow-role.test.ts)
* **Класс эквивалентности**: `ARR-01 (Change Arrow Role)`
* **Описание**: Проверяет изменение роли стрелки вызовом setArrowRole.

#### Предусловия:
* - Стрелка создана с ролью 'input'.

#### Выполняемые действия:
1. Вызвать store.setArrowRole(a.id, 'control').
2. Проверить обновленную роль.

#### Ожидаемый результат:
Роль стрелки изменена на 'control'.

---

### ТЕСТ №82: Стрелки: Переключение режима выноски подписи стрелки (toggleLeader)

* **Файл**: [`tests/unit/82-arr02-toggle-leader-visibility.test.ts`](./unit/82-arr02-toggle-leader-visibility.test.ts)
* **Класс эквивалентности**: `ARR-02 (Toggle Leader Line)`
* **Описание**: Проверяет включение и выключение флага showLeader у стрелки.

#### Предусловия:
* - Стрелка имеет выключенный showLeader.

#### Выполняемые действия:
1. Вызвать toggleLeader.
2. Проверить showLeader === true.
3. Вызвать toggleLeader повторно.

#### Ожидаемый результат:
Флаг выноски успешно переключается true <-> false.

---

### ТЕСТ №83: Стрелки: Удаление стрелки с очисткой зависимых узлов ветвления

* **Файл**: [`tests/unit/83-arr03-delete-arrow-and-cascade-branches.test.ts`](./unit/83-arr03-delete-arrow-and-cascade-branches.test.ts)
* **Класс эквивалентности**: `ARR-03 (Delete Arrow Cascade)`
* **Описание**: Проверяет удаление магистральной стрелки и автоматическую очистку зависимых узлов.

#### Предусловия:
* - Диаграмма содержит магистраль и узел ветвления.

#### Выполняемые действия:
1. Вызвать deleteArrow для ствола.
2. Проверить удаление стрелки.

#### Ожидаемый результат:
Стрелка удалена из диаграммы.

---

### ТЕСТ №84: Стрелки: Фиксация геометрии стрелки (setArrowPinned)

* **Файл**: [`tests/unit/84-arr04-set-arrow-pinned-state.test.ts`](./unit/84-arr04-set-arrow-pinned-state.test.ts)
* **Класс эквивалентности**: `ARR-04 (Arrow Pinning State)`
* **Описание**: Проверяет фиксацию пользовательского маршрута флагом pinned.

#### Предусловия:
* - Стрелка создана с pinned: false.

#### Выполняемые действия:
1. Вызвать store.setArrowPinned(a.id, true).
2. Проверить флаг pinned.

#### Ожидаемый результат:
Флаг pinned установлен в true.

---

### ТЕСТ №85: Стрелки: Сброс ручных изломов к автоматическому ортогональному маршруту

* **Файл**: [`tests/unit/85-arr05-reset-arrow-route-to-auto.test.ts`](./unit/85-arr05-reset-arrow-route-to-auto.test.ts)
* **Класс эквивалентности**: `ARR-05 (Reset Arrow Route)`
* **Описание**: Проверяет сброс пользовательских изломов стрелки вызовом resetArrowRoute.

#### Предусловия:
* - Стрелка зафиксирована с ручным зигзагом (pinned: true).

#### Выполняемые действия:
1. Вызвать resetArrowRoute.
2. Проверить pinned === false.

#### Ожидаемый результат:
Флаг pinned сброшен, стрелка переведена в авто-режим.

---

### ТЕСТ №86: Стрелки: Установка цвета семейства потока для ствола и ответвлений

* **Файл**: [`tests/unit/86-arr06-set-flow-family-color.test.ts`](./unit/86-arr06-set-flow-family-color.test.ts)
* **Класс эквивалентности**: `ARR-06 (Flow Family Coloring)`
* **Описание**: Проверяет каскадную окраску ствола и всех связанных ответвлений вызовом setFlowFamilyColor.

#### Предусловия:
* - Магистраль и ответвление на диаграмме.

#### Выполняемые действия:
1. Вызвать setFlowFamilyColor(trunk.id, '#ef4444').
2. Проверить цвет магистрали и ветви.

#### Ожидаемый результат:
Оба потока окрашены в цвет '#ef4444'.

---

### ТЕСТ №87: Проект: Сброс проекта в начальное состояние (resetProject)

* **Файл**: [`tests/unit/87-proj01-reset-project-state.test.ts`](./unit/87-proj01-reset-project-state.test.ts)
* **Класс эквивалентности**: `PROJ-01 (Reset Project State)`
* **Описание**: Проверяет очистку всех диаграмм и возврат к единой контекстной диаграмме A0.

#### Предусловия:
* - В проекте созданы диаграммы и блоки.

#### Выполняемые действия:
1. Вызвать store.resetProject().
2. Проверить структуру проекта.

#### Ожидаемый результат:
Проект сброшен к базовой диаграмме A0 с 1 блоком.

---

### ТЕСТ №88: Проект: Обновление метаданных проекта (updateProjectMeta)

* **Файл**: [`tests/unit/88-proj02-update-project-metadata.test.ts`](./unit/88-proj02-update-project-metadata.test.ts)
* **Класс эквивалентности**: `PROJ-02 (Update Project Metadata)`
* **Описание**: Проверяет обновление названия и описания проекта в store.

#### Предусловия:
* - Проект инициализирован.

#### Выполняемые действия:
1. Вызвать updateProjectMeta('Логистика', 'Модель снабжения').
2. Проверить обновленные поля.

#### Ожидаемый результат:
Метаданные проекта успешно обновлены.

---

### ТЕСТ №89: Проект: Переключение активной диаграммы проекта (switchDiagram)

* **Файл**: [`tests/unit/89-proj03-switch-active-diagram.test.ts`](./unit/89-proj03-switch-active-diagram.test.ts)
* **Класс эквивалентности**: `PROJ-03 (Switch Active Diagram)`
* **Описание**: Проверяет смену текущей отображаемой диаграммы вызовом switchDiagram.

#### Предусловия:
* - Проект содержит диаграммы A0 и A2.

#### Выполняемые действия:
1. Вызвать store.switchDiagram(d2.id).
2. Проверить store.getActiveDiagram().id.

#### Ожидаемый результат:
Активной стала диаграмма A2.

---

### ТЕСТ №90: Проект: Создание произвольной диаграммы в проекте (createDiagram)

* **Файл**: [`tests/unit/90-proj04-create-custom-diagram.test.ts`](./unit/90-proj04-create-custom-diagram.test.ts)
* **Класс эквивалентности**: `PROJ-04 (Create Custom Diagram)`
* **Описание**: Проверяет добавление новой диаграммы с заданным кодом и заголовком.

#### Предусловия:
* - Проект инициализирован.

#### Выполняемые действия:
1. Вызвать store.createDiagram('A3', 'Производство').
2. Проверить наличие диаграммы в project.diagrams.

#### Ожидаемый результат:
Диаграмма создана и зарегистрирована в проекте.

---

### ТЕСТ №91: Проект: Сохранение и восстановление снимка проекта (Snapshot)

* **Файл**: [`tests/unit/91-proj05-save-and-restore-project-snapshot.test.ts`](./unit/91-proj05-save-and-restore-project-snapshot.test.ts)
* **Класс эквивалентности**: `PROJ-05 (Project Snapshot Engine)`
* **Описание**: Проверяет сохранение именованной контрольной точки и восстановление состояния из неё.

#### Предусловия:
* - Проект находится в состоянии 1.

#### Выполняемые действия:
1. Создать снимок saveProjectSnapshot('Версия 1').
2. Внести изменения (удалить блок).
3. Восстановить проект из снимка restoreSnapshot.

#### Ожидаемый результат:
Состояние проекта полностью восстановлено из сохраненного снимка.

---

### ТЕСТ №92: Проект: Удаление сохраненного снимка проекта

* **Файл**: [`tests/unit/92-proj06-delete-project-snapshot.test.ts`](./unit/92-proj06-delete-project-snapshot.test.ts)
* **Класс эквивалентности**: `PROJ-06 (Delete Project Snapshot)`
* **Описание**: Проверяет удаление снимка из списка контрольных точек.

#### Предусловия:
* - В проекте сохранен снимок.

#### Выполняемые действия:
1. Вызвать store.deleteSnapshot(snap.id).
2. Проверить отсутствие снимка в snapshots.

#### Ожидаемый результат:
Снимок удален из списка проекта.

---

### ТЕСТ №93: Линтер: Предупреждение о перегруженной диаграмме (> 6 блоков)

* **Файл**: [`tests/unit/93-lint07-warn-too-many-blocks.test.ts`](./unit/93-lint07-warn-too-many-blocks.test.ts)
* **Класс эквивалентности**: `LINT-07 (Excessive Block Count Warning)`
* **Описание**: Проверяет стандарт IDEF0: диаграмма декомпозиции не должна содержать более 6 блоков.

#### Предусловия:
* - Диаграмма A1 содержит 7 функциональных блоков.

#### Выполняемые действия:
1. Запустить runIDEF0Linter.
2. Проверить наличие предупреждения FR-LINT-01.

#### Ожидаемый результат:
Линтер выдает предупреждение о превышении предела в 6 блоков.

---

### ТЕСТ №94: Линтер: Ошибка недопустимо малого размера блока (< 100x60px)

* **Файл**: [`tests/unit/94-lint08-error-block-too-small.test.ts`](./unit/94-lint08-error-block-too-small.test.ts)
* **Класс эквивалентности**: `LINT-08 (Minimum Block Size Error)`
* **Описание**: Проверяет стандарт IDEF0: функциональный блок не может быть меньше 100x60 пикселей.

#### Предусловия:
* - Диаграмма содержит блок 80x40px.

#### Выполняемые действия:
1. Запустить линтер.
2. Проверить ошибку FR-LINT-01.

#### Ожидаемый результат:
Линтер генерирует ошибку о недопустимо малом размере блока.

---

### ТЕСТ №95: Линтер: Предупреждение о чрезмерно большом блоке (> 800x600px)

* **Файл**: [`tests/unit/95-lint09-warn-block-too-large.test.ts`](./unit/95-lint09-warn-block-too-large.test.ts)
* **Класс эквивалентности**: `LINT-09 (Maximum Block Size Warning)`
* **Описание**: Проверяет генерацию предупреждения линтера при превышении максимального размера блока.

#### Предусловия:
* - Блок имеет размеры 900x700px.

#### Выполняемые действия:
1. Запустить линтер.
2. Проверить предупреждение о размере.

#### Ожидаемый результат:
Линтер выдает предупреждение о слишком большом блоке.

---

### ТЕСТ №96: Линтер: Ошибка выхода блока за границы формата листа A4

* **Файл**: [`tests/unit/96-lint10-error-block-out-of-bounds.test.ts`](./unit/96-lint10-error-block-out-of-bounds.test.ts)
* **Класс эквивалентности**: `LINT-10 (Block Canvas Out of Bounds Error)`
* **Описание**: Проверяет обнаружение вылезания функционального блока за пределы листа холста.

#### Предусловия:
* - Блок размещен в координатах (1500, 850, 200, 100).

#### Выполняемые действия:
1. Запустить runIDEF0Linter.
2. Проверить ошибку выхода за границы.

#### Ожидаемый результат:
Линтер фиксирует ошибку: блок выходит за границы холста.

---

### ТЕСТ №97: Линтер: Обнаружение дисбаланса граничных стрелок между уровнями

* **Файл**: [`tests/unit/97-lint11-boundary-arrow-imbalance-detection.test.ts`](./unit/97-lint11-boundary-arrow-imbalance-detection.test.ts)
* **Класс эквивалентности**: `LINT-11 (Boundary Imbalance Error Detection)`
* **Описание**: Проверяет балансировку ICOM: стрелка родительского блока отсутствует на дочерней диаграмме.

#### Предусловия:
* - Родительский блок A0 имеет входящий поток "Сырье", дочерняя диаграмма A1 не содержит такого граничного входа.

#### Выполняемые действия:
1. Запустить линтер для дочерней диаграммы A1.
2. Проверить диагностику FR-LINT-04.

#### Ожидаемый результат:
Зафиксировано нарушение FR-LINT-04 о пропущенном граничном потоке.

---

### ТЕСТ №98: Линтер: Обнаружение разрыва ссылки на родительский поток в узле

* **Файл**: [`tests/unit/98-lint12-broken-junction-parent-reference.test.ts`](./unit/98-lint12-broken-junction-parent-reference.test.ts)
* **Класс эквивалентности**: `LINT-12 (Broken Branch Reference Detection)`
* **Описание**: Проверяет обнаружение ответвления, ссылающегося на несуществующий узел или родительскую стрелку.

#### Предусловия:
* - Стрелка ответвления ссылается на отсутствующий узел junction.

#### Выполняемые действия:
1. Запустить линтер.
2. Проверить наличие ошибки FR-LINT-06 о битой ссылке.

#### Ожидаемый результат:
Обнаружена ошибка о разрыве ссылки на родительский поток.

---

### ТЕСТ №99: Именование: Определение родительской стрелки через getArrowParent

* **Файл**: [`tests/unit/99-name01-resolve-arrow-parent-hierarchy.test.ts`](./unit/99-name01-resolve-arrow-parent-hierarchy.test.ts)
* **Класс эквивалентности**: `NAME-01 (Arrow Parent Resolution)`
* **Описание**: Проверяет автоматическое нахождение родительского ствола для дочерней ветви.

#### Предусловия:
* - Магистральная стрелка и подключенная к ее узлу ветвь.

#### Выполняемые действия:
1. Вызвать getArrowParent(branch, diag).
2. Проверить совпадение найденной родительской стрелки.

#### Ожидаемый результат:
Родительская стрелка успешно идентифицирована.

---

