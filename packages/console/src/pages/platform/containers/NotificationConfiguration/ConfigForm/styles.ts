/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

const horizonStyleStr = `
  display: flex;
  align-items: center;
  justify-content: space-between;

  .form-item-wrapper {
    flex: none;
    margin-bottom: 0;
  }
`;

export const Block = styled.div`
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
`;

export const Horizon = styled.div`
  ${horizonStyleStr}
`;

export const HorizonBlock = styled(Block)`
  ${horizonStyleStr}
`;

export const ItemWrapper = styled.div`
  padding: 12px;
  border: solid 1px ${({ theme }) => theme.palette.accents_2};
  border-radius: 4px;
  background: #fff;

  .condition-setting {
    display: inline-flex;
    max-width: 350px;

    .field-avatar {
      margin-top: -18px;
    }

    .field-value {
      cursor: pointer;
    }
  }
`;

export const Wrapper = styled.div`
  .title {
    font-size: 12px;
    font-weight: 600;
    margin: 8px 0;
  }

  .input-item {
    max-width: 455px;
  }
`;
