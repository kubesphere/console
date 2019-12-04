setup:
	docker volume create nodemodules

install:
	docker-compose -f docker-compose.builder.yaml run --rm install

dev:
	docker-compose up

build:
	docker-compose -f docker-compose.builder.yaml run --rm build

yarn-%:
	docker-compose -f docker-compose.builder.yaml run --rm base yarn $*
