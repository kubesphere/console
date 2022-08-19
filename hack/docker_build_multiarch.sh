#!/usr/bin/env bash

set -ex
set -o pipefail

TAG=${TAG:-latest}
REPO=${REPO:-kubespheredev}
PUSH=${PUSH:-}

# support other container tools. e.g. podman
CONTAINER_CLI=${CONTAINER_CLI:-docker}
CONTAINER_BUILDER=${CONTAINER_BUILDER:-"buildx build"}
CONTAINER_BUILD=${CONTAINER_BUILD:-"build"}
CONTAINER_CREATE=${CONTAINER_CREATE:-"create"}
CONTAINER_COPY=${CONTAINER_COPY:-"cp"}

# If set, just building, no pushing
if [[ -z "${DRY_RUN:-}" ]]; then
  PUSH="--push"
fi

# supported platforms
PLATFORMS=linux/amd64,linux/arm64

#first preimage
${CONTAINER_CLI} ${CONTAINER_BUILD} \
  -f build/Dockerfile2 \
  --target builder
  -t "${REPO}"/ks-console-pre:"${TAG}" .

#build preimage
${CONTAINER_CLI} ${CONTAINER_CREATE} \
  --name predbuild "${REPO}"/ks-console-pre:

#copy preimage:./out/ ./out/
${CONTAINER_CLI} ${CONTAINER_COPY} \
  predbuild:/out/ ./out/

# shellcheck disable=SC2086 # inteneded splitting of CONTAINER_BUILDER
${CONTAINER_CLI} ${CONTAINER_BUILDER} \
  --platform ${PLATFORMS} \
  ${PUSH} \
  -f build/Dockerfile2 \
  -t "${REPO}"/ks-console:"${TAG}" .
