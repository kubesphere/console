/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { ListWrapper, NameWrapper } from './styles';
import { RoleModule } from '../../../types';
import { get } from 'lodash';
import { getBrowserLang } from '../../../utils';

function RuleList({
  templates,
  roleModules,
}: {
  templates: Record<string, any>;
  roleModules: RoleModule[];
}) {
  const lang = get(globals.user, 'lang') || getBrowserLang();

  const getName = (roleTemp: Record<string, any>) => {
    return (
      get(roleTemp, `_originData.spec.displayName[${lang}]`) ||
      get(roleTemp, `_originData.spec.displayName.en`)
    );
  };

  return (
    <ListWrapper>
      {Object.keys(templates).map(key => {
        const templateCategoryName = get(
          templates[key],
          `[0].labels["iam.kubesphere.io/category"]`,
        );

        const categoryObject = roleModules.find(item => item.name === templateCategoryName);
        const categoryName = categoryObject?.displayName?.[lang] || categoryObject?.displayName?.en;

        return (
          <li key={key}>
            <NameWrapper>{categoryName}</NameWrapper>
            <div>
              {templates[key].map((role: Record<string, any>) => getName(role)).join('  |  ')}
            </div>
          </li>
        );
      })}
    </ListWrapper>
  );
}

export default RuleList;
