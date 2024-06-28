import baseStore from '../store';
import { WorkLoadMapper } from './mapper';

const store = (module = 'deployments') => {
  const BaseStore = baseStore({ module, mapper: WorkLoadMapper });

  return {
    ...BaseStore,
    module,
    mapper: WorkLoadMapper,
  };
};

export default store;
