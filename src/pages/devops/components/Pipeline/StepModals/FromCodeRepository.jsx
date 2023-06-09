/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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

import * as React from 'react'
import CodeRepoSelector from 'components/CodeRepoSelector'
import { Button } from '@kube-design/components'
import { Modal } from 'components/Base'
import { toJS } from 'mobx'

export default props => {
  const { value: _, onChange, devops, ...rest } = props
  const [visible, setVisible] = React.useState(false)
  const [value, setValue] = React.useState()
  const handleOk = () => {
    onChange(toJS(value))
    setVisible(false)
  }
  return (
    <div>
      <Button onClick={() => setVisible(true)}>
        {t('IMPORT_FROM_CODE_REPO')}
      </Button>
      <Modal
        title={t('IMPORT_FROM_CODE_REPO')}
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleOk}
      >
        <div style={{ minHeight: 270 }}>
          <CodeRepoSelector
            {...rest}
            isCreatePipeline={false}
            devops={devops}
            onChange={setValue}
            value={value}
          />
        </div>
      </Modal>
    </div>
  )
}
