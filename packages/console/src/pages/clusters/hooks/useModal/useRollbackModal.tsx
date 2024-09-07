/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useCallback } from 'react';
import { OriginData } from '@ks-console/shared';
import RollbackModal from '../../components/Modals/RollbackModal';

export default function useRollbackModal<T extends OriginData<Record<string, any>>>({
  module,
  detail,
  data,
  usePatchMutation,
}: {
  module: string;
  detail: Record<string, any>;
  data: T;
  usePatchMutation: any;
}) {
  const [rollbackVisible, setRollbackVisible] = useState(false);

  const { mutate: mutateEditBaseInfo, isLoading: isEditBaseInfoLoading } = usePatchMutation;

  const handleSubmit = useCallback((value: OriginData<Record<string, any>>) => {
    mutateEditBaseInfo(value);
  }, []);

  const handleCloseEditBaseModal = useCallback(() => {
    setRollbackVisible(false);
  }, []);

  const renderRollbackModal = () => {
    return (
      rollbackVisible && (
        <RollbackModal
          module={module}
          detail={detail}
          visible={rollbackVisible}
          initialValues={data}
          onCancel={handleCloseEditBaseModal}
          onOk={handleSubmit}
          confirmLoading={isEditBaseInfoLoading}
        />
      )
    );
  };

  return { renderRollbackModal, setRollbackVisible };
}
