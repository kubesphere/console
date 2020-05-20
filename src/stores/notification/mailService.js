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

import { observable, action, computed } from 'mobx'
import { get, includes, isString } from 'lodash'
import cookie from 'utils/cookie'

import logSVG from 'assets/logo.svg'

import Base from './index'

export default class AddressStore extends Base {
  @observable
  config = {}

  @observable
  isLoading = false

  @observable
  verifying = false

  constructor(params) {
    super(params)

    this.config = params
    this.notificationEmailConfig = {
      validation_icon: logSVG,
      validation_title: '[KubeSphere] 测试邮件',
    }
  }

  @computed
  get mailServicePath() {
    return `${this.apiVersion}/serviceconfigs`
  }

  get mailServiceVersion2Path() {
    return 'kapis/notification.kubesphere.io/v2/serviceconfigs'
  }

  @action
  async fetchConfig() {
    this.isLoading = true

    const params = {
      service_type: ['email'],
    }

    const result = await request.get(this.mailServicePath, params)

    const { password, ...config } = get(result, 'email_service_config', {})

    this.config = config

    this.isLoading = false
  }

  @action
  async setConfig(config) {
    const data = this.paramsTrim({
      ...config,
      ...this.notificationEmailConfig,
    })

    const { test_email_recipient, ...email_service_config } = data

    await this.submitting(
      request.post(this.mailServicePath, {
        email_service_config,
        language: get(globals, 'user.lang', cookie('lang')),
      })
    )

    this.config = get(config, 'email_service_config', email_service_config)
  }

  @action
  async validate(data) {
    this.verifying = true

    const config = this.paramsTrim({
      ...data,
      ...this.notificationEmailConfig,
    })

    const { test_email_recipient, ...email_service_config } = config

    const params = {
      test_email_recipient,
      email_service_config,
      language: get(globals, 'user.lang', cookie('lang')),
    }

    const response = await request.post(
      `${this.mailServiceVersion2Path}/validation`,
      params,
      {},
      error => {
        window.onunhandledrejection(error)
        return {
          is_succ: false,
        }
      }
    )

    this.verifying = false
    return response.is_succ
  }

  paramsTrim(params) {
    const res = { ...params }
    const enabledSpaceFields = ['password']
    Object.keys(params)
      .filter(
        key => !includes(enabledSpaceFields, key) && isString(params[key])
      )
      .forEach(key => {
        res[key] = params[key].trim()
      })
    return res
  }
}
