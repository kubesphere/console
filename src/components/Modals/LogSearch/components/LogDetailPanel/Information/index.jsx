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
import moment from 'moment-mini'
import ContextmenuItem from 'components/Modals/LogSearch/components/ContextmenuItem'

import styles from './index.scss'

export default function Information(props) {
  const informationMap = {
    workspace: {
      i18n: t('Workspace'),
      field: 'workspaces',
    },
    namespace: {
      i18n: t('Project'),
      field: 'namespaces',
    },
    pod: {
      i18n: t('Pod'),
      field: 'pods',
    },
    container: {
      i18n: t('Container'),
      field: 'containers',
    },
    host: {
      i18n: t('Hosts'),
      unsupported: true,
    },
    time: {
      i18n: t('Time'),
      format(time) {
        return moment(time).format('YYYY/MM/DD HH:mm:ss')
      },
      unsupported: true,
    },
    log: {
      i18n: t('Log'),
      unsupported: true,
    },
  }

  const { information = {}, onReplaceClick, onAddClick, onNewTagClick } = props

  return (
    <div className={styles.wrapper}>
      <h2>{t('RELATED_INFORMATION')}</h2>

      {Object.entries(informationMap).map(
        ([key, config]) =>
          information[key] && (
            <ContextmenuItem
              key={key}
              field={config.field || key}
              value={information[key]}
              label={config.i18n}
              format={config.format}
              supportedContext={!config.unsupported}
              onReplaceClick={onReplaceClick}
              onAddClick={onAddClick}
              onNewTagClick={onNewTagClick}
            />
          )
      )}
    </div>
  )
}
