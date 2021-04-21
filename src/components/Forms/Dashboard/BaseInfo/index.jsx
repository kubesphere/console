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
import { observer } from 'mobx-react'
import { get, set } from 'lodash'
import { Column, Columns, Form, Input, TextArea } from '@kube-design/components'
import CardSelect from 'components/Inputs/CardSelect'
import { PATTERN_NAME, MODULE_KIND_MAP } from 'utils/constants'
import templateSettings from 'stores/monitoring/custom/template.json'

import styles from './index.scss'

@observer
export default class BaseInfo extends React.Component {
  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  templateSettingsOpts = Object.entries(templateSettings).map(
    ([key, configs]) => ({
      value: key,
      image: configs.logo,
      label: configs.name,
      description: configs.description,
    })
  )

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store
      .checkName({
        name: value,
        namespace: this.props.namespace,
        cluster: this.props.cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Name exists'), field: rule.field })
        }
        callback()
      })
  }

  handleTemplateChange = key => {
    set(this.formTemplate, 'spec', get(templateSettings, `${key}.settings`, {}))
  }

  render() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              desc={t('NAME_DESC')}
              rules={[
                { required: true, message: t('Please input name') },
                {
                  pattern: PATTERN_NAME,
                  message: t('Invalid name', { message: t('NAME_DESC') }),
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input name="metadata.name" autoFocus={true} maxLength={63} />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
              <TextArea
                name="metadata.annotations['kubesphere.io/description']"
                maxLength={256}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item
          label={
            <div className={styles.templateLabel}>
              <h3>{t('SELECT_SUITABLE_MONITORING_TEMPLATE')}</h3>
              <p>{t('CUSTON_MONITORING_TEMPLATE_DESC')}</p>
            </div>
          }
        >
          <CardSelect
            name="spec.title"
            className={styles.templateList}
            options={this.templateSettingsOpts}
            onChange={this.handleTemplateChange}
          />
        </Form.Item>
      </Form>
    )
  }
}
