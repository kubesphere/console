/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty, keyBy } from 'lodash';
import {
  ClusterDetail,
  DeleteConfirmModal,
  FormattedWorkspace,
  hasPermission,
  workspaceStore,
} from '@ks-console/shared';
import { Alert, Col, FilterInput, Modal, Row, Switch, Tooltip } from '@kubed/components';
import { Information, Key } from '@kubed/icons';
import { useCacheStore as useStore } from '@ks-console/shared';
import WorkspaceItem from './WorkspaceItem';
import { ModalWrapper, AuthedList, Footer, Search, List, Content, Wrapper, Title } from './styles';

export type ClusterAuthWorkspacePayload = {
  public: boolean;
  addWorkspaces: FormattedWorkspace[];
  deleteWorkspaces: FormattedWorkspace[];
};

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOk: (payload: ClusterAuthWorkspacePayload) => void;
}

const { useWorkspaces, useFetchAllWorkspaces } = workspaceStore;

function ClusterVisibility({ visible, onCancel, onOk }: Props) {
  const { cluster } = useParams();
  const [clusterDetail] = useStore<ClusterDetail>('cluster');
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const [showUnAuthTip, setShowUnAuthTip] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(clusterDetail.visibility === 'public');
  const [allWorkspaces, setAllWorkspaces] = useState<FormattedWorkspace[]>([]);
  const [allAuthoredWorkspaces, setAllAuthoredWorkspaces] = useState<FormattedWorkspace[]>([]);
  const [deleteWorkspaces, setDeleteWorkspaces] = useState<FormattedWorkspace[]>([]);
  const [addWorkspaces, setAddWorkspaces] = useState<FormattedWorkspace[]>([]);

  const { data: authoredWorkspaces = [] } = useWorkspaces({
    cluster,
    limit: -1,
    sortBy: 'createTime',
  });

  const { data: workspaces = [], reFetch } = useFetchAllWorkspaces({
    limit: -1,
    sortBy: 'createTime',
  });

  const resource = deleteWorkspaces.map(item => item.name).join(', ');
  const desc =
    deleteWorkspaces.length === 1
      ? t('REMOVE_WORKSPACE_CONFIRM_SI', { resource })
      : t('REMOVE_WORKSPACE_CONFIRM_PL', { resource });

  useEffect(() => {
    setAllAuthoredWorkspaces(authoredWorkspaces);
  }, [authoredWorkspaces]);

  useEffect(() => {
    setAllWorkspaces(workspaces);
  }, [workspaces]);

  const handleWorkspaceAuth = (workspace: FormattedWorkspace) => {
    setAllAuthoredWorkspaces([...allAuthoredWorkspaces, workspace]);
  };

  const handleWorkspaceUnAuth = (workspace: FormattedWorkspace) => {
    const isExistWorkspace = allWorkspaces.filter(ws => ws.name === workspace.name);
    if (isEmpty(isExistWorkspace)) {
      setAllWorkspaces([...allWorkspaces, workspace]);
    }
    setAllAuthoredWorkspaces(allAuthoredWorkspaces.filter(ws => ws.name !== workspace.name));
    setShowUnAuthTip(true);
  };

  const handleConfirm = (params = {}) => {
    onOk({
      public: isPublic,
      addWorkspaces,
      deleteWorkspaces,
      ...params,
    });
  };

  const handleOk = () => {
    const allWorkspacesMap = keyBy(allWorkspaces, 'name');
    const allAuthoredWorkspacesMap = keyBy(allAuthoredWorkspaces, 'name');
    const savedAuthWorkspacesMap = keyBy(authoredWorkspaces, 'name');

    const newAddWorkspaces = allAuthoredWorkspaces.filter(
      workspace => !savedAuthWorkspacesMap[workspace.name],
    );

    const newDeleteWorkspaces = authoredWorkspaces
      .filter(workspace => !allAuthoredWorkspacesMap[workspace.name])
      .map(workspace => allWorkspacesMap[workspace.name]);

    setAddWorkspaces(newAddWorkspaces);
    setDeleteWorkspaces(newDeleteWorkspaces);
    if (newDeleteWorkspaces.length) {
      setDeleteVisible(true);
    } else {
      handleConfirm({
        addWorkspaces: newAddWorkspaces,
        deleteWorkspaces: newDeleteWorkspaces,
      });
    }
  };

  return (
    <>
      <Modal
        width={960}
        titleIcon={<Key size={40} />}
        title={t('EDIT_VISIBILITY')}
        description={t('EDIT_VISIBILITY_DESC')}
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}
      >
        <ModalWrapper>
          {!showUnAuthTip && (
            <Alert className="mb12" showIcon={false} type="warning">
              {t('CLUSTER_VISIBILITY_REMOVE_WARNING')}
            </Alert>
          )}
          {showUnAuthTip && (
            <Alert className="mb12" showIcon={false} type="error">
              {t('CLUSTER_VISIBILITY_REMOVE_WARNING')}
            </Alert>
          )}
          <Wrapper>
            <Row>
              <Col span={6} gutter={[0]}>
                <Title>{t('UNAUTHORIZED')}</Title>
                <Content>
                  <Search>
                    <FilterInput
                      simpleMode
                      onChange={name => reFetch({ name })}
                      onInputChange={name => !name && reFetch({ name })}
                      placeholder={t('SEARCH')}
                    />
                  </Search>
                  <List>
                    {allWorkspaces
                      .filter(
                        workspace => !allAuthoredWorkspaces.find(ws => ws.name === workspace.name),
                      )
                      .map(workspace => (
                        <WorkspaceItem
                          key={workspace.name}
                          workspace={workspace}
                          type="all"
                          onClick={handleWorkspaceAuth}
                          disabled={!!allAuthoredWorkspaces.find(ws => ws.name === workspace.name)}
                        />
                      ))}
                  </List>
                  <Footer>
                    {hasPermission({ module: 'clusters', action: 'global-manage-clusters' }) && (
                      <>
                        <Switch checked={isPublic} onChange={(val: boolean) => setIsPublic(val)} />
                        <span>{t('SET_PUBLIC_CLUSTER')}</span>
                        <Tooltip content={t('CLUSTER_VISIBILITY_A2')}>
                          <Information />
                        </Tooltip>
                      </>
                    )}
                  </Footer>
                </Content>
              </Col>
              <Col span={6} gutter={[0]}>
                <Title>{t('AUTHORIZED')}</Title>
                <Content>
                  <AuthedList>
                    {allAuthoredWorkspaces.map(workspace => (
                      <WorkspaceItem
                        key={workspace.name}
                        workspace={workspace}
                        type="authed"
                        onClick={handleWorkspaceUnAuth}
                      />
                    ))}
                  </AuthedList>
                  <Footer />
                </Content>
              </Col>
            </Row>
          </Wrapper>
        </ModalWrapper>
      </Modal>
      {deleteVisible && (
        <DeleteConfirmModal
          title={t('REMOVE_WORKSPACE_CONFIRM_TITLE')}
          visible={deleteVisible}
          resource={resource}
          tip={desc}
          onOk={handleConfirm}
          onCancel={() => setDeleteVisible(false)}
        />
      )}
    </>
  );
}

export default ClusterVisibility;
