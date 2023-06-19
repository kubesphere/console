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

import { isEmpty, get } from 'lodash'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Button, Icon } from '@kube-design/components'

import { REPO_KEY_MAP } from 'utils/constants'

import styles from './index.scss'

export default class RepoSelect extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.object,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: {},
    onClick() {},
  }

  onChange = value => {
    this.props.onChange(value)
  }

  handleDeleteSource = () => {
    this.props.handleDeleteSource()
  }

  renderEmpty() {
    const { onClick, type } = this.props
    return (
      <div className={styles.empty} onClick={onClick}>
        <p>
          {type === 'cd'
            ? t('CD_SELECT_CODE_REPO_DESC')
            : t('SELECT_CODE_REPO_DESC')}
        </p>
      </div>
    )
  }

  getIconName = source_type => {
    let iconName = ''
    switch (source_type) {
      case 'single_svn':
        iconName = 'svn'
        break
      case 'bitbucket_server':
        iconName = 'bitbucket'
        break
      default:
        iconName = source_type
    }
    return iconName
  }

  render() {
    const { value } = this.props
    if (isEmpty(value)) {
      return this.renderEmpty()
    }
    const data = get(value, `${REPO_KEY_MAP[value.source_type]}`, {})
    const iconName = this.getIconName(value.source_type)

    return (
      <div className={styles.wrapper}>
        <div className={classNames(styles.branch, styles.branch__show)}>
          <div className={styles.icon}>
            <Icon name={iconName} size={48} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              {data.repo || data.url || data.remote}
            </div>
            <div className={styles.desc}>{data.description || ''}</div>
          </div>
          <div className={styles.action}>
            <Button onClick={this.props.onClick}>{t('RESELECT')}</Button>
            {this.props.handleDeleteSource ? (
              <span
                onClick={this.handleDeleteSource}
                className={styles.deleteRepoBtn}
              >
                <Icon name="trash" />
              </span>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}
