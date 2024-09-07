/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';

import { getBrowserLang, request } from '../../utils';

type PathParams = {
  appName: string;
  app_id: string;
};

export function fetchDMPDetail({ appName }: PathParams) {
  const userLang = get(globals.user, 'lang') || getBrowserLang();
  const url = `/application.kubesphere.io/v2/apps/${appName}`;

  return request.get(url).then((res: any) => {
    res.abstraction = get(res, `abstraction_${userLang}`, res.abstraction);
    res.description = get(res, `description_${userLang}`, res.description);
    res.screenshots = get(res, `screenshots_${userLang}`, res.screenshots);

    return res;
  });
}
