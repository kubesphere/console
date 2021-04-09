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
import { action, extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import Schema from 'async-validator'
import { isEmpty, get, set, trim } from 'lodash'

import { checkRepoInvalidReason } from 'utils/app'

import {
  Button,
  Input,
  Select,
  Tooltip,
  Loading,
  Icon,
} from '@kube-design/components'

import styles from './index.scss'

const protocolReg = /^(http|https|s3):\/\//

const protocols = [
  { label: 'http://', value: 'http' },
  { label: 'https://', value: 'https' },
  { label: 's3://', value: 's3' },
]

@observer
export default class UrlInput extends React.Component {
  static propTypes = {
    formData: PropTypes.object,
    onValidate: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    formData: {},
    onValidate() {},
    isSubmitting: false,
  }

  get store() {
    return this.props.store
  }

  constructor(props) {
    super(props)

    const type = get(props.formData, 'type', 'http')
    const url = this.getUrl(props.formData)
    const credential = this.getCredential(props.formData)

    extendObservable(this, {
      type,
      url,
      credential,
      validateStatus: '',
      validateStatusCode: 0,
      isValid: false,
    })

    this.validateSchema = new Schema({
      url: (rule, value, cb) => {
        if (this.isValid && this.validateStatus === 'success') {
          cb()
        } else {
          cb(new Error(t('Invalid URL')))
        }
      },
    })
  }

  getUrl(formData) {
    if (formData.url) {
      const reg = new RegExp('^([\\s\\S]*?:\\/\\/)([\\s\\S]*)$', 'g')
      const res = reg.exec(formData.url)
      return res ? res[2] : ''
    }
    return ''
  }

  getCredential(formData) {
    const credential = {
      accessKeyID: '',
      secretAccessKey: '',
    }

    if (formData.credential) {
      try {
        return {
          ...credential,
          ...JSON.parse(formData.credential),
        }
      } catch (e) {}
    }
    return credential
  }

  @action
  handleTypeChange = type => {
    const { formData } = this.props

    set(
      formData,
      'credential',
      type === 's3' ? JSON.stringify(this.credential) : '{}'
    )
    set(formData, 'type', type)
    this.type = type

    if (!protocolReg.test(this.url)) {
      set(formData, 'url', `${type}://${this.url}`)
    }
    this.resetValidateStatus()
  }

  @action
  handleUrlChange = (e, url) => {
    const { formData } = this.props
    const _url = trim(url)
    set(
      formData,
      'url',
      protocolReg.test(_url) ? _url : `${this.type}://${_url}`
    )
    this.url = _url
    this.resetValidateStatus()
  }

  @action
  handleAccessInputChange = e => {
    const name = e.target.name
    this.credential[name] = e.target.value
    set(this.props.formData, 'credential', JSON.stringify(this.credential))
    this.resetValidateStatus()
  }

  @action
  handleVerify = () => {
    this.validateStatus = 'validating'

    const { url, credential } = this.props.formData
    this.store
      .validate({
        type: this.type,
        url,
        workspace: this.props.workspace,
        credential,
      })
      .then(res => {
        this.handleVerifyResult(res.ok, res.errorCode)
      })
      .catch(() => {
        this.handleVerifyResult(false)
      })
  }

  @action
  handleVerifyResult = (ok, errorCode) => {
    this.validateStatus = ok ? 'success' : 'error'
    this.validateStatusCode = ok ? 0 : errorCode
    this.isValid = ok
    this.validate()
  }

  @action
  resetValidateStatus() {
    this.validateStatus = ''
    this.validate()
  }

  checkVerifyEnable() {
    if (this.validateStatus === 'validating') {
      return false
    }

    if (this.type === 's3') {
      const { accessKeyID, secretAccessKey } = this.credential
      return (
        !isEmpty(this.url) && !isEmpty(accessKeyID) && !isEmpty(secretAccessKey)
      )
    }

    return !isEmpty(this.url)
  }

  validate() {
    const { formData, onValidate } = this.props
    const opts = {
      first: true,
    }
    this.validateSchema.validate(formData, opts, (_, errors) => {
      onValidate({
        isValid: isEmpty(errors),
      })
    })
  }

  render() {
    return (
      <div className={styles.urlInput}>
        {this.renderField()}
        {this.renderAccess()}
      </div>
    )
  }

  renderValidateStatus() {
    const { validateStatus, validateStatusCode } = this

    if (validateStatus === '') {
      return null
    }

    const content =
      validateStatus === 'validating' ? (
        <Loading size={16} />
      ) : (
        <Tooltip
          placement="top"
          content={
            validateStatus === 'success'
              ? t('Valid URL')
              : checkRepoInvalidReason(validateStatusCode)
          }
        >
          <Icon name={validateStatus} />
        </Tooltip>
      )

    return <div className={styles.validStatus}>{content}</div>
  }

  renderField() {
    return (
      <div className={styles.field}>
        <label className={styles.label}>{t('URL')}</label>
        <div className={styles.fieldInput}>
          <Select
            className={styles.protocol}
            value={this.type}
            options={protocols}
            onChange={this.handleTypeChange}
          />
          <Input
            className={styles.url}
            type="text"
            name="url"
            value={this.url}
            validateStatus={this.validateStatus}
            placeholder="https://github.com/mycompany/myca…"
            onChange={this.handleUrlChange}
          />
          {this.renderValidateStatus()}
          {this.type !== 's3' && (
            <Button
              className={styles.verifyBtn}
              onClick={this.handleVerify}
              disabled={!this.checkVerifyEnable() || this.props.isSubmitting}
            >
              {t('Validate')}
            </Button>
          )}
        </div>
        <div className={styles.desc}>{t('APP_REPO_URL_DESC')}</div>
      </div>
    )
  }

  renderAccess() {
    if (this.type !== 's3') return null

    return (
      <div className={styles.access}>
        <div className={styles.accessItem}>
          <label className={styles.label}>{t('Access Key ID')}:</label>
          <Input
            name="accessKeyID"
            value={this.credential.accessKeyID}
            onChange={this.handleAccessInputChange}
          />
        </div>
        <div className={styles.accessItem}>
          <label className={styles.label}>{t('Secret Access Key')}:</label>
          <Input
            name="secretAccessKey"
            value={this.credential.secretAccessKey}
            onChange={this.handleAccessInputChange}
          />
        </div>
        <Button
          className={styles.verifyBtn}
          onClick={this.handleVerify}
          disabled={!this.checkVerifyEnable() || this.props.isSubmitting}
        >
          {t('Validate')}
        </Button>
      </div>
    )
  }
}
