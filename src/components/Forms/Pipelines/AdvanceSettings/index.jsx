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

import { get, isEmpty, set } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import {
  Checkbox,
  Column,
  Columns,
  Form,
  Icon,
  Input,
  Select,
  Tooltip,
} from '@kube-design/components'

import { NumberInput } from 'components/Inputs'
import { getLocalTime } from 'utils'
import { TIMETRIGGERINTERVALS, REPO_KEY_MAP } from 'utils/constants'

import ScmStore from 'stores/devops/scm'
import PipelineStore from 'stores/devops/pipelines'

import ParamsInput from '../ParamsInput'
import ActionsInput from '../ActionsInput'
import styles from './index.scss'

@observer
export default class AdvanceSettings extends React.Component {
  constructor(props) {
    super(props)

    this.scmStore = new ScmStore()
    this.pipelineStore = new PipelineStore()
    this.state = { cronMessage: {} }
  }

  static defaultProps = {
    type: 'create',
  }

  get sourceType() {
    const { formTemplate } = this.props
    return get(formTemplate, 'multi_branch_pipeline.source_type', '')
  }

  get prefix() {
    if (this.sourceType) {
      return 'multi_branch_pipeline'
    }
    return 'pipeline'
  }

  get scmPrefix() {
    return `multi_branch_pipeline.${REPO_KEY_MAP[this.sourceType]}`
  }

  get webhookUrl() {
    const { formTemplate } = this.props
    const url = get(formTemplate, `${this.scmPrefix}.url`, '')
    const api_uri = get(formTemplate, `${this.scmPrefix}.api_uri`, '')
    const owner = get(formTemplate, `${this.scmPrefix}.owner`, '')
    const repo = get(formTemplate, `${this.scmPrefix}.repo`, '')
    const bitbucket_url = `${api_uri}/scm/${owner}/${repo}.git`
    const cluster = get(formTemplate, 'cluster')
    const clusterUrl = cluster ? `cluster/${cluster}/` : ''

    switch (this.sourceType) {
      case 'bitbucket_server':
        return `${window.location.protocol}//${window.location.host}/${clusterUrl}devops_webhook/git/?url=${bitbucket_url}`
      case 'github':
        return `${window.location.protocol}//${window.location.host}/${clusterUrl}devops_webhook/${this.sourceType}/`
      default:
        return `${window.location.protocol}//${window.location.host}/${clusterUrl}devops_webhook/git/?url=${url}`
    }
  }

  get pipelineLists() {
    const { data } = this.pipelineStore.list
    return data.map(pipeline => ({
      label: pipeline.name,
      value: pipeline.fullName,
    }))
  }

  componentDidMount() {
    const { devopsName, cluster, devops } = this.props.formTemplate
    this.pipelineStore.fetchList({
      devopsName,
      devops,
      cluster,
      filter: 'no-folders',
    })
  }

  handleChange = key => value => {
    const { formTemplate } = this.props
    set(formTemplate, key, value)
    this.forceUpdate()
  }

  removeCronError = () => {
    if (this.state.cronMessage) {
      this.setState({ cronMessage: {} })
    }
  }

  checkCronScript = async (rule, value, callback) => {
    const { formTemplate, type } = this.props
    const { name, cluster, devops } = formTemplate
    const script = value

    const result = await this.scmStore.checkCronScript({
      devops,
      script,
      cluster,
      pipeline: type === 'create' ? undefined : name,
    })

    if (result.result === 'error') {
      this.setState({ cronMessage: { error: result.message } }, () => {})
      callback(result.message)
      return
    }

    if (result.result === 'ok') {
      const message = t('CRON_DESC', {
        lastTime: getLocalTime(result.lastTime).format(
          `${t('MMMM Do YYYY')} HH:mm:ss`
        ),
        nextTime: getLocalTime(result.nextTime).format(
          `${t('MMMM Do YYYY')} HH:mm:ss`
        ),
      })
      this.setState({ cronMessage: { message } })
      callback()
    }
  }

  handleScrollToBottom = () => {
    const { devopsName, cluster, devops } = this.props.formTemplate
    const { total, page, limit } = this.pipelineStore.list

    if (total <= limit * page) {
      return
    }

    this.pipelineStore.fetchList({
      devopsName,
      cluster,
      devops,
      filter: 'no-folders',
      page: page + 1,
    })
  }

  renderTip(tip) {
    return (
      <Tooltip content={tip} placement="right">
        <Icon name="question" className="margin-l12" />
      </Tooltip>
    )
  }

  renderNoSource() {
    const { formTemplate } = this.props
    const enable_timer_trigger = get(formTemplate, 'enable_timer_trigger')
    const enable_remote_trigger = get(formTemplate, 'enable_remote_trigger')

    return (
      <div>
        <Form.Item
          desc={t(
            'If you check this option, you cannot run multiple builds concurrently.'
          )}
        >
          <Checkbox
            name={`${this.prefix}.disable_concurrent`}
            checked={get(formTemplate, `${this.prefix}.disable_concurrent`)}
            onChange={this.handleChange(`${this.prefix}.disable_concurrent`)}
          >
            {t('No concurrent builds')}
          </Checkbox>
        </Form.Item>
        <div className="h6">
          <>
            {t('Parametric Build')}
            {this.renderTip(t('tips_Parametric_build'))}
          </>
        </div>
        <ParamsInput
          name={`${this.prefix}.parameters`}
          formTemplate={this.props.formTemplate}
        />
        <div className="h6">{t('Build Trigger')}</div>
        <Form.Item>
          <Checkbox
            name={`enable_timer_trigger`}
            checked={enable_timer_trigger}
            onChange={this.handleChange('enable_timer_trigger')}
          >
            {t('Scheduled build')}
            {this.renderTip(t('tips_Timing_build'))}
          </Checkbox>
        </Form.Item>
        {enable_timer_trigger && (
          <div className={styles.wrapper}>
            <Columns>
              <Column>
                <Form.Item
                  label={t('Schedule')}
                  desc={
                    this.state.cronMessage.message ||
                    t.html('PIPELINE_CRONJOB_CRON_DESC')
                  }
                  tip={t('tips_timer_trigger')}
                  rules={[{ validator: this.checkCronScript }]}
                >
                  <Input
                    name={`${this.prefix}.timer_trigger.cron`}
                    placeholder="Every hour, on the hour"
                    onChange={this.removeCronError}
                  />
                </Form.Item>
              </Column>
            </Columns>
          </div>
        )}
        <Form.Item>
          <Checkbox
            name="enable_remote_trigger"
            checked={enable_remote_trigger}
            onChange={this.handleChange('enable_remote_trigger')}
          >
            {t('Trigger a remote build (for example, using a script)')}
          </Checkbox>
        </Form.Item>
        {enable_remote_trigger && (
          <div className={styles.wrapper}>
            <Form.Item
              label={t('Authentication Token')}
              desc={t('AUTHENTICATION_TOKEN_DESC')}
              tip={t('tips_Authentication_token')}
            >
              <Input
                name={`${this.prefix}.remote_trigger.token`}
                placeholder={t(
                  'Use the following URL to remotely trigger the build'
                )}
              />
            </Form.Item>
          </div>
        )}
      </div>
    )
  }

  renderGitOptions() {
    const { formTemplate } = this.props

    return (
      <>
        <div className="h6">{t('Git Clone Options')}</div>
        <Columns>
          <Column>
            <Form.Item label={t('clone depth')}>
              <NumberInput
                name={`${this.scmPrefix}.git_clone_option.depth`}
                defaultValue={1}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Pipeline clone timeout (in minutes)')}>
              <NumberInput
                name={`${this.scmPrefix}.git_clone_option.timeout`}
                defaultValue={20}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item>
          <Checkbox
            checked={get(
              formTemplate,
              `${this.scmPrefix}.git_clone_option.shallow`,
              false
            )}
            name={`${this.scmPrefix}.git_clone_option.shallow`}
            onChange={this.handleChange(
              `${this.scmPrefix}.git_clone_option.shallow`
            )}
          >
            {t('Whether to enable shallow clone')}
          </Checkbox>
        </Form.Item>
        <div className="h6">{t('Webhook Push')}</div>
        <Form.Item label={t('Push message to')} tip={t('WEBHOOK_DESC')}>
          <Input value={this.webhookUrl} disabled />
        </Form.Item>
      </>
    )
  }

  renderRegFilter() {
    const { formTemplate } = this.props
    const { enable_regex_filter } = formTemplate

    return (
      <>
        <Form.Item>
          <Checkbox
            checked={enable_regex_filter}
            name="enable_regex_filter"
            onChange={this.handleChange('enable_regex_filter')}
          >
            {t('REG_FILTER_DESC')}
          </Checkbox>
        </Form.Item>
        {enable_regex_filter && (
          <div className={styles.wrapper}>
            <Form.Item label={t('Regex filter')}>
              <Input
                name={`${this.scmPrefix}.regex_filter`}
                defaultValue=".*"
              />
            </Form.Item>
          </div>
        )}
      </>
    )
  }

  renderWithSource() {
    const { formTemplate } = this.props
    const source_type = get(
      formTemplate,
      'multi_branch_pipeline.source_type',
      ''
    )
    const {
      enable_timer_trigger,
      enable_multibranch_job_trigger,
    } = formTemplate
    const { isLoading } = this.pipelineStore.list

    const hasWebhook = ['git', 'github', 'bitbucket_server'].includes(
      source_type
    )

    return (
      <div>
        {source_type !== 'git' && source_type !== 'svn' ? (
          <React.Fragment>
            <div className="h6">{t('Behavioral strategy')}</div>
            <Form.Item>
              <ActionsInput
                sourceType={source_type}
                name={`multi_branch_pipeline.${source_type}_source`}
              />
            </Form.Item>
          </React.Fragment>
        ) : null}
        <div className="h6">{t('Script Path')}</div>
        <Form.Item
          label={t('Path')}
          desc={t(
            'Specify the location of the Jenkinsfile in the source code repository'
          )}
        >
          <Input
            name={`${this.prefix}.script_path`}
            defaultValue="Jenkinsfile"
          />
        </Form.Item>
        <div className="h6">{t('Scan Repo Trigger')}</div>
        {hasWebhook ? this.renderRegFilter() : null}
        <Form.Item>
          <Checkbox
            checked={enable_timer_trigger}
            name="enable_timer_trigger"
            onChange={this.handleChange('enable_timer_trigger')}
          >
            {t('If not, scan regularly')}
            {this.renderTip(t('TIME_TRIGGER_DESC'))}
          </Checkbox>
        </Form.Item>
        {enable_timer_trigger && (
          <div className={styles.wrapper}>
            <Form.Item label={t('Scan interval')}>
              <Select
                name={`${this.prefix}.timer_trigger.interval`}
                options={TIMETRIGGERINTERVALS}
                defaultValue={
                  source_type === 'svn' || source_type === 'single_svn'
                    ? '600000'
                    : '3600000'
                }
              />
            </Form.Item>
          </div>
        )}
        <div className="h6">{t('Build Trigger')}</div>
        <Form.Item>
          <Checkbox
            checked={enable_multibranch_job_trigger}
            name="enable_multibranch_job_trigger"
            onChange={this.handleChange('enable_multibranch_job_trigger')}
          >
            {t('Pipeline event trigger')}
          </Checkbox>
        </Form.Item>
        {enable_multibranch_job_trigger && (
          <div className={styles.wrapper}>
            <Columns>
              <Column>
                <Form.Item
                  label={t('When Create Pipeline')}
                  desc={t('WHEN_CHRETE_PIEPLINE_DESC')}
                >
                  <Select
                    name={`${this.prefix}.multibranch_job_trigger.create_action_job_to_trigger`}
                    isLoading={isLoading}
                    isLoadingAtBottom
                    onMenuScrollToBottom={this.handleScrollToBottom}
                    options={this.pipelineLists}
                    placeholder={t('select a pipeline')}
                  />
                </Form.Item>
              </Column>
              <Column>
                <Form.Item
                  label={t('When Delete Pipeline')}
                  desc={t('WHEN_DELETE_PIEPLINE_DESC')}
                >
                  <Select
                    name={`${this.prefix}.multibranch_job_trigger.delete_action_job_to_trigger`}
                    isLoading={isLoading}
                    isLoadingAtBottom
                    onMenuScrollToBottom={this.handleScrollToBottom}
                    options={this.pipelineLists}
                    placeholder={t('select a pipeline')}
                  />
                </Form.Item>
              </Column>
            </Columns>
          </div>
        )}
        {hasWebhook ? this.renderGitOptions() : null}
      </div>
    )
  }

  renderDisCarder = () => {
    const { formTemplate } = this.props
    const multi_branch_pipeline = get(formTemplate, 'multi_branch_pipeline')
    const { enable_discarder } = formTemplate
    if (!enable_discarder) {
      return
    }
    if (isEmpty(multi_branch_pipeline)) {
      return (
        <div className={styles.wrapper}>
          <Columns>
            <Column>
              <Form.Item
                label={t('Days to keep builds')}
                desc={`${t(
                  'Old builds will be deleted after this number of days.'
                )} (${t('defaultValue -1 means not to discard')})`}
              >
                <Input
                  name={`${this.prefix}.discarder.days_to_keep`}
                  defaultValue="7"
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('Maximum number of builds to keep')}
                desc={`${t(
                  'Old builds will be discarded after the build number exceeds the maximum amount.'
                )} (${t('defaultValue -1 means not to discard')})`}
              >
                <Input
                  name={`${this.prefix}.discarder.num_to_keep`}
                  defaultValue="10"
                />
              </Form.Item>
            </Column>
          </Columns>
        </div>
      )
    }
    return (
      <div className={styles.wrapper}>
        <Columns>
          <Column>
            <Form.Item
              label={t('Days to keep old branches')}
              desc={t('tips_days_keep_withscm')}
            >
              <Input
                name={`${this.prefix}.discarder.days_to_keep`}
                defaultValue="-1"
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('Max number of branches to keep')}
              desc={t('tips_numbers_keep_withscm')}
            >
              <Input
                name={`${this.prefix}.discarder.num_to_keep`}
                defaultValue="-1"
              />
            </Form.Item>
          </Column>
        </Columns>
      </div>
    )
  }

  render() {
    const { formRef, formTemplate } = this.props

    const multi_branch_pipeline = get(formTemplate, 'multi_branch_pipeline')
    return (
      <div className={styles.advance}>
        <Form data={formTemplate} ref={formRef}>
          <div className="h6">
            {isEmpty(multi_branch_pipeline)
              ? t('Build Settings')
              : t('Branch Settings')}
          </div>
          <Form.Item>
            <Checkbox
              checked={formTemplate.enable_discarder}
              name="enable_discarder"
              onChange={this.handleChange('enable_discarder')}
            >
              {isEmpty(multi_branch_pipeline)
                ? t('Discard old builds')
                : t('Discard old branch')}
              {this.renderTip(
                isEmpty(multi_branch_pipeline)
                  ? t('tips_disable_concurrent')
                  : t('tips_disable_concurrent_withscm')
              )}
            </Checkbox>
          </Form.Item>
          {this.renderDisCarder()}
          {isEmpty(multi_branch_pipeline)
            ? this.renderNoSource()
            : this.renderWithSource()}
        </Form>
      </div>
    )
  }
}
