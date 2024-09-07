/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { storageClassStore as Store } from '@ks-console/shared';

import { getStoreWithQueryHooks } from './useStore';

const storageClassStore = getStoreWithQueryHooks(Store);

export default storageClassStore;
