import React from 'react';
import cx from 'classnames';

import { getWebsiteUrl, showOutSiteLink } from '@ks-console/shared';

import { CheckFilesWrapper, ConfigMask, Desc, DescOption, FileItem, Title } from './styles';

const typeFiles: Record<string, any> = [
  {
    name: 'Chart.yaml',
    description: 'CHART_FILE_DESC',
  },
  {
    name: 'LICENSE',
    description: 'LICENSE_FILE_DESC',
    isOptional: true,
  },
  {
    name: 'README.md',
    description: 'README_FILE_DESC',
    isOptional: true,
  },
  {
    name: 'requirements.yaml',
    description: 'REQUIREMENTS_FILE_DESC',
    isOptional: true,
  },
  { name: 'values.yaml', description: 'VALUES_FILE_DESC' },
  {
    name: 'charts/',
    description: 'CHARTS_FILE_DESC',
    isOptional: true,
    check: 'none',
  },
  {
    name: 'templates/',
    description: 'TEMPLATES_FILE_DESC',
    isOptional: true,
  },
  {
    name: 'templates/NOTES.txt',
    description: 'NOTES_FILE_DESC',
    isOptional: true,
  },
];

type Props = {
  unSuccess: boolean;
  errorFiles?: any;
};

function CheckFiles({ unSuccess, errorFiles }: Props): JSX.Element {
  const { url } = getWebsiteUrl();
  const htmlDes = t('APP_CREATE_GUIDE', { docUrl: url });

  return (
    <>
      <CheckFilesWrapper>
        {typeFiles.map((file: any) => {
          const hasError = errorFiles?.includes(file.name);

          return (
            <FileItem key={file.name} className={cx({ error: hasError })}>
              <Title>{file.name}</Title>#
              <Desc>
                {file.isOptional && <DescOption>[{t('OPTIONAL')}]</DescOption>}
                {t(file.description)}
              </Desc>
            </FileItem>
          );
        })}
        {unSuccess && <ConfigMask />}
      </CheckFilesWrapper>
      {showOutSiteLink() && (
        <div>
          💁‍♂️ <span dangerouslySetInnerHTML={{ __html: htmlDes }} />
        </div>
      )}
    </>
  );
}

export default CheckFiles;
