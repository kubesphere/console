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
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import { RadioButton, RadioGroup } from '@pitrix/lego-ui'
import { Button, Alert, ScrollLoad } from 'components/Base'

import WorkloadStore from 'stores/workload'
import WorkloadItem from './Item'

import styles from './index.scss'

@observer
export default class WorkloadSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'deployments',
      selectItem: {},
      visible: false,
    }

    this.store = new WorkloadStore(this.state.type)
  }

  handleTypeChange = type => {
    this.setState({ type, visible: true }, () => {
      this.store.setModule(this.state.type)
      this.fetchData()
    })
  }

  fetchData = (params = {}) => {
    this.store.fetchList({ namespace: this.props.namespace, ...params })
  }

  handleSelect = item => {
    this.setState({ selectItem: item, visible: true })
  }

  handleCancel = () => {
    this.setState({ visible: false, selectItem: {} })
  }

  handleOK = () => {
    const { onSelect } = this.props
    const { selectItem } = this.state

    onSelect(get(selectItem, '_originData.spec.template.metadata.labels', {}))

    this.setState({ visible: false })
  }

  render() {
    const { type, selectItem } = this.state
    const { data, total, page, isLoading } = toJS(this.store.list)

    return (
      <div>
        <div className={styles.body}>
          <Alert
            className="margin-b8"
            message={t('SPECIFY_WORKLOAD_DESC')}
            hideIcon
          />
          <RadioGroup
            wrapClassName="radio-default"
            buttonWidth={120}
            value={type}
            onChange={this.handleTypeChange}
            size="small"
          >
            <RadioButton value="deployments">{t('Deployments')}</RadioButton>
            <RadioButton value="statefulsets">{t('StatefulSets')}</RadioButton>
            <RadioButton value="daemonsets">{t('DaemonSets')}</RadioButton>
          </RadioGroup>
          <div className={styles.workloads}>
            <ScrollLoad
              data={data}
              total={total}
              page={page}
              loading={isLoading}
              onFetch={this.fetchData}
            >
              {data.map((item, index) => (
                <WorkloadItem
                  key={`${item.uid}${index}`}
                  module={type}
                  detail={item}
                  onClick={this.handleSelect}
                  selected={selectItem.uid === item.uid}
                />
              ))}
            </ScrollLoad>
          </div>
        </div>
        <div className={styles.footer}>
          <Button onClick={this.handleCancel}>{t('Cancel')}</Button>
          <Button type="control" onClick={this.handleOK}>
            {t('OK')}
          </Button>
        </div>
      </div>
    )
  }
}
