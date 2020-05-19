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

const { parse } = require('qs')
const get = require('lodash/get')
const isEmpty = require('lodash/isEmpty')
const jwtDecode = require('jwt-decode')

const { send_gateway_request } = require('../libs/request')

const { getServerConfig, isAppsRoute } = require('../libs/utils')

const { client: clientConfig } = getServerConfig()

const login = async (data, headers) => {
  const base64Str = Buffer.from(`${data.username}:${data.password}`).toString(
    'base64'
  )
  const resp = await send_gateway_request({
    method: 'GET',
    url: '/oauth/authorize?client_id=default&response_type=token',
    headers: {
      ...headers,
      Authorization: `Basic ${base64Str}`,
    },
    redirect: 'manual',
  })

  const { access_token } = parse(
    resp.headers.get('location').replace(/http.*(\?|#)/, '')
  )

  if (!access_token) {
    throw new Error(resp.message)
  }

  const { username } = jwtDecode(access_token)

  return { username, token: access_token }
}

const oAuthLogin = async params => {
  const resp = await send_gateway_request({
    method: 'POST',
    url: `/apis/iam.kubesphere.io/v1alpha2/login/oauth/${params.state}`,
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
    user = {
      username: get(resp, 'metadata.name'),
      email: get(resp, 'spec.email'),
      globalrole: get(
        resp,
        'metadata.annotations["iam.kubesphere.io/globalrole"]'
      ),
    }
  } else {
    throw new Error(resp)
  }

  return user
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

  const [userDetail, ksConfig] = await Promise.all([
    getUserDetail(username, token),
    getKSConfig(token),
  ])

  return {
    config: clientConfig,
    user: userDetail,
    ksConfig,
  }
}

const getOAuthInfo = async () => {
  const resp = []
  // try {
  //   resp = await send_gateway_request({
  //     method: 'GET',
  //     url: `/apis/iam.kubesphere.io/v1alpha2/oauth/configs`,
  //   })
  // } catch (error) {
  //   console.error(error)
  // }

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
