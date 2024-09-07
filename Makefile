

REPO?=kubespheredev
TAG?=$(shell git rev-parse --abbrev-ref HEAD | sed -e 's/\//-/g')

.PHONY: all
all: test build serve

help:	## Show this help.
	@grep -hE '^[ a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-23s\033[0m %s\n", $$1, $$2}'

test:	## Run tests suite.
	yarn test

build:	## Build
	yarn build

serve:	## Run console on port :8000
	npm run serve

container:	## Build the container image
	DRY_RUN=true TAG=${TAG} hack/docker_build.sh

container-push:	## Build the container and push
	TAG=${TAG} hack/docker_build.sh

container-cross:	## Build the container for multiple platforms(currently linux/amd64,linux/arm64)
	DRY_RUN=true hack/docker_build_multiarch.sh

container-cross-push:	## Build the container for multiple platforms and push
	hack/docker_build_multiarch.sh
