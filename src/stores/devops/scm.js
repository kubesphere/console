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
import { parseUrl, getQueryString, generateId } from 'utils'
import { CREDENTIAL_DISPLAY_KEY } from 'utils/constants'

import BaseStore from 'stores/devops/base'
import CredentialStore from './credential'

export default class SCMStore extends BaseStore {
  constructor(props) {
    super(props)

    this.verifyAccessErrorHandle = {
      github: (resp, error) => {
        const errorBody = error.headers ? resp : error
        if (error.code === 428) {
          this.isAccessTokenWrong = true
          this.orgList.isLoading = false
          return
        }

        if (window.onunhandledrejection) {
          window.onunhandledrejection(errorBody)
        }

        return Promise.reject(errorBody)
      },
      'bitbucket-server': (resp, error) => {
        const errorBody = error.headers ? resp : error

        if (errorBody.code === 428) {
          this.creatBitBucketServersError = {
            password: {
              message: t('Wrong username or password, please try again'),
            },
          }
          return
        }

        if (isArray(errorBody.errors) && !isEmpty(errorBody.errors)) {
          this.creatBitBucketServersError = errorBody.errors.reduce(
            (prev, errorItem) => {
              prev[errorItem.field] = { message: errorItem.message }
              return prev
            },
            {}
          )
          return
        }

        this.creatBitBucketServersError = { all: errorBody.message }

        if (window.onunhandledrejection) {
          window.onunhandledrejection(errorBody)
        }

        return Promise.reject(errorBody)
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
        'github'}/organizations/?${getQueryString(params, false)}`
    )

    if (isArray(result)) {
      this.orgList.data = result
    }

    this.orgList.isLoading = false
  }

  @action
  handleChangeActiveRepoIndex(index) {
    this.activeRepoIndex = index
  }

  @action
  async getRepoList({ activeRepoIndex, cluster }) {
    const _activeRepoIndex =
      activeRepoIndex !== undefined
        ? activeRepoIndex
        : this.activeRepoIndex === ''
        ? 0
        : this.activeRepoIndex

    const scmType = this.scmType || 'github'
    const pageNumber =
      get(this.orgList.data[_activeRepoIndex], 'repositories.nextPage') || 1

    const organizationName =
      this.orgList.data[_activeRepoIndex].key ||
      this.orgList.data[_activeRepoIndex].name

    this.getRepoListLoading = true

    const result = await this.request.get(
      `${this.getBaseUrlV2({
        cluster,
      })}scms/${scmType}/organizations/${
        scmType === 'bitbucket-server'
          ? `~${organizationName}`
          : organizationName
      }/repositories/?${getQueryString(
        {
          ...this.orgParams,
          pageNumber,
          pageSize: 20,
        },
        false
      )}`,
      {},
      null,
      (res, err) => {
        this.getRepoListLoading = false
        set(this.orgList, `data[${_activeRepoIndex}].repositories.item`, [])
        if (window.onunhandledrejection) {
          window.onunhandledrejection(err)
        }
        return Promise.reject(err)
      }
    )

    if (result.repositories) {
      const currentRepository = get(
        this.orgList,
        `data[${_activeRepoIndex}].repositories`,
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
          `data[${_activeRepoIndex}].repositories`,
          result.repositories
        )
      }
    }
    this.getRepoListLoading = false
  }

  async putAccessToken({ token, cluster, devops }) {
    const result = await this.verifyAccessForRepo({
      accessToken: token,
      scmType: 'github',
      cluster,
    })

    if (result && result.credentialId) {
      this.githubCredentialId = `github-${token.slice(0, 6)}-${generateId(5)}`

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
  getCredentials = async params => {
    this.credentials.loading = true
    await this.credentialStore.fetchList({
      ...params,
    })
    this.credentials = this.credentialStore.list
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

    this.bitbucketCredentialId = `bitbucket-${username}-${generateId(5)}`

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
    this.tokenFormData = {}
    this.creatBitBucketServersError = {}
  }

  @action
  checkCronScript = ({ devops, script, pipeline, cluster }) =>
    this.request.post(
      `${this.getDevopsUrlV2({ cluster })}${devops}/checkCron`,
      {
        cron: script,
        name: pipeline,
      }
    )
}
