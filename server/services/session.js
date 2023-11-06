/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

const get = require('lodash/get')
const uniq = require('lodash/uniq')
const isEmpty = require('lodash/isEmpty')
const isArray = require('lodash/isArray')
const jwtDecode = require('jwt-decode')

const { send_gateway_request } = require('../libs/request')

const { isAppsRoute, safeParseJSON, getServerConfig } = require('../libs/utils')

const { server: serverConfig } = getServerConfig()

const handleLoginResp = (resp = {}) => {
  if (!resp.access_token) {
    throw new Error(resp.message)
  }

  const { access_token, refresh_token, expires_in } = resp || {}

  const { username, extra, groups } = jwtDecode(access_token)
  const email = get(extra, 'email[0]')
  const initialized = get(extra, 'uninitialized[0]') !== 'true'
  const extraname = get(extra, 'username[0]') || get(extra, 'uid[0]')

  return {
    username,
    email,
    groups,
    extraname,
    initialized,
    token: access_token,
    refreshToken: refresh_token,
    expire: new Date().getTime() + Number(expires_in) * 1000,
  }
}

const login = async (data, headers) => {
  let clientID = serverConfig.apiServer.clientID
  if (!clientID) {
    clientID = 'kubesphere'
  }

  let clientSecret = serverConfig.apiServer.clientSecret
  if (!clientSecret) {
    clientSecret = 'kubesphere'
  }

  data.client_id = clientID
  data.client_secret = clientSecret

  const resp = await send_gateway_request({
    method: 'POST',
    url: '/oauth/token',
    headers: {
      ...headers,
      'content-type': 'application/x-www-form-urlencoded',
    },
    params: {
      ...data,
      grant_type: 'password',
    },
  })

  return handleLoginResp(resp)
}

const loginThird = async ({ title, ...params }) => {
  const resp = await send_gateway_request({
    method: 'POST',
    url: `/oauth/login/${title}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    params,
  })

  return handleLoginResp(resp)
}

const getNewToken = async ctx => {
  const refreshToken = ctx.cookies.get('refreshToken')
  let newToken = {}

  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }

  let clientID = serverConfig.apiServer.clientID
  if (!clientID) {
    clientID = 'kubesphere'
  }

  let clientSecret = serverConfig.apiServer.clientSecret
  if (!clientSecret) {
    clientSecret = 'kubesphere'
  }

  data.client_id = clientID
  data.client_secret = clientSecret

  const resp = await send_gateway_request({
    method: 'POST',
    url: '/oauth/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    params: data,
    token: refreshToken,
  })

  const { access_token, refresh_token, expires_in } = resp || {}

  if (!access_token) {
    throw new Error(resp.message)
  }

  newToken = {
    token: access_token,
    refreshToken: refresh_token,
    expire: new Date().getTime() + Number(expires_in) * 1000,
  }

  return newToken
}

const oAuthLogin = async ({ oauthName, ...params }) => {
  const resp = await send_gateway_request({
    method: 'GET',
    url: `/oauth/callback/${oauthName}`,
    params,
  })

  return handleLoginResp(resp)
}

const getUserGlobalRules = async (username, token) => {
  const resp = await send_gateway_request({
    method: 'GET',
    url: `/kapis/iam.kubesphere.io/v1alpha2/users/${username}/globalroles`,
    token,
  })

  const rules = {}
  resp.forEach(item => {
    const rule = safeParseJSON(
      get(
        item,
        "metadata.annotations['iam.kubesphere.io/role-template-rules']"
      ),
      {}
    )

    Object.keys(rule).forEach(key => {
      rules[key] = rules[key] || []
      if (isArray(rule[key])) {
        rules[key].push(...rule[key])
      } else {
        rules[key].push(rule[key])
      }
      rules[key] = uniq(rules[key])
    })
  })

  return rules
}

const getUserDetail = async (token, clusterRole, isMulticluster) => {
  let user = {}

  const { username } = jwtDecode(token)

  const resp = await send_gateway_request({
    method: 'GET',
    url: `/kapis/iam.kubesphere.io/v1alpha2/users/${username}`,
    token,
  })

  if (resp) {
    user = {
      email: get(resp, 'spec.email'),
      lang: get(resp, 'spec.lang'),
      username: get(resp, 'metadata.name'),
      globalrole: get(
        resp,
        'metadata.annotations["iam.kubesphere.io/globalrole"]'
      ),
      grantedClusters: get(
        resp,
        'metadata.annotations["iam.kubesphere.io/granted-clusters"]',
        []
      ),
      lastLoginTime: get(resp, 'status.lastLoginTime'),
    }
  } else {
    throw new Error(resp)
  }

  try {
    const roles = await getUserGlobalRules(username, token)

    if (clusterRole === 'member') {
      roles.users = roles.users.filter(role => role !== 'manage')
      roles.workspaces = roles.workspaces.filter(role => role !== 'manage')
    }

    const isClustersRole = Object.keys(roles).includes('clusters')

    if (
      !isClustersRole &&
      user.grantedClusters.length > 0 &&
      isMulticluster === true
    ) {
      roles.clusters = ['view']
    }

    user.globalRules = roles
  } catch (error) {}

  return user
}

const getWorkspaces = async (token, clusterRole) => {
  let workspaces = []
  let version = 3.2

  const backendVersion = await send_gateway_request({
    method: 'GET',
    url: `/kapis/version`,
    token,
  })
  if (backendVersion) {
    const _version = backendVersion.gitVersion.replace(/[^\d.]/g, '')
    version = Number(
      _version
        .split('.')
        .slice(0, 2)
        .join('.')
    )
  }
  const url =
    version > 3.2
      ? clusterRole === 'host'
        ? '/kapis/tenant.kubesphere.io/v1alpha3/workspacetemplates'
        : '/kapis/tenant.kubesphere.io/v1alpha3/workspaces'
      : '/kapis/tenant.kubesphere.io/v1alpha2/workspaces'

  const resp = await send_gateway_request({
    method: 'GET',
    url,
    params: { limit: 10 },
    token,
  })

  if (resp && resp.items) {
    workspaces = resp.items.map(item => item.metadata.name)
  }

  return workspaces
}

const getKSConfig = async token => {
  let resp = {}
  try {
    const [config, version] = await Promise.all([
      send_gateway_request({
        method: 'GET',
        url: `/kapis/config.kubesphere.io/v1alpha2/configs/configz`,
        token,
      }),
      send_gateway_request({
        method: 'GET',
        url: `/kapis/version`,
        token,
      }),
    ])
    resp = { ...config }
    if (version) {
      resp.ksVersion = version.gitVersion
      resp.k8sVersion = get(version, 'kubernetes.gitVersion')
    }
  } catch (error) {
    console.error(error)
  }

  return resp
}

const getK8sRuntime = async ctx => {
  const token = ctx.cookies.get('token')
  let resp = 'docker'
  if (!token) {
    return resp
  }
  try {
    const nodeList = await send_gateway_request({
      method: 'GET',
      url: `/api/v1/nodes`,
      token,
    })
    if (nodeList.items) {
      const runTime = nodeList.items[0].status.nodeInfo.containerRuntimeVersion
      resp = runTime.split(':')[0]
    }
  } catch (error) {
    console.error(error)
  }

  return resp
}

const getClusterRole = async ctx => {
  const token = ctx.cookies.get('token')
  let role = 'host'
  if (!token) {
    return role
  }
  try {
    const config = await send_gateway_request({
      method: 'GET',
      url: `/api/v1/namespaces/kubesphere-system/configmaps/kubesphere-config`,
      token,
    })
    const data = config.data['kubesphere.yaml']
    const str = /clusterRole:(\s*[\w]+\s*)/g.exec(data)

    if (str && Array.isArray(str)) {
      const clusterRole = str[0].split(':')[1].replace(/\s/g, '')
      role =
        ['host', 'member'].indexOf(clusterRole) === -1 ? 'host' : clusterRole
    }
  } catch (error) {
    console.error(error)
  }

  return role
}

const getSupportGpuList = async ctx => {
  const token = ctx.cookies.get('token')
  let gpuKinds = []
  if (!token) {
    return []
  }
  try {
    const list = await send_gateway_request({
      method: 'GET',
      url: `/kapis/config.kubesphere.io/v1alpha2/configs/gpu/kinds`,
      token,
    })
    if (Array.isArray(list)) {
      const defaultGpu = list
        .filter(item => item.default)
        .map(item => item.resourceName)

      const otherGpus = list
        .filter(item => !item.default)
        .map(item => item.resourceName)

      gpuKinds = [...defaultGpu, ...otherGpus]
    }
  } catch (error) {}

  return gpuKinds
}

// TODO: need to get the data from kubesphere
const getGitOpsEngine = async ctx => {
  const token = ctx.cookies.get('token')
  if (!token) {
    return []
  }
  return 'argocd'
}

const getCurrentUser = async (ctx, clusterRole, isMulticluster) => {
  const token = ctx.cookies.get('token')

  if (!token) {
    if (isAppsRoute(ctx.path)) {
      return null
    }
    ctx.throw(401, 'Not Login')
  }

  const [userDetail, workspaces] = await Promise.all([
    getUserDetail(token, clusterRole, isMulticluster),
    getWorkspaces(token, clusterRole),
  ])

  return { ...userDetail, workspaces }
}

const getOAuthInfo = async () => {
  let resp = []
  try {
    resp = await send_gateway_request({
      method: 'GET',
      url: `/kapis/config.kubesphere.io/v1alpha2/configs/oauth`,
    })
  } catch (error) {
    console.error(error)
  }

  const servers = []
  if (resp && !isEmpty(resp.identityProviders)) {
    resp.identityProviders.forEach(item => {
      if (item && item.provider) {
        let url
        let params = {}
        const title = item.name
        let type = item.type
        let endSessionURL

        const authURL = get(item, 'provider.endpoint.authURL')

        if (authURL) {
          url = authURL
          params = {
            state: item.name,
            client_id: item.provider.clientID,
            response_type: 'code',
          }

          if (item.provider.redirectURL) {
            params.redirect_uri = item.provider.redirectURL
          }

          if (item.provider.scopes && item.provider.scopes.length > 0) {
            params.scope = item.provider.scopes.join(' ')
          }

          if (item.type) {
            endSessionURL = get(item, 'provider.endpoint.endSessionURL')
            type = item.type
          }
        } else if (item.provider.casServerURL) {
          params = { service: item.provider.redirectURL }
          url = item.provider.casServerURL
        }

        if (url) {
          url = `${url}?${Object.keys(params)
            .map(
              key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
            )
            .join('&')}`
        }
        servers.push({ title, type, url, endSessionURL })
      }
    })
  }

  return servers
}

const createUser = (params, token) => {
  return send_gateway_request({
    method: 'POST',
    url: '/kapis/iam.kubesphere.io/v1alpha2/users',
    params: {
      apiVersion: 'iam.kubesphere.io/v1alpha2',
      kind: 'User',
      metadata: {
        name: params.username,
      },
      spec: {
        email: params.email,
      },
    },
    token,
  })
}

module.exports = {
  login,
  loginThird,
  oAuthLogin,
  getCurrentUser,
  getOAuthInfo,
  getNewToken,
  getKSConfig,
  getK8sRuntime,
  createUser,
  getClusterRole,
  getSupportGpuList,
  getGitOpsEngine,
}
