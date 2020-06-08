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

const Redis = require('ioredis')
const RedisTimeout = require('ioredis-timeout')
const { Store } = require('koa-session2')
const uid = require('uid-safe')
const { getServerConfig } = require('../libs/utils')

const serverConfig = getServerConfig().server

class RedisStore extends Store {
  constructor() {
    super()

    this.catch = this.catch.bind(this)
    this.connect = this.connect.bind(this)

    this.connect()
  }

  connect() {
    this.redis = new Redis(serverConfig.redis)
    if (serverConfig.redisTimeout) {
      RedisTimeout(this.redis, serverConfig.redisTimeout, true)
    }
  }

  disconnect() {
    this.redis.disconnect()
  }

  async get(sid) {
    const data = await this.redis.get(`sid-${sid}`).catch(this.catch)
    return JSON.parse(data)
  }

  // maxAge unit is second.
  async set(session, { sid = uid.sync(24), maxAge = 3600 } = {}) {
    await this.redis
      .set(`sid-${sid}`, JSON.stringify(session), 'EX', maxAge)
      .catch(this.catch)

    return sid
  }

  async destroy(sid) {
    return await this.redis.del(`sid-${sid}`).catch(this.catch)
  }

  catch(err) {
    console.error(err)

    if (err && err.message && err.message.indexOf('Executed timeout') !== -1) {
      this.disconnect()
      this.connect()
    }
  }
}

module.exports = RedisStore
