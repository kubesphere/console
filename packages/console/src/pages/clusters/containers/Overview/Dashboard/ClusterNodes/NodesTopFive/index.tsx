import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { rankStore, nodeRankStore } from '@ks-console/shared';
import { Button, Field, Select } from '@kubed/components';
import { Nodes } from '@kubed/icons';
import { Cpu, Footer, Header, Label, List } from './styles';

interface Props {
  cluster?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const { metrics_filter, resource, sort_metric_options } = nodeRankStore;
const { useBaseRankList, handleResult } = rankStore;

function NodesTopFive({ cluster }: Props) {
  const [sortMetric, setSortMetric] = useState(sort_metric_options[0]);
  const { data, reFetch } = useBaseRankList<any>({
    pathParams: {
      cluster,
      resource,
    },
    params: {
      limit: 5,
      sort_type: 'desc',
      sort_metric: sortMetric,
      metrics_filter: metrics_filter.join('|'),
    },
    options: {
      pageSize: 5,
    },
  });

  useEffect(() => {
    reFetch({
      sort_metric: sortMetric,
    });
  }, [sortMetric]);

  const options = sort_metric_options.map(option => ({
    value: option,
    label: t(`SORT_BY_${option.toUpperCase()}`),
  }));

  const results = handleResult(data);

  return (
    <div>
      <Header>
        <div>{t('TOP_5_FOR_RSC_USAGE')}</div>
        <Select value={sortMetric} onChange={value => setSortMetric(value)} options={options} />
      </Header>
      <List>
        {results?.map((node: any) => (
          <div key={node.node}>
            <Nodes size={40} style={{ marginRight: '12px' }} />
            <Field
              value={
                <Link to={`/clusters/${cluster}/nodes/${node.node}`}>
                  {node.node}
                  {node.role === 'master' && <Label>{t('CONTROL_PLANE')}</Label>}
                </Link>
              }
              label={get(node, 'host_ip', '-')}
            />
            <Cpu
              value={`${Math.round((Number(get(node, sortMetric)) || 0) * 100)}%`}
              label={t(sortMetric.toUpperCase())}
            />
          </div>
        ))}
      </List>
      <Footer>
        <Link to={`/clusters/${cluster}/monitor-cluster/ranking`}>
          <Button>{t('VIEW_MORE')}</Button>
        </Link>
      </Footer>
    </div>
  );
}

export default NodesTopFive;
