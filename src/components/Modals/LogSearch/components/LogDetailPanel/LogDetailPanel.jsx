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
import { Icon, Tooltip } from '@pitrix/lego-ui'
import classnames from 'classnames'

import LogContext from './LogDetailContext'
import Information from './Information'

import styles from './index.scss'

class LogDetailMenu extends Component {
  static propTypes = {
    log: PropTypes.object,
    onLogDetailHideButtonClick: PropTypes.func,
    selectMenu: PropTypes.oneOf(['context', 'information']),
  }

  menuConfig = {
    context: {
      iconName: 'paper',
      desc: t('LOG_CONTEXT'),
      onClick: this.selectBind('context'),
    },
    information: {
      iconName: 'cloud',
      desc: t('RELATED_INFORMATION'),
      onClick: this.selectBind('information'),
    },
  }

  selectBind(menu) {
    return () => this.props.onMenuSelect(menu)
  }

  render() {
    const { onLogDetailHideButtonClick, selectMenu } = this.props

    return (
      <div className={styles.logDetail}>
        <div className={styles.sideBar}>
          <div className={styles.menu}>
            {Object.entries(this.menuConfig).map(([key, config]) => (
              <Tooltip key={key} content={config.desc} placement="left">
                <Icon
                  className={classnames({
                    [styles.active]: selectMenu === key,
                  })}
                  name={config.iconName}
                  data-menu={key}
                  onClick={config.onClick}
                />
              </Tooltip>
            ))}
          </div>
          <div className={styles.subMenu}>
            <Icon name="next" onClick={onLogDetailHideButtonClick} />
          </div>
        </div>
        <div className={styles.logDetailContent}>{this.renderContent()}</div>
      </div>
    )
  }

  renderContent() {
    const CONTENT_MAP = {
      context: 'renderContext',
      information: 'renderInformation',
    }

    const { selectMenu } = this.props
    const render = this[CONTENT_MAP[selectMenu]]
    return render && this[CONTENT_MAP[selectMenu]]()
  }

  renderContext() {
    const { log, context } = this.props

    return <LogContext log={log} context={context} />
  }

  renderInformation() {
    const { log, onReplaceClick, onAddClick, onNewTagClick } = this.props

    return (
      <Information
        information={log}
        onReplaceClick={onReplaceClick}
        onAddClick={onAddClick}
        onNewTagClick={onNewTagClick}
      />
    )
  }
}

export default LogDetailMenu
