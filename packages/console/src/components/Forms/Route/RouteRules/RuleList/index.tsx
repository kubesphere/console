/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import Item from './Item';
import { Text } from '@ks-console/shared';
import { Wrapper, AddWrapper } from './styles';

interface Props {
  value?: Record<string, any>[];
  formData?: Record<string, any>;
  projectDetail?: Record<string, any>;
  onShow?: any;
  onEdit?: any;
  onDelete?: any;
}

const RuleList = ({ value, formData, projectDetail, onShow, onEdit, onDelete }: Props) => {
  const renderContent = () => {
    const tls = get(formData, 'spec.tls', []);

    return (
      <ul>
        {value
          ?.filter(item => item && item.host)
          .map((item, index) => (
            <Item
              index={index}
              rule={item}
              tls={tls}
              key={index}
              onEdit={onEdit}
              onDelete={onDelete}
              projectDetail={projectDetail}
            />
          ))}
        <AddWrapper onClick={onShow}>
          <Text title={t('ADD_ROUTING_RULE')} description={t('ADD_ROUTING_RULE_DESC')} />
        </AddWrapper>
      </ul>
    );
  };

  return <Wrapper>{renderContent()}</Wrapper>;
};

export default RuleList;
