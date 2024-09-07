/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const EXCLUDE_PATTERNS = ['**/.DS_Store'];

const INCLUDE_PATTERNS = [
  '**/*.yaml',
  '**/*.yml',
  '**/*.tpl',
  '**/*.sh',
  '**/*.bash',
  '**/*/md',
  '**/*.txt',
  '**/.helmignore',
];

// https://github.com/github-linguist/linguist/blob/master/lib/linguist/languages.yml
const LANGUAGES = [
  { language: 'YAML', extensions: ['yaml', 'yml'], prismLanguage: 'yaml' },
  { language: 'Go', extensions: ['tpl'], prismLanguage: 'go' },
  { language: 'Shell', extensions: ['sh', 'bash'], prismLanguage: 'bash' },
  { language: 'Markdown', extensions: ['md'], prismLanguage: 'markdown' },
  { language: 'Ignore List', extensions: ['helmignore', 'gitignore'], prismLanguage: 'ignore' },
];

export { EXCLUDE_PATTERNS, INCLUDE_PATTERNS, LANGUAGES };
