/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Field, Tooltip } from '@kubed/components';

import { StatusIndicator } from '@ks-console/shared';
import type { OriginalExtensionVersionExternalDependency } from '../../../../../types/extension';
import { EXTENSIONS_PAGE_PATHS } from '../../../../../constants/extension';
import type { FormattedExtension } from '../../../../../stores/extension';
import { getIsReady } from './ExtensionVersionSelection.shared.helpers';
import { getUnreadyTip } from './ExternalDependency.helpers';
import {
  StyledEntity,
  DependencyIcon,
  ExtensionNotExistsNameWrapper,
  InfoIcon,
  Tip,
} from './ExternalDependency.styles';

interface ExternalDependencyProps {
  formattedExtension: FormattedExtension;
  externalDependency: OriginalExtensionVersionExternalDependency;
  dependencyFormattedExtension: FormattedExtension;
  isExtensionExists: boolean;
}

function ExternalDependency({
  formattedExtension,
  externalDependency,
  dependencyFormattedExtension,
  isExtensionExists,
}: ExternalDependencyProps) {
  const { name, required, version } = externalDependency;
  const displayIcon = dependencyFormattedExtension?.displayIcon;
  const dependencyLocaleDisplayName = dependencyFormattedExtension?.localeDisplayName;
  const localeDescription = dependencyFormattedExtension?.localeDescription;

  const nameContent = isExtensionExists ? (
    <Link to={EXTENSIONS_PAGE_PATHS.manager.getDetail(name)}>{dependencyLocaleDisplayName}</Link>
  ) : (
    <ExtensionNotExistsNameWrapper>
      <span>{dependencyLocaleDisplayName}</span>
      <Tooltip content={t('EXTENSION_NOT_EXISTS_TIP')}>
        <InfoIcon size={16} />
      </Tooltip>
    </ExtensionNotExistsNameWrapper>
  );

  const isReady = getIsReady({
    externalDependency,
    dependencyFormattedExtension: dependencyFormattedExtension,
  });
  const status = isReady ? (
    <StatusIndicator type="ready">{t('READY')}</StatusIndicator>
  ) : (
    <StatusIndicator type="unready">{t('UNREADY')}</StatusIndicator>
  );

  let footer = null;
  if (required && !isReady) {
    const tip = getUnreadyTip({
      formattedExtension,
      externalDependency,
      dependencyFormattedExtension,
    });
    footer = <Tip dangerouslySetInnerHTML={{ __html: tip }} />;
  }

  return (
    <StyledEntity key={name} hoverable footer={footer}>
      <Field
        width="50%"
        avatar={<DependencyIcon src={displayIcon} alt={dependencyLocaleDisplayName} />}
        label={localeDescription}
        value={nameContent}
      />
      <Field width="25%" label={t('STATUS')} value={status} />
      <Field width="25%" label={t('SATISFIED_VERSION')} value={version} />
    </StyledEntity>
  );
}

export { ExternalDependency };
