import React, { useState } from 'react'
import { Dropdown, Icon } from '@kube-design/components'
import classnames from 'classnames'
import styles from './index.scss'

export default function MangeButton({ className = '', content }) {
  const [down, setDown] = useState(true)

  return (
    <div className={classnames(styles.manage, className)}>
      <Dropdown
        theme="dark"
        content={content}
        trigger="click"
        placement="bottomRight"
        onClick={() => setDown(!down)}
      >
        <div className={styles.button}>
          <span>{t('MANAGE')}</span>
          <Icon name={down ? 'caret-down' : 'caret-up'} type={'dark'} />
        </div>
      </Dropdown>
    </div>
  )
}
