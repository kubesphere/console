/**
 * type repo
 *  { provider, url, server, owner, repo }
 */

/**
 * github to repo
 * example: {
    "repo": "qingcloud-sdk-python",
    "credential_id": "github-id",
    "owner": "yunify",
    "discover_branches": 1,
    "discover_pr_from_forks": {
        "strategy": 2,
        "trust": 2
    },
    "discover_pr_from_origin": 2,
    "discover_tags": true
}
 result: repo
 */
export function getGithubSource(data) {
  const { owner, repo } = data
  const repoURL = repo.url || repo.remote || repo.repo

  return {
    repo,
    owner,
    url: /^https:\/\//.test(repoURL)
      ? repoURL
      : `https://github.com/${owner}/${repo}`,
  }
}

/**
 * gitlab to repo
 */
export function getGitlabSource(data) {
  const { owner, repo, server_name } = data
  return {
    repo,
    owner,
    server: server_name,
    url: `${server_name}/${owner}/${repo}`,
  }
}

/**
 * bitbucket to repo
 */
export function getBitbucketSource(data) {
  const { owner, repo, api_uri } = data
  const uri = api_uri
  // eslint-disable-next-line no-case-declarations
  let _url = uri.substr(uri.length - 1) === '/' ? uri : `${uri}/`
  if (!/https:\/\/bitbucket.org\/?/gm.test(_url)) {
    _url += 'scm/'
  }
  return {
    repo,
    owner,
    server: _url,
    url: `${_url}${owner}/${repo}`,
  }
}

/**
 * git to repo
 */
export function getGitSource(data) {
  const { url } = data
  return {
    url,
  }
}

const gitRepositorySpec2BaseSource = (spec, name) => {
  return {
    scm_id: name,
    owner: spec?.owner,
    repo: spec?.repo,
    credential_id: spec?.secret?.name,
    discover_branches: 1,
    discover_pr_from_forks: { strategy: 2, trust: 2 },
    discover_pr_from_origin: 2,
    discover_tags: true,
  }
}

export const gitRepositorySpec2GithubSource = gitRepositorySpec2BaseSource

export const gitRepositorySpec2GitlabSource = (spec, name) => {
  return {
    gitlab_source: {
      ...gitRepositorySpec2BaseSource(spec, name),
      server_name: spec?.server,
    },
  }
}

export const gitRepositorySpec2BitbucketSource = (spec, name) => {
  return {
    ...gitRepositorySpec2BaseSource(spec, name),
    api_uri: spec?.server,
  }
}
export const gitRepositorySpec2GitSource = (spec, name) => {
  return {
    scm_id: name,
    credential_id: spec?.secret?.name,
    url: spec?.url,
  }
}

export const gitRepositorySpec2Source = {
  github: gitRepositorySpec2GithubSource,
  gitlab: gitRepositorySpec2GitlabSource,
  bitbucket_server: gitRepositorySpec2BitbucketSource,
  git: gitRepositorySpec2GitSource,
}
