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
import { observer } from 'mobx-react'
import { Form, Select } from '@kube-design/components'
import { get, set, isEmpty, isEqual } from 'lodash'

import { TypeSelect } from 'components/Base'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import WorkloadStore from 'stores/workload'

@observer
export default class AffinityForm extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    checkable: PropTypes.bool,
    initial: PropTypes.bool,
  }

  static defaultProps = {
    data: {},
    checkable: false,
    initial: false,
  }

  get replicasPolicyOptions() {
    const matchLabels = get(
      this.props.data,
      'spec.template.metadata.labels',
      {}
    )

    const affinity = {
      preferredDuringSchedulingIgnoredDuringExecution: [
        {
          weight: 100,
          podAffinityTerm: {
            labelSelector: {
              matchLabels,
            },
            topologyKey: 'kubernetes.io/hostname',
          },
        },
      ],
    }

    return [
      {
        uid: 'default',
        label: t('Pod Default Deployment'),
        value: {},
        description: t(
          'Pod replicas will be deployed according to the default policy.'
        ),
      },
      {
        uid: 'decentralized',
        label: t('Pod Decentralized Deployment'),
        value: {
          podAntiAffinity: affinity,
        },
        description: t(
          'Pod replicas will be deployed on different nodes as much as possible.'
        ),
      },
      {
        uid: 'aggregation',
        label: t('Pod Aggregation Deployment'),
        value: {
          podAffinity: affinity,
        },
        description: t(
          'Pod replicas will be deployed on the same node as much as possible.'
        ),
      },
    ]
  }

  get policys() {
    return [
      {
        label: t('Deploy with the Target'),
        value: 'podAffinity',
      },
      {
        label: t('Deploy away from the Target'),
        value: 'podAntiAffinity',
      },
    ]
  }

  get types() {
    return [
      {
        label: t('Match as much as possible'),
        value: 'preferredDuringSchedulingIgnoredDuringExecution',
      },
      {
        label: t('Must match'),
        value: 'requiredDuringSchedulingIgnoredDuringExecution',
      },
    ]
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: {},
    }

    this.store = new WorkloadStore(props.module)
  }

  componentDidMount() {
    const { initial } = this.props
    const affinity = get(this.props.data, 'spec.template.spec.affinity', {})
    if (!isEmpty(affinity)) {
      const options = this.replicasPolicyOptions

      if (options.some(item => isEqual(item.value, affinity))) {
        this.setState({ mode: affinity })
        set(this.props.data, 'spec.template.spec.customMode', [{}])
      } else if (initial) {
        set(this.props.data, 'spec.template.spec.affinity', {})
        delete this.props.data.spec.template.spec.customMode
      } else {
        const modes = Object.keys(affinity).map(item => {
          const type = Object.keys(affinity[item])[0]
          const target = get(
            affinity,
            type === 'requiredDuringSchedulingIgnoredDuringExecution'
              ? `[${item}][${type}][0]["labelSelector"]["matchExpressions"][0]["values"][0]`
              : `[${item}][${type}][0]["podAffinityTerm"]["labelSelector"]["matchExpressions"][0]["values"][0]`,
            ''
          )
          return {
            policy: item,
            type,
            target,
          }
        })

        set(this.props.data, 'spec.template.spec.affinity', {})
        set(this.props.data, 'spec.template.spec.customMode', modes)
      }
    }

    const { cluster, namespace } = this.props
    this.store.fetchList({ cluster, namespace, limit: Infinity })
  }

  handleAffinityChange = mode => {
    this.setState({ mode })
  }

  handleChange = values => {
    const affinity = {}
    values.forEach(item => {
      if (item.type === 'preferredDuringSchedulingIgnoredDuringExecution') {
        affinity[item.policy] = {
          preferredDuringSchedulingIgnoredDuringExecution: [
            {
              weight: 100,
              podAffinityTerm: {
                labelSelector: {
                  matchExpressions: [
                    {
                      key: 'app',
                      operator: 'In',
                      values: [item.target],
                    },
                  ],
                },
                topologyKey: 'kubernetes.io/hostname',
              },
            },
          ],
        }
      } else if (
        item.type === 'requiredDuringSchedulingIgnoredDuringExecution'
      ) {
        affinity[item.policy] = {
          requiredDuringSchedulingIgnoredDuringExecution: [
            {
              labelSelector: {
                matchExpressions: [
                  {
                    key: 'app',
                    operator: 'In',
                    values: [item.target],
                  },
                ],
              },
              topologyKey: 'kubernetes.io/hostname',
            },
          ],
        }
      }
    })

    set(this.props.data, 'spec.template.spec.affinity', affinity)
  }

  checkItemValid = item => item.policy && item.type && item.target

  modeValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.some(item => !this.checkItemValid(item))) {
      return callback({
        message: t('Please complete the policy'),
        field: rule.field,
      })
    }

    callback()
  }

  renderAffinityParams() {
    const { mode } = this.state

    const options = this.replicasPolicyOptions
    const affinity = get(this.props.data, 'spec.template.spec.affinity', {})

    const data = get(this.store, 'list.data', [])
    const targets = data.map(item => ({
      label: item.name,
      value: item.name,
    }))

    return (
      <>
        <Form.Item>
          <TypeSelect
            name="spec.template.spec.affinity"
            options={options}
            onChange={this.handleAffinityChange}
            defaultValue={options[0].value}
          />
        </Form.Item>
        {(isEmpty(mode) ||
          !options.some(item => isEqual(item.value, affinity))) && (
          <Form.Item
            label={t('Custom Deployment Mode')}
            rules={[{ validator: this.modeValidator, checkOnSubmit: true }]}
          >
            <ArrayInput
              name="spec.template.spec.customMode"
              itemType="object"
              addText={t('Add Deployment Mode')}
              checkItemValid={this.checkItemValid}
              onChange={this.handleChange}
            >
              <ObjectInput>
                <Select
                  name="policy"
                  placeholder={t('Strategy')}
                  options={this.policys}
                />
                <Select
                  name="type"
                  placeholder={t('Type')}
                  options={this.types}
                />
                <Select
                  name="target"
                  placeholder={t('Please input an application name')}
                  options={targets}
                  style={{ marginLeft: 20 }}
                />
              </ObjectInput>
            </ArrayInput>
          </Form.Item>
        )}
      </>
    )
  }

  render() {
    const { checkable } = this.props
    return (
      <Form.Group
        label={t('Deployment Mode')}
        desc={t('DEPLOYMENT_MODE_DESC')}
        keepDataWhenUnCheck
        checkable={checkable}
      >
        {this.renderAffinityParams()}
      </Form.Group>
    )
  }
}
