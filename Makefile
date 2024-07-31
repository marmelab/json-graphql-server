YARN ?= $(shell which yarn)
PKG ?= $(if $(YARN),$(YARN),$(shell which npm))

.PHONY: help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	@$(PKG) install

watch: ## continuously compile ES6 files to JS
	@yarn vite build --watch

test: ## Launch unit tests
	@yarn run test

watch-test: ## Launch unit tests and watch for changes
	@yarn run watch-test

format: ## Format the source code
	@yarn run format

run: ## Launch server with example data
	@yarn run server

build: ## Build production release
	@yarn run build
