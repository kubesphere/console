import React from 'react';
import { useParams } from 'react-router-dom';
import { MDXRemote } from 'next-mdx-remote';
import { camelCase, startCase } from 'lodash';
import { Tabs, Tab } from '@kubed/components';
import * as Kubed from '@kubed/components';

import MetadataCard from '../../components/MetadataCard';
import TOC from '../../components/TOC';
import CodeBox from '../../components/CodeBox';
import PropsTable from '../../components/PropsTable';

import * as Shared from '@ks-console/shared';

import mdxDocs from '../../../.docgen/docs-components.json';
import metaData from '../../../.docgen/docgen.json';

import { Content, MainContent } from './styles';

const Pre = ({ children }: React.PropsWithChildren<any>) => <>{children}</>;

const components = {
  ...Kubed,
  ...React,
  ...Shared,
  pre: Pre,
  code: CodeBox,
};

export default function Components() {
  const lang = Shared.getUserLang() || Shared.getBrowserLang();
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

  const { title, description, imports, propsDefinition } = docs.frontMatter;
  return (
    <>
      <MetadataCard title={title} description={description} imports={imports || title} />
      <Tabs variant="line" size="md" name="doc-content">
        <Tab label="Documentation" key="content">
          <MainContent>
            <Content>
              <MDXRemote {...docs.source} components={components} />
            </Content>
            <TOC headings={docs.toc} withTabs />
          </MainContent>
        </Tab>
        <Tab label="Component Props" key="props">
          <PropsTable component={propsDefinition || title} data={metaData} />
        </Tab>
      </Tabs>
    </>
  );
}
