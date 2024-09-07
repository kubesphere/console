/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { DeleteConfirmModal, EditBaseInfoModal, isMultiCluster } from '@ks-console/shared';
import EditAnnotationsModal from '../../../../../components/EditAnnotations';
import EditDefaultContainerQuotas from '../../../../../components/EditDefaultContainerQuotas';
import EditQuotas from '../../../../../components/EditQuotas';
import { AssignWorkspaceModal, CreateProjectModal } from '../../../components/Modals';
import { getUseBaseModal, withModalMutationHoc } from '../../../../../components/useModal';
import {
  useProjectAnnotations,
  useProjectCreate,
  useProjectDelete,
  useProjectEditBase,
  useProjectEditDefaultQuotas,
  useProjectModify,
  useProjectQuotas,
} from './useProjectActions';

const EditProjectBaseModal = withModalMutationHoc<any>(useProjectEditBase)(EditBaseInfoModal);

const DeleteProjectModal = withModalMutationHoc<any>(useProjectDelete)(DeleteConfirmModal);

const ModifyProjectModal = withModalMutationHoc<any>(useProjectModify)(AssignWorkspaceModal);

const ProjectCreateModal = withModalMutationHoc<any>(useProjectCreate)(CreateProjectModal);

const EditProjectQuotasModal = withModalMutationHoc<any>(useProjectQuotas)(EditQuotas);

const EditProjectAnnotationsModal =
  withModalMutationHoc<any>(useProjectAnnotations)(EditAnnotationsModal);

const EditProjectDefaultContainerQuotasModal = withModalMutationHoc<any>(
  useProjectEditDefaultQuotas,
)(EditDefaultContainerQuotas);

export const useProjectEditBaseModal = (key = 'projectEditBaseKey') =>
  getUseBaseModal(EditProjectBaseModal)({ key });

export const useProjectDeleteModal = (key = 'projectDeleteKey') =>
  getUseBaseModal(DeleteProjectModal)({ key });

export const useProjectAnnotationsModal = ({
  deps,
  key = 'projectAnnotationsKey',
}: {
  deps?: Record<string, any>;
  key?: string;
} = {}) => getUseBaseModal(EditProjectAnnotationsModal)({ key, deps });

export const useProjectModifyModal = ({ key = 'projectModify' } = {}) =>
  getUseBaseModal(ModifyProjectModal)({ key });

const getProjectTemplate = (cluster: string) => ({
  cluster,
  apiVersion: 'v1',
  kind: 'Namespace',
  metadata: {
    labels: {},
  },
});

export const useProjectCreateModal = ({ key = 'projectCreate' } = {}) =>
  getUseBaseModal(ProjectCreateModal, ({ params: { cluster } }: any) => ({
    hideCluster: !isMultiCluster() || !!cluster,
    initialValues: getProjectTemplate(cluster),
  }))({ key });

export const useProjectEditDefaultQuotasModal = ({
  key = 'projectEditDefaultQuotas',
  deps = {},
}: {
  key?: string;
  deps?: Record<string, any>;
} = {}) =>
  getUseBaseModal(EditProjectDefaultContainerQuotasModal, ({ params }) => {
    return {
      supportGpuSelect: true,
      namespace: params.namespace,
      cluster: params.cluster,
    };
  })({ key, deps });

export const useProjectEditQuotasModal = ({
  key = 'projectEditQuotas',
  deps = {},
}: {
  key?: string;
  deps?: Record<string, any>;
} = {}) => getUseBaseModal(EditProjectQuotasModal)({ key, deps });
