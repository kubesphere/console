/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
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
