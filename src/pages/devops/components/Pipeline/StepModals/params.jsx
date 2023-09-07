/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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
import {
  Form,
  Select,
  Input,
  TextArea,
  RadioGroup,
  Checkbox,
  Notify,
} from '@kube-design/components'
import { NumberInput } from 'components/Inputs'
import { toJS } from 'mobx'
import { set, isEmpty, get } from 'lodash'
import { Modal, CodeEditor } from 'components/Base'
import CodeRepoSelector from 'components/CodeRepoSelector'
import { getRepoUrl, groovyToJS, parseCondition } from 'utils/devops'
import { observer } from 'mobx-react'
import { CREDENTIAL_KEY } from 'utils/constants'
import PipelineSelect from './pipeline'
import CDSelect from './application'
import SecretSelect from './credential'
import { Reaction } from './reaction'

import styles from './index.scss'
import FromCodeRepository from './FromCodeRepository'

const boolMap = new Map([
  [true, 'true'],
  [false, 'false'],
])

const parseCheckoutData = data =>
  data.data.reduce((prev, arg) => {
    if (arg.key === 'scm') {
      const str = arg.value.value
      if (str) {
        Object.assign(prev, groovyToJS(str))
      }
    }
    prev[arg.key] = arg.value.value
    return prev
  }, {})

const parseWithCredientialData = data => {
  const str = get(data, 'data.value', '')
  if (str) {
    const credentialType = setCredentialType(str)
    return {
      ...groovyToJS(str),
      type: `credential.devops.kubesphere.io/${CREDENTIAL_KEY[credentialType]}`,
    }
  }
  return {}
}

const typesDict = {
  secret_text: 'string',
  username_password: 'usernamePassword',
  ssh: 'sshUserPrivateKey',
  kubeconfig: 'kubeconfigContent',
}

const setCredentialType = str => {
  const typeReg = /\$\{\[([\w-]*)\(/
  const type = str.match(typeReg) && str.match(typeReg)[1]
  if (type) {
    const credentialType = Object.entries(typesDict).find(
      typeArr => typeArr[1] === type
    )
    return credentialType ? credentialType[0] : null
  }
  return null
}

const initialData = parameters => {
  return parameters?.reduce(
    (prev, { name, type, defaultValue }) => {
      return {
        initData: {
          ...prev.initData,
          [name]:
            type === 'bool' ? defaultValue === 'true' : defaultValue || '',
        },
        typeMap: {
          ...prev.typeMap,
          [name]: type,
        },
        codeKey: type === 'code' ? name : prev.codeKey,
      }
    },
    { initData: {}, typeMap: {}, codeKey: '' }
  )
}
@observer
export default class Params extends React.Component {
  static formProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.query = {}
    this.state = {
      formData: {},
      value: '',
      typeMap: {},
      initData: {},
      name: '',
      /**
       * @type {Reaction}
       */
      reactionForm: new Reaction(
        () => {
          this.forceUpdate()
        },
        {
          getRepoUrl,
        }
      ),
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { activeTask, edittingData } = nextProps
    const { name, parameters } = activeTask

    if (name === state.name) {
      return null
    }
    const { reactionForm } = state
    const { initData, typeMap, codeKey } = initialData(parameters)
    if (isEmpty(edittingData)) {
      reactionForm.init(
        activeTask.parameters ?? [],
        // defaultConfig,
        codeKey ? initData[codeKey] : initData
      )
      return codeKey
        ? {
            value: initData[codeKey],
            initData,
            typeMap,
            name,
            reactionForm,
          }
        : {
            formData: initData,
            initData,
            typeMap,
            name,
            reactionForm,
          }
    }

    let formData = {}
    let value = ''
    const { data, type } = toJS(edittingData)
    if (type === 'checkout') {
      formData = parseCheckoutData(edittingData)
    } else if (type === 'withcredentials') {
      formData = parseWithCredientialData(edittingData)
    } else if (codeKey) {
      value = (Array.isArray(data) ? data[0]?.value?.value : data.value) || ''
      formData = {
        [codeKey]: value,
      }
    } else if (Array.isArray(data)) {
      formData = data.reduce((prev, arg) => {
        const val = arg.value.value
        prev[arg.key] = val
        const isBoolValue = typeMap[arg.key] === 'bool'
        if (isBoolValue) {
          prev[arg.key] = typeof val === 'boolean' ? val : val === 'true'
        }
        return prev
      }, {})
    } else {
      formData = Object.keys(initData).reduce(
        (pre, key) => ({
          ...pre,
          [key]: data.value || '',
        }),
        {}
      )
    }
    // reactionForm.init(defaultConfig, formData)
    reactionForm.init(activeTask.parameters ?? [], formData)
    return {
      formData,
      value,
      initData,
      typeMap,
      name,
      reactionForm,
    }
  }

  handleCodeEditorChange = name => value => {
    const { formData } = this.state
    set(formData, name, value)
  }

  handleCheckboxChange = key => value => {
    const { formData } = this.state
    set(formData, key, value)
    this.setState({ formData })
  }

  handleSecretChange = option => value => {
    const { formData, reactionForm } = this.state
    const { store } = this.props
    const res = store.credentialsList.data.filter(t => t.name === value)
    if (!res.length) {
      this.query = {}
      set(formData, option.name, {
        name: '',
        type: '',
      })
    } else if (option.postByQuery) {
      this.query = {
        secret: res[0].name,
        secretNamespace: res[0].namespace,
      }
    } else {
      set(formData, option.name, {
        name: res[0].name,
        type: `credential.devops.kubesphere.io/${CREDENTIAL_KEY[res[0].type]}`,
      })
    }
    reactionForm.handleFieldValueChange(option.name, get(formData, option.name))
    this.setState({ formData })
  }

  renderFormItem(option) {
    if (
      option.condition &&
      !parseCondition(option.condition, this.state.formData)
    ) {
      return null
    }
    const { store } = this.props
    const formProps = {
      key: option.name,
      label: t(option.display),
      rules: [
        {
          required: option.required ?? false,
          message: t('PARAM_REQUIRED'),
        },
      ],
    }
    switch (option.type) {
      case 'pipeline':
        return (
          <PipelineSelect key={option.name} option={option} store={store} />
        )
      case 'application':
        return <CDSelect key={option.name} option={option} store={store} />
      case 'secret':
        return (
          <SecretSelect
            key={option.name}
            option={option}
            store={store}
            formData={this.state.formData}
            onChange={this.handleSecretChange(option)}
            showCredential={this.props.showCredential}
          />
        )
      case 'number':
        return (
          <Form.Item {...formProps}>
            <NumberInput name={option.name} />
          </Form.Item>
        )
      case 'text':
        return (
          <Form.Item {...formProps}>
            <TextArea name={option.name} rows={8} />
          </Form.Item>
        )
      case 'enum':
        return (
          <Form.Item {...formProps}>
            <Select name={option.name} options={option.options || []} />
          </Form.Item>
        )
      case 'code':
        return (
          <Form.Item {...formProps} label={null}>
            <CodeEditor
              key={option.name}
              className={styles.CodeEditor}
              name={option.name}
              mode="yaml"
              // value={this.state.value}
              // onChange={this.handleCodeEditorChange(option.name)}
            />
          </Form.Item>
        )
      case 'bool':
        return (
          <Form.Item {...{ ...formProps, label: '', desc: '' }}>
            <Checkbox
              name={option.name}
              checked={get(this.state.formData, option.name, false)}
              onChange={this.handleCheckboxChange(option.name)}
            >
              {t(option.display)}
            </Checkbox>
          </Form.Item>
        )
      case 'hidden':
        return null
      case 'radioGroup':
        return (
          <Form.Item {...formProps}>
            <RadioGroup
              name={option.name}
              options={
                option.options.map(i => ({
                  value: i.value,
                  label: t(i.label),
                })) || []
              }
            />
          </Form.Item>
        )
      case 'codeRepository':
        return (
          <Form.Item {...formProps}>
            <CodeRepoSelector
              name={option.name}
              cluster={this.props.cluster}
              devops={this.props.devops}
              isCreatePipeline={true}
              trigger={this.props.trigger}
            />
          </Form.Item>
        )
      case 'importCodeRepo':
        return (
          <Form.Item {...formProps}>
            <FromCodeRepository
              name={option.name}
              cluster={this.props.cluster}
              devops={this.props.devops}
              isCreatePipeline={true}
              trigger={this.props.trigger}
            />
          </Form.Item>
        )
      case 'string':
      default:
        return (
          <Form.Item {...formProps}>
            <Input name={option.name} />
          </Form.Item>
        )
    }
  }

  handleOk = () => {
    const { activeTask, store, onAddStep, onCancel } = this.props
    const { typeMap, initData, reactionForm } = this.state
    const formData = Object.entries(reactionForm.getValues()).reduce(
      (prev, [key, value]) => {
        const isBoolValue = typeMap[key] === 'bool'
        const _value = typeof value === 'number' ? value.toString() : value
        return {
          ...prev,
          [key]: isBoolValue ? boolMap.get(_value) : _value,
        }
      },
      {}
    )
    this.formRef.current.validate(async () => {
      const jsonData = await store.getPipelineStepTempleJenkins(
        activeTask.name,
        { ...initData, ...formData },
        this.query
      )
      try {
        onAddStep(JSON.parse(jsonData))
      } catch (e) {
        Notify.error({ content: t('ERROR') })
        onCancel()
      }
    })
  }

  render() {
    const { visible, onCancel, activeTask } = this.props
    const omitType = ['secret']
    const { reactionForm } = this.state
    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={activeTask.title}
      >
        <Form
          data={reactionForm.getValues()}
          ref={this.formRef}
          onChange={(key, value) => {
            if (
              !omitType.includes(
                activeTask.parameters.find(t => t.name === key)?.type
              )
            ) {
              this.state.reactionForm.handleFieldValueChange(key, value)
            }
          }}
        >
          {reactionForm.getFields().map(option => this.renderFormItem(option))}
        </Form>
      </Modal>
    )
  }
}
