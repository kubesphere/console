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

import { Form, Input, Loading, Select } from '@kube-design/components'
import classnames from 'classnames'
import ToggleView from 'components/ToggleView'
import { get } from 'lodash'
import React from 'react'
import SecretStore from 'stores/secret'
import BuilderStore from 'stores/devops/imgBuilder'
import { getDisplayName, getDocsUrl } from 'utils'
import { PATTERN_IMAGE_NAME } from 'utils/constants'

import TemplateSelect from './TemplateSelect'

import styles from './index.scss'

export default class S2IForm extends React.Component {
  constructor(props) {
    super(props)

    this.secretStore = new SecretStore()
    this.builderStore = new BuilderStore()

    this.state = {
      isGetTemplateListLoading: true,
      environment: [],
      basicSecretOptions: [],
      imageSecretOptions: [],
      repoReadError: null,
      repoNeedSecret: true,
      readRepoLoading: false,
      docUrl: '',
    }
  }

  static defaultProps = {
    mode: 'create',
    prefix: '',
  }

  get prefix() {
    const { prefix } = this.props
    return prefix ? `${prefix}.` : ''
  }

  componentDidMount() {
    this.fetchData()
    this.fetchImageSecrets()
    this.getTemplateList()
    this.handleRepoReadableCheck()
  }

  get namespace() {
    return this.props.namespace
  }

  fetchImageSecrets = async () => {
    const results = await this.secretStore.fetchListByK8s({
      namespace: this.namespace,
      cluster: this.props.cluster,
      fieldSelector: `type=kubernetes.io/dockerconfigjson`,
    })

    const imageSecretOptions = results.map(item => {
      const auths = get(item, 'data[".dockerconfigjson"].auths', {})
      const repoUrl = Object.keys(auths)[0] || ''
      return {
        label: getDisplayName(item),
        value: item.name,
        repoUrl,
        type: 'dockerconfigjson',
      }
    })

    this.setState({ imageSecretOptions })
  }

  fetchData = async () => {
    const results = await this.secretStore.fetchListByK8s({
      namespace: this.namespace,
      cluster: this.props.cluster,
      fieldSelector: `type=kubernetes.io/basic-auth`,
    })

    const basicSecretOptions = results.map(item => ({
      label: getDisplayName(item),
      value: item.name,
      type: 'basic-auth',
    }))

    this.setState({ basicSecretOptions })
  }

  getTemplateList = async () => {
    this.setState({ isGetTemplateListLoading: true })
    const lists = await this.builderStore.getBuilderTemplate({
      cluster: this.props.cluster,
      limit: -1,
      language: get(
        this.props.formTemplate,
        'metadata.annotations.languageType'
      ),
    })
    this.setState({
      builderTemplateLists: lists ?? [],
      isGetTemplateListLoading: false,
    })
  }

  handleImageTemplateChange = ({ environment, docUrl }) => {
    const lang = get(globals, 'user.lang', 'zh')

    const EnvOptions = (environment || []).map(env => {
      const descArr = (env.description || '').split('. ')
      const desc =
        lang === 'zh'
          ? get(descArr, '1', env.description)
          : get(descArr, '0', env.description)
      env.label = `${env.key}  (${desc})`
      env.value = env.key
      return env
    })
    this.setState({ environment: EnvOptions, docUrl })
  }

  handleRepoReadableCheck = async () => {
    const { formTemplate } = this.props
    const sourceUrl = get(formTemplate, `${this.prefix}spec.source.url`, '')
    if (!sourceUrl) return
    this.setState({ readRepoLoading: true })
    const secret = get(
      formTemplate,
      `${this.prefix}spec.source.credentials.name`,
      ''
    )
    const resp = await this.builderStore
      .verifyRepoReadable(sourceUrl, secret, this.namespace)
      .finally(() => {
        this.setState({ readRepoLoading: false })
      })
    const message = get(resp, 'message', '')

    if (message === 'success') {
      this.setState({
        repoReadError: null,
      })
      if (!secret) {
        this.setState({
          repoNeedSecret: false,
        })
      }
      return
    }
    this.setState({
      repoReadError: { message: t(message) },
      repoNeedSecret: true,
    })
  }

  handleSecretChange = () => {
    this.handleRepoReadableCheck()
  }

  renderAdvancedSetting() {
    return (
      <>
        <div className={styles.margin_b_10}>
          <Form.Item
            label={t('CODE_RELATIVE_PATH')}
            desc={t('CODE_RELATIVE_PATH_DESC')}
          >
            <Input
              name={`${this.prefix}spec.source.contextDir`}
              defaultValue={'/'}
            />
          </Form.Item>
        </div>
      </>
    )
  }

  render() {
    const { formTemplate, formRef, mode, prefix } = this.props

    return (
      <Form ref={formRef} data={formTemplate}>
        <TemplateSelect
          loading={this.state.isGetTemplateListLoading}
          formTemplate={prefix ? formTemplate[prefix] : formTemplate}
          builderTemplate={this.state.builderTemplateLists}
          onEnvironmentChange={this.handleImageTemplateChange}
        />
        <div
          className={classnames(styles.columns, {
            [styles.columsEdit]: mode === 'edit',
          })}
        >
          <div className={styles.column}>
            <Loading spinning={this.state.readRepoLoading} size={18}>
              <Form.Item
                label={t('CODE_REPOSITORY_URL')}
                desc={t('CODE_REPOSITORY_URL_DESC')}
                error={this.state.repoReadError}
                rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
              >
                <Input
                  name={`${this.prefix}spec.source.url`}
                  onBlur={this.handleRepoReadableCheck}
                />
              </Form.Item>
            </Loading>
          </div>
          {/* <div className="is-2">
            <Form.Item
              label={t('CODE_REPOSITORY_BRANCH')}
              rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
            >
              <Input
                name={`${this.prefix}spec.source.revisionId`}
                defaultValue="master"
              />
            </Form.Item>
          </div> */}
          <div className="is-half">
            <Loading spinning={this.state.readRepoLoading} size={18}>
              <Form.Item
                className={this.state.repoNeedSecret ? '' : styles.disabled}
                label={t('CODE_REPOSITORY_KEY')}
                desc={
                  this.state.repoNeedSecret
                    ? t('CODE_REPOSITORY_KEY_DESC')
                    : t('CODE_REPOSITORY_KEY_NOT_REQUIRED')
                }
              >
                <Select
                  onChange={this.handleSecretChange}
                  options={this.state.basicSecretOptions}
                  name={`${this.prefix}spec.source.credentials.name`}
                  placeholder=" "
                  clearable
                />
              </Form.Item>
            </Loading>
          </div>
        </div>
        <div
          className={classnames(styles.columns, {
            [styles.columsEdit]: mode === 'edit',
          })}
        >
          <div className={styles.column}>
            <Form.Item
              label={t('IMAGE_NAME')}
              desc={t('S2I_IMAGE_NAME_DESC')}
              rules={[
                { required: true, message: t('PARAM_REQUIRED') },
                {
                  pattern: PATTERN_IMAGE_NAME,
                  message: t('INVALID_NAME_DESC', {
                    message: t('S2I_IMAGE_NAME_DESC'),
                  }),
                },
              ]}
            >
              <Input name={`${this.prefix}spec.output.image`} />
            </Form.Item>
          </div>
          <div className="is-2">
            <Form.Item
              label={t('IMAGE_TAG')}
              rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
            >
              <Input
                name={`${this.prefix}spec.output.tag`}
                defaultValue={'latest'}
              />
            </Form.Item>
          </div>
          <div className="is-half">
            <Form.Item
              label={t('TARGET_IMAGE_REPOSITORY')}
              desc={t.html('S2I_TARGET_IMAGE_REPOSITORY_DESC', {
                link: getDocsUrl('secrets'),
              })}
              rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
            >
              <Select
                name={`${this.prefix}spec.output.credentials.name`}
                options={this.state.imageSecretOptions}
                placeholder=" "
              />
            </Form.Item>
          </div>
        </div>
        <ToggleView>{this.renderAdvancedSetting()}</ToggleView>
      </Form>
    )
  }
}
