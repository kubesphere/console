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

import { get } from 'lodash'
// eslint-disable-next-line
import React from 'react'
import { getDisplayNameNew } from 'utils'
import { eventBus } from 'utils/EventBus'
import { eventKeys, useEventValue } from 'utils/events'

const ProjectOrDevopsName = props => {
  const { data = {} } = props
  useEventValue(eventKeys.PROJECT_ITEM_CHANGE(data.namespace, data.cluster))
  const namespace = get(
    globals,
    `clusterProjectArray.${data.cluster}`,
    []
  ).find(i => i.name === data.namespace)

  React.useEffect(() => {
    if (namespace === undefined) {
      eventBus.emit(eventKeys.requestAlias, {
        type: 'project',
        params: {
          project: data.namespace,
          cluster: data.cluster,
        },
      })
    }
  }, [namespace])

  return namespace ? getDisplayNameNew(namespace) : data.namespace ?? ''
  // const devopsName = namespace
  //   ? get(namespace, 'labels["kubesphere.io/devopsproject"]')
  //   : ''
  //
  // const isDevops =
  //   !!namespace && has(namespace, 'labels["kubesphere.io/devopsproject"]')
  // const devops = get(globals, `clusterDevopsArray.${data.cluster}`, []).find(
  //   i => i.devops === devopsName
  // )
  // useEventValue(eventKeys.DEVOPS_ITEM_CHANGE(devops?.name, data.cluster))

  // return namespace
  //   ? getDisplayName(!isDevops ? namespace : devops)
  //   : data.namespace ?? ''
}

export default ProjectOrDevopsName
