import fs from 'fs-extra';
import path from 'path';

interface Definition {
  exportKeyword?: string;
  type: string;
  name: string;
  body: string;
}


const SHARED_TYPES_PATH = '../../shared/src/types';
const docsPath = '../docs';

const directoryPath = path.join(__dirname, SHARED_TYPES_PATH);
const outputFolderPath = path.join(__dirname, docsPath);

fs.readdir(outputFolderPath, (err: NodeJS.ErrnoException | null, dirs: string[]) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  dirs.forEach((lang) => {
    const langOutputPath = path.join(outputFolderPath, lang);
    const typesOutputPath = path.join(langOutputPath, 'types');

    fs.emptyDirSync(typesOutputPath);
    fs.readdir(directoryPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }

      const typeDefinitions: Definition[] = [];
      files.forEach((file) => {
        if (file.endsWith('.ts')) {
          const filePath = path.join(directoryPath, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const definitions = parseTypeDefinitions(content);
          typeDefinitions.push(...definitions);
        }
      });

      typeDefinitions.forEach(({ exportKeyword, type, name, body }) => {
        const mdxContent = generateMdxContent(name, type, body);
        const fileName = name;
        const outputPath = path.join(typesOutputPath, `${fileName}.mdx`);
        fs.ensureDirSync(typesOutputPath);
        fs.writeFileSync(outputPath, mdxContent, 'utf-8');
      });
    });
  });
});

function parseTypeDefinitions(content: string) {
  const definitions: Definition[] = [];
  const regex = /(export )?(type|interface|enum)\s+([\w\d]+)(.*?)(?=[\n\r]+export |[\n\r]+type |[\n\r]+interface |[\n\r]+enum |\Z)/gs;
  let match;

  while ((match = regex.exec(content))) {
    const [, exportKeyword, type, name, body] = match;
    definitions.push({ exportKeyword, type, name, body });
  }

  return definitions;
}

function generateMdxContent(name: string, type: string, body: string) {
  let mdxContent = `## ${name}\n`;
  mdxContent += '```ts\n';
  if (type === 'interface') {
    mdxContent += `interface ${name}${body} `;
  } else if (type === 'enum') {
    mdxContent += `enum ${name}${body} `;
  } else {
    mdxContent += `type ${name}${body} `;
  }
  mdxContent += '\n```\n\n';

  return mdxContent;
}
