import React from 'react'
import { Tabs, Icon } from '@kube-design/components'

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

  render() {
    return (
      <Tabs direction="vertical" className={styles.tabs}>
        <TabPanel label={<Icon name="resource" size={16} />} name="resource">
          <div className={styles.content}>
            {this.renderHeader('METADATA')}
            {this.renderEventMetadata()}
          </div>
        </TabPanel>
      </Tabs>
    )
  }
}
