/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { minimatch } from 'minimatch';
import { Loading } from '@kubed/components';

import type { FormattedExtensionVersionFile } from '../../../../stores/extension';
import { EXCLUDE_PATTERNS, INCLUDE_PATTERNS, LANGUAGES } from './constans';
import { parseFilePath, getYamlKind } from './utils';
import { SearchInput } from './SearchInput';
import { FilesHeader } from './FilesHeader';
import { Files } from './Files';
import { CodeViewer } from './CodeViewer';
import {
  EmptyWrapper,
  Root,
  Sidebar,
  VersionWrapper,
  Version,
  SearchInputWrapper,
  Content,
  FilesWrapper,
} from './ExtensionFilesViewer.styles';

interface ExtensionFilesViewerProps {
  isLoading: boolean;
  version: string;
  formattedExtensionVersionFiles: FormattedExtensionVersionFile[];
}

function ExtensionFilesViewer({
  isLoading,
  version,
  formattedExtensionVersionFiles,
}: ExtensionFilesViewerProps) {
  const [searchValue, setSearchValue] = useState('');
  const handleClear = () => setSearchValue('');

  const allFiles = useMemo(
    () =>
      formattedExtensionVersionFiles.map(item => {
        const { name, data } = item;
        const { fileExtension } = parseFilePath({ filePath: name });

        const yamlExtensions =
          LANGUAGES.find(({ language }) => language === 'YAML')?.extensions ?? [];
        const isYaml = yamlExtensions.includes(fileExtension.toLowerCase());
        const yamlKind = isYaml ? getYamlKind({ data }) : '';

        return { ...item, fileExtension, yamlKind };
      }),
    [formattedExtensionVersionFiles],
  );
  const targetFiles = useMemo(
    () =>
      allFiles.filter(({ name, yamlKind }) => {
        const isExclude = EXCLUDE_PATTERNS.some(pattern => minimatch(name, pattern));
        if (isExclude) {
          return false;
        }

        const isInclude = INCLUDE_PATTERNS.some(pattern => minimatch(name, pattern));
        if (!isInclude) {
          return false;
        }

        const lowerCaseSearchValue = searchValue.toLowerCase();
        const nameIndex = name.toLowerCase().indexOf(lowerCaseSearchValue);
        const yamlKindIndex = yamlKind.toLowerCase().indexOf(lowerCaseSearchValue);
        return nameIndex !== -1 || yamlKindIndex !== -1;
      }),
    [allFiles, searchValue],
  );

  const filesWithoutData = targetFiles.map(({ name, yamlKind }) => ({ name, yamlKind }));

  const [selectedFileName, setSelectedFileName] = useState('');
  const selectedItem = allFiles.find(({ name }) => selectedFileName === name);
  const selectedData = selectedItem?.data ?? '';
  const selectedFileExtension = selectedItem?.fileExtension ?? '';
  const selectedLanguage =
    LANGUAGES.find(({ extensions }) => extensions.includes(selectedFileExtension))?.prismLanguage ??
    '';

  useDeepCompareEffect(() => {
    setSelectedFileName(filesWithoutData[0]?.name ?? '');
  }, [filesWithoutData]);

  if (isLoading) {
    return (
      <EmptyWrapper>
        <Loading />
      </EmptyWrapper>
    );
  }

  return (
    <Root>
      <Sidebar>
        <VersionWrapper>
          <Version>{t('CURRENT_VERSION_WITH_VERSION', { version })}</Version>
        </VersionWrapper>
        <SearchInputWrapper>
          <SearchInput value={searchValue} onChange={setSearchValue} onClear={handleClear} />
        </SearchInputWrapper>
        <FilesHeader filesCount={filesWithoutData.length} />
        <FilesWrapper>
          <Files
            files={filesWithoutData}
            selectedFileName={selectedFileName}
            onSelectFileName={setSelectedFileName}
            onClearSearchValue={handleClear}
          />
        </FilesWrapper>
      </Sidebar>
      <Content>
        <CodeViewer filePath={selectedFileName} data={selectedData} language={selectedLanguage} />
      </Content>
    </Root>
  );
}

export { ExtensionFilesViewer };
