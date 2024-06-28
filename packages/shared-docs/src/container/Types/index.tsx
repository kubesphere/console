import React from 'react';
import { useParams } from 'react-router-dom';
import { MDXRemote } from 'next-mdx-remote';
import { camelCase, startCase } from 'lodash';

import TOC from '../../components/TOC';
import CodeBox from '../../components/CodeBox';

import { getUserLang, getBrowserLang } from '@ks-console/shared';
import mdxDocs from '../../../.docgen/docs-types.json';

import { Content, MainContent } from '../Components/styles';

const Pre = ({ children }: React.PropsWithChildren<any>) => <>{children}</>;

const components = {
  pre: Pre,
  code: CodeBox,
};

export default function Types() {
  const lang = getUserLang() || getBrowserLang();
  const { slug } = useParams();

  const key = startCase(camelCase(slug)).replace(/ /g, '');

  // @ts-ignore
  const docs = mdxDocs?.[lang]?.[key];

  if (!docs) {
    return (
      <MainContent>
        <Content>404 not found</Content>
      </MainContent>
    );
  }

  return (
    <>
      <MainContent>
        <Content>
          <MDXRemote {...docs.source} components={components} />
        </Content>
        <TOC headings={docs.toc} withTabs />
      </MainContent>
    </>
  );
}
