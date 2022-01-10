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

import styles from './index.scss'

export default class UpdateLog extends React.PureComponent {
  static propTypes = {
    description: PropTypes.string,
  }

  static defaultProps = {
    description: '',
  }

  render() {
    const { description } = this.props

    return (
      <div className={styles.main}>
        <div className={styles.title}>{t('UPDATE_LOG')}</div>
        <pre className={styles.updateLog}>
          {description || t('NO_UPDATE_LOG_DESC')}
        </pre>
      </div>
    )
  }
}
