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
import { get } from 'lodash'
import { Columns, Column, Input } from '@pitrix/lego-ui'
import { PATTERN_NAME, MODULE_KIND_MAP } from 'utils/constants'
import { Form, TextArea } from 'components/Base'
import CardSelect from 'components/Inputs/CardSelect'
import tempalteSettings from 'stores/monitoring/custom/template.json'
import ItemContianer from 'components/Modals/CustomMonitoring/components/Form/ItemContianer'

import styles from './index.scss'

@observer
export default class BaseInfo extends React.Component {
  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  tempalteSettingsOpts = Object.entries(tempalteSettings).map(
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
                  message: `${t('Invalid name')}, ${t('NAME_DESC')}`,
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input name="metadata.name" autoFocus={true} maxLength={63} />
            </Form.Item>
          </Column>

          <Column>
            <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
              <TextArea name="spec.description" maxLength={256} />
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
          <ItemContianer name={'spec'}>
            {({ value, onChange }) => (
              <CardSelect
                value={value.title}
                className={styles.templateList}
                onChange={key =>
                  onChange((tempalteSettings[key] || {}).settings)
                }
                options={this.tempalteSettingsOpts}
              />
            )}
          </ItemContianer>
        </Form.Item>
      </Form>
    )
  }
}
