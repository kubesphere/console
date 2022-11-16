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
import { cloneDeep, set } from 'lodash'
import { Icon, RadioGroup, Radio, Form } from '@kube-design/components'
import { NEW_CLUSTER, IMPORT_CLUSTER } from 'configs/steps/clusters'
import Title from '../Title'
import { IMPORT_CLUSTER_SPEC, NEW_CLUSTER_SPEC } from '../constants'

import styles from './index.scss'

export default class Providers extends React.Component {
  static contextTypes = {
    setSteps: PropTypes.func,
    setFormData: PropTypes.func,
  }

  STEPS = {
    new: NEW_CLUSTER,
    import: IMPORT_CLUSTER,
  }

  SPECS = {
    new: NEW_CLUSTER_SPEC,
    import: IMPORT_CLUSTER_SPEC,
  }

  componentDidMount() {
    this.props.store.kubekey.fetchParameters()
  }

  handleChange = value => {
    this.context.setSteps(this.STEPS[value])
    const newFormData = cloneDeep(this.SPECS[value])
    set(newFormData, "metadata.annotations['kubesphere.io/way-to-add']", value)
    this.context.setFormData(newFormData)
  }

  render() {
    const { formRef, formTemplate } = this.props

    return (
      <div className={styles.wrapper}>
        <Title
          title={t('SELECT_ADD_CLUSTER_METHOD')}
          description={t('SELECT_ADD_CLUSTER_METHOD_DESC')}
        />
        <Form data={formTemplate} ref={formRef}>
          <Form.Item className={styles.cards}>
            <RadioGroup
              name="metadata.annotations['kubesphere.io/way-to-add']"
              onChange={this.handleChange}
              defaultValue="new"
            >
              <Radio value="new">
                <Icon name="kubernetes" size={48} />
                <span>{t('NEW_CLUSTER')}</span>
              </Radio>
              <Radio value="import">
                <Icon name="hammer" size={48} />
                <span>{t('IMPORT_CLUSTER')}</span>
              </Radio>
            </RadioGroup>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
