# check for eslint
HASESLINT := $(shell which eslint 2> /dev/null)
# check for prettier
HASPRETTIER := $(shell which prettier 2> /dev/null)
# check for stylelint
HASSTYLELINT := $(shell which stylelint 2> /dev/null)

# check for eslint
ifdef HASESLINT
	ESLINT := eslint
else
	ESLINT := npx eslint
endif

# check for prettier
ifdef HASPRETTIER
	PRETTIER := prettier
else
	PRETTIER := npx prettier
endif

# check for stylelint
ifdef HASSTYLELINT
	STYLELINT := stylelint
else
	STYLELINT := npx stylelint
endif


.PHONY: dev
dev: # clean previous build files
	@make clean
	pnpm run dev

.PHONY: build
build:
	pnpm run build

.PHONY:lint
lint:
	pnpm run lint

.PHONY: format
format:
	pnpm run format

.PHONY: clean
clean:
	rm -rf .next/ dist/ public/sw.js public/sw.js.map public/workbox-*.js public/workbox-*.js.map yarn-error.log .swc/ .eslintcache .prettiercache .contentlayercache .contentlayercache.lock .contentlayer

.PHONY: verbose-clean
verbose-clean:
	@make clean
	rm -rf node_modules/
