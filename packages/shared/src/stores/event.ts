/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { orderBy, get } from 'lodash';
import { getBaseInfo, getOriginData, request } from '../utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ItemsData, IEventDetail } from '../types';

dayjs.extend(relativeTime);

const formatEventData = (item: ItemsData): IEventDetail => {
  const now = Date.now();

  item.lastTimestamp = item.lastTimestamp || now;

  const age =
    item.count > 1
      ? item.count === 2
        ? t('EVENT_AGE_DATA_TWICE', {
            lastTime: dayjs(item.lastTimestamp).fromNow(),
            duration: dayjs(item.firstTimestamp).to(now, true),
          })
        : t('EVENT_AGE_DATA', {
            lastTime: dayjs(item.lastTimestamp).toNow(),
            count: item.count,
            duration: dayjs(item.firstTimestamp).to(now, true),
          })
      : dayjs(item.firstTimestamp).fromNow();

  return {
    ...getBaseInfo(item),
    age,
    type: get(item, 'type'),
    reason: get(item, 'reason'),
    message: get(item, 'message'),
    from: get(item, 'source.component'),
    lastTimestamp: item.lastTimestamp,
    _originData: getOriginData(item),
  };
};

const fetchList = async <T extends Record<string, any>>({
  name,
  cluster,
  namespace,
  ...rest
}: T): Promise<any> => {
  const clusterPath = cluster ? `/klusters/${cluster}` : '';
  const namespacePath = namespace ? `/namespaces/${namespace}` : '';

  const result = await request.get(`api/v1${clusterPath}${namespacePath}/events`, { params: rest });

  const items: ItemsData[] = get(result, 'items', []);

  return {
    data: orderBy(items.map(formatEventData), 'lastTimestamp'),
    total: items.length,
  };
};

export { fetchList, formatEventData };
