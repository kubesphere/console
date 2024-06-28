import { storageClassStore as Store } from '@ks-console/shared';

import { getStoreWithQueryHooks } from './useStore';

const storageClassStore = getStoreWithQueryHooks(Store);

export default storageClassStore;
