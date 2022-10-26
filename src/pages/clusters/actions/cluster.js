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

import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import { get, isEmpty } from 'lodash'
import ClusterVisibility from 'clusters/components/Modals/ClusterVisibility'

import WorkspaceStore from 'stores/workspace'

export default {
  'cluster.visibility.edit': {
    on({ store, success, cluster, ...props }) {
      const workspaceStore = new WorkspaceStore()
      const modal = Modal.open({
        onOk: async data => {
          if (!data) {
            return Modal.close(modal)
          }

          if (globals.user.globalRules.clusters.includes('manage')) {
            await store.patch(
              { name: store.detail.name },
              {
                metadata: {
                  labels: {
                    'cluster.kubesphere.io/visibility': data.public
                      ? 'public'
                      : 'private',
                  },
                },
              }
            )
          }

          const requests = []
          if (data.addWorkspaces) {
            data.addWorkspaces.forEach(item => {
              let params
              const clustersField = get(
                item,
                '_originData.spec.placement.clusters',
                {}
              )
              if (isEmpty(clustersField)) {
                params = [
                  {
                    op: 'add',
                    path: '/spec/placement',
                    value: {
                      clusters: [
                        {
                          name: cluster.name,
                        },
                      ],
                    },
                  },
                ]
              } else {
                params = [
                  {
                    op: 'add',
                    path: '/spec/placement/clusters/-',
                    value: { name: cluster.name },
                  },
                ]
              }

              requests.push(workspaceStore.editVisible(item, params))
            })
          }
          if (data.deleteWorkspaces) {
            data.deleteWorkspaces.forEach(item => {
              const clusters = item.clusters.map(_item => _item.name) || []
              const deleteIndex = clusters.indexOf(cluster.name)

              const params = [
                {
                  op: 'remove',
                  path: `/spec/placement/clusters/${deleteIndex}`,
                  value: { name: cluster.name },
                },
              ]

              requests.push(workspaceStore.editVisible(item, params))
            })
          }

          await Promise.all(requests)

          Modal.close(modal)
          success && success()
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
        },
        modal: ClusterVisibility,
        store,
        cluster,
        ...props,
      })
    },
  },
}
