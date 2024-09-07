/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 50px 0 60px;
  text-align: center;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`;

export const TitleRowBrand = styled(TitleRow)`
  margin-left: -70px;
`;

export const TitleRowMarketplace = styled(TitleRow)`
  margin-right: -50px;
`;

export const Title = styled.h1`
  margin: 0;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  font-weight: 700;
  font-size: 90px;
  color: #060714;
  line-height: 100%;
`;

const TitleImage = styled.div`
  width: 32px;
  height: 60px;
  background-repeat: no-repeat;
`;

export const TitleImageBrand = styled(TitleImage)`
  background-image: url('/assets/extensions-out.svg');
`;

export const TitleImageMarketplace = styled(TitleImage)`
  background-image: url('/assets/extensions-in.svg');
`;
