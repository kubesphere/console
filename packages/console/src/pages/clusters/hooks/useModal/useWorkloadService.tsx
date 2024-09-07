/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { notify, useModal } from '@kubed/components';
import { StatefulSetServiceModal } from '../../components/Modals';
import { serviceStore } from '@ks-console/shared';

function useWorkloadServiceModal({ callback }: { params?: any; callback?: any }) {
  const modal = useModal();

  const editWorkloadService = ({ type, detail }: { type: string; detail: Record<string, any> }) => {
    const modalId = modal.open({
      title: t('EDIT_SERVICE'),
      width: 1162,
      footer: null,
      content: (
        <StatefulSetServiceModal
          type={type}
          name={detail.name}
          cluster={detail.cluster}
          namespace={detail.namespace}
          serviceName={detail.spec.serviceName}
          onOk={async (data: Record<string, any>) => {
            const { patch } = serviceStore;
            await patch(detail, data);
            notify.success(t('UPDATE_SUCCESSFUL'));
            modal.close(modalId);
            callback?.();
          }}
          onCancel={() => modal.close(modalId)}
        />
      ),
    });
  };

  return { editWorkloadService };
}

export default useWorkloadServiceModal;
