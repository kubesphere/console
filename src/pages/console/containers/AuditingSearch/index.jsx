import React from 'react'
import { Icon } from '@kube-design/components'
import { observer, inject } from 'mobx-react'
import AuditingSearch from 'components/Modals/AuditingSearch'

@inject('rootStore')
@observer
export default class AuditingSearchComponent extends React.Component {
  pageClose() {
    window.opener = null
    window.open('', '_self', '')
    window.close()
  }

  render() {
    return (
      <AuditingSearch
        title={
          <div>
            <Icon size={20} name="login-servers" style={{ marginRight: 7 }} />{' '}
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                lineHeight: '20px',
                height: '20px',
              }}
            >
              {t('AUDIT_LOG_SEARCH')}
            </span>
          </div>
        }
        onCancel={this.pageClose}
      />
    )
  }
}
