/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';
import { Form, FormItem, Input, Select } from '@kubed/components';

import { Pattern, openpitrixStore, AppDetail } from '@ks-console/shared';

import IconUploadField from './IconUploadField';

import { TextArea } from '../styles';

const { useCategoryList } = openpitrixStore;

type Props = {
  form: any;
  detail: AppDetail;
};

function AppBaseEditForm({ form, detail }: Props): JSX.Element {
  const { data: categories, isLoading } = useCategoryList();
  const categoryOptions = useMemo(() => {
    if (isLoading || isEmpty(categories)) {
      return [];
    }

    return categories?.map(({ name, category_id }: any) => ({
      label: t(`APP_CATE_${name.toUpperCase().replace(/[^A-Z]+/g, '_')}`, {
        defaultValue: name,
      }),
      value: category_id,
    }));
  }, [categories, isLoading]);

  return (
    <Form form={form} initialValues={detail}>
      <FormItem
        name={['name']}
        label={t('NAME')}
        help={t('APP_NAME_DESC')}
        rules={[
          {
            required: true,
            message: t('NAME_EMPTY_DESC'),
          },
        ]}
      >
        <Input autoComplete="off" maxLength={20} />
      </FormItem>
      <FormItem name={['description']} label={t('DESCRIPTION')} help={t('APP_DESCRIPTION_DESC')}>
        <TextArea maxLength={120} rows={2} />
      </FormItem>
      <FormItem name={['icon']} label={t('ICON')}>
        <IconUploadField initialValue={detail.metadata.name} />
      </FormItem>
      <FormItem
        name={['category_id']}
        label={t('APP_CATEGORY')}
        help={t('CHOOSE_APP_CATEGORY_DESC')}
      >
        <Select style={{ width: '100%' }} placeholder=" " options={categoryOptions} />
      </FormItem>
      <FormItem
        name={['home']}
        label={t('SERVICE_PROVIDER_WEBSITE_TCAP')}
        help={t('SERVICE_PROVIDER_WEBSITE_DESC')}
        rules={[
          {
            pattern: Pattern.PATTERN_URL,
            message: t('WRONG_ADDRESS_TIP'),
          },
        ]}
      >
        <Input autoComplete="off" maxLength={100} />
      </FormItem>
    </Form>
  );
}

export default AppBaseEditForm;
