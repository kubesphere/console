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
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { observer } from 'mobx-react'

import VolumeStore from 'stores/volume'

import { Panel } from 'components/Base'

import { joinSelector } from 'utils'

import VolumeItem from './Item'

import styles from './index.scss'

@observer
export default class VolumesCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    selector: PropTypes.object,
  }

  static defaultProps = {
    className: '',
  }

  store = new VolumeStore()

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const { selector, cluster, namespace } = this.props
    if (!isEmpty(selector)) {
      this.store.fetchListByK8s({
        cluster,
        namespace,
        labelSelector: joinSelector(selector),
      })
    }
  }

  renderContent() {
    const { prefix } = this.props
    const { data } = this.store.list

    if (isEmpty(data)) return null

    return (
      <div className={styles.content}>
        {data.map((item, index) => (
          <VolumeItem key={index} volume={item} prefix={prefix} />
        ))}
      </div>
    )
  }

  render() {
    const { className, title } = this.props

    const content = this.renderContent()

    if (!content) {
      return null
    }

    return (
      <Panel className={className} title={title || t('Volumes')}>
        {content}
      </Panel>
    )
  }
}
