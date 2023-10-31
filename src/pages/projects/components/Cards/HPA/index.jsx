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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isUndefined } from 'lodash'

import HpaStore from 'stores/workload/hpa'

import { Button, Icon, Dropdown, Menu, Notify } from '@kube-design/components'
import { Card } from 'components/Base'

import { getSuitableUnit, getValueByUnit } from 'utils/monitoring'
import { coreUnitTS } from 'utils'

import styles from './index.scss'

@observer
export default class HPACard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    store: PropTypes.object,
    detail: PropTypes.object,
    loading: PropTypes.bool,
    onDeleted: PropTypes.func,
  }

  static defaultProps = {
    detail: {},
    loading: true,
    onDelete() {},
  }

  constructor(props) {
    super(props)

    this.store = props.store || new HpaStore()
  }

  getValue = (data, unitType) => {
    const unit = getSuitableUnit(data, unitType)
    const result = getValueByUnit(data, unit)
    const unitText = coreUnitTS(result, unit)
    return `${result} ${unitText}`
  }

  getHPAData = () => {
    const {
      minReplicas = 0,
      maxReplicas = 0,
      cpuCurrentUtilization = 0,
      cpuTargetUtilization,
      memoryCurrentValue = 0,
      memoryTargetValue,
    } = this.props.detail

    return [
      {
        icon: 'chevron-down',
        name: t('MINIMUM_REPLICAS'),
        value: minReplicas,
      },
      {
        icon: 'chevron-up',
        name: t('MAXIMUM_REPLICAS'),
        value: maxReplicas,
      },
      {
        icon: 'cpu',
        name: t('TARGET_CPU_USAGE'),
        value:
          isUndefined(cpuTargetUtilization) || cpuTargetUtilization === ''
            ? t('NONE')
            : `${cpuTargetUtilization}%`,
        current: `${cpuCurrentUtilization}%`,
      },
      {
        icon: 'memory',
        name: t('TARGET_MEMORY_USAGE'),
        value:
          isUndefined(memoryTargetValue) || memoryTargetValue === ''
            ? t('NONE')
            : memoryTargetValue,
        current: this.getValue(
          String(memoryCurrentValue).endsWith('m')
            ? parseInt(memoryCurrentValue, 10) / 1000
            : memoryCurrentValue,
          'memory'
        ),
      },
    ]
  }

  getOperations = () => [
    {
      key: 'cancel',
      icon: 'close',
      text: t('CANCEL'),
      onClick: this.handleCancel,
    },
  ]

  handleMoreClick = (e, key) => {
    const options = this.getOperations()
    const { onClick } = options.find(item => item.key === key)
    onClick && onClick()
  }

  handleCancel = () => {
    const { detail, onDeleted } = this.props
    this.store.delete(detail).then(() => {
      Notify.success({ content: `${t('CANCEL_SUCCESSFUL')}` })
      onDeleted()
    })
  }

  renderOperations() {
    const menus = this.getOperations()
    const contenet = (
      <div className={styles.menu}>
        <Menu onClick={this.handleMoreClick}>
          {menus.map(({ icon, text, show = true, ...rest }) => {
            if (!show) return null
            return (
              <Menu.MenuItem key={text} {...rest}>
                {icon && <Icon name={icon} type="light" />} {text}
              </Menu.MenuItem>
            )
          })}
        </Menu>
      </div>
    )

    return (
      <Dropdown
        theme="dark"
        content={contenet}
        positionFixed
        placement="bottomRight"
      >
        <Button type="ghost" icon="more" />
      </Dropdown>
    )
  }

  renderCard = ({ icon, name, value, current }) => (
    <div key={icon} className={styles.box}>
      <div className={styles.card}>
        <Icon name={icon} size={40} />
        <div>
          <div className={styles.name} title={name}>
            {name}
          </div>
          <p className={styles.value}>
            {current ? t('TARGET_CURRENT', { target: value, current }) : value}
          </p>
        </div>
      </div>
    </div>
  )

  renderContent() {
    const { name } = this.props.detail

    if (!name) return null

    const data = this.getHPAData()
    return <div className={styles.wrapper}>{data.map(this.renderCard)}</div>
  }

  render() {
    const { className, loading, enableCancaleHPA = true } = this.props
    const title = this.props.title || t('AUTOSCALING')

    return (
      <Card
        className={classnames(styles.main, className)}
        title={title}
        operations={enableCancaleHPA ? this.renderOperations() : null}
        empty={t('NOT_ENABLE', { resource: t('AUTOSCALING') })}
        loading={loading}
      >
        {this.renderContent()}
      </Card>
    )
  }
}
