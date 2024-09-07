/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { projectNewStore as store } from '@ks-console/shared';
import { getStoreWithQueryHooks } from './useStore';

const projectNewStore = getStoreWithQueryHooks(store);
export default projectNewStore;
