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

const fs = require('fs')
const yaml = require('js-yaml/dist/js-yaml')
const NodeCache = require('node-cache')
const get = require('lodash/get')
const merge = require('lodash/merge')
const isEmpty = require('lodash/isEmpty')
const pick = require('lodash/pick')

const MANIFEST_CACHE_KEY_PREFIX = 'MANIFEST_CACHE_KEY_'
const LOCALE_MANIFEST_CACHE_KEY = 'LOCALE_MANIFEST_CACHE_KEY'

const root = dir => `${global.APP_ROOT}/${dir}`.replace(/(\/+)/g, '/')

const cache = global._pitrixCache || new NodeCache()
if (!global._pitrixCache) {
  global._pitrixCache = cache
}

const server_conf_key = 'pitrix-server-conf-key'

/**
 *
 * @param filePath
 * @returns {*} json formatted content
 */
const loadYaml = filePath => {
  try {
    return yaml.safeLoad(fs.readFileSync(filePath), 'utf8')
  } catch (e) {
    return false
  }
}

/**
 * get server side configuration
 *
 * @returns {*|{}}
 */
const getServerConfig = key => {
  let config = cache.get(server_conf_key)
  if (!config) {
    // parse config yaml
    config = loadYaml(root('server/config.yaml')) || {}
    const tryFile = root('server/local_config.yaml')
    if (fs.existsSync(tryFile)) {
      // merge local_config
      const local_config = loadYaml(tryFile)
      if (typeof local_config === 'object') {
        merge(config, local_config)
      }
    }

    cache.set(server_conf_key, config)
  }
  return key ? config[key] : config
}

const getCache = () => cache

const isValidReferer = path =>
  !isEmpty(path) && path !== '/' && path.indexOf('/login') === -1

/**
 *
 * @param path  koa ctx.path
 */
const isAppsRoute = path => {
  return path === '/apps' || /\/apps\/?(app-([-0-9a-z]*)\/?)?$/.exec(path)
}

/**
 * 
    encrypt algorithm:
    1. read salt from template variable.
    2. base64 encode raw password, and use it as str to encrypt.
    3. keep salt.length >= str.length.
       if it does not match, salt += str.slice(0, str.length - salt.length)
    4. mix salt and str letter by letter, take the average character code of these two string.
       if str.length < salt.length, use character '@' to mix salt letter
    5. convert the average codes to letters and join them into a new string.
    6. since the average code may not be an interger, there is prefix in the new string.
       the prefix is a bitmap converted by base64(parseInt(bitmap, 2))
    7. encrypted one is constructed with prefix + '@' + new string.
 */

const decryptPassword = (encrypted, salt) => {
  const specialToken = '@'
  const specialIndex = encrypted.indexOf(specialToken)
  if (specialIndex === -1 || !salt) {
    return encrypted
  }

  const prefix = encrypted.slice(0, specialIndex)
  const pure = encrypted.slice(specialIndex + specialToken.length)
  const signs = Buffer.from(prefix, 'base64').toString('utf-8')

  let index = 0
  let b64 = ''

  for (const letter of pure) {
    const todel = index < salt.length ? salt[index] : b64[index - salt.length]
    let code = letter.charCodeAt(0) * 2 - todel.charCodeAt(0)
    if (signs[index] === '1') {
      code += 1
    }
    if (code !== 64) {
      b64 += String.fromCharCode(code)
    }
    index++
  }

  return Buffer.from(b64, 'base64').toString('utf-8')
}

const safeParseJSON = (json, defaultValue) => {
  let result
  try {
    result = JSON.parse(json)
  } catch (e) {}

  if (!result && defaultValue !== undefined) {
    return defaultValue
  }
  return result
}

const getManifest = entry => {
  let manifestCache = cache.get(`${MANIFEST_CACHE_KEY_PREFIX}${entry}`)

  if (!manifestCache) {
    let data = {}
    try {
      const dataStream = fs.readFileSync(root('dist/manifest.json'))
      data = safeParseJSON(dataStream.toString(), {})
    } catch (error) {}
    manifestCache = get(data, `entrypoints.${entry}`)
    cache.set(`${MANIFEST_CACHE_KEY_PREFIX}${entry}`, manifestCache)
  }

  return manifestCache
}

const getLocaleManifest = () => {
  let manifestCache = cache.get(LOCALE_MANIFEST_CACHE_KEY)

  if (!manifestCache) {
    let data = {}
    try {
      const dataStream = fs.readFileSync(root('dist/manifest.locale.json'))
      data = safeParseJSON(dataStream.toString(), {})
    } catch (error) {}
    manifestCache = pick(
      data,
      Object.keys(data).filter(key => key.startsWith('locale-'))
    )
    cache.set(LOCALE_MANIFEST_CACHE_KEY, manifestCache)
  }

  return manifestCache
}

module.exports = {
  root,
  loadYaml,
  getCache,
  getManifest,
  getLocaleManifest,
  getServerConfig,
  isValidReferer,
  isAppsRoute,
  decryptPassword,
  safeParseJSON,
}
