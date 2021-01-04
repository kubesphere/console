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

import { get } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Text } from 'components/Base'

import Item from './Item'

import styles from './index.scss'

export default class RuleList extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.array,
    onDelete: PropTypes.func,
    onShow: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: [],
    onDelete() {},
    onShow() {},
  }

  static contextTypes = {
    formData: PropTypes.object,
  }

  renderContent() {
    const { value, onShow, onDelete, projectDetail } = this.props

    const tls = get(this.context.formData, 'spec.tls', [])

    return (
      <ul>
        {value
          .filter(item => item && item.host)
          .map((item, index) => (
            <Item
              rule={item}
              tls={tls}
              key={index}
              index={index}
              onEdit={onShow}
              onDelete={onDelete}
              projectDetail={projectDetail}
            />
          ))}
        <div className={styles.add} onClick={onShow}>
          <Text
            title={t('Add Route Rule')}
            description={t('Please add at least one routing rule.')}
          />
        </div>
      </ul>
    )
  }

  render() {
    return <div className={styles.wrapper}>{this.renderContent()}</div>
  }
}
