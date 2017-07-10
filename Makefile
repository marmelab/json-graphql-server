YARN ?= $(shell which yarn)
PKG ?= $(if $(YARN),$(YARN),$(shell which npm))

.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	@$(PKG) install

clean: ## Clean up the lib folder for building
	@rm -rf lib

build: clean ## Compile ES6 files to JS
	./node_modules/.bin/rollup -c

watch: ## continuously compile ES6 files to JS
	@NODE_ENV=production ./node_modules/.bin/babel \
		--out-dir=lib \
		--ignore='*.test.js' \
		--watch \
		./src

test: ## Launch unit tests
	@./node_modules/.bin/jest

watch-test: ## Launch unit tests and watch for changes
	@./node_modules/.bin/jest --watch

format: ## Format the source code
	@./node_modules/.bin/eslint --fix ./src
