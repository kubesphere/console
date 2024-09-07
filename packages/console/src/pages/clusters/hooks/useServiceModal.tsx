/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { notify, useModal } from '@kubed/components';
import ServiceSetting from '../../projects/components/Modals/ServiceSetting';

function useEditServiceModal({ store, callback }: { store: any; callback: any }) {
  const modal = useModal();

  const editServiceModal = ({ detail }: { detail: Record<string, any> }) => {
    const { type, module, cluster } = detail;

    const modalId = modal.open({
      title: t('EDIT_SERVICE'),
      width: 1162,
      footer: null,
      content: (
        <ServiceSetting
          type={type}
          module={module}
          cluster={cluster}
          detail={detail}
          onOk={async (data: Record<string, any>) => {
            const { put } = store;
            await put(detail, data);
            notify.success(t('UPDATE_SUCCESSFUL'));
            callback?.();
            modal.close(modalId);
          }}
          onCancel={() => modal.close(modalId)}
        />
      ),
    });
  };

  return { editServiceModal };
}

export default useEditServiceModal;
