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
import { Icon } from '@kube-design/components'

import EditMode from 'components/EditMode'

import styles from './index.scss'

const formatData = formTemplate => {
  const { application, ingress, ...components } = formTemplate
  const formattedData = [application, ingress]

  Object.keys(components).forEach(key => {
    if (components[key].workload) {
      formattedData.push(components[key].workload)
    }
    if (components[key].service) {
      formattedData.push(components[key].service)
    }
  })

  return formattedData
}

export default class CodeMode extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    onOk: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    onOk() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.data = formatData(props.formTemplate)

    this.editor = React.createRef()
  }

  getData() {
    return this.editor.current.getData()
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.step}>
          <div>{t('EDIT_YAML')}</div>
          <p>{t('CREATE_BY_YAML_DESC')}</p>
        </div>
        <div className={styles.codeWrapper}>
          <div className={styles.pane}>
            <div className={styles.title}>
              <Icon name="coding" size={20} />
              <span>{t('YAML_FILE')}</span>
            </div>
            <EditMode
              ref={this.editor}
              className={styles.editor}
              value={this.data}
            />
          </div>
        </div>
      </div>
    )
  }
}
