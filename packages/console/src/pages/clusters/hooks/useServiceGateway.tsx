/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { notify, useModal } from '@kubed/components';
import ServiceGatewaySetting from '../components/Modals/ServiceGatewaySetting';

const useServiceGateway = ({ store, callback }: { store: any; callback: any }) => {
  const modal = useModal();

  const editServiceGateway = ({ detail }: { detail: any }) => {
    const modalId = modal.open({
      title: t('EDIT_EXTERNAL_ACCESS'),
      width: 1162,
      footer: null,
      content: (
        <ServiceGatewaySetting
          detail={detail}
          onOK={async (data: Record<string, any>) => {
            await store.put(detail, data);
            notify.success(t('UPDATE_SUCCESSFUL'));
            modal.close(modalId);
            callback?.();
          }}
          onCancel={() => modal.close(modalId)}
        />
      ),
    });
  };

  return { editServiceGateway };
};

export default useServiceGateway;
