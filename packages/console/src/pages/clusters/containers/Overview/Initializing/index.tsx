/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useCallback } from 'react';
import { get } from 'lodash';
import { useQueries } from 'react-query';
import {
  useWebSocket,
  clusterStore,
  ClusterDetail,
  copyToClipboard,
  kubekeyClusterStore,
  FormattedKubeKey,
  EditYamlConfig,
  useYamlModal,
  yaml,
  useCacheStore as useStore,
} from '@ks-console/shared';
import { Cluster, More, Pen, Refresh } from '@kubed/icons';
import { CodeEditor } from '@kubed/code-editor';
import { Button, Card, Dropdown, Field, Loading, MenuItem, notify } from '@kubed/components';
import KubekeyCluster from './KubeKeyCluster';
import { CardContainer, Content, CopyButton, DarkMenu, Title } from './style';

const { fetchAgent, getWatchUrl, fetchDetail, module } = clusterStore;
const {
  getWatchUrl: getKubekeyWatchUrl,
  formatKKCluster,
  module: kubekeyModule,
  useUpdateMutation,
  usePatchMutation,
} = kubekeyClusterStore;

function Initializing() {
  const [cluster, setCluster] = useStore<ClusterDetail>('cluster');
  const [kubekeyCluster, setKubekeyCluster] = useStore('kubekeyCluster');

  const { conditions, name, kkName, connectionType } = cluster;

  const [{ refetch }, { data: agent, isLoading: isAgentLoading }] = useQueries([
    {
      queryKey: ['clusters', cluster],
      queryFn: () => {
        return fetchDetail({ name });
      },
      // FIXME: If the request is repeated in a very short time, onSuccess will not be triggered
      onSuccess: (data: ClusterDetail) => {
        if (data.isReady) {
          setCluster(data);
        }
      },
    },
    {
      queryKey: ['clusterAgent', cluster],
      queryFn: async () => {
        return fetchAgent({ cluster: name });
      },
      enabled: get(conditions, 'Initialized.status') === 'True',
    },
  ]);

  useWebSocket({
    module,
    url: getWatchUrl({ name }),
    onModified: message => {
      refetch();
      if (message?.message?.formattedItem?.isReady) {
        setCluster(message?.message?.formattedItem);
      }
    },
    onAdded: message => {
      refetch();
      if (message?.message?.formattedItem?.isReady) {
        setCluster(message?.message?.formattedItem);
      }
    },
    format: clusterStore.mapper,
  });

  const url = getKubekeyWatchUrl({ name: kkName });

  useWebSocket({
    module: kubekeyModule,
    url,
    onMessage: ({ message }) => {
      if (message.type === 'MODIFIED' || message.type === 'ADDED') {
        setKubekeyCluster(formatKKCluster(message.object));
      }
    },
    enabled: url && kkName,
  });

  const handleCopy = useCallback(() => {
    copyToClipboard(agent!);
    notify.success(t('COPY_SUCCESSFUL'));
  }, [agent]);

  const { renderYamlModal, setEditYamlConfig } = useYamlModal<
    FormattedKubeKey,
    EditYamlConfig<FormattedKubeKey>
  >({
    data: {
      editResource: null,
      visible: false,
      yaml: '',
      readOnly: false,
    },
    useYamlMutation: () =>
      useUpdateMutation(
        {
          ...kubekeyCluster,
        },
        {
          onSuccess: () => {
            setEditYamlConfig({
              editResource: null,
              visible: false,
              yaml: '',
              readOnly: false,
            });
            notify.success(t('UPDATE_SUCCESSFUL'));
            refetch();
          },
        },
      ),
  });

  const { mutate: mutateKukekeyCluster } = usePatchMutation({
    ...kubekeyCluster,
  });

  const rerun = () => {
    mutateKukekeyCluster(kubekeyCluster, {
      spec: {
        rerunTrigger: new Date().getTime(),
      },
    });
  };

  if (get(conditions, 'Initialized.status') === 'False') {
    return (
      <Card>
        <Title>
          <Loading style={{ marginRight: '18px' }} size={28} />
          <Field
            label={get(conditions, 'Initialized.reason')}
            value={t('CLUSTER_INIT_FAILED')}
          ></Field>
        </Title>
      </Card>
    );
  }

  if (kkName) {
    return (
      <Card>
        <Title>
          <Field
            avatar={<Cluster size={40} />}
            label={<span dangerouslySetInnerHTML={{ __html: t('CREATING_CLUSTER_DESC') }}></span>}
            value={t('CREATING_CLUSTER')}
          ></Field>
          <Dropdown
            content={
              <DarkMenu>
                <MenuItem
                  onClick={() =>
                    setEditYamlConfig({
                      visible: true,
                      yaml: yaml.getValue(kubekeyCluster?._originData),
                      readOnly: false,
                      editResource: kubekeyCluster,
                    })
                  }
                >
                  <Pen />
                  {t('EDIT_YAML')}
                </MenuItem>
                <MenuItem onClick={rerun}>
                  <Refresh />
                  {t('RERUN')}
                </MenuItem>
              </DarkMenu>
            }
            placement="bottom-end"
          >
            <Button>
              <More />
            </Button>
          </Dropdown>
        </Title>
        <KubekeyCluster />
        {renderYamlModal()}
      </Card>
    );
  }

  return (
    <Card>
      <Title>
        <Loading style={{ marginRight: '18px' }} size={28} />
        <Field label={t('WAIT_FOR_CLUSTER_DESC')} value={t('WAIT_FOR_CLUSTER')} />
      </Title>
      {connectionType === 'proxy' && (
        <Content>
          <CardContainer>
            <Field
              value={<span dangerouslySetInnerHTML={{ __html: t('CLUSTER_AGENT_TIP_1') }}></span>}
            ></Field>
          </CardContainer>
          <CardContainer>
            <Field
              style={{ marginBottom: '12px' }}
              value={<span dangerouslySetInnerHTML={{ __html: t('CLUSTER_AGENT_TIP_2') }}></span>}
            ></Field>
            <CopyButton onClick={handleCopy}>{t('COPY')}</CopyButton>
            {isAgentLoading ? (
              <Loading />
            ) : (
              agent && (
                <CodeEditor
                  mode="yaml"
                  value={agent}
                  width="100%"
                  height="100%"
                  readOnly={true}
                ></CodeEditor>
              )
            )}
          </CardContainer>
          <CardContainer>
            <Field
              value={<span dangerouslySetInnerHTML={{ __html: t('CLUSTER_AGENT_TIP_3') }}></span>}
              label={
                <span dangerouslySetInnerHTML={{ __html: t('CLUSTER_AGENT_TIP_3_DESC') }}></span>
              }
            ></Field>
          </CardContainer>
        </Content>
      )}
    </Card>
  );
}

export default Initializing;
