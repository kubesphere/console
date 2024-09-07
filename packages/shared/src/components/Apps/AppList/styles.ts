/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Field } from '@kubed/components';

const EllipsisSpan = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  padding: 50px 20px 20px;
`;

export const Title = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  color: ${({ theme }) => theme.palette.accents_7};
  font-weight: bold;
`;

export const LoadMore = styled.span`
  display: flex;
  padding: 0 20em 20px;
  color: ${({ theme }) => theme.palette.accents_5};
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.palette.colors.green[2]};
  }

  &:before,
  &:after {
    content: '';
    flex: 1;
    background: linear-gradient(transparent 50%, #ccc 50%, transparent 54%);
  }

  &:before {
    margin-right: 2em;
  }

  &:after {
    margin-left: 2em;
  }
`;

export const StyledEmpty = styled.div`
  flex: 1;
  text-align: center;
  padding: 32px 0;
  height: 226px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
`;

export const Desc = styled.div`
  width: 586px;
  margin: 0 auto;
  margin-top: 20px;
`;

export const AppsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding-bottom: 20px;
`;

const itemStyle = `
  width: 100%;
  vertical-align: top;
  cursor: pointer;
`;

export const AppItem = styled.div`
  ${itemStyle}
`;

export const StyledLink = styled(Link)`
  ${itemStyle}
`;

export const AppCardWrapper = styled.div`
  height: 152px;
  padding: 24px;
  border-radius: 4px;
  background-color: #ffffff;
  border: 1px solid transparent;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  vertical-align: top;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    border: 1px solid ${({ theme }) => theme.palette.accents_5};
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);

    .field-value,
    .title strong {
      color: ${({ theme }) => theme.palette.colors.green[2]};
    }
  }
`;

export const StyledField = styled(Field)`
  .field-avatar {
    width: 48px;
    line-height: 48px;
    flex-shrink: 0;
  }
`;

export const AppBaseInfo = styled.div`
  margin-top: 24px;
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const Vendor = styled(EllipsisSpan)`
  float: left;
  max-width: 140px;
`;

export const Version = styled(EllipsisSpan)`
  float: right;
  max-width: 120px;
`;

export const DefaultAvatar = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  border-radius: 4px;
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
`;

export const ImageAvatar = styled.img`
  width: 48px;
  height: 48px;
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
`;
