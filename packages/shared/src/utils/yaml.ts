/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import yaml from 'js-yaml';
import { isObject, isString } from 'lodash';

export function getValue(value: unknown): string {
  if (isObject(value)) {
    try {
      return yaml.dump(JSON.parse(JSON.stringify(value)), { noRefs: true });
    } catch (err) {
      console.error(err);
      return JSON.stringify(value, null, 2);
    }
  }

  return String(value);
}

function load(value: unknown): any {
  if (!isObject(value)) {
    try {
      return yaml.load(value as string);
    } catch (err) {}
  }

  return value;
}

function loadAll(value: string) {
  const objs: any[] = [];

  try {
    yaml.loadAll(value, obj => {
      objs.push(obj);
    });
  } catch (err) {}

  return objs;
}

export function objectToYaml(formTemplate: any) {
  if ([undefined, null].includes(formTemplate)) {
    return '';
  }

  if (formTemplate?.metadata) {
    return getValue(formTemplate);
  }

  if (isString(formTemplate)) {
    return formTemplate;
  }

  return Object.values(formTemplate)
    .map(value => getValue(value || {}))
    .join('---\n');
}
export default {
  getValue,
  load,
  loadAll,
};
