# IDEF0 Studio

Редактор функциональных диаграмм стандарта IDEF0.

## Интерфейс

### Контекстная диаграмма (A0)
![Контекстная диаграмма](assets/01_context_diagram.png)

### Диаграмма декомпозиции
![Диаграмма декомпозиции](assets/02_decomposition_diagram.png)

## Как запустить

### Предварительные требования
* **Bun**
* **Java** (OpenJDK 21+)
* **make**

### Запуск через Makefile
```bash
make install    # Установка зависимостей
make build      # Сборка ClojureScript
make dev        # Запуск локального сервера (http://localhost:3000/)
make test       # Запуск модульных тестов
```
