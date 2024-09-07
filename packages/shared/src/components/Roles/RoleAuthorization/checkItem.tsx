/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Dictionary, get, isEmpty } from 'lodash';
import { Checkbox, notify } from '@kubed/components';

import type { FormattedRole } from '../../../types';
import { CheckItemWrapper, Dependencies, TextField, CheckboxWrapper, StyledTag } from './style';

import { getAnnotationsAliasName, getAnnotationsDescription, getBrowserLang } from '../../../utils';

interface Props {
  aggregationRoles: string[];
  roleTemplatesMap: Dictionary<FormattedRole>;
  role: FormattedRole;
  onChange: (value: string[]) => void;
}

function getDependencies(roleTemplatesMap: Dictionary<FormattedRole>, names: string[]) {
  const dependencies: string[] = [];

  if (isEmpty(names)) {
    return dependencies;
  }

  names.forEach(name => {
    const template = roleTemplatesMap[name];
    if (template?.dependencies) {
      template.dependencies.forEach(dep => {
        if (!names.includes(dep) && !dependencies.includes(dep)) {
          dependencies.push(dep);
        }
      });
    }
  });

  if (dependencies.length > 0) {
    dependencies.push(...getDependencies(roleTemplatesMap, dependencies));
  }

  return dependencies;
}

function CheckItem({ aggregationRoles, roleTemplatesMap, role, onChange }: Props) {
  const lang = (get(globals.user, 'lang') || getBrowserLang()) === 'zh' ? 'zh' : 'en';

  const getName = (roleTemp: Record<string, any>) => {
    if (!roleTemp) return '';
    const data = roleTemp._originData;
    if (data.spec.displayName) {
      return data.spec.displayName[lang] ?? '';
    } else if (data.metadata.annotations) {
      try {
        const descObject = JSON.parse(getAnnotationsAliasName(data));
        return descObject[lang] ?? '';
      } catch (e) {
        return '';
      }
    } else return '';
  };

  const getDesc = (roleTemp: Record<string, any>) => {
    const data = roleTemp._originData;
    if (data.spec.description) {
      return data.spec.description[lang] ?? '';
    } else if (data.metadata.annotations) {
      try {
        const descObject = JSON.parse(getAnnotationsDescription(data));
        return descObject[lang] ?? '';
      } catch (e) {
        return '';
      }
    } else return '';
  };

  const handleCheck = () => {
    let newTemplates = [...aggregationRoles];

    if (newTemplates.includes(role.name)) {
      const relateTemplates = newTemplates.filter(
        template =>
          template !== role.name &&
          getDependencies(roleTemplatesMap, [template]).includes(role.name),
      );

      if (relateTemplates.length === 0) {
        newTemplates = newTemplates.filter(item => item !== role.name);
      } else {
        // TODO: warning
        notify.error(
          t('DESELECT_RESOURCE_FIRST', {
            resource: relateTemplates.map(rt => getName(roleTemplatesMap[rt])).join('/'),
          }),
        );
      }
    } else {
      newTemplates.push(role.name);
    }

    const data = [...newTemplates, ...getDependencies(roleTemplatesMap, newTemplates)];
    onChange(data);
  };

  let dependencies: string[] = [];
  if (role.dependencies.length > 0) {
    dependencies = role.dependencies.reduce<string[]>((acc, cur) => {
      const aliasName = getName(roleTemplatesMap[cur]);

      if (aliasName) {
        return [...acc, aliasName];
      }
      return acc;
    }, []);
  }
  return (
    <CheckItemWrapper>
      <CheckboxWrapper>
        <Checkbox checked={aggregationRoles.includes(role.name)} onChange={handleCheck} />
      </CheckboxWrapper>

      <TextField label={getDesc(role)} value={getName(role)} onClick={handleCheck} />
      {dependencies.length > 0 && (
        <Dependencies>
          {t('DEPENDS_ON')}
          {dependencies.map(aliasName => (
            <StyledTag color="info" key={aliasName}>
              {aliasName}
            </StyledTag>
          ))}
        </Dependencies>
      )}
    </CheckItemWrapper>
  );
}

export default CheckItem;
