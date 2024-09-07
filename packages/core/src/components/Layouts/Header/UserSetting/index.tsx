/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { cloneDeep, set } from 'lodash';
import { useCacheStore as useStore } from '@ks-console/shared';
import {
  Button,
  ButtonProps,
  BadgeAnchor,
  Popover,
  LoadingOverlay,
  useForm,
  ActionConfirm,
} from '@kubed/components';
import { useUnmount } from '@kubed/hooks';
import { Paper, Exclamation, Ssh } from '@kubed/icons';

import { UserSettingWrapper, InnerWrapper, TabButtons, TabContent } from './styles';
import BasicInfo from './BasicInfo';
import Password from './Password';
import { useGetUser } from '../../../../stores/user';

const UserSetting = () => {
  const [activeTab, setActiveTab] = useState('basicInfo');
  const [basicInfoChanged, setBasicInfoChanged] = useStore<boolean>('BasicInfoChanged', false);
  const [passwordChanged, setPasswordChange] = useStore<boolean>('PasswordChanged', false);
  const [basicInfoForm] = useForm();
  const [passwordForm] = useForm();

  useUnmount(() => {
    setPasswordChange(false);
    setBasicInfoChanged(false);
  });

  const { isLoading, data } = useGetUser({ name: globals.user.username });
  let formData;
  if (!isLoading && data) {
    formData = {
      apiVersion: 'iam.kubesphere.io/v1beta1',
      kind: 'User',
      ...cloneDeep(data._originData),
    };
    set(formData, 'metadata.resourceVersion', data.resourceVersion);
  }

  const getIcon = (tab: string) => {
    const iconVariant = tab === activeTab ? 'light' : 'dark';
    let isChanged = false;
    let icon;
    if (tab === 'basicInfo') {
      isChanged = basicInfoChanged;
      icon = <Paper variant={iconVariant} size={18} />;
    } else if (tab === 'password') {
      isChanged = passwordChanged;
      icon = <Ssh variant={iconVariant} size={18} />;
    }

    if (isChanged) {
      return (
        <BadgeAnchor offset={[3, 3]}>
          <Popover
            title={t('CONTENT_NOT_SAVED_TIPS')}
            content={t('SAVE_EDIT_HINTS')}
            placement="bottom-start"
            width={240}
          >
            <Exclamation className="badge" size={14} color="#fff" fill="rgb(245, 166, 35)" />
          </Popover>
          {icon}
        </BadgeAnchor>
      );
    }
    return icon;
  };

  const tabs = [
    {
      label: t('BASIC_INFORMATION'),
      icon: getIcon('basicInfo'),
      key: 'basicInfo',
    },
    {
      label: t('PASSWORD_SETTINGS'),
      icon: getIcon('password'),
      key: 'password',
    },
  ];

  const handleCancel = () => {
    if (activeTab === 'basicInfo') {
      setBasicInfoChanged(false);
      basicInfoForm.resetFields();
    }
    if (activeTab === 'password') {
      setPasswordChange(false);
      passwordForm.resetFields();
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'basicInfo') {
      basicInfoForm.submit();
    } else if (activeTab === 'password') {
      passwordForm.submit();
    }
  };

  return (
    <UserSettingWrapper>
      <InnerWrapper>
        <TabButtons>
          {tabs.map(tab => {
            const { icon, key, label } = tab;
            const isActive = tab.key === activeTab;
            const buttonProps: ButtonProps = isActive
              ? { color: 'secondary', className: 'btn-secondary tab-button' }
              : { variant: 'text', className: 'btn-text tab-button' };
            return (
              <Button
                size="md"
                leftIcon={icon}
                {...buttonProps}
                key={key}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </Button>
            );
          })}
        </TabButtons>
        <TabContent>
          <BasicInfo visible={activeTab === 'basicInfo'} formData={formData} form={basicInfoForm} />
          <Password visible={activeTab === 'password'} form={passwordForm} />
          <LoadingOverlay visible={isLoading} overlayOpacity={0.5} size="md" />
          <ActionConfirm
            visible={
              (basicInfoChanged && activeTab === 'basicInfo') ||
              (passwordChanged && activeTab === 'password')
            }
            onCancel={handleCancel}
            onOk={handleSubmit}
          />
        </TabContent>
      </InnerWrapper>
    </UserSettingWrapper>
  );
};

export default UserSetting;
