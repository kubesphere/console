/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import React, { useState, useCallback } from 'react';
import { OriginData, hpaStore } from '@ks-console/shared';
import AutoScalingModal from '../../components/Modals/AutoScalingModal';

const { createHpa } = hpaStore;

export default function useAutoScalingModal<T extends OriginData<Record<string, any>>>({
  module,
  detail,
  data,
  usePatchMutation,
  mutateUpdateDeploymentMutation,
}: {
  module: string;
  detail: Record<string, any>;
  data: T;
  usePatchMutation: any;
  mutateUpdateDeploymentMutation?: any;
}) {
  const [scaleVisible, setScaleVisible] = useState(false);
  const { mutate: mutateScale, isLoading: confirmLoading } = usePatchMutation;
  const handleSubmit = useCallback(
    async (value: OriginData<Record<string, any>>, isEdit: boolean) => {
      if (isEdit) {
        mutateScale(value);
      } else {
        await createHpa(detail, value);
        mutateUpdateDeploymentMutation?.mutate({
          params: detail,
          data: {
            metadata: {
              annotations: {
                'kubesphere.io/relatedHPA': get(value, 'metadata.name', detail.name),
              },
            },
          },
        });
      }
    },
    [detail],
  );

  const handleCloseEditBaseModal = useCallback(() => {
    setScaleVisible(false);
  }, []);

  const renderAutoScalingModal = () => {
    return (
      scaleVisible && (
        <AutoScalingModal
          module={module}
          detail={detail}
          data={data}
          visible={scaleVisible}
          onCancel={handleCloseEditBaseModal}
          onOk={handleSubmit}
          confirmLoading={confirmLoading}
        />
      )
    );
  };

  return { renderAutoScalingModal, setScaleVisible };
}
