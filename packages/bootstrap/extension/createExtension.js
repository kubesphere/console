const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const copyDirectory = require('./extensionGenerator');

const extensionsDir = path.resolve(process.cwd(), 'extensions');
fs.ensureDirSync(extensionsDir);

async function createExtension() {
  const { extensionName, displayName, language, author, description, confirm } =
    await inquirer.prompt([
      {
        type: 'input',
        name: 'extensionName',
        message: 'Extension Name',
        validate(input) {
          if (!input) {
            return 'Extension Name is Required!';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'displayName',
        message: 'Display Name',
        validate(input) {
          if (!input) {
            return 'Display name is Required!';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author',
      },
      {
        type: 'list',
        name: 'language',
        message: 'Language',
        choices: [
          {
            name: 'JavaScript',
            value: 'js',
          },
          {
            name: 'Typescript',
            value: 'ts',
          },
        ],
      },
      {
        type: 'confirm',
        name: 'confirm',
        message: answer => {
          return `Are you sure you want to create extension: [${answer.extensionName}] ?`;
        },
      },
    ]);

  if (!confirm) return;

  const extDir = path.resolve(extensionsDir, extensionName);

  const templateDir =
    language === 'ts'
      ? path.resolve(__dirname, './templates/ts')
      : path.resolve(__dirname, './templates/js');

  copyDirectory({
    path: templateDir,
    target: extDir,
    context: {
      extensionName,
      author,
      description: description || `Hello ${extensionName}`,
      displayName,
    },
  });
}

module.exports = createExtension;
