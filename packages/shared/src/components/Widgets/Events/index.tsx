/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { joinSelector } from '../../../utils';
import { MODULE_KIND_MAP } from '../../../constants/common';
import { eventStore } from '../../../stores';

import EventsCard from '../../Base/Card/Events';

const { fetchList } = eventStore;

function Events<T extends Record<string, any>>({ detail, module }: { detail?: T; module: string }) {
  const { cluster } = useParams();
  const kind = MODULE_KIND_MAP[module];
  const { uid, name, namespace, _originData: originData = {} } = detail ?? ({} as T);

  const fields = {
    'involvedObject.name': name,
    'involvedObject.namespace': namespace,
    'involvedObject.kind': originData.kind || kind,
    'involvedObject.uid': uid,
  };

  const { data, isLoading } = useQuery(
    [module, 'event'],
    async () => {
      if (module === 'nodes') {
        fields['involvedObject.uid'] = name;
        const resultWithName = await fetchList({
          namespace,
          cluster,
          fieldSelector: joinSelector(fields),
        });

        if (resultWithName.data && resultWithName.data.length < 1) {
          fields['involvedObject.uid'] = uid;
          const resultWithUid = await fetchList({
            namespace,
            cluster,
            fieldSelector: joinSelector(fields),
          });
          return resultWithUid;
        }
        return resultWithName;
      } else {
        const result = await fetchList({
          namespace,
          cluster,
          fieldSelector: joinSelector(fields),
        });
        return result;
      }
    },

    {
      enabled: !!uid,
    },
  );

  return <EventsCard data={data?.data ?? []} loading={isLoading} />;
}

export default Events;
