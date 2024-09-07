/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { get } from 'lodash';
import { Field, FormItem, Input, InputNumber, Textarea } from '@kubed/components';

import { useCacheStore as useStore } from '../../../../../index';
import SchemaFormSliderItem from './SchemaSlider';
import { generateMarks } from '../../../../../utils';

type Props = {
  propObj: Record<string, any>;
  propPath: string[];
};

function SchemaItem({ propObj, propPath }: Props): JSX.Element {
  const [value] = useStore<any>('valuesJSON');
  const defaultValue = useMemo(() => get(value, propPath), [value, propPath]);

  function renderContent() {
    switch (propObj.type) {
      case 'string':
        if (propObj.render === 'slider') {
          const min = propObj.sliderMin ?? 0;
          const maxNum = Number(propObj.sliderMax);
          const max = !isNaN(maxNum) ? (maxNum < min ? min + 100 : maxNum) : 100;
          const marks = generateMarks(min, max).map((mark: number) => ({
            label: mark,
            value: mark,
          }));

          return (
            <SchemaFormSliderItem min={min} max={max} marks={marks} unit={propObj.sliderUnit} />
          );
        } else if (propObj.render === 'textArea') {
          return <Textarea defaultValue={defaultValue} />;
        } else {
          return <Input defaultValue={defaultValue} />;
        }
      case 'integer':
        return <InputNumber defaultValue={defaultValue} min={0} integer="true" />;
      case 'boolean':
        return (
          <div className="boolean">
            {/* TODO: show Toggle component */}
            {/* <Toggle defaultChecked={get(value, propPath, false)} /> */}
            <Field label={propObj.title} value={propObj.description} />
          </div>
        );
      case 'array':
        return <>todo</>;
      default:
        return <></>;
    }
  }

  return (
    <FormItem
      name={propPath}
      label={propObj.type === 'boolean' ? '' : propObj.title}
      help={propObj.type === 'boolean' ? '' : propObj.description}
    >
      {renderContent()}
    </FormItem>
  );
}

export default SchemaItem;
