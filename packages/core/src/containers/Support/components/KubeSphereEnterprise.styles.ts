/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Card, Title as BaseTile } from './shared.styles';

export const Root = styled(Card)`
  border-radius: 4px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
`;

export const Link = styled.a`
  line-height: 20px;
  font-weight: 600;
  font-size: 14px;
  color: #329dce;

  &:hover {
    color: #3385b0;
  }

  &:active {
    color: #326e93;
  }
`;

export const Container = styled.div`
  overflow: hidden;
  display: flex;
`;

export const Content = styled.div`
  padding: 20px;
`;

export const Title = styled(BaseTile)`
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Description = styled.p`
  margin-top: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #79879c;
`;

export const Features = styled.div`
  overflow: hidden;
  display: flex;
  gap: 40px;
`;

export const Feature = styled.div`
  overflow: hidden;
  flex: 1 1 0;
`;

export const FeatureTitle = styled.h6`
  margin: 0;
  word-break: break-word;
  font-size: 14px;
  line-height: 28px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Background = styled.div`
  overflow: hidden;
  flex: none;
  width: 446px;
  background-image: url('/assets/support-kse.svg');
  background-repeat: no-repeat;
`;
