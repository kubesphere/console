import styled from 'styled-components';
import { Helm } from '@kubed/icons';
import { Modal } from '@kubed/components';

export const StyledModal = styled(Modal)`
  .kubed-modal-body {
    width: 740px;
    margin: 16px auto 12px;
  }
`;

export const IconHelm = styled(Helm)`
  display: block;
  margin: 0 auto;
`;

export const CheckFilesWrapper = styled.ul`
  position: relative;
  width: 740px;
  margin: 0 auto;
  padding: 12px;
  color: ${({ theme }) => theme.palette.accents_8};
  background-color: ${({ theme }) => theme.palette.accents_0};

  .error {
    color: ${({ theme }) => theme.palette.colors.red[2]};
  }
`;

export const FileItem = styled.li`
  display: flex;
  padding: 6px 12px;
  background-color: #ffffff;
`;

export const Title = styled.span`
  min-width: 160px;
  color: ${({ theme }) => theme.palette.accents_6};
`;

export const Desc = styled.div`
  margin-left: 12px;
`;

export const DescOption = styled.span`
  margin-right: 12px;
`;

export const ConfigMask = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-image: linear-gradient(180deg, rgba(249, 250, 251, 0.75), #ffffff);
`;
