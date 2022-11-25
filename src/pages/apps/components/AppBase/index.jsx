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
import classnames from 'classnames'
import { get, isEmpty } from 'lodash'
import moment from 'moment-mini'

import { safeParseJSON } from 'utils'
import { getAppCategoryNames } from 'utils/app'

import styles from './index.scss'

export default class AppBase extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    app: PropTypes.object.isRequired,
  }

  static defaultProps = {
    app: {},
  }

  render() {
    const { className, app } = this.props

    const maintainers = safeParseJSON(
      get(app, 'latest_app_version.maintainers', []),
      []
    ).map(item => item.name)

    const sources = safeParseJSON(
      get(app, 'latest_app_version.sources', []),
      []
    )

    return (
      <div className={classnames(styles.appBase, className)}>
        <h3>{t('BASIC_INFORMATION')}</h3>
        <dl>
          <dt>{t('CATEGORY_COLON')}</dt>
          <dd>{getAppCategoryNames(get(app, 'category_set', []))}</dd>
          <dt>{t('HOMEPAGE_COLON')}</dt>
          <dd>{app.home || '-'}</dd>
          <dt>{t('RELEASE_DATE_COLON')}</dt>
          <dd>{moment(app.status_time).format('YYYY-MM-DD')}</dd>
          <dt>{t('APP_ID_COLON')}</dt>
          <dd>{app.app_id || '-'}</dd>
          {!isEmpty(maintainers) && (
            <>
              <dt>{t('MAINTAINER_COLON')}</dt>
              <dd>{maintainers.join('、')}</dd>
            </>
          )}
          {!isEmpty(sources) && (
            <>
              <dt>{t('SOURCE_CODE_ADDRESS_COLON')}</dt>
              <dd>
                {sources.map(item => (
                  <p>{item}</p>
                ))}
              </dd>
            </>
          )}
        </dl>
      </div>
    )
  }
}
