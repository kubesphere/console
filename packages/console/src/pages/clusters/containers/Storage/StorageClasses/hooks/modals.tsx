/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { getUseBaseModal, withModalMutationHoc } from '../../../../../../components/useModal';
import AuthorizationRules from '../../../../../../components/AuthorizationRules';
import VolumeOperationsModal from '../../../../../../components/VolumeOperations';
import EditAutoExpansionModal from '../../../../../../components/EditAutoExpansion';
import EditDefaultStorageClass from '../../../../../../components/EditDefaultStorageClass';

import {
  useAutoresizer,
  usePatchStorageClasses,
  usePutAccessor,
  useUpdateDefaultStorageClasses,
} from './actions';

const EditAuthorizationRules = withModalMutationHoc<any>(usePutAccessor)(AuthorizationRules);

const EditVolumeOperations =
  withModalMutationHoc<any>(usePatchStorageClasses)(VolumeOperationsModal);

const EditAutoExpansion = withModalMutationHoc<any>(useAutoresizer)(EditAutoExpansionModal);

const EditDefaultStorageClassModal = withModalMutationHoc<any>(useUpdateDefaultStorageClasses)(
  EditDefaultStorageClass,
);

export const useEditAuthorizationRules = ({ key = 'editAuthorizationRules', deps = {} } = {}) =>
  getUseBaseModal(EditAuthorizationRules)({ key, deps });

export const useEditVolumeOperations = ({ key = 'editVolumeOperations', deps = {} } = {}) =>
  getUseBaseModal(EditVolumeOperations)({ key, deps });

export const useEditAutoExpansion = ({ key = 'editAutoExpansion' } = {}) =>
  getUseBaseModal(EditAutoExpansion)({ key });

export const useEditDefaultStorageClass = ({ key = 'editDefaultStorageClass' } = {}) =>
  getUseBaseModal(EditDefaultStorageClassModal)({ key });
