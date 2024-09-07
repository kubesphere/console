/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { css } from 'styled-components';

const fontFamily =
  "Roboto, 'PingFang SC', 'Lantinghei SC', 'Helvetica Neue', Helvetica, Arial, 'Microsoft YaHei', 微软雅黑, STHeitiSC-Light, simsun, 宋体, 'WenQuanYi Zen Hei', 'WenQuanYi Micro Hei', sans-serif";

const markdownStyles = css`
  .markdown-body {
    font-size: 12px;
    color: #242e42;
    line-height: 1.67;
    word-wrap: break-word;

    h2 {
      font-family: ${fontFamily};
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
    }

    h3 {
      font-family: ${fontFamily};
      font-size: 14px;
      font-weight: bold;
      line-height: 1.43;
      margin-bottom: 8px;
      margin-top: 20px;
    }

    h4 {
      font-family: ${fontFamily};
      font-size: 12px;
      font-weight: 600;
      line-height: 1.67;
      margin-bottom: 8px;
      margin-left: 12px;
    }

    ul {
      margin-bottom: 8px;
      margin-left: 12px;

      li {
        position: relative;
        margin-bottom: 8px;
        padding-left: 12px;

        &::before {
          content: '●';
          position: absolute;
          top: 2px;
          left: 0;
          color: #242e42;
          font-size: 8px;
        }
      }
    }

    code {
      display: block;
      padding: 0 8px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.palette.accents_2};
      margin-bottom: 8px;
      font-family: 'Monaco', sans-serif;
      font-size: 12px;
      line-height: 2;
      color: #4a5974;
      margin-left: 12px;
    }

    p {
      color: #79879c;

      a {
        color: #3391bf;
      }
    }

    table {
      overflow: auto;
      border-spacing: 0;
      border-collapse: collapse;
      max-width: 100%;

      th,
      td {
        padding: 4px;
        border: 1px solid #d0d7de;
      }
    }
  }
`;

export default markdownStyles;
