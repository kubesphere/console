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
import { Alert, RadioButton, RadioGroup } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { ReactComponent as BackIcon } from 'src/assets/back.svg'
import Base from 'components/Forms/Route/RouteRules/RuleForm'

import styles from './index.scss'

export default class RuleForm extends Base {
  render() {
    const { data } = this.props
    const { type } = this.state

    return (
      <div className={styles.wrapper}>
        <div className="h5">
          <a className="custom-icon" onClick={this.handleGoBack}>
            <BackIcon />
          </a>
          {t('Set Route Rule')}
        </div>
        <div className={styles.formWrapper}>
          <div className={styles.form}>
            <Form ref={this.formRef} data={data}>
              <Form.Item label={t('Mode')}>
                <RadioGroup
                  wrapClassName="radio-default"
                  buttonWidth={155}
                  value={type}
                  onChange={this.handleModeChange}
                  size="small"
                >
                  <RadioButton value="auto">{t('Auto Generate')}</RadioButton>
                  <RadioButton value="specify">
                    {t('Specify Domain')}
                  </RadioButton>
                </RadioGroup>
              </Form.Item>
              <Alert
                className="margin-t12 margin-b12"
                description={t.html(`RULE_SETTING_MODE_${type.toUpperCase()}`)}
                type="info"
              />
              {this.renderForm()}
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
