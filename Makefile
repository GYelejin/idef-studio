.PHONY: help install dev run build test test-e2e videos assets clean all

# Default target
help:
	@echo "======================================================================="
	@echo "                    IDEF0 Studio Makefile Commands"
	@echo "======================================================================="
	@echo "  make install        - Установить зависимости проекта (bun install)"
	@echo "  make dev            - Запустить локальный сервер разработки (bun run dev)"
	@echo "  make run            - Запустить локальный сервер (алиас make dev)"
	@echo "  make build          - Собрать проект (bun run build)"
	@echo "  make test           - Запустить все модульные тесты (bun test)"
	@echo "  make test-e2e       - Запустить полный набор E2E тестов"
	@echo "  make videos         - Записать все 16 видео-гайдов (по use case'ам)"
	@echo "  make assets         - Снять скриншоты интерфейса A0 и декомпозиции"
	@echo "  make clean          - Очистить временные файлы и сборку"
	@echo "  make all            - Установка, сборка и тестирование"
	@echo "======================================================================="

install:
	bun install

dev:
	bun run dev

run: dev

build:
	bun run build

test:
	bun test tests/unit

test-e2e:
	bun run test:e2e

videos:
	bun tests/usecases/run-all.ts

assets:
	bun tests/usecases/generate-assets.ts

clean:
	rm -rf dist/ .nyc_output/ /tmp/rec-* /tmp/usecase-rec-*

all: install build test

