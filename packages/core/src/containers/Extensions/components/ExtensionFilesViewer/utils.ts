/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { yaml } from '@ks-console/shared';

function parseFilePath({ filePath }: { filePath: string }) {
  const paths = filePath.split('/');
  const fileNameWithExtension = paths[paths.length - 1];

  const index = fileNameWithExtension.lastIndexOf('.');
  const { length } = filePath;

  let [fileName, fileExtension] = ['', ''];

  if (index === -1) {
    fileName = fileNameWithExtension;
    fileExtension = '';
  } else if (index === length - 1) {
    fileName = fileNameWithExtension;
    fileExtension = '';
  } else {
    fileName = fileNameWithExtension.substring(0, index);
    fileExtension = fileNameWithExtension.substring(index + 1);
  }

  return { fileName, fileExtension, fileNameWithExtension };
}

function getYamlKind({ data }: { data: string }) {
  const res = yaml.load(data);
  let yamlKind = '';

  if (typeof res === 'string') {
    const str = res.replace('\r', '\n');
    const rows = str.split('\n');
    const kindRow = rows.find(row => row.startsWith('kind: '));
    const kindObj = yaml.load(kindRow);
    const kind = kindObj?.kind;
    const regExp = /^[A-Za-z0-9]+$/;
    if (typeof kind === 'string' && regExp.test(kind)) {
      yamlKind = kind;
    }
  } else {
    yamlKind = res?.kind ?? '';
  }

  return yamlKind;
}

export { parseFilePath, getYamlKind };
