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

import { get, set, isUndefined } from 'lodash'
import React from 'react'
import { Alert, Form } from '@kube-design/components'
import { TrafficSlider } from 'components/Inputs'

import styles from './index.scss'

export default class ByTraffic extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ratio: get(this.newRoute, 'weight', 50),
    }
  }

  get formTemplate() {
    return this.props.formTemplate.strategy
  }

  get strategyPath() {
    const protocol = get(this.formTemplate, 'spec.protocol', 'http')

    return `spec.template.spec.${protocol}`
  }

  get oldRoute() {
    return get(this.formTemplate, `${this.strategyPath}[0].route[0]`, {})
  }

  get newRoute() {
    return get(this.formTemplate, `${this.strategyPath}[0].route[1]`, {})
  }

  componentDidMount() {
    const oldWeight = get(this.oldRoute, 'weight')
    const newWeight = get(this.newRoute, 'weight')

    if (isUndefined(oldWeight)) {
      set(this.oldRoute, 'weight', 100 - this.state.ratio)
    }
    if (isUndefined(newWeight)) {
      set(this.newRoute, 'weight', this.state.ratio)
    }
  }

  handleRatioChange = value => {
    this.setState({ ratio: value }, () => {
      set(this.oldRoute, 'weight', 100 - value)
    })
  }

  render() {
    const { ratio } = this.state
    const { formRef, formTemplate, ...rest } = this.props

    const component = get(this.formTemplate, 'spec.template.spec.hosts[0]')
    const newVersion = get(this.newRoute, 'destination.subset')
    const oldVersion = get(this.oldRoute, 'destination.subset')

    const leftContent = `${newVersion} ${t('TRAFFIC_LOW')}`
    const rightContent = `${oldVersion} ${t('TRAFFIC_LOW')}`

    return (
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <Alert
            type="info"
            message={t.html('CANARY_BY_TRAFFIC_DESC', {
              ratio,
              component,
              newVersion,
            })}
          />
        </div>
        <div className={styles.item}>
          <div className={styles.title}>{t('TRAFFIC_DISTRIBUTION')}</div>
          <Form ref={formRef} data={this.formTemplate} {...rest}>
            <Form.Item>
              <TrafficSlider
                name={`${this.strategyPath}[0].route[1].weight`}
                min={0}
                max={100}
                leftContent={leftContent}
                rightContent={rightContent}
                onChange={this.handleRatioChange}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
