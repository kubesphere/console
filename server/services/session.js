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

const { getServerConfig, isAppsRoute, safeParseJSON } = require('../libs/utils')

const { client: clientConfig } = getServerConfig()

const login = async (data, headers) => {
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

  const { access_token, refresh_token, expires_in } = resp || {}

  if (!access_token) {
    throw new Error(resp.message)
  }

  const { username } = jwtDecode(access_token)

  return {
    username,
    token: access_token,
    refreshToken: refresh_token,
    expire: new Date().getTime() + Number(expires_in) * 1000,
  }
}

const getNewToken = async ctx => {
  const refreshToken = ctx.cookies.get('refreshToken')
  let newToken = {}

  const resp = await send_gateway_request({
    method: 'POST',
    url: '/oauth/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    params: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
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

const oAuthLogin = async params => {
  const resp = await send_gateway_request({
    method: 'GET',
    url: `/oauth/callback/${params.state}?code=${params.code}`,
  })

  if (!resp.access_token) {
    throw new Error(resp.message)
  }

  const { username } = jwtDecode(resp.access_token)

  return { username, token: resp.access_token }
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

const getUserDetail = async (username, token) => {
  let user = {}

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
    }
  } else {
    throw new Error(resp)
  }

  try {
    user.globalRules = await getUserGlobalRules(username, token)
  } catch (error) {}

  return user
}

const getWorkspaces = async token => {
  let workspaces = []

  const resp = await send_gateway_request({
    method: 'GET',
    url: '/kapis/tenant.kubesphere.io/v1alpha2/workspaces',
    params: { limit: 10 },
    token,
  })

  if (resp && resp.items) {
    workspaces = resp.items.map(item => item.metadata.name)
  }

  return workspaces
}

const getKSConfig = async token => {
  let resp = []
  try {
    resp = await send_gateway_request({
      method: 'GET',
      url: `/kapis/config.kubesphere.io/v1alpha2/configs/configz`,
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

  return {
    config: clientConfig,
    user: { ...userDetail, workspaces },
    ksConfig,
  }
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
        const title = item.name
        const params = {
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

        const url = `${item.provider.endpoint.authURL}?${Object.keys(params)
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
  getNewToken,
}
