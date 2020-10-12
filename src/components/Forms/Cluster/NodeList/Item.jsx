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
import { Tag } from '@kube-design/components'
import { NODE_ROLE_TAG_TYPE } from 'utils/constants'
import { List } from 'components/Base'

const Item = ({ index, node, onDelete, onEdit }) => {
  const handleDelete = () => onDelete(node)
  const handleEdit = () => onEdit(index)

  const title = (
    <span>
      {node.name}
      {node.roles.map(role => (
        <Tag key={role} className="margin-l8" type={NODE_ROLE_TAG_TYPE[role]}>
          {role}
        </Tag>
      ))}
    </span>
  )

  return (
    <List.Item
      icon="nodes"
      title={title}
      description={node.address}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  )
}

Item.propTypes = {
  node: PropTypes.object,
}

export default Item
