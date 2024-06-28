import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { CateTitle, MenuList, SideMenuWrapper } from './styles';
import { kebabCase } from 'lodash';

interface SideMenuProps {
  title: string;
  category: string;
  menu: string[];
  slug?: string;
}

export default function SideMenu({ title, category, menu, slug }: SideMenuProps) {
  return (
    <SideMenuWrapper>
      <CateTitle>{t(title)}</CateTitle>
      <MenuList>
        {menu.map(item => {
          const kebabMenu = kebabCase(item);
          return (
            <li key={item} className={cx({ active: slug === kebabMenu })}>
              <Link to={`/docs/${category}/${kebabMenu}`}>
                <a>{item}</a>
              </Link>
            </li>
          );
        })}
      </MenuList>
    </SideMenuWrapper>
  );
}
