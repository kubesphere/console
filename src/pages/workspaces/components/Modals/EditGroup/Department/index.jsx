/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *s
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
import { observer } from 'mobx-react'
import Tree from 'components/Tree'
import styles from './index.scss'

@observer
export default class Department extends React.Component {
  static propTypes = {
    treeData: PropTypes.array,
  }

  render() {
    const { treeData, groupId, onSelect } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.treeWrapper}>
          {treeData[0].children.length > 0 ? (
            <Tree
              className={styles.tree}
              showLine
              defaultExpandedKeys={[groupId || 'root']}
              defaultSelectedKeys={[groupId || 'root']}
              onSelect={onSelect}
              treeData={treeData}
            />
          ) : (
            <p>{t('NO_DEPARTMENT_TIP')}</p>
          )}
        </div>
      </div>
    )
  }
}
