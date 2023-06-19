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
import { action } from 'mobx'
import Base from './base'

export default class SecretStore extends Base {
  module = 'secrets'

  @action
  async validateImageRegistrySecret({
    fedFormTemplate,
    cluster,
    namespace,
    name,
  }) {
    const result = {
      validate: true,
      reason: '',
    }

    await request.post(
      ` kapis/resources.kubesphere.io/v1alpha3${this.getPath({
        namespace,
        cluster,
      })}/registrysecrets/${name}/verify`,
      fedFormTemplate,
      {},
      (_, err) => {
        const msg = get(err, 'message', '')
        if (msg) {
          result.reason = t(msg)
        }
        result.validate = false
      }
    )

    return result
  }

  @action
  async setDefault(params, prevParams) {
    if (prevParams.name) {
      await this.patch(prevParams, {
        metadata: {
          annotations: {
            'secret.kubesphere.io/is-default-class': 'false',
          },
        },
      })
    }
    return this.patch(params, {
      metadata: {
        annotations: {
          'secret.kubesphere.io/is-default-class': 'true',
        },
      },
    })
  }
}
