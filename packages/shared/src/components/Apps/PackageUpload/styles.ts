/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button, Dropzone, Field } from '@kubed/components';

export const StyledDropzone = styled(Dropzone)`
  position: relative;
  border: none;
  padding: 0;
  margin: 12px 0;

  .hide {
    display: none;
  }
`;

export const UploadBox = styled.div`
  padding: 12px;
  border-radius: 4px;
  border: 1px dashed ${({ theme }) => theme.palette.border};
`;

export const UploadField = styled(Field)`
  padding: 12px;
  border-radius: 4px;
  border: 1px dashed ${({ theme }) => theme.palette.border};
`;

export const StatusAvatar = styled.span`
  position: relative;
  font-size: 40px;
  line-height: 40px;

  .icon {
    position: absolute;
    bottom: -2px;
    right: -6px;
    z-index: 2;

    color: #ffffff;
  }

  .success {
    fill: ${({ theme }) => theme.palette.colors.green[2]};
  }

  .error {
    fill: ${({ theme }) => theme.palette.colors.red[2]};
  }
`;

export const ReUpload = styled.div`
  margin: 12px 0;
  text-align: right;

  label {
    color: ${({ theme }) => theme.palette.colors.blue[2]};
  }
`;

export const DownLoadBtn = styled(Button)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 12px;
`;

export const EditLabel = styled.label`
  color: ${({ theme }) => theme.palette.colors.blue[2]};
`;
