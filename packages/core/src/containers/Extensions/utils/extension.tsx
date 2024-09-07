/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { find } from 'lodash';
import resolve from '@jridgewell/resolve-uri';

import { getBrowserLang, getUserLang } from '@ks-console/shared';
import type { FormattedCategory, FormattedExtensionVersion } from '../../../stores/extension';

interface PickFormattedCategoriesByCategoryNamesOptions {
  categoryNames: string[];
  formattedCategories: FormattedCategory[] | undefined;
}

function pickFormattedCategoriesByCategoryNames({
  categoryNames,
  formattedCategories,
}: PickFormattedCategoriesByCategoryNamesOptions) {
  if (!formattedCategories) {
    return [];
  }

  return categoryNames
    .map(categoryName => find(formattedCategories, { name: categoryName }))
    .filter(Boolean);
}

function getExtensionBasicInfo(formattedExtensionVersion: FormattedExtensionVersion | undefined) {
  return [
    {
      label: t('PROVIDER'),
      value: formattedExtensionVersion?.localeProvider?.name,
    },
    { label: t('EXT_HOMEPAGE'), value: formattedExtensionVersion?.home },
    {
      label: t('RELEASE_DATE'),
      value: formattedExtensionVersion?.displayCreatedDate,
    },
    /* {
        label: t('EXTENSION_ID'),
        value: '',
      }, */
    {
      label: t('KUBERNETES_VERSION'),
      value: formattedExtensionVersion?.kubeVersion,
    },
    {
      label: t('KUBE_SPHERE_VERSION'),
      value: formattedExtensionVersion?.ksVersion,
    },
    {
      label: t('EXTENSION_REPOSITORIES'),
      value: formattedExtensionVersion?.sources?.map(source => <p key={source}>{source}</p>),
    },
    {
      label: t('EXTENSION_DOCUMENTS'),
      value: formattedExtensionVersion?.docs,
    },
  ];
}

function normalizeFileName(value: string) {
  const index = value.lastIndexOf('.');
  const name = value.substring(0, index);
  const ext = value.slice(index + 1);

  return { name, ext };
}

function matchLocalFileName({
  targetFileName,
  fileName,
  language,
}: {
  targetFileName: string;
  fileName: string;
  language: string;
}) {
  if (!language) {
    return false;
  }

  const lowerCaseFileName = fileName.toLowerCase();
  const { name: targetName, ext: targetExt } = normalizeFileName(targetFileName);
  const targetFileNames = ['_', '-', '.'].map(str => `${targetName}${str}${language}.${targetExt}`);
  return targetFileNames.some(name => name.toLowerCase() === lowerCaseFileName);
}

interface GetLocaleReadmeOptions {
  data: { name: string; base64Data: string; data: string }[];
  targetFileName: string;
  defaultValue?: { name: string; base64Data: string; data: string };
}

function getLocaleFile({
  data,
  targetFileName,
  defaultValue = find(data, ({ name }) => name.toLowerCase() === targetFileName.toLowerCase()),
}: GetLocaleReadmeOptions) {
  if (!(Array.isArray(data) && data.length > 0)) {
    return defaultValue;
  }

  const findFileItemByLanguage = (language: string) => {
    const target = find(data, ({ name }) =>
      matchLocalFileName({
        targetFileName,
        fileName: name,
        language,
      }),
    );

    if (!target && language === 'en') {
      return (
        find(data, ({ name }) => name.toLowerCase() === targetFileName.toLowerCase()) ??
        defaultValue
      );
    }

    return target;
  };

  const userLanguage = getUserLang();
  const browserLanguage = getBrowserLang();
  // const defaultLanguage = '';

  return (
    findFileItemByLanguage(userLanguage) ??
    findFileItemByLanguage(browserLanguage) ??
    // findFileItemByLanguage(defaultLanguage) ??
    defaultValue
  );
}

interface MarkdownURITransformerOptions {
  extensionName: string;
  version: string;
  uri: string;
}

function markdownURITransformer({ extensionName, version, uri }: MarkdownURITransformerOptions) {
  if (uri.startsWith('#')) {
    return uri;
  }

  // eslint-disable-next-line max-len
  const base = `/kapis/package.kubesphere.io/v1alpha1/extensionversions/${extensionName}-${version}/files/`;
  return resolve(uri, base);
}

export {
  pickFormattedCategoriesByCategoryNames,
  getExtensionBasicInfo,
  getLocaleFile,
  markdownURITransformer,
};
