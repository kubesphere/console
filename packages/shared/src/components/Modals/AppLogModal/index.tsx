/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { StyledModal, EmptyWrapper } from './styles';
import { useRef } from 'react';
import { ModalProps } from '@kubed/components';
import React from 'react';
import { openpitrixStore } from '../../../stores';
import ContainerLog from '../../Containers/Log';
import { get, isEmpty, last } from 'lodash';

interface AppLogModalProps extends Required<Pick<ModalProps, 'visible' | 'onCancel'>> {
  visible: boolean;
  cluster: string;
  namespace: string;
  jobName: string;
  initialTitle: string;
}

const { usePodForJobList } = openpitrixStore;

function AppLogModal({
  visible,
  initialTitle,
  cluster,
  namespace,
  jobName,
  onCancel,
}: AppLogModalProps) {
  const titleRef = useRef(initialTitle);
  const { data, isLoading } = usePodForJobList({ cluster, namespace, jobName });

  const lastPodName = get(last(data), 'name', '');

  const renderContainerLog = () => {
    if (isEmpty(lastPodName)) {
      return (
        <EmptyWrapper
          title={t('NO_DATA')}
          image={<img src="/assets/empty-card.svg" />}
          imageStyle={{ width: '100%', background: 'none' }}
        />
      );
    }

    return (
      <ContainerLog
        namespace={namespace}
        podName={lastPodName}
        downloadFilename={lastPodName}
        cluster={cluster}
      />
    );
  };

  return (
    <StyledModal
      zIndex={10000}
      visible={visible}
      title={titleRef.current}
      width={960}
      footer={null}
      maskClosable={false}
      onCancel={onCancel}
    >
      {!isLoading && renderContainerLog()}
    </StyledModal>
  );
}

export { AppLogModal, AppLogModalProps };
