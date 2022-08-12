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
import cs from 'classnames'
import { pick } from 'lodash'
import { Select, Icon, Notify } from '@kube-design/components'

import CodeStore from 'stores/codeRepo'

import { getRepoUrl, getCommonSource } from '../../utils/devops'

import styles from './index.scss'

export default class CodeRepoSelect extends React.Component {
  constructor(props) {
    super(props)

    this.codeStore = new CodeStore()
    this.inPipeline = props.type === 'pipeline'
    this.state = {
      repoList: [],
      svnRepoList: [],
      options: [],
    }
  }

  get svnOptions() {
    return this.state.svnRepoList.map(({ name, sources }) => {
      const svnRepoStr = JSON.stringify({ name, ...sources })
      return {
        label: `${name}(${sources[`${sources.source_type}_source`].remote})`,
        value: svnRepoStr,
        icon: 'svn',
      }
    })
  }

  get repoOptions() {
    const { showAllItem } = this.props
    let options = this.state.repoList.map(item => {
      const label = this.inPipeline
        ? `${item.name}(${getRepoUrl(item._originData.spec)})`
        : item.name
      const value = this.inPipeline
        ? this.transformValue(item)
        : `${item.name}(${item.repoURL})`

      return {
        label,
        value,
        icon:
          item.provider === 'bitbucket_server' ? 'bitbucket' : item.provider,
      }
    })

    if (showAllItem) {
      const allItem = {
        label: t('ALL'),
        value: '*',
        icon: 'allowlist',
      }
      options = [allItem, ...options]
    }

    return options
  }

  componentDidMount() {
    this.getRepoList()
  }

  getRepoList = async params => {
    const { devops, cluster } = this.props
    await this.codeStore.fetchList({ devops, cluster, ...params })

    this.setState({ repoList: this.codeStore.list.data })
    this.updateOptions()
  }

  isSvnRepoRepeat = svnData => {
    const svnRepoMap = this.state.svnRepoList.map(({ name, sources }) => ({
      name,
      sources: JSON.stringify(sources),
    }))

    return svnRepoMap.some(({ name }) => name === svnData.metadata.name)
  }

  addSvnCodeRepoOption = svnData => {
    const _svnRepoList = [...this.state.svnRepoList]
    const isRepeat = this.isSvnRepoRepeat(svnData)

    if (isRepeat) {
      Notify.error({
        content: `"${svnData.metadata.name}" ${t('CODE_REPO_EXISTS')}`,
      })
      throw Error(`"${svnData.metadata.name}" ${t('CODE_REPO_EXISTS')}`)
    }

    _svnRepoList.push({
      name: svnData.metadata.name,
      sources: svnData.sources,
    })
    this.setState({ svnRepoList: _svnRepoList })
  }

  updateOptions = () => {
    return this.setState({ options: this.svnOptions.concat(this.repoOptions) })
  }

  handleRepoChange = val => {
    const { onChange } = this.props
    const selectedRepo = this.inPipeline && !!val ? JSON.parse(val) : val
    onChange && onChange(selectedRepo)
  }

  transformValue = item => {
    const { metadata, spec } = item._originData
    const repoJsonStr = JSON.stringify({
      source_type: spec.provider,
      [`${spec.provider}_source`]: getCommonSource(spec),
      name: metadata.name,
    })

    return repoJsonStr
  }

  optionRenderer = option => type => {
    if (!option.value) {
      return
    }

    return (
      <span className={styles.option}>
        <Icon
          name={option.icon ?? ''}
          type={type === 'value' ? 'dark' : 'light'}
        />
        {this.inPipeline ? option.label : option.value}
      </span>
    )
  }

  render() {
    const {
      value: selectedRepo,
      index,
      name,
      showCreateRepo,
      allowCreateCodeRepo,
    } = this.props

    return (
      <>
        <Select
          clearable
          searchable
          key={index}
          name={name}
          className={styles.select}
          value={
            this.inPipeline && selectedRepo
              ? JSON.stringify(selectedRepo)
              : selectedRepo
          }
          onChange={this.handleRepoChange}
          options={this.state.options}
          onFetch={this.getRepoList}
          isLoading={this.codeStore.list.isLoading}
          pagination={pick(this.codeStore.list, ['page', 'limit', 'total'])}
          valueRenderer={option => this.optionRenderer(option)('value')}
          optionRenderer={option => this.optionRenderer(option)('option')}
        />
        {allowCreateCodeRepo && (
          <span
            className={cs(styles['multi-repo'], 'form-item-desc')}
            onClick={showCreateRepo}
          >
            {t('GO_CREATE_REPO')}
          </span>
        )}
      </>
    )
  }
}
