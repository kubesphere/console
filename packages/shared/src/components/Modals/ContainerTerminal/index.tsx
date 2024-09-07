/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { Fragment, useState, useMemo } from 'react';
import { LoadingOverlay, TypeSelect } from '@kubed/components';
import { Docker } from '@kubed/icons';

import { usePodQuery } from '../../../stores/pod';
import { getTerminalUploadUrl, useTerminalWebSocketUrlQuery } from '../../../stores/terminal';
import { Terminal } from '../../Terminal';
import { TerminalWindow } from '../../Terminal/TerminalWindow';
import type { TerminalWindowProps } from '../../Terminal/TerminalWindow';
import {
  TerminalWrapper,
  InfosContainer,
  InfosTitle,
  Infos,
  InfoLabel,
  InfoValue,
  InfoHelp,
} from './styles';
import { getRequestUrl } from '../../../utils';

export interface ContainerTerminalModalProps
  extends Required<Pick<TerminalWindowProps, 'visible' | 'title' | 'onCancel'>> {
  params?: {
    cluster?: string;
    namespace?: string;
    podName?: string;
    containerName?: string;
  };
}

export function ContainerTerminalModal({
  visible,
  title,
  params,
  onCancel,
}: ContainerTerminalModalProps) {
  const cluster = params?.cluster;
  const namespace = params?.namespace;
  const podName = params?.podName;
  const containerName = params?.containerName;

  const [selectedContainerName, setSelectedContainerName] = useState(containerName);

  const { isLoading: isPodQueryLoading, formattedPodDetail } = usePodQuery({
    cluster,
    namespace,
    name: podName,
  });

  const containerOptions = useMemo(() => {
    const defaultContainers = [
      {
        name: selectedContainerName,
        image: t('LOADING'),
      },
    ];
    const containers = formattedPodDetail?.containers ?? defaultContainers;

    return containers.map(({ name, image }) => ({
      value: name,
      label: name,
      icon: <Docker size={40} />,
      description: t('IMAGE_VALUE', {
        value: image,
        interpolation: { escapeValue: false },
      }),
    }));
  }, [selectedContainerName, formattedPodDetail?.containers]);

  const selectedContainer = useMemo(
    () => formattedPodDetail?.containers?.find(item => item.name === selectedContainerName),
    [selectedContainerName, formattedPodDetail?.containers],
  );
  const getResourceInfo = (type: string) => {
    const resources = selectedContainer?.resources ?? {};
    const resourceType = resources[type];

    return (
      resourceType &&
      Object.keys(resourceType)
        .map(key => `${key}: ${resourceType[key]}`)
        .join(' / ')
    );
  };
  const command = selectedContainer?.command ?? [];
  const infos = [
    {
      label: t('STATUS'),
      value: selectedContainer?.ready ? t('RUNNING') : t('UPDATING'),
    },
    { label: t('IMAGE'), value: selectedContainer?.image },
    {
      label: t('COMMAND'),
      value: command.length > 0 ? '-' : command.join(' '),
    },
    { label: t('RESOURCE_REQUESTS'), value: getResourceInfo('requests') },
    { label: t('RESOURCE_LIMITS'), value: getResourceInfo('limits') },
    { label: t('RESTART_PL'), value: selectedContainer?.restartCount },
  ];

  const { isFetching: isTerminalWebSocketUrlQueryFetching, websocketUrl } =
    useTerminalWebSocketUrlQuery({
      cluster,
      namespace,
      pod: podName,
      container: selectedContainerName,
      shell: 'sh',
    });

  const content = (
    <TerminalWrapper>
      <Terminal
        isLoading={isTerminalWebSocketUrlQueryFetching}
        websocketUrl={websocketUrl}
        uploadUrl={getRequestUrl(getTerminalUploadUrl(params!))}
        downloadUrl={getRequestUrl(getTerminalUploadUrl(params!))}
      />
    </TerminalWrapper>
  );

  const tips = (
    <InfosContainer>
      <LoadingOverlay visible={isPodQueryLoading} overlayOpacity={0.7} overlayColor="#fff" />
      {containerOptions.length > 0 && (
        <TypeSelect
          options={containerOptions}
          value={selectedContainerName}
          onChange={setSelectedContainerName}
        />
      )}
      <InfosTitle>{t('BASIC_INFORMATION')}</InfosTitle>
      <Infos>
        {infos.map(({ label, value }, index) => (
          <Fragment key={index}>
            <InfoLabel>{label}</InfoLabel>
            <InfoValue>{value}</InfoValue>
          </Fragment>
        ))}
      </Infos>
      <InfosTitle>{t('COMMAND_REFERENCE')}</InfosTitle>
      <Infos>
        <InfoLabel>{t('SWITCH_SHELL')}</InfoLabel>
        <InfoValue>/bin/bash</InfoValue>
        <InfoHelp>{t('BASH_SHELL_HELP')}</InfoHelp>
      </Infos>
    </InfosContainer>
  );

  return (
    <TerminalWindow
      content={content}
      tips={tips}
      localStorageKey="container-terminal"
      visible={visible}
      title={title}
      onCancel={onCancel}
      showToggleButton={false}
      tipStyles={{ backgroundColor: '#fff' }}
    />
  );
}
