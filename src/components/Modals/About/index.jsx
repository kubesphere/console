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

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'components/Base'

import styles from './index.scss'

export default class AboutModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onCancel() {},
  }

  render() {
    const { issueUrl, reposUrl, slackUrl } = globals.config
    const { ksVersion } = globals.ksConfig
    return (
      <Modal
        bodyClassName={styles.body}
        width={600}
        hideHeader
        hideFooter
        maskClosable
        {...this.props}
      >
        <div className={styles.describtion}>
          <div>
            <img src="/assets/logo.svg" alt="" />
          </div>
          <p>{t('KS_DESCRIPTION')}</p>
          <strong>
            KubeSphere {t('VERSION')} : {ksVersion}
          </strong>
        </div>

        <div className={styles.links}>
          <div className={styles.left}>
            <span>
              <a href={reposUrl} target="_blank" rel="noreferrer noopener">
                <img src="/assets/github.svg" alt="github" />
                <strong>{t('REPS_ADDRESS')}</strong>
              </a>
            </span>
            <span>
              <a href={issueUrl} target="_blank" rel="noreferrer noopener">
                <img src="/assets/bug.svg" alt="bug" />
                <strong>{t('ISSUE_FEEDBACK')}</strong>
              </a>
            </span>
          </div>
          <div className={styles.right}>
            <span>
              <a href={slackUrl} target="_blank" rel="noreferrer noopener">
                <img src="/assets/slack.svg" alt="slack" />
                <strong>{t('PART_IN_DISCUSSION')}</strong>
              </a>
            </span>
            <span>
              <a href={reposUrl} target="_blank" rel="noreferrer noopener">
                <img src="/assets/blue-theme-git.svg" alt="git" />
                <strong>{t('CODE_CONTRIBUTE')}</strong>
              </a>
            </span>
            <span>
              <a href={reposUrl} target="_blank" rel="noreferrer noopener">
                <img src="/assets/star.svg" alt="star" />
                <strong>{t('GITHUB_STAR')}</strong>
              </a>
            </span>
          </div>
        </div>
      </Modal>
    )
  }
}
