REPO?=kubespheredev/ks-console
TAG:=$(shell git rev-parse --abbrev-ref HEAD)-dev

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

image:
	rm -rf build && mkdir -p build
	tar --exclude=".git" --exclude='node_modules' --exclude='build' --warning=no-file-changed -czf build/console.tar.gz .
	docker build build -t $(REPO):$(TAG) -f Dockerfile.multistage
image-push:
	docker push $(REPO):$(TAG)
