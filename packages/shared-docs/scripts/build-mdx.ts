import fs from 'fs-extra';
import path from 'path';
import { camelCase, get, startCase } from 'lodash';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import autoLinkHeadings from 'rehype-autolink-headings';
import rehypeToc from 'rehype-toc2';

const DOCS_PATH = '../.docgen'
const MDX_PATH = '../docs'

async function getMdxData(cate: string, lang: string, filename: string) {
  const catePath = path.join(__dirname, `${MDX_PATH}/${lang}/${cate}`);
  const realFileName = filename.startsWith('use') ? camelCase(filename) : startCase(camelCase(filename)).replace(/ /g, '');
  const fullPath = path.join(catePath, `${realFileName}.mdx`);

  let toc: any[] = [];
  let mdxSource = {};
  let frontMatter = {};
  let error = false;

  try {
    const source = fs.readFileSync(fullPath);
    const { content, data } = matter(source);
    frontMatter = data;

    const customizeTOCData = (tocData: any): undefined => {
      toc = tocData.map((item: any) => {
        const text = get(item, 'text[0].children[0].value') || '';
        return {
          ...item,
          text,
        };
      });
      return;
    };

    mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
          rehypeSlug,
          [autoLinkHeadings, { behavior: 'wrap', properties: { className: 'heading-link' } }],
          [rehypeToc, { headings: ['h1', 'h2'], customizeTOCData }],
        ],
      },
      scope: data,
    });
  } catch (e) {
    console.error(e);
    error = true;
  }

  return {
    [filename]: {
      error,
      toc,
      source: mdxSource,
      frontMatter,
    },
  }


}

async function generateAllMdx() {
  const langDirs = fs.readdirSync(path.join(__dirname, MDX_PATH));

  for (const langDir of langDirs) {
    const cateDirs = fs.readdirSync(path.join(__dirname, MDX_PATH, langDir));

    for (const cateDir of cateDirs) {
      const fileNames = fs.readdirSync(path.join(__dirname, MDX_PATH, langDir, cateDir));
      const tem: any = {};

      for (const fileName of fileNames) {
        if (fileName.endsWith('.mdx')) {
          const fileKey = path.basename(fileName, path.extname(fileName));
          const mdxData = await getMdxData(cateDir, langDir, fileKey);
          if (!tem[langDir]) {
            tem[langDir] = {};
          }
          Object.assign(tem[langDir], mdxData);
        }
      }

      fs.ensureDirSync(path.join(__dirname, DOCS_PATH));

      fs.writeJSONSync(path.join(__dirname, `${DOCS_PATH}/docs-${cateDir}.json`), tem);
    }
  }
}

generateAllMdx()