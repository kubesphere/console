/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Project } from '@kubed/icons';
import { Field, Loading } from '@kubed/components';

import Icon from '../../../../../../Icon';

import { PlacementWrapper, Wrapper } from './styles';

type Props = {
  showPlacementForm: () => void;
  initializing: boolean;
  value?: any;
  isEdge?: boolean;
  aliasName: {
    cluster?: string;
    namespace?: string;
    workspace?: string;
  };
  onChange?: (namespace: Record<string, any>) => void;
};

function PlacementField({
  value = {},
  isEdge,
  showPlacementForm,
  initializing,
  aliasName,
}: Props): JSX.Element {
  const { namespace, workspace, cluster } = value;

  const handleExpand = () => {
    if (initializing) return;

    showPlacementForm?.();
  };
  function getName(name: string = '-', alias?: string) {
    return alias ? `${alias}（${name}）` : name;
  }

  return (
    <PlacementWrapper className="expand" onClick={handleExpand}>
      {!namespace && !isEdge ? (
        <>{initializing ? <Loading /> : t('PROJECT_NOT_SELECT_DESC')}</>
      ) : (
        <Wrapper>
          <Field label={t('WORKSPACE')} value={getName(workspace, aliasName.workspace)} />
          <Field label={t('CLUSTER')} value={getName(cluster, aliasName.cluster)} />
          {!isEdge && (
            <Field
              avatar={<Project size={40} />}
              label={t('PROJECT')}
              value={getName(namespace, aliasName.namespace)}
            />
          )}
          <Icon name="chevron-down" size={20} />
        </Wrapper>
      )}
    </PlacementWrapper>
  );
}

export default PlacementField;
