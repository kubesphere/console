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

import Base from 'core/containers/Base/Detail/Page'
import ClusterStore from 'stores/cluster'
import ProjectStore from 'stores/project'

export default class DetailPage extends Base {
  async init() {
    const { cluster, namespace } = this.props.match.params
    if (cluster) {
      this.stores.clusterStore = new ClusterStore()
      this.stores.projectStore = new ProjectStore()

      await this.stores.clusterStore.fetchDetail({ name: cluster })
      await this.stores.projectStore.fetchDetail({ cluster, namespace })
    }

    this.setState({ initializing: false })
  }
}
