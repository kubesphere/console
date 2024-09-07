/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { createElement } from 'react';
import classNames from 'classnames';
import { Badge, BadgeAnchor, Field } from '@kubed/components';
import { useCacheStore as useStore } from '../../../index';
import { RoleModule } from '../../../types';
import { TabsWrapper, TitleWrapper, Tab } from './style';
import { getBrowserLang, getDisplayName as getName } from '../../../utils';
import { isEmpty } from 'lodash';

interface Props {
  module: string;
  roleModules: RoleModule[];
}

const getDisplayName = (item: RoleModule) => {
  const lang = globals.user?.lang || getBrowserLang();

  if (isEmpty(item.displayName) || !item?.displayName?.[lang]) {
    return getName(item);
  }
  return item.displayName[lang];
};

function Tabs({ module, roleModules = [] }: Props) {
  const [roleStore, setRoleStore] = useStore(`${module}_store`);
  const { currentModule } = roleStore;

  return (
    <TabsWrapper>
      <TitleWrapper>{t('CATEGORIES')}</TitleWrapper>
      <TabsWrapper>
        <div className="content">
          {roleModules.map(item => {
            let label = item.state === 'ENABLED' ? t('AUTHORIZED') : t('UNAUTHORIZED');
            if (currentModule === item.name) {
              label = t('CURRENT');
            }
            const value = getDisplayName(item);
            const avatar = (
              <BadgeAnchor offset={[5, 5]}>
                <Badge color={item.state === 'ENABLED' ? 'success' : '#86929d'} dot />
                {createElement(item.icon, { size: 40 })}
              </BadgeAnchor>
            );
            return (
              <Tab
                key={item.name}
                className={classNames({
                  enabled: currentModule === item.name,
                })}
                onClick={() =>
                  setRoleStore({
                    ...roleStore,
                    currentModule: item.name,
                  })
                }
              >
                <Field avatar={avatar} value={value} label={label} />
              </Tab>
            );
          })}
        </div>
      </TabsWrapper>
    </TabsWrapper>
  );
}

export default Tabs;
