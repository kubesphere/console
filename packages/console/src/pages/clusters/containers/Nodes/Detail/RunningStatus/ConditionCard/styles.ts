import styled from 'styled-components';
import { themeUtils } from '@kubed/components';
const { getColor } = themeUtils;
export const CardWapper = styled.div`
  display: inline-flex;
  padding: 12px;
  border-radius: 4px;
  background-color: #f9fbfd;
  & > div {
    position: relative;
    margin-right: 12px;
  }
`;
interface IconWapperPrps {
  type: string;
  theme: any;
}
export const IconWapper = styled('span')<IconWapperPrps>`
  display: inline-flex;
  background-color: ${({ type, theme }) => getColor(type, theme)};
  width: 12px;
  height: 12px;
  position: absolute;
  top: 28px;
  right: 0;
  border-radius: 50%;
`;
