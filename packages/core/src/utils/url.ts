/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import qs from 'qs';
import cleanDeep from 'clean-deep';

interface CreateURLOptions {
  baseURL?: string;
  path?: string;
  searchParams?: Record<string, any>;
  trailingSlash?: boolean;
}

function createURL({
  baseURL = window.location.origin,
  path,
  searchParams,
  trailingSlash,
}: CreateURLOptions) {
  const finalPath = `${path}${trailingSlash ? '/' : ''}`;
  const finalSearchParams = cleanDeep(searchParams);
  const search = qs.stringify(finalSearchParams, { addQueryPrefix: true });
  return `${baseURL}${finalPath}${search}`;
}

interface GetCallbackURLOptions {
  path: string;
  searchParams: {
    referer: string | null | undefined;
    [key: string]: any;
  };
}

function getCallbackURL({ path, searchParams }: GetCallbackURLOptions) {
  return createURL({ path, searchParams });
}

export { createURL, getCallbackURL };
