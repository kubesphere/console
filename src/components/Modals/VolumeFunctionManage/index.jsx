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
import { Toggle, Alert } from '@kube-design/components'
import { Modal } from 'components/Base'

import { get, isUndefined, isString } from 'lodash'
import { observer } from 'mobx-react'
import styles from './index.scss'

@observer
export default class SetDefaultStorageClassModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  state = this.getState

  get getState() {
    const { StorageClassStore: store } = this.props
    const detail = store.detail
    return {
      allowClone: get(
        detail.annotations,
        'storageclass.kubesphere.io/allow-clone',
        undefined
      ),
      allowSnapshot: get(
        detail.annotations,
        'storageclass.kubesphere.io/allow-snapshot',
        undefined
      ),
      allowVolumeExpansion: get(detail, 'allowVolumeExpansion', undefined),
    }
  }

  get onOkState() {
    return {
      allowClone: this.dataUndefined(this.state.allowClone),
      allowSnapshot: this.dataUndefined(this.state.allowSnapshot),
      allowVolumeExpansion: this.dataUndefined(this.state.allowVolumeExpansion),
    }
  }

  dataUndefined = data => {
    return isUndefined(data) ? false : isString(data) ? JSON.parse(data) : data
  }

  get Items() {
    return [
      {
        title: t('VOLUME_CLONING'),
        des: t('VOLUME_CLONING_DESC'),
        key: 'allowClone',
        onclick: checked =>
          this.setState({
            allowClone: !checked,
          }),
      },
      {
        title: t('VOLUME_SNAPSHOT_CREATION'),
        des: t('VOLUME_SNAPSHOT_CREATION_DESC'),
        key: 'allowSnapshot',
        onclick: checked => this.setState({ allowSnapshot: !checked }),
      },
      {
        title: t('VOLUME_EXPANSION'),
        des: t('VOLUME_EXPANSION_DESC'),
        key: 'allowVolumeExpansion',
        onclick: checked =>
          this.setState({
            allowVolumeExpansion: !checked,
          }),
      },
    ]
  }

  render() {
    const { visible, onCancel, onOk, isSubmitting } = this.props
    return (
      <Modal
        width={600}
        onOk={() => onOk(this.state)}
        onCancel={onCancel}
        visible={visible}
        title={t('SET_VOLUME_OPERATIONS')}
        icon="slider"
        okText={t('OK')}
        cancelText={t('CANCEL')}
        isSubmitting={isSubmitting}
      >
        <Alert
          type="warning"
          className="margin-b12"
          message={t.html('SET_VOLUME_OPERATIONS_TIP')}
        />
        <div className={styles.body}>
          {this.Items.map(item => {
            const status = this.state[item.key]
            const checked = this.dataUndefined(status)
            return (
              <div className={styles.Item} key={item.title}>
                <div className={styles.icon}>
                  <Toggle
                    checked={checked}
                    disabled={isUndefined(status)}
                    onChange={() => item.onclick(checked)}
                  ></Toggle>
                </div>
                <div className={styles.textBox}>
                  <span className={styles.title}>{item.title}</span>
                  <span className={styles.des}>{item.des}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Modal>
    )
  }
}
