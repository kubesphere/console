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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

import VersionStore from 'stores/openpitrix/version'
import FileStore from 'stores/openpitrix/file'
import { getDocsUrl } from 'utils'

import styles from './index.scss'

@observer
export default class TestSteps extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    appId: PropTypes.string,
    appName: PropTypes.string,
  }

  static defaultProps = {
    detail: {},
    appId: '',
    appName: '',
  }

  constructor(props) {
    super(props)

    this.state = {}

    this.store = new VersionStore()
    this.fileStore = new FileStore()
  }

  render() {
    return (
      <div className={styles.main}>
        <p className={styles.note}>{t('VERSION_SUBMIT_NOTE')}：</p>
        <div className={styles.steps}>
          {t.html('VERSION_SUBMIT_TEST_STEPS')}
        </div>
        <p>
          {t('VERSION_SUBMIT_DOC')}
          <a
            href={getDocsUrl('helm_developer_guide')}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t('Develop and test guide')}
          </a>
        </p>
      </div>
    )
  }
}
