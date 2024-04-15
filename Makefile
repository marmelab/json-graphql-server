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
	@NODE_ENV=test NODE_OPTIONS="$$NODE_OPTIONS --experimental-vm-modules" ./node_modules/.bin/jest

watch-test: ## Launch unit tests and watch for changes
	@NODE_ENV=test NODE_OPTIONS="$$NODE_OPTIONS --experimental-vm-modules" ./node_modules/.bin/jest --watch

format: ## Format the source code
	@./node_modules/.bin/eslint --fix ./src

run: ## Launch server with example data
	@node ./bin/json-graphql-server.js example/data.js

build: ## Build production release
	@yarn vite build
