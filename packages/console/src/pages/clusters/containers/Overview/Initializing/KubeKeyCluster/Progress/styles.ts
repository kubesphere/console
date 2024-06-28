import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const Card = styled.div`
  padding: 12px;
  border-radius: 4px;
  background-color: #fff;
`;

export const Title = styled.div`
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${({ theme }) => theme.palette.colors.dark[3]};
`;

export const ProgressContent = styled.div`
  position: relative;
  padding: 20px 0 51px 0;
`;

export const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.palette.colors.white[3]};
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const ColorBar = styled.div`
  position: absolute;
  left: -1px;
  top: -1px;
  bottom: -1px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.colors.green[3]};
`;

export const DotsWrapper = styled.div`
  position: relative;
  margin: 0 60px;
`;

export const Dots = styled.div`
  position: absolute;
  top: -12px;
  transform: translateX(-50%);
  min-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${({ theme }) => theme.palette.colors.dark[3]};
`;

export const Circle = styled.div<{ checked?: boolean }>`
  position: relative;
  width: 16px;
  height: 16px;
  margin-bottom: 7px;
  border-radius: 50%;
  border: solid 1px;

  ${({ checked, theme }) =>
    checked
      ? `background-color: ${theme.palette.colors.green[3]};
      border-color: ${theme.palette.colors.green[4]};`
      : `background-color: ${theme.palette.accents_0};
      border-color: ${theme.palette.colors.white[3]};`}

  .kubed-icon {
    position: absolute;
    top: 0px;
    left: 0px;
    color: hsla(0, 0%, 100%, 0.9);
    fill: hsla(0, 0%, 100%, 0.4);
  }
`;
