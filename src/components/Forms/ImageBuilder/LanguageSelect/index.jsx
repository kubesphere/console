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
import { set, get, unset } from 'lodash'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Form, Icon } from '@kube-design/components'
import S2iBuilderStore from 'stores/s2i/builder'
import { getLanguageIcon } from 'utils/devops'

import S2IForm from '../S2IForm'
import B2IForm from '../B2IForm'
import styles from './index.scss'

export default class LanguageSelect extends React.Component {
  constructor(props) {
    super(props)
    this.store = new S2iBuilderStore()
    this.state = {
      s2i: [],
      b2i: [],
    }
  }

  static contextTypes = {
    setSteps: PropTypes.func,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const { cluster } = this.props
    const supportS2iLanguage = await this.store.getS2iSupportLanguage({
      cluster,
    })
    this.setState(supportS2iLanguage)
  }

  handleLanguageSelect = (languageType, builderType) => () => {
    const { steps } = this.props

    if (builderType === 'b2i') {
      set(steps, '[1].component', B2IForm)
      set(
        this.props.formTemplate,
        'metadata.labels["s2i-type.kubesphere.io"]',
        'b2i'
      )
      set(this.props.formTemplate, 'spec.config.isBinaryURL', true)
    }

    if (builderType === 's2i') {
      set(steps, '[1].component', S2IForm)
      set(
        this.props.formTemplate,
        'metadata.labels["s2i-type.kubesphere.io"]',
        's2i'
      )
      unset(this.props.formTemplate, 'spec.config.isBinaryURL')
    }
    this.context.setSteps(steps)

    set(
      this.props.formTemplate,
      'metadata.annotations.languageType',
      languageType
    )

    unset(this.props.formTemplate, 'spec.config.builderImage')

    this.forceUpdate()
  }

  render() {
    const { formTemplate, formRef } = this.props
    const languageType = get(
      this.props.formTemplate,
      'metadata.annotations.languageType'
    )
    const buildType = get(
      this.props.formTemplate,
      'metadata.labels["s2i-type.kubesphere.io"]',
      's2i'
    )
    return (
      <Form ref={formRef} data={formTemplate}>
        <div className={styles.header}>
          <p>{t('IMAGE_FROM_S2I')}</p>
          <p>{t('S2I_DESC')}</p>
        </div>
        <ul className={styles.content}>
          {this.state.s2i.map(type => (
            <li
              key={type}
              className={classnames(styles.item, {
                [styles.item_select]:
                  languageType === type && buildType === 's2i',
              })}
              onClick={this.handleLanguageSelect(type, 's2i')}
            >
              <Icon name={getLanguageIcon(type, 'radio')} size={48} />
              <p>{type}</p>
            </li>
          ))}
        </ul>
        <div className={styles.header}>
          <p>{t('IMAGE_FROM_B2I')}</p>
          <p>{t('B2I_DESC')}</p>
        </div>
        <ul className={styles.content}>
          {this.state.b2i.map(type => (
            <li
              key={type}
              className={classnames(styles.item, {
                [styles.item_select]:
                  languageType === type && buildType === 'b2i',
              })}
              onClick={this.handleLanguageSelect(type, 'b2i')}
            >
              <Icon name={getLanguageIcon(type, 'radio')} size={48} />
              <p>{type}</p>
            </li>
          ))}
        </ul>
      </Form>
    )
  }
}
