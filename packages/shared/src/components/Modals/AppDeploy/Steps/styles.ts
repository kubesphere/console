import styled from 'styled-components';

export const StepWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 16px 24px;
  width: 1280px;

  & > div {
    font-family: ${({ theme }) => theme.font.sans};
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.67;
    letter-spacing: normal;

    & + div {
      position: relative;
      padding-left: 84px;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 16px;
        height: 1px;
        width: 52px;
        border-bottom: 1px dashed #c1c9d1;
      }
    }

    & > span {
      display: inline-block;
      vertical-align: middle;
    }
  }
`;

export const Indicator = styled.span`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 24px;
  box-sizing: border-box;

  &.pending {
    border: solid 2px ${({ theme }) => theme.palette.accents_4};
  }

  &.current,
  &.fullfill {
    background-color: ${({ theme }) => theme.palette.colors.green[2]};
  }

  &.current {
    box-shadow: 0 4px 8px 0 rgba(85, 188, 138, 0.2);
  }
`;
