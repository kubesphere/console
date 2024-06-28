import React from 'react';
import { Text } from '@kubed/components';
import { kebabCase } from 'lodash';
import { Table } from './styles';
import { getBrowserLang, getUserLang } from '@ks-console/shared';
import AllTypes from '../../../.docgen/docs-types.json';

interface TableProps {
  component: string;
  data: any;
}

export default function PropsTable({ component, data }: TableProps) {
  const lang = getUserLang() || getBrowserLang();
  // @ts-ignore
  const allTypes = Object.keys(AllTypes[lang]);

  const listData = data[component];
  if (!listData) {
    return <>no props</>;
  }
  return (
    <Table>
      <thead>
        <tr>
          <th>{t('NAME')}</th>
          <th>{t('DEFAULT')}</th>
          <th>{t('TYPE')}</th>
          <th>{t('DESCRIPTION')}</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(listData.props).map((item: any) => {
          const { name, defaultValue, type, description, required } = item;
          let typeNode = type?.name?.replaceAll('<', '&lt').replaceAll('>', '&gt');
          const definedTypes = allTypes.filter(t => type?.name.includes(t));
          if (definedTypes.length) {
            definedTypes.forEach(t => {
              typeNode = typeNode?.replaceAll(
                t,
                `<a href='${`/docs/types/${kebabCase(t)}`}'>${t}</a>`,
              );
            });
          }

          return (
            <tr key={name}>
              <td>
                <div className="flex">
                  {name}
                  {required && <Text color="error">*</Text>}
                </div>
              </td>
              <td>{defaultValue?.value}</td>
              <td>
                <span dangerouslySetInnerHTML={{ __html: typeNode }}></span>
              </td>
              <td>{description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
