/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get } from 'lodash';
import { FormattedRole, FormattedUser } from '../../../index';
import { Button, Dropdown, Field, Menu, MenuItem } from '@kubed/components';
import { Add, Check, Role } from '@kubed/icons';

import { MenuWrapper, UserWrapper } from './style';

interface Props {
  user: FormattedUser;
  roles: FormattedRole[];
  selected: boolean;
  onSelect: (user: FormattedUser, roleRef: string) => void;
}

function User({ user, roles, selected, onSelect }: Props) {
  const handleItemClick = (roleRef: string) => {
    onSelect(user, roleRef);
  };

  const MoreMenu = (
    <MenuWrapper>
      <p>{t('ASSIGN_ROLE')}</p>
      <Menu width={300}>
        {roles.map(role => (
          <MenuItem key={role.name} onClick={() => handleItemClick(role.name)}>
            <Field
              value={role.aliasName ? `${role.aliasName}（${role.name}）` : role.name}
              label={t(get(role, 'description'))}
              avatar={<Role size={40} />}
            />
          </MenuItem>
        ))}
      </Menu>
    </MenuWrapper>
  );

  return (
    <UserWrapper>
      <p>
        <strong>{user.aliasName ? `${user.aliasName}（${user.username}）` : user.username}</strong>
      </p>
      <p>{user.email}</p>
      {selected ? (
        <Button variant="text" disabled>
          <Check />
        </Button>
      ) : (
        <Dropdown maxWidth={300} content={MoreMenu}>
          <Button color="secondary" shadow>
            <Add variant="light" />
          </Button>
        </Dropdown>
      )}
    </UserWrapper>
  );
}

export default User;
