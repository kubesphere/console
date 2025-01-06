/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Tag, themeUtils } from '@kubed/components';

import { StepContentInnerWrapper } from '../shared.styles';

const { getColor } = themeUtils;

export const Root = styled(StepContentInnerWrapper)`
  overflow-y: auto;
  max-height: 376px;

  /* RadioGroup */
  & > div {
    flex-direction: column;
    row-gap: 8px;
  }

  .group-child {
    width: 100%;
    padding: 0;
  }

  /* Radio */
  .entity-main > div {
    flex: 1;
    padding: 0 0 0 24px;

    label {
      display: flex;
      /* align-items: center; */
      column-gap: 12px;
      flex: 1;
      padding: 12px 24px;
    }
  }
`;

export const RangeWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const MismatchTag = styled(Tag).attrs({ color: 'error', radius: 2 })`
  .tag-content {
    display: flex;
    align-items: center;
    column-gap: 2px;
    font-size: 12px;
  }

  svg.kubed-icon {
    color: #fff;
    fill: ${({ theme }) => getColor('red[4]', theme)};
  }
`;

export const RecommendedTagWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100px;
`;
