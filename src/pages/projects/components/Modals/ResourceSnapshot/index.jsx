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
import { Form, Input, Select } from '@kube-design/components'
import { Modal } from 'components/Base'
import styles from './index.scss'

export default class ResourceSnapshot extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
    snapshotOption: PropTypes.array,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
    isSubmitting: false,
    snapshotOption: [],
  }

  render() {
    const { visible, isSubmitting, onCancel, onOk, title, options } = this.props
    return (
      <Modal.Form
        icon="pen"
        width={600}
        title={title}
        onOk={onOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item
          label={t('NAME')}
          rules={[
            { required: true, message: t('NAME_EMPTY_DESC') },
            {
              pattern: PATTERN_NAME,
              message: t('INVALID_NAME_DESC', { message: t('LONG_NAME_DESC') }),
            },
          ]}
          desc={t('LONG_NAME_DESC')}
        >
          <Input name="name" maxLength={253} className={styles.input} />
        </Form.Item>
        <Form.Item
          label={t('VOLUME_SNAPSHOT_CLASS')}
          rules={[{ required: true, message: t('SNAPSHOT_EMPTY_TIP') }]}
        >
          <Select name="type" options={options} placeholder=" "  className={styles.input} />
        </Form.Item>
      </Modal.Form>
    )
  }
}
