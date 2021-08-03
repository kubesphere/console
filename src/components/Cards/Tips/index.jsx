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
import { get } from 'lodash'
import classnames from 'classnames'
import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class Tips extends React.Component {
  state = {
    visible: localStorage.getItem(this.localStorageKey) !== 'false',
  }

  get localStorageKey() {
    return `${get(globals, 'user.username')}-${this.props.localStorageKey}`
  }

  toggleHelpDoc = visible => {
    localStorage.setItem(this.localStorageKey, String(visible))
    this.setState(
      {
        visible,
      },
      () => {
        this.props.onToggle && this.props.onToggle(visible)
      }
    )
  }

  showHelpDoc = () => {
    this.toggleHelpDoc(true)
  }

  hideHelpDoc = () => {
    this.toggleHelpDoc(false)
  }

  render() {
    const { wrapperClassName, article, tips } = this.props
    const { visible } = this.state
    return (
      <div className={classnames(styles.wrapper, wrapperClassName)}>
        {article}
        {visible ? (
          <div className={styles.helpDoc}>
            <div className={styles.doc}>{tips}</div>
            <div className={styles.hiddenBtn} onClick={this.hideHelpDoc}>
              {t('HIDE_HELP_INFORMATION')}
            </div>
          </div>
        ) : (
          <div className={styles.openHelpButton} onClick={this.showHelpDoc}>
            <Icon name="question" size={24} />
          </div>
        )}
      </div>
    )
  }
}
