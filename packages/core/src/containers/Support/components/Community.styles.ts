/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Card } from './shared.styles';

export { Title } from './shared.styles';

export const Root = styled(Card)`
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-image: url('/assets/support-open-about-bg.svg');
`;

export const Container = styled.div`
  padding: 20px;
`;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 12px;
  margin: 20px 0 0;
  user-select: none;
`;

export const ButtonText = styled.span`
  line-height: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.accents_8};
  font-size: 14px;
`;

export const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  height: 40px;
  background: #fff;
  border: 1px solid #eff4f9;
  border-radius: 100px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.palette.accents_8};
    box-shadow: 0 8px 16px rgba(36, 46, 66, 0.28);
    border: 1px solid $dark-color07;

    ${ButtonText} {
      color: #fff;
    }

    svg.kubed-icon {
      color: rgba(255, 255, 255, 0.9);
      fill: rgba(255, 255, 255, 0.4);
    }
  }
`;

export const LintText = styled.span`
  margin-left: 4px;
  line-height: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Link = styled.a`
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.palette.colors.blue[2]};

    ${LintText} {
      color: ${({ theme }) => theme.palette.colors.blue[2]};
    }
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 20px;
  background-color: #f9fbfd;

  ${Link} + ${Link} {
    margin-left: 12px;

    &::before {
      content: '|';
      color: #d8dee5;
      margin-right: 12px;
      vertical-align: middle;
    }
  }
`;
