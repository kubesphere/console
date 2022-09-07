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
import { isArray, isEmpty, get } from 'lodash'
import { parseUrl, getQueryString, compareVersion, generateId } from 'utils'

import qs from 'qs'
import BaseStore from '../devops'

import CredentialStore from './credential'

export default class SCMStore extends BaseStore {
  constructor(props) {
    super(props)

    this.credentialStore = new CredentialStore()
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
              message: t('INCORRECT_USERNAME_OR_PASSWORD'),
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
  }

  get isMultiCluster() {
    return globals.ksConfig.multicluster
  }

  @observable
  isAccessTokenWrong = false

  @observable
  credentials = {
    isLoading: false,
    data: [],
  }

  @observable
  orgList = {
    isLoading: false,
    data: [],
    isEnd: false,
    pagination: {
      pageNumber: 1,
      pageSize: 100,
    },
  }

  @observable
  repoList = {
    isLoading: false,
    data: [],
    isEnd: false,
    pagination: {
      pageNumber: 1,
      pageSize: 100,
    },
  }

  @observable
  activeRepoIndex = ''

  @observable
  formData = {}

  @observable
  creatBitBucketServersError = {}

  @observable
  orgParams = {}

  getClusterVersion = cluster =>
    this.isMultiCluster
      ? get(globals, `clusterConfig.${cluster}.ksVersion`)
      : get(globals, 'ksConfig.ksVersion')

  isNeedUpdate = cluster => {
    return compareVersion(this.getClusterVersion(cluster), '3.3.0') < 0
  }

  @action
  async getOrganizationList(
    { pageNumber = 1, pageSize = 100, more = false, credentialId, ...params },
    scmType,
    cluster
  ) {
    this.orgList.isLoading = true
    this.scmType = scmType
    this.orgParams = params

    const url = `${this.getDevopsUrlV3({ cluster })}scms/${scmType ||
      'github'}/organizations?${getQueryString(
      { pageNumber, pageSize, ...params },
      false
    )}`

    const oldUrl = `${this.getDevopsUrlV2({ cluster })}scms/${scmType ||
      'github'}/organizations/?${getQueryString(
      { ...params, credentialId },
      false
    )}`

    const result = await request
      .get(this.isNeedUpdate(cluster) ? oldUrl : url)
      .catch(() => {
        return []
      })

    if (isArray(result)) {
      this.orgList.data = more ? [...this.orgList.data, ...result] : result
    }

    this.orgList.isLoading = false
    this.orgList.isEnd = result.length < pageSize
    this.orgList.pagination = { pageSize, pageNumber }
    return this.orgList
  }

  @action
  handleChangeActiveRepoIndex(index) {
    this.activeRepoIndex = index
  }

  @action
  handleChangeAccessTokenWrong() {
    this.isAccessTokenWrong = false
  }

  @action
  async getRepoList({
    cluster,
    activeRepoIndex,
    pageNumber = 1,
    pageSize = 100,
    more = false,
  }) {
    const _activeRepoIndex =
      activeRepoIndex !== undefined
        ? activeRepoIndex
        : this.activeRepoIndex === ''
        ? 0
        : this.activeRepoIndex

    const scmType = this.scmType || 'github'

    const organizationName = this.isNeedUpdate(cluster)
      ? scmType === 'bitbucket-server'
        ? this.orgList.data[_activeRepoIndex].key
        : this.orgList.data[_activeRepoIndex].name
      : this.orgList.data[_activeRepoIndex].name

    this.repoList.isLoading = true

    const url = `${
      this.isNeedUpdate(cluster)
        ? this.getDevopsUrlV2({
            cluster,
          })
        : this.getDevopsUrlV3({
            cluster,
          })
    }scms/${scmType}/organizations/${organizationName}/repositories?${getQueryString(
      {
        ...this.orgParams,
        pageNumber,
        pageSize,
      },
      false
    )}`

    const result = await request.get(url, {}, null, (res, err) => {
      this.repoList.isLoading = false
      this.repoList.data = []
      if (window.onunhandledrejection) {
        window.onunhandledrejection(err)
      }
      return Promise.reject(err)
    })

    if (result.repositories) {
      // insert new repolist in current orglist
      if (isArray(toJS(this.repoList.data))) {
        this.repoList.data = more
          ? [...this.repoList.data, ...result.repositories.items]
          : [...result.repositories.items]
        this.repoList.isEnd = result.repositories.items.length < pageSize
        this.repoList.pagination = { pageSize, pageNumber }
      } else {
        this.repoList.data = result.repositories
      }
    }
    this.repoList.isLoading = false

    return this.repoList
  }

  async putAccessName({ secretName, secretNamespace, cluster, token }) {
    this.isAccessTokenWrong = false

    const result = await this.verifySecretForRepo(
      { secret: secretName, secretNamespace },
      {
        scmType: 'github',
        cluster,
        accessToken: token,
      }
    )

    if (result && result.credentialId) {
      await this.getOrganizationList(
        {
          secret: secretName,
          secretNamespace,
          includeUser: true,
          credentialId: result.credentialId,
        },
        'github',
        cluster
      )
    }
  }

  async verifySecretForRepo(
    params,
    { scmType, cluster, devops, accessToken, ...rest }
  ) {
    let _type = scmType

    if (/https:\/\/bitbucket.org\/?/gm.test(`${rest.apiUrl}`)) {
      _type = 'bitbucket_cloud'
    }

    const old = `${this.getDevopsUrlV2({ cluster })}scms/${_type}/verify/`

    const url = `${this.getDevopsUrlV3({
      cluster,
    })}scms/${_type}/verify?${getQueryString(params, false)}`

    return await request.post(
      this.isNeedUpdate(cluster) ? old : url,
      this.isNeedUpdate(cluster) ? { ...rest, accessToken } : rest,
      null,
      this.verifyAccessErrorHandle[scmType]
    )
  }

  @action
  getCredentials = async params => {
    this.credentials.loading = true
    await this.credentialStore.fetchList({
      ...params,
    })
    this.credentials = this.credentialStore.list
    this.credentials.loading = false
  }

  getCredentialDetail = async params => {
    await this.credentialStore.fetchDetail(params)
    return this.credentialStore.detail
  }

  createCredential = async (data, params) => {
    await this.credentialStore.handleCreate(data, params)
  }

  @action
  creatBitBucketServers = async ({
    apiUrl,
    cluster,
    secretName,
    secretNamespace,
    username,
    password,
  }) => {
    this.creatBitBucketServersError = {}

    this.tokenFormData = {
      username,
      password,
      apiUrl,
      credentialId: secretName,
    }

    if (isEmpty(parseUrl(apiUrl))) {
      this.creatBitBucketServersError = {
        apiUrl: {
          message: isEmpty(apiUrl)
            ? t('BITBUCKET_ADDRESS_EMPTY_TIP')
            : t('BITBUCKET_ADDRESS_INVALID_TIP'),
        },
      }
      return
    }

    if (this.isNeedUpdate(cluster)) {
      let result = { id: generateId(4) }

      if (!/https:\/\/bitbucket.org\/?/gm.test(`${apiUrl}`)) {
        result = await request.post(
          `${this.getDevopsUrlV2({ cluster })}scms/bitbucket-server/servers`,
          {
            apiUrl,
            name: secretName,
          },
          null,
          this.verifyAccessErrorHandle['bitbucket-server']
        )
      }

      if (!result || !result.id) {
        return
      }

      const verifyResult = await this.verifySecretForRepo(
        {},
        {
          apiUrl,
          scmType: 'bitbucket-server',
          cluster,
          userName: username,
          password,
        }
      )

      if (verifyResult && verifyResult.credentialId) {
        this.orgList.isLoading = false
        this.getOrganizationList(
          {
            credentialId: verifyResult.credentialId,
            apiUrl,
          },
          verifyResult.credentialId,
          cluster
        )
      }
    } else {
      const verifyResult = await this.verifySecretForRepo(
        {
          secret: secretName,
          secretNamespace,
          server: apiUrl,
        },
        {
          scmType: 'bitbucket-server',
          cluster,
          apiUrl,
        }
      )

      if (verifyResult && verifyResult.code === 0) {
        this.orgList.isLoading = false
        await this.getOrganizationList(
          {
            secret: secretName,
            secretNamespace,
            server: apiUrl,
          },
          'bitbucket-server',
          cluster
        )
      } else if (verifyResult && verifyResult.code !== 0) {
        this.creatBitBucketServersError = {
          apiUrl: {
            message: verifyResult.message,
          },
        }
      }
    }
  }

  @action
  clearBitbucketErrors = () => {
    this.creatBitBucketServersError = {}
  }

  getBitbucketList = async ({ cluster }) => {
    const result = await request.get(
      `${this.getDevopsUrlV2({ cluster })}scms/bitbucket-server/servers`
    )

    let bitbucketServerList = []

    if (!isEmpty(result) && isArray(result)) {
      bitbucketServerList = result.map(item => {
        return { label: item.apiUrl, value: item.apiUrl }
      })
    } else {
      bitbucketServerList = [
        {
          label: 'https://bitbucket.org',
          value: 'https://bitbucket.org',
        },
      ]
    }

    return bitbucketServerList
  }

  @action
  resetStore = () => {
    this.orgList = {
      isLoading: false,
      data: [],
    }
    this.activeRepoIndex = ''
    this.isAccessTokenWrong = false
    this.formData = {}
    this.tokenFormData = {}
    this.creatBitBucketServersError = {}
  }

  @action
  checkCronScript = ({ devops, script, pipeline, cluster }) =>
    request.post(`${this.getDevopsUrlV2({ cluster, devops })}checkCron`, {
      cron: script,
      name: pipeline,
    })

  @action
  fetchGitLabServerList = async ({ cluster, devops }) => {
    const url = `${this.getDevopsUrlV2({
      cluster,
      devops,
    })}jenkins/gitlab/serverList`

    const result = await request.post(url, {}, {}, () => {
      return []
    })

    let serverList = []

    if (result.status === 'ok' && isArray(result.data)) {
      serverList = result.data.map(item => {
        return { label: item.name, value: item.name }
      })
    }

    return serverList
  }

  @action
  fetchGitLabProjectList = async ({ cluster, devops, server, owner }) => {
    let url = `${this.getDevopsUrlV2({
      cluster,
      devops,
    })}jenkins/gitlab/projectList`

    url += `?${qs.stringify({ server, owner })}`

    const result = await request.post(url, {}, {}, () => {
      return []
    })

    if (result.status === 'ok' && isArray(result.data)) {
      return result.data
    }

    return []
  }
}
