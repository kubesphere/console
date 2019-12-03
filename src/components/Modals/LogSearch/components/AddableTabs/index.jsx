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
import { Tabs, Icon } from '@pitrix/lego-ui'
import classnames from 'classnames'
import styles from './index.scss'

const { TabPanel } = Tabs

const ADD_TAB_NAME = '__add'

export default class AddableTabs extends Component {
  static propTypes = {
    onAdd: PropTypes.func,
    onTabSelect: PropTypes.func,
    tabs: PropTypes.array,
    disableEmpty: PropTypes.bool,
  }

  static defaultProps = {
    type: 'card',
    disableEmpty: false,
  }

  onTabChange = tabName => {
    const { onAdd, onTabSelect } = this.props
    return tabName === ADD_TAB_NAME ? onAdd() : onTabSelect(tabName)
  }

  render() {
    const {
      disableEmpty,
      tabs,
      className,
      onTabSelect,
      ...tabProps
    } = this.props

    const closable = tabs.length > 1 || disableEmpty === false

    return (
      <Tabs
        {...tabProps}
        className={classnames(styles.tabs, className)}
        onChange={this.onTabChange}
      >
        {tabs.map(({ forceRender = true, name, content, ...rest }) => (
          <TabPanel
            key={name}
            name={name}
            children={content}
            closable={closable}
            forceRender={forceRender}
            {...rest}
          />
        ))}
        <TabPanel
          key={ADD_TAB_NAME}
          name={ADD_TAB_NAME}
          label={<Icon name="add" />}
        />
      </Tabs>
    )
  }
}
