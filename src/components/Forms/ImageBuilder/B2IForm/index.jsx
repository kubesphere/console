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
import { Alert, Form, Input, Select } from '@kube-design/components'
import { getDisplayName, getDocsUrl } from 'utils'
import SecretStore from 'stores/secret'
import BuilderStore from 'stores/s2i/builder'
import S2IEnviroment from 'components/Inputs/S2iEnviroment'
import TemplateSelect from 'components/Forms/ImageBuilder/S2IForm/TemplateSelect'
import ToggleView from 'components/ToggleView'

import Uploader from './BinaryFileUploader'
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
    const lists = await this.builderStore.getBuilderTemplate()
    this.setState({
      builderTemplateLists: get(lists, 'items', []),
      isGetTemplateListLoading: false,
    })
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

  handleImageTemplateChange = ({ environment, docUrl }) => {
    const lang = get(globals, 'user.lang', 'zh')

    const EnvOptions = (environment || []).map(env => {
      env.label = env.key
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

  renderAdvancedSetting() {
    return (
      <React.Fragment>
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

        <Alert
          className={styles.environment_info}
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
      </React.Fragment>
    )
  }

  render() {
    const { formTemplate, formRef, mode, prefix } = this.props
    return (
      <Form ref={formRef} data={formTemplate}>
        <Form.Item
          label={t('Upload Artifact')}
          rules={[
            { required: true, message: t('The file has not been uploaded.') },
          ]}
        >
          <Uploader
            name={`${this.prefix}spec.config.sourceUrl`}
            namespace={this.namespace}
            formTemplate={prefix ? formTemplate[prefix] : formTemplate}
            cluster={this.props.cluster}
          />
        </Form.Item>
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
