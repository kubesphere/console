import path from 'path';
import fs from 'fs-extra';
import { ComponentDoc, withCustomConfig, PropItem } from 'react-docgen-typescript';

interface DeclarationPath {
  path: string;
  type: 'package' | 'file';
}

const EXTRA_FILES_PATHS: string[] = [];

const EXCLUDE_PROPS = ['className', 'classNames', 'styles', 'key', 'ref', 'style'];

const SHARED_COMPONENTS_PATH = '../../shared/src/components'

const DOCS_PATH = '../.docgen'


const PATHS: DeclarationPath[] = [
  { type: 'package', path: path.join(__dirname, SHARED_COMPONENTS_PATH) },
  ...EXTRA_FILES_PATHS.map((filePath) => ({
    type: 'file' as const,
    path: path.join(__dirname, filePath),
  })),
];

function getPackagePaths(packageFolder: string): string[] {
  function findTsxFiles(folder: string): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(folder);
    for (const item of items) {
      const itemPath = path.join(folder, item);
      const stat = fs.statSync(itemPath);
      if (stat.isDirectory()) {
        const nestedFiles = findTsxFiles(itemPath);
        files.push(...nestedFiles);
      } else if (stat.isFile() && item.endsWith('.tsx')) {
        files.push(itemPath);
      }
    }
    return files;
  }

  return findTsxFiles(packageFolder);
}

function getDeclarationsList(paths: DeclarationPath[]): string[] {
  return paths.reduce<string[]>((acc, info) => {
    if (info.type === 'package') {
      const items = getPackagePaths(info.path);
      return [...acc, ...items];
    }

    if (info.type === 'file') {
      return [...acc, info.path];
    }

    return acc;
  }, []);
}

function prepareDeclaration(declaration: ComponentDoc) {
  const data: Record<string, any> = { ...declaration };
  data.filePath = data.filePath?.replace(/^/, '')
  delete data.tags;
  delete data.methods;

  Object.keys(data.props).forEach((prop) => {
    delete data.props[prop].parent;
    delete data.props[prop].declarations;
    delete data.description;
  });

  const ordered = Object.keys(data.props)
    .sort()
    .reduce<any>((obj, key) => {
      obj[key] = data.props[key];
      return obj;
    }, {});

  data.props = ordered;

  return data;
}

const docgenParser = withCustomConfig(path.join(__dirname, '../tsconfig.json'), {
  savePropValueAsString: true,
  propFilter: (prop: PropItem) => {
    if (EXCLUDE_PROPS.includes(prop.name)) {
      return false;
    }

    if (prop.declarations !== undefined && prop.declarations.length > 0) {
      return Boolean(
        prop.declarations.find((declaration) => !declaration.fileName.includes('node_modules'))
      );
    }

    return true;
  },
});

function generateDeclarations(paths: DeclarationPath[]) {
  const declarations = getDeclarationsList(paths);
  return docgenParser.parse(declarations).reduce<any>((acc, declaration) => {
    const componentName = declaration.displayName.replace(/@kubed\/([^\s]+)\//, '');
    acc[componentName] = prepareDeclaration(declaration);
    return acc;
  }, {});
}

fs.ensureDirSync(path.join(__dirname, DOCS_PATH));

fs.writeJSONSync(path.join(__dirname, `${DOCS_PATH}/docgen.json`), generateDeclarations(PATHS));
