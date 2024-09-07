/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Root = styled.div`
  background-color: #fff;
`;

export const DescriptionWrapper = styled.div`
  background-repeat: no-repeat;
  background-position: left top;
  background-size: auto 100%;
  background-image: url('/assets/about-bg.svg');
  background-color: ${({ theme }) => theme.palette.accents_0};
  padding: 24px 20px 24px 24px;
`;

export const Logo = styled.img`
  width: 200px;
  height: 40px;
  margin-bottom: 12px;
`;

export const Description = styled.p`
  margin-top: 0;
  margin-bottom: 12px;
  font-family: $font-family-id;
  font-size: $size-small;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const Links = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
  padding: 20px 20px 20px 24px;

  span + span {
    margin-left: 12px;

    &:before {
      content: '|';
      color: #d8dee5;
      margin-right: 12px;
      vertical-align: middle;
    }
  }

  a {
    display: inline-block;
    line-height: 20px;
    vertical-align: middle;

    img {
      margin-right: 4px;
    }

    strong,
    img {
      vertical-align: middle;
    }
  }
`;
