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

import React, { useState } from 'react'
import { Form, Tabs } from '@kube-design/components'
import PipelineStore from 'stores/devops/pipelines'
import PipelineContent from 'devops/components/Pipeline'
import { isArray, isEmpty, set } from 'lodash'
import Loading from '@kube-design/components/lib/components/Loading'

import ParmasItem from './params'
import styles from './index.scss'

const { TabPanel } = Tabs

export default function PipelineTemplateParams({
  formTemplate,
  formRef,
  ...props
}) {
  const { params = [] } = formTemplate
  const [tab, setTab] = useState('params')
  const [loading, setLoading] = useState(false)
  const [jsonData, setJsonData] = useState({})
  const store = new PipelineStore()

  const handleTabChange = async value => {
    if (value === 'view') {
      const { paramsForm = {} } = formTemplate

      const postData = Object.keys(paramsForm).reduce((prev, curr) => {
        prev.push({ name: curr, value: paramsForm[curr] })
        return prev
      }, [])

      setLoading(true)
      const jenkins = await store.getTempleJenkins(formTemplate.template, {
        parameters: postData,
      })

      const { devops, name, cluster } = props.params

      await store.checkScriptCompile({
        devops,
        pipeline: name,
        value: jenkins,
        cluster,
      })

      const jenkinsFile = await store.convertJenkinsFileToJson(jenkins, cluster)

      setJsonData(jenkinsFile)
      set(formTemplate, 'jenkinsFile', jenkinsFile)
      setLoading(false)
    }
    setTab(value)
  }

  const renderEmpty = () => {
    return (
      <div className={styles.empty}>
        <div className={styles.icon}>
          <img src="/assets/pipeline-temp-empty.svg" alt="" />
        </div>
        <p>该操作无需进行参数配置</p>
      </div>
    )
  }

  return (
    <div className={styles.templateParams}>
      <Tabs type="button" tabs={tab} onChange={handleTabChange}>
        <TabPanel label={t('参数配置')} name="params">
          <div className={styles.container}>
            <div className={styles.params}>
              <Form data={formTemplate} ref={formRef}>
                {isArray(params) && params.length > 0 ? (
                  <div>
                    {params.map((item, index) => (
                      <ParmasItem key={index} option={item} />
                    ))}
                  </div>
                ) : (
                  renderEmpty()
                )}
              </Form>
            </div>
          </div>
        </TabPanel>
        <TabPanel label={t('预览')} name="view" disabled={isEmpty(params)}>
          <div className={styles.view}>
            <Loading spinning={loading}>
              <Form data={formTemplate} ref={formRef}>
                <PipelineContent
                  className={styles.content}
                  jsonData={jsonData}
                />
              </Form>
            </Loading>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  )
}
