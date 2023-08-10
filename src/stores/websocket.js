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

import { action, observable } from 'mobx'
import { getClusterUrl, getWebSocketProtocol } from 'utils'
import SocketClient from 'utils/socket.client'

export default class WebSocketStore {
  @observable
  message = {}

  wsMap = {}

  watch(url) {
    if (this.wsClient) {
      this.wsClient.close(true)
    }

    this.wsClient = new SocketClient(
      `${getWebSocketProtocol(window.location.protocol)}://${
        window.location.host
      }${getClusterUrl(`/${url}`)}`,
      {
        onmessage: this.receive,
      }
    )
  }

  watchByKey(key, url, onMsg, onErr) {
    if (this.wsMap[key]) {
      this.wsMap[key].close(true)
    }
    this.wsMap[key] = new SocketClient(
      `${getWebSocketProtocol(window.location.protocol)}://${
        window.location.host
      }${getClusterUrl(`/${url}`)}`,
      {
        onmessage: onMsg,
        onerror: e => {
          setTimeout(onErr, 1000)
          console.error(e)
        },
      }
    )
  }

  closeBy(...keys) {
    keys.forEach(key => {
      if (this.wsMap[key]) {
        this.wsMap[key].close(true)
      }
    })
  }

  closeMap() {
    Object.values(this.wsMap).forEach(ws => {
      ws.close(true)
    })
  }

  @action
  receive = data => {
    this.message = data
  }

  close() {
    if (this.wsClient) {
      this.wsClient.close(true)
    }
  }
}
