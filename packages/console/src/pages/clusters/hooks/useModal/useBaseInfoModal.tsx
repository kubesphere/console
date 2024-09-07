/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useCallback } from 'react';
import { EditBaseInfoModal } from '@ks-console/shared';
import type { OriginData, PathParams } from '@ks-console/shared';

export default function useBaseInfoModal<T extends OriginData<Record<string, any>>>({
  params,
  data,
  usePatchMutation,
}: {
  params: PathParams;
  data: T;
  usePatchMutation: any;
}) {
  const [editBaseInfoVisible, setEditBaseInfoVisible] = useState(false);

  const { mutate: mutateEditBaseInfo, isLoading: isEditBaseInfoLoading } = usePatchMutation;

  const handleSubmit = useCallback((value: OriginData<Record<string, any>>) => {
    mutateEditBaseInfo({ params, data: value });
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
