/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { isEmpty, uniq } from 'lodash';
import { Tag, Text } from '@kubed/components';

import List from './List';
import BoxInput from './BoxInput';

import { EmptyTips, ListInputWrapper, TagsTitle, ValuesWrapper } from './styles';

type Props = {
  value?: string[];
  title?: string;
  text?: string;
  listTitle?: string;
  emptyDesc?: string;
  placeholder?: string;
  validator?: (data: string) => boolean;
  onChange?: (val: string[]) => void;
  mode?: 'tags' | 'items';
};

function Test({
  mode,
  value = [],
  title,
  listTitle,
  emptyDesc,
  text,
  validator,
  onChange,
}: Props): JSX.Element {
  function onAdd(newValue: string): void {
    onChange?.(uniq([...value, newValue]));
  }

  function onDelete(item: string): void {
    onChange?.(value.filter((val: string) => val !== item));
  }

  function renderValues() {
    if (mode === 'items') {
      return (
        <List
          className="mt12"
          items={value.map((val: string) => ({ title: val }))}
          onDelete={item => onDelete(item.title)}
        />
      );
    }

    return (
      <ValuesWrapper>
        {isEmpty(value) && emptyDesc ? (
          <EmptyTips>{emptyDesc}</EmptyTips>
        ) : (
          value.map((val: string) => {
            return (
              <Tag closable className="tag" key={val} onClose={() => onDelete(val)}>
                {val}
              </Tag>
            );
          })
        )}
      </ValuesWrapper>
    );
  }

  return (
    <ListInputWrapper>
      {text && <Text style={{ marginBottom: '4px' }}>{t('SLACK_CHANNEL')}</Text>}
      <BoxInput title={title} validate={validator} onAdd={onAdd} />
      {listTitle && <TagsTitle>{listTitle}</TagsTitle>}
      {renderValues()}
    </ListInputWrapper>
  );
}

export default Test;
