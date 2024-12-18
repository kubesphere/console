#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o pipefail

GOOS=linux
GOARCH=amd64
GOLANG_IMAGE=golang:1.16
# project dir
PROJECT_DIR="$(dirname "$(realpath "$0")")"/..
if ! [ -f bin/"$GOOS"_"$GOARCH"/license-eye ]; then
  docker run -v "$PROJECT_DIR/bin/:/go/bin" $GOLANG_IMAGE sh -c "GOOS='$GOOS' GOARCH='$GOARCH' CGO_ENABLED=0 go install -mod=mod github.com/apache/skywalking-eyes/cmd/license-eye@v0.4.0"
fi

echo 'running skywalking-eyes fix '
# linux
bin/license-eye header fix
# darwin
# bin/"$GOOS"_"$GOARCH"/license-eye header fix
exit 0
