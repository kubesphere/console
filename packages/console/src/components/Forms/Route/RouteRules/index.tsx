/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState, useEffect } from 'react';
import { get, set, cloneDeep, omit } from 'lodash';
import { Constants } from '@ks-console/shared';
import { Form, FormItem } from '@kubed/components';
import { secretStore, serviceStore, joinSelector } from '@ks-console/shared';
import RuleList from './RuleList';
import RuleForm from './RuleForm';

const { MODULE_KIND_MAP } = Constants;

interface Props {
  module: string;
  formRef?: any;
  formTemplate?: Record<string, any>;
  cluster?: string;
  namespace?: string;
  selector?: any;
  isFederated?: boolean;
  projectDetail?: Record<string, any>;
  isLoading?: boolean;
  subRoute?: Record<string, any>;
  resetSubRoute?: any;
  registerSubRoute?: any;
}

const { fetchList: fetchSecretList } = secretStore;
const { fetchList: fetchServiceList } = serviceStore;

const updateTLS = (data: Record<string, any>) => {
  const rules = get(data, 'spec.rules', []);
  const tls = rules
    .filter((item: Record<string, any>) => item.protocol === 'https' && item.secretName)
    .reduce((prev: any[], cur: Record<string, any>) => {
      const { secretName, host, clusters } = cur;
      const item = prev.find(_item => _item.secretName === secretName);
      if (item) {
        item.hosts = item.hosts || [];
        if (item.hosts.indexOf(host) === -1) {
          item.hosts.push(host);
        }
      } else {
        prev.push({ hosts: [host], secretName, clusters });
      }

      return prev;
    }, []);

  set(data, 'spec.tls', tls);
};

const RouteRules = ({
  module,
  cluster,
  selector,
  formTemplate,
  formRef,
  isFederated,
  projectDetail,
  registerSubRoute,
  resetSubRoute,
}: Props) => {
  const [ingressData, setIngressData] = useState(() => {
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate);
  });
  const [fedFormTemplate, setFedFormTemplate] = useState(() => {
    return isFederated ? get(ingressData, 'spec.template') : ingressData;
  });
  const [secretList, setSecretList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [state, setState] = useState({
    showRule: false,
    selectRuleIndex: -1,
    gateway: {},
    oldTemplate: {},
    isLoading: false,
    operation: '',
    manualSetForm: false,
  });

  const namespace = useMemo(() => {
    return get(ingressData, 'metadata.namespace');
  }, [ingressData]);

  const fetchData = async () => {
    Promise.allSettled([
      fetchSecretList({
        namespace,
        cluster,
        limit: -1,
      }),
      fetchServiceList({
        namespace,
        cluster,
        limit: -1,
        labelSelector: joinSelector(selector),
      } as any),
    ]).then(([secretData, serviceData]) => {
      if (secretData.status === 'fulfilled') {
        setSecretList(secretData.value.data);
      }
      if (serviceData.status === 'fulfilled') {
        setServiceList(serviceData.value.data);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showRuleDetail = (index: number) => {
    setState({
      ...state,
      showRule: true,
      selectRuleIndex: index,
      operation: 'add',
    });
  };

  const handleEditRule = (index: number) => {
    setState({
      ...state,
      showRule: true,
      selectRuleIndex: index,
      operation: 'edit',
      oldTemplate: cloneDeep(fedFormTemplate),
    });
  };

  const updateOverrides = () => {
    const overrides: Record<string, any>[] = [];
    const rules = get(fedFormTemplate, 'spec.rules', []);
    const tls = get(fedFormTemplate, 'spec.tls', []);
    const clusters = get(projectDetail, 'clusters', []);

    clusters.forEach((innerCluster: Record<string, any>) => {
      const overrideData = (data: any[]) =>
        data
          .filter(item => item.clusters.includes(innerCluster.name))
          .map(item => omit(item, 'clusters'));

      overrides.push({
        clusterName: innerCluster.name,
        clusterOverrides: [
          {
            path: '/spec/rules',
            value: overrideData(rules),
          },
          {
            path: '/spec/tls',
            value: overrideData(tls),
          },
        ],
      });
    });

    setIngressData({
      ...ingressData,
      spec: {
        ...ingressData.spec,
        overrides,
      },
    });
  };

  const handleDeleteRule = (index: number) => {
    const innerTemplate = cloneDeep(fedFormTemplate);

    const rules = get(innerTemplate, 'spec.rules', []);

    rules.splice(index, 1);

    set(innerTemplate, 'spec.rules', rules);

    updateTLS(innerTemplate);

    if (isFederated) {
      updateOverrides();
    }

    setFedFormTemplate(innerTemplate);

    setState({
      ...state,
      manualSetForm: true,
      showRule: false,
      selectRuleIndex: -1,
      operation: '',
    });
  };

  const handleSaveEditResult = (result: Record<string, any>) => {
    const { selectRuleIndex } = state;
    const innerTemplate = cloneDeep(fedFormTemplate);
    const rules = get(innerTemplate, 'spec.rules', []);

    if (selectRuleIndex >= 0) {
      rules[selectRuleIndex] = result;
    } else {
      rules.push(result);
    }

    set(innerTemplate, 'spec.rules', rules);

    updateTLS(innerTemplate);

    if (isFederated) {
      updateOverrides();
    }

    setFedFormTemplate(innerTemplate);

    setState({
      ...state,
      manualSetForm: true,
      showRule: false,
      selectRuleIndex: -1,
      operation: '',
    });
  };

  const handleExitDetailForm = () => {
    if (state.operation === 'edit') {
      const { oldTemplate } = state;
      set(fedFormTemplate, 'spec', get(oldTemplate, 'spec'));

      if (isFederated) {
        updateOverrides();
      }
    }

    setState({ ...state, showRule: false, selectRuleIndex: -1, operation: '' });
  };

  const renderRuleForm = (selectedIndex: number) => {
    const data = get(fedFormTemplate, `spec.rules[${selectedIndex}]`, {});

    return (
      <RuleForm
        data={data}
        namespace={namespace}
        secrets={secretList}
        services={serviceList}
        isFederated={isFederated}
        projectDetail={projectDetail}
        registerSubRoute={registerSubRoute}
        resetSubRoute={resetSubRoute}
        onSave={handleSaveEditResult}
        onCancel={handleExitDetailForm}
      />
    );
  };

  const renderList = () => {
    if (state.manualSetForm) {
      formRef.setFieldsValue({
        spec: cloneDeep(fedFormTemplate.spec),
      });
      setState({ ...state, manualSetForm: false });
    }

    return (
      <Form initialValues={fedFormTemplate} form={formRef}>
        <FormItem name={['spec', 'rules']}>
          <RuleList
            formData={fedFormTemplate}
            projectDetail={projectDetail}
            onShow={showRuleDetail}
            onEdit={handleEditRule}
            onDelete={handleDeleteRule}
          />
        </FormItem>
      </Form>
    );
  };

  return !state.showRule ? renderList() : renderRuleForm(state.selectRuleIndex);
};

export default RouteRules;
