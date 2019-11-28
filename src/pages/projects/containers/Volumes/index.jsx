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
import { observer, inject } from 'mobx-react'
import { get, isEmpty } from 'lodash'

import { getLocalTime, getDisplayName } from 'utils'
import { getVolumeStatus } from 'utils/status'
import { ICON_TYPES, VOLUME_STATUS } from 'utils/constants'
import { getSuitableValue } from 'utils/monitoring'
import { getFormTemplate } from 'utils/form.templates'

import { Avatar, Status } from 'components/Base'
import Base from 'core/containers/Base/List'
import CreateModal from 'components/Modals/Create'
import EditYamlModal from 'components/Modals/EditYaml'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import StatusReason from 'projects/components/StatusReason'

import VolumeStore from 'stores/volume'
import VolumeMonitor from 'stores/monitoring/volume'
import FORM_STEPS from 'configs/steps/volumes'

import styles from './index.scss'

const METRICS = {
  inode_utilisation: 'pvc_bytes_utilisation',
  capacityTotal: 'pvc_bytes_total',
}

@inject('rootStore')
@observer
class Volumes extends Base {
  init() {
    this.store = new VolumeStore()
    const { namespace } = this.props.match.params
    this.monitorStore = new VolumeMonitor({
      namespace,
      last: true,
    })

    this.initWebsocket()
  }

  async getData(params) {
    super.getData(params)

    clearInterval(this.monitorTimer)
    this.monitorTimer = this.monitorStore.monitoringMetrics(
      {},
      { interval: 50000 }
    )
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    clearInterval(this.monitorTimer)
  }

  get module() {
    return 'volumes'
  }

  get name() {
    return 'Volume'
  }

  get steps() {
    return FORM_STEPS
  }

  get formTemplate() {
    const { namespace } = this.props.match.params
    return getFormTemplate(namespace, this.module)
  }

  get tips() {
    return [
      {
        title: t('WHAT_IS_STORAGE_CLASS_Q'),
        description: t('WHAT_IS_STORAGE_CLASS_A'),
      },
      {
        title: t('WHAT_IS_LOCAL_VOLUME_Q'),
        description: t('WHAT_IS_LOCAL_VOLUME_A'),
      },
    ]
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        onClick: this.showModal('editModal'),
      },
      {
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: this.showModal('editYamlModal'),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  getStatus() {
    return VOLUME_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getPVCMetrics = name => {
    const data = this.monitorStore.data
    const metrics = {}

    Object.entries(METRICS).forEach(([key, value]) => {
      const records = get(data, `${value}.data.result`) || []
      metrics[key] = records.find(
        item => get(item, 'metric.resource_name') === name
      )
    })

    return metrics
  }

  getTableProps() {
    return {
      ...super.getTableProps(),
      isRefreshing: this.monitorStore.isRefreshing,
      isMetricsLoading: this.monitorStore.isLoading,
      alwaysUpdate: true,
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

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      render: (name, record) => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          iconSize={40}
          title={getDisplayName(record)}
          desc={this.getItemDesc(record)}
          to={`${this.prefix}/${name}`}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'phase',
      filters: this.getStatus(),
      filteredValue: this.getFilteredValue('status'),
      isHideable: true,
      search: true,
      width: '14%',
      render: phase => (
        <Status
          type={phase}
          className={styles.status}
          name={t(`VOLUME_STATUS_${phase.toUpperCase()}`)}
        />
      ),
    },
    {
      title: t('Capacity'),
      dataIndex: 'capacity',
      sorter: true,
      sortOrder: this.getSortOrder('capacity'),
      isHideable: true,
      width: '16%',
      render: (capacity, { accessMode, name }) => {
        const realTimeData = this.getPVCMetrics(name)
        const realUsed = get(realTimeData, 'inode_utilisation.value[1]')
        const realCapacity = get(realTimeData, 'capacityTotal.value[1]', 0)

        return (
          <div className={styles.capacity}>
            <h3>
              {realCapacity
                ? getSuitableValue(realCapacity, 'memory')
                : capacity}
              <small>
                ({t('used')}
                {getSuitableValue(realUsed, '%')}
                %)
              </small>
            </h3>
            <p>{accessMode}</p>
          </div>
        )
      },
    },
    {
      title: t('Mount'),
      dataIndex: 'inUse',
      isHideable: true,
      width: '14%',
      render: inUse => (inUse ? t('Mounted') : t('Not Mounted')),
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      sorter: true,
      sortOrder: this.getSortOrder('createTime'),
      isHideable: true,
      width: 150,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm'),
    },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  handleYamlEdit = newObject => {
    const { selectItem } = this.state

    this.store.update(selectItem, newObject).then(() => {
      this.hideModal('editYamlModal')()
    })
  }

  renderExtraModals() {
    const {
      createModal,
      editModal,
      editYamlModal,
      selectItem = {},
    } = this.state

    const { isSubmitting } = this.store

    return (
      <div>
        <CreateModal
          name={this.name}
          module={this.module}
          store={this.store}
          visible={createModal}
          steps={this.steps}
          formTemplate={this.formTemplate}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
        <EditBasicInfoModal
          visible={editModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
        />
        <EditYamlModal
          store={this.store}
          visible={editYamlModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleYamlEdit}
          onCancel={this.hideModal('editYamlModal')}
        />
      </div>
    )
  }
}

export default Volumes
