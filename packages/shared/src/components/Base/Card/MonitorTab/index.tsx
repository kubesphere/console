/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo } from 'react';
import { get, isEmpty } from 'lodash';
import { getValueByUnit, getAreaChartOps } from '../../../../utils';
import { SimpleArea } from '../../../Charts';
import Icon from '../../../Icon';
import { Field } from '@kubed/components';
import { WrapperCard, TabHeader, TabHeaderItem, TabContent } from './styles';

interface Props {
  tabs: Record<string, any>;
}
const getLastValue = (data: any, unit: string) => {
  const values = get(data, `[0].values`, []);
  return getValueByUnit(values[values.length - 1][1], unit);
};
function MonitorTab({ tabs = [] }: Props) {
  const [activeTab, setActiveTab] = useState<string>((tabs[0] || {}).key);
  const handleTabClick = (key: string) => {
    setActiveTab(key);
  };
  const renderTabList = useMemo(() => {
    if (isEmpty(tabs)) return null;
    return (
      <TabHeader>
        {tabs.map((tab: any) => (
          <TabHeaderItem
            key={tab.key}
            active={tab.key === activeTab}
            onClick={() => handleTabClick(tab.key)}
          >
            <Field
              value={!tab.data ? '0%' : `${getLastValue(tab.data, tab.unit)}%`}
              avatar={<Icon name={tab.icon} size={40} />}
              label={t(`${tab.title}_SCAP`)}
            />
          </TabHeaderItem>
        ))}
      </TabHeader>
    );
  }, [activeTab, tabs]);
  const renderTabContent = useMemo(() => {
    const tab = tabs.find((_tab: any) => _tab.key === activeTab);
    if (!tab || !tab.data) {
      return null;
    }
    const config = getAreaChartOps(tab);
    return (
      <TabContent>
        <SimpleArea
          {...config}
          // width="100%"
          height={200}
          categories={tab.legend}
          showYAxis={false}
          minValue={0}
          maxValue={100}
        />
      </TabContent>
    );
  }, [activeTab, tabs]);
  return (
    <WrapperCard>
      {renderTabList}
      {renderTabContent}
    </WrapperCard>
  );
}
export default MonitorTab;
