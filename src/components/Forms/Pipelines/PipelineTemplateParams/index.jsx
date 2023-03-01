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

import PipelineContent from 'devops/components/Pipeline'
import { isArray, isEmpty, set } from 'lodash'
import Loading from '@kube-design/components/lib/components/Loading'

import ParmasItem from './params'
import styles from './index.scss'

const { TabPanel } = Tabs

export default function PipelineTemplateParams({
  formTemplate,
  formRef,
  store,
  ...props
}) {
  const { params = [] } = formTemplate
  const [tab, setTab] = useState('params')
  const [loading, setLoading] = useState(false)
  const [jsonData, setJsonData] = useState({})
  const [timeOut, setTout] = useState(false)
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

      try {
        const { mode, jsonData: json1 } = await store.convertJenkinsFileToJson(
          jenkins,
          cluster,
          devops,
          name
        )
        const json = JSON.parse(json1)
        if (!mode) {
          setJsonData({ json })
          set(formTemplate, 'jenkinsFile', { json })
        }
      } catch (e) {
        console.error(e)
        setTout(true)
      }
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
        <p>{t('EMPTY_PARAMS_CONFIG')}</p>
      </div>
    )
  }

  return (
    <div className={styles.templateParams}>
      <Loading spinning={store.isSubmitting}>
        <Tabs type="button" tabs={tab} onChange={handleTabChange}>
          <TabPanel label={t('PARAMETER_CONFIG')} name="params">
            <div className={styles.container}>
              <div className={styles.params}>
                <Form data={formTemplate} ref={formRef}>
                  {isArray(params) && params.length > 0 ? (
                    <div className={styles.params_container}>
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
          <TabPanel label={t('PREVIEW')} name="view" disabled={isEmpty(params)}>
            <div className={styles.view}>
              {timeOut ? (
                <div className={styles.timeOut}>
                  <div className={styles.icon}>
                    <img src="/assets/pipeline-temp-empty.svg" alt="" />
                  </div>
                  <p>{t('CONNECTION_TIMEOUT')}</p>
                </div>
              ) : (
                <Loading spinning={loading}>
                  <Form data={formTemplate} ref={formRef}>
                    <PipelineContent
                      className={styles.content}
                      jsonData={jsonData}
                    />
                  </Form>
                </Loading>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </Loading>
    </div>
  )
}
