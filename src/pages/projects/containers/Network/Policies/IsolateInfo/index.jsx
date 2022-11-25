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
import { Icon } from '@kube-design/components'
import { ICON_TYPES } from 'utils/constants'
import { Switch } from 'components/Base'
import styles from './index.scss'

export default class IsolateInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: props.networkIsolate,
    }
  }

  toggle = () => {
    const { opened } = this.state
    this.props.onEdit(!opened)
    this.setState({
      opened: !opened,
    })
  }

  render() {
    const { opened } = this.state
    const { module, canEdit } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Icon
            name={ICON_TYPES[module]}
            size={40}
            color={{
              primary: '#324558',
              secondary: '#f5a623',
            }}
          />
          <div className={styles.isolate}>
            <div className={styles.isolatetitle}>{t('ENABLED')}</div>
            <div>{t('PROJECT_NETWORK_ISOLATION')}</div>
          </div>
        </div>
        {canEdit && (
          <Switch
            className={styles.switch}
            text={opened ? t('ENABLED') : t('DISABLED')}
            onChange={this.toggle}
            checked={opened}
          />
        )}
      </div>
    )
  }
}
