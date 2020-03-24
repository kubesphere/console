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
import { ReactComponent as BackIcon } from 'src/assets/back.svg'

import Steps from './Steps'
import Providers from './Providers'
import BaseInfo from './BaseInfo'
import Configuration from './Configuration'
import Components from './Components'
import AdvanceSettings from './AdvanceSettings'
import styles from './index.scss'

export default class AddCluster extends React.Component {
  state = {
    currentStep: 'providers',
    formTemplate: {},
  }

  steps = [
    {
      name: 'providers',
      component: Providers,
    },
    {
      name: 'baseinfo',
      component: BaseInfo,
    },
    {
      name: 'configuration',
      component: Configuration,
    },
    {
      name: 'components',
      component: Components,
    },
    {
      name: 'settings',
      component: AdvanceSettings,
    },
  ]

  handleAdd = () => {}

  handleNextStep = () => {}

  render() {
    const { currentStep, formTemplate } = this.state
    return (
      <div className={styles.wrapper}>
        {currentStep !== 'providers' && (
          <div className="h6 margin-b12">
            <a className="custom-icon" onClick={this.handleGoBack}>
              <BackIcon />
            </a>
            {t('Go back')}
          </div>
        )}
        <div className={styles.title}>
          <div className="h4">{t('Add New Cluster')}</div>
          <p>{t('ADD_NEW_CLUSTER_DESC')}</p>
        </div>
        <Form data={formTemplate} onSubmit={this.handleAdd}>
          <Steps
            current={currentStep}
            steps={this.steps}
            onNext={this.handleNextStep}
          />
        </Form>
      </div>
    )
  }
}
