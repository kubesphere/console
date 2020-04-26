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
import { Icon } from '@pitrix/lego-ui'
import { Tag } from 'components/Base'
import SelectModal from 'components/Modals/ProjectSelect'

import styles from './index.scss'

export default class Selector extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    defaultIcon: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    icon: '',
    defaultIcon: '/assets/default-project.svg',
    type: 'projects',
    value: '',
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      showSelect: false,
    }
  }

  showSelect = () => {
    this.setState({ showSelect: true })
  }

  hideSelect = () => {
    this.setState({ showSelect: false })
  }

  handleSelect = value => {
    const { onChange } = this.props
    this.hideSelect()
    onChange(value)
  }

  render() {
    const {
      icon,
      defaultIcon,
      title,
      type,
      value,
      cluster,
      workspace,
      isFedManaged,
    } = this.props
    const { showSelect } = this.state

    return (
      <div>
        <div className={styles.titleWrapper} onClick={this.showSelect}>
          <div className={styles.icon}>
            <img src={icon || defaultIcon} alt="" />
          </div>
          <div className={styles.text}>
            <p>
              {title}{' '}
              {isFedManaged && <Tag type="info">{t('MULTI_CLUSTER')}</Tag>}
            </p>
            <div className="h6" data-tooltip={value}>
              {value}
            </div>
          </div>
          <div className={styles.arrow}>
            <Icon name="caret-down" type="light" />
          </div>
        </div>
        <SelectModal
          defaultType={type}
          cluster={cluster}
          workspace={workspace}
          visible={showSelect}
          onChange={this.handleSelect}
          onCancel={this.hideSelect}
        />
      </div>
    )
  }
}
