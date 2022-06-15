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

import React, { useState, useRef } from 'react'
import { Button } from '@kube-design/components'
import classNames from 'classnames'
import styles from './index.scss'

const ArrowModal = ({
  children,
  className,
  text,
  dataTest,
  onOK,
  modalHeight,
}) => {
  const buttonRef = useRef()
  const [showModal, setShowModal] = useState(false)
  const [modalPosition, setPosition] = useState({
    x: '100%',
    y: '100%',
    y1: 0,
    height: 32,
  })

  const hideModal = () => {
    setShowModal(!showModal)
  }

  const handleOK = data => {
    hideModal()
    onOK(data)
  }

  const getSelfPosition = () => {
    return modalPosition
  }

  const { className: componentClassName, ...rest } = children.props
  const childNode = React.cloneElement(children, {
    className: classNames(componentClassName, styles.modal, {
      [styles.showModal]: showModal,
    }),
    getParentPosition: getSelfPosition,
    showModal,
    hideModal,
    onOK: handleOK,
    onCancel: hideModal,
    ...rest,
  })

  const countPosition = () => {
    const { x, y, height } = buttonRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    let y1 = y
    const modalTop = windowHeight - modalHeight
    const modalYMiddle = windowHeight - modalHeight / 2
    const d1 = modalYMiddle - (y + modalPosition.height / 2)
    if (d1 > 0) {
      y1 = modalTop - d1
    } else {
      y1 = modalTop - 12
    }
    const triangleP = y + 7
    setPosition({ x, y: y1, y1: triangleP, height })
  }

  const buttonClick = () => {
    if (!showModal) {
      countPosition()
    }
    setShowModal(!showModal)
  }

  return (
    <div
      className={classNames(styles.buttonModalBox, className)}
      ref={buttonRef}
    >
      {childNode}
      <Button onClick={buttonClick} data-test={dataTest}>
        {text}
      </Button>
      <div
        className={classNames(styles.triangle, {
          [styles.showModal]: showModal,
        })}
        style={{
          top: modalPosition.y1,
          left: modalPosition.x,
        }}
      ></div>
    </div>
  )
}

export default ArrowModal
