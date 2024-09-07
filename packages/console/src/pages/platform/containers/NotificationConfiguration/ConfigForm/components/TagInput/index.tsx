/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { isEmpty } from 'lodash';
import { Tag } from '@kubed/components';

import AutoSuggest from './AutoSuggest';

import { FilterInputWrapper } from './styles';

type Props = {
  name: string;
  values: string[];
  placeholder: string;
  onChange?: (val: string[]) => void;
  onInputChange?: (value: string) => void;
};

function TagInput({ values = [], placeholder, onInputChange, onChange }: Props): JSX.Element {
  const autoSuggestRef = useRef<any>();

  function handleClick(): void {
    autoSuggestRef.current.focus();
  }

  function handleInputChange(value: string) {
    onInputChange?.(value);
  }

  function handleAdd(value: string): void {
    const newTags = [...values, value];

    onChange?.(newTags);
  }

  function handleDelete(): void {
    const newTags = values.slice(0, values.length - 1);

    onChange?.(newTags);
  }

  function handleCloseTag(value: string, index: number) {
    const newTags = values.filter((tag: string, i: number) => tag !== value && i !== index);

    onChange?.(newTags);
  }

  return (
    <FilterInputWrapper onClick={handleClick}>
      {values?.map((tag: string, index: number) => (
        <Tag
          closable
          className="tag"
          key={`${tag}-${index + 1}`}
          onClose={() => handleCloseTag(tag, index)}
        >
          {tag}
        </Tag>
      ))}
      <AutoSuggest
        ref={autoSuggestRef}
        className="autosuggest"
        onAdd={handleAdd}
        onDelete={handleDelete}
        onChange={handleInputChange}
        placeholder={isEmpty(values) ? placeholder : undefined}
      />
    </FilterInputWrapper>
  );
}

export default TagInput;
