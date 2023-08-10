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
import { Icon, Notify } from '@kube-design/components'
import cs from 'classnames'
import * as React from 'react'
import CodeStore from 'stores/codeRepo'
import { gitRepositorySpec2Source } from 'utils/devOpsRepos'
import { toJS } from 'mobx'
import { getRepoUrl } from '../../utils/devops'
import { TypeSelect } from '../Base'

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
        const repo = !this.props.isCreatePipeline
          ? toJS(spec)
          : {
              key: value, // the unique key of repo source
              source_type: spec.provider,
              [`${spec.provider}_source`]: gitRepositorySpec2Source[
                spec.provider
              ]?.(spec, label),
            }

        return {
          label,
          value: label,
          icon: provider === 'bitbucket_server' ? 'bitbucket' : provider,
          repo,
          disabled: this.props.provider && this.props.provider !== provider,
          description: repoURL,
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
    await this.codeStore.fetchList({ devops, cluster, ...params, limit: 10000 })

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

  showCodeRepoCreate = () => {
    const { trigger, devops, cluster } = this.props
    trigger?.('codeRepo.create', {
      title: t('IMPORT_CODE_REPO'),
      devops,
      cluster,
      module: 'codeRepos',
      noCodeEdit: true,
      store: this.codeStore,
      isCreatePipeline: true,
      addSvnCodeRepoDirectly: this.addSvnCodeRepoOption,
      success: () => {
        this.getRepoList()
      },
    })
  }

  handleRepoChange = val => {
    const { onChange } = this.props
    const current = this.allOptions.find(({ value }) => value === val)
    onChange && onChange(current ? { ...current?.repo, key: val } : current)
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
        {!!option.icon && (
          <Icon
            name={option.icon ?? ''}
            type={type === 'value' ? 'dark' : 'light'}
          />
        )}
        {option.value}
      </span>
    )
  }

  render() {
    const { value, index, name } = this.props
    return (
      <>
        <TypeSelect
          key={index}
          name={name}
          onFetch={this.getRepoList}
          options={toJS(this.allOptions)}
          onChange={this.handleRepoChange}
          value={value?.key}
          placeholder={{
            icon: 'code',
            label: t('SELECT_CODE_REPOSITORY'),
            description: t('NEED_TO_SYNC_REPO'),
          }}
        />
        <div
          className={cs(styles['multi-repo'], 'form-item-desc')}
          onClick={this.showCodeRepoCreate}
        >
          {t.html('GO_CREATE_REPO_ACTION')}
        </div>
      </>
    )
  }
}
