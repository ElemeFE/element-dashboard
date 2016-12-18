.PHONY: dist test
install:
	@npm install
dev: install
	npm run dev
deploy:
	@npm run deploy
alpha:
	@npm run alpha
beta:
	@npm run beta