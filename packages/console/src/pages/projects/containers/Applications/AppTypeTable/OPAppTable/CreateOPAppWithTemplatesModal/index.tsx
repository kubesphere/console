/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Drawer } from '@kubed/components';
import { useParams } from 'react-router-dom';

import { Icon } from '@ks-console/shared';
import type { ApplicationsInstanceDetail } from '@ks-console/shared';

import AppDetails from './AppDetails';
import AppsContent from './AppsContent';

import { CloseModal } from './styles';
import { func } from 'prop-types';

type Props = {
  visible: boolean;
  onCancel: () => void;
  openEdgeTemplateAppCreateModal: (appDetail: ApplicationsInstanceDetail) => void;
  openDeployModal: (appDetail: ApplicationsInstanceDetail) => void;
};

function CreateOPAppWithTemplatesModal({
  visible,
  onCancel,
  openDeployModal,
  openEdgeTemplateAppCreateModal,
}: Props): JSX.Element {
  const { workspace } = useParams();
  const [viewType, setViewType] = useState<string>('appList');
  const [currentApp, setCurrentApp] = useState<ApplicationsInstanceDetail>(
    {} as ApplicationsInstanceDetail,
  );
  const [currentRepo] = useState<any>();

  const handleAppItemClick = (appItem: ApplicationsInstanceDetail, view: string): void => {
    setCurrentApp(appItem);
    setViewType(view);
  };

  function handleClick() {
    if (currentApp.spec.appType === 'edge') {
      openEdgeTemplateAppCreateModal(currentApp);
      return;
    }
    openDeployModal(currentApp);
  }
  return (
    <Drawer
      maskClosable
      width={1070}
      placement="right"
      visible={visible}
      onClose={onCancel}
      contentWrapperStyle={{ backgroundColor: '#f9fbfd' }}
    >
      <CloseModal color="dark" shadow onClick={onCancel}>
        <Icon name="close" size={24} color="white" />
      </CloseModal>
      {viewType === 'appList' && (
        // @ts-ignore TODO
        <AppsContent workspace={workspace} repo={currentRepo} onItemClick={handleAppItemClick} />
      )}
      {viewType === 'appDetail' && (
        <AppDetails
          workspace={workspace}
          detail={currentApp}
          setViewType={setViewType}
          onAppInstall={handleClick}
        />
      )}
    </Drawer>
  );
}

export default CreateOPAppWithTemplatesModal;
