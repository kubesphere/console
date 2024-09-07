/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PropertiesInput } from '@ks-console/shared';
import { AutoComplete, Modal, Navs } from '@kubed/components';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .kubed-modal-close {
    display: none;
  }

  .kubed-modal-body {
    min-height: 476px;
    max-height: calc(100vh - 214px);
    overflow-y: auto;
  }
`;

const StyledNavs = styled(Navs)`
  .nav-item {
    width: 155px;
  }
`;

const Wrapper = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

const Content = styled.div`
  padding: 12px;
  background: ${({ theme }) => theme.palette.colors.white[0]};
  border-radius: 4px;
  margin-top: 14px;
`;

const Area = styled.div`
  padding: 12px;
  margin-bottom: 12px;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.palette.colors.white[3]};
  border-radius: 4px;
`;

const Tips = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: ${({ theme }) => theme.palette.colors.white[0]};
  border-radius: 4px;
  color: #363e4a;
`;

const LoadBalancer = styled.div`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  .kubed-select {
    width: 396px;
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  .kubed-icon {
    margin-right: 8px;
  }
`;

const PropertiesInputWrapper = styled(PropertiesInput)`
  background: ${({ theme }) => theme.palette.colors.white[0]};
  padding: 12px;
`;

const StyledAutoComplete = styled(AutoComplete)`
  width: 100%;
`;

export {
  StyledModal,
  StyledNavs,
  StyledAutoComplete,
  Wrapper,
  PropertiesInputWrapper,
  Content,
  Area,
  Tips,
  LoadBalancer,
  Option,
};
