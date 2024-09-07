/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PathParams, StorageClassDetail, Text as _Text } from '@ks-console/shared';
import { Pen, Trash } from '@kubed/icons';
import { get, isNil } from 'lodash';
import * as React from 'react';
import styled from 'styled-components';
import StorageLinkResourceQuotaFormItems from './StorageLinkResourceQuotaFormItems';
import {
  ActionButton,
  Actions,
  Columns,
  ColumnsWithBg,
  Description,
  Card as _Card,
} from './styles';

const Text = styled(_Text)`
  & .text > div:last-child {
    font-weight: unset;
  }
`;

const Card = styled(_Card)<{ dashed?: boolean }>`
  ${Actions} {
    display: none;
  }

  ${({ dashed = false }) => (dashed ? 'border-style: dashed;' : '')}

  &:hover {
    box-shadow: 0 4px 8px rgba(36, 46, 66, 0.2);

    ${Actions} {
      display: flex;
    }
  }
`;

const Wrapper = styled.div`
  & > div {
    margin-bottom: 12px;
  }
  & > div:last-child {
    margin-bottom: 0;
  }
`;

interface ValueItem {
  persistentvolumeclaims?: string;
  'requests.storage'?: string;
}

interface StorageLinkResourceQuotaItemProps {
  detail: StorageClassDetail;
  onDelete: (name: string) => void;
  onEdit: (name: string) => void;
  value: ValueItem;
}
const StorageLinkResourceQuotaItem = (props: StorageLinkResourceQuotaItemProps) => {
  const { detail, value, onDelete, onEdit } = props;
  return (
    <Card clickable>
      <Columns>
        <Text
          icon={'database'}
          title={detail.name}
          description={<Description>{t('name')}</Description>}
          ellipsis
        />
        <Text ellipsis title={0} description={<Description>{t('VOLUME_COUNT')}</Description>} />
        <Columns $gap={0}>
          <Text
            ellipsis
            title={detail.provisioner}
            description={<Description>{t('PROVISIONER')}</Description>}
          />
          <Actions>
            <ActionButton
              onClick={() => {
                onDelete(detail.name);
              }}
            >
              <Trash />
            </ActionButton>
            <ActionButton
              onClick={() => {
                onEdit(detail.name);
              }}
            >
              <Pen />
            </ActionButton>
          </Actions>
        </Columns>
      </Columns>
      <ColumnsWithBg>
        <span>
          <Description>{t('STORAGE_LIMIT')}:</Description>{' '}
          {value['requests.storage'] ? `${value['requests.storage']}Gi` : t('NO_LIMIT')}
        </span>
        <span>
          <Description>{t('PVC_COUNT')}:</Description>{' '}
          {value.persistentvolumeclaims || t('NO_LIMIT')}
        </span>
      </ColumnsWithBg>
    </Card>
  );
};

interface AddItemProps {
  onClick: () => void;
}
const AddItem = (props: AddItemProps) => {
  return (
    <Card onClick={props.onClick} dashed>
      <Text
        title={t('SELECT_STORAGE_CLASS')}
        description={<Description>{t('SET_RELATED_STORAGE_CLASS_QUOTA')}</Description>}
      />
    </Card>
  );
};

interface StorageLinkResourceQuotaProps {
  value?: Record<string, ValueItem>;
  onChange?: (value: Record<string, ValueItem>) => void;
  storageClassList: StorageClassDetail[];
  params: PathParams;
  list?: StorageClassDetail[];
  workspaceLimitProps?: Record<string, any>;
}

const StorageLinkResourceQuota = (props: StorageLinkResourceQuotaProps) => {
  const { value: valueProp, storageClassList = [], params, workspaceLimitProps } = props;
  const [activeName, setactiveName] = React.useState<string>();
  const [values, setValues] = React.useState(valueProp);
  const valueRef = React.useRef(valueProp);

  React.useEffect(() => {
    if (values !== valueRef.current) {
      valueRef.current = values;
      props.onChange?.(values!);
    }
  }, [values]);

  React.useEffect(() => {
    if (valueProp !== valueRef.current) {
      valueRef.current = valueProp;
      setValues(valueProp);
    }
  }, [valueProp]);

  const handleAdd = () => {
    setactiveName('');
  };

  const handleClose = () => {
    setactiveName(undefined);
  };

  const selectedKeys = Object.keys(values || {});
  const selectedList: StorageClassDetail[] = [];
  const unselectedList: StorageClassDetail[] = [];
  storageClassList.forEach(i => {
    if (selectedKeys.includes(i.name)) {
      selectedList.push(i);
    } else {
      unselectedList.push(i);
    }
  });
  const activeItem = [selectedList.find(i => i.name === activeName)].filter(
    Boolean,
  ) as StorageClassDetail[];

  if (!isNil(activeName)) {
    return (
      <StorageLinkResourceQuotaFormItems
        storageClassList={activeItem.concat(unselectedList)}
        workspaceLimitProps={workspaceLimitProps}
        params={params}
        value={{
          ...get(values, activeName),
          name: activeName,
        }}
        onCancel={handleClose}
        onChange={(value: ValueItem & { name?: string }) => {
          let newValues = { ...values };
          delete newValues[activeName!];
          if (value.name) {
            newValues[value.name] = value;
          }
          setValues(newValues);
          handleClose();
        }}
      />
    );
  }

  const handleDelete = (name: string) => {
    const newValues = { ...values };
    delete newValues[name];
    setValues(newValues);
  };

  const renderList = () => {
    return selectedList.map(i => {
      return (
        <StorageLinkResourceQuotaItem
          key={i.name}
          detail={i}
          value={values?.[i.name]!}
          onDelete={handleDelete}
          onEdit={setactiveName}
        />
      );
    });
  };
  return (
    <Wrapper>
      {renderList()}
      <AddItem onClick={handleAdd} />
    </Wrapper>
  );
};

export default StorageLinkResourceQuota;
