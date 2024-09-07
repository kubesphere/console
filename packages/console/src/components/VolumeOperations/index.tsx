/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Alert, Field, Modal, Switch } from '@kubed/components';
import * as React from 'react';

import { Card, ModalContent } from './styles';
import { get, isString, isUndefined } from 'lodash';
import { StorageClassDetail } from '@ks-console/shared';

interface VolumeOperationsModalProps {
  visible: boolean;
  onCancel: () => void;
  confirmLoading: boolean;
  onOk: (d: Partial<Record<'allowClone' | 'allowSnapshot' | 'allowVolumeExpansion', any>>) => void;
  detail: StorageClassDetail;
}

const getState = (detail: Record<string, any>) => {
  return {
    allowClone: get(detail.annotations, 'storageclass.kubesphere.io/allow-clone', undefined),
    allowSnapshot: get(detail.annotations, 'storageclass.kubesphere.io/allow-snapshot', undefined),
    allowVolumeExpansion: get(detail, 'allowVolumeExpansion', undefined),
  };
};
const VolumeOperationsModal = (props: VolumeOperationsModalProps) => {
  const { visible, onCancel, confirmLoading, onOk, detail } = props;

  const [state, setState] = React.useState(getState(detail));
  const handleChange = (key: string) => (value: boolean) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const handleOk = () => {
    onOk(state);
  };

  const dataUndefined = (data: unknown) => {
    return isUndefined(data) ? false : isString(data) ? JSON.parse(data) : data;
  };

  const items = [
    {
      title: t('VOLUME_CLONING'),
      des: t('VOLUME_CLONING_DESC'),
      key: 'allowClone',
    },
    {
      title: t('VOLUME_SNAPSHOT_CREATION'),
      des: t('VOLUME_SNAPSHOT_CREATION_DESC'),
      key: 'allowSnapshot',
    },
    {
      title: t('VOLUME_EXPANSION'),
      des: t('VOLUME_EXPANSION_DESC'),
      key: 'allowVolumeExpansion',
    },
  ];
  return (
    <Modal
      title={t('SET_AUTHORIZATION_RULES')}
      width={600}
      visible={visible}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
      onOk={handleOk}
    >
      <ModalContent>
        <Alert showIcon={false} type="warning" children={t('SET_VOLUME_OPERATIONS_TIP')} />
        {items.map(item => {
          const status = state[item.key as keyof typeof state];
          const checked = dataUndefined(status);
          return (
            <Card>
              <Switch
                disabled={isUndefined(status)}
                checked={checked}
                onChange={handleChange(item.key)}
              />
              <Field label={item.des} value={item.title} />
            </Card>
          );
        })}
      </ModalContent>
    </Modal>
  );
};

export default VolumeOperationsModal;
