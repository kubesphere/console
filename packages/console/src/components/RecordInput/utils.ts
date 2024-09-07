/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isNil } from 'lodash';

export const mapIn = (value: Record<string, any> = {}) => {
  return Object.entries(value).reduce(
    (acc, [k, v]) => {
      return [
        ...acc,
        {
          key: k,
          value: v,
        },
      ];
    },
    <{ key: string; value: string }[]>[],
  );
};

export const mapOut = (list: { key: string; value: string }[] = []) => {
  return list.reduce((acc, item) => {
    const { key, value } = item;
    if (isNil(key)) {
      return acc;
    }
    return {
      ...acc,
      [key]: value ?? '',
    };
  }, {});
};

export const checkItemKey = ({ key }: { key?: string }) => {
  return !!key;
};

export const mapOptions = (props: {
  options: { label: string; value: string }[];
  list: { key: string; value: string }[];
  value: { key: string; value: string };
}) => {
  const { options: optionsProp, list: arrayList = [], value } = props;
  // const getOptions = () => {
  const { key } = value ?? {};
  const current = optionsProp.filter(i => i.value === key);
  const keys = arrayList.map(i => i.key);
  const others = optionsProp.filter(i => !keys.includes(i.value));
  return [...current, ...others];
  // };
  // return getOptions();
};

export const validate = (value: { key: string; value: unknown }[]) => {
  // find same key index
  const keys = value.map(i => i.key);
  const sameKeyIndex = keys.reduce(
    (acc, key, index) => {
      const sameIndex = keys.indexOf(key);
      if (sameIndex !== index) {
        return [...acc, sameIndex, index];
      }
      return acc;
    },
    <number[]>[],
  );
  if (sameKeyIndex.length > 0) {
    return {
      valid: false,
      message: t('DUPLICATE_KEYS'),
      index: sameKeyIndex,
    };
  }
  const emptyKeys = value.reduce(
    (acc, item, index) => {
      if (item.key === '') {
        return [...acc, index];
      }
      return acc;
    },
    <number[]>[],
  );
  if (emptyKeys.length > 0) {
    return {
      valid: false,
      message: t('EMPTY_KEY'),
      index: emptyKeys,
    };
  }
  return {
    valid: true,
  };
};
