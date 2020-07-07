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
import { get } from 'lodash'

import { TypeSelect, Form } from 'components/Base'

export default class PodAffinity extends Component {
  get replicasPolicyOptions() {
    const matchLabels = get(
      this.props.template,
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

  render() {
    const options = this.replicasPolicyOptions
    return (
      <Form.Item label={t('Deployment Mode')}>
        <TypeSelect
          name="spec.template.spec.affinity"
          options={options}
          defaultValue={options[0].value}
        />
      </Form.Item>
    )
  }
}
