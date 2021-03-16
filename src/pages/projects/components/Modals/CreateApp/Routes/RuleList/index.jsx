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
import { get } from 'lodash'

import { Text } from 'components/Base'
import Item from 'components/Forms/Route/RouteRules/RuleList/Item'

import styles from './index.scss'

export default class RuleList extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    onAdd() {},
    onDelete() {},
  }

  handleAdd = () => {
    this.props.onAdd()
  }

  renderContent() {
    const { data, onAdd, onDelete, projectDetail } = this.props

    const rules = get(data, 'spec.rules', [])
    const tls = get(data, 'spec.tls', [])

    return (
      <ul>
        {rules
          .filter(item => item.host)
          .map((rule, index) => (
            <Item
              key={`${rule.host}-${index}`}
              rule={rule}
              tls={tls}
              index={index}
              onEdit={onAdd}
              onDelete={onDelete}
              projectDetail={projectDetail}
            />
          ))}
        <div className={styles.add} onClick={this.handleAdd}>
          <Text
            title={t('Add Route Rule')}
            description={t('Add an Internet access rule for the application')}
          />
        </div>
      </ul>
    )
  }

  render() {
    const { error } = this.props
    return (
      <div className={styles.wrapper}>
        {this.renderContent()}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
}
