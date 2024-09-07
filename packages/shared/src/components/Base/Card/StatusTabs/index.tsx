/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { LoadingOverlay } from '@kubed/components';
import classNames from 'classnames';
import { isEmpty, isFunction } from 'lodash';
import React, { FunctionComponent, ReactNode, useCallback, useState } from 'react';
import { OriginalStatisticsMetricResult } from '../../../../types';
import {
  CardWrapper,
  Content,
  EmptyWrapper,
  Tab,
  TabContent,
  TabContentInner,
  TabImg,
  TabInner,
  TabList,
  Title,
} from './styles';

type OptionProps = {
  cluster?: string;
  unitType?: string;
  type?: string;
  title?: string;
  unit?: string;
  legend?: string[];
  data?: (OriginalStatisticsMetricResult | {})[];
  areaColors?: string[];
};

type Option = {
  props?: OptionProps;
  render?: (props: Partial<OptionProps>) => ReactNode;
  component?: FunctionComponent<Partial<OptionProps>>;
};

interface Props {
  title?: string;
  tabOptions?: Option[];
  contentOptions?: Option[];
  loading?: boolean;
  refetch?: any;
}

function StatusTabs({
  title = '',
  tabOptions = [],
  contentOptions = [],
  loading = true,
  refetch,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabClick = useCallback(index => {
    refetch?.();
    setActiveIndex(index);
  }, []);

  const renderTabList = () => {
    if (isEmpty(tabOptions)) return null;

    return (
      <TabList>
        {tabOptions.map((op, index) => {
          const isActive = index === activeIndex;
          const Component = op.component;
          const render = op.render;
          const props = {
            ...op.props,
            active: isActive,
          };

          return (
            <Tab
              key={'tab' + index}
              className={classNames({ active: isActive })}
              onClick={() => handleTabClick(index)}
            >
              <TabImg />
              <TabInner>
                {isFunction(render) ? render(props) : Component && <Component {...props} />}
              </TabInner>
            </Tab>
          );
        })}
      </TabList>
    );
  };

  const renderTabContent = () => {
    const op = contentOptions[activeIndex] || {};
    const Component = op.component;
    const render = op.render;
    const props = {
      ...op.props,
    };

    return (
      <TabContent>
        <TabContentInner>
          {isEmpty(contentOptions) ? (
            <EmptyWrapper
              title={t('NO_DATA')}
              image={<img src="/assets/empty-card.svg" />}
              imageStyle={{ width: '100%', background: 'none' }}
            />
          ) : isFunction(render) ? (
            render(props)
          ) : (
            Component && <Component {...props} />
          )}
        </TabContentInner>
      </TabContent>
    );
  };

  return (
    <CardWrapper padding={20} hoverable>
      <Title>{title}</Title>
      <Content>
        <LoadingOverlay visible={loading} />
        {renderTabList()}
        {renderTabContent()}
      </Content>
    </CardWrapper>
  );
}

export default StatusTabs;
