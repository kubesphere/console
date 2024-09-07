/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState, useEffect } from 'react';
import { find } from 'lodash';
import type { TabProps } from '@kubed/components';
import { Loading, Empty, Tab } from '@kubed/components';

import { Markdown } from '@ks-console/shared';
import type {
  FormattedExtensionVersion,
  FormattedExtensionVersionFile,
} from '../../../../stores/extension';
import {
  useExtensionInstalledClustersQuery,
  useExtensionVersionFilesQuery,
} from '../../../../stores/extension';
import { getLocaleFile, markdownURITransformer } from '../../utils/extension';
import { Overview } from './Overview';
import { InstalledClustersTab } from './InstalledClustersTab';
import { LoadingWrapper, StyledTabs } from './Tabs.styles';

interface DetailTabFile extends FormattedExtensionVersionFile {
  title: string;
  fileType: 'markdown' | 'yaml';
}

interface TabsProps {
  formattedExtensionVersion: FormattedExtensionVersion | undefined;
  isShowInstalledClusters: boolean;
}

function Tabs({ formattedExtensionVersion, isShowInstalledClusters }: TabsProps) {
  const { extensionName = '', version = '' } = formattedExtensionVersion ?? {};
  const { isLoading: isExtensionVersionFilesQueryLoading, formattedExtensionVersionFiles } =
    useExtensionVersionFilesQuery({
      extensionName,
      version: version,
      enabled: Boolean(extensionName && version),
    });

  const { isLoading: isExtensionInstalledClustersQueryLoading, installedFormattedClusters } =
    useExtensionInstalledClustersQuery({
      enabled: isShowInstalledClusters,
      extensionName,
    });

  const tabs = useMemo(() => {
    const localeReadmeFile = getLocaleFile({
      data: formattedExtensionVersionFiles,
      targetFileName: 'README.md',
    });
    const localeChangelogFile = getLocaleFile({
      data: formattedExtensionVersionFiles,
      targetFileName: 'CHANGELOG.md',
    });
    const permissionsFile = find(
      formattedExtensionVersionFiles,
      ({ name }) => name.toLowerCase() === 'permissions.yaml',
    );

    const detailTabFiles: DetailTabFile[] = [];
    if (localeChangelogFile?.data) {
      detailTabFiles.push({
        ...localeChangelogFile,
        title: t('CHANGELOGS'),
        fileType: 'markdown',
      });
    }
    if (permissionsFile?.data) {
      detailTabFiles.push({
        ...permissionsFile,
        title: t('PERMISSION_REQUIREMENTS'),
        fileType: 'yaml',
      });
    }

    const data: TabProps[] = detailTabFiles.map(detailTabFile => {
      const { name, title, fileType, data: fileData } = detailTabFile;
      let className = '';
      let content = fileData;

      if (fileType === 'yaml') {
        className = 'markdown-code';
        content = `\`\`\`yaml\n${fileData}\n\`\`\``;
      }

      const children = (
        <Markdown
          key={name}
          skipHtml
          isSupportGFM
          themeName="github-light"
          classNames={{ root: 'markdown-wrapper-root' }}
          className={className}
          transformImageUri={src =>
            markdownURITransformer({
              extensionName,
              version,
              uri: src,
            })
          }
        >
          {content}
        </Markdown>
      );

      return {
        key: name,
        label: title,
        children,
      };
    });

    if (formattedExtensionVersion) {
      const key = 'overview';
      const tab: TabProps = {
        key,
        label: t('OVERVIEW'),
        children: (
          <Overview
            key={key}
            formattedExtensionVersion={formattedExtensionVersion}
            formattedExtensionVersionFiles={formattedExtensionVersionFiles}
            localeReadmeFile={localeReadmeFile}
          />
        ),
      };
      data.unshift(tab);
    }

    if (isShowInstalledClusters && installedFormattedClusters.length > 0) {
      const key = 'installedClusterAgent';
      const tab: TabProps = {
        key,
        label: t('INSTALLED_CLUSTER_AGENT'),
        children: <InstalledClustersTab key={key} formattedClusters={installedFormattedClusters} />,
      };
      data.push(tab);
    }

    return data;
  }, [
    extensionName,
    version,
    formattedExtensionVersionFiles,
    isShowInstalledClusters,
    installedFormattedClusters,
  ]);

  const [activeTabKey, setActiveTabKey] = useState(tabs[0]?.key);

  useEffect(() => {
    const activeTab = find(tabs, { key: activeTabKey });
    if (
      !isExtensionVersionFilesQueryLoading &&
      !isExtensionInstalledClustersQueryLoading &&
      !activeTab
    ) {
      setActiveTabKey(tabs[0]?.key);
    }
  }, [
    isExtensionVersionFilesQueryLoading,
    isExtensionInstalledClustersQueryLoading,
    tabs,
    activeTabKey,
  ]);

  if (isExtensionVersionFilesQueryLoading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  if (tabs.length === 0) {
    return (
      <LoadingWrapper>
        <Empty />
      </LoadingWrapper>
    );
  }

  return (
    <StyledTabs
      variant="line"
      color="primary"
      activeKey={activeTabKey}
      onTabChange={setActiveTabKey}
    >
      {tabs.map(props => (
        <Tab {...props} />
      ))}
    </StyledTabs>
  );
}

export { Tabs };
