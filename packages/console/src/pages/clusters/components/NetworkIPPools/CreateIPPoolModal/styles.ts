import styled from 'styled-components';
import { ObjectInput } from '@ks-console/shared';

export const ObjectInputWrapper = styled(ObjectInput)`
  position: relative;
  padding: 6px 17px;
  border-radius: 60px;
  background-color: #eff4f9;
  border: solid 1px #ccd3db;

  & + .item {
    margin-top: 4px;
  }

  & > input {
    max-width: none !important;
  }
`;
