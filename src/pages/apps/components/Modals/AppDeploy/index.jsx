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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import { Modal } from 'components/Base'
import AppDeployForm from 'apps/components/Forms/AppDeploy'

import styles from './index.scss'

@observer
export default class AppDeploy extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    app: PropTypes.object,
    params: PropTypes.object,
    versionId: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    app: {},
    versionId: '',
    onOk() {},
    onCancel() {},
  }

  render() {
    const {
      params,
      app,
      versionId,
      onOk,
      onCancel,
      isSubmitting,
      ...rest
    } = this.props

    return (
      <Modal
        headerClassName={styles.header}
        bodyClassName={styles.body}
        imageSrc={app.icon || app.name}
        onCancel={onCancel}
        rightScreen
        hideFooter
        {...rest}
      >
        <AppDeployForm
          params={params}
          app={app}
          versionId={versionId}
          isSubmitting={isSubmitting}
          onOk={onOk}
          onCancel={onCancel}
        />
      </Modal>
    )
  }
}
