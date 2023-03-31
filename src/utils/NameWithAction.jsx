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
import React, { useEffect, useState } from 'react'
import { eventBus } from 'utils/EventBus'
import { eventKeys } from 'utils/events'
import { truncateString } from 'utils/index'

export const showNameAndAlias = (
  name,
  type,
  { cluster, workspace } = {},
  isText = false,
  cb = () => {},
  withTitle = false
) => {
  if (typeof name === 'object' && name !== null) {
    return name.display_name
      ? name.display_name
      : name.aliasName
      ? `${name.aliasName}(${name.name})`
      : name.name
  }
  let object
  let event
  if (!name) {
    return ''
  }
  if (!type) {
    return name
  }
  const currentCluster = cluster ?? globals.currentCluster
  const currentWorkspace = workspace ?? globals.currentWorkspace

  let objectArray = []
  if (type === 'project') {
    objectArray = get(globals, `clusterProjectArray.${currentCluster}`, [])
    event = eventKeys.PROJECT_ITEM_CHANGE(name, currentCluster)
  } else if (type === 'cluster') {
    objectArray = get(globals, `clusterArray`, [])
    event = eventKeys.CLUSTER_ITEM_CHANGE(name)
  } else if (type === 'workspace') {
    objectArray = get(globals, `workspaceArray`, [])
    event = eventKeys.WORKSPACE_ITEM_CHANGE(name)
  } else if (type === 'federatedProject') {
    objectArray = get(globals, `federatedProjectArray`, [])
    event = eventKeys.FEDERATED_PROJECT_ITEM_CHANGE(name)
  }

  object = objectArray.find(item => item.name === name)

  if (type === 'devops') {
    objectArray = get(globals, `clusterDevopsArray.${currentCluster}`, [])
    event = eventKeys.DEVOPS_ITEM_CHANGE(name, currentCluster, currentWorkspace)
    object = objectArray.find(
      item => item.name === name && item.workspace === currentWorkspace
    )
  }

  if (!object && type !== 'devops') {
    const params = {
      cluster: currentCluster,
      workspace: currentWorkspace,
      [type]: name,
    }
    eventBus.emit(eventKeys.requestAlias, { type, params })
  }

  if (isText) {
    if (!object) {
      const f = () => {
        cb && cb()
        eventBus.off(event, f)
      }

      eventBus.on(event, f)
    }
    return object
      ? object.aliasName
        ? `${object.aliasName}(${object.name})`
        : object.name
      : name
  }

  return React.createElement(NameWithAction, {
    name,
    event,
    object,
    withTitle,
  })
}

const getName = object =>
  object
    ? object.aliasName
      ? `${truncateString(object.aliasName)}(${truncateString(
          object.name,
          30
        )})`
      : object.name
    : name

function NameWithAction({ event, name, object, withTitle }) {
  const [, setMessage] = useState(getName(object))
  const [fullName, setFullName] = useState(
    object
      ? object.aliasName
        ? `${object.aliasName}(${truncateString(object.name, 30)})`
        : object.name
      : name
  )
  const handleEvent = object1 => {
    setMessage(getName(object1))
    setFullName(
      object1
        ? object1.aliasName
          ? `${object1.aliasName}(${object1.name})`
          : object1.name
        : name
    )
  }

  useEffect(() => {
    if (event) {
      eventBus.on(event, handleEvent)
      return () => {
        eventBus.off(event, handleEvent)
      }
    }
  }, [event])

  return withTitle ? (
    <span title={fullName ?? name}>{fullName ?? name}</span>
  ) : (
    fullName ?? name
  )
}

export default NameWithAction
