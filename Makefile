.PHONY: dist test
install:
	@npm install

dev: install
	@npm run dev

build:
	@npm run build
