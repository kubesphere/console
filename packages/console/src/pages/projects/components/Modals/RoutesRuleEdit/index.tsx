/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { cloneDeep, get, isEmpty } from 'lodash';
import { Button, useForm } from '@kubed/components';
import RouteRules from '../../../../../components/Forms/Route/RouteRules';
import { Wrapper, ButtonWrapper } from './styles';
interface Props {
  detail: Record<string, any>;
  cluster?: string;
  namespace?: string;
  onOK?: any;
  onCancel?: any;
  closeModal?: any;
  isLoading?: boolean;
}

const getFormTemplate = (detail: Record<string, any>) => {
  const formTemplate = cloneDeep(detail);
  const tls = get(formTemplate, 'spec.tls', []);
  const rules = get(formTemplate, 'spec.rules', []);

  if (tls.length > 0 && rules.length > 0) {
    rules.forEach((rule: Record<string, any>) => {
      const tlsItem = tls.find(
        (item: Record<string, any>) => item.hosts && item.hosts.includes(rule.host),
      );
      if (tlsItem) {
        rule.protocol = 'https';
        rule.secretName = tlsItem.secretName;
      } else {
        rule.protocol = 'http';
      }
    });
  }
  return { Ingress: formTemplate };
};

const EditRoutesRule = ({ detail, cluster, namespace, onOK, onCancel, closeModal }: Props) => {
  const [formRef] = useForm();
  const [subRoute, setSubRoute] = useState<Record<string, any>>({});

  const [formTemplate] = useState(() => {
    return getFormTemplate(detail);
  });

  const registerSubRoute = (onSave: any, cancelFn: any) => {
    setSubRoute({ onSave, onCancel: cancelFn });
  };

  const resetSubRoute = () => {
    setSubRoute({});
  };

  const handleOk = async () => {
    if (subRoute.onSave) {
      subRoute.onSave();
      resetSubRoute();
      return;
    }

    const data = formRef.getFieldsValue(true);
    onOK?.(data);
    closeModal?.();
  };

  const handleCancel = () => {
    if (subRoute.onCancel) {
      subRoute.onCancel();

      return;
    }

    closeModal?.();
    onCancel?.();
  };

  return (
    <>
      <Wrapper>
        <RouteRules
          module="ingresses"
          cluster={cluster}
          namespace={namespace}
          formRef={formRef}
          formTemplate={formTemplate}
          resetSubRoute={resetSubRoute}
          registerSubRoute={registerSubRoute}
        />
      </Wrapper>
      <ButtonWrapper>
        <Button onClick={handleCancel}>{!isEmpty(subRoute) ? t('PREVIOUS') : t('Cancel')}</Button>
        <Button onClick={handleOk} shadow={true} color={'secondary'}>
          {t('OK')}
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default EditRoutesRule;
