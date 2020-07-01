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
import { Text } from 'components/Base'

import Item from './Item'

import styles from './index.scss'

export default class ServiceComponents extends React.Component {
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
    const { data, clusters, onAdd, onDelete } = this.props
    return (
      <div>
        {Object.keys(data).map(key => (
          <Item
            key={key}
            data={data[key]}
            clusters={clusters}
            propsKey={key}
            onEdit={onAdd}
            onDelete={onDelete}
          />
        ))}
        <div className={styles.add} onClick={this.handleAdd}>
          <Text
            title={t('Add Service')}
            description={t('Add stateful or stateless services')}
          />
        </div>
      </div>
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
