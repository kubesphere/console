#!/usr/bin/env bash

set -ex
set -o pipefail

TAG=${TAG:-latest}
REPO=${REPO:-kubespheredev}
PUSH=${PUSH:-}

# support other container tools. e.g. podman
CONTAINER_CLI=${CONTAINER_CLI:-docker}
CONTAINER_BUILDER=${CONTAINER_BUILDER:-"buildx build"}

# If set, just building, no pushing
if [[ -z "${DRY_RUN:-}" ]]; then
  PUSH="--push"
fi

# supported platforms
PLATFORMS=linux/amd64,linux/arm64

#first preimage
${CONTAINER_CLI} build \
  -f build/Dockerfile \
  --target builder
  -t ks-console-pre:"${TAG}" .

#build preimage
${CONTAINER_CLI} create \
  --name predbuild ks-console-pre:

#copy preimage:./out/ ./out/
${CONTAINER_CLI} cp \
  predbuild:/out/ ./out/

# shellcheck disable=SC2086 # inteneded splitting of CONTAINER_BUILDER
${CONTAINER_CLI} ${CONTAINER_BUILDER} \
  --platform ${PLATFORMS} \
  ${PUSH} \
  -f build/DockerfileFinal \
  -t "${REPO}"/ks-console:"${TAG}" .

#delete preimage
docker rmi ks-console-pre -f

#delete ./out folder
rm -rf ./out