/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Banner, LoadingOverlay, notify } from '@kubed/components';

import {
  Icon,
  Image,
  Column,
  CategoryDetail,
  openpitrixStore,
  useBatchActions,
  DeleteConfirmModal,
  AppDataTable,
} from '@ks-console/shared';

import CategoryList from './CategoryList';
import ManageCategoryModal from './ManageCategoryModal';

import { Categories, Columns, FirstColumn, Head, SecondColumn, TableItemField } from './styles';

const { useCategoryList, createCategory, updateCategory, deleteCategory } = openpitrixStore;

function CategoriesManage(): JSX.Element {
  const {
    data: categories = [],
    isLoading,
    refresh,
  } = useCategoryList({ options: { params: { statistics: true } } });
  const [modalType, setModalType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetail>();
  const [currentManageCategory, setCurrentManageCategory] = useState<CategoryDetail | undefined>();
  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      width: '50%',
      searchable: true,
      render: (name, app) => (
        <TableItemField
          label={app.description}
          value={<Link to={`/apps/${app.metadata.name}`}>{name}</Link>}
          avatar={<Image iconSize={40} src={app.icon} iconLetter={name} />}
        />
      ),
    },
    {
      title: t('WORKSPACE'),
      field: 'isv',
      canHide: true,
      width: '25%',
    },
    {
      title: t('LATEST_VERSION'),
      field: 'latest_app_version.name',
      canHide: true,
      width: '25%',
    },
  ];
  const renderBatchActions = useBatchActions({
    authKey: 'apps',
    actions: [
      {
        key: 'adjust',
        text: t('CHANGE_CATEGORY'),
        action: 'delete',
      },
    ],
  });

  function closeModal(): void {
    setModalType('');
    setCurrentManageCategory(undefined);
  }

  function mutateSuccess(message: string): void {
    notify.success(message);
    closeModal();
    refresh();
  }

  async function handleCategoryDelete(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { metadata } = currentManageCategory || {};

    if (!metadata?.name) {
      return;
    }

    await deleteCategory(metadata.name);
    mutateSuccess(t('DELETED_SUCCESSFULLY'));
  }

  async function handleOk(data: Pick<CategoryDetail, 'metadata' | 'spec'>): Promise<Promise<void>> {
    const categoryId = currentManageCategory?.metadata.name;

    if (!categoryId) {
      await createCategory(data);
    } else {
      await updateCategory(categoryId, data);
    }

    mutateSuccess(t(categoryId ? 'MODIFY_SUCCESSFUL' : 'CREATE_SUCCESSFUL'));
  }

  return (
    <>
      <Banner
        className="mb12"
        icon={<Icon name="tag" />}
        title={t('APP_CATEGORY_PL')}
        description={t('APP_CATEGORIES_DESC')}
      />
      <Columns>
        <FirstColumn>
          <LoadingOverlay visible={isLoading} />
          <Categories>
            <Head>
              <label>{t('ALL_CATEGORIES_VALUE', { value: categories?.length })}</label>
              <Icon name="add" size={20} onClick={() => setModalType('manage')} />
            </Head>
            <CategoryList
              categories={categories}
              onSelectCategory={setSelectedCategory}
              onManageCategory={(data, type) => {
                setModalType(type);
                setCurrentManageCategory(data);
              }}
            />
          </Categories>
        </FirstColumn>
        <SecondColumn>
          {selectedCategory?.metadata.name && (
            <AppDataTable
              columns={columns}
              batchActions={renderBatchActions()}
              categoryId={selectedCategory.metadata.name}
            />
          )}
        </SecondColumn>
      </Columns>
      {modalType === 'manage' && (
        <ManageCategoryModal
          visible={true}
          detail={currentManageCategory}
          onCancel={closeModal}
          onOk={handleOk}
          categoryNames={categories.map(({ metadata }) => metadata.name)}
        />
      )}
      {modalType === 'delete' && (
        <DeleteConfirmModal
          visible={true}
          tip={t('DELETE_CATEGORY_DESC', { name: currentManageCategory?.metadata.name })}
          onOk={handleCategoryDelete}
          onCancel={closeModal}
        />
      )}
    </>
  );
}

export default CategoriesManage;
