.PHONY: help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	@npm install
	@cd example/node && npm install

watch: ## continuously compile ES6 files to JS
	@npx vite build --watch

test: ## Launch unit tests
	@npm run test

watch-test: ## Launch unit tests and watch for changes
	@npm run watch-test

check: ## Lint and format the source code
	@npm run check

lint: ## Lint the source code
	@npm run lint

format: ## Format the source code
	@npm run format

run: ## Launch server with example data
	@npm run server

build: ## Build production release
	@npm run build
