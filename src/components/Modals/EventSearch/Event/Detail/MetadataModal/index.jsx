import React from 'react'
import classnames from 'classnames'
import { Tabs, Icon } from '@pitrix/lego-ui'

import Metadata from './Metadata'

import styles from './index.scss'

const { TabPanel } = Tabs

export default class MetadataModal extends React.Component {
  renderHeader = title => <div className={styles.title}>{t(title)}</div>

  renderMetadata(data = []) {
    return data.map(item => {
      const key = Object.keys(item)[0]
      return (
        <Metadata key={key} data={item} renderMetadata={this.renderMetadata} />
      )
    })
  }

  renderEventMetadata = () => {
    const { eventMetadata = [] } = this.props
    return this.renderMetadata(eventMetadata)
  }

  renderDetail = () => {
    const { detail = {} } = this.props
    const {
      source = {},
      involvedObject = {},
      type,
      count,
      firstTimestamp,
      lastTimestamp,
    } = detail
    return (
      <div className={styles.center}>
        <div className={styles.row}>
          <div className={styles.rowTitle}>{t('Project')}</div>
          <div className={styles.rowDesc}>
            {t(involvedObject.namespace) || '-'}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowTitle}>{t('resources')}</div>
          <div className={styles.rowDesc}>
            <span>{`[${involvedObject.kind}]`}</span>
            <span className={styles.namespace}>{involvedObject.name}</span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowTitle}>{t('category')}</div>
          <div
            className={classnames(
              styles.category,
              styles[type && type.toLocaleLowerCase()]
            )}
            style={{ marginLeft: 10 }}
          >
            {type}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowTitle}>{t('Count')}</div>
          <div className={styles.rowDesc}>{count || 0}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowTitle}>{t('Source')}</div>
          <div className={styles.rowDesc}>{t(source.component) || '-'}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowTitle}>{t('Earliest start time')}</div>
          <div className={styles.rowDesc}>{firstTimestamp}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.rowTitle}>{t('Most recent start time')}</div>
          <div className={styles.rowDesc}>{lastTimestamp}</div>
        </div>
      </div>
    )
  }

  renderFooter = () => {
    const { detail: { reason, message } = {} } = this.props
    return (
      <div className={styles.bottom}>
        <div className={styles.reason}>
          {t('reason')}: {reason}
        </div>
        <div className={styles.message}>
          {t('message')}: {message}
        </div>
      </div>
    )
  }

  render() {
    return (
      <Tabs direction="vertical" className={styles.tabs}>
        <TabPanel label={<Icon name="resource" size={16} />} name="resource">
          <div className={styles.content}>
            {this.renderHeader('Event metadata')}
            {this.renderEventMetadata()}
          </div>
        </TabPanel>
        <TabPanel label={<Icon name="cloud" size={16} />} name="cloud">
          <div className={styles.content}>
            {this.renderHeader('Operation details')}
            {this.renderDetail()}
            {this.renderFooter()}
          </div>
        </TabPanel>
      </Tabs>
    )
  }
}
