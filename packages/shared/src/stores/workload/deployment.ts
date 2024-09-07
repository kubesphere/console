/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

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
