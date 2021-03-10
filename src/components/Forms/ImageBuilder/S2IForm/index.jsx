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
import { get, set } from 'lodash'
import classnames from 'classnames'
import { Alert, Form, Input, Loading, Select } from '@kube-design/components'
import { getDisplayName, getDocsUrl } from 'utils'
import SecretStore from 'stores/secret'
import BuilderStore from 'stores/s2i/builder'
import S2IEnviroment from 'components/Inputs/S2iEnviroment'
import ToggleView from 'components/ToggleView'

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

  getTemplateList = async () => {
    this.setState({ isGetTemplateListLoading: true })
    const lists = await this.builderStore.getBuilderTemplate({
      cluster: this.props.cluster,
    })
    this.setState({
      builderTemplateLists: get(lists, 'items', []),
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

  handleSecretChange = () => {
    this.handleRepoReadableCheck()
  }

  handleImageSecretChange = (secret, item) => {
    const { formTemplate } = this.props

    const repoUrl = get(item, '[0]repoUrl', '')
    set(
      formTemplate,
      `${this.prefix}metadata.annotations["kubesphere.io/repoUrl"]`,
      repoUrl
    )
  }

  handleRepoReadableCheck = async () => {
    const { formTemplate } = this.props
    const sourceUrl = get(
      formTemplate,
      `${this.prefix}spec.config.sourceUrl`,
      ''
    )
    if (!sourceUrl) return
    this.setState({ readRepoLoading: true })
    const secret = get(
      formTemplate,
      `${this.prefix}spec.config.gitSecretRef.name`,
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

  renderAdvancedSetting() {
    return (
      <>
        <div className={styles.margin_b_10}>
          <Form.Item
            label={t('Secret Code')}
            rules={[
              {
                pattern: /^[a-zA-Z0-9]+$/,
                message: `${t('SECRET_CODE_RULE_DESC')}`,
              },
            ]}
          >
            <Input
              name={`${this.prefix}spec.config.secretCode`}
              defaultValue=""
            />
          </Form.Item>
        </div>

        <div className={styles.margin_b_10}>
          <Form.Item
            label={t('S2I_RELATIVE_PATH')}
            desc={t(
              'Specify a relative directory inside the application. (Default value /)'
            )}
          >
            <Input
              name={`${this.prefix}spec.config.contextDir`}
              defaultValue={'/'}
            />
          </Form.Item>
        </div>
        <Alert
          className={styles.margin_b_10}
          message={t.html('S2I_ENVIROMENT_DESC', {
            link: this.state.docUrl || getDocsUrl('s2i_template'),
          })}
          type="info"
        />
        <Form.Item>
          <S2IEnviroment
            name={`${this.prefix}spec.config.environment`}
            options={this.state.environment}
          />
        </Form.Item>
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
                label={t('Code URL')}
                desc={t('S2I_IMAGE_REPONSITRY_DESC')}
                error={this.state.repoReadError}
                rules={[
                  { required: true, message: t('This param is required') },
                ]}
              >
                <Input
                  name={`${this.prefix}spec.config.sourceUrl`}
                  onBlur={this.handleRepoReadableCheck}
                />
              </Form.Item>
            </Loading>
          </div>
          <div className="is-2">
            <Form.Item
              label={t('Branch')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Input
                name={`${this.prefix}spec.config.revisionId`}
                defaultValue="master"
              />
            </Form.Item>
          </div>
          <div className="is-half">
            <Loading spinning={this.state.readRepoLoading} size={18}>
              <Form.Item
                className={this.state.repoNeedSecret ? '' : styles.disabled}
                label={t('Secret')}
                desc={
                  this.state.repoNeedSecret
                    ? t('S2I_SECRET_DESC')
                    : t('The current code repository does not require a key.')
                }
              >
                <Select
                  onChange={this.handleSecretChange}
                  options={this.state.basicSecretOptions}
                  name={`${this.prefix}spec.config.gitSecretRef.name`}
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
              label={t('imageName')}
              desc={t('S2I_IMAGENAME_DESC')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Input name={`${this.prefix}spec.config.imageName`} />
            </Form.Item>
          </div>
          <div className="is-2">
            <Form.Item
              label={t('tag')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Input
                name={`${this.prefix}spec.config.tag`}
                defaultValue={'latest'}
              />
            </Form.Item>
          </div>
          <div className="is-half">
            <Form.Item
              label={t('Target Image Repository')}
              desc={t.html('S2I_TARGET_IMAGE_REPONSTRY_DESC', {
                link: getDocsUrl('secrets'),
              })}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <Select
                name={`${this.prefix}spec.config.pushAuthentication.secretRef.name`}
                options={this.state.imageSecretOptions}
                onChange={this.handleImageSecretChange}
              />
            </Form.Item>
          </div>
        </div>
        <ToggleView>{this.renderAdvancedSetting()}</ToggleView>
      </Form>
    )
  }
}
