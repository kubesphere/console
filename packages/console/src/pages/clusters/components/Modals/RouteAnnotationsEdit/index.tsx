/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Form, FormItem } from '@kubed/components';
import { AnnotationsInput } from '@ks-console/shared';
import { StyledContent } from './styles';

const RouteAnnotationsEdit = ({
  formRef,
  formTemplate,
}: {
  formRef?: any;
  formTemplate: Record<string, any>;
}) => {
  const hiddenKeys = globals.config.preservedAnnotations;

  return (
    <StyledContent>
      <Form form={formRef} initialValues={formTemplate}>
        <FormItem name={['metadata', 'annotations']}>
          {({ value, onChange }) => (
            <AnnotationsInput
              hiddenKeys={hiddenKeys}
              addText={t('ADD')}
              value={value}
              onChange={onChange}
            />
          )}
        </FormItem>
      </Form>
    </StyledContent>
  );
};

export default RouteAnnotationsEdit;
