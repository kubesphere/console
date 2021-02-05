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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { set, get, cloneDeep } from 'lodash'

import { Loading } from '@kube-design/components'

import Tree from 'components/Tree'

import styles from './index.scss'

@observer
export default class GroupTree extends Component {
  static propTypes = {
    treeData: PropTypes.array,
    total: PropTypes.number,
    isLoading: PropTypes.bool,
    onSelect: PropTypes.func,
  }

  renderTree = () => {
    const { treeData, onSelect, group } = this.props
    const data = set(cloneDeep(treeData)[0], 'disabled', true)
    const defaultKey = get(treeData[0].children[0], 'key', 'root')

    return (
      <div className={styles.treeWrapper}>
        <Tree
          showLine
          defaultExpandedKeys={[defaultKey]}
          defaultSelectedKeys={[defaultKey]}
          treeData={data}
          selectedKeys={[group]}
          onSelect={onSelect}
        />
      </div>
    )
  }

  renderPlaceHolder = () => {
    return <div className={styles.empty}>{t('WORKSPACE_GROUP_EMPTY_DESC')}</div>
  }

  render() {
    const { isLoading, total } = this.props

    return (
      <div className={styles.wrapper}>
        {isLoading && (
          <div className={styles.loading}>
            <Loading spinning={isLoading} />
          </div>
        )}
        {total === 0 && !isLoading && this.renderPlaceHolder()}
        {total > 0 && this.renderTree()}
      </div>
    )
  }
}
