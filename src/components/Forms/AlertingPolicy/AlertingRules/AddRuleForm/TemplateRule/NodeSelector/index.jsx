import React, { useEffect, useState } from 'react'
import { Select, Form } from '@kube-design/components'
import { pick } from 'lodash'

import NodeStore from 'stores/node'

const NodeSelector = props => {
  const store = new NodeStore()
  const [nodes, setNodes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const pagination = pick(store.list, ['page', 'limit', 'total'])

  const fetchData = params => {
    const { cluster } = props
    setIsLoading(true)

    store
      .fetchList({
        cluster,
        ...params,
      })
      .then(() => {
        const fetchNodes = store.list.data.map(item => ({
          label: item.name,
          value: item.name,
        }))
        setNodes(_nodes => [..._nodes, ...fetchNodes])
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Form.Item
      label={t('MONITORING_TARGETS')}
      rules={[{ required: true, message: t('SELECT_NODE_TIP') }]}
    >
      <Select
        name={props.name}
        options={nodes}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={fetchData}
        searchable
        multi
        placeholder=" "
      />
    </Form.Item>
  )
}

export default NodeSelector
