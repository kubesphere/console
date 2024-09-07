/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

import { Field } from '@kubed/components';

export const Header = styled.div`
  display: flex;
`;

export const HeaderField = styled(Field)`
  width: 260px;
  margin-right: 20px;
`;

export const HeaderNameField = styled(HeaderField)`
  max-width: 30%;
`;

export const Content = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 12px;
  margin-left: -12px;
  margin-right: -12px;
  background-color: ${({ theme }) => theme.palette.accents_0};
`;

export const ContentField = styled(Field)`
  flex: inherit;
  width: 250px;
  margin-right: 20px;
`;
