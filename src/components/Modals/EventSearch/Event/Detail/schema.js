import React, { Fragment } from 'react'
import classnames from 'classnames'

import styles from './index.scss'

export const getColumns = () => [
  {
    title: t('time'),
    dataIndex: 'metadata.creationTimestamp',
    sorter: true,
    width: 168,
  },
  {
    title: t('category'),
    dataIndex: 'type',
    width: 100,
    render: category => (
      <div
        className={classnames(
          styles.category,
          styles[category.toLocaleLowerCase()]
        )}
      >
        {category}
      </div>
    ),
  },
  {
    title: t('Project'),
    dataIndex: 'metadata.namespace',
    width: 120,
  },
  {
    title: t('resources'),
    dataIndex: 'involvedObject.kind',
    width: 220,
    render: (kind, record) => (
      <Fragment>
        <div className={classnames(styles.normalText, styles.kind)}>{kind}</div>
        <div className={styles.name}>{record.involvedObject.name}</div>
      </Fragment>
    ),
  },
  {
    title: t('reason'),
    dataIndex: 'reason',
    width: 150,
  },
  {
    title: t('message'),
    dataIndex: 'message',
  },
]
