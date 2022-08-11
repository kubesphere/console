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
import { get, isEmpty } from 'lodash'
import { observer, inject } from 'mobx-react'
import { Loading } from '@kube-design/components'

import { getDisplayName, compareVersion } from 'utils'
import { trigger } from 'utils/action'
import { toJS, observable } from 'mobx'
import StorageClassStore from 'stores/storageClass'
import AccessorStore from 'stores/accessor'
import ValidateWebhookCFStore from 'stores/validateWebhookCF'
import CrdStore from 'stores/crd'
import FORM_TEMPLATES from 'utils/form.templates'

import DetailPage from 'clusters/containers/Base/Detail'

import routes from './routes'

@inject('rootStore')
@observer
@trigger
export default class StorageClassDetail extends React.Component {
  store = new StorageClassStore()

  accessorStore = new AccessorStore()

  validateWebhookCFStore = new ValidateWebhookCFStore()

  CrdStore = new CrdStore()

  state = {
    shouldAddCrd: false,
  }

  @observable
  ksVersion = ''

  componentDidMount() {
    this.store.fetchList({ limit: -1 })
    this.fetchData()
  }

  get defaultStorageClass() {
    const { data } = toJS(this.store.list)

    const defaultStorageClass = data.find(item => item.default) || {}

    return defaultStorageClass
  }

  get name() {
    return 'STORAGE_CLASS'
  }

  get module() {
    return 'storageclasses'
  }

  get listUrl() {
    const { cluster } = this.props.match.params
    return `/clusters/${cluster}/storageclasses`
  }

  fetchData = async () => {
    const { params } = this.props.match
    this.ksVersion = await this.accessorStore.getKsVersion(params)
    await this.store.fetchDetail(params)
  }

  checkAccessorExist = async () => {
    const { params } = this.props.match

    if (compareVersion(`${this.ksVersion}`, 'v3.3') < 0) {
      // check if k8s supports accessor resource
      Promise.all([
        this.validateWebhookCFStore.fetchDetailWithoutWarning({
          ...params,
          name: 'storageclass-accessor.storage.kubesphere.io',
        }),
        this.CrdStore.fetchDetailWithoutWarning({
          ...params,
          name: 'accessors.storage.kubesphere.io',
        }),
      ]).then(async ([validate, crd]) => {
        const { urlNotSupport: u1 } = validate
        const { urlNotSupport: u2 } = crd
        if (u1 || u2) {
          this.setState({
            shouldAddCrd: true,
          })
        } else if (!isEmpty(validate) && !isEmpty(crd)) {
          await this.checkHasAccessor()
        }
      })
    } else {
      await this.checkHasAccessor()
    }
  }

  checkHasAccessor = async () => {
    const { params } = this.props.match
    const storageClassName = get(this.store.detail, 'name')
    const detail = await this.accessorStore.fetchDetailWithoutWarning({
      ...params,
      name: `${storageClassName}-accessor`,
    })
    if (detail.urlNotSupport) {
      this.setState({
        shouldAddCrd: true,
      })
    } else if (isEmpty(detail)) {
      const template = FORM_TEMPLATES['accessors'](storageClassName)
      await this.accessorStore.create(template, { ...params })
      await this.accessorStore.fetchDetail({
        cluster: params.cluster,
        name: `${params.name}-accessor`,
      })
    }
  }

  getOperations = () => {
    const { cluster } = this.props.match.params
    const show = compareVersion(`${this.ksVersion}`, 'v3.3') >= 0
    return [
      {
        key: 'editYaml',
        type: 'default',
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: () =>
          this.trigger('resource.yaml.edit', {
            detail: toJS(this.store.detail),
            readOnly: false,
            success: this.fetchData,
          }),
      },
      {
        key: 'setDefault',
        icon: 'pen',
        text: t('SET_AS_DEFAULT_STORAGE_CLASS'),
        action: 'edit',
        onClick: () =>
          this.trigger('storageclass.set.default', {
            detail: toJS(this.store.detail),
            defaultStorageClass: this.defaultStorageClass.name,
            success: this.fetchData,
          }),
      },
      {
        key: 'accessor',
        icon: () => (
          <>
            <img
              src="/assets/storageclass-tree.svg"
              style={{ width: '16px', marginRight: '12px' }}
            />
          </>
        ),
        text: t('SET_AUTHORIZATION_RULES'),
        action: 'edit',
        show,
        onClick: async () => {
          await this.checkAccessorExist()
          this.trigger('storageclass.accessor', {
            storageClassName: get(this.store.detail, 'name'),
            shouldAddCrd: this.state.shouldAddCrd,
            store: this.accessorStore,
            detail: toJS(this.accessorStore.detail),
            cluster,
            success: this.fetchData,
          })
        },
      },
      {
        key: 'funcManage',
        icon: 'slider',
        text: t('SET_VOLUME_OPERATIONS'),
        action: 'edit',
        onClick: () =>
          this.trigger('storageclass.volume.function.update', {
            detail: toJS(this.store.detail),
            StorageClassStore: this.store,
            success: this.fetchData,
          }),
      },
      {
        key: 'autoResizer',
        icon: () => (
          <>
            <img
              src="/assets/storageclass_autoresizer.svg"
              style={{ width: '16px', marginRight: '12px' }}
            />
          </>
        ),
        text: t('SET_AUTO_EXPANSION'),
        action: 'edit',
        disabled:
          !show || !get(toJS(this.store.detail), 'allowVolumeExpansion', false),
        onClick: () =>
          this.trigger('storageclass.pvc.autoresizer', {
            detail: toJS(this.store.detail),
            StorageClassStore: this.store,
            success: this.fetchData,
          }),
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        type: 'danger',
        onClick: () =>
          this.trigger('storageclass.delete', {
            type: this.name,
            detail: toJS(this.store.detail),
            accessorStore: this.accessorStore,
            cluster,
            success: this.returnTolist,
          }),
      },
    ]
  }

  getAttrs = () => {
    const { detail = {} } = this.store

    if (isEmpty(detail)) return null

    return [
      {
        name: t('PROVISIONER'),
        value: detail.provisioner,
      },
      {
        name: t('DEFAULT_STORAGE_CLASS'),
        value: detail.default ? t('YES') : '-',
      },
      {
        name: t('ALLOW_VOLUME_EXPANSION'),
        value: detail.allowVolumeExpansion ? t('TRUE') : t('FALSE'),
      },
      {
        name: t('RECLAIM_POLICY'),
        value: detail.reclaimPolicy,
      },
      {
        name: t('ALLOW_VOLUME_SNAPSHOT'),
        value: detail.supportSnapshot ? t('TRUE') : t('FALSE'),
      },
    ]
  }

  returnTolist = () => {
    this.props.rootStore.routing.push(this.listUrl)
  }

  render() {
    const stores = { detailStore: this.store }

    if (this.store.isLoading && !this.store.detail.name) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name: getDisplayName(this.store.detail),
      desc: this.store.detail.description,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('STORAGE_CLASS_PL'),
          url: this.listUrl,
        },
      ],
    }

    return <DetailPage stores={stores} routes={routes} {...sideProps} />
  }
}
