up:
	docker-compose up -d

build:
	docker-compose build --no-cache

down:
	docker-compose down --remove-orphans

generate-migration:
	docker-compose run --rm app npx mikro-orm migration:create --initial

migrate:
	docker-compose run --rm app npx mikro-orm migration:up