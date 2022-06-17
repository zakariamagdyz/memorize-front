build-dev:
	docker build \
		-t memo-front-dev \
		.

logs:
	docker logs -f memorize-frontend