import React, { MouseEvent } from 'react';
import { createCenterWindowOpt } from '@ks-console/shared';
import { Card, Field } from '@kubed/components';
import { Data, Terminal } from '@kubed/icons';
import { Area, AreaWrapper, Text } from '../styles';

interface Props {
  cluster: string;
  insideTitle?: boolean;
}

function Tools({ cluster, insideTitle }: Props) {
  const getWindowOpts = () => {
    return createCenterWindowOpt({
      width: 1200,
      height: 800,
      scrollbars: 1,
      resizable: 1,
    });
  };

  const handleTool = (e: MouseEvent<HTMLDivElement>) => {
    window.open(e.currentTarget.dataset.url, e.currentTarget.dataset.title, getWindowOpts());
  };

  return (
    <Card sectionTitle={!insideTitle ? t('TOOLS') : ''} padding={12}>
      {insideTitle && (
        <Text className="mb12" fontSize={14}>
          {t('TOOLS')}
        </Text>
      )}
      <AreaWrapper columns={2}>
        <Area data-title="KubeCtl" data-url={`/terminal/kubectl/${cluster}`} onClick={handleTool}>
          <Field value="kubectl" label={t('KUBECTL_DESC')} avatar={<Terminal size={40} />} />
        </Area>
        <Area
          data-title="KubeConfig"
          data-url={`/clusters/${cluster}/kubeConfig`}
          onClick={handleTool}
        >
          <Field value="kubeconfig" label={t('KUBECONFIG_DESC')} avatar={<Data size={40} />} />
        </Area>
      </AreaWrapper>
    </Card>
  );
}

export default Tools;
