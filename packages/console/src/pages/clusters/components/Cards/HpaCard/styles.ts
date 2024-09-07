/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Card, Button } from '@kubed/components';

const StyledCard = styled(Card)`
  & > div {
    padding: 20px;
  }
`;

const StyledTitle = styled.div`
  position: relative;
  height: 20px;
  font-weight: 600;
  line-height: 1.43;
  margin-bottom: 20px;
  font-size: 14px;

  & > div {
    zoom: 1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    z-index: 10;

    &::after {
      content: '';
      display: block;
      clear: both;
      overflow: hidden;
      height: 0;
      visibility: hidden;
    }
  }
`;

const StyledButton = styled(Button)`
  border: none;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const CardItem = styled.div`
  width: 25%;
  padding: 0 10px;
`;

const ItemContent = styled.div`
  display: flex;
  height: 80px;
  padding: 20px;
  background-color: ${props => props.theme.palette.accents_0};
  border-radius: 4px;

  & > svg {
    min-width: 40px;
    margin-right: 20px;
  }

  & > div {
    width: calc(100% - 60px);
  }
`;

const ItemTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
`;

const ItemValue = styled.p`
  line-height: 1, 67;
  margin: 0px;
`;

export {
  StyledCard,
  StyledTitle,
  StyledButton,
  ContentWrapper,
  CardItem,
  ItemContent,
  ItemTitle,
  ItemValue,
};
