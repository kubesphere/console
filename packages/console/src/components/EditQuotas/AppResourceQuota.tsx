/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Select } from '@kubed/components';
import React from 'react';
import InputNumberWithUnit from '../InputNumberWithUnit';
import { KVRecordInput } from '../RecordInput';
import RecordItem from '../RecordInput/RecordItem';
import { mapOptions } from '../RecordInput/utils';
import { FEDERATED_PROJECT_UNSOPPORT_QUOTA, QUOTAS_MAP, RESERVED_MODULES } from './constants';
import { IAppResourceQuota } from './interfaces';
import { pickBy } from 'lodash';

const AppResourceQuota = (props: IAppResourceQuota) => {
  const { isFederated } = props;

  const options = React.useMemo(() => {
    const filteredModules = [...RESERVED_MODULES];
    return Object.entries(QUOTAS_MAP)
      .filter(
        ([key]) =>
          !filteredModules.includes(key) &&
          (isFederated ? !FEDERATED_PROJECT_UNSOPPORT_QUOTA.includes(key) : true),
      )
      .map(([key, value]) => ({
        label: t(`NUMBER_OF_${key.toUpperCase()}`),
        value: value.name,
      }));
  }, [isFederated]);

  const values = pickBy(props.value, (v, k) => options.some(o => o.value === k));

  const getProps = React.useCallback(
    ({ list, item }) => {
      return {
        options: mapOptions({ options, list, value: item }),
        disabled: item.key === 'count/pods',
      };
    },
    [isFederated],
  );

  return (
    <KVRecordInput {...props} value={values}>
      <RecordItem>
        <Select name={'key'} placeholder={''} $getProps={getProps} />
        <InputNumberWithUnit name={'value'} />
      </RecordItem>
    </KVRecordInput>
  );
};

export default AppResourceQuota;
