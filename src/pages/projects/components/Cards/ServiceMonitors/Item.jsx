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

import { Text } from 'components/Base'

import styles from './index.scss'

export default class Item extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
  }

  static defaultProps = {
    detail: {},
  }

  render() {
    const { detail } = this.props

    if (!detail) {
      return null
    }

    return (
      <div className={styles.item}>
        <Text
          icon="monitor"
          title={detail.name}
          description={t('Monitoring Exporter')}
        />

        <Text title={detail.port} description={t('Port')} />
        <Text title={detail.path} description={t('Path')} />
        <Text title={detail.interval} description={t('Scrap Interval(min)')} />
        <Text title={detail.scrapeTimeout} description={t('Timeout(s)')} />
      </div>
    )
  }
}
