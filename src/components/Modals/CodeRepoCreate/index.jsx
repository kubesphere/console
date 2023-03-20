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

import { Column, Columns, Form, Input, TextArea } from '@kube-design/components'
import { Modal } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'

import RepoSelect from 'components/Forms/Pipelines/RepoSelect'
import RepoSelectForm from 'components/Forms/Pipelines/RepoSelect/subForm'
import PropTypes from 'prop-types'
import React from 'react'
import { PATTERN_ALIAS_NAME, PATTERN_NAME } from 'utils/constants'

import styles from './index.scss'

export default class BaseInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showSelectRepo: false,
    }
    this.scmRef = React.createRef()
    this.formRef = React.createRef()
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
    }
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({
      subRoute: {
        onSave,
        onCancel,
      },
    })
  }

  showSelectRepo = () => {
    this.setState({
      showSelectRepo: true,
    })
  }

  hideSelectRepo = () => {
    this.setState({
      showSelectRepo: false,
    })
  }

  handleSubFormSave = () => {
    const { subRoute } = this.state

    if (subRoute && subRoute.onSave) {
      subRoute.onSave(() => {
        this.setState({ subRoute: {} })
      })
    }
  }

  handleSubFormCancel = () => {
    const { subRoute } = this.state

    if (subRoute && subRoute.onCancel) {
      subRoute.onCancel()
      this.setState({ subRoute: {} })
    }
  }

  handleRepoChange = (source_type, formData) => {
    this.setState(
      {
        showSelectRepo: false,
      },
      () => {
        this.scmRef.current.onChange({
          source_type,
          ...formData,
        })
      }
    )
  }

  handleDeleteSource = () => {
    this.scmRef.current.onChange()
  }

  renderRepoSelectForm() {
    const { showSelectRepo } = this.state
    const { formTemplate, devops, cluster, noSVN, ...res } = this.props

    return (
      <Modal width={970} {...res} disableSubmit={showSelectRepo}>
        <div>
          <RepoSelectForm
            sourceData={formTemplate['sources']}
            devops={devops}
            name={formTemplate.name}
            cluster={cluster}
            onSave={this.handleRepoChange}
            onCancel={this.hideSelectRepo}
            noSVN={noSVN}
            noJenkins
          />
          <Confirm
            className={styles.confirm}
            onOk={this.handleSubFormSave}
            onCancel={this.handleSubFormCancel}
          />
        </div>
      </Modal>
    )
  }

  submit = () => {
    const { formTemplate, onOk } = this.props
    this.formRef.current.validate(() => {
      onOk(formTemplate)
    })
  }

  render() {
    const { formTemplate, isEdit, ...rest } = this.props
    const { showSelectRepo } = this.state
    if (showSelectRepo) {
      return this.renderRepoSelectForm()
    }

    return (
      <Modal width={970} {...rest} onOk={this.submit}>
        <Form ref={this.formRef} data={formTemplate}>
          <Columns>
            <Column>
              <Form.Item
                label={t('NAME')}
                desc={t('NAME_DESC')}
                rules={[
                  { required: true, message: t('NAME_EMPTY_DESC') },
                  {
                    pattern: PATTERN_NAME,
                    message: t('INVALID_NAME_DESC'),
                  },
                ]}
              >
                <Input name="metadata.name" maxLength={63} disabled={isEdit} />
              </Form.Item>
              <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
                <TextArea
                  name="metadata.annotations['kubesphere.io/description']"
                  maxLength={256}
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('ALIAS')}
                desc={t('ALIAS_DESC')}
                rules={[
                  {
                    pattern: PATTERN_ALIAS_NAME,
                    message: t('INVALID_ALIAS_NAME_DESC'),
                  },
                ]}
              >
                <Input
                  name="metadata.annotations['kubesphere.io/alias-name']"
                  maxLength={63}
                />
              </Form.Item>
            </Column>
          </Columns>
          <Form.Item
            label={t('CODE_REPOSITORY')}
            rules={[{ required: true, message: t('REPO_EMPTY_DESC') }]}
          >
            <RepoSelect
              name="sources"
              type="cd"
              ref={this.scmRef}
              devops={this.props.devops}
              onClick={this.showSelectRepo}
              handleDeleteSource={this.handleDeleteSource}
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
