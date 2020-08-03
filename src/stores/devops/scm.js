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

import { action, observable, toJS } from 'mobx'
import { isArray, get, isEmpty, set } from 'lodash'
import { parseUrl, safeParseJSON, getQueryString } from 'utils'
import { CREDENTIAL_DISPLAY_KEY } from 'utils/constants'
import md5 from 'utils/md5'
import BaseStore from 'stores/devops/base'
import CredentialStore from './credential'

export default class SCMStore extends BaseStore {
  constructor(props) {
    super(props)

    this.verifyAccessErrorHandle = {
      github: (resp, error) => {
        if (!isEmpty(get(error, 'message'))) {
          const err = safeParseJSON(error.message)
          if (err.code === 428) {
            this.isAccessTokenWrong = true
            this.orgList.isLoading = false
            return
          }
          if (window.onunhandledrejection) {
            err.status = error.status
            err.reason = error.reason
            window.onunhandledrejection(err)
          }
          return Promise.reject(error)
        }
      },
      'bitbucket-server': (resp, error) => {
        if (!isEmpty(get(error, 'message'))) {
          const err = safeParseJSON(error.message)

          if (err.code === 428) {
            this.creatBitBucketServersError = {
              password: {
                message: t('Wrong username or password, please try again'),
              },
            }
            return
          }
          if (isArray(err.errors) && !isEmpty(err.errors)) {
            this.creatBitBucketServersError = err.errors.reduce(
              (prev, errorItem) => {
                prev[errorItem.field] = errorItem.message
                return prev
              },
              {}
            )
            return
          }

          this.creatBitBucketServersError = { all: err.message }

          if (window.onunhandledrejection) {
            err.status = error.status
            err.reason = error.reason
            window.onunhandledrejection(err)
          }
          return Promise.reject(error)
        }
      },
    }

    this.credentialStore = new CredentialStore()
  }

  @observable
  credentials = {
    isLoading: false,
    data: [],
  }

  @observable
  orgList = {
    isLoading: false,
    data: [],
  }

  @observable
  getRepoListLoading = false

  @observable
  activeRepoIndex = ''

  @observable
  formData = {}

  @observable
  githubCredentialId = ''

  @observable
  creatBitBucketServersError = {}

  @action
  async getOrganizationList(params, scmType, cluster) {
    this.orgList.isLoading = true
    this.scmType = scmType
    this.orgParams = params
    const result = await this.request.get(
      `${this.getBaseUrlV2({ cluster })}scms/${scmType ||
        'github'}/organizations/?${getQueryString(params)}`
    )
    isArray(result) ? (this.orgList.data = result) : null
    this.orgList.isLoading = false
  }

  @action
  handleChangeActiveRepoIndex(index) {
    this.activeRepoIndex = index
  }

  @action
  async getRepoList({ activeRepoIndex, cluster }) {
    activeRepoIndex =
      activeRepoIndex !== undefined ? activeRepoIndex : this.activeRepoIndex
    this.getRepoListLoading = true
    const pageNumber =
      get(this.orgList.data[activeRepoIndex], 'repositories.nextPage') || 1
    const organizationName =
      this.orgList.data[activeRepoIndex].key ||
      this.orgList.data[activeRepoIndex].name

    const result = await this.request.get(
      `${this.getBaseUrlV2({ cluster })}scms/${this.scmType ||
        'github'}/organizations/${organizationName}/repositories/?${getQueryString(
        {
          ...this.orgParams,
          pageNumber,
          pageSize: 20,
        }
      )}`
    )
    if (result.repositories) {
      const currentRepository = get(
        this.orgList,
        `data[${activeRepoIndex}].repositories`,
        {}
      )
      // insert new repolist in current orglist
      if (isArray(currentRepository.items)) {
        currentRepository.items = currentRepository.items.concat(
          result.repositories.items
        )
        currentRepository.nextPage = result.repositories.nextPage
      } else {
        set(
          this.orgList,
          `data[${activeRepoIndex}].repositories`,
          result.repositories
        )
      }
      this.getRepoListLoading = false
    }
  }

  async putAccessToken({ token, cluster, devops }) {
    const result = await this.verifyAccessForRepo({
      accessToken: token,
      scmType: 'github',
      cluster,
    })

    if (result && result.credentialId) {
      this.githubCredentialId = `github-${token.slice(0, 6)}`

      const data = {
        id: this.githubCredentialId,
        type: CREDENTIAL_DISPLAY_KEY['basic-auth'],
        description: t('Automatically generated by github'),
        [CREDENTIAL_DISPLAY_KEY['basic-auth']]: {
          id: this.githubCredentialId,
          password: token,
          login: 'github',
        },
      }

      const hasCredential = this.credentialStore.list.data.find(
        v => v.name === this.githubCredentialId
      )

      if (!hasCredential) {
        this.createCredential(data, { devops, cluster })
      }

      this.getOrganizationList(
        { credentialId: result.credentialId },
        'github',
        cluster
      )
    }
  }

  async verifyAccessForRepo({ scmType, cluster, devops, ...rest }) {
    return await this.request.post(
      `${this.getBaseUrlV2({ cluster })}scms/${scmType}/verify/`,
      rest,
      null,
      this.verifyAccessErrorHandle[scmType]
    )
  }

  async createCredential(data, { devops, cluster }, rejected) {
    return this.credentialStore.handleCreate(
      data,
      { devops, cluster },
      rejected
    )
  }

  @action
  getCredential = async ({ devops, cluster }) => {
    this.credentials.loading = true
    const result = await this.credentialStore.fetchList({
      devops,
      cluster,
    })

    this.credentials.data = result.map(credential => ({
      label: credential.name,
      value: credential.name,
      type: credential.type,
    }))
    this.credentials.loading = false
    window.pipelineCredentials = toJS(this.credentials) // cache in gloable varibles
  }

  @action
  creatBitBucketServers = async ({
    username,
    password,
    apiUrl,
    cluster,
    devops,
  }) => {
    this.creatBitBucketServersError = {}
    this.tokenFormData = { username, password, apiUrl }
    if (isEmpty(parseUrl(apiUrl))) {
      this.creatBitBucketServersError = {
        apiUrl: {
          message: t('url is invalid'),
        },
      }
      return
    }

    this.bitbucketCredentialId = `bitbucket-${username}-${md5(
      apiUrl + username + password
    ).slice(0, 6)}`

    const result = await this.request.post(
      `${this.getBaseUrlV2({ cluster })}scms/bitbucket-server/servers`,
      {
        apiUrl,
        name: this.bitbucketCredentialId,
      },
      null,
      this.verifyAccessErrorHandle['bitbucket-server']
    )

    if (!result || !result.id) {
      return
    }

    const verifyResult = await this.verifyAccessForRepo({
      apiUrl,
      userName: username,
      password,
      scmType: 'bitbucket-server',
      cluster,
    })

    if (verifyResult && verifyResult.credentialId) {
      this.orgList.isLoading = false

      const data = {
        id: this.bitbucketCredentialId,
        type: CREDENTIAL_DISPLAY_KEY['basic-auth'],
        description: t(`Automatically generated by bitbucket(${username})`),
        [CREDENTIAL_DISPLAY_KEY['basic-auth']]: {
          id: this.bitbucketCredentialId,
          username,
          password,
        },
      }

      const hasCredential = this.credentialStore.list.data.find(
        v => v.name === this.bitbucketCredentialId
      )

      if (!hasCredential) {
        this.createCredential(data, { devops, cluster })
      }

      this.getOrganizationList(
        {
          credentialId: `bitbucket-server:${result.id}`,
          apiUrl,
        },
        'bitbucket-server',
        cluster
      )
    }
  }

  @action
  clearBitbucketErrors = () => {
    this.creatBitBucketServersError = {}
  }

  @action
  resetStore = () => {
    this.orgList = {
      isLoading: false,
      data: [],
    }
    this.activeRepoIndex = ''
    this.githubCredentialId = ''
    this.formData = {}
  }

  @action
  checkCronScript = ({ devops, script, pipeline, cluster }) =>
    this.request.post(
      `${this.getDevopsUrlV2({ cluster })}${devops}/checkCron`,
      {
        cron: script,
        pipelineName: pipeline,
      }
    )
}
