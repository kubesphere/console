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

import { ALL_METRICS_CONFIG } from 'configs/alerting/metrics'

export const getQuery = ({ kind, rule, resources }) => {
  let query = ''
  const { _metricType: metric, thresholds, condition_type } = rule

  switch (kind) {
    case 'Node':
      query = metric.replace(
        '$1',
        `node=${resources.length > 1 ? '~' : ''}"${resources.join('|')}"`
      )
      break
    case 'Deployment':
    case 'StatefulSet':
    case 'DaemonSet':
      query = metric
        .replace(
          '$1',
          `workload=${resources.length > 1 ? '~' : ''}"${resources
            .map(resource => `${kind}:${resource}`)
            .join('|')}"`
        )
        .replace('$2', kind.toLowerCase())
      break
    case 'Pod':
      break
    default:
  }

  let thresholdValue = thresholds
  const metricLabel = ALL_METRICS_CONFIG[metric]
  const tresholdLabel = metricLabel.ruleConfig.find(
    item => item.name === 'thresholds'
  )
  if (tresholdLabel && tresholdLabel.converter) {
    thresholdValue = tresholdLabel.converter(thresholds)
  }

  query += ` ${condition_type} ${thresholdValue}`

  return query
}

const KIND_MODULE = {
  Deployment: 'deployments',
  StatefulSet: 'statefulsets',
  DaemonSet: 'daemonsets',
  Pod: 'pods',
}

export const getAlertingResource = (labels = {}) => {
  const renderPod = (_labels, workloadType) => {
    const podsName = _labels.pod

    if (podsName && podsName.startsWith(_labels[workloadType])) {
      return {
        module: 'pods',
        name: _labels.pod,
        namespace: _labels.namespace,
      }
    }

    const module = workloadType === 'job_name' ? 'jobs' : `${workloadType}s`

    return {
      module,
      name: _labels[workloadType],
      namespace: _labels.namespace,
    }
  }

  if (labels.node) {
    return {
      module: 'nodes',
      name: labels.node,
    }
  }

  if (labels.namespace) {
    if (labels.workload) {
      return {
        module: KIND_MODULE[labels.owner_kind],
        name: labels.workload.replace(`${labels.owner_kind}:`, ''),
        namespace: labels.namespace,
      }
    }

    if (labels.job_name) {
      return renderPod(labels, 'job_name')
    }

    if (labels.cronjob) {
      return renderPod(labels, 'cronjob')
    }

    if (labels.hpa) {
      return {
        module: 'hpas',
        name: labels.hpa,
        namespace: labels.namespace,
      }
    }

    if (labels.deployment) {
      return renderPod(labels, 'deployment')
    }

    if (labels.statefulset) {
      return renderPod(labels, 'statefulset')
    }

    if (labels.daemonset) {
      return renderPod(labels, 'daemonset')
    }

    if (labels.pod) {
      return {
        module: 'pods',
        name: labels.pod,
        namespace: labels.namespace,
      }
    }

    if (labels.service) {
      return {
        module: 'services',
        name: labels.service,
        namespace: labels.namespace,
      }
    }
  }

  return {}
}

export const ALERTING_STATUS = ['inactive', 'pending', 'firing']
