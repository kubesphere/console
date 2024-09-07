/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';
import { Button, Dropzone, Modal, Text } from '@kubed/components';

import { Image } from '@ks-console/shared';

export const StyledModal = styled(Modal)`
  padding: 0;

  .kubed-modal-body {
    display: flex;
    padding: 20px;
    height: 810px;
    overflow-x: hidden;
  }
`;

export const BaseEditWrapper = styled.div`
  max-width: 487px;
  min-width: 487px;
  padding: 0 20px 0 12px;
`;

export const OthersEditWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  .for-container {
    flex: 1;
    box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
    border-color: ${({ theme }) => theme.palette.border};
    border-radius: 4px;

    .for-toolbar {
      border-color: ${({ theme }) => theme.palette.border};
      font-weight: bold;
      font-size: 16px;
      background-color: ${({ theme }) => theme.palette.accents_1};
      border-radius: 4px 4px 0 0;

      ul > li {
        color: ${({ theme }) => theme.palette.accents_7};
        &:hover {
          background-color: ${({ theme }) => theme.palette.accents_2};
        }

        &.for-active {
          background-color: #d8dee5;
        }
      }
    }

    .for-editor {
      color: ${({ theme }) => theme.palette.accents_7};
      border-radius: 0 0 4px 4px;

      .for-editor-edit {
        .for-line-num {
          width: 46px;
          padding: 12px 0;
          line-height: 24px;
          background-color: ${({ theme }) => theme.palette.accents_1};
          color: ${({ theme }) => theme.palette.colors.dark[0]};
          border-right: 1px solid ${({ theme }) => theme.palette.border};
        }

        .for-editor-content {
          margin: 0 16px;
        }

        textarea {
          padding: 12px 0;
          line-height: 24px;
          font-size: 12px;
        }

        .for-editor-block {
          height: 100%;
        }
      }
    }

    .for-markdown-preview {
      img {
        display: initial;
      }
    }
  }

  .for-fullscreen {
    width: 100%;
    border: none;
    border-radius: 0;

    .for-toolbar {
      border-radius: 0;
    }

    .for-editor {
      border-radius: 0;
    }
  }
`;

export const H5Text = styled(Text).attrs(() => ({ variant: 'h5' }))`
  margin-bottom: 12px;
`;

export const TextArea = styled.textarea`
  padding: 6px 12px;
  width: 100%;
  max-width: 455px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.accents_4};
  font-weight: 600;
  color: ${({ theme }) => theme.palette.accents_7};
`;

export const Wrapper = styled.div`
  margin-bottom: 30px;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_1};
  overflow: hidden;
`;

export const ScreenShotsWrapper = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(5, 160px);
`;

export const ImgWrapper = styled.div`
  position: relative;
  width: 160px;
  height: 90px;
  line-height: 90px;
  background-color: #ffffff;

  &:hover {
    .img-mask {
      display: block;
    }
  }
`;

export const ImagePlaceholder = styled(Image)`
  max-height: 90px;
`;

export const ImageMask = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(24, 29, 40, 0.8);
  color: #ffffff;
`;

export const ImgDelete = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

export const ImgUpload = styled(Dropzone)`
  width: 160px;
  height: 90px;
  background-color: #ffffff;
  line-height: 90px;
  text-align: center;
  border-width: 1px;
`;

export const HelpWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

export const HelpDesc = styled.span`
  color: ${({ theme }) => theme.palette.accents_5};
`;

export const ErrorTips = styled.span`
  padding: 8px 0;
  color: ${({ theme }) => theme.palette.colors.red[2]};
`;

export const DeleteShots = styled(Button)`
  padding: 0;
  height: auto;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.colors.blue[2]};
`;
