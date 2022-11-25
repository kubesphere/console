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
 *
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { isEmpty } from 'lodash'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'

import PvStore from 'stores/pv'
import { getLocalTime, getDisplayName, map_accessModes } from 'utils'
import { Icon, Tooltip } from '@kube-design/components'
import { getVolumeStatus } from 'utils/status'
import { PV_STATUS } from 'utils/constants'
import StatusReason from 'projects/components/StatusReason'

import { Avatar, Status } from 'components/Base'
import styles from './index.scss'

@withList({
  store: new PvStore(),
  module: 'persistentvolumes',
  name: 'PERSISTENT_VOLUME',
  rowKey: 'uid',
})
export default class PV extends React.Component {
  showAction = record => !record.isFedManaged

  cantDelete = ({ status }) => ['Bound', 'Released'].indexOf(status.phase) > -1

  get itemActions() {
    const { trigger } = this.props

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
            success: this.props.getData,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'view',
        show: this.showAction,
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
            success: this.props.getData,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        disabled: this.cantDelete,
        onClick: item =>
          trigger('pv.delete', {
            ...this.props.tableProps,
            detail: item,
            success: this.props.getData,
          }),
      },
    ]
  }

  get tableActions() {
    const { trigger, tableProps } = this.props
    return {
      ...tableProps.tableActions,
      selectActions: [
        {
          key: 'delete',
          icon: 'trash',
          text: t('DELETE'),
          action: 'delete',
          type: 'danger',
          show: this.showAction,
          onClick: () =>
            trigger('pv.batch.delete', {
              ...this.props.tableProps,
              success: this.props.getData,
            }),
        },
      ],
    }
  }

  getItemDesc = record => {
    const status = getVolumeStatus(record)
    const desc = !isEmpty(status) ? (
      <StatusReason reason={status} data={record} type={'volume'} />
    ) : (
      record.storageClassName || '-'
    )

    return desc
  }

  getCheckboxProps = record => ({
    disabled:
      record.isFedManaged ||
      ['Bound', 'Released'].indexOf(record.status.phase) > -1,
    name: record.name,
  })

  getStatus() {
    return PV_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns() {
    const { getSortOrder, getFilteredValue } = this.props
    const { cluster } = this.props.match.params

    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sortOrder: getSortOrder('name'),
        search: true,
        sorter: true,
        render: (name, record) => {
          return (
            <Avatar
              icon={'storage'}
              iconSize={40}
              to={
                record.phase === 'Terminating'
                  ? ''
                  : `/clusters/${cluster}/pv/${name}`
              }
              isMultiCluster={record.isFedManaged}
              desc={this.getItemDesc(record)}
              title={getDisplayName(record)}
            />
          )
        },
      },
      {
        title: t('STATUS'),
        dataIndex: 'status',
        isHideable: true,
        search: true,
        filters: this.getStatus(),
        filteredValue: getFilteredValue('status'),
        width: '10.56%',
        render: ({ phase }) => (
          <Status
            type={phase}
            name={t(`PV_STATUS_${phase.toUpperCase()}`)}
            flicker
          />
        ),
      },
      {
        title: t('CAPACITY'),
        dataIndex: 'capacity',
        isHideable: true,
        width: '7%',
        render: capacity => (
          <div>
            <p>{capacity}</p>
          </div>
        ),
      },
      {
        title: this.renderAccessTitle(),
        dataIndex: 'accessModes',
        isHideable: false,
        width: '12.32%',
        render: accessModes => this.mapperAccessMode(accessModes),
      },
      {
        title: t('RECLAIM_POLICY'),
        dataIndex: '_originData',
        isHideable: true,
        width: '7.74%',
        render: _ => _.spec.persistentVolumeReclaimPolicy,
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 140,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm'),
      },
    ]
  }

  renderAccessTitle = () => {
    const renderModeTip = (
      <div>
        <div>{t('RWO_DESC')}</div>
        <div>{t('ROX_DESC')}</div>
        <div>{t('RWX_DESC')}</div>
      </div>
    )
    return (
      <div className={styles.mode_title}>
        {t('ACCESS_MODE_TCAP')}
        <Tooltip content={renderModeTip}>
          <Icon name="question" size={16} className={styles.question}></Icon>
        </Tooltip>
      </div>
    )
  }

  mapperAccessMode = accessModes => {
    const modes = map_accessModes(accessModes)
    return <span>{modes.join(',')}</span>
  }

  render() {
    const { match, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Table
          {...tableProps}
          itemActions={this.itemActions}
          tableActions={this.tableActions}
          columns={this.getColumns()}
          cluster={match.params.cluster}
          getCheckboxProps={this.getCheckboxProps}
          renderProjectSelect={false}
        />
      </ListPage>
    )
  }
}
