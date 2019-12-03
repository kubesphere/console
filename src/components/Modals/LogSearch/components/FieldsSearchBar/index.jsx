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
import classnames from 'classnames'
import Mask from '../Mask'

import AdvanceFieldsForm from './AdvanceForm'
import FieldsHintInput from './FieldsHintInput'

import styles from './index.scss'

const TIP_TYPE = {
  ADVANCED_ENTRANCE: Symbol('advance_entry'),
  NONE: Symbol('none'),
  FIELD_OPTIONS: Symbol('field_options'),
  ADVANCED_FORM: Symbol('field_form'),
}

/**
 * Only control filed input method
 */
export default class FieldsSearchBar extends React.Component {
  static propTypes = {
    fields: PropTypes.array,
    onChange: PropTypes.func,
    supportFields: PropTypes.array,
  }

  static defaultProps = {
    fields: [],
    supportFields: [],
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      tipType: TIP_TYPE.NONE,
    }
  }

  handleFocus = text => {
    const tipType = text ? TIP_TYPE.FIELD_OPTIONS : TIP_TYPE.ADVANCED_ENTRANCE
    this.setState({ tipType })
  }

  handleAdvanceEntranceClick = () => {
    this.setState({ tipType: TIP_TYPE.ADVANCED_FORM })
  }

  handleAdvancedConfirm = fields => {
    this.setState({ tipType: TIP_TYPE.NONE })
    this.props.onChange([...this.props.fields, ...fields])
  }

  handleMaskClick = () => {
    this.setState({ tipType: TIP_TYPE.NONE })
  }

  handleTextEmpty = () => {
    this.setState({ tipType: TIP_TYPE.ADVANCED_ENTRANCE })
  }

  handleTextInput = () => {
    this.setState({ tipType: TIP_TYPE.FIELD_OPTIONS })
  }

  handleFieldsChange = fields => {
    this.props.onChange(fields)
  }

  render() {
    const { tipType } = this.state

    return (
      <Mask
        onClick={this.handleMaskClick}
        placeholderHeight={48}
        shouldMaskShow={TIP_TYPE.NONE !== tipType}
      >
        <div
          className={classnames(styles.wrapper, {
            [styles.active]: TIP_TYPE.NONE !== tipType,
          })}
        >
          <FieldsHintInput
            inputClassName={classnames(styles.searchBar, {
              [styles.active]: TIP_TYPE.NONE !== tipType,
            })}
            optionsClassName={styles.optionsClassName}
            fields={this.props.fields}
            supportFields={this.props.supportFields}
            hideTips={tipType !== TIP_TYPE.FIELD_OPTIONS}
            onFocus={this.handleFocus}
            onTextEmpty={this.handleTextEmpty}
            onTextInput={this.handleTextInput}
            onFieldsChange={this.handleFieldsChange}
          />
          {this.renderTips()}
        </div>
      </Mask>
    )
  }

  renderTips() {
    const { tipType } = this.state

    const tipsMap = {
      [TIP_TYPE.ADVANCED_ENTRANCE]: this.renderAdvanceEntrance,
      [TIP_TYPE.ADVANCED_FORM]: this.renderAdvanceForm,
    }

    const tipRender = tipsMap[tipType]
    return tipRender ? tipRender() : null
  }

  renderAdvanceEntrance = () => (
    <>
      <div className={styles.panel}>
        <h3>{t('LOG_QUERY_HINT')}</h3>
        <div>
          <p className={styles.tips}>{t('LOG_SEARCH_USAGE_DESC')}</p>
        </div>
      </div>
      <div className={styles.panel}>
        <h3>{t('ADVANCE_SEARCH_CUSTOMIZE')}</h3>
        <div>
          <div
            className={styles.advanceBtn}
            onClick={this.handleAdvanceEntranceClick}
          >
            <h3>{t('ADD_LOG_SEARCH_FIELD_BUTTON_LABEL')}</h3>
            <p>{t('LOG_ADVANCED_SEARCH_FORM_DESC')}</p>
          </div>
        </div>
      </div>
    </>
  )

  renderAdvanceForm = () => {
    const { supportFields } = this.props

    return (
      <div>
        <div className={styles.panel}>
          <h3>{t('ADVANCED_SEARCH')}</h3>
          <div>
            <AdvanceFieldsForm
              supportFields={supportFields}
              onConfirm={this.handleAdvancedConfirm}
            />
          </div>
        </div>
      </div>
    )
  }
}
