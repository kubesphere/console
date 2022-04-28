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

import { PATTERN_NAME } from 'utils/constants'
import { Form, Input, Select, Icon, Tooltip } from '@kube-design/components'
import { Modal } from 'components/Base'
import VolumeStore from 'stores/volume'
import StorageClass from 'stores/storageClass'
import VolumeSnapshotClassStore from 'stores/volumeSnapshotClasses'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { get, isObject } from 'lodash'
import styles from './index.scss'

@observer
export default class ResourceSnapshot extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
    snapshotOption: PropTypes.array,
    volumeSelect: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
    isSubmitting: false,
    snapshotOption: [],
    volumeSelect: false,
  }

  volumeStore = new VolumeStore()

  storageclass = new StorageClass()

  snapShotClassStore = new VolumeSnapshotClassStore()

  form = React.createRef()

  testRef = React.createRef()

  state = {
    pagination: {
      page: 0,
      total: 0,
      limit: 10,
    },
    selectedVolume: '',
    volumeInfo: '',
    formData: {},
    snapShotClass: [],
    isLoading: false,
    storageClassBan: false,
    allowSnapshot: true,
  }

  get volumeList() {
    return toJS(this.volumeStore.list.data).map(item => {
      return {
        value: item.name,
        label: item.name,
        disabled: !item.inUse || item.isFedManaged,
        isFedManaged: item.isFedManaged,
        namespace: item.namespace,
      }
    })
  }

  componentDidMount() {
    const { volumeSelect } = this.props
    if (volumeSelect) {
      this.fetchList()
      this.getSnapShotClassList()
    }
  }

  fetchList = async (params = {}) => {
    const { pagination } = this.state
    this.setState(
      {
        isLoading: true,
        pagination: {
          ...pagination,
          page: pagination.page + 1,
        },
      },
      () => {
        const { page, limit } = this.state.pagination
        const { namespace, cluster } = this.props
        const listParams = {
          namespace,
          cluster,
          ...params,
          limit: limit * page,
          page: 1,
          sortBy: 'createTime',
        }

        this.volumeStore.fetchList(listParams).then(() => {
          const { total } = this.volumeStore.list
          this.setState({
            pagination: {
              ...this.state.pagination,
              total,
            },
            isLoading: false,
          })
        })
      }
    )
  }

  getSnapShotClassList() {
    const { namespace, cluster } = this.props
    const listParams = {
      namespace,
      cluster,
      limit: -1,
    }
    this.snapShotClassStore.fetchList(listParams)
  }

  volumeChange = value => {
    this.setState(
      {
        selectedVolume: value,
      },
      () => {
        this.saveVolumeInfo()
      }
    )
  }

  saveVolumeInfo() {
    const { selectedVolume } = this.state
    if (selectedVolume) {
      const volumeInfo = toJS(this.volumeStore.list.data).filter(
        item => item.name === selectedVolume
      )[0]
      if (volumeInfo) {
        this.setState(
          {
            volumeInfo,
          },
          () => {
            this.getSnapShotClass()
            this.getStorageClassInfo()
          }
        )
      }
    }
  }

  getSnapShotClass() {
    const data = toJS(this.snapShotClassStore.list.data)
    const { volumeInfo } = this.state
    const provisioner = get(
      volumeInfo,
      "annotations['volume.beta.kubernetes.io/storage-provisioner']",
      '-'
    )
    const options = []
    data.forEach(item => {
      if (item.driver === provisioner) {
        options.push({
          label: item.name,
          value: item.name,
        })
      }
    })
    this.setState({
      snapShotClass: options,
    })
  }

  async getStorageClassInfo() {
    const { cluster, namespace } = this.props
    const { volumeInfo } = this.state
    const { storageClassName } = volumeInfo

    let allowSnapshot

    try {
      await this.storageclass.fetchDetail({
        cluster,
        namespace,
        name: storageClassName,
      })
      allowSnapshot = get(
        toJS(this.storageclass).detail.annotations,
        'storageclass.kubesphere.io/allow-snapshot',
        'false'
      )
    } catch (err) {
      allowSnapshot = 'false'
    }

    this.setState(
      {
        allowSnapshot: JSON.parse(allowSnapshot),
      },
      () => {
        this.testRef.current.validate({
          sourceName: this.state.selectedVolume,
        })
      }
    )
  }

  volumeValidator = (rule, value, callback) => {
    const { allowSnapshot, volumeInfo } = this.state

    if (!allowSnapshot && isObject(volumeInfo)) {
      callback({
        message: t('STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT'),
        field: rule.field,
      })
    }
    callback()
  }

  optionRenderer = option => {
    return (
      <div className={styles.option}>
        {option.isFedManaged ? (
          <img className={styles.indicator} src="/assets/cluster.svg" />
        ) : (
          <Icon type="light" name="storage" />
        )}
        {option.label}&nbsp;({option.namespace})
        {option.isFedManaged && (
          <Tooltip
            content={this.props.tipMessage || t('FEDPROJECT_RESOURCE_TIP')}
          >
            <Icon className={styles.tip} name="question" />
          </Tooltip>
        )}
      </div>
    )
  }

  renderVolumeSelect() {
    const { pagination, isLoading } = this.state
    return (
      <Form.Item
        ref={this.testRef}
        label={t('PERSISTENT_VOLUME_CLAIM')}
        rules={[
          { required: true, message: t('PVC_NOT_SELECT') },
          {
            validator: this.volumeValidator,
          },
        ]}
        desc={t('SELECT_A_VOLUME_DESC')}
      >
        <Select
          searchable
          name="sourceName"
          className={styles.input}
          options={this.volumeList}
          pagination={pagination}
          onFetch={this.fetchList}
          onChange={this.volumeChange}
          isLoading={isLoading}
          optionRenderer={this.optionRenderer}
          clearable
        />
      </Form.Item>
    )
  }

  handleOk = () => {
    let namespace
    const { onOk } = this.props
    const { allowSnapshot, selectedVolume } = this.state

    this.form.current.validator(() => {
      if (!allowSnapshot) {
        return
      }
      const { data } = this.form.current.props
      if (selectedVolume !== '') {
        namespace = toJS(this.volumeStore.list.data).filter(
          item => item.name === selectedVolume
        )[0].namespace
      }

      onOk({ ...data, namespace })
    })
  }

  render() {
    const {
      visible,
      isSubmitting,
      onCancel,
      title,
      options,
      volumeSelect,
    } = this.props
    const { snapShotClass, formData } = this.state
    return (
      <Modal
        icon="pen"
        width={600}
        title={title}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form data={formData} ref={this.form}>
          {volumeSelect && this.renderVolumeSelect()}
          <Form.Item
            label={t('NAME')}
            rules={[
              { required: true, message: t('NAME_EMPTY_DESC') },
              {
                pattern: PATTERN_NAME,
                message: t('INVALID_NAME_DESC', {
                  message: t('LONG_NAME_DESC'),
                }),
              },
            ]}
            desc={t('LONG_NAME_DESC')}
          >
            <Input name="name" maxLength={253} className={styles.input} />
          </Form.Item>
          <Form.Item
            label={t('VOLUME_SNAPSHOT_CLASS')}
            rules={[{ required: true, message: t('SNAPSHOT_EMPTY_TIP') }]}
            desc={t('SELECT_VOLUME_SNAPSHOT_CLASS_DESC')}
          >
            <Select
              name="type"
              options={volumeSelect ? snapShotClass : options}
              placeholder=" "
              className={styles.input}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
