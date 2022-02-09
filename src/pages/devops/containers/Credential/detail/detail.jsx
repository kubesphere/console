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
import { inject, observer } from 'mobx-react'

import { Icon } from '@kube-design/components'
import { Card } from 'components/Base'

import styles from './index.scss'

@inject('detailStore')
@observer
class Events extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
  }

  getColumns = () => [
    {
      title: t('NAME'),
      dataIndex: 'name',
      width: '50%',
    },
    {
      title: t('RECORD'),
      dataIndex: 'record',
      width: '50%',
    },
  ]

  render() {
    const { detail } = this.props.detailStore

    return (
      <Card title={t('CREDENTIAL')}>
        <div className={styles.card_content}>
          <div className={styles.icon}>
            <Icon name="key" size={40} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{detail.id || '-'}</div>
            <div className={styles.desc}>
              {t('TYPE_VALUE', {
                value: t(
                  detail.type && `CREDENTIAL_TYPE_${detail.type.toUpperCase()}`
                ),
              })}
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default Events
