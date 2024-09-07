/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  padding-top: 40px;
`;

export const Title = styled.h5`
  padding-bottom: 12px;
  color: ${({ theme }) => theme.palette.accents_8};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
`;

export const Screenshots = styled.div`
  .slide-container {
    grid-column-gap: 12px;
  }

  .slide {
    flex: 0 0 calc((100% - 12px * 2) / 3);
  }

  .screenshot {
    display: block;
    width: 100%;
    height: 170px;
    border-radius: 4px;
    border: 1px solid #d8dee5;
    object-fit: scale-down;
    cursor: pointer;
  }
`;
