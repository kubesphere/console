/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const FooterBtnWrapper = styled.div`
  padding-top: 12px;
  text-align: right;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  div {
    flex: 1;
  }
`;

export const BoxInputWrapper = styled.div`
  .title {
    font-size: 12px;
    line-height: 32px;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    font-weight: bold;
    color: ${({ theme }) => theme.palette.accents_8};
    margin-bottom: 0;
  }
`;

export const UrlInputWrapper = styled.div`
  .url-input-wrapper {
    max-width: 479px;

    div {
      margin: 0;
    }
  }

  .port {
    width: 100%;
    .kubed-in-handler-wrap {
      display: none;
    }
  }
`;

export const ListInputWrapper = styled.div`
  max-width: 455px;
`;

export const ValuesWrapper = styled.div`
  margin-top: 4px;
  padding: 12px 12px 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
  min-height: 80px;

  .tag {
    margin: 0 8px 4px 0;
  }
`;

export const TagsTitle = styled.p`
  margin: 8px 0 0 0;
`;

export const EmptyTips = styled.div`
  line-height: 56px;
  text-align: center;
  color: ${({ theme }) => theme.palette.accents_5};
`;
