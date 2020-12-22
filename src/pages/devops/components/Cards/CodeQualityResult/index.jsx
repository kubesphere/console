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
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { get } from 'lodash'
import { Card } from 'components/Base'
import { Icon } from '@kube-design/components'
import { parseUrl } from 'utils'

import StatusCard from './StatusCard'
import styles from './index.scss'

class CodeQualityResult extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    loading: PropTypes.bool,
  }

  get sonarqubeOrigin() {
    const { sonarqubeDashboardUrl } = this.props.detail

    return (
      get(globals, 'config.devops.sonarqubeURL') ||
      parseUrl(sonarqubeDashboardUrl).origin
    )
  }

  goToSonarqube = () => {
    const { sonarqubeDashboardUrl } = this.props.detail
    const customUrl = get(globals, 'config.devops.sonarqubeURL')
    if (customUrl) {
      const parsedUrlObj = parseUrl(sonarqubeDashboardUrl)
      const dashbordUrl =
        customUrl +
        get(parsedUrlObj, 'pathname', '') +
        get(parsedUrlObj, 'search', '')
      window.open(dashbordUrl)
      return
    }
    window.open(sonarqubeDashboardUrl)
  }

  renderTotalResult = () => {
    const { totalStatus } = this.props.detail
    const isPassed = totalStatus !== 'ERROR'
    return (
      <div
        className={classNames(styles.totalResult, {
          [styles['success']]: isPassed,
          [styles['error']]: !isPassed,
        })}
      >
        <Icon
          name={isPassed ? 'check' : 'close'}
          className={styles.icon}
          size={24}
          color={{
            primary: '#ffffff',
            secondary: '#ffffff',
          }}
        />
        <p>{t('Code Quality Check')}</p>
        <p>{isPassed ? t('Passed') : t("Did't pass")}</p>
      </div>
    )
  }

  renderOtherResults = () => {
    const { detail } = this.props
    const {
      bugRating,
      bugs,
      securityRating,
      vulnerabilities,
      codeSmells,
      coverage,
      key,
    } = detail

    const totalCode =
      detail.totalCode > 1000
        ? parseFloat(detail.totalCode / 1000).toFixed(2)
        : detail.totalCode
    const totalCodeUnit = detail.totalCode > 1000 ? 'K' : ''

    return (
      <div className={styles.otherCards}>
        <StatusCard
          title={t('Lines of Code')}
          value={totalCode}
          unit={totalCodeUnit}
          url={`${this.sonarqubeOrigin}/component_measures?id=${key}&metric=ncloc`}
        />
        <StatusCard
          hasIcon
          title={t('Bug')}
          value={bugs}
          unit={t('NUM_UNIT')}
          resultClass={bugRating}
          url={`${this.sonarqubeOrigin}/project/issues?id=${key}&resolved=false&types=BUG`}
        />
        <StatusCard
          hasIcon
          title={t('Code Vulnerability')}
          value={vulnerabilities}
          unit={t('NUM_UNIT')}
          resultClass={securityRating}
          url={`${this.sonarqubeOrigin}/project/issues?id=${key}&resolved=false&types=VULNERABILITY`}
        />
        <StatusCard
          hasIcon
          title={t('CodeSmells')}
          value={codeSmells}
          unit={t('Line')}
          url={`${this.sonarqubeOrigin}/project/issues?id=${key}&resolved=false&types=CODE_SMELL`}
        />
        <StatusCard
          hasIcon
          title={t('Coverage')}
          value={coverage}
          unit={'%'}
          url={`${this.sonarqubeOrigin}/component_measures?id=${key}&metric=coverage`}
        />
      </div>
    )
  }

  renderLogo = () => (
    <span onClick={this.goToSonarqube} className={styles.logo} />
  )

  render() {
    const { loading } = this.props

    if (loading) {
      return null
    }

    return (
      <Card title={t('Test Result')} operations={this.renderLogo()}>
        <div className={styles.content}>
          {this.renderTotalResult()}
          {this.renderOtherResults()}
        </div>
      </Card>
    )
  }
}

export default CodeQualityResult
