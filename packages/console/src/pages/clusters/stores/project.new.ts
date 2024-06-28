import { projectNewStore as store } from '@ks-console/shared';
import { getStoreWithQueryHooks } from './useStore';

const projectNewStore = getStoreWithQueryHooks(store);
export default projectNewStore;
