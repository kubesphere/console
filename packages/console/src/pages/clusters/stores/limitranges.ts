/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { limitRangesStore as store } from '@ks-console/shared';
import { getStoreWithQueryHooks } from './useStore';

const limitRangesStore = getStoreWithQueryHooks(store);
export default limitRangesStore;
