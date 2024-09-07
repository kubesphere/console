/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import getBaseStore from './store';

const module = 'validatingwebhookconfigurations';

const baseStore = getBaseStore({ module });

export default {
  ...baseStore,
  module,
};
