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

import React, { lazy, Suspense, Component } from 'react'
import { observer } from 'mobx-react'
import { getWebSocketProtocol, getClusterUrl } from 'utils'

const ContainerTerminal = lazy(() =>
  import(/* webpackChunkName: "terminal" */ './terminal')
)

const BG_COLOR = '#181d28'

@observer
export default class SessionTerminal extends Component {
  get url() {
    return `${getWebSocketProtocol(window.location.protocol)}://${
      window.location.host
    }${getClusterUrl(`/${this.props.url}`)}`
  }

  resizeTerminal = () => {
    this.terminalRef && this.terminalRef.onResize()
  }

  render() {
    if (!this.props.url) {
      return null
    }

    const terminalOpts = {
      theme: {
        background: BG_COLOR,
      },
    }

    return (
      <div
        style={{
          height: '100%',
          borderRadius: '4px',
          background: BG_COLOR,
          padding: '12px',
          color: '#fff',
        }}
      >
        <Suspense fallback={'Loading'}>
          {this.props.isLoading ? (
            'Loading'
          ) : (
            <ContainerTerminal
              websocketUrl={this.url}
              key={this.url}
              terminalOpts={terminalOpts}
              ref={ref => {
                this.terminalRef = ref
              }}
            />
          )}
        </Suspense>
      </div>
    )
  }
}
