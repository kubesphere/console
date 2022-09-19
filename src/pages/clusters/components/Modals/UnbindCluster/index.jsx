import React, { useState } from 'react'
import { toJS } from 'mobx'
import { Input, Button } from '@kube-design/components'
import { Modal } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import { getLocalTime } from 'utils'

import styles from './index.scss'
import SliderConfirm from './SliderConfirm'

const UnbindClusterModal = props => {
  const { visible, isSubmitting, onCancel, onOk, title } = props
  const detail = toJS(props.detail)

  const [showConfirm, setShowConfirm] = useState(false)
  const [inputName, setInputName] = useState('')

  const handleSuccess = () => {
    setShowConfirm(true)
  }

  const handleInputChange = e => {
    setInputName(e.target.value)
  }

  const handleOk = () => {
    onOk()
  }

  return (
    <Modal
      width={600}
      showIcon={true}
      imageIcon={'/assets/unbindCluster.svg'}
      headerClassName={styles.header}
      bodyClassName={styles.body}
      title={title}
      visible={visible}
      isSubmitting={isSubmitting}
      onCancel={onCancel}
      hideFooter
    >
      <div style={{ padding: '0px 20px' }}>
        <div className={styles.tipBox}>
          <p className={styles.title}>{t('RISK_WARNING')}</p>
          <ul>
            <li className={styles.des}>{t('REMOVE_CLUSTER_TIP_A')}</li>
            <li className={styles.des}>{t.html('REMOVE_CLUSTER_TIP_B')}</li>
          </ul>
        </div>
        <div className={styles.cluster}>
          <div className={styles.header}>
            <ClusterTitle cluster={detail} />
          </div>
          <div className={styles.info}>
            <div className={styles.item}>
              <span className={styles.label}>{t('NODE_COUNT')}:</span>
              <span className={styles.value}>{detail.nodeCount}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>{t('KUBERNETES_VERSION')}:</span>
              <span className={styles.value}>{detail.kubernetesVersion}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>{t('PROVIDER')}:</span>
              <span className={styles.value}>{detail.provider}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>{t('CREATION_TIME')}:</span>
              <span className={styles.value}>
                {getLocalTime(detail.createTime).format(`YYYY-MM-DD HH:mm:ss`)}
              </span>
            </div>
          </div>
        </div>
        {!showConfirm && (
          <div style={{ marginBottom: 20 }}>
            <SliderConfirm
              width={560}
              height={40}
              borderRadius={40}
              tipText={t('CLUSTER_CONFIRM_TEXT')}
              handleSuccess={handleSuccess}
            />
          </div>
        )}
        {showConfirm && (
          <div className={styles.confirmInput}>
            <p>{t.html('ENTER_CLUSTER_NAME', { name: detail.name })}</p>
            <Input
              placeholder={detail.name}
              autoFocus={true}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      {showConfirm && (
        <div className={styles.footer}>
          <Button onClick={onCancel}>{t('CANCEL')}</Button>
          <Button
            type="danger"
            loading={isSubmitting}
            disabled={
              isSubmitting || (detail ? inputName !== detail.name : false)
            }
            onClick={handleOk}
          >
            {t('DROP')}
          </Button>
        </div>
      )}
    </Modal>
  )
}

export default UnbindClusterModal
