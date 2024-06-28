import styled from 'styled-components';
import { Alert, Popover } from '@kubed/components';

export const StyledSelector = styled.div`
  position: relative;
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 8px;

  .message {
    display: flex;
  }

  p {
    padding: 0px;
    margin: 0px;
  }
`;

export const StyledPopover = styled(Popover)`
  background-color: #fff !important;
  border: 1px solid #d8dee5;
  max-width: none !important;

  .tippy-arrow {
    color: #fff !important;
  }

  .tippy-content {
    padding: 0px !important;
  }
`;
