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

import { get, isEmpty, set, merge } from 'lodash'

import { to } from 'utils'
import { getVolumeType } from 'utils/volume'
import ObjectMapper from 'utils/object.mapper'

export const getHpaFormattedData = (formData = {}) => {
  const cpuCurrentUtilization = get(
    formData,
    'metadata.annotations.cpuCurrentUtilization',
    0
  )
  const cpuTargetUtilization = get(
    formData,
    'metadata.annotations.cpuTargetUtilization',
    0
  )
  const memoryCurrentValue = get(
    formData,
    'metadata.annotations.memoryCurrentValue',
    ''
  )
  const memoryTargetValue = get(
    formData,
    'metadata.annotations.memoryTargetValue',
    ''
  )
  const cpuMetric = cpuTargetUtilization
    ? [
        {
          type: 'Resource',
          resource: {
            name: 'cpu',
            target: {
              type: 'Utilization',
              averageUtilization: Number(cpuTargetUtilization),
            },
          },
        },
      ]
    : []
  const memoryMetric = memoryTargetValue
    ? [
        {
          type: 'Resource',
          resource: {
            name: 'memory',
            target: {
              type: 'AverageValue',
              averageValue: memoryTargetValue,
            },
          },
        },
      ]
    : []

  const data = merge(formData, {
    apiVersion: 'autoscaling/v2beta2',
    kind: 'HorizontalPodAutoscaler',
    metadata: {
      annotations: {
        cpuCurrentUtilization: String(cpuCurrentUtilization),
        cpuTargetUtilization: String(cpuTargetUtilization),
        memoryCurrentValue: String(memoryCurrentValue),
        memoryTargetValue: String(memoryTargetValue),
      },
    },
  })

  set(data, 'spec.metrics', [...memoryMetric, ...cpuMetric])

  return data
}

export const getWorkloadVolumes = async (detail, setDetail = false) => {
  const prefix = detail.cluster
    ? `api/v1/klusters/${detail.cluster}/namespaces/${
        detail.namespace
      }/persistentvolumeclaims`
    : `api/v1/namespaces/${detail.namespace}/persistentvolumeclaims`
  let specVolumes = []
  if (!isEmpty(detail.volumes)) {
    const promises = []
    specVolumes = detail.volumes.map(volume => {
      let volumeName = ''
      if (volume.persistentVolumeClaim) {
        volumeName = volume.persistentVolumeClaim.claimName
        promises.push(to(request.get(`${prefix}/${volumeName}`)))
      } else {
        volumeName = volume.hostPath ? volume.hostPath.path : volume.name
      }

      return {
        ...volume,
        storage: '-',
        name: volumeName,
        mountName: volume.name,
        type: getVolumeType(volume),
      }
    })

    const volumesResult = await Promise.all(promises)
    const volumes = volumesResult.map(ObjectMapper.volumes)

    specVolumes.forEach(volume => {
      if (volume.type === 'Volume') {
        const volumeDetail =
          volumes.find(_volume => _volume.name === volume.name) || {}
        volume.storage = volumeDetail.capacity
        volume.capacity = volumeDetail.capacity
        volume.storageClassName = volumeDetail.storageClassName
        volume.accessMode = get(volumeDetail, 'accessMode')
      }

      // get volume mounts
      if (!isEmpty(detail.containers)) {
        const mounts = []

        detail.containers.forEach(container => {
          if (!isEmpty(container.volumeMounts)) {
            container.volumeMounts.forEach(mount => {
              if (mount.name === volume.mountName) {
                mounts.push({
                  ...mount,
                  container: container.name,
                  accessMode: mount.readOnly ? 'read-only' : 'read-write',
                })
              }
            })
          }
        })

        volume.mounts = mounts
      }
    })
  }

  if (setDetail) {
    detail.volumes = specVolumes
  }

  return specVolumes
}

export const getWorkloadUpdateTime = item => {
  const annotations = get(item, 'metadata.annotations', {})
  const status = get(item, 'status', {})

  if (annotations.updateTime) return annotations.updateTime

  const conditions = status.conditions || []

  if (isEmpty(conditions)) return get(item, 'metadata.creationTimestamp')

  let lastTime = new Date(get(conditions, '[0].lastUpdateTime', 0)).valueOf()
  conditions.forEach(({ lastUpdateTime }) => {
    const value = new Date(lastUpdateTime).valueOf()
    value > lastTime && (lastTime = value)
  })

  return lastTime
}

export const getCurrentRevision = (
  workloadDetail,
  revisions,
  module = 'deployments'
) => {
  let revision = 0

  switch (module) {
    default:
    case 'deployments':
      revision = get(
        workloadDetail,
        'annotations["deployment.kubernetes.io/revision"]'
      )
      break
    case 'statefulsets':
    case 'daemonsets': {
      let maxRevision = get(revisions[0], 'revision', 0)
      for (let i = 1; i < revisions.length; i++) {
        if (revisions[i].revision > maxRevision) {
          maxRevision = revisions[i].revision
        }
      }

      const cur = revisions.find(
        item => item.name === get(workloadDetail, 'status.currentRevision')
      )
      revision = cur ? cur.revision : maxRevision
      break
    }
  }

  return parseInt(revision, 10)
}

export const getWorkloadReplicaCount = (record, module) => {
  const result = { ready: 0, total: 0 }

  switch (module) {
    default:
    case 'jobs':
    case 'cronjobs':
    case 'deployments':
    case 'statefulsets':
      result.ready = get(record, 'readyPodNums', 0)
      result.total = get(record, 'podNums', 0)
      break
    case 'daemonsets':
      result.ready = get(record, 'status.numberReady', 0)
      result.total = get(record, 'status.desiredNumberScheduled', 0)
      break
  }

  return result
}
