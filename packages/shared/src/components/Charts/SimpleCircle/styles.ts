/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Chart = styled.div`
  position: relative;
  padding: 0;
  background-color: transparent;
`;

export const Center = styled.div`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #242e42;
  font-weight: bold;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  animation: fadeIn 1.5s ease;
  p {
    white-space: nowrap;

    &.show-name {
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      color: #79879c;
      text-align: center;
    }

    strong {
      font-size: 24px;
    }

    span {
      margin: 0 2px;
    }
  }

  &.standard {
    font-size: 20px;
  }

  &.mid {
    font-size: 12px;

    strong {
      font-size: 15px;
    }
  }

  &.mini {
    transform: translate(-50%, -50%) scale(0.72);
  }

  &.white {
    color: #ffffff;

    strong {
      color: #ffffff;
    }
  }

  &.yellow {
    color: ${({ theme }) => theme.palette.colors.yellow[2]};

    strong {
      color: ${({ theme }) => theme.palette.colors.yellow[2]};
    }
  }

  &.red {
    color: ${({ theme }) => theme.palette.colors.red[2]};

    strong {
      color: ${({ theme }) => theme.palette.colors.red[2]};
    }
  }

  &.white {
    color: #ffffff;

    strong {
      color: #ffffff;
    }
  }

  &.yellow {
    color: ${({ theme }) => theme.palette.colors.yellow[2]};

    strong {
      color: ${({ theme }) => theme.palette.colors.yellow[2]};
    }
  }

  &.red {
    color: ${({ theme }) => theme.palette.colors.red[2]};

    strong {
      color: ${({ theme }) => theme.palette.colors.red[2]};
    }
  }
`;

export const TooltipWrapper = styled.div`
  width: auto;
  min-width: 120px;
  padding: 8px 12px;
  color: #ffffff;
  font-size: 12px;
  line-height: 1.67;
  border-radius: 4px;
  background-color: rgba(36, 46, 66, 0.8);
  box-shadow:
    0 6px 12px 0 rgba(2, 5, 8, 0.08),
    0 1px 2px 0 rgba(2, 5, 8, 0.08);
`;

export const Label = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
  white-space: nowrap;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 20px;

  i {
    width: 6px;
    height: 6px;
    margin-right: 7px;
    border-radius: 50%;
    background: #f9fbfd;
    overflow: hidden;
  }

  label {
    margin-right: 3px;
    white-space: nowrap;
  }

  p {
    white-space: nowrap;
  }
`;
