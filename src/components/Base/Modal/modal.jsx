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

import { get, omit, isUndefined, isFunction } from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactModal from 'react-modal'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Button, Icon } from '@kube-design/components'
import { Image, Text } from 'components/Base'

import styles from './index.scss'

ReactModal.defaultStyles.overlay = {
  ...ReactModal.defaultStyles.overlay,
  padding: 0,
  minWidth: 500,
  backgroundColor: 'rgba(35, 45, 65, 0.7)',
  zIndex: 2000,
  overflow: 'auto',
}

ReactModal.defaultStyles.content = {
  ...omit(ReactModal.defaultStyles.content, [
    'top',
    'left',
    'right',
    'bottom',
    'padding',
  ]),
  width: 744,
  position: 'relative',
  margin: '0 auto',
}

export default class Modal extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    headerClassName: PropTypes.string,
    bodyClassName: PropTypes.string,
    footerClassName: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    description: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    visible: PropTypes.bool,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    okButtonType: PropTypes.string,
    cancelButtonType: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    renderFooter: PropTypes.func,
    children: PropTypes.any,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    closable: PropTypes.bool,
    maskClosable: PropTypes.bool,
    fullScreen: PropTypes.bool,
    rightScreen: PropTypes.bool,
    disableSubmit: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    width: 600,
    visible: false,
    hideHeader: false,
    hideFooter: false,
    closable: true,
    maskClosable: true,
    fullScreen: false,
    rightScreen: false,
    isSubmitting: false,
    okButtonType: 'control',
    cancelButtonType: 'default',
    disableSubmit: false,
  }

  static open = options => {
    const modalWrapper = document.createElement('div')
    document.body.appendChild(modalWrapper)
    document.activeElement.blur()

    const wrapCancel = () => {
      if (isFunction(options.onCancel)) {
        options.onCancel()
      }
      Modal.close(modalWrapper)
    }

    const Component = options.modal
    const WrappedComponent = observer(() => (
      <Component
        {...omit(options, 'modal', 'onCancel')}
        isSubmitting={get(options, 'store.isSubmitting')}
        onCancel={wrapCancel}
        visible
      />
    ))
    ReactDOM.render(<WrappedComponent />, modalWrapper)

    return modalWrapper
  }

  static close = modal => {
    const unmounted = ReactDOM.unmountComponentAtNode(modal)
    if (unmounted && modal.parentNode) {
      modal.parentNode.removeChild(modal)
    }
  }

  renderTitle() {
    const { icon, imageIcon, title, description, rightScreen } = this.props
    const size = rightScreen ? 48 : isUndefined(description) ? 20 : 40

    return (
      <div className={styles.title}>
        {imageIcon ? (
          <label className={styles.image}>
            <Image src={imageIcon} iconLetter={imageIcon} iconSize={size} />
          </label>
        ) : (
          icon && <Icon name={icon} size={size} />
        )}
        <Text title={title} description={description} />
      </div>
    )
  }

  render() {
    const {
      className,
      width,
      visible,
      children,
      hideHeader,
      hideFooter,
      onOk,
      onCancel,
      okText,
      cancelText,
      okButtonType,
      cancelButtonType,
      closable,
      operations,
      headerClassName,
      bodyClassName,
      footerClassName,
      fullScreen,
      rightScreen,
      maskClosable,
      isSubmitting,
      icon,
      imageIcon,
      disableSubmit,
      ...rest
    } = this.props

    const style = {
      content: {},
    }

    const showIcon = (icon || imageIcon) && rightScreen

    if (!fullScreen && !rightScreen) {
      style.content.width = width
    }

    return (
      <ReactModal
        className={classnames(styles.modal, className, {
          [styles.fullscreen]: fullScreen,
          [styles.rightScreen]: rightScreen,
        })}
        style={style}
        isOpen={visible}
        onRequestClose={onCancel}
        ariaHideApp={false}
        closeTimeoutMS={0}
        shouldCloseOnOverlayClick={maskClosable}
        {...rest}
      >
        {!hideHeader && (
          <div className={classnames(styles.header, headerClassName)}>
            {this.renderTitle()}
            {showIcon && (
              <div className={styles.iconBg}>
                {imageIcon ? (
                  <Image
                    src={imageIcon}
                    iconLetter={imageIcon}
                    iconSize={200}
                  />
                ) : (
                  <Icon name={icon} size={200} />
                )}
              </div>
            )}
            {operations}
            {closable && (
              <Button
                className={styles.close}
                icon="close"
                iconType="light"
                type="control"
                onClick={onCancel}
                data-test="modal-close"
              />
            )}
          </div>
        )}
        <div className={classnames(styles.body, bodyClassName)}>{children}</div>
        {!hideFooter && (
          <div className={classnames(styles.footer, footerClassName)}>
            {onCancel && (
              <Button
                type={cancelButtonType}
                onClick={onCancel}
                data-test="modal-cancel"
              >
                {cancelText || t('Cancel')}
              </Button>
            )}
            {onOk && (
              <Button
                type={okButtonType}
                loading={isSubmitting}
                disabled={disableSubmit || isSubmitting}
                onClick={onOk}
                data-test="modal-ok"
              >
                {okText || t('OK')}
              </Button>
            )}
          </div>
        )}
      </ReactModal>
    )
  }
}
