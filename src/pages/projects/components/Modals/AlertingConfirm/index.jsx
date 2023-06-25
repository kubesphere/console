import React from 'react'
import { Icon } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

const AlertConfirm = props => {
  const { onCancel, title, visible, isSubmitting, desc, icon } = props

  const handleOk = () => {
    props.onOk()
  }

  const renderIcon = () => {
    return icon ? (
      <Icon name={icon} size={20} />
    ) : (
      <Icon name={'information'} size={20} className={styles.icon} />
    )
  }

  return (
    <Modal
      width={600}
      onOk={handleOk}
      okText={t('OK')}
      onCancel={onCancel}
      visible={visible}
      isSubmitting={isSubmitting}
      hideHeader
    >
      <div className={styles.title}>
        {renderIcon()}
        {title}
      </div>
      <p className={styles.desc}>{desc}</p>
    </Modal>
  )
}

export default AlertConfirm
