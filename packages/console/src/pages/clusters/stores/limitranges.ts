import { limitRangesStore as store } from '@ks-console/shared';
import { getStoreWithQueryHooks } from './useStore';

const limitRangesStore = getStoreWithQueryHooks(store);
export default limitRangesStore;
