/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions } from '@kubed/components';

import { useCategoriesQuery } from '../../../../stores/extension';
import { pickFormattedCategoriesByCategoryNames } from '../../utils/extension';
import { VersionSelect } from '../VersionSelect';
import type { ExtensionDetailProps } from './ExtensionDetail';
import {
  Wrapper,
  OverviewWrapper,
  IconWrapper,
  Icon,
  ActionButtonsWrapper,
  BasicInfo,
  BasicInfoTitle,
  TagsWrapper,
  TagsTitle,
  Tags,
  Tag,
} from './Sidebar.styles';

type SidebarProps = Pick<
  ExtensionDetailProps,
  | 'formattedExtension'
  | 'formattedExtensionVersion'
  | 'basicInfo'
  | 'actionButtons'
  | 'onVersionChange'
>;

function Sidebar({
  formattedExtension,
  formattedExtensionVersion,
  basicInfo,
  actionButtons,
  onVersionChange,
}: SidebarProps) {
  const { version } = useParams();

  const { versions = [], displayVersion, categoryNames = [] } = formattedExtension ?? {};
  const currentVersion = version ?? displayVersion;
  const versionOptions = versions.map(({ version: ver, isRecommendedVersion }) => ({
    value: ver,
    description: t('EXTENSION_VERSION'),
    isRecommendedVersion,
  }));

  const { displayIcon, localeDisplayName, keywords = [] } = formattedExtensionVersion ?? {};

  const { formattedCategories } = useCategoriesQuery({
    enabled: categoryNames.length > 0,
  });
  const extensionFormattedCategories = pickFormattedCategoriesByCategoryNames({
    categoryNames,
    formattedCategories,
  });

  return (
    <Wrapper>
      <OverviewWrapper>
        <IconWrapper>
          <Icon src={displayIcon} alt={localeDisplayName} />
        </IconWrapper>
        <ActionButtonsWrapper>{actionButtons}</ActionButtonsWrapper>
      </OverviewWrapper>
      <VersionSelect
        options={versionOptions}
        defaultValue={currentVersion}
        onChange={onVersionChange}
      />
      <BasicInfo>
        <BasicInfoTitle>{t('BASIC_INFORMATION')}</BasicInfoTitle>
        <Descriptions data={basicInfo} variant="unstyled" />
      </BasicInfo>
      {extensionFormattedCategories.length > 0 && (
        <TagsWrapper>
          <TagsTitle>{t('CATEGORIES')}</TagsTitle>
          <Tags>
            {extensionFormattedCategories.map(formattedCategory => (
              <Tag key={formattedCategory?.uid} color="secondary">
                {formattedCategory?.localeDisplayName}
              </Tag>
            ))}
          </Tags>
        </TagsWrapper>
      )}
      {keywords.length > 0 && (
        <TagsWrapper>
          <TagsTitle>{t('KEYWORDS')}</TagsTitle>
          <Tags>
            {keywords.map((keyword, index) => (
              <Tag key={index} color="secondary">
                {keyword}
              </Tag>
            ))}
          </Tags>
        </TagsWrapper>
      )}
    </Wrapper>
  );
}

export { Sidebar };
