/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { Card } from '@kubed/components';
import { FormattedNetworkPolicy, useDetailPage } from '@ks-console/shared';

import { Wrapper, TableWrapper } from './styles';
import { get, isEmpty, toPairs } from 'lodash';
import { CellProps } from 'react-table';

import Table from './Table';
import { MinusSquare, PlusSquare } from '@kubed/icons';

export interface ViewTable {
  direction: string;
  ipBlock: {};
  namespace: string;
  ports?: {}[];
  specPodSelector: {};
  [propName: string]: any;
}

interface Props {
  direction?: string;
}

function Viewer({ direction }: Props) {
  const [tableData, SetTableData] = useState<ViewTable[]>([]);
  const params = useParams();
  const { namespace } = params;

  const { detail } = useDetailPage<FormattedNetworkPolicy>();

  useEffect(() => {
    const originData = get(detail, '_originData');
    const specPodSelector = get(originData, 'spec.podSelector');
    const directions = get(originData, `spec.${direction}`, []);
    const fromto = direction === 'ingress' ? 'from' : 'to';
    const newData: ViewTable[] = [];
    directions.forEach((item: any) => {
      const ports = get(item, 'ports', []);
      const rules = get(item, `${fromto}`, []);
      rules.forEach((rule: any) => {
        newData.push({
          namespace,
          specPodSelector,
          ports,
          direction: direction,
          ...rule,
          subRows: [
            {
              manualExpandedKey: 'expanded',
              namespace,
              specPodSelector,
              ports,
              direction: direction,
              ...rule,
            },
          ],
        });
      });
    });
    SetTableData(newData);
  }, [direction]);

  const renderLabels = (item: any) => {
    if (item) {
      return toPairs(get(item, 'matchLabels', [])).map(kv => (
        <div>
          <label className={'label'}>
            <span>{kv[0]}</span>
            {kv[1]}
          </label>
        </div>
      ));
    }
    return '';
  };

  const renderIpBlock = (item: any) => {
    if (item) {
      return (
        <label>
          {toPairs(item)
            .map(kv => (kv[0] === 'cidr' ? `${kv[1]}` : kv.join(': ')))
            .reduce((acc, x) => (acc === null ? x : `${acc} ${x}`), '')}
        </label>
      );
    }
    return '';
  };

  const tableColumns = React.useMemo(
    () => [
      {
        Header: t('TARGET'),
        columns: [
          {
            Header: t('PROJECT'),
            accessor: 'namespace',
          },
          {
            Header: t('LABEL'),
            accessor: 'specPodSelector',
            Cell: ({ cell: { value } }: CellProps<object>) => renderLabels(value),
          },
        ],
      },
      {
        Header: t('DESTINATION'),
        columns: [
          {
            Header: t('PROJECT'),
            accessor: 'namespaceSelector',
            Cell: ({ cell: { value, row } }: CellProps<object>) => {
              const record = row.original;

              if (isEmpty(get(record, 'ipBlock'))) {
                if (get(value, 'matchLabels')) {
                  return renderLabels(value);
                }
                return get(record, 'namespace');
              } else {
                return '';
              }
            },
          },
          {
            Header: t('LABEL'),
            accessor: 'podSelector',
            Cell: ({ cell: { value, row } }: CellProps<object>) => {
              const record = row.original;
              if (isEmpty(get(record, 'ipBlock'))) {
                if (get(value, 'matchLabels')) {
                  return renderLabels(value);
                }
                return 'Any';
              } else {
                return '';
              }
            },
          },
          {
            Header: 'CIDR',
            accessor: 'ipBlock',
            Cell: ({ cell: { value } }: CellProps<object>) => renderIpBlock(value),
          },
          {
            Header: t('PORT'),
            accessor: 'ports',
            Cell: ({ cell: { value } }: CellProps<object>) =>
              isEmpty(value)
                ? 'Any'
                : value.map((port: any) => (
                    <div>
                      {port.protocol}: {port.port}
                    </div>
                  )),
          },
        ],
      },
      {
        id: 'expander',
        Cell: ({ cell: { row } }: CellProps<object>) => {
          const canExpand = get(row, 'canExpand');

          return canExpand ? (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}rem`,
                },
              })}
            >
              {row.isExpanded ? <MinusSquare /> : <PlusSquare />}
            </span>
          ) : (
            ' '
          );
        },
      },
    ],
    [],
  );

  const renderDetailLabels = (record: any, selectorName: any) => {
    const selector = get(record, selectorName);
    return (
      <>
        {toPairs(get(selector, 'matchLabels', []))
          .map(kv => (
            <label className={'label'}>
              <span>{kv[0]}</span>
              {kv[1]}
            </label>
          ))
          .reduce(
            (acc, x) =>
              acc === null ? (
                x
              ) : (
                <>
                  {acc} and {x}
                </>
              ),
            <></>,
          )}
      </>
    );
  };

  const renderPolicyDetail = (record: any) => {
    const ipBlock = get(record, 'ipBlock');
    const ipExpect = get(ipBlock, 'except');

    const ipBlockLabel = renderIpBlock(ipBlock);

    const podsLabels = renderDetailLabels(record, 'specPodSelector');
    const namespaceLabels = renderDetailLabels(record, 'namespaceSelector');
    const destPodLabels = renderDetailLabels(record, 'podSelector');

    const ports = get(record, 'ports', [])
      .map((port: any) => `${port.protocol}: ${port.port}`)
      .reduce(
        (acc: any, x: any) =>
          acc === null ? (
            x
          ) : (
            <>
              {acc} and {x}
            </>
          ),
        null,
      );

    return (
      <div>
        <span>This rule allows pods in the namespace '{namespace}' </span>
        {!isEmpty(podsLabels) && <span> with the label {podsLabels} </span>}
        <span>{direction === 'egress' ? 'to connect to ' : 'to receive traffic from '}</span>
        {!isEmpty(ipBlock) ? (
          <label>
            {ipExpect && 'all IPs in '} subnet '{ipBlockLabel}'{' '}
          </label>
        ) : isEmpty(destPodLabels) && isEmpty(namespaceLabels) ? (
          'all pods in the same namespace '
        ) : (
          <label>
            {!isEmpty(destPodLabels) && (
              <span>
                {isEmpty(namespaceLabels) ? 'pods in the same namespace ' : 'pods '} with labels{' '}
                {destPodLabels}{' '}
              </span>
            )}
            {!isEmpty(namespaceLabels) && (
              <span>
                {isEmpty(destPodLabels) ? 'all pods in the namespace ' : 'in namespaces '}
                with the labels {namespaceLabels}{' '}
              </span>
            )}
          </label>
        )}
        {!isEmpty(ports) ? (
          <span>
            on port{ports.length > 1 ? 's' : ''} {ports}
          </span>
        ) : (
          'on all ports'
        )}
      </div>
    );
  };

  return (
    <Wrapper>
      <Card
        hoverable={true}
        sectionTitle={direction === 'egress' ? t('EGRESS_RULES') : t('INGRESS_RULES')}
      >
        <TableWrapper>
          <Table
            columns={tableColumns}
            data={tableData}
            expandedRowRender={(record: any) => (
              <div className={'detail'}>{renderPolicyDetail(record)}</div>
            )}
          />
        </TableWrapper>
      </Card>
    </Wrapper>
  );
}

export default Viewer;
