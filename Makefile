up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

restart: down up

build:
	docker-compose build --no-cache

generate-migration:
	docker-compose run --rm app npx mikro-orm migration:create

migrate:
	docker-compose run --rm app npx mikro-orm migration:up