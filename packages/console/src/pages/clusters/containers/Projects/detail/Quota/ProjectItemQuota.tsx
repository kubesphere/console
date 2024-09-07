/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Constants, PathParams } from '@ks-console/shared';
import { Card, LoadingOverlay } from '@kubed/components';
import { get, isEmpty } from 'lodash';
import * as React from 'react';
import { useQueryProjectQuota } from '../../../../stores/project';
import QuotaItem from './components/QuotaItem';
import { Title } from './styles';

const STORAGE_CLASS_KEYS = ['requests.storage', 'persistentvolumeclaims'];
const RESERVED_KEYS = ['limits.cpu', 'limits.memory', 'pods'];

const ProjectItemQuota = (props: { params: PathParams }) => {
  const { params } = props;
  const { data: detail, isFetching } = useQueryProjectQuota(params);

  const quotaListKeys = React.useMemo(() => {
    if (detail?.used) {
      const quotaKeys: Record<string, any>[] = Object.entries(Constants.QUOTAS_MAP).map(
        ([key, value]) => {
          return {
            label: key,
            ...value,
          };
        },
      );

      Object.entries(detail.used).forEach(([key]) => {
        const quota = quotaKeys.find(item => item.name === key);

        if (isEmpty(quota)) {
          quotaKeys.push({
            label: key,
            name: key,
          });
        }
      });

      const omitStorage = quotaKeys
        .filter(
          item =>
            !item.name.includes(STORAGE_CLASS_KEYS[0]) &&
            !item.name.includes(STORAGE_CLASS_KEYS[1]),
        )
        .map(item => {
          const { label, name } = item;
          return {
            key: label,
            name: label,
            total: get(detail, `hard["${name}"]`),
            used: get(detail, `used["${name}"]`, 0),
            left: get(detail, `left["${name}"]`),
          };
        })
        .filter(({ total, used, name }) => {
          if (!total && !Number(used) && RESERVED_KEYS.indexOf(name) === -1) {
            return false;
          }
          return true;
        });
      return omitStorage;
    }
    return [];
  }, [detail]);
  return (
    <>
      <Title>{t('PROJECT_QUOTA_PL')}</Title>
      <Card padding={'12px 0' as any}>
        <LoadingOverlay visible={isFetching} />

        {quotaListKeys.map(item => (
          <QuotaItem {...item} key={item.key} />
        ))}
      </Card>
    </>
  );
};

export default ProjectItemQuota;
