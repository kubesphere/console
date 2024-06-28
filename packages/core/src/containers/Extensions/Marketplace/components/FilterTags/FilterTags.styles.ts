import styled from 'styled-components';
import { themeUtils, Tag } from '@kubed/components';

const { getColor } = themeUtils;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 12px;
`;

export const StyledTag = styled(Tag)`
  max-width: 120px;
  padding: 2px 8px 2px 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.accents_8};
`;

export const LinkButton = styled.a`
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => getColor('blue', theme)};
`;
