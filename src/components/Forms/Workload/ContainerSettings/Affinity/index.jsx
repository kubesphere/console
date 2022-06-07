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
        value: 'default',
        label: t('DEFAULT_RULES'),
        affinity: {},
        description: t('DEFAULT_RULES_DESC'),
      },
      {
        value: 'decentralized',
        label: t('DECENTRALIZED_SCHEDULING'),
        affinity: {
          podAntiAffinity: affinity,
        },
        description: t('DECENTRALIZED_SCHEDULING_DESC'),
      },
      {
        value: 'aggregation',
        label: t('CENTRALIZED_SCHEDULING'),
        affinity: {
          podAffinity: affinity,
        },
        description: t('CENTRALIZED_SCHEDULING_DESC'),
      },
      {
        value: 'custom',
        label: t('CUSTOM_RULES'),
        affinity: {},
        description: t('CUSTOM_RULES_DESC'),
      },
    ]
  }

  get policys() {
    return [
      {
        label: t('SCHEDULE_WITH_TARGET'),
        value: 'podAffinity',
      },
      {
        label: t('SCHEDULE_AWAY_FROM_TARGET'),
        value: 'podAntiAffinity',
      },
    ]
  }

  get types() {
    return [
      {
        label: t('MATCH_IF_POSSIBLE'),
        value: 'preferredDuringSchedulingIgnoredDuringExecution',
      },
      {
        label: t('MUST_MATCH'),
        value: 'requiredDuringSchedulingIgnoredDuringExecution',
      },
    ]
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: 'default',
    }

    this.store = new WorkloadStore(props.module)
  }

  componentDidMount() {
    const affinity = get(this.props.data, 'spec.template.spec.affinity', {})

    if (!isEmpty(affinity)) {
      const options = this.replicasPolicyOptions
      const equalItem = options.find(item => isEqual(item.affinity, affinity))

      if (equalItem) {
        this.setState({ mode: equalItem.value })
        delete this.props.data.spec.template.spec.customMode
      } else {
        this.setState({ mode: 'custom' }, () => {
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
          set(this.props.data, 'spec.template.spec.customMode', modes)
        })
      }
    } else {
      this.setState({ mode: 'default' })
    }

    const { cluster, namespace } = this.props
    this.store.fetchList({ cluster, namespace, limit: Infinity })
  }

  handleAffinityChange = mode => {
    const item = this.replicasPolicyOptions.find(key => key.value === mode)
    set(this.props.data, 'spec.template.spec.affinity', item.affinity)

    if (mode === 'custom') {
      set(this.props.data, 'spec.template.spec.customMode', [{}])
    } else {
      delete this.props.data.spec.template.spec.customMode
    }

    this.setState({ mode }, () => {
      this.props.formProps && this.props.formProps.onChange()
    })
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
      callback({
        message: t('RULE_NOT_COMPLETE'),
        field: rule.field,
      })
      this.forceUpdate()
      return
    }

    callback()
  }

  renderAffinityParams() {
    const { mode } = this.state

    const options = this.replicasPolicyOptions

    const data = get(this.store, 'list.data', [])
    const targets = data.map(item => ({
      label: item.name,
      value: item.name,
    }))

    return (
      <>
        <Form.Item>
          <TypeSelect
            value={mode}
            options={options}
            onChange={this.handleAffinityChange}
            defaultValue={options[0].value}
          />
        </Form.Item>
        {mode === 'custom' && (
          <Form.Item
            label={t('CUSTOM_RULES')}
            rules={[{ validator: this.modeValidator, checkOnSubmit: true }]}
          >
            <ArrayInput
              name="spec.template.spec.customMode"
              itemType="object"
              addText={t('ADD')}
              checkItemValid={this.checkItemValid}
              onChange={this.handleChange}
            >
              <ObjectInput>
                <Select
                  name="policy"
                  placeholder={t('TYPE')}
                  options={this.policys}
                />
                <Select
                  name="type"
                  placeholder={t('STRATEGY')}
                  options={this.types}
                />
                <Select
                  name="target"
                  placeholder={t('TARGET')}
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
        label={t('POD_SCHEDULING_RULES')}
        desc={t('POD_SCHEDULING_RULES_DESC')}
        keepDataWhenUnCheck
        checkable={checkable}
      >
        {this.renderAffinityParams()}
      </Form.Group>
    )
  }
}
