/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import get from 'lodash/get';
import i18next from 'i18next';
import { merge } from 'lodash';
import { ENV, cookie, getBrowserLang, request } from '@ks-console/shared';

const init = async () => {
  const userLang = get(globals.user, 'lang') || getBrowserLang();
  if (userLang && cookie('lang') !== userLang) {
    cookie('lang', userLang);
  }

  const locales: Record<string, any> = {};
  let localePath;
  if (ENV.isProduction) {
    localePath = `dist/${globals.manifest?.[`locales-${userLang}`]}`;
  } else {
    localePath = `locales/${userLang}.json`;
  }

  if (userLang && localePath) {
    locales[userLang] = await request(`${localePath}`);
  }

  const totalLocales: Record<string, any> = { [userLang]: { translation: locales[userLang] } };
  const { locales: pluginLocales } = globals.context;
  Object.keys(pluginLocales).forEach(key => {
    totalLocales[key] = { translation: merge(locales[key], pluginLocales[key]) };
  });

  await i18next.init(
    {
      lng: userLang,
      fallbackLng: 'en',
      debug: false,
      resources: totalLocales,
      // defaultNS: ['common'],
      interpolation: {
        prefix: '{',
        suffix: '}',
      },
    },
    (err, t) => {
      // @ts-ignore
      window.t = t;
    },
  );
};

export default { init };
