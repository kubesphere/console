import { Modal } from '@kubed/components';
import styled from 'styled-components';

export const ModalStyle = styled(Modal)`
  margin: 0;

  .kubed-modal-body {
    position: relative;
    padding-top: 180px;

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .form-item .input-wrapper,
  .form-item .kubed-select {
    max-width: 100%;
  }
  .kubed-select-selector .kubed-icon.kubed-icon__light {
    fill: rgb(182, 194, 205);
    color: rgb(50, 69, 88);
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 180px;
  padding: 50px 24px 50px 314px;
  background-color: #eff4f9;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 274px;
    height: 200px;
  }
`;

export const TitleWrapper = styled.div`
  & > div {
    font-family: Roboto, ${({ theme }) => theme.font.sans};
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    font-size: 20px;
    line-height: 1.4;
    font-weight: 600;
    color: #242e42;
  }

  & > p {
    font-family: Roboto, ${({ theme }) => theme.font.sans};
    font-style: normal;
    font-stretch: normal;
    letter-spacing: normal;
    margin-top: 12px;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.67;
    color: #79879c;
  }
`;

export const FlexBox = styled.div`
  display: grid;
  gap: 24px;
  row-gap: 0;
  grid-template-columns: repeat(2, 1fr);
`;

export const ClusterTitleWrapper = styled.div`
  display: inline-flex;
  gap: 12px;
  align-items: center;
`;

export const FormGroup = styled.div`
  margin-bottom: 12px;
  padding: 11px 16px;
  border-radius: 4px;
  border: solid 1px #ccd3db;
  background-color: #fff;
`;

export const FormGroupTitle = styled.div`
  font-weight: 600;
  color: #36435c;
`;
export const FormGroupDesc = styled.div`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #79879c;
`;

export const FormGroupContent = styled.div`
  padding: 12px;
  margin: 0 -8px;
  margin-top: 12px;
  border-radius: 4px;
  background-color: #f9fbfd;
`;

export const AdvancedButton = styled.span`
  cursor: pointer;
  font-weight: 600;
  color: #329dce;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const FormItemError = styled.div`
  margin-top: 4px;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #404e68;
  color: #ca2621;
`;
