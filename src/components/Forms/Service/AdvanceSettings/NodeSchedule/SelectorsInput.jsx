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
import { Button, Popper } from '@kube-design/components'

import { PropertiesInput } from 'components/Inputs'
import NodeSelect from './NodeSelect/index'
import styles from './index.scss'

export default class SelectorsInput extends React.Component {
  state = {
    visible: false,
  }

  handleNodeSelect = labels => {
    const { onChange } = this.props
    onChange && onChange(labels)
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  renderNodeSelectForm() {
    const { cluster, namespace } = this.props
    return (
      <NodeSelect
        cluster={cluster}
        namespace={namespace}
        onSelect={this.handleNodeSelect}
        onCancel={this.handleCancel}
        visible={this.state.visible}
      />
    )
  }

  render() {
    const { visible } = this.state

    return (
      <div className={styles.wrapper}>
        <PropertiesInput {...this.props} controlled />
        <Popper
          className={styles.popper}
          visible={visible}
          placement="right"
          content={this.renderNodeSelectForm()}
          closeAfterClick={false}
          trigger="click"
        >
          <Button className={styles.node}>{t('Specify Node')}</Button>
        </Popper>
      </div>
    )
  }
}
