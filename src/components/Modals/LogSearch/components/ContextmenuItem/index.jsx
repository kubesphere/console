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
import { Icon, Dropdown } from '@pitrix/lego-ui'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Notify from 'components/Base/Notify'

import styles from './index.scss'

export default class ContextmenuItem extends React.Component {
  static propsTypes = {
    label: PropTypes.string,
    field: PropTypes.string,
    format: PropTypes.func,
  }

  static defaultProps = {
    format(value) {
      return value
    },
  }

  handleReplaceClick = () => {
    const { value, field, onReplaceClick } = this.props
    onReplaceClick(field, value)
  }

  handleAddClick = () => {
    const { value, field, onAddClick } = this.props
    onAddClick(field, value)
  }

  handleNewTagClick = () => {
    const { value, field, onNewTagClick } = this.props
    onNewTagClick(field, value)
  }

  handleCopy() {
    Notify.success({
      content: t('Copy Successfully'),
    })
  }

  render() {
    const { label, field, value, format, supportedContext } = this.props
    return (
      <div className={styles.wrapper}>
        <h3>{label || field}</h3>
        <div>
          <span>{format(value)}</span>
          {supportedContext && (
            <Dropdown content={this.renderDropMenu()} placement="bottom">
              <Icon className={styles.icon} name="more" />
            </Dropdown>
          )}
        </div>
      </div>
    )
  }

  renderDropMenu() {
    const { value } = this.props

    return (
      <div className={styles.dropdown}>
        <div onClick={this.handleReplaceClick}>
          <Icon type="light" name="magnifier" />
          <span>{t('REPLACE_CURRENT_CONDITION')}</span>
        </div>
        <div onClick={this.handleAddClick}>
          <Icon type="light" name="pin" />
          <span>{t('ADD_CURRENT_CONDITION')}</span>
        </div>

        <CopyToClipboard text={value} onCopy={this.handleCopy}>
          <div>
            <Icon type="light" name="copy" />
            <span>{t('Copy')}</span>
          </div>
        </CopyToClipboard>

        <div onClick={this.handleNewTagClick}>
          <Icon type="light" name="table-chart" />
          <span>{t('OPEN_IN_NEW_TAB')}</span>
        </div>
      </div>
    )
  }
}
