/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { Embed } from '../../Embed';
import { useParams } from 'react-router-dom';

export default function AlertPolicyDetail(props: { type?: string }) {
  const { name, tab = '' } = useParams<'name' | 'tab'>();
  const path = props.type ? `${props.type}/${name}/${tab}` : `${name}/${tab}`;
  return <Embed path={`alert-rules/${path}`} />;
}
