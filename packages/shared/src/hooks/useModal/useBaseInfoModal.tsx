/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useCallback, useState } from 'react';

import EditBaseInfoModal from '../../components/Modals/EditBaseInfo';
import { OriginData } from '../../utils/getter';

export default function useBaseInfoModal<T extends OriginData<Record<string, any>>>({
  data,
  usePatchMutation,
}: {
  data: T;
  usePatchMutation: any;
}) {
  const [editBaseInfoVisible, setEditBaseInfoVisible] = useState(false);

  const { mutate: mutateEditBaseInfo, isLoading: isEditBaseInfoLoading } = usePatchMutation;

  const handleSubmit = useCallback((value: OriginData<Record<string, any>>) => {
    mutateEditBaseInfo(value);
  }, []);

  const handleCloseEditBaseModal = useCallback(() => {
    setEditBaseInfoVisible(false);
  }, []);

  const renderBaseInfoModal = () =>
    editBaseInfoVisible && (
      <EditBaseInfoModal
        visible={editBaseInfoVisible}
        initialValues={data}
        onCancel={handleCloseEditBaseModal}
        onOk={handleSubmit}
        confirmLoading={isEditBaseInfoLoading}
      />
    );

  return { renderBaseInfoModal, setEditBaseInfoVisible };
}
