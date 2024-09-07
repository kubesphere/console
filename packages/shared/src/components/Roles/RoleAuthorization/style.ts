/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Field, Modal, Tag } from '@kubed/components';

const FullScreenModal = styled(Modal)`
  position: relative;
  margin: 0;
  height: calc(100vh - 40px);
  .kubed-modal-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .kubed-modal-body {
      overflow-y: auto;
      padding: 20px;
      flex: 1;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 8px);
`;

const TitleWrapper = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #36435c;
`;

const TabsWrapper = styled.div`
  width: 266px;
  margin-right: 22px;
  height: 100%;
  .content {
    height: calc(100% - 28px);
    margin-top: 8px;
    padding: 12px;
    padding-right: 0;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.palette.accents_1};
    overflow: auto;
  }
`;

const Tab = styled.div`
  position: relative;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-bottom: 8px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.accents_0};
  }
  &.enabled {
    background-color: #fff;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  height: 100%;
  .content {
    height: calc(100% - 38px);
    margin-top: 18px;
    padding: 12px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.palette.accents_0};
    overflow: auto;
  }
`;

const CheckItemWrapper = styled.div`
  position: relative;
  padding: 8px 40px;
  margin-bottom: 8px;
  border-radius: 2px;
  border: solid 1px ${({ theme }) => theme.palette.border};
  background-color: #fff;
  transition: all 0.3s ease-in-out;
`;

const Dependencies = styled.div`
  margin-top: 8px;
  margin-left: -28px;
  padding: 12px;
  background-color: ${({ theme }) => theme.palette.accents_0};

  & > span + span {
    margin-left: 4px;
  }
`;

const TextField = styled(Field)`
  cursor: pointer;
  &:hover {
    .field-value,
    .field-label {
      color: ${({ theme }) => theme.palette.colors.green[2]};
    }
  }
`;

const CheckboxWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 12px;
`;

const StyledTag = styled(Tag)`
  margin-right: 4px;
`;

export {
  FullScreenModal,
  Wrapper,
  TitleWrapper,
  TabsWrapper,
  Tab,
  ContentWrapper,
  CheckItemWrapper,
  Dependencies,
  TextField,
  CheckboxWrapper,
  StyledTag,
};
