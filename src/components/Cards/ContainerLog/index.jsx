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

import React from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { saveAs } from 'file-saver'
import { get, isEmpty } from 'lodash'
import AnsiUp from 'ansi_up'

import { PATTERN_UTC_TIME } from 'utils/constants'
import { Icon, Loading, Notify, Tooltip } from '@kube-design/components'
import { Card, Empty } from 'components/Base'
import ContainerStore from 'stores/container'
import PodStore from 'stores/pod'

import styles from './index.scss'

const converter = new AnsiUp()

@observer
export default class ContainerLog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingPrev: false,
      loadingNext: false,
      isDownloading: false,
      isRealtime: !!props.isRealtime,
    }

    this.tailLines = 1000

    this.store = new ContainerStore()
    this.podStore = new PodStore()

    this.ref = React.createRef()
  }

  componentDidMount() {
    this.getData({}, this.scrollToBottom)
  }

  componentDidUpdate(prevProps) {
    if (this.props.podName && this.props.podName !== prevProps.podName) {
      this.getData({}, this.scrollToBottom)
    }
  }

  componentWillUnmount() {
    this.store.stopWatchLogs()
  }

  async getData(params, callback) {
    const {
      cluster,
      namespace,
      podName,
      containerName,
      previous = false,
    } = this.props

    this.store.stopWatchLogs()

    const result = await this.podStore.checkName({
      cluster,
      namespace,
      name: podName,
    })

    let showPrevious = false
    if (previous) {
      showPrevious = await this.store.checkPreviousLog({
        cluster,
        namespace,
        podName,
        container: containerName,
        tailLines: 10,
        previous: true,
      })
    }

    if (result.exist) {
      this.store.watchLogs(
        {
          cluster,
          namespace,
          podName,
          container: containerName,
          tailLines: this.tailLines,
          timestamps: true,
          follow: this.state.isRealtime,
          previous: showPrevious,
          ...params,
        },
        callback
      )
    }
  }

  scrollToBottom = () => {
    const ref = this.ref.current
    if (ref) {
      ref.scrollTop = ref.scrollHeight
    }
    this.setState({ loadingNext: false })
  }

  scrollToCurrent = () => {
    const ref = this.ref.current
    if (ref) {
      ref.scrollTop = ref.scrollHeight - this.currentHeight
    }
    this.setState({ loadingPrev: false })
  }

  handleNext = () => {
    this.tailLines = 1000
    this.setState({ loadingNext: true })
    this.getData({ silent: true }, this.scrollToBottom)
  }

  handlePrev = () => {
    this.tailLines += 1000
    this.setState({ loadingPrev: true })
    this.currentHeight = get(this.ref, 'current.scrollHeight', 0)
    this.getData({ silent: true }, this.scrollToCurrent)
  }

  handleRealtime = () => {
    this.setState(
      ({ isRealtime }) => ({ isRealtime: !isRealtime }),
      () => this.getData({ silent: true }, this.scrollToBottom)
    )
  }

  handleDownload = async () => {
    const { cluster, namespace, podName, containerName: name } = this.props

    this.setState({ isDownloading: true })

    const result = await this.store.fetchAllLogs({
      cluster,
      namespace,
      podName,
      container: name,
    })

    this.setState({ isDownloading: false })

    if (!result) {
      Notify.info({
        content: `${t('NO_RESOURCE', { resource: t('Log Data') })}`,
      })
      return
    }

    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `${name}.log`)
  }

  renderOperations() {
    const { isRealtime, isDownloading } = this.state
    return (
      <div className={styles.operations}>
        <Tooltip
          content={t(isRealtime ? 'STOP_REAL_TIME_LOG' : 'START_REAL_TIME_LOG')}
        >
          <Icon
            name={isRealtime ? 'stop' : 'start'}
            color={{ primary: '#fff', secondary: '#fff' }}
            size={20}
            onClick={this.handleRealtime}
            clickable
            changeable
          />
        </Tooltip>
        <span className={styles.split}>|</span>
        <Tooltip content={t('Refresh')}>
          <Icon
            name="refresh"
            color={{ primary: '#fff', secondary: '#fff' }}
            size={20}
            onClick={this.handleNext}
            clickable
            changeable
            disabled={isRealtime}
          />
        </Tooltip>
        <span className={styles.split}>|</span>
        <Tooltip content={t('Download')}>
          {isDownloading ? (
            <Loading size={16} />
          ) : (
            <Icon
              name="download"
              color={{ primary: '#fff', secondary: '#fff' }}
              size={20}
              onClick={this.handleDownload}
              clickable
              changeable
            />
          )}
        </Tooltip>
      </div>
    )
  }

  renderContent() {
    const { contentClassName } = this.props
    const { data } = this.store.logs
    const { loadingPrev, loadingNext } = this.state

    if (isEmpty(data)) {
      return <Empty desc={'No Data'} />
    }

    const items = String(data)
      .replace(/\\r\\n/g, '\n')
      .split('\n')

    return (
      <div
        className={classNames(styles.content, contentClassName)}
        ref={this.ref}
      >
        {this.tailLines <= items.length && (
          <div className={styles.loading}>
            {loadingPrev ? (
              <Loading spinning={loadingPrev} size="small" />
            ) : (
              <div className={styles.more} onClick={this.handlePrev}>
                {t('View More')}
              </div>
            )}
          </div>
        )}
        {items.map((text, index) => {
          const match = text.match(PATTERN_UTC_TIME)
          const key = match ? match[0] : index
          const content = match ? text.replace(match[0], '') : text
          return (
            <p
              key={key}
              dangerouslySetInnerHTML={{
                __html: converter.ansi_to_html(content),
              }}
            />
          )
        })}
        <div className={styles.loading}>
          <Loading spinning={loadingNext} size="small" />
        </div>
        {this.renderOperations()}
      </div>
    )
  }

  render() {
    const { className } = this.props
    const { isLoading } = this.store.logs
    return (
      <Card
        className={className}
        empty={t('NO_RESOURCE', { resource: t('Log Data') })}
        loading={isLoading}
      >
        {this.renderContent()}
      </Card>
    )
  }
}
