import styled from 'styled-components';
import { Field } from '@kubed/components';

export const BannerWrapper = styled.div`
  z-index: 10;
  height: 220px;
  background-color: ${({ theme }) => theme.palette.accents_9};
`;

export const Inner = styled.div`
  position: relative;
  height: 220px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 1024px;
  }

  @media (min-width: 1280px) {
    width: 1280px;
    .leftShape_1,
    .leftShape_2 {
      left: -50px;
    }
  }

  @media (min-width: 1420px) {
    .leftShape_1,
    .leftShape_2 {
      left: -50px;
    }
  }
`;

export const Content = styled.div`
  padding: 0 24px;
`;

const ShapeBox = styled.div`
  position: absolute;
  top: 68px;
`;

export const Shape = styled(ShapeBox)`
  opacity: 0.05;
  transition: all 0.5s ease-in-out;
`;

export const Shape1 = styled(Shape)`
  background: url('/assets/shape-1.svg') no-repeat;
  width: 245px;
  height: 189px;
  right: 352px;
`;

export const Shape2 = styled(Shape)`
  background: url('/assets/shape-3.svg') no-repeat;
  width: 147px;
  height: 84px;
  right: 47px;
  margin-top: -28px;
`;

export const Shape3 = styled(Shape)`
  background: url('/assets/shape-4.svg') no-repeat;
  width: 168px;
  height: 152px;
  right: 0;
`;

export const Shape4 = styled(Shape)`
  background: url('/assets/shape-2.svg') no-repeat;
  width: 245px;
  height: 189px;
  left: 0;
`;

export const LeftShape1 = styled(ShapeBox)`
  background: url('/assets/pop-cloud.svg') no-repeat;
  width: 232px;
  height: 192px;
  transform: translateY(-30px);
  left: 0;
`;

export const LeftShape2 = styled(ShapeBox)`
  background: url('/assets/support.svg') no-repeat;
  width: 269px;
  height: 244px;
  left: 0;
`;

export const AppOutLine = styled.div`
  position: absolute;
  top: 98px;
  overflow: hidden;
`;

export const BackLink = styled.div`
  display: inline-block;
  margin-bottom: 12px;
  height: 20px;
  color: #ffffff;
  cursor: pointer;

  svg {
    vertical-align: middle;
  }

  &:hover {
    color: #00aa72;

    svg {
      color: #00aa72;
      fill: #90e0c5;
    }
  }
`;

export const WhiteField = styled(Field)`
  .field-value,
  .field-label {
    color: #ffffff;
  }

  .field-value {
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgb(36 46 66 / 10%);
  }

  .field-label {
    margin-top: 8px;
    line-height: 20px;
    overflow: hidden;
    word-wrap: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .field-avatar {
    border-radius: 4px;
    width: 48px;
    line-height: 48px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.palette.accents_8};
    background-color: ${({ theme }) => theme.palette.accents_1};
  }
`;
