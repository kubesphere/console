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
import { Modal } from 'components/Base'
import classnames from 'classnames'
import { getComponentDisplayName } from 'utils'

import styles from './index.scss'

/*
 * a hoc only use for reusing fullscreen model style
 */
export default function fullscreenModal(WrappedComponent) {
  class ObserverModal extends React.Component {
    render() {
      const {
        title,
        onCancel,
        icon,
        description,
        bodyClassName,
        ...otherProps
      } = this.props
      return (
        <Modal
          visible
          fullScreen
          hideFooter
          title={title}
          icon={icon}
          description={description}
          onCancel={onCancel}
          headerClassName={styles.header}
          bodyClassName={classnames(
            styles.body,
            styles.fullScreen,
            bodyClassName
          )}
        >
          <WrappedComponent {...otherProps} />
        </Modal>
      )
    }
  }

  ObserverModal.displayName = `WithSubscription(${getComponentDisplayName(
    WrappedComponent
  )})`

  return ObserverModal
}
