/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { notify, useModal } from '@kubed/components';
import { Firewall } from '@kubed/icons';
import { PathParams } from '@ks-console/shared';
import RoutesRuleEdit from '../../projects/components/Modals/RoutesRuleEdit';

const useEditRoutesRule = ({
  store,
  params,
  callback,
}: {
  store: any;
  params: PathParams;
  callback: () => void;
}) => {
  const modal = useModal();
  const { usePatchMutation } = store;
  const { mutate } = usePatchMutation(
    {},
    {
      onSuccess: () => {
        notify.success(t('UPDATE_SUCCESSFUL'));
        callback?.();
      },
    },
  );

  const editRoutesRule = ({
    record,
    originData,
  }: {
    record: Record<string, any>;
    originData: Record<string, any>;
  }) => {
    const modalId = modal.open({
      title: t('EDIT_ROUTING_RULES'),
      titleIcon: <Firewall />,
      width: 960,
      footer: null,
      content: (
        <RoutesRuleEdit
          cluster={params.cluster}
          detail={originData}
          onOK={(data: Record<string, any>) => {
            mutate({ data, params: record });
            modal.close(modalId);
          }}
          closeModal={() => modal.close(modalId)}
        />
      ),
    });
  };

  return { editRoutesRule };
};

export default useEditRoutesRule;
