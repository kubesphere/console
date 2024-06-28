import styled from 'styled-components';
import { Card, Empty } from '@kubed/components';

export const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: normal;

  label {
    margin-right: 20px;
  }
`;

export const Operations = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 28px;
  right: 28px;
  z-index: 2;
  height: 32px;
  padding: 6px 10px;
  color: #fff;
  border-radius: 16px;
  background-color: #36435c;

  .kubed-icon {
    cursor: pointer;
    opacity: 0.6;

    &:hover {
      opacity: 1;
      background-color: transparent;
    }

    &:focus {
      border: none;
      outline: none;
    }
  }
`;

export const SplitLine = styled.span`
  margin: 0 8px;
`;

export const LoadingWrapper = styled.div`
  height: 20px;
  text-align: center;
`;

export const MoreWrapper = styled.div`
  color: #b7c4d1;
  cursor: pointer;
`;

export const EmptyWrapper = styled(Empty)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 40px 0;
  position: absolute;
  .empty-title {
    margin-top: 30px;
  }
`;

export const ContentCard = styled(Card)`
  height: 100%;
`;
