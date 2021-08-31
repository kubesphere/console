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
import { Toggle } from '@kube-design/components'
import { Modal } from 'components/Base'

import { get } from 'lodash'
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
        false
      ),
      allowSnapshot: get(
        detail.annotations,
        'storageclass.kubesphere.io/allow-snapshot',
        false
      ),
      allowVolumeExpansion: get(detail, 'allowVolumeExpansion', false),
    }
  }

  get Items() {
    return [
      {
        title: t('Volume Clone'),
        des: t('Volume_Clone_Des'),
        key: 'allowClone',
        onclick: checked =>
          this.setState({
            allowClone: !checked,
          }),
      },
      {
        title: t('Volume Snapshot'),
        des: t('Volume_SnapShot_Des'),
        key: 'allowSnapshot',
        onclick: checked => this.setState({ allowSnapshot: !checked }),
      },
      {
        title: t('Volume Expansion'),
        des: t('Volume_Expansion_Des'),
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
        title={t('Storage Function Manage')}
        icon="slider"
        okText={t('Confirm')}
        cancelText={t('Cancel')}
        isSubmitting={isSubmitting}
      >
        <div className={styles.body}>
          {this.Items.map(item => {
            const checked = this.state[item.key]
            return (
              <div className={styles.Item} key={item.title}>
                <div className={styles.icon}>
                  <Toggle
                    checked={checked}
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
