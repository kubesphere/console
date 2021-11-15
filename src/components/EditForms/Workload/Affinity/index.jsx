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

import { Form } from '@kube-design/components'
import AffinityForm from 'components/Forms/Workload/ContainerSettings/Affinity'

class Affinity extends React.Component {
  render() {
    const {
      formTemplate,
      formRef,
      formProps,
      module,
      cluster,
      namespace,
    } = this.props

    return (
      <div className="margin-t12">
        <Form data={formTemplate} ref={formRef} {...formProps}>
          <AffinityForm
            formProps={formProps}
            data={formTemplate}
            module={module}
            cluster={cluster}
            namespace={namespace}
          />
        </Form>
      </div>
    )
  }
}

export default Affinity
