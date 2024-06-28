import getBaseStore from './store';

const module = 'validatingwebhookconfigurations';

const baseStore = getBaseStore({ module });

export default {
  ...baseStore,
  module,
};
