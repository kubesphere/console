import React, { useState, useEffect } from 'react';
// import { Checkbox, Button } from '@kubed/components';

import PodItems, { Detail } from './PodItems';
import ResourceCard from '../ResourceCard';
// import { useCommonActions } from '../../../../../../hooks';
// import { PodsStore } from '../../../../../../stores';
import { EmptyTips } from '../styles';

type Props = {
  prefix?: string;
  detail: any[];
  params: Record<string, string>;
};

function PodWorkloads({ detail, params }: Props): JSX.Element | null {
  const prefix = `/clusters/${params.cluster}/projects/${params.namespace}`;
  const [selectItem, setSelectItem] = useState<any[]>([]);
  const [podData, setPodData] = useState<any>({});
  // function callback() {
  //   console.log(123);
  // }

  // const { del } = useCommonActions({
  //   store: PodsStore,
  //   params: { cluster, namespace },
  //   callback,
  // });

  const list = detail.map(item => ({
    ...item,
    module: item.kind,
    ...item.metadata,
    _originData: item,
  }));

  useEffect(() => {
    const podItems = list.filter(item => item.kind === 'Pod');
    const data = { key: 'Pod', value: podItems, prefix: 'pods' };
    setPodData(data);
  }, []);

  function handleWorkloadItem(item: Detail, key: string, check: boolean) {
    const val = selectItem?.filter(workload => workload.name !== item.name);
    if (check) {
      val.push(item);
    }
    setSelectItem(val);
  }

  // function handleSelectAll(e: any) {
  //   const checked = e.target.checked;
  //   if (checked) {
  //     setSelectItem(podData.value);
  //   } else {
  //     setSelectItem([]);
  //   }
  // }

  // function handleDeleteWorkload() {
  //   if (selectItem?.length) {
  //     del(selectItem.map(item => ({ ...item, cluster, namespace })));
  //   }
  // }

  // function renderTop() {
  //   return (
  //     <SelectAll>
  //       <Checkbox
  //         checked={podData.value?.length === selectItem?.length}
  //         onChange={handleSelectAll}
  //       />
  //       <Button color="error" disabled={!selectItem?.length} onClick={handleDeleteWorkload}>
  //         {t('DELETE')}
  //       </Button>
  //     </SelectAll>
  //   );
  // }

  function itemRender(item: any) {
    return (
      <PodItems
        selectItem={selectItem?.find(select => select.name === item.name)}
        setSelectItem={val => handleWorkloadItem(item, podData.key, !!val)}
        key={`${item.module}-${item.name}`}
        prefix={`${prefix}/${podData.prefix}`}
        detail={item}
      />
    );
  }
  if (!podData?.value?.length) return null;
  return (
    <ResourceCard
      key={podData.key}
      title={t('POD_SCAP')}
      // TODO 此处 yaml和heml 没有删除
      // renderTop={renderTop()}
      data={podData.value}
      emptyPlaceholder={
        <EmptyTips>{t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('WORKLOAD') })}</EmptyTips>
      }
      itemRender={item => itemRender(item)}
    />
  );
}

export default PodWorkloads;
