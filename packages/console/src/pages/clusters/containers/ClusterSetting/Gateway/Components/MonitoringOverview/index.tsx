/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { get, isEmpty } from 'lodash';
import {
  monitorStore,
  gatewayMonitorStore,
  FormattedGateway,
  TimeSelector,
  SimpleCircle,
  useDetailPage,
} from '@ks-console/shared';
import { Error, Gateway, Pause, Refresh, Start } from '@kubed/icons';
import {
  FlexWrapper,
  Header,
  ImageIcon,
  LeftContainer,
  LeftItem,
  MiddleContainer,
  Operations,
  Overview,
  RightContainer,
  RightItem,
  SmallItem,
  SelectWithoutBorder,
  StyledButton,
  SimpleContent,
} from './styles';
import { useParams } from 'react-router-dom';

const MetricTypes = {
  ingress_request_count: 'ingress_request_count',
  ingress_request_5xx_count: 'ingress_request_5xx_count',
  ingress_request_4xx_count: 'ingress_request_4xx_count',
  ingress_active_connections: 'ingress_active_connections',
  ingress_success_rate: 'ingress_success_rate',
  ingress_request_duration_average: 'ingress_request_duration_average',
  ingress_request_duration_50percentage: 'ingress_request_duration_50percentage',
  ingress_request_duration_95percentage: 'ingress_request_duration_95percentage',
  ingress_request_duration_99percentage: 'ingress_request_duration_99percentage',
};

const { useMonitorStore } = monitorStore;
const { getApi, getGatewayParams } = gatewayMonitorStore;

const { fetchMetrics } = useMonitorStore({ getApiFn: getApi, getParamsFn: getGatewayParams });

const handleMetricsData = (result: Record<string, any>) => {
  if (!isEmpty(result)) {
    const data: Record<string, any> = {};
    Object.values(MetricTypes)
      .map(item => result[item])
      .forEach(item => {
        const number = get(item, 'data.result[0].value[1]', 0);
        const num =
          typeof number === 'string' && number.indexOf('.') > -1
            ? Number(number).toFixed(4)
            : isNaN(Number(number))
              ? 0
              : number;
        data[item.metric_name] = num;
      });
    return data;
  }
};

function MonitoringOverview() {
  const params = useParams();
  const [enableAutoRefresh] = useState<boolean>(true);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [step, setStep] = useState<string>('10m');
  const [errorType, setErrorType] = useState<string>('ingress_request_4xx_count');
  const { detail } = useDetailPage<FormattedGateway>();
  const ns = detail?.name?.split('kubesphere-router-')[1];
  const { data: metrics = {}, refetch } = useQuery(
    ['gatewayMetrics', step, detail?.cluster, detail?.name, autoRefresh],
    async () => {
      const res = fetchMetrics({
        duration: step,
        cluster: detail?.cluster,
        namespace: ns,
        metrics: Object.values(MetricTypes),
        job: `${detail?.name}-metrics`,
        ...(autoRefresh ? { autoRefresh: true } : {}),
        ...params,
      });
      return handleMetricsData(res);
    },
    {
      refetchInterval: () => (autoRefresh ? 5000 : false),
    },
  );

  const getMetricsData = (key: string, initvalue = 0) => get(metrics, `${key}`, initvalue);

  const handleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  const autoRefreshButton = useMemo(() => {
    if (!enableAutoRefresh) {
      return null;
    }

    return (
      <StyledButton color="secondary" shadow onClick={handleAutoRefresh}>
        {autoRefresh ? (
          <Pause color="rgba(255, 255, 255, 0.9)" fill="rgba(255, 255, 255, 0.4)" />
        ) : (
          <Start color="rgba(255, 255, 255, 0.9)" fill="rgba(255, 255, 255, 0.4)" />
        )}
      </StyledButton>
    );
  }, [enableAutoRefresh, autoRefresh]);

  return (
    <Overview>
      <Header>
        <p>{t('OVERVIEW')}</p>
        <Operations>
          <TimeSelector
            step={step}
            onChange={({ step: newStep }) => {
              setStep(newStep);
              refetch();
            }}
            timeOps={['1m', '5m', '10m', '30m', '1h', '3h', '6h', '12h']}
          />
          {autoRefreshButton}
          <StyledButton color="secondary" onClick={() => refetch()}>
            <Refresh color="rgba(255, 255, 255, 0.9)" fill="rgba(255, 255, 255, 0.4)" />
          </StyledButton>
        </Operations>
      </Header>
      <FlexWrapper>
        <LeftContainer>
          <LeftItem>
            <Gateway size={56}></Gateway>
            <div>
              <p>{t('TOTAL_REQUESTS')}</p>
              <span>{getMetricsData('ingress_request_count')}</span>
            </div>
          </LeftItem>
          <LeftItem>
            <Error size={56} />
            <div>
              <SelectWithoutBorder
                value={errorType}
                options={[
                  {
                    label: t('FOUR_XX_REQUEST_COUNT'),
                    value: 'ingress_request_4xx_count',
                  },
                  {
                    label: t('FIVE_XX_REQUEST_COUNT'),
                    value: 'ingress_request_5xx_count',
                  },
                ]}
                onChange={(value: string) => setErrorType(value)}
              />
              <span>{getMetricsData(errorType)}</span>
            </div>
          </LeftItem>
        </LeftContainer>
        <MiddleContainer>
          <SimpleCircle
            theme="light"
            width={200}
            height={200}
            title=""
            value={`${(getMetricsData('ingress_success_rate') * 100).toFixed(2)}`}
            total={100}
            unit="%"
            // innerRadius="80%"
            categories={['SUCCESSFUL_REQUESTS', 'TOTAL']}
            showCenter={true}
            showRate={false}
            colors={['#55BC8A', '#E3E9EF']}
            renderCustomCenter={({ value }) => (
              <SimpleContent>
                <p>{t('SUCCESSFUL_REQUESTS')}</p>
                <span>{value}%</span>
              </SimpleContent>
            )}
          />
        </MiddleContainer>
        <RightContainer>
          <RightItem>
            <ImageIcon src="/assets/alarm-object.svg"></ImageIcon>
            <div>
              <p>{t('AVERAGE_LATENCY')}</p>
              <span>{`${getMetricsData('ingress_request_duration_average')} s`}</span>
            </div>
          </RightItem>
          <SmallItem>
            <span>{t('P_FIFTY_LATENCY')}</span>
            <span>{`${getMetricsData('ingress_request_duration_50percentage')} s`}</span>
          </SmallItem>
          <SmallItem>
            <span>{t('P_NINETY_FIVE_LATENCY')}</span>
            <span>{`${getMetricsData('ingress_request_duration_95percentage')} s`}</span>
          </SmallItem>
          <SmallItem>
            <span>{t('P_NINETY_NINE_LATENCY')}</span>
            <span>{`${getMetricsData('ingress_request_duration_99percentage')} s`}</span>
          </SmallItem>
        </RightContainer>
      </FlexWrapper>
    </Overview>
  );
}

export default MonitoringOverview;
