/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { Root, DescriptionWrapper, Logo, Description, Links } from './styles';

export default function About() {
  const ksVersion = globals?.ksConfig?.ksVersion;
  const issueUrl = globals?.config?.issueUrl;
  const reposUrl = globals?.config?.reposUrl;
  const slackUrl = globals?.config?.slackUrl;

  return (
    <Root>
      <DescriptionWrapper>
        <div>
          <Logo src="/assets/logo.svg" alt="" />
        </div>
        <Description>{t('KS_DESCRIPTION')}</Description>
        <strong>
          KubeSphere {t('VERSION')} : {ksVersion}
        </strong>
      </DescriptionWrapper>
      <Links>
        <div>
          <span>
            <a href={reposUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/github.svg" alt="github" />
              <strong>{t('REPS_ADDRESS')}</strong>
            </a>
          </span>
          <span>
            <a href={issueUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/bug.svg" alt="bug" />
              <strong>{t('ISSUE_FEEDBACK')}</strong>
            </a>
          </span>
        </div>
        <div>
          <span>
            <a href={slackUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/slack.svg" alt="slack" />
              <strong>{t('PART_IN_DISCUSSION')}</strong>
            </a>
          </span>
          <span>
            <a href={reposUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/blue-theme-git.svg" alt="git" />
              <strong>{t('CODE_CONTRIBUTE')}</strong>
            </a>
          </span>
          <span>
            <a href={reposUrl} target="_blank" rel="noreferrer noopener">
              <img src="/assets/star.svg" alt="star" />
              <strong>{t('GITHUB_STAR')}</strong>
            </a>
          </span>
        </div>
      </Links>
    </Root>
  );
}
