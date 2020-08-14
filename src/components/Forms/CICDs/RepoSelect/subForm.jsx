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
import classNames from 'classnames'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { get, isEmpty, omitBy } from 'lodash'
import { Icon } from '@pitrix/lego-ui'
import SCMStore from 'stores/devops/scm'
import { REPO_TYPES, REPO_KEY_MAP } from 'utils/constants'
import { ReactComponent as BackIcon } from 'src/assets/back.svg'

import CredentialModal from 'devops/containers/Credential/credentialModal'

import GitForm from './GitForm'
import GithubForm from './GithubForm'
import SvnForm from './SVNForm'
import BitBucketForm from './BitBucketForm'
import styles from './index.scss'

@observer
export default class RepoSelectForm extends React.Component {
  static propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    sourceData: PropTypes.object,
    enableTypeChange: PropTypes.bool,
  }

  static defaultProps = {
    onSave() {},
    onCancel() {},
    sourceData: {},
    enableTypeChange: true,
  }

  static contextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()
    this.tokenFormRef = React.createRef()
    this.store = new SCMStore()
  }

  @observable
  source_type = 'github'

  @observable
  showCredential = false

  componentDidMount() {
    const { onCancel, devops, name, cluster } = this.props
    const { registerSubRoute } = this.context
    const { sourceData } = this.props

    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)

    this.store.getCredentials({ devops, cluster })
    this.store.name = name

    if (!isEmpty(sourceData)) {
      this.source_type = sourceData.source_type
      this.store.formData = {
        [REPO_KEY_MAP[this.source_type]]: omitBy(
          sourceData[REPO_KEY_MAP[this.source_type]],
          (value, key) => key && key.startsWith('discover') && isEmpty(value)
        ),
      }
      // initial single_svn type in edit
      if (this.source_type === 'single_svn') {
        this.store.formData = {
          svn_source: {
            type: 'single_svn',
            ...this.store.formData.single_svn_source,
          },
        }
      }
    }
  }

  showCreateCredential = () => {
    this.showCredential = true
  }

  hideCreateCredential = async () => {
    const { devops, cluster } = this.props
    await this.store.getCredentials({ devops, cluster })
    this.showCredential = false
  }

  handleGoBack = () => {
    const { resetSubRoute } = this.context

    resetSubRoute && resetSubRoute()

    this.props.onCancel()
  }

  handleSubmit = data => {
    const { onSave } = this.props
    const { resetSubRoute } = this.context
    const { formData } = this.store
    if (['github', 'bitbucket_server'].includes(this.source_type)) {
      if (isEmpty(data)) {
        return
      }
      onSave(this.source_type, data)
      resetSubRoute && resetSubRoute()
      return
    }

    this.formRef.current &&
      this.formRef.current.validate(() => {
        if (this.source_type === 'git') {
          onSave('git', {
            git_source: {
              ...formData.git_source,
              discover_branches: true,
            },
          })
        }

        if (['svn', 'single_svn'].includes(this.source_type)) {
          const type = get(formData, 'svn_source.type', 'svn')
          onSave(type, {
            [REPO_KEY_MAP[type]]: {
              ...formData.svn_source,
              remote: get(formData, 'svn_source.remote', '').trim(),
              discover_branches: true,
            },
          })
        }

        resetSubRoute && resetSubRoute()
      })
  }

  handleTypeChange = e => {
    const { type } = e.currentTarget.dataset

    this.source_type = type
    this.store.resetStore()
  }

  renderTypes() {
    const { enableTypeChange } = this.props
    const sourceType =
      this.source_type === 'single_svn' ? 'svn' : this.source_type
    return (
      <ul className={styles.repoTypes}>
        {REPO_TYPES.map(type => (
          <li
            className={classNames({
              [styles.selectType]: type.value === sourceType,
              [styles.disabled]: !enableTypeChange && sourceType !== type.value,
            })}
            key={type.value}
            data-type={type.value}
            onClick={this.handleTypeChange}
          >
            <Icon
              name={type.icon}
              type={type.value === sourceType ? 'light' : 'dark'}
              size={32}
            />
            <span>{type.name}</span>
          </li>
        ))}
      </ul>
    )
  }

  renderForm() {
    const { devops, enableTypeChange, cluster } = this.props
    if (this.source_type === 'github') {
      return (
        <GithubForm
          store={this.store}
          formRef={this.formRef}
          handleSubmit={this.handleSubmit}
          cluster={cluster}
          devops={devops}
        />
      )
    }

    if (['svn', 'single_svn'].includes(this.source_type)) {
      return (
        <SvnForm
          store={this.store}
          formRef={this.formRef}
          handleSubmit={this.handleSubmit}
          devops={devops}
          showCredential={this.showCreateCredential}
          enableTypeChange={enableTypeChange}
          cluster={cluster}
        />
      )
    }

    if (this.source_type === 'bitbucket_server') {
      return (
        <BitBucketForm
          store={this.store}
          formRef={this.formRef}
          handleSubmit={this.handleSubmit}
          cluster={cluster}
          devops={devops}
        />
      )
    }

    return (
      <GitForm
        store={this.store}
        formRef={this.formRef}
        handleSubmit={this.handleSubmit}
        devops={devops}
        cluster={cluster}
        showCredential={this.showCreateCredential}
      />
    )
  }

  render() {
    const { devops, cluster } = this.props

    return (
      <div className={styles.formWrapper}>
        <div className="h4">
          <a className="custom-icon" onClick={this.handleGoBack}>
            <BackIcon />
          </a>
          {t('Select Code Repository')}
        </div>
        <div className={styles.contentWrapper}>
          {this.renderTypes()}
          {this.renderForm()}
        </div>
        <CredentialModal
          visible={this.showCredential}
          onOk={this.hideCreateCredential}
          onCancel={this.hideCreateCredential}
          devops={devops}
          cluster={cluster}
        />
      </div>
    )
  }
}
