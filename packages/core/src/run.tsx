/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import 'systemjs';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Loading } from '@kubed/components';

import { CacheStoreProvider, ENV } from '@ks-console/shared';
import Context from './utils/Context';
import { registerInternalExtensions } from './utils/extensions.internal';
import { registerLocalExtensions } from './utils/extensions.local';
import { initWujie } from './utils/wujie';
import i18n from './utils/i18n';
import emitter from './utils/emitter';

import App from './App';
import { isEmpty, set } from 'lodash';

set(globals, 'config.isKsEdition', ENV.isKsEdition);
set(globals, 'config.isKseEdition', ENV.isKseEdition);

globals.context = new Context();
if (!isEmpty(globals?.ksConfig?.enabledExtensionModulesStatus)) {
  Object.entries(globals.ksConfig.enabledExtensionModulesStatus).forEach(([key, value]) => {
    if ((value as Record<string, any>).annotations) {
      globals.ksConfig.enabledExtensionModulesStatus[key].annotations = JSON.parse(
        decodeURIComponent((value as Record<string, any>).annotations),
      );
    }
  });
}

export const run = async () => {
  await registerInternalExtensions();
  await registerLocalExtensions();

  initWujie();

  await i18n.init();
  emitter.init();

  ReactDOM.render(
    <Suspense fallback={<Loading className="page-loading" />}>
      <CacheStoreProvider>
        <App />
      </CacheStoreProvider>
    </Suspense>,
    document.getElementById('root'),
  );
};
