/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Button, Drawer, Field } from '@kubed/components';
import { Close, PlugCircle } from '@kubed/icons';

import type { NavMenuItem } from '@ks-console/shared';
import { hasPermission, Icon } from '@ks-console/shared';
import { ExtensionButtonStyle, ExtensionDrawerContent, StyledEmpty } from './styles';

interface GlobalNavItem extends NavMenuItem {
  link?: string;
  icon?: string;
  img?: string;
  roleTemplate?: string;
}

const ExtensionComp = ({ navs = [] }: { navs: GlobalNavItem[] }) => {
  const [visible, setVisible] = useState(false);

  const onOpen = useCallback(() => {
    setVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <ExtensionButtonStyle>
      <Button className="extension-button" onClick={onOpen}>
        <img className="extension-icon" src="/assets/grid.svg" />
      </Button>
      <Drawer
        maskClosable
        width={648}
        placement="right"
        visible={visible}
        onClose={onClose}
        contentWrapperStyle={{ backgroundColor: '#f9fbfd' }}
      >
        <ExtensionDrawerContent>
          <div className="header">
            <Field
              label={t('EXTENSION_DESC')}
              value={t('EXTENSION')}
              avatar={<img src="/assets/grid.svg" width="40" height="40" alt="" />}
            />
            <Button className="close-button" onClick={onClose} shadow={true} color={'secondary'}>
              <Close size={24} variant="light" />
            </Button>
          </div>
          <div className="content">
            {isEmpty(navs) ? (
              <StyledEmpty
                image={<PlugCircle size={48} />}
                imageClassName="imageClass"
                title={t('NO_EXTENSION_FOUND')}
                description={t('NO_EXTENSION_FOUND_DESC')}
              />
            ) : (
              navs?.map((nav, index) => {
                const { name, icon, title, img, roleTemplate } = nav;

                const disabled = (() => {
                  return roleTemplate
                    ? hasPermission({ module: 'platform-settings', action: roleTemplate })
                    : false;
                })();

                const to = nav?.link ?? `/${name}`;

                if (disabled) {
                  return (
                    <Button key={`${name}-${index}`} variant="text" className="item" disabled>
                      {icon ? <Icon name={icon} size={60} /> : <img src={img} />}
                      <div className="desc">{t(title)}</div>
                    </Button>
                  );
                }

                return (
                  <Button
                    key={`${name}-${index}`}
                    to={to}
                    as={Link}
                    variant="text"
                    className="item"
                    onClick={onClose}
                  >
                    {icon ? <Icon name={icon} size={60} /> : <img src={img} />}
                    <div className="desc">{t(title)}</div>
                  </Button>
                );
              })
            )}
          </div>
        </ExtensionDrawerContent>
      </Drawer>
    </ExtensionButtonStyle>
  );
};

export default ExtensionComp;
