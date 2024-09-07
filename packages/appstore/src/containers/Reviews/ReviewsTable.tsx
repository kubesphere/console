/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';

import { Icon, TableRef } from '@ks-console/shared';

import {
  Image,
  Column,
  DataTable,
  getLocalTime,
  useItemActions,
  StatusIndicator,
  openpitrixStore,
  useListQueryParams,
} from '@ks-console/shared';

import DetailDrawer from './DetailDrawer';
import { TableItemField } from '../CategoriesManage/styles';
import { transferReviewStatus } from '../../utils';

const { getBaseUrl, REVIEW_QUERY_STATUS } = openpitrixStore;

type Props = {
  type: string;
};

function ReviewsTable({ type }: Props): JSX.Element {
  const tableRef = useRef<TableRef<any>>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const queryParams: Record<string, any> = {
    order: 'status_time',
    status: REVIEW_QUERY_STATUS[type],
  };

  function showReview(item: any): void {
    setSelectedRow(item);
    setVisible(true);
  }
  const renderItemActions = useItemActions({
    authKey: 'apps',
    actions: [
      {
        key: 'detail',
        icon: <Icon name="eye" />,
        text: t('VIEW_DETAILS'),
        action: 'view',
        onClick: (_, record) => {
          showReview(record);
        },
      },
    ],
  });
  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'reviewID',
      width: '30%',
      searchable: true,
      render: (_, item) => (
        <TableItemField
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick={() => showReview(item)}
          avatar={<Image src={item.icon} iconSize={40} iconLetter={item.appName} />}
          value={item.appName}
          label={item.versionName || '-'}
        />
      ),
    },
    {
      title: t('WORKSPACE'),
      field: 'appName',
      canHide: true,
      width: '15%',
      render: (_, item) => item.isv || '-',
    },
    {
      title: t('OPERATOR'),
      field: 'reviewer',
      canHide: true,
      width: '15%',
    },
    {
      title: t('STATUS'),
      field: 'status',
      canHide: true,
      width: '15%',
      render: status => {
        const transStatus = transferReviewStatus(status);

        return (
          <StatusIndicator type={transStatus as any}>
            {t(`APP_STATUS_${transStatus.toUpperCase().replace(/-/g, '_')}`)}
          </StatusIndicator>
        );
      },
    },
    {
      title: t('UPDATE_TIME_TCAP'),
      field: 'status_time',
      canHide: true,
      width: '15%',
      render: time => getLocalTime(time).fromNow(),
    },
    {
      id: 'more',
      title: '',
      width: 20,
      render: renderItemActions,
    },
  ];

  function onCancel(): void {
    setVisible(false);
  }

  function transformRequestParams(params: Record<string, any>): Record<string, any> {
    const { parameters, pageIndex, filters } = params;
    const keyword = filters?.[0]?.value;
    const formattedParams: Record<string, any> = useListQueryParams({
      ...parameters,
      page: pageIndex + 1,
    });

    if (!keyword) {
      return formattedParams;
    }

    return {
      ...formattedParams,
      conditions: formattedParams.conditions + `,keyword=${keyword}`,
    };
  }

  function formatServerData(serverData: Record<string, any>) {
    return {
      ...serverData,
      totalItems: serverData.totalCount,
    };
  }

  function handlePass(action: string) {
    console.log(action);
  }

  return (
    <>
      <DataTable
        simpleSearch
        ref={tableRef}
        tableName="APP_REVIEW"
        rowKey="versionID"
        url={getBaseUrl({}, 'reviews')}
        parameters={queryParams}
        columns={columns}
        format={data => data}
        transformRequestParams={transformRequestParams}
        serverDataFormat={formatServerData}
        emptyOptions={{
          withoutTable: true,
          image: <Icon name="safeNotice" size={48} />,
          title: t('APP_REVIEW_UNPROCESSED_EMPTY_DESC'),
          description: t('APP_REVIEW_EMPTY_DESC'),
        }}
      />
      {/* TODO: handle ok or submit */}
      {visible && (
        <DetailDrawer
          visible={true}
          detail={selectedRow}
          onOk={handlePass}
          onCancel={onCancel}
          onReject={handlePass}
          showFooter={type === 'unprocessed'}
        />
      )}
    </>
  );
}

export default ReviewsTable;
