import baseStore from '../store';
import { JobMapper } from './mapper';

const apiVersion = 'api/v1';

const PodsStore = () => {
  const module = 'pods';

  const BaseStore = baseStore({
    module,
    mapper: JobMapper,
    apiVersion,
  });

  return {
    ...BaseStore,
    module,
  };
};

export default PodsStore();
