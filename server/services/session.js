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

const isEmpty = require('lodash/isEmpty')
const intersection = require('lodash/intersection')
const jwtDecode = require('jwt-decode')

const { send_gateway_request } = require('../libs/request')

const { getServerConfig, formatRules, isAppsRoute } = require('../libs/utils')

const { client: clientConfig } = getServerConfig()

const login = async (data, headers) => {
  const resp = await send_gateway_request({
    method: 'POST',
    url: '/kapis/iam.kubesphere.io/v1alpha2/login',
    headers,
    params: data,
  })

  if (!resp.access_token) {
    throw new Error(resp.message)
  }

  const { username } = jwtDecode(resp.access_token)

  return { username, token: resp.access_token }
}

const oAuthLogin = async params => {
  const resp = await send_gateway_request({
    method: 'POST',
    url: `/kapis/iam.kubesphere.io/v1alpha2/login/oauth/${params.state}`,
    params,
  })

  if (!resp.access_token) {
    throw new Error(resp.message)
  }

  const { username } = jwtDecode(resp.access_token)

  return { username, token: resp.access_token }
}

const getUserDetail = async (username, token) => {
  let user = {}

  const resp = await send_gateway_request({
    method: 'GET',
    url: `/kapis/iam.kubesphere.io/v1alpha2/users/${username}`,
    token,
  })

  if (resp) {
    user = resp
  } else {
    throw new Error(resp)
  }

  return user
}

const formatUserDetail = user => {
  user.groups = user.groups || []

  user.cluster_rules = formatRules(user.cluster_rules)

  return user
}

const getWorkspaces = async token => {
  let workspaces = []

  const resp = await send_gateway_request({
    method: 'GET',
    url: '/kapis/tenant.kubesphere.io/v1alpha2/workspaces',
    token,
  })

  if (resp && resp.items) {
    workspaces = resp.items.map(item => item.metadata.name)
  }

  return workspaces
}

const getWorkspaceRules = async (token, workspace) => {
  const resp = await send_gateway_request({
    method: 'GET',
    url: `/kapis/tenant.kubesphere.io/v1alpha2/workspaces/${workspace}/rules`,
    token,
  })
  return resp
}

const getKSConfig = async token => {
  let resp = []
  try {
    resp = await send_gateway_request({
      method: 'GET',
      url: `/kapis/v1alpha1/configz`,
      token,
    })
  } catch (error) {
    console.error(error)
  }

  return resp
}

const getCurrentUser = async ctx => {
  const token = ctx.cookies.get('token')
  const username = ctx.cookies.get('currentUser')

  if (!username || !token) {
    if (isAppsRoute(ctx.path)) {
      const ksConfig = await getKSConfig()
      return {
        user: null,
        config: clientConfig,
        ksConfig,
      }
    }
    ctx.throw(401, 'Not Login')
  }

  const [userDetail, workspaces, ksConfig] = await Promise.all([
    getUserDetail(username, token),
    getWorkspaces(token),
    getKSConfig(token),
  ])

  const workspace_rules = {}

  if (workspaces.length === 1) {
    const rules = await getWorkspaceRules(token, workspaces[0])

    const formatedRules = formatRules(rules)
    if (workspaces[0] === clientConfig.systemWorkspace) {
      Object.keys(formatedRules).forEach(key => {
        formatedRules[key] = intersection(
          formatedRules[key],
          clientConfig.systemWorkspaceRules[key]
        )
      })
    }

    workspace_rules[workspaces[0]] = formatedRules
  }

  return {
    config: { ...clientConfig },
    user: {
      ...formatUserDetail(userDetail),
      workspaces,
      workspace_rules,
    },
    ksConfig,
  }
}

const getOAuthInfo = async () => {
  let resp = []
  try {
    resp = await send_gateway_request({
      method: 'GET',
      url: `/kapis/iam.kubesphere.io/v1alpha2/oauth/configs`,
    })
  } catch (error) {
    console.error(error)
  }

  const servers = []
  if (!isEmpty(resp)) {
    resp.forEach(item => {
      if (item && item.Endpoint) {
        const title = item.Description
        const params = {
          state: item.Name,
          client_id: item.ClientID,
          response_type: 'code',
        }

        if (item.Redirect_URL) {
          params.redirect_uri = item.Redirect_URL
        }
        if (item.Scopes && item.Scopes.length > 0) {
          params.scope = item.Scopes.join(' ')
        }

        const url = `${item.Endpoint.AuthURL}?${Object.keys(params)
          .map(
            key =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join('&')}`

        servers.push({ title, url })
      }
    })
  }

  return servers
}

module.exports = {
  login,
  oAuthLogin,
  getCurrentUser,
  getOAuthInfo,
}
