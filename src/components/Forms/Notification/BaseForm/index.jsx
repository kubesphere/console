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
import { get, set, unset, isEmpty } from 'lodash'

import { Form, Button, Icon, Notify } from '@kube-design/components'
import { Text, Switch, ToggleField } from 'components/Base'
import { ArrayInput } from 'components/Inputs'

import VerifyStore from 'stores/notification/verify'

import FORM_TEMPLATES from 'utils/form.templates'

import ConditionSelect from './ConditionSelect'

import styles from './index.scss'

export default class BaseForm extends Component {
  formRef = this.props.formRef || React.createRef()

  verifyStore = new VerifyStore()

  state = {
    enabled: get(
      this.props.data,
      `receiver.spec.${this.props.name}.enabled`,
      false
    ),
    isVerifying: false,
  }

  checkItemValid = item => item.key && item.operator

  itemValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }
    if (value.some(item => !this.checkItemValid(item))) {
      return callback({ message: t('INVALID_NOTIFICATION_CONDITION') })
    }
    callback()
  }

  handleSwitch = enabled => {
    this.setState({ enabled })
  }

  handleVerify = () => {
    const { user, getVerifyFormTemplate, onVerify } = this.props
    const form = this.formRef.current
    form &&
      form.validate(() => {
        const data = form.getData()
        const template = FORM_TEMPLATES['notificationVerify']({ user })
        const { config, receiver } = getVerifyFormTemplate(data)

        if (onVerify && !onVerify(data)) {
          return
        }

        set(template, 'config.spec', get(config, 'spec', {}))
        set(template, 'receiver.spec', get(receiver, 'spec', {}))

        if (isEmpty(config)) {
          unset(template, 'config')
        }

        this.setState({ isVerifying: true })

        this.verifyStore.checkInfo(template, { user }).then(resp => {
          this.setState({ isVerifying: false })
          if (resp.Status !== 200) {
            Notify.error({ content: resp.Message })
            return
          }
          Notify.success({ content: t('SEND_TEST_MESSAGE_SUCCESS_DESC') })
        })
      })
  }

  handleSubmit = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        this.props.onSubmit(form.getData())
      })
  }

  renderEnableService() {
    const { user, name, module, icon } = this.props
    const { enabled } = this.state

    if (user) {
      return (
        <div className={styles.contentWrapper}>
          <Form.Item
            className={styles.isHorizon}
            text={t(enabled ? t('ENABLED') : t('DISABLED'))}
          >
            <ToggleField
              name={`receiver.spec.${name}.enabled`}
              value={enabled}
            />
          </Form.Item>
        </div>
      )
    }
    return (
      <div className={styles.header}>
        <Text
          className={styles.title}
          icon={icon}
          title={t(`${module.toUpperCase()}_TITLE`)}
          description={t(`${module.toUpperCase()}_DESC`)}
        />
        <div className={styles.action}>
          <Form.Item>
            <Switch
              name={`receiver.spec.${name}.enabled`}
              text={t(enabled ? t('ENABLED') : t('DISABLED'))}
              checked={enabled}
              onChange={this.handleSwitch}
            />
          </Form.Item>
        </div>
      </div>
    )
  }

  renderControlAnnotation() {
    return (
      <div className={styles.annotation}>
        <Icon name="question" />
        <p className={styles.desc}>
          {t.html('NOTIFICATION_CONDITION_SETTING_TIP')}
        </p>
      </div>
    )
  }

  renderControlSetting() {
    const { name } = this.props

    return (
      <Form.Group
        label={t('FILTER_CONDITIONS')}
        desc={t('NOTIFICATION_CONDITION_SETTINGS_DESC')}
        checkable
      >
        <Form.Item
          rules={[{ validator: this.itemValidator, checkOnSubmit: true }]}
        >
          <ArrayInput
            name={`receiver.spec.${name}.alertSelector.matchExpressions`}
            itemType="object"
            addText={t('ADD')}
            checkItemValid={this.checkItemValid}
            desc={this.renderControlAnnotation()}
          >
            <ConditionSelect />
          </ArrayInput>
        </Form.Item>
      </Form.Group>
    )
  }

  renderVerifyAction() {
    const { isVerifying } = this.state

    return (
      <div className={styles.contentWrapper}>
        <p>{t('SEND_TEST_MESSAGE_DESC')}</p>
        <Button
          className={styles.action}
          onClick={this.handleVerify}
          loading={isVerifying}
        >
          {t('SEND_TEST_MESSAGE')}
        </Button>
      </div>
    )
  }

  renderFooterBtns() {
    const { onCancel, isSubmitting } = this.props

    return (
      <div className={styles.footer}>
        <Button onClick={onCancel}>{t('CANCEL')}</Button>
        <Button
          type="control"
          loading={isSubmitting}
          onClick={this.handleSubmit}
        >
          {t('OK')}
        </Button>
      </div>
    )
  }

  render() {
    const { data, onChange, hideFooter, children } = this.props

    return (
      <Form ref={this.formRef} data={data} onChange={onChange}>
        <div className={styles.formBody}>
          {this.renderEnableService()}
          <div className={styles.contentWrapper}>
            {children}
            {this.renderControlSetting()}
          </div>
          {this.renderVerifyAction()}
        </div>
        {!hideFooter && this.renderFooterBtns()}
      </Form>
    )
  }
}
