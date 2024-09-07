/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Card, Navs } from '@kubed/components';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import AppResource from './AppResource';
import { Header, SelectWrapper, Title } from './styles';
import { hasClusterModule } from '@ks-console/shared';
import PhysicalResource from './PhysicalResource';

const ResourceStatus = () => {
  const params = useParams();
  const hasMonitoring = hasClusterModule(params.cluster!, 'whizard-monitoring');

  const taboptions = React.useMemo(
    () =>
      [
        {
          value: 'app',
          label: t('APPLICATION_RESOURCE_PL'),
        },
        hasMonitoring
          ? {
              value: 'physical',
              label: t('PHYSICAL_RESOURCE_PL'),
              disabled: true,
            }
          : undefined,
      ].filter(Boolean),
    [],
  );

  const [type, setType] = React.useState('app');
  const [time, setTime] = React.useState(60 * 60 * 12);

  const timeOptions = React.useMemo(() => {
    return [
      { label: t('LAST_TIME_H', { count: 1 }), value: 3600 },
      { label: t('LAST_TIME_H', { count: 2 }), value: 7200 },
      { label: t('LAST_TIME_H', { count: 5 }), value: 18000 },
      { label: t('LAST_TIME_H', { count: 12 }), value: 43200 },
      { label: t('LAST_TIME_D', { count: 1 }), value: 86400 },
      { label: t('LAST_TIME_D', { count: 2 }), value: 172800 },
      { label: t('LAST_TIME_D', { count: 3 }), value: 259200 },
      { label: t('LAST_TIME_D', { count: 7 }), value: 604800 },
    ];
  }, []);

  return (
    <>
      <Title>{t('RESOURCE_STATUS')}</Title>
      <Card padding={0}>
        {taboptions.length > 1 && (
          <Header>
            <Navs data={taboptions as any} value={type} onChange={setType} />
            <SelectWrapper options={timeOptions} value={time} onChange={setTime} />
          </Header>
        )}
        {type === 'app' && (
          <AppResource params={params} time={time} hasMonitoring={!!hasMonitoring} />
        )}
        {type === 'physical' && <PhysicalResource time={time} params={params} />}
      </Card>
    </>
  );
};

export default ResourceStatus;
