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
import PropTypes, { oneOfType } from 'prop-types'
import { isEmpty, isFunction } from 'lodash'
import { Icon } from '@kube-design/components'
import classnames from 'classnames'

import { getDocsUrl } from 'utils'
import { ICON_TYPES } from 'utils/constants'

import Tip from './Tip'
import Navs from './Navs'
import Tabs from './Tabs'

import styles from './index.scss'

export default class Banner extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    icon: oneOfType([PropTypes.string, PropTypes.func]),
    module: PropTypes.string,
    tips: PropTypes.array,
    routes: PropTypes.array,
    tabs: PropTypes.object,
    extra: PropTypes.node,
  }

  static defaultProps = {
    tips: [],
    tabs: {},
    routes: [],
  }

  state = {
    openTip: '',
  }

  handleToggle = title => {
    this.setState(({ openTip }) => ({
      openTip: openTip === title ? '' : title,
    }))
  }

  get hiddenTips() {
    return (
      localStorage.getItem(`${globals.user.username}-banner-tips`) || ''
    ).split(',')
  }

  handleClose = key => {
    if (!this.hiddenTips.includes(key)) {
      localStorage.setItem(
        `${globals.user.username}-banner-tips`,
        [...this.hiddenTips, key].join(',')
      )

      this.forceUpdate()
    }
  }

  renderTips(tips) {
    return (
      <div className={styles.tips}>
        {tips
          .filter(tip => !this.hiddenTips.includes(tip.title))
          .map((tip, index) => (
            <Tip
              key={index}
              {...tip}
              onClose={this.handleClose}
              onToggle={this.handleToggle}
              open={tip.title === this.state.openTip}
            />
          ))}
      </div>
    )
  }

  render() {
    const {
      className,
      title,
      description,
      icon,
      module,
      tips,
      tabs,
      extra,
      routes,
    } = this.props
    const docUrl = getDocsUrl(module)

    return (
      <div className={classnames(styles.wrapper, className)}>
        <div className={styles.titleWrapper}>
          <div className={styles.icon}>
            {isFunction(icon) ? (
              icon()
            ) : (
              <Icon name={icon || ICON_TYPES[module] || 'catalog'} size={48} />
            )}
          </div>
          <div className={styles.title}>
            <div className="h3">{title}</div>
            <p className="text-second">
              {description}
              {docUrl && (
                <span className={styles.more}>
                  <Icon name="documentation" size={20} />
                  <a href={docUrl} target="_blank" rel="noreferrer noopener">
                    {t('LEARN_MORE')}
                  </a>
                </span>
              )}
            </p>
          </div>
        </div>
        {!isEmpty(routes) && <Navs routes={routes} />}
        {!isEmpty(tabs) && <Tabs tabs={tabs} />}
        {extra}
        {!isEmpty(tips) && this.renderTips(tips)}
      </div>
    )
  }
}
