import { Base64 } from 'js-base64';

/**
 * safe decode base64
 * @param str
 */
export const safeAtob = (str: unknown): string => {
  if (typeof str !== 'string') {
    return '';
  }

  return Base64.decode(str);
};

/**
 * safe encode base64
 * @param str
 */
export const safeBtoa = (str: unknown): string => {
  if (typeof str !== 'string') {
    return '';
  }

  return Base64.encode(str);
};
