/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { TitleStyle, WrapperStyle, PanelStyle, LoadingStyle, EmptyStyle } from './styles';

interface Props {
  className?: string;
  title?: string;
  loading?: boolean;
  children?: React.ReactNode;
  extras?: any;
}

export default function Panel(props: Props) {
  const { className, title, loading = false, children, extras } = props;

  const empty = <EmptyStyle>{t('NO_AVAILABLE_RESOURCE_VALUE', { resource: title })}</EmptyStyle>;

  return (
    <WrapperStyle
      data-test={`panel-${title ? title.toLowerCase().split(' ').join('-') : 'default'}`}
    >
      {title && <TitleStyle>{title}</TitleStyle>}
      <PanelStyle className={className}>
        {loading ? <LoadingStyle /> : <>{children || empty}</>}
      </PanelStyle>
      {extras}
    </WrapperStyle>
  );
}
