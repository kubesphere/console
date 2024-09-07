/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ChangeEvent, useState } from 'react';
import { Close, Kubesphere } from '@kubed/icons';
import { Button, Input, Alert, Text, SliderConfirm } from '@kubed/components';
import { ClusterDetail, formatTime, ClusterTitle } from '@ks-console/shared';

import {
  Wrapper,
  Header,
  Desc,
  Info,
  Item,
  Label,
  Value,
  ClusterBox,
  InputTitle,
  ConfirmInput,
  ConfirmFooter,
} from './styles';

type Props = {
  cluster: ClusterDetail;
  onCancel: () => void;
  onOk: () => void;
};

function ClusterUnbindModal({ cluster, onCancel, onOk }: Props): JSX.Element {
  const [inputName, setInputName] = useState<string>('');
  const [showSlider, setShowSlider] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setInputName(e.target.value);
  }

  const handleSliderConfirm = () => {
    setShowSlider(false);
  };

  const handleOk = async () => {
    setIsSubmitting(true);
    await onOk();
    setIsSubmitting(false);
  };

  const renderFooter = () => {
    return (
      <ConfirmFooter>
        <Button style={{ marginRight: '12px' }} onClick={onCancel}>
          {t('CANCEL')}
        </Button>
        <Button
          color="error"
          loading={isSubmitting}
          disabled={isSubmitting || inputName !== cluster.name}
          onClick={handleOk}
        >
          {t('DROP')}
        </Button>
      </ConfirmFooter>
    );
  };

  return (
    <Wrapper>
      <Header>
        <div className="icon-wrapper">
          <Close size={16} variant="light" />
        </div>
        <Text weight={600}>{t('REMOVE_CLUSTER')}</Text>
      </Header>
      <Alert title={t('RISK_WARNING')} type="error" showIcon={false}>
        <ul>
          <Desc>{t('REMOVE_CLUSTER_TIP_A')}</Desc>
          <Desc dangerouslySetInnerHTML={{ __html: t('REMOVE_CLUSTER_TIP_B') }} />
        </ul>
      </Alert>
      <ClusterBox>
        <ClusterTitle cluster={cluster} />
        <Info>
          <Item>
            <Label>{t('NODE_COUNT')}:</Label>
            <Value>{cluster.nodeCount ?? '-'}</Value>
          </Item>
          <Item>
            <Label>{t('KUBERNETES_VERSION')}:</Label>
            <Value>{cluster.kubernetesVersion ?? '-'}</Value>
          </Item>
          <Item>
            <Label>{t('PROVIDER')}:</Label>
            <Value>{cluster.provider ?? '-'}</Value>
          </Item>
          <Item>
            <Label>{t('CREATION_TIME')}:</Label>
            <Value>{formatTime(cluster.createTime) ?? '-'}</Value>
          </Item>
        </Info>
      </ClusterBox>
      {showSlider ? (
        <SliderConfirm
          className="slider-confirm"
          width={560}
          tip={t('CLUSTER_CONFIRM_TEXT')}
          onConfirm={handleSliderConfirm}
          dragIcon={<Kubesphere size={26} color="#50b484" />}
        />
      ) : (
        <>
          <ConfirmInput>
            <InputTitle
              dangerouslySetInnerHTML={{ __html: t('ENTER_CLUSTER_NAME', { name: cluster.name }) }}
            />
            <Input placeholder={cluster.name} autoFocus={true} onChange={handleInputChange} />
          </ConfirmInput>
          {renderFooter()}
        </>
      )}
    </Wrapper>
  );
}

export default ClusterUnbindModal;
