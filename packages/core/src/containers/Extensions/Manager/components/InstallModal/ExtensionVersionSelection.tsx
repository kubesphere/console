/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { find } from 'lodash';
import { LoadingOverlay, Empty, Alert, Tooltip } from '@kubed/components';
import { PlugCircle } from '@kubed/icons';

import type { OriginalExtensionVersionExternalDependency } from '../../../../../types/extension';
import { makeOriginalExtension } from '../../../../../utils/extension';
import type {
  FormattedExtension,
  FormattedExtensionVersion,
} from '../../../../../stores/extension';
import {
  formatExtension,
  useExtensionsQuery,
  useExtensionVersionsQuery,
} from '../../../../../stores/extension';
import { InstallModalActionType } from '../../constants';
import { getIsReady } from './ExtensionVersionSelection.shared.helpers';
import { ExternalDependency } from './ExternalDependency';
import { ExtensionVersions } from './ExtensionVersions';
import {
  getExtensionVersionSelectionConfig,
  getVersionOptions,
  getDefaultSelectedVersion,
} from './ExtensionVersionSelection.helpers';
import {
  Wrapper,
  Dependencies,
  DependenciesEmptyWrapper,
  DependencyHeader,
  DependencyTitle,
  LoadingWrapper,
  StepContentInnerWrapper,
  TipIcon,
} from './ExtensionVersionSelection.styles';

const emptyImage = <PlugCircle size={40} />;

interface ExtensionVersionSelectionProps {
  actionType: InstallModalActionType;
  formattedExtension: FormattedExtension;
  selectedFormattedExtensionVersion: FormattedExtensionVersion | undefined;
  setSelectedFormattedExtensionVersion: Dispatch<
    SetStateAction<FormattedExtensionVersion | undefined>
  >;
  setEnableInstallExtension: Dispatch<boolean>;
}

function ExtensionVersionSelection({
  actionType,
  formattedExtension,
  selectedFormattedExtensionVersion,
  setSelectedFormattedExtensionVersion,
  setEnableInstallExtension,
}: ExtensionVersionSelectionProps) {
  const extensionVersionSelectionConfig = getExtensionVersionSelectionConfig({
    actionType,
    formattedExtension,
  });
  const { name: extensionName, displayVersion } = formattedExtension;

  const externalDependencies = selectedFormattedExtensionVersion?.externalDependencies ?? [];
  const externalRequiredDependencies =
    selectedFormattedExtensionVersion?.externalRequiredDependencies ?? [];
  const externalOptionalDependencies =
    selectedFormattedExtensionVersion?.externalOptionalDependencies ?? [];

  const setSelectedFormattedExtensionVersionByVersion = (
    data: FormattedExtensionVersion[],
    version: string,
  ) => {
    const formattedExtensionVersion = find<FormattedExtensionVersion>(data, { version });
    setSelectedFormattedExtensionVersion(formattedExtensionVersion);
  };

  const { isLoading: isExtensionVersionsQueryLoading, formattedExtensionVersions } =
    useExtensionVersionsQuery({
      extensionName,
      onSuccess: data => {
        const { enabledVersionOptions } = getVersionOptions({
          actionType,
          formattedExtension,
          formattedExtensionVersions: data,
        });
        const defaultSelectedVersion = getDefaultSelectedVersion({
          enabledVersionOptions,
          displayVersion,
        });
        if (defaultSelectedVersion) {
          setSelectedFormattedExtensionVersionByVersion(data, defaultSelectedVersion);
        }
      },
    });
  const { versionOptions, enabledVersionOptions } = getVersionOptions({
    actionType,
    formattedExtension,
    formattedExtensionVersions,
  });
  const defaultSelectedVersion = getDefaultSelectedVersion({
    enabledVersionOptions,
    displayVersion,
  });

  const { isLoading: isExtensionsQueryLoading, formattedExtensions } = useExtensionsQuery();

  useEffect(() => {
    const enableInstallExtensionByVersions = enabledVersionOptions.length > 0 ? true : false;
    const enableInstallExtensionByDependencies =
      externalRequiredDependencies.length > 0
        ? externalRequiredDependencies.every(externalDependency => {
            const { name } = externalDependency;
            const dependencyFormattedExtension = find<FormattedExtension>(formattedExtensions, {
              name,
            });
            if (!dependencyFormattedExtension) {
              return false;
            }
            return getIsReady({
              externalDependency,
              dependencyFormattedExtension,
            });
          })
        : true;
    const enableInstallExtension =
      enableInstallExtensionByVersions && enableInstallExtensionByDependencies;
    setEnableInstallExtension(enableInstallExtension);
  }, [enabledVersionOptions.length, externalRequiredDependencies, formattedExtensions]);

  if (isExtensionVersionsQueryLoading || isExtensionsQueryLoading) {
    return <LoadingOverlay visible overlayOpacity={0} />;
  }

  if (versionOptions.length === 0) {
    return (
      <LoadingWrapper>
        <Empty image={emptyImage} title={t('EXTENSION.EXTENSION_NO_VERSION_DESCRIPTION')} />
      </LoadingWrapper>
    );
  }

  const renderDependencies = ({
    dependencies,
    isRequired,
  }: {
    dependencies: OriginalExtensionVersionExternalDependency[];
    isRequired: boolean;
  }) => {
    if (dependencies.length === 0) {
      return null;
    }

    return (
      <StepContentInnerWrapper>
        <DependencyHeader>
          <DependencyTitle>
            {t(isRequired ? 'REQUIRED_EXTENSIONS' : 'OPTIONAL_EXTENSIONS')}
          </DependencyTitle>
          {!isRequired && (
            <Tooltip content={t('OPTIONAL_DEPENDENCY_TIP')}>
              <TipIcon size={16} />
            </Tooltip>
          )}
        </DependencyHeader>
        <Dependencies>
          {dependencies.map(dependency => {
            const { name } = dependency;
            const fakeOriginalExtension = makeOriginalExtension({
              data: { metadata: { name } },
            });
            const targetFormattedExtension = find<FormattedExtension>(formattedExtensions, {
              name,
            });
            const dependencyFormattedExtension =
              targetFormattedExtension ?? formatExtension(fakeOriginalExtension);
            const isExtensionExists = Boolean(targetFormattedExtension);

            return (
              <ExternalDependency
                key={name}
                formattedExtension={formattedExtension}
                externalDependency={dependency}
                dependencyFormattedExtension={dependencyFormattedExtension}
                isExtensionExists={isExtensionExists}
              />
            );
          })}
        </Dependencies>
      </StepContentInnerWrapper>
    );
  };

  const renderAllDependencies = () => {
    if (externalDependencies.length === 0) {
      return (
        <DependenciesEmptyWrapper>
          <Empty
            image={emptyImage}
            title={t('EXTENSION_DEPENDENCIES_NOT_FOUND')}
            description={t('THE_CURRENT_EXTENSION_VERSION_HAS_NO_DEPENDENCIES')}
          />
        </DependenciesEmptyWrapper>
      );
    }

    return (
      <>
        {renderDependencies({ dependencies: externalRequiredDependencies, isRequired: true })}
        {renderDependencies({ dependencies: externalOptionalDependencies, isRequired: false })}
      </>
    );
  };

  return (
    <Wrapper>
      {extensionVersionSelectionConfig?.hasUpdateWarning && (
        <Alert type="warning" showIcon={false}>
          {t('UPDATE_WARNING')}
        </Alert>
      )}
      <ExtensionVersions
        options={versionOptions}
        defaultValue={defaultSelectedVersion}
        isDisabled={extensionVersionSelectionConfig?.disabledVersionSelector}
        onChange={(value: string) =>
          setSelectedFormattedExtensionVersionByVersion(formattedExtensionVersions, value)
        }
      />
      {renderAllDependencies()}
    </Wrapper>
  );
}

export { ExtensionVersionSelection };
