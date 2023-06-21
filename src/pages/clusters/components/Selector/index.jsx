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

import { Icon } from '@kube-design/components'

import SelectModal from 'clusters/components/Modals/ClusterSelect'
import PropTypes from 'prop-types'
import React from 'react'

import styles from './index.scss'

export default class Selector extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
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

  handleSelect = workspace => {
    const { onChange } = this.props
    this.hideSelect()
    onChange(workspace)
  }

  render() {
    const { value } = this.props
    const { showSelect } = this.state

    return (
      <div>
        <div
          className={styles.titleWrapper}
          onClick={globals.app.isMultiCluster ? this.showSelect : null}
        >
          <div className={styles.icon}>
            <Icon name="cluster" size={40} type="light" />
          </div>
          <div className={styles.text}>
            {/* <Tooltip content={value}> */}
            <div className="h6" title={value}>
              {value}
            </div>
            {/* </Tooltip> */}
            <p>{t('CLUSTER')}</p>
          </div>
        </div>
        <SelectModal
          visible={showSelect}
          onChange={this.handleSelect}
          onCancel={this.hideSelect}
        />
      </div>
    )
  }
}
