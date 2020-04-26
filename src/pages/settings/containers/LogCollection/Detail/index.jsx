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

// import { get, isFunction, omit } from 'lodash'
// import React from 'react'
// import { computed, toJS } from 'mobx'
// import { observer, inject } from 'mobx-react'

// import { Modal, Notify } from 'components/Base'
// import OutputStore from 'stores/logging/collection/output'
// import EnableForm from 'components/Forms/LoggingCollection/Status'
// import withBack from 'components/Modals/WithBack'
// import DeleteModal from 'components/Modals/Delete'
// import Base from 'core/containers/Base/Detail'
// import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
// import YamlModal from './YamlModal'

// import collectionConfig from '../config'

// import styles from './index.scss'

// @inject('rootStore')
// @observer
// export default class LogCollectionDetail extends Base {
//   get listUrl() {
//     return `/settings/log-collection`
//   }

//   init() {
//     this.store = new OutputStore()
//   }

//   getAttrs = () => [
//     {
//       name: t('Status'),
//       value: get(this.store, 'detail.enabled') ? t('Collecting') : t('Stopped'),
//     },
//   ]

//   // @computed
//   // get savedCollection() {
//   //   return Object.assign({}, this.collection)
//   // }

//   // get baseProps() {
//   //   return {
//   //     detailStore: this.collection,
//   //   }
//   // }

//   // editFormRef = React.createRef()

//   // showNotFound() {
//   //   this.setState({ notFound: true })
//   // }

//   getOperations = () => [
//     {
//       key: 'edit',
//       type: 'control',
//       text: t('Edit'),
//       action: 'edit',
//       disabled: this.store.isLoading,
//       onClick: this.showModal('editLogCollection'),
//     },
//     {
//       key: 'changeStatus',
//       text: t('Change Status'),
//       icon: 'pin',
//       action: 'edit',
//       disabled: this.store.isLoading,
//       onClick: this.showModal('editLoggingStatus'),
//     },
//     {
//       key: 'delete',
//       text: t('Delete Log Collector'),
//       icon: 'trash',
//       action: 'delete',
//       disabled: this.store.isLoading,
//       onClick: this.showModal('deleteModule'),
//     },
//     {
//       key: 'editYaml',
//       text: t('Edit YAML'),
//       icon: 'pen',
//       disabled: this.store.isLoading,
//       action: 'edit',
//       onClick: this.showModal('editYaml'),
//     },
//   ]

//   // handleConfigEdit = newConfig => {
//   //   const collectionType = get(this.savedCollection, 'Name', '')
//   //   const validator = get(collectionConfig, `${collectionType}.validator`)
//   //   if (validator) {
//   //     validator.call(
//   //       this.editFormRef.current,
//   //       this.configEdit.bind(this, newConfig)
//   //     )
//   //   } else {
//   //     this.configEdit.call(this, newConfig)
//   //   }
//   // }

//   // configEdit = newConfig => {
//   //   const { Port } = newConfig
//   //   if (Port) {
//   //     newConfig.Port = String(Port)
//   //   }
//   //   const handerMethod = this.handleEdit('editLogCollection', 'editParameters')
//   //   handerMethod.call(this, newConfig)
//   // }

//   // handleYamlEdit = newConfig => {
//   //   const type = 'editYaml'
//   //   this.store
//   //     .update({
//   //       ...newConfig,
//   //       ...{ id: this.collectionID, enable: this.collection.enable },
//   //     })
//   //     .then(() => {
//   //       this.hideModal(type)()
//   //       Notify.success({ content: `${t('Updated Successfully')}!` })
//   //       this.fetchData()
//   //     })
//   //     .catch(error => {
//   //       Notify.error({ content: String(error) })
//   //     })
//   // }

//   // handleStatusChange = output => {
//   //   const type = 'editLoggingStatus'
//   //   this.store
//   //     .update({ ...output, ...{ enable: Boolean(output.enable) } })
//   //     .then(() => {
//   //       this.hideModal(type)()
//   //       Notify.success({ content: `${t('Updated Successfully')}!` })
//   //       this.fetchData()
//   //     })
//   // }

//   // handleDelete = () => {
//   //   this.store.delete(this.collectionID).then(() => {
//   //     this.hideModal('deleteModule')()
//   //     Notify.success({ content: `${t('Deleted Successfully')}!` })
//   //     this.deleteCallback()
//   //   })
//   // }

//   renderSider() {
//     const collection = this.store.detail
//     const collectionType = get(collection, 'type', '')
//     const Icon = get(collectionConfig, `${collectionType}.ICON`)
//     const name = get(collectionConfig, `${collectionType}.title`, t('Loading'))
//     const icon = Icon ? (
//       <Icon className={styles.icon} width={32} height={32} />
//     ) : (
//       'Loading'
//     )

//     return (
//       <BaseInfo
//         labels={this.labels}
//         icon={icon}
//         name={name}
//         operations={this.getOperations()}
//         attrs={this.getAttrs()}
//       />
//     )
//   }

//   renderModals() {
//     const {
//       editLogCollection,
//       editLoggingStatus,
//       deleteModule,
//       editYaml,
//     } = this.state
//     const collection = this.store.detail
//     const type = get(collection, 'type', '')
//     const editFormTitle = get(collectionConfig, `${type}.title`, () => {})
//     const Form = withBack(get(collectionConfig, `${type}.Form`, () => <div />))

//     return (
//       <div>
//         <Modal.Form
//           icon="timed-task"
//           width={691}
//           title={t('Log Collection')}

//           data={this.savedCollection}
//           onOk={this.handleConfigEdit}

//           visible={editLogCollection}
//           isSubmitting={this.store.isCreating}
//           onCancel={this.hideModal('editLogCollection')}
//           formRef={this.editFormRef}
//         >
//           <Form wrapperTitle={editFormTitle} hiddenBack />
//         </Modal.Form>
//       </div>
//     )
//   }
// }

import React from 'react'
import { trigger } from 'utils/action'
import { get } from 'lodash'
import { observer, inject } from 'mobx-react'
import OutputStore from 'stores/logging/collection/output'
import DetailPage from 'clusters/containers/Base/Detail'
import { Loading } from '@pitrix/lego-ui'
import collectionConfig from '../config'

import routes from './routes'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class LogCollectionDetail extends React.Component {
  store = new OutputStore()

  get listUrl() {
    return `/settings/log-collection`
  }

  get routing() {
    return this.props.rootStore.routing
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    this.store.fetchDetail({ name: this.props.match.params.name })
  }

  getAttrs() {
    return [
      {
        name: t('Status'),
        value: get(this.store, 'detail.enabled')
          ? t('Collecting')
          : t('Stopped'),
      },
    ]
  }

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('Edit'),
      action: 'edit',
      onClick: () => {
        this.trigger('log.collection.edit', {
          store: this.store,
        })
      },
    },
    {
      key: 'changeStatus',
      text: t('Change Status'),
      icon: 'pin',
      action: 'edit',
      onClick: () =>
        this.trigger('log.collection.active.switch', {
          data: {
            enabled: Number(this.store.detail.enabled),
          },
          success: this.fetchData,
        }),
    },
    {
      key: 'delete',
      text: t('Delete Log Collector'),
      icon: 'trash',
      action: 'delete',
      onClick: () =>
        this.trigger('resource.delete', {
          type: t(this.name),
          detail: this.store.detail,
          success: () => this.routing.push(this.listUrl),
        }),
    },
    {
      key: 'editYaml',
      text: t('Edit YAML'),
      icon: 'pen',
      action: 'edit',
      onClick: () => {
        this.trigger('resource.yaml.edit', {
          detail: this.store.detail,
          success: this.fetchData,
        })
      },
    },
  ]

  render() {
    const stores = { detailStore: this.store }
    const collection = this.store.detail
    const collectionType = get(collection, 'type', '')
    const Icon = get(collectionConfig, `${collectionType}.ICON`)
    const name = get(collectionConfig, `${collectionType}.title`, t('Loading'))
    const icon = Icon ? (
      <Icon className={styles.icon} width={32} height={32} />
    ) : (
      'Loading'
    )

    if (this.store.isLoading) {
      return <Loading className="ks-page-loading" />
    }

    const sideProps = {
      module: this.module,
      name,
      icon,
      operations: this.getOperations(),
      attrs: this.getAttrs(),
      breadcrumbs: [
        {
          label: t('Log Collection'),
          url: this.listUrl,
        },
      ],
    }

    return (
      <DetailPage
        stores={stores}
        routes={routes.filter(
          route => !route.required || route.required(this.store.detail)
        )}
        sideProps={sideProps}
      />
    )
  }
}
