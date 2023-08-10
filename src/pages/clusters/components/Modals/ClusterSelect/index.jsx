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
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Button, Columns, Column } from '@kube-design/components'
import FilterInput from 'components/Tables/Base/FilterInput'
import { Modal, ScrollLoad } from 'components/Base'
import ClusterStore from 'stores/cluster'
import Card from './Card'

import styles from './index.scss'

@observer
export default class ClusterSelectModal extends React.Component {
  constructor(props) {
    super(props)
    this.store = new ClusterStore()
    this.state = { filters: {} }
  }

  get columns() {
    return [
      {
        dataIndex: 'name',
        title: t('NAME'),
        search: true,
      },
      {
        dataIndex: 'alias',
        title: t('ALIAS'),
        search: true,
      },
    ]
  }

  fetchData = params => {
    this.store.fetchList({ ...params })
  }

  handleSearch = name => {
    this.fetchData({ name })
  }

  handleRefresh = () => {
    this.fetchData()
  }

  handleOnEnter = cluster => {
    const { onChange } = this.props
    localStorage.setItem(`${globals.user.username}-cluster`, cluster)
    onChange && onChange(cluster)
  }

  render() {
    const { visible, onCancel } = this.props
    const { data, total, page, isLoading } = this.store.list

    return (
      <Modal
        bodyClassName={styles.body}
        visible={visible}
        onCancel={onCancel}
        width={960}
        icon="cluster"
        title={t('CLUSTER_PL')}
        description={t('CLUSTER_DESC')}
        hideFooter
      >
        <div className={styles.bar}>
          <Columns>
            <Column>
              <FilterInput
                placeholder={t('SEARCH_BY_NAME')}
                columns={this.columns}
                onChange={_filters => {
                  this.setState({
                    filters: _filters,
                  })
                  this.fetchData(_filters)
                }}
                filters={this.state.filters}
              />
            </Column>
            <Column className="is-narrow">
              <Button icon="refresh" type="flat" onClick={this.handleRefresh} />
            </Column>
          </Columns>
        </div>
        <div className={styles.list}>
          <ScrollLoad
            wrapperClassName={styles.listWrapper}
            data={toJS(data)}
            total={total}
            page={page}
            loading={isLoading}
            onFetch={this.fetchData}
          >
            {data.map(item => (
              <Card key={item.uid} data={item} onEnter={this.handleOnEnter} />
            ))}
          </ScrollLoad>
        </div>
      </Modal>
    )
  }
}
