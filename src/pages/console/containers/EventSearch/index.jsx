import React from 'react'
import { Icon } from '@pitrix/lego-ui'
import { observer, inject } from 'mobx-react'
import EventSearch from 'components/Modals/EventSearch'

@inject('rootStore')
@observer
export default class EventSearchComponent extends React.Component {
  pageClose() {
    window.opener = null
    window.open('', '_self', '')
    window.close()
  }

  render() {
    return (
      <EventSearch
        title={
          <div>
            <Icon size={20} name="thunder" style={{ marginRight: 7 }} />{' '}
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                lineHeight: '20px',
                height: '20px',
              }}
            >
              {t('Event Search')}
            </span>
          </div>
        }
        onCancel={this.pageClose}
      />
    )
  }
}
