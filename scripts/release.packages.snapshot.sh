#!/bin/sh

TAG=$1

if [ -z "$TAG" ]; then
  echo "Error: No tag provided. Usage: yarn run release:packages:snapshot -- <tag>"
  exit 1
fi

changeset version --snapshot "$TAG" &&
  changeset publish --no-git-tag --tag "$TAG"
