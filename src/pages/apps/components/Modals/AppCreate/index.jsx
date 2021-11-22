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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Button } from '@kube-design/components'
import { Modal } from 'components/Base'
import ToggleView from 'apps/components/ToggleView'
import { getWebsiteUrl } from 'utils'

import styles from './index.scss'

export default class AppCreate extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  render() {
    const { visible, onOk, ...rest } = this.props
    const { url } = getWebsiteUrl()

    return (
      <Modal
        width={600}
        bodyClassName={styles.body}
        visible={visible}
        hideHeader
        {...rest}
      >
        <div className={classnames(styles.header, 'clearfix')}>
          <img src="/assets/application.svg" alt="" />
          <div className={styles.title}> {t('CREATE_APP_TEMPLATE')}</div>
          <div className={styles.description}>
            {t('CREATE_APP_TEMPLATE_DESC')}
          </div>
        </div>
        <ToggleView className={styles.item} title={t('UPLOAD_HELM_TITLE')} show>
          <div className={styles.more}>
            <div className={styles.description}>
              {t('HELM_CHART_FORMAT_DESC')}
            </div>
            <Button type={'control'} onClick={onOk}>
              {t('UPLOAD')}
            </Button>
            <div className={styles.note}>
              💁‍♂️ {t.html('APP_CREATE_GUIDE', { docUrl: url })}
            </div>
          </div>
        </ToggleView>
      </Modal>
    )
  }
}
