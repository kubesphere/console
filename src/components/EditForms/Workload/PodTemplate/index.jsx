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

import { Form } from 'components/Base'
import Base from 'components/Forms/Workload/ContainerSettings'

export default class PodTemplate extends Base {
  get formTemplate() {
    return this.props.formTemplate
  }

  handleContainer = data => {
    const { formProps } = this.props
    Base.prototype.handleContainer.call(this, data)

    formProps.onChange()
  }

  render() {
    const { formRef, formProps } = this.props
    const { showContainer, selectContainer } = this.state

    if (showContainer) {
      return this.renderContainerForm(selectContainer)
    }

    return (
      <Form data={this.formTemplate} ref={formRef} {...formProps}>
        {this.renderContainerList()}
      </Form>
    )
  }
}
