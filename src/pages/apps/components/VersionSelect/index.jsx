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
import classnames from 'classnames'
import { observer } from 'mobx-react'
import { Icon, Select } from '@pitrix/lego-ui'
import moment from 'moment-mini'

import styles from './index.scss'

@observer
export default class VersionSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    versionStore: PropTypes.object,
    selectVersion: PropTypes.string,
    handleChangeVersion: PropTypes.func,
    fetchVersions: PropTypes.func,
  }

  static defaultProps = {
    versionStore: {},
    selectVersion: '',
    handleChangeVersion() {},
    fetchVersions() {},
  }

  get versionOptions() {
    const versions = this.props.versionStore.list.data
    return versions.map(({ version_id, name, create_time }) => ({
      label: name,
      time: moment(create_time).format(t('YYYY-MM-DD')),
      value: version_id,
    }))
  }

  versionOptionRender = ({ label, time }) => (
    <div className={styles.versionOption}>
      <p className={styles.name}>{label}</p>
      <p className={styles.time}>{time}</p>
    </div>
  )

  versionValueRender = ({ label, time }) => (
    <div className={styles.versionValue}>
      <p className={styles.name}>{label}</p>
      <p className={styles.time}>{time}</p>
    </div>
  )

  versionArrowRender = () => (
    <Icon className={styles.icon} size={20} name="chevron-down" />
  )

  render() {
    const {
      className,
      handleChangeVersion,
      fetchVersions,
      versionStore,
      selectVersion,
    } = this.props
    const { page, total, isLoading, data } = versionStore.list

    return (
      <div className={classnames(styles.versionSelect, className)}>
        <h3>{t('Versions')}</h3>
        <Select
          className={styles.select}
          value={selectVersion}
          options={this.versionOptions}
          page={page}
          total={total}
          isLoading={isLoading}
          currentLength={data.length}
          onFetch={fetchVersions}
          onChange={handleChangeVersion}
          optionRenderer={this.versionOptionRender}
          valueRenderer={this.versionValueRender}
          arrowRenderer={this.versionArrowRender}
        />
      </div>
    )
  }
}
