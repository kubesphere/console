/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Empty } from '@kubed/components';

import { EmptyWrapper, LinkButton, Root, File, FilePath, FileType } from './Files.styles';

interface FilesProps {
  files: { name: string; yamlKind?: string }[];
  selectedFileName: string;
  onSelectFileName: (fileName: string) => void;
  onClearSearchValue: () => void;
}

export function Files({
  files,
  selectedFileName,
  onSelectFileName,
  onClearSearchValue,
}: FilesProps) {
  if (files.length === 0) {
    return (
      <EmptyWrapper>
        <Empty
          title={t('NO_MATCHING_RESULTS_FOUND')}
          description={
            <>
              {t('YOU_CAN_TRY_ACTION')}
              <LinkButton onClick={onClearSearchValue}>
                {t('CLEARING_THE_SEARCH_CRITERIA')}
              </LinkButton>
            </>
          }
        />
      </EmptyWrapper>
    );
  }

  return (
    <Root>
      {files.map(({ name, yamlKind }) => {
        const isSelected = selectedFileName === name;

        return (
          <File key={name} $isSelected={isSelected} onClick={() => onSelectFileName(name)}>
            <FilePath title={name} $isSelected={isSelected}>
              {name}
            </FilePath>
            {yamlKind && (
              <FileType>
                {t('KIND')}: {yamlKind}
              </FileType>
            )}
          </File>
        );
      })}
    </Root>
  );
}
