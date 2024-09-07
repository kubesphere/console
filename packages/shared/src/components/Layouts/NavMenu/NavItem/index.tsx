/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { ChevronDown } from '@kubed/icons';

import type { LicenseAuthorizationStatus } from '../../../../types/license';
import { LicenseErrorTip } from '../../../../index';
import Icon from '../../../Icon';

import {
  InnerItem,
  InnerNav,
  ItemWrapper,
  TitleWrapper,
  ImageIcon,
  LicenseErrorTipWrapper,
} from './styles';

export type NavMenuItemTab = { name: string; title: string; authKey?: string };

export type NavMenuItem = {
  name: string;
  title: string;
  icon?: string;
  assets?: string;
  description?: string;
  children?: NavMenuItem[];
  enabled?: boolean;
  skipAuth?: boolean;
  authAction?: string;
  showInDisable?: boolean;
  clusterModule?: string;
  requiredClusterVersion?: string;
  admin?: boolean;
  multiCluster?: boolean;
  ksModule?: boolean;
  tabs?: NavMenuItemTab[];
  cluster?: string;
  clusters?: Array<string>;
  isLicenseError?: boolean;
  licenseAuthorizationStatus?: LicenseAuthorizationStatus | undefined;
};

interface NavItemProps {
  item?: NavMenuItem;
  onOpen: (params: string) => void;
  prefix: string;
  isOpen: boolean;
  current?: string;
  pathArr: string[];
  disabled?: boolean;
}

const NavItem = ({ item, onOpen, isOpen, pathArr, prefix, disabled }: NavItemProps) => {
  const handleToggle = () => {
    onOpen(item?.name || '');
  };

  const checkSelect = (navItem: any = {}) => {
    if (navItem.children) {
      return navItem.children.some((child: NavMenuItem) => checkSelect(child));
    }

    if (navItem.tabs) {
      return navItem.tabs.some((tab: any) => checkSelect(tab));
    }

    return pathArr.includes(navItem.name);
  };

  const isItemDisabled = item?.isLicenseError ? true : disabled && !item?.showInDisable;

  const itemLicenseErrorTipWrapper = item?.isLicenseError && (
    <LicenseErrorTipWrapper>
      <LicenseErrorTip authorizationStatus={item?.licenseAuthorizationStatus} />
    </LicenseErrorTipWrapper>
  );

  if (item?.children) {
    return (
      <ItemWrapper
        className={cx({
          'is-open': isOpen,
          'is-select': checkSelect(item),
          'is-disabled': isItemDisabled,
        })}
      >
        <TitleWrapper onClick={isItemDisabled ? undefined : handleToggle} className="title-wrapper">
          {item?.assets ? (
            <ImageIcon src={item.assets} alt="" />
          ) : (
            item?.icon && <Icon className="item-icon" name={item.icon} />
          )}
          <span>{t(item?.title)}</span>
          {!isItemDisabled && <ChevronDown className="open-indicator" />}
          {itemLicenseErrorTipWrapper}
        </TitleWrapper>
        <InnerNav className="inner-nav">
          {item?.children.map((child: NavMenuItem) => {
            const isChildDisabled = child.isLicenseError ? true : disabled && !child.showInDisable;

            return (
              <InnerItem
                key={child.name}
                className={cx('inner-item', {
                  'is-select': checkSelect(child),
                  'is-disabled': isChildDisabled,
                })}
              >
                {isChildDisabled ? (
                  <span>{t(child.title)}</span>
                ) : (
                  <Link to={`${prefix}/${child.name}`}>{t(child.title)}</Link>
                )}
                {child.isLicenseError && (
                  <LicenseErrorTipWrapper>
                    <LicenseErrorTip authorizationStatus={child.licenseAuthorizationStatus} />
                  </LicenseErrorTipWrapper>
                )}
              </InnerItem>
            );
          })}
        </InnerNav>
      </ItemWrapper>
    );
  }

  return (
    <ItemWrapper
      className={cx({
        'is-select': checkSelect(item),
        'is-disabled': isItemDisabled,
      })}
    >
      {isItemDisabled ? (
        <div className="item-link" style={{ paddingRight: item?.isLicenseError ? 0 : 12 }}>
          {item?.assets ? (
            <ImageIcon src={item.assets} alt="" />
          ) : (
            item?.icon && <Icon className="item-icon" name={item.icon} />
          )}
          <span>{t(item?.title || '')}</span>
          {itemLicenseErrorTipWrapper}
        </div>
      ) : (
        <Link to={`${prefix}/${item?.name}`} className="item-link">
          {item?.assets ? (
            <ImageIcon src={item.assets} alt="" />
          ) : (
            item?.icon && <Icon className="item-icon" name={item.icon} />
          )}
          <span>{t(item?.title || '')}</span>
        </Link>
      )}
    </ItemWrapper>
  );
};

export default NavItem;
