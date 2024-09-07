/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useCallback, useState } from 'react';

import { DeleteConfirmModal, DeleteConfirmModalProps } from '../../components/Modals/DeleteConfirm';

export default function useDeleteModal<T extends DeleteConfirmModalProps>({
  data,
  useDeleteMutation,
}: {
  data: T['resource'];
  useDeleteMutation: any;
}) {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleCloseModal = useCallback(() => {
    setDeleteModalVisible(false);
  }, []);

  const { mutate: mutatePVCDelete, isLoading: isDeleteLoading } = useDeleteMutation;

  const handleSubmit = useCallback(() => {
    if (!data) {
      return;
    }
    mutatePVCDelete(data);
  }, []);

  const renderDeleteModal = () =>
    deleteModalVisible && (
      <DeleteConfirmModal
        visible={deleteModalVisible}
        type="USER"
        resource={data}
        confirmLoading={isDeleteLoading}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
      />
    );
  return { renderDeleteModal, setDeleteModalVisible };
}
