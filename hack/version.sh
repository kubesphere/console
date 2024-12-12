#!/bin/sh

# -----------------------------------------------------------------------------
# Version management helpers.  These functions help to set, save and load the
# following variables:
#
#    KUBE_GIT_COMMIT - The git commit id corresponding to this
#          source code.
#    KUBE_GIT_TREE_STATE - "clean" indicates no changes since the git commit id
#        "dirty" indicates source code changes after the git commit id
#        "archive" indicates the tree was produced by 'git archive'
#    KUBE_GIT_VERSION - "vX.Y" used to indicate the last release version.
#    KUBE_GIT_MAJOR - The major part of the version
#    KUBE_GIT_MINOR - The minor component of the version

KUBE_GIT_COMMIT=""
KUBE_GIT_TREE_STATE=""
KUBE_GIT_VERSION=""
KUBE_GIT_MAJOR=""
KUBE_GIT_MINOR=""
KUBE_GIT_RELEASE_COMMIT=""
SOURCE_DATE_EPOCH=""

version_get_version_vars() {
  local git="git --work-tree ${KUBE_ROOT:-.}"

  if [ -n "${KUBE_GIT_COMMIT}" ] || KUBE_GIT_COMMIT=$(eval "$git rev-parse HEAD^{commit} 2>/dev/null"); then
    if [ -z "${KUBE_GIT_TREE_STATE}" ]; then
      git_status=$(eval "$git status --porcelain 2>/dev/null")
      if [ -z "$git_status" ]; then
        KUBE_GIT_TREE_STATE="clean"
      else
        KUBE_GIT_TREE_STATE="dirty"
      fi
    fi

    if [ -n "${KUBE_GIT_VERSION}" ] || KUBE_GIT_VERSION=$(eval "$git describe --tags --match='v*' --abbrev=14 ${KUBE_GIT_COMMIT}^{commit} 2>/dev/null"); then
      DASHES_IN_VERSION=$(echo "${KUBE_GIT_VERSION}" | sed "s/[^-]//g")
      if [ "${DASHES_IN_VERSION}" = "---" ]; then
        KUBE_GIT_VERSION=$(echo "${KUBE_GIT_VERSION}" | sed "s/-\([0-9]\{1,\}\)-g\([0-9a-f]\{14\}\)$/.\1+\2/")
      elif [ "${DASHES_IN_VERSION}" = "--" ]; then
        KUBE_GIT_VERSION=$(echo "${KUBE_GIT_VERSION}" | sed "s/-g\([0-9a-f]\{14\}\)$/+\1/")
      fi
      if [ "${KUBE_GIT_TREE_STATE}" = "dirty" ]; then
        KUBE_GIT_VERSION="${KUBE_GIT_VERSION}-dirty"
      fi

      echo "${KUBE_GIT_VERSION}" | grep -E '^v([0-9]+)\.([0-9]+)(\.[0-9]+)?([-].*)?([+].*)?$' > /dev/null
      if [ $? -eq 0 ]; then
        KUBE_GIT_MAJOR=$(echo "${KUBE_GIT_VERSION}" | sed -n "s/^v\([0-9]\+\)\..*/\1/p")
        KUBE_GIT_MINOR=$(echo "${KUBE_GIT_VERSION}" | sed -n "s/^v[0-9]\+\.\([0-9]\+\).*/\1/p")
        if echo "${KUBE_GIT_VERSION}" | grep -q "-"; then
          KUBE_GIT_MINOR="${KUBE_GIT_MINOR}+"
        fi
      else
        echo "KUBE_GIT_VERSION should be a valid Semantic Version. Current value: ${KUBE_GIT_VERSION}"
        echo "Please see more details here: https://semver.org"
        exit 1
      fi
    fi
  fi
}

version() {
    version_get_version_vars

    buildDate=$(date ${SOURCE_DATE_EPOCH:+--date=@"${SOURCE_DATE_EPOCH}"} -u +'%Y-%m-%dT%H:%M:%SZ')

    printf '{
  "buildDate": "%s",
  "gitCommit": "%s",
  "gitTreeState": "%s",
  "gitMajor": "%s",
  "gitMinor": "%s",
  "gitVersion": "%s",
  "gitReleaseCommit": "%s"
}\n' \
    "$buildDate" "$KUBE_GIT_COMMIT" "$KUBE_GIT_TREE_STATE" "$KUBE_GIT_MAJOR" "$KUBE_GIT_MINOR" "$KUBE_GIT_VERSION" "$KUBE_GIT_RELEASE_COMMIT"
}

if [ "$(basename "$0")" = "version.sh" ]; then
    version
fi