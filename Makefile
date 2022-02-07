up:
	docker-compose -f docker-compose.yml up -d

down:
	docker-compose -f docker-compose.yml down --remove-orphans

restart: down up

build:
	docker-compose -f docker-compose.yml build --no-cache

install-deps:
	docker-compose run --rm app npm i

migration:
	docker-compose run --rm app npx mikro-orm migration:create

migrate:
	docker-compose run --rm app npx mikro-orm migration:up

prod-up:
	docker-compose -f docker-compose-production.yml up -d

prod-build:
	docker-compose -f docker-compose-production.yml build --no-cache