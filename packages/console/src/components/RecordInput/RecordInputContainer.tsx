/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Button } from '@kubed/components';
import { Trash } from '@kubed/icons';
import { isEmpty } from 'lodash';
import * as React from 'react';
import { Footer, HelperText, ContainerItem } from './styles';

interface Action {
  type: 'add' | 'delete' | 'change' | 'propsUpdate';
  list: Record<string, any>[];
}

const RecordInputContainer = ({
  children,
  list: listProps = [],
  onChange,
  mapItemPropsFromList,
  checkItemValid,
  validator,
  onError,
}: any) => {
  const [action, setAction] = React.useState<Action>({ type: 'propsUpdate', list: listProps });
  const { list } = action;
  const listRef = React.useRef(list);
  const validatorRef = React.useRef({
    valid: true,
    message: '',
    index: [] as number[],
  });

  React.useEffect(() => {
    if (list !== listRef.current) {
      listRef.current = list;
      validatorRef.current = validator?.(list) ?? { valid: true };
      onError?.(validatorRef.current);

      if (
        validatorRef.current.valid &&
        ['change', 'delete'].includes(action.type) &&
        list !== listProps
      ) {
        onChange?.(list);
      }
    }
  }, [list]);

  const isAddEnable = React.useMemo(() => {
    if (checkItemValid) {
      return list?.every(checkItemValid);
    }
    return list?.every(item => !isEmpty(item) && Object.values(item).every(_value => _value));
  }, [list, checkItemValid]);

  React.useEffect(() => {
    if (listProps !== listRef.current) {
      listRef.current = list;
      setAction({ type: 'propsUpdate', list: listProps });
    }
  }, [listProps]);

  const onDelete = React.useCallback(index => {
    setAction(({ list: list1 }) => {
      const newList = [...list1];

      newList.splice(index, 1);
      return {
        type: 'delete',
        list: newList,
      };
    });
  }, []);

  const onAdd = React.useCallback(() => {
    setAction(({ list: list1 }) => {
      const newList = [...list1];
      newList.push({});
      return {
        type: 'add',
        list: newList,
      };
    });
  }, []);

  const renderList = () => {
    return list.map((item, index) => {
      return (
        <ContainerItem key={index}>
          {React.cloneElement(children, {
            ...children.props,
            itemProps: mapItemPropsFromList?.({ list, item }),
            list: list,
            error: !validatorRef.current.valid && validatorRef.current.index.includes(index),
            onChange: (v: Record<string, any>) => {
              setAction(({ list: list1 }) => {
                const newList = [...list1];
                newList[index] = v;
                return {
                  list: newList,
                  type: 'change',
                };
              });
            },
            value: item,
          })}
          <Button type={'button'}>
            <Trash onClick={() => onDelete(index)} />
          </Button>
        </ContainerItem>
      );
    });
  };
  return (
    <div>
      {renderList()}
      <Footer>
        <HelperText>{!validatorRef.current?.valid ? validatorRef.current?.message : ''}</HelperText>
        <Button type={'button'} onClick={onAdd} disabled={!isAddEnable}>
          {t('Add')}
        </Button>
      </Footer>
    </div>
  );
};

export default RecordInputContainer;
