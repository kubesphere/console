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

import * as React from 'react'
import { Icon } from '@kube-design/components'
import classnames from 'classnames'
import logo from 'assets/support-ks.svg'
import ksc from 'assets/support-ks-cloud.svg'
import ksLight from 'assets/support-kse-light.svg'
import ksCluster from 'assets/support-kse-cluster.svg'
import ksSecurity from 'assets/support-kse-security.svg'
import { ReactComponent as Slack } from 'assets/slack_duotone.svg'
import { ReactComponent as Topic } from 'assets/topic_circle_duotone.svg'
import styles from './index.scss'

const config = globals.config.supportLinks

const openButtons = [
  {
    icon: 'documentation',
    title: 'DOCUMENTATION',
    link: config.doc,
  },
  {
    icon: Topic,
    title: 'FORUM',
    link: config.forum,
  },
  {
    icon: 'github',
    title: 'ISSUE_PL',
    link: config.issues,
  },
  {
    icon: Slack,
    title: 'SLACK',
    link: config.slack,
  },
]

const kseFeatures = [
  {
    icon: ksLight,
    title: 'KSE_FEATURE_1',
  },
  {
    icon: ksCluster,
    title: 'KSE_FEATURE_2',
  },
  {
    icon: ksSecurity,
    title: 'KSE_FEATURE_3',
  },
]
const kscFeatures = [
  {
    title: 'KSC_FEATURE_BACKUP',
    desc: [
      'KSC_FEATURE_BACKUP_APP_DESC',
      'KSC_FEATURE_BACKUP_DATA_DESC',
      'KSC_FEATURE_BACKUP_CLOUD_DESC',
    ],
    img: '/assets/support-backup.svg',
    link: config.backup,
  },
  {
    title: 'KSC_FEATURE_INSPECTION',
    desc: [
      'KSC_FEATURE_INSPECTION_VULN_DESC',
      'KSC_FEATURE_INSPECTION_SECURITY_DESC',
      'KSC_FEATURE_INSPECTION_BEST_DESC',
    ],
    img: '/assets/support-cluster-inspection.svg',
    link: config.inspection,
  },
  {
    title: 'KSC_FEATURE_LIGHTWEIGHT',
    desc: [
      'KSC_FEATURE_LIGHTWEIGHT_START_DESC',
      'KSC_FEATURE_LIGHTWEIGHT_KS_DESC',
      'KSC_FEATURE_LIGHTWEIGHT_TEST_DESC',
    ],

    img: '/assets/support-light-cluster.svg',
    link: config.light,
  },
]

function Divider() {
  return <div className={styles.divider} />
}

export default function Support() {
  const renderAbout = () => {
    return (
      <div className={styles.about}>
        <div className={styles.open}>
          <div className={styles.container}>
            <div className={styles.title}>{t('COMMUNITY_SUPPORT')}</div>
            <div className={styles.circleButtons}>
              {openButtons.map(item => {
                return (
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    className={styles.circleButton}
                    key={item.title}
                    href={item.link}
                  >
                    {typeof item.icon === 'string' ? (
                      <Icon name={item.icon} size={20} />
                    ) : (
                      <span className={'icon'}>
                        <item.icon
                          className={'kubed-icon kubed-icon-dark'}
                          style={{ width: 20, height: 20 }}
                        />
                      </span>
                    )}
                    <span className={styles.buttonText}>{t(item.title)}</span>
                  </a>
                )
              })}
            </div>
          </div>
          <div className={styles.buttons}>
            <a
              className={styles.button}
              href={config.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={'github'} size={20} color={{ primary: 'inherit' }} />
              <span className={styles.smallButtonText}>
                {t('REPS_ADDRESS')}
              </span>
            </a>
            <Divider />
            <a
              className={styles.button}
              href={config.githubPr}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={'git'} size={20} color={{ primary: '#329DCE' }} />
              <span className={styles.smallButtonText}>
                {t('CODE_CONTRIBUTE')}
              </span>
            </a>
            <Divider />
            <a
              className={styles.button}
              href={config.star}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name={'star'} size={20} color={{ primary: '#F5A623' }} />
              <span className={styles.smallButtonText}>{t('GITHUB_STAR')}</span>
            </a>
          </div>
        </div>
        <a
          className={styles.ticket}
          href={config.contactUs}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.title}>{t('TICKET_SUPPORT')}</div>
          <div className={styles.desc}>{t('TICKET_SUPPORT_DESC')}</div>
          <div className={styles.link}>
            <span>{t('CONTACT_US')}</span>
            <Icon
              name={'next'}
              color={{ primary: 'inherit', secondary: 'inherit' }}
            />
          </div>
        </a>
      </div>
    )
  }
  const renderKse = () => {
    return (
      <div className={classnames(styles.card, styles.kse)}>
        <div className={classnames(styles.header, styles.headerWithPadding)}>
          <img src={logo} alt={'logo'} />
          <a
            className={classnames(styles.buttonText, 'support-action')}
            href={config.kse}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('LEARN_MORE')}
          </a>
        </div>
        <div className={styles.content}>
          <div>
            <div className={styles.title}>
              {t('KUBESPHERE_ENTERPRISE_CAPTION')}
            </div>
            <div className={styles.desc}>
              {t('KUBE_SPHERE_ENTERPRISE_DESC')}
            </div>
            <div className={styles.features}>
              {kseFeatures.map(item => (
                <div className={styles.feature} key={item.title}>
                  <img src={item.icon} alt={item.title} />
                  <div className={styles.featureTitle}>{t(item.title)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.kseBg} />
        </div>
      </div>
    )
  }

  const renderKsc = () => {
    return (
      <div className={classnames(styles.card, styles.ksc)}>
        <div className={styles.header}>
          <img src={ksc} alt={'ks-cloud'} />
          <a
            className={classnames(styles.buttonText, 'support-action')}
            href={config.ksc}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('LEARN_MORE')}
          </a>
        </div>
        <div className={styles.title}>{t('KUBESPHERE_CLOUD_CAPTION')}</div>
        <div className={styles.desc}>{t('KUBESPHERE_CLOUD_DESC')}</div>
        <div className={styles.features}>
          {kscFeatures.map(item => (
            <a
              className={styles.feature}
              key={item.title}
              href={item.link}
              target={'_blank'}
              rel="noopener noreferrer"
              style={{
                backgroundImage: `url("${item.img}")`,
              }}
            >
              <div className={styles.title}>{t(item.title)}</div>
              <div>
                {item.desc.map((desc, index) => (
                  <div className={styles.descRow} key={index}>
                    {t(desc)}
                  </div>
                ))}
              </div>
              <div className={styles.buttonText}>
                <span>{t('START_NOW')}</span>
                <Icon
                  name={'next'}
                  color={{ primary: 'inherit', secondary: 'inherit' }}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        {renderAbout()}
        {renderKse()}
        {renderKsc()}
        <div className={styles.footer}>{t.html('LEARN_MORE_CONTACT_US')}</div>
      </div>
    </div>
  )
}
