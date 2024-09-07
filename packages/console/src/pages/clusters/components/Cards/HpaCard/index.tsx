/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isUndefined } from 'lodash';
import React from 'react';
import { Menu, Dropdown, MenuItem, notify } from '@kubed/components';
import { hpaStore, PathParams } from '@ks-console/shared';
import { getSuitableUnit, getValueByUnit, coreUnitTS } from '../../../utils/monitoring';
import { Icon } from '@ks-console/shared';
import {
  StyledCard,
  StyledTitle,
  StyledButton,
  ContentWrapper,
  CardItem,
  ItemContent,
  ItemTitle,
  ItemValue,
} from './styles';

interface IProps {
  title?: string;
  hpaDetail: Record<string, any>;
  deleteFunc?: (prams: PathParams, k8sVersion?: string) => Promise<any>;
  onDeleted?: () => void;
  k8sVersion?: string;
  enabledCancelHpa?: boolean;
}
const { deleteHpa } = hpaStore;
const HpaCard = ({
  title,
  hpaDetail,
  deleteFunc = deleteHpa,
  onDeleted,
  k8sVersion,
  enabledCancelHpa = false,
}: IProps) => {
  const cardTitle = title || t('AUTOSCALING');

  const getValue = (data: string, unitType: string) => {
    const unit: string = getSuitableUnit(data, unitType);
    const result = getValueByUnit(data, unit);
    const unitText = coreUnitTS(result, unit);
    return `${result} ${unitText}`;
  };

  // @ts-expect-error
  const findTarget = (metrics, name) =>
    // @ts-expect-error
    metrics?.find(m => m.type === 'Resource' && m.resource.name === name)?.resource?.target;

  // @ts-expect-error
  const findCurrent = (metrics, name) =>
    // @ts-expect-error
    metrics?.find(m => m.type === 'Resource' && m.resource.name === name)?.resource?.current;
  const hpaData = () => {
    const { spec = {} } = hpaDetail._originData || {};
    const { status = {} } = hpaDetail;
    const minReplicas = spec?.minReplicas ?? 1;
    const maxReplicas = spec?.maxReplicas ?? 1;

    const cpuTargetUtilization = findTarget(spec?.metrics, 'cpu')?.averageUtilization || 0;
    const memoryTargetValue = findTarget(spec?.metrics, 'memory')?.averageValue || 0;

    const cpuCurrentUtilization =
      findCurrent(status?.currentMetrics, 'cpu')?.averageUtilization || 0;
    const memoryCurrentValue = findCurrent(status?.currentMetrics, 'memory')?.averageValue || 0;
    return [
      {
        icon: 'chevron-down',
        name: t('MINIMUM_REPLICAS'),
        value: minReplicas,
      },
      {
        icon: 'chevron-up',
        name: t('MAXIMUM_REPLICAS'),
        value: maxReplicas,
      },
      {
        icon: 'cpu',
        name: t('TARGET_CPU_USAGE'),
        value:
          isUndefined(cpuTargetUtilization) || cpuTargetUtilization === ''
            ? t('NONE')
            : `${cpuTargetUtilization}%`,
        current: `${cpuCurrentUtilization}%`,
      },
      {
        icon: 'memory',
        name: t('TARGET_MEMORY_USAGE'),
        value:
          isUndefined(memoryTargetValue) || memoryTargetValue === ''
            ? t('NONE')
            : memoryTargetValue,
        current: getValue(
          String(memoryCurrentValue).endsWith('m')
            ? parseInt(memoryCurrentValue, 10) / 1000
            : memoryCurrentValue,
          'memory',
        ),
      },
    ];
  };

  const handleCancel = async () => {
    await deleteFunc(hpaDetail, k8sVersion);
    notify.success(t('CANCEL_SUCCESSFUL'));
    onDeleted?.();
  };

  const operations: Record<string, any>[] = [
    {
      key: 'cancel',
      icon: 'close',
      text: t('CANCEL'),
      onClick: () => handleCancel(),
    },
  ];

  const content = () => {
    return (
      <Menu>
        {operations.map(({ icon, text, show = true, ...rest }) => {
          if (!show) {
            return null;
          }

          return (
            <MenuItem key={text} icon={icon ? <Icon name={icon} type="light" /> : null} {...rest}>
              {text}
            </MenuItem>
          );
        })}
      </Menu>
    );
  };

  const renderOperations = () => {
    return enabledCancelHpa ? (
      <Dropdown content={content()}>
        <StyledButton variant="filled">
          <Icon name="more" />
        </StyledButton>
      </Dropdown>
    ) : null;
  };

  const renderCard = ({
    icon,
    name,
    value,
    current,
  }: {
    icon: string;
    name: string;
    value?: any;
    current?: string;
  }) => (
    <CardItem key={icon}>
      <ItemContent>
        <Icon name={icon} size={40} />
        <div>
          <ItemTitle>{name}</ItemTitle>
          <ItemValue>{current ? t('TARGET_CURRENT', { target: value, current }) : value}</ItemValue>
        </div>
      </ItemContent>
    </CardItem>
  );

  const renderContent = () => {
    return <ContentWrapper>{hpaData().map(renderCard)}</ContentWrapper>;
  };

  return (
    <StyledCard>
      <StyledTitle>
        <span>{cardTitle}</span>
        <div>{renderOperations()}</div>
      </StyledTitle>
      {renderContent()}
    </StyledCard>
  );
};

export default HpaCard;
