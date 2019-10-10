YARN ?= $(shell which yarn)
PKG ?= $(if $(YARN),$(YARN),$(shell which npm))

.PHONY: help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	@${PKG} install

test: ## Launch unit tests
	@cd packages/json-graphql-server && NODE_ENV=test ./node_modules/.bin/jest
	@cd packages/graphql-schema-from-json && NODE_ENV=test ./node_modules/.bin/jest

