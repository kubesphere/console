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

import { Modal, Notify } from 'components/Base'

import DeployAppModal from 'projects/components/Modals/DeployApp'
import CreateAppModal from 'projects/components/Modals/CreateApp'

export default {
  'app.deploy': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
        },
        modal: DeployAppModal,
        store,
        ...props,
      })
    },
  },
  'crd.app.create': {
    on({ store, cluster, namespace, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.create(data, { cluster, namespace }).then(() => {
            Modal.close(modal)
            success &&
              success(
                `/cluster/${cluster}/projects/${namespace}/applications/composing`
              )
          })
        },
        store,
        cluster,
        namespace,
        modal: CreateAppModal,
        ...props,
      })
    },
  },
  'crd.app.addcomponent': {
    on({ store, detail, cluster, namespace, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store
            .addComponent(data, { name: detail.name, cluster, namespace })
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Add Component Successfully')}!` })
              success && success()
            })
        },
        store,
        detail,
        cluster,
        namespace,
        modal: CreateAppModal,
        ...props,
      })
    },
  },
}
