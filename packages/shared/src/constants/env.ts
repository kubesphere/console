/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const isDevelopment = process.env.NODE_ENV === 'development';

export const isProduction = process.env.NODE_ENV === 'production';

export const isKseEdition = process.env.KUBESPHERE_EDITION === 'kse';

export const isKsEdition = process.env.KUBESPHERE_EDITION === 'ks';
