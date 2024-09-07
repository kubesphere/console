/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button } from '@kubed/components';

export const FeedbackRoot = styled.div`
  position: fixed;
  right: -16px;
  bottom: 112px;
  z-index: 999;
  transition: right 300ms ease;

  &:hover {
    right: 0;
  }
`;

export const FeedbackButton = styled(Button).attrs({ color: 'secondary' })`
  padding: 5px 20px 5px 7px;
  border-radius: 100px 0 0 100px;
`;

export const FeedbackContent = styled.div`
  position: fixed;
  padding: 8px 0;
  right: 8px;
  bottom: 136px;
  min-width: 260px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.2);
  overflow: hidden;
  z-index: 999;
`;

export const FeedbackList = styled.div`
  padding: 0 8px;
`;
export const FeedbackItem = styled.div`
  padding: 4px 12px;
  margin-bottom: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  &:last-child {
    margin-bottom: 8px;
  }
  &:hover {
    background: #eff4f9;
    > a {
      color: #242e42;
    }
  }
  & > a {
    flex: 1;
    padding: 4px 0;
    margin-left: 12px;
    font-weight: 600;
    line-height: 20px;
  }
`;
export const ContactWrapper = styled.div`
  border-top: 1px solid #e3e9ef;
  padding: 12px 8px 8px 8px;
`;
export const ContactContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 8px 32px;
  align-items: center;
  padding: 0 8px 0 12px;
  & > img {
    &:first-of-type {
      width: 64px;
      justify-self: center;
    }
    &:last-of-type {
      justify-self: center;
    }
  }
`;
export const ContactTitle = styled.div`
  margin-bottom: 8px;
  padding: 0 8px 0 12px;
  line-height: 20px;
  height: 20px;
`;

export const SlackButton = styled.a`
  width: 102px;
  border: 1px solid #ccd3db;
  padding: 6px 20px;
  border-radius: 16px;
  height: 32px;
  color: #36435c;
  font-weight: 600;
  transition: all 0.3s ease;
  justify-self: center;
  &:hover {
    color: #36435c;
    background: #e3e9ef;
  }
`;
