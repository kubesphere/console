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
import { Link } from 'react-router-dom'

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { withClusterList, ListPage } from 'components/HOCs/withList'
import ResourceTable from 'clusters/components/ResourceTable'

import { getLocalTime, getDisplayName } from 'utils'
import { ICON_TYPES, SECRET_TYPES } from 'utils/constants'

import SecretStore from 'stores/secret'
import styles from './index.scss'

@withClusterList({
  store: new SecretStore(),
  module: 'secrets',
  name: 'SECRET',
  rowKey: 'uid',
})
export default class Secrets extends React.Component {
  showAction = record => !record.isFedManaged

  showSetDefault = record =>
    record.type === 'kubernetes.io/dockerconfigjson' && !record.isDefault

  get itemActions() {
    const { trigger, name, getData } = this.props
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('resource.baseinfo.edit', {
            detail: item,
          }),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('EDIT_YAML'),
        action: 'edit',
        show: this.showAction,
        onClick: item =>
          trigger('resource.yaml.edit', {
            detail: item,
          }),
      },
      {
        key: 'editSecret',
        icon: 'pen',
        text: t('EDIT_SETTINGS'),
        action: 'edit',
        show: this.showAction,
        onClick: item => {
          trigger('secret.edit', {
            detail: item,
            success: getData,
          })
        },
      },
      {
        key: 'default',
        icon: 'star',
        text: t('SET_DEFAULT_REPOSITORY'),
        action: 'edit',
        show: this.showSetDefault,
        onClick: item => {
          trigger('secret.default', {
            detail: item,
            success: getData,
          })
        },
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        show: this.showAction,
        onClick: item => {
          trigger('resource.delete', {
            type: name,
            detail: item,
            success: getData,
          })
        },
      },
    ]
  }

  getCheckboxProps = record => ({
    disabled: record.isFedManaged,
    name: record.name,
  })

  getDefaultLabel = (title, record) => {
    if (!record.isDefault) {
      return title
    }
    return (
      <div className={styles.titleRow}>
        <span className={styles.title}>{title}</span>
        <span className={styles.tag}>{t('DEFAULT_REPOSITORY')}</span>
      </div>
    )
  }

  getColumns = () => {
    const { getSortOrder, module } = this.props
    const { cluster } = this.props.match.params
    return [
      {
        title: t('NAME'),
        dataIndex: 'name',
        sorter: true,
        sortOrder: getSortOrder('name'),
        render: (name, record) => (
          <Avatar
            icon={ICON_TYPES[module]}
            iconSize={40}
            title={this.getDefaultLabel(getDisplayName(record), record)}
            desc={record.description || '-'}
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${name}`}
            isMultiCluster={record.isFedManaged}
          />
        ),
      },
      {
        title: t('PROJECT'),
        dataIndex: 'namespace',
        isHideable: true,
        width: '16%',
        render: namespace => (
          <Link to={`/clusters/${cluster}/projects/${namespace}`}>
            {namespace}
          </Link>
        ),
      },
      {
        title: t('TYPE'),
        dataIndex: 'type',
        isHideable: true,
        width: '20%',
        render: type => (SECRET_TYPES[type] ? t(SECRET_TYPES[type]) : type),
      },
      {
        title: t('SECRET_FIELD_COUNT'),
        dataIndex: 'data',
        isHideable: true,
        width: '16%',
        render: data => Object.keys(data).length,
      },
      {
        title: t('CREATION_TIME_TCAP'),
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: getSortOrder('createTime'),
        isHideable: true,
        width: 150,
        render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
      },
    ]
  }

  showCreate = () => {
    const { match, module, getData } = this.props
    return this.props.trigger('secret.create', {
      module,
      cluster: match.params.cluster,
      namespace: match.params.namespace,
      success: () => getData(),
    })
  }

  render() {
    const { match, bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props}>
        <Banner {...bannerProps} />
        <ResourceTable
          {...tableProps}
          itemActions={this.itemActions}
          columns={this.getColumns()}
          onCreate={this.showCreate}
          cluster={match.params.cluster}
          getCheckboxProps={this.getCheckboxProps}
          searchType="name"
        />
      </ListPage>
    )
  }
}
