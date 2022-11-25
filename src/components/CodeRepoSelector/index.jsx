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

    this.optionValueMap = {}
    this.codeStore = new CodeStore()
    this.state = {
      repoList: [],
      svnRepoList: [],
    }
  }

  get svnOptions() {
    return this.state.svnRepoList.map(({ name: label, sources }) => {
      const value = `${label}(${
        sources[`${sources.source_type}_source`].remote
      })`
      const repo = {
        key: value, // the unique key of repo source
        ...sources,
      }

      return {
        label,
        value,
        icon: 'svn',
        repo,
      }
    })
  }

  get repoOptions() {
    return this.state.repoList.map(
      ({ name: label, _originData, repoURL, provider }) => {
        const { spec } = _originData
        const value = `${label}(${repoURL ?? getRepoUrl(spec)})`
        const repo = !this.props.isComplexMode
          ? value
          : {
              key: value, // the unique key of repo source
              source_type: spec.provider,
              [`${spec.provider}_source`]: getCommonSource(spec),
            }

        return {
          label,
          value,
          icon: provider === 'bitbucket_server' ? 'bitbucket' : provider,
          repo,
        }
      }
    )
  }

  get allOptions() {
    const { showAllItem } = this.props
    const options = this.svnOptions.concat(this.repoOptions)

    if (showAllItem) {
      const allItem = {
        label: t('ALL'),
        value: '*',
        icon: 'allowlist',
      }
      return [allItem, ...options]
    }

    return options
  }

  getRepoList = async (params, currentRepo) => {
    const { devops, cluster } = this.props
    await this.codeStore.fetchList({ devops, cluster, ...params })

    this.setState({ repoList: this.codeStore.list.data }, () => {
      currentRepo && this.handleRepoChange(currentRepo)
    })
  }

  isSvnRepoRepeat = svnData => {
    const svnRepoMap = this.state.svnRepoList.map(({ name, sources }) => ({
      name,
      sources: JSON.stringify(sources),
    }))

    return svnRepoMap.some(({ name }) => name === svnData.metadata.name)
  }

  addSvnCodeRepoOption = svnData => {
    const isRepeat = this.isSvnRepoRepeat(svnData)
    const { metadata, sources } = svnData

    if (isRepeat) {
      Notify.error({
        content: `"${metadata.name}" ${t('CODE_REPO_EXISTS')}`,
      })
      throw Error(`"${metadata.name}" ${t('CODE_REPO_EXISTS')}`)
    }

    const svnRepoData = { name: metadata.name, sources }
    this.setState(
      ({ svnRepoList }) => ({
        svnRepoList: [svnRepoData, ...svnRepoList],
      }),
      () => {
        const selectedSvnRepoKey = `${metadata.name}(${
          sources[`${sources.source_type}_source`].remote
        })`
        this.handleRepoChange(selectedSvnRepoKey)
      }
    )
  }

  handleRepoChange = val => {
    const { onChange } = this.props
    const current = this.allOptions.find(({ value }) => value === val)
    onChange && onChange(current?.repo)
  }

  componentDidMount() {
    this.getRepoList()
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
        {option.value}
      </span>
    )
  }

  render() {
    const { value, index, name, isComplexMode, showCreateRepo } = this.props

    return (
      <>
        <Select
          clearable
          searchable
          key={index}
          name={name}
          className={styles.select}
          value={isComplexMode ? value?.key : value}
          onChange={this.handleRepoChange}
          options={this.allOptions}
          onFetch={this.getRepoList}
          isLoading={this.codeStore.list.isLoading}
          pagination={pick(this.codeStore.list, ['page', 'limit', 'total'])}
          valueRenderer={option => this.optionRenderer(option)('value')}
          optionRenderer={option => this.optionRenderer(option)('option')}
        />
        {isComplexMode && (
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
