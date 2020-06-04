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

import { get, set, isEmpty, keyBy } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Text } from 'components/Base'
import ObjectMapper from 'utils/object.mapper'

import Item from './Item'

import styles from './index.scss'

export default class RuleList extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onShow: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: [],
    onChange() {},
    onShow() {},
  }

  static contextTypes = {
    formData: PropTypes.object,
  }

  handleAdd = () => {
    this.props.onShow()
  }

  handleEdit = data => {
    this.props.onShow(data)
  }

  handleDelete = rule => {
    const { value, onChange, isFederated } = this.props
    const { host } = rule

    if (isFederated) {
      return this.handleFederatedDelete(rule)
    }

    onChange(value.filter(item => item.host !== host))

    const tls = get(this.context.formData, 'spec.tls[0]')

    if (!tls) {
      return
    }

    if (isEmpty(tls.hosts)) {
      set(this.context.formData, 'spec.tls', [])
    } else {
      tls.hosts = tls.hosts.filter(item => item !== host)
      set(this.context.formData, 'spec.tls[0]', tls)
    }
  }

  handleFederatedDelete = rule => {
    const { value, onChange } = this.props
    const formTemplate = this.context.formData
    const overrides = get(formTemplate, 'spec.overrides', [])
    const override = overrides.find(
      item => item.clusterName === rule.cluster.name
    )
    override.clusterOverrides = override.clusterOverrides.filter(
      item => !['/spec/rules', '/spec/tls'].includes(item.path)
    )
    onChange(value)
  }

  renderContent() {
    const { value, isFederated, projectDetail } = this.props
    const clusters = keyBy(projectDetail.clusters, 'name')

    let rules = [...value]
    let tls = get(this.context.formData, 'spec.tls[0]')

    if (isFederated) {
      const result = ObjectMapper.federated(ObjectMapper.ingresses)(
        this.context.formData
      )
      if (result && result.clusterTemplates) {
        rules = Object.keys(result.clusterTemplates).map(cluster => ({
          ...get(result.clusterTemplates[cluster], 'spec.rules[0]', {}),
          cluster: clusters[cluster],
        }))

        tls = Object.keys(result.clusterTemplates).map(cluster => ({
          ...get(result.clusterTemplates[cluster], 'spec.tls[0]', {}),
          cluster: clusters[cluster],
        }))
      }
    }

    return (
      <ul>
        {rules
          .filter(item => item.host)
          .map(item => (
            <Item
              rule={item}
              tls={tls}
              key={item.host}
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
            />
          ))}
        <div className={styles.add} onClick={this.handleAdd}>
          <Text
            title={t('Add Route Rule')}
            description={t('Please add at least one routing rule')}
          />
        </div>
      </ul>
    )
  }

  render() {
    return <div className={styles.wrapper}>{this.renderContent()}</div>
  }
}
