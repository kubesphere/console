import React from 'react';
import { Tooltip } from '@kubed/components';
import { useClipboard } from '@kubed/hooks';
import Prism from '../CodeBox/Prism';
import { Desc, List, Wrapper } from './styles';

interface MetadataCardProps extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
  description?: string;
  imports?: string;
}

export default function MetadataCard({ title, description, imports }: MetadataCardProps) {
  const clipboard = useClipboard();
  const importStr = `import { ${imports} } from '@ks-console/shared;'`;

  return (
    <Wrapper>
      <h1>{title}</h1>
      <Desc>{description}</Desc>
      <List>
        <dl>
          <dt>Import</dt>
          <Tooltip
            placement="right"
            content={clipboard.copied ? 'Copied' : 'Copy'}
            hideOnClick={false}
          >
            <dd className="import-code" onClick={() => clipboard.copy(importStr)}>
              <Prism withLineNumbers={false} withPre={false} language="tsx" className="prism">
                {importStr}
              </Prism>
            </dd>
          </Tooltip>
        </dl>
      </List>
    </Wrapper>
  );
}
