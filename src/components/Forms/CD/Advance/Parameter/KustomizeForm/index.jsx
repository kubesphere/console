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
import { PropertiesInput } from 'components/Inputs'
import { Form, Input, Columns, Column } from '@kube-design/components'
import ImagesInput from '../ImagesInput'

export default class KustomizeForm extends React.Component {
  render() {
    const { formRef, formData } = this.props
    return (
      <Form data={formData} type="inner" ref={formRef}>
        <Columns>
          <Column>
            <Form.Item label={t('NAME_PREFIX')}>
              <Input name="kustomize.namePrefix" />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('NAME_SUFFIX')}>
              <Input name="kustomize.nameSuffix" />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item label={t('IMAGES')}>
          <ImagesInput name="kustomize.images" formData={formData} />
        </Form.Item>
        <Form.Item label={t('COMMON_LABELS')}>
          <PropertiesInput
            name="kustomize.commonLabels"
            addText={t('ADD')}
          ></PropertiesInput>
        </Form.Item>
        <Form.Item label={t('COMMON_ANNOTATIONS')}>
          <PropertiesInput
            name="kustomize.commonAnnotations"
            addText={t('ADD')}
          ></PropertiesInput>
        </Form.Item>
      </Form>
    )
  }
}
