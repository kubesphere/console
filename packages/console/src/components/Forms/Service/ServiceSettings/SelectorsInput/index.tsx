/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from '@kubed/components';
import { joinSelector, workloadStore, PropertiesInput, validator } from '@ks-console/shared';
import WorkloadSelect from '../WorkloadSelect';
import { StyledSelector, StyledAlert, StyledPopover } from './styles';

interface IProps {
  value?: Record<string, any>;
  cluster: string;
  namespace: string;
  addText?: string;
  onChange?: any;
}
const { isValidLabel } = validator;
const { fetchListByK8s } = workloadStore('deployments');

const SelectorsInput = ({ value, cluster, namespace, onChange, ...rest }: IProps) => {
  const [relatedDeployments, setDeployments] = useState<Record<string, any>[]>([]);
  const [relatedDaemonSets, setDaemonSets] = useState<Record<string, any>[]>([]);
  const [relatedStatefulSets, setStatefulSets] = useState<Record<string, any>[]>([]);
  const [visible, setVisible] = useState(false);

  const fetchRelatedWorkloads = () => {
    const selectors = value as Record<string, any>;

    if (
      isEmpty(selectors) ||
      Object.keys(selectors).some(isEmpty) ||
      Object.values(selectors).some(isEmpty)
    ) {
      setDeployments([]);
      setDaemonSets([]);
      setStatefulSets([]);
      return;
    }

    if (!isValidLabel(selectors)) {
      return;
    }

    const labelSelector = joinSelector(value);
    Promise.allSettled([
      fetchListByK8s({
        cluster,
        namespace,
        labelSelector,
        module: 'deployments',
      }),
      fetchListByK8s({
        cluster,
        namespace,
        labelSelector,
        module: 'daemonsets',
      }),
      fetchListByK8s({
        cluster,
        namespace,
        labelSelector,
        module: 'statefulsets',
      }),
    ]).then(([deployments, daemonSets, statefulSets]) => {
      if (deployments.status === 'fulfilled') {
        setDeployments(deployments.value);
      }
      if (daemonSets.status === 'fulfilled') {
        setDaemonSets(daemonSets.value);
      }
      if (statefulSets.status === 'fulfilled') {
        setStatefulSets(statefulSets.value);
      }
    });
  };

  useEffect(() => {
    fetchRelatedWorkloads();
  }, []);

  const renderRelatedTips = () => {
    const selector = value;

    const count = relatedDeployments.length + relatedStatefulSets.length + relatedDaemonSets.length;

    if (count === 0) {
      const tips = t('NO_WORKLOAD_MATCH_SELECTOR');
      return (
        <StyledAlert type="warning" showIcon={false}>
          {tips}
        </StyledAlert>
      );
    }

    const labelStr = Object.entries(selector as Record<string, any>)
      .map(([k, v]) => `${k}=${v}`)
      .join(', ');

    const tips =
      count === 1
        ? t('WORKLOADS_MATCH_SELECTOR_SI', { selector: labelStr, count })
        : t('WORKLOADS_MATCH_SELECTOR_PL', { selector: labelStr, count });

    const popContent = (
      <div>
        <p>{t('TOTAL_WORKLOADS_VALUE', { count })}</p>
        {relatedDeployments.map(({ name }) => (
          <p key={`deploy-${name}`}>{t('DEPLOYMENTS_VALUE', { value: name })}</p>
        ))}
        {relatedDaemonSets.map(({ name }) => (
          <p key={`ds-${name}`}>{t('STATEFULSETS_VALUE', { value: name })}</p>
        ))}
        {relatedStatefulSets.map(({ name }) => (
          <p key={`sts-${name}`}>{t('STATEFULSETS_VALUE', { value: name })}</p>
        ))}
      </div>
    );

    const message = (
      <div className="message">
        <p className="inline-block" dangerouslySetInnerHTML={{ __html: tips }}></p>
        &nbsp;
        <Tooltip content={popContent} trigger="click">
          <a className="text-green">{t('VIEW_DETAILS')}</a>
        </Tooltip>
      </div>
    );

    return (
      <StyledAlert type="warning" showIcon={false}>
        {message}
      </StyledAlert>
    );
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleWorkloadSelect = (labels: any) => {
    onChange?.(labels);
    setVisible(false);
  };
  const renderWorkloadSelectForm = () => {
    return (
      <WorkloadSelect
        cluster={cluster}
        namespace={namespace}
        onCancel={handleCancel}
        onSelect={handleWorkloadSelect}
      />
    );
  };

  const renderSpecifyWorkload = () => {
    return (
      <StyledPopover visible={visible} placement="right" content={renderWorkloadSelectForm()}>
        <Button onClick={() => setVisible(!visible)}>{t('SPECIFY_WORKLOAD')}</Button>
      </StyledPopover>
    );
  };

  return (
    <StyledSelector>
      {renderRelatedTips()}
      <PropertiesInput value={value} onChange={onChange} {...rest} />
      {renderSpecifyWorkload()}
    </StyledSelector>
  );
};

export default SelectorsInput;
