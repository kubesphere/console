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

import { get, isEmpty } from 'lodash'
import React, { Component } from 'react'
import { Modal, Text, Button } from 'components/Base'
import { safeParseJSON } from 'utils'

import Card from './Card'

import styles from './index.scss'

export default class History extends Component {
  get histories() {
    const caches = safeParseJSON(localStorage.getItem('history-cache'), {})
    return caches[globals.user.username] || []
  }

  renderHistory() {
    const { onCancel } = this.props
    const histories = this.histories
    return (
      <div className={styles.section}>
        <div className={styles.sectionTitle}>{t('Recent Visit')}</div>
        <div className={styles.sectionContent}>
          {isEmpty(histories) ? (
            <div className={styles.empty}>
              <Text
                title={t('NO_HISTORY_TITLE')}
                description={t('NO_HISTORY_DESC')}
              />
            </div>
          ) : (
            <div className={styles.histories}>
              {histories.map(item => (
                <Card key={item.url} data={item} onClick={onCancel} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  renderHelp() {
    return (
      <div className={styles.section}>
        <div className={styles.sectionTitle}>{t('Quick Support')}</div>
        <div className={styles.sectionContent}>
          <div className={styles.links}>
            <a href={get(globals.config, 'documents.url', '')} target="_blank">
              <Text
                icon="documentation"
                title={t('User Guides')}
                description={t('USER_GUIDES_DESC')}
              />
            </a>
            <a href={get(globals.config, 'slackUrl', '')} target="_blank">
              <Text
                icon="loudspeaker"
                title={t('Developer Community')}
                description={t('DEVELOPER_DESC')}
              />
            </a>
            <a href={get(globals.config, 'documents.api', '')} target="_blank">
              <Text
                icon="api"
                title={t('API Documents')}
                description={t('API_DOCS_DESC')}
              />
            </a>
            <a href={get(globals.config, 'issueUrl', '')} target="_blank">
              <Text
                icon="github"
                title={t('Github Issues')}
                description={t('GITHUB_ISSUES_DESC')}
              />
            </a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { visible, onCancel } = this.props
    return (
      <Modal
        className={styles.modal}
        bodyClassName={styles.body}
        portalClassName={styles.portal}
        visible={visible}
        onCancel={onCancel}
        width="100%"
        hideHeader
        hideFooter
      >
        <Button
          className={styles.close}
          icon="close"
          iconType="light"
          type="control"
          onClick={onCancel}
        />
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <div>{t('History')}</div>
            <p>{t('HISTORY_DESC')}</p>
          </div>
          {this.renderHistory()}
          {this.renderHelp()}
        </div>
      </Modal>
    )
  }
}
