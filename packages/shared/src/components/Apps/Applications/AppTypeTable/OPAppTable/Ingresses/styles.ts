/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button } from '@kubed/components';

export const AccessButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 6px;
  transform: translateY(-50%);
  & span {
    color: #242e42 !important;
  }
`;

export const RulesWrapper = styled.ul`
  & > li {
    position: relative;
    padding: 11px 20px;
    border-radius: 22px;
    background-color: ${({ theme }) => theme.palette.background};
    border: solid 1px ${({ theme }) => theme.palette.border};
    font-family: Robot, ${({ theme }) => theme.font.sans};
    line-height: 20px;

    & + li {
      margin-top: 8px;
    }
  }
`;

export const EmptyTips = styled.div`
  padding: 20px;
  color: ${({ theme }) => theme.palette.accents_4};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  background-color: ${({ theme }) => theme.palette.accents_0};
  border-radius: 4px;
`;

export const CardWrapper = styled.div`
  padding: 20px;
  border-radius: 4px;
  background-color: #f9fbfd;
  transition: all 0.3s ease-in-out;

  & + & {
    margin-top: 8px;
  }
`;

export const Content = styled.div`
  position: relative;
  margin-bottom: 12px;

  & > svg {
    vertical-align: middle;
  }
`;

export const Title = styled.div`
  display: inline-block;
  margin-left: 20px;
  margin-right: 20px;
  font-weight: 600;
  line-height: 1.43;
  color: #242e42;
  vertical-align: middle;

  & > div {
    font-size: 12px;
    color: #79879c;
    font-weight: 400;

    span + span {
      margin-left: 100px;
    }
  }
`;
export const Tip = styled.div`
  position: absolute;
  top: 24px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const Path = styled.div`
  position: relative;
  padding: 12px 20px;
  border-radius: 22px;
  background-color: #eff4f9;
  border: solid 1px #ccd3db;

  & + & {
    margin-top: 8px;
  }

  span {
    text-align: left;
    color: #79879c;

    strong {
      line-height: 1.43;
      color: #242e42;
    }
  }
`;
