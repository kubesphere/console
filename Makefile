# Copyright 2021 The KubeSphere Authors. All rights reserved.
# Use of this source code is governed by a AGPL-3.0 license
# that can be found in the LICENSE file.

REPO?=kubespheredev
TAG?=$(shell git rev-parse --abbrev-ref HEAD)

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
	DRY_RUN=true hack/docker_build.sh

container-push:	## Build the container and push
	hack/docker_build.sh

container-cross:	## Build the container for multiple platforms(currently linux/amd64,linux/arm64)
	DRY_RUN=true hack/docker_build_multiarch.sh

container-cross-push:	## Build the container for multiple platforms and push
	hack/docker_build_multiarch.sh
