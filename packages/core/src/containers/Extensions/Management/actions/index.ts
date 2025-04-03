/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { UseMutateFunction } from 'react-query';
import { debounce } from 'lodash';
import { notify } from '@kubed/components';

import type {
  ExtensionStatusState,
  OriginalInstallPlan,
  OriginalInstallPlanClusterSchedulingPlacement,
  FormattedInstallPlanClusterSchedulingOverrides,
  UpdateInstallPlanMutationVariables,
  DeleteInstallPlanMutationVariables,
} from '../../../../types/extension';
import type { FormattedExtension } from '../../../../stores/extension';
import { EXTENSION_STATUS_STATE_MAP } from '../../../../constants/extension';
import { DEBOUNCE_WAIT } from '../constants';

const debouncedNotifySuccess = debounce(notify.success, DEBOUNCE_WAIT);

interface UpdateInstallPlanBaseOptions<TVariables> {
  formattedExtension: FormattedExtension;
  mutate: UseMutateFunction<OriginalInstallPlan, unknown, TVariables>;
  onSuccess?: (data: OriginalInstallPlan, variables: TVariables, context: unknown) => void;
}

interface UpdateInstallPlanEnabledOptions
  extends UpdateInstallPlanBaseOptions<UpdateInstallPlanMutationVariables> {
  enabled: boolean;
}

export function updateInstallPlanEnabled({
  formattedExtension,
  enabled,
  mutate,
  onSuccess,
}: UpdateInstallPlanEnabledOptions) {
  const localeDisplayName = formattedExtension.localeDisplayName;
  let loadingMessage = '';
  if (enabled) {
    loadingMessage = t('ENABLE_EXTENSION_ING', { extensionLocaleDisplayName: localeDisplayName });
  } else {
    loadingMessage = t('DISABLE_EXTENSION_ING', {
      extensionLocaleDisplayName: localeDisplayName,
    });
  }
  const messageId = notify.loading(loadingMessage);

  mutate(
    {
      extensionName: formattedExtension.name,
      enabled,
    },
    {
      onSuccess: (data, variables, context) => {
        let successMessage = '';
        if (enabled) {
          successMessage = t('EXTENSION_ENABLED', {
            extensionLocaleDisplayName: localeDisplayName,
          });
        } else {
          successMessage = t('EXTENSION_DISABLED', {
            extensionLocaleDisplayName: localeDisplayName,
          });
        }
        notify.success(successMessage, { id: messageId });
        onSuccess?.(data, variables, context);
      },
    },
  );
}

interface UpdateInstallPlanConfigOptions
  extends UpdateInstallPlanBaseOptions<UpdateInstallPlanMutationVariables> {
  config: string;
}

export function updateInstallPlanConfig({
  formattedExtension,
  config,
  mutate,
  onSuccess,
}: UpdateInstallPlanConfigOptions) {
  // const messageId = notify.loading(t('SET_EXTENSION_CONFIG_ING'));

  mutate(
    {
      extensionName: formattedExtension.name,
      config,
    },
    {
      // onSuccess is not triggered
      onSuccess: (data, variables, context) => {
        // notify.success(t('SET_EXTENSION_CONFIG_SUCCESSFULLY'), { id: messageId });
        onSuccess?.(data, variables, context);
      },
    },
  );
}

interface UpdateInstallPlanClusterSchedulingOptions
  extends UpdateInstallPlanBaseOptions<UpdateInstallPlanMutationVariables> {
  clusterScheduling:
    | {
        placement: OriginalInstallPlanClusterSchedulingPlacement;
        overrides: FormattedInstallPlanClusterSchedulingOverrides[];
      }
    | {
        placement: OriginalInstallPlanClusterSchedulingPlacement;
      }
    | {
        overrides: FormattedInstallPlanClusterSchedulingOverrides[];
      };
}

export function updateInstallPlanClusterScheduling({
  formattedExtension,
  clusterScheduling,
  mutate,
  onSuccess,
}: UpdateInstallPlanClusterSchedulingOptions) {
  mutate(
    {
      extensionName: formattedExtension.name,
      clusterScheduling: clusterScheduling,
    },
    {
      onSuccess: (data, variables, context) => {
        onSuccess?.(data, variables, context);
      },
    },
  );
}

type DeleteInstallPlanOptions = UpdateInstallPlanBaseOptions<DeleteInstallPlanMutationVariables>;

export function deleteInstallPlan({
  formattedExtension,
  mutate,
  onSuccess,
}: DeleteInstallPlanOptions) {
  mutate({ extensionName: formattedExtension.name }, { onSuccess });
}

export const forceDeleteInstallPlan = deleteInstallPlan;

interface HandleInstalledOptions {
  localeDisplayName: string;
  statusState?: ExtensionStatusState;
}

export function handleInstalled({ localeDisplayName, statusState }: HandleInstalledOptions) {
  if (statusState === EXTENSION_STATUS_STATE_MAP.installed) {
    debouncedNotifySuccess(
      t('EXTENSION_INSTALLED', { extensionLocaleDisplayName: localeDisplayName }),
    );
  }
}

type HandleUninstalledOptions = HandleInstalledOptions;

export function handleUninstalled({ localeDisplayName, statusState }: HandleUninstalledOptions) {
  if (statusState === EXTENSION_STATUS_STATE_MAP.uninstalled) {
    debouncedNotifySuccess(
      t('EXTENSION_UNINSTALLED', { extensionLocaleDisplayName: localeDisplayName }),
    );
  }
}
