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

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Icon } from '@kube-design/components'

import Status from './ClassIcon'
import styles from './index.scss'

class Issue extends React.PureComponent {
  static propTypes = {
    issues: PropTypes.array,
    index: PropTypes.number,
  }

  static defaultProps = {
    issues: [],
  }

  renderErrorCode = issue => {
    const { origin } = this.props
    const severityClass = (issue.severity || '').toLocaleLowerCase()

    return (
      <a
        key={issue.line}
        href={`${origin}/project/issues?id=${issue.project}&open=${issue.key}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <div
          className={classNames(
            styles.errorCard,
            styles[`card-${severityClass}`]
          )}
          onClick={this.handleGoToDetail}
        >
          <p className={styles.message}>{issue.message}</p>
          <div className={styles.status}>
            <Status errorClass={severityClass} />
            <span className={styles.type}>
              <Icon name="debug" size={20} />
              {t(issue.type.toUpperCase())}
            </span>
            <span>{t('LINE_VALUE', { value: issue.line })}</span>
          </div>
        </div>
      </a>
    )
  }

  render() {
    const { issue, hasTitle } = this.props

    if (hasTitle) {
      return (
        <React.Fragment>
          <p key={issue.component} className={styles.fileTitle}>
            {issue.component}
          </p>
          {this.renderErrorCode(issue)}
        </React.Fragment>
      )
    }

    return this.renderErrorCode(issue)
  }
}

export default Issue
