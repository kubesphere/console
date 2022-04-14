import React from 'react'

import withList, { ListPage } from 'components/HOCs/withList'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/List'
import { getDisplayName, getLocalTime } from 'utils'

import VolumeSnapshotClassesStore from 'stores/volumeSnapshotClasses'

@withList({
  store: new VolumeSnapshotClassesStore(),
  module: 'volumesnapshotclasses',
  authKey: 'volumes',
  name: 'VOLUME_SNAPSHOT_CLASS',
  rowKey: 'uid',
})
export default class VolumeSnapshotClasses extends React.Component {
  get itemActions() {
    const { trigger, store, match, name } = this.props
    const { cluster } = match.params
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: this.showAction,
        onClick: async item => {
          const data = await store.fetchDetail(item)
          trigger('resource.baseinfo.edit', {
            store,
            detail: data,
            cluster,
            success: this.props.getData,
          })
        },
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'view',
        show: this.showAction,
        onClick: async item => {
          const data = await store.fetchDetail(item)
          trigger('volume.snapshot.yaml.edit', {
            store,
            detail: data,
            yaml: data._originData,
            success: this.props.getData,
          })
        },
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        disabled: this.cantDelete,
        onClick: item =>
          trigger('resource.delete', {
            type: name,
            detail: item,
            success: this.props.getData,
          }),
      },
    ]
  }

  getColumns = () => {
    const { getSortOrder, prefix } = this.props
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        search: true,
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            to={`${prefix}/${name}`}
            title={getDisplayName(record)}
            desc={record.description}
          />
        ),
      },
      {
        title: t('VOLUME_SNAPSHOT_PL'),
        dataIndex: 'count',
        isHideable: true,
        width: '17.6%',
      },
      {
        title: t('PROVISIONER'),
        dataIndex: 'driver',
        isHideable: true,
        width: '17.6%',
      },
      {
        title: t('DELETION_POLICY'),
        dataIndex: 'deletionPolicy',
        isHideable: true,
        width: '17.6%',
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        isHideable: true,
        width: '12.3%',
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm'),
      },
    ]
  }

  showCreate = () => {
    this.props.trigger('snapshotClasses.create', {
      name: 'VOLUME_SNAPSHOT_CLASS',
      module: 'volumesnapshotclass',
      cluster: this.props.match.params.cluster,
      success: this.props.routing.query,
    })
  }

  render() {
    const { tableProps, bannerProps } = this.props
    return (
      <ListPage {...this.props} noWatch>
        <Banner {...bannerProps}></Banner>
        <Table
          {...tableProps}
          columns={this.getColumns()}
          itemActions={this.itemActions}
          onCreate={this.showCreate}
        />
      </ListPage>
    )
  }
}
