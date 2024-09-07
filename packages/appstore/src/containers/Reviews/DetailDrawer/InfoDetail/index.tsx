/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty } from 'lodash';
import ReactMarkdown from 'react-markdown';

import { AppDetail, Image, LabelText, getAnnotationsDescription } from '@ks-console/shared';

import BaseInfo from './BaseInfo';

import { PreField, StyledField } from './styles';

type Props = {
  detail?: AppDetail;
  versionName?: string;
};

function InfoDetail({ detail, versionName }: Props): JSX.Element {
  if (!detail) {
    return <></>;
  }

  const screenshots: any[] = [];

  return (
    <>
      <LabelText>{t('BASIC_INFORMATION')}</LabelText>
      <StyledField
        avatar={
          <Image
            src={detail?.spec.icon}
            iconLetter={detail?.metadata.name}
            iconSize={100}
            canLoading
          />
        }
        value={
          <BaseInfo
            name={detail.metadata.name}
            // TODO: there is a problem with the field.
            home={detail.metadata.labels?.['kubesphere.io/workspace']}
            isv={detail.metadata.labels?.['kubesphere.io/workspace']}
            versionName={versionName}
          />
        }
        label={
          <PreField
            value={<pre>{getAnnotationsDescription(detail) || '-'}</pre>}
            label={t('INTRODUCTION')}
          />
        }
      />
      <LabelText>{t('APP_DESCRIPTION')}</LabelText>
      <ReactMarkdown>{getAnnotationsDescription(detail) || t('NONE')}</ReactMarkdown>
      <LabelText>{t('APP_SCREENSHOTS')}</LabelText>
      {isEmpty(screenshots) ? (
        <p>{t('NONE')}</p>
      ) : (
        <ul>
          {screenshots.map((item, index) => (
            <li key={index}>{item /* <Image src={item} /> */}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default InfoDetail;
