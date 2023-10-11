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

import { get } from 'lodash'
import { action, observable } from 'mobx'

import BaseStore from '../devops'

export default class PipelineRunStore extends BaseStore {
  @observable stepLogData = {
    log: '',
    start: 0,
    hasMore: false,
  }

  async getStepLog({ devops, cluster, name, branch, runId, nodeId, stepId }) {
    const headers = branch
      ? {}
      : {
          'x-file-size-limit': 1024 * 1024 * 5,
        }
    const result = await request.defaults({
      url: `${this.getDevopsUrlV2({
        cluster,
        devops,
      })}pipelines/${decodeURIComponent(name)}${
        branch ? `/branches/${encodeURIComponent(branch)}` : ''
      }/runs/${runId}/nodes/${nodeId}/steps/${stepId}/log/?start=${this
        .stepLogData.start || 0}`,
      options: { headers },
      handler: resp => {
        if (resp.status === 200) {
          return resp.text().then(res => ({ data: res, headers: resp.headers }))
        }
      },
    })
    const prevLog = !this.stepLogData.start ? '' : this.stepLogData.log
    this.stepLogData = {
      log: prevLog + get(result, 'data', ''),
      start: result.headers.get('x-text-size'),
      hasMore: Boolean(result.headers.get('x-more-data')),
    }
    if (
      result.headers.get('X-File-Size-Limit-Out') === 'true' ||
      this.log?.length > 1024 * 1024 * 5
    ) {
      this.stepLogData.hasMore = false
      this.stepLogData.log += `\n
*****************************************************************   
*                                                               * 
* The log is too large, please download it to view the details. *
*                                                               * 
*****************************************************************    
      `
    }
  }

  @action
  handleResetStepLog = () => {
    this.stepLogData = {
      log: '',
      start: 0,
      hasMore: false,
    }
  }
}
