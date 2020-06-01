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
import classNames from 'classnames'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import { isEmpty } from 'lodash'

import Draggable from 'react-draggable'
import { Icon } from '@pitrix/lego-ui'
import { Button, Text, List } from 'components/Base'
import { trigger } from 'utils/action'
import { createCenterWindowOpt } from 'utils/dom'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class KubeTools extends React.Component {
  @observable
  showTools = 0

  getWindowOpts() {
    return createCenterWindowOpt({
      width: 1200,
      height: 800,
      scrollbars: 1,
      resizable: 1,
    })
  }

  get toolList() {
    return [
      {
        group: 'Analysis Tools',
        data: [
          {
            icon: 'file',
            title: t('Log Search'),
            description: t('LOG_SEARCH_DESC'),
            link: '/logquery',
            hidden: !globals.app.hasKSModule('logging'),
            action: 'toolbox.logquery',
          },
          {
            icon: 'thunder',
            title: t('Event Search'),
            description: t('EVENT_SEARCH_DESC'),
            link: '/eventsearch',
            // hidden: !globals.app.hasKSModule('logging'),
            action: 'toolbox.eventsearch',
          },
        ],
      },
      {
        group: 'Control Tools',
        data: [
          {
            icon: 'terminal',
            link: '/kubectl',
            title: 'Kubectl',
            description: t('TOOLBOX_KUBECTL_DESC'),
            hidden: globals.user.cluster_role !== 'cluster-admin',
            action: 'toolbox.kubectl',
          },
        ],
      },
    ]
  }

  get thirdPartyToolList() {
    return (globals.config.thirdPartyTools || []).map(item => ({
      icon: 'cookie',
      ...item,
    }))
  }

  handleToolItemClick = e => {
    e.preventDefault()
    e.stopPropagation()
    const data = e.currentTarget.dataset

    if (e.shiftKey || !data.action) {
      return window.open(data.link, data.title, this.getWindowOpts())
    }

    this.trigger(data.action, {})
  }

  handleThirdPartyToolItemClick = e => {
    e.preventDefault()
    e.stopPropagation()
    const data = e.currentTarget.dataset
    window.open(data.link, '_blank')
  }

  @action
  onMouseEnter = () => {
    this.showTools = 1
  }

  @action
  onMouseLeave = () => {
    this.showTools = -1
  }

  renderTools() {
    return (
      <div
        className={classNames(styles.tools, {
          [styles.showTools]: this.showTools === 1,
        })}
      >
        <div className={styles.toolsWrapper}>
          <div className={styles.toolsHeader}>
            <Text
              className={styles.toolsTitle}
              icon="hammer"
              title={t('Toolbox')}
              description={t('TOOLBOX_DESC')}
            />
          </div>
          <div className={styles.toolsContent}>
            {this.toolList.map(group => (
              <div key={group.group} className={styles.toolsGroup}>
                <div className={styles.groupTitle}>{t(group.group)}</div>
                <div className={styles.groupContent}>
                  {group.data.map(item => (
                    <List.Item
                      className={styles.toolItem}
                      key={item.link}
                      icon={item.icon}
                      title={item.title}
                      data-title={item.title}
                      data-link={item.link}
                      data-action={item.action}
                      description={item.description}
                      onClick={this.handleToolItemClick}
                    />
                  ))}
                </div>
              </div>
            ))}
            {!isEmpty(this.thirdPartyToolList) && (
              <div className={styles.toolsGroup}>
                <div className={styles.groupTitle}>
                  {t('Third-party Tools')}
                </div>
                <div className={styles.groupContent}>
                  {this.thirdPartyToolList.map(item => (
                    <List.Item
                      className={styles.toolItem}
                      key={item.link}
                      icon={item.icon}
                      title={item.title}
                      data-title={item.title}
                      data-link={item.link}
                      data-action={item.action}
                      description={item.description}
                      onClick={this.handleThirdPartyToolItemClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.toolsFooter}>
            <p>{t('TOOLBOX_SHIFT_TIPS')}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Draggable axis="y">
        <div className={styles.trigger} onMouseLeave={this.onMouseLeave}>
          <Button
            className={classNames(styles.button, {
              [styles.showTools]: this.showTools === 1,
            })}
            onMouseEnter={this.onMouseEnter}
            type="control"
          >
            <span>{t('Toolbox')}</span>
            <Icon name="chevron-up" size={24} type="light" />
          </Button>
          {this.renderTools()}
        </div>
      </Draggable>
    )
  }
}
