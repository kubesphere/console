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

import AdvanceSettings from 'components/Forms/Pipelines/AdvanceSettings'
import BaseInfo from 'components/Forms/Pipelines/BaseInfo'

import PipelineTemplate from 'components/Forms/Pipelines/PipelineTemplate'
import PipelineTemplateParams from 'components/Forms/Pipelines/PipelineTemplateParams'
import PipelineTemplateParamsOld from 'components/Forms/Pipelines/PipelineTemplateParams/old'

export const PIPELINE_PROJECT_CREATE_STEPS = [
  {
    title: 'BASIC_INFORMATION',
    component: BaseInfo,
    icon: 'cdn',
    required: true,
  },
  {
    title: 'ADVANCED_SETTINGS',
    component: AdvanceSettings,
    required: true,
  },
]

export const PIPELINE_CREATE_STEPS = [
  {
    title: 'SELECT_TEMPLATE',
    component: PipelineTemplate,
    required: true,
  },
  {
    title: 'PARAMETER_CONFIG',
    component: PipelineTemplateParams,
    required: true,
    icon: 'slider',
  },
]

export const PIPELINE_CREATE_STEPS_OLD = [
  {
    title: 'SELECT_TEMPLATE',
    component: PipelineTemplate,
    required: true,
  },
  {
    title: 'PARAMETER_CONFIG',
    component: PipelineTemplateParamsOld,
    required: true,
    icon: 'slider',
  },
]
