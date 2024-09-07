/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { get, set } from 'lodash';
import { useModal, useForm, notify } from '@kubed/components';
import { RouteAnnotationsEdit } from '../components/Modals';

const useRoutesAnnotations = ({ store, callback }: { store: any; callback: any }) => {
  const modal = useModal();
  const [form] = useForm();

  const editAnnotations = ({ detail }: { detail: Record<string, any> }) => {
    const formTemplate = detail._originData;
    const annotations = get(formTemplate, 'metadata.annotations', {});
    const hiddenKeys = globals.config.preservedAnnotations;
    const needPreserveData = Object.entries(annotations).filter(([k]) =>
      hiddenKeys.some((hiddenKey: string) => new RegExp(hiddenKey).test(k)),
    );

    const modalId = modal.open({
      title: t('EDIT_ANNOTATIONS'),
      width: 960,
      content: <RouteAnnotationsEdit formRef={form} formTemplate={formTemplate} />,
      onAsyncOk: async () => {
        const data = form.getFieldsValue(true);
        needPreserveData.map(([k, v]) => {
          set(data, `metadata.annotations["${k}"]`, v);
        });
        await store.put(detail, data);
        notify.success(t('UPDATE_SUCCESSFUL'));
        modal.close(modalId);
        callback?.();
      },
      onCancel: () => {
        modal.close(modalId);
      },
    });
  };

  return { editAnnotations };
};

export default useRoutesAnnotations;
