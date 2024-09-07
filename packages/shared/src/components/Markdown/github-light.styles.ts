/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { css } from 'styled-components';

import { baseStyles } from './base.styles';

// https://github.com/sindresorhus/github-markdown-css
export const githubLightStyles = css`
  ${baseStyles}

  /*light*/

  .github-light-markdown-body {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    color: #1f2328;
    background-color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .github-light-markdown-body .octicon {
    display: inline-block;
    fill: currentColor;
    vertical-align: text-bottom;
  }

  .github-light-markdown-body h1:hover .anchor .octicon-link:before,
  .github-light-markdown-body h2:hover .anchor .octicon-link:before,
  .github-light-markdown-body h3:hover .anchor .octicon-link:before,
  .github-light-markdown-body h4:hover .anchor .octicon-link:before,
  .github-light-markdown-body h5:hover .anchor .octicon-link:before,
  .github-light-markdown-body h6:hover .anchor .octicon-link:before {
    width: 16px;
    height: 16px;
    content: ' ';
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
    mask-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' aria-hidden='true'><path fill-rule='evenodd' d='M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z'></path></svg>");
  }

  .github-light-markdown-body details,
  .github-light-markdown-body figcaption,
  .github-light-markdown-body figure {
    display: block;
  }

  .github-light-markdown-body summary {
    display: list-item;
  }

  .github-light-markdown-body [hidden] {
    display: none !important;
  }

  .github-light-markdown-body a {
    background-color: transparent;
    color: #0969da;
    text-decoration: none;
  }

  .github-light-markdown-body abbr[title] {
    border-bottom: none;
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }

  .github-light-markdown-body b,
  .github-light-markdown-body strong {
    font-weight: 600;
  }

  .github-light-markdown-body dfn {
    font-style: italic;
  }

  .github-light-markdown-body h1 {
    margin: 0.67em 0;
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid hsla(210, 18%, 87%, 1);
  }

  .github-light-markdown-body mark {
    background-color: #fff8c5;
    color: #1f2328;
  }

  .github-light-markdown-body small {
    font-size: 90%;
  }

  .github-light-markdown-body sub,
  .github-light-markdown-body sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  .github-light-markdown-body sub {
    bottom: -0.25em;
  }

  .github-light-markdown-body sup {
    top: -0.5em;
  }

  .github-light-markdown-body img {
    border-style: none;
    max-width: 100%;
    box-sizing: content-box;
    background-color: #ffffff;
  }

  .github-light-markdown-body code,
  .github-light-markdown-body kbd,
  .github-light-markdown-body pre,
  .github-light-markdown-body samp {
    font-family: monospace;
    font-size: 1em;
  }

  .github-light-markdown-body figure {
    margin: 1em 40px;
  }

  .github-light-markdown-body hr {
    box-sizing: content-box;
    overflow: hidden;
    background: transparent;
    border-bottom: 1px solid hsla(210, 18%, 87%, 1);
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #d0d7de;
    border: 0;
  }

  .github-light-markdown-body input {
    font: inherit;
    margin: 0;
    overflow: visible;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .github-light-markdown-body [type='button'],
  .github-light-markdown-body [type='reset'],
  .github-light-markdown-body [type='submit'] {
    -webkit-appearance: button;
    appearance: button;
  }

  .github-light-markdown-body [type='checkbox'],
  .github-light-markdown-body [type='radio'] {
    box-sizing: border-box;
    padding: 0;
  }

  .github-light-markdown-body [type='number']::-webkit-inner-spin-button,
  .github-light-markdown-body [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  .github-light-markdown-body [type='search']::-webkit-search-cancel-button,
  .github-light-markdown-body [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
    appearance: none;
  }

  .github-light-markdown-body ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  .github-light-markdown-body ::-webkit-file-upload-button {
    -webkit-appearance: button;
    appearance: button;
    font: inherit;
  }

  .github-light-markdown-body a:hover {
    text-decoration: underline;
  }

  .github-light-markdown-body ::placeholder {
    color: #6e7781;
    opacity: 1;
  }

  .github-light-markdown-body hr::before {
    display: table;
    content: '';
  }

  .github-light-markdown-body hr::after {
    display: table;
    clear: both;
    content: '';
  }

  .github-light-markdown-body table {
    border-spacing: 0;
    border-collapse: collapse;
    display: block;
    width: max-content;
    max-width: 100%;
    overflow: auto;
  }

  .github-light-markdown-body td,
  .github-light-markdown-body th {
    padding: 0;
  }

  .github-light-markdown-body details summary {
    cursor: pointer;
  }

  .github-light-markdown-body details:not([open]) > *:not(summary) {
    display: none !important;
  }

  .github-light-markdown-body a:focus,
  .github-light-markdown-body [role='button']:focus,
  .github-light-markdown-body input[type='radio']:focus,
  .github-light-markdown-body input[type='checkbox']:focus {
    outline: 2px solid #0969da;
    outline-offset: -2px;
    box-shadow: none;
  }

  .github-light-markdown-body a:focus:not(:focus-visible),
  .github-light-markdown-body [role='button']:focus:not(:focus-visible),
  .github-light-markdown-body input[type='radio']:focus:not(:focus-visible),
  .github-light-markdown-body input[type='checkbox']:focus:not(:focus-visible) {
    outline: solid 1px transparent;
  }

  .github-light-markdown-body a:focus-visible,
  .github-light-markdown-body [role='button']:focus-visible,
  .github-light-markdown-body input[type='radio']:focus-visible,
  .github-light-markdown-body input[type='checkbox']:focus-visible {
    outline: 2px solid #0969da;
    outline-offset: -2px;
    box-shadow: none;
  }

  .github-light-markdown-body a:not([class]):focus,
  .github-light-markdown-body a:not([class]):focus-visible,
  .github-light-markdown-body input[type='radio']:focus,
  .github-light-markdown-body input[type='radio']:focus-visible,
  .github-light-markdown-body input[type='checkbox']:focus,
  .github-light-markdown-body input[type='checkbox']:focus-visible {
    outline-offset: 0;
  }

  .github-light-markdown-body kbd {
    display: inline-block;
    padding: 3px 5px;
    font:
      11px ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    line-height: 10px;
    color: #1f2328;
    vertical-align: middle;
    background-color: #f6f8fa;
    border: solid 1px rgba(175, 184, 193, 0.2);
    border-bottom-color: rgba(175, 184, 193, 0.2);
    border-radius: 6px;
    box-shadow: inset 0 -1px 0 rgba(175, 184, 193, 0.2);
  }

  .github-light-markdown-body h1,
  .github-light-markdown-body h2,
  .github-light-markdown-body h3,
  .github-light-markdown-body h4,
  .github-light-markdown-body h5,
  .github-light-markdown-body h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  .github-light-markdown-body h2 {
    font-weight: 600;
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid hsla(210, 18%, 87%, 1);
  }

  .github-light-markdown-body h3 {
    font-weight: 600;
    font-size: 1.25em;
  }

  .github-light-markdown-body h4 {
    font-weight: 600;
    font-size: 1em;
  }

  .github-light-markdown-body h5 {
    font-weight: 600;
    font-size: 0.875em;
  }

  .github-light-markdown-body h6 {
    font-weight: 600;
    font-size: 0.85em;
    color: #656d76;
  }

  .github-light-markdown-body p {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .github-light-markdown-body blockquote {
    margin: 0;
    padding: 0 1em;
    color: #656d76;
    border-left: 0.25em solid #d0d7de;
  }

  .github-light-markdown-body ul,
  .github-light-markdown-body ol {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 2em;
  }

  .github-light-markdown-body ol ol,
  .github-light-markdown-body ul ol {
    list-style-type: lower-roman;
  }

  .github-light-markdown-body ul ul ol,
  .github-light-markdown-body ul ol ol,
  .github-light-markdown-body ol ul ol,
  .github-light-markdown-body ol ol ol {
    list-style-type: lower-alpha;
  }

  .github-light-markdown-body dd {
    margin-left: 0;
  }

  .github-light-markdown-body tt,
  .github-light-markdown-body code,
  .github-light-markdown-body samp {
    font-family:
      ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    font-size: 12px;
  }

  .github-light-markdown-body pre {
    margin-top: 0;
    margin-bottom: 0;
    font-family:
      ui-monospace,
      SFMono-Regular,
      SF Mono,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
    font-size: 12px;
    word-wrap: normal;
  }

  .github-light-markdown-body .octicon {
    display: inline-block;
    overflow: visible !important;
    vertical-align: text-bottom;
    fill: currentColor;
  }

  .github-light-markdown-body input::-webkit-outer-spin-button,
  .github-light-markdown-body input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
    appearance: none;
  }

  .github-light-markdown-body .mr-2 {
    margin-right: 8px !important;
  }

  .github-light-markdown-body::before {
    display: table;
    content: '';
  }

  .github-light-markdown-body::after {
    display: table;
    clear: both;
    content: '';
  }

  .github-light-markdown-body > *:first-child {
    margin-top: 0 !important;
  }

  .github-light-markdown-body > *:last-child {
    margin-bottom: 0 !important;
  }

  .github-light-markdown-body a:not([href]) {
    color: inherit;
    text-decoration: none;
  }

  .github-light-markdown-body .absent {
    color: #d1242f;
  }

  .github-light-markdown-body .anchor {
    float: left;
    padding-right: 4px;
    margin-left: -20px;
    line-height: 1;
  }

  .github-light-markdown-body .anchor:focus {
    outline: none;
  }

  .github-light-markdown-body p,
  .github-light-markdown-body blockquote,
  .github-light-markdown-body ul,
  .github-light-markdown-body ol,
  .github-light-markdown-body dl,
  .github-light-markdown-body table,
  .github-light-markdown-body pre,
  .github-light-markdown-body details {
    margin-top: 0;
    margin-bottom: 16px;
  }

  .github-light-markdown-body blockquote > :first-child {
    margin-top: 0;
  }

  .github-light-markdown-body blockquote > :last-child {
    margin-bottom: 0;
  }

  .github-light-markdown-body h1 .octicon-link,
  .github-light-markdown-body h2 .octicon-link,
  .github-light-markdown-body h3 .octicon-link,
  .github-light-markdown-body h4 .octicon-link,
  .github-light-markdown-body h5 .octicon-link,
  .github-light-markdown-body h6 .octicon-link {
    color: #1f2328;
    vertical-align: middle;
    visibility: hidden;
  }

  .github-light-markdown-body h1:hover .anchor,
  .github-light-markdown-body h2:hover .anchor,
  .github-light-markdown-body h3:hover .anchor,
  .github-light-markdown-body h4:hover .anchor,
  .github-light-markdown-body h5:hover .anchor,
  .github-light-markdown-body h6:hover .anchor {
    text-decoration: none;
  }

  .github-light-markdown-body h1:hover .anchor .octicon-link,
  .github-light-markdown-body h2:hover .anchor .octicon-link,
  .github-light-markdown-body h3:hover .anchor .octicon-link,
  .github-light-markdown-body h4:hover .anchor .octicon-link,
  .github-light-markdown-body h5:hover .anchor .octicon-link,
  .github-light-markdown-body h6:hover .anchor .octicon-link {
    visibility: visible;
  }

  .github-light-markdown-body h1 tt,
  .github-light-markdown-body h1 code,
  .github-light-markdown-body h2 tt,
  .github-light-markdown-body h2 code,
  .github-light-markdown-body h3 tt,
  .github-light-markdown-body h3 code,
  .github-light-markdown-body h4 tt,
  .github-light-markdown-body h4 code,
  .github-light-markdown-body h5 tt,
  .github-light-markdown-body h5 code,
  .github-light-markdown-body h6 tt,
  .github-light-markdown-body h6 code {
    padding: 0 0.2em;
    font-size: inherit;
  }

  .github-light-markdown-body summary h1,
  .github-light-markdown-body summary h2,
  .github-light-markdown-body summary h3,
  .github-light-markdown-body summary h4,
  .github-light-markdown-body summary h5,
  .github-light-markdown-body summary h6 {
    display: inline-block;
  }

  .github-light-markdown-body summary h1 .anchor,
  .github-light-markdown-body summary h2 .anchor,
  .github-light-markdown-body summary h3 .anchor,
  .github-light-markdown-body summary h4 .anchor,
  .github-light-markdown-body summary h5 .anchor,
  .github-light-markdown-body summary h6 .anchor {
    margin-left: -40px;
  }

  .github-light-markdown-body summary h1,
  .github-light-markdown-body summary h2 {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .github-light-markdown-body ul.no-list,
  .github-light-markdown-body ol.no-list {
    padding: 0;
    list-style-type: none;
  }

  .github-light-markdown-body ol[type='a s'] {
    list-style-type: lower-alpha;
  }

  .github-light-markdown-body ol[type='A s'] {
    list-style-type: upper-alpha;
  }

  .github-light-markdown-body ol[type='i s'] {
    list-style-type: lower-roman;
  }

  .github-light-markdown-body ol[type='I s'] {
    list-style-type: upper-roman;
  }

  .github-light-markdown-body ol[type='1'] {
    list-style-type: decimal;
  }

  .github-light-markdown-body div > ol:not([type]) {
    list-style-type: decimal;
  }

  .github-light-markdown-body ul ul,
  .github-light-markdown-body ul ol,
  .github-light-markdown-body ol ol,
  .github-light-markdown-body ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  .github-light-markdown-body li > p {
    margin-top: 16px;
  }

  .github-light-markdown-body li + li {
    margin-top: 0.25em;
  }

  .github-light-markdown-body dl {
    padding: 0;
  }

  .github-light-markdown-body dl dt {
    padding: 0;
    margin-top: 16px;
    font-size: 1em;
    font-style: italic;
    font-weight: 600;
  }

  .github-light-markdown-body dl dd {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .github-light-markdown-body table th {
    font-weight: 600;
  }

  .github-light-markdown-body table th,
  .github-light-markdown-body table td {
    padding: 6px 13px;
    border: 1px solid #d0d7de;
  }

  .github-light-markdown-body table td > :last-child {
    margin-bottom: 0;
  }

  .github-light-markdown-body table tr {
    background-color: #ffffff;
    border-top: 1px solid hsla(210, 18%, 87%, 1);
  }

  .github-light-markdown-body table tr:nth-child(2n) {
    background-color: #f6f8fa;
  }

  .github-light-markdown-body table img {
    background-color: transparent;
  }

  .github-light-markdown-body img[align='right'] {
    padding-left: 20px;
  }

  .github-light-markdown-body img[align='left'] {
    padding-right: 20px;
  }

  .github-light-markdown-body .emoji {
    max-width: none;
    vertical-align: text-top;
    background-color: transparent;
  }

  .github-light-markdown-body span.frame {
    display: block;
    overflow: hidden;
  }

  .github-light-markdown-body span.frame > span {
    display: block;
    float: left;
    width: auto;
    padding: 7px;
    margin: 13px 0 0;
    overflow: hidden;
    border: 1px solid #d0d7de;
  }

  .github-light-markdown-body span.frame span img {
    display: block;
    float: left;
  }

  .github-light-markdown-body span.frame span span {
    display: block;
    padding: 5px 0 0;
    clear: both;
    color: #1f2328;
  }

  .github-light-markdown-body span.align-center {
    display: block;
    overflow: hidden;
    clear: both;
  }

  .github-light-markdown-body span.align-center > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: center;
  }

  .github-light-markdown-body span.align-center span img {
    margin: 0 auto;
    text-align: center;
  }

  .github-light-markdown-body span.align-right {
    display: block;
    overflow: hidden;
    clear: both;
  }

  .github-light-markdown-body span.align-right > span {
    display: block;
    margin: 13px 0 0;
    overflow: hidden;
    text-align: right;
  }

  .github-light-markdown-body span.align-right span img {
    margin: 0;
    text-align: right;
  }

  .github-light-markdown-body span.float-left {
    display: block;
    float: left;
    margin-right: 13px;
    overflow: hidden;
  }

  .github-light-markdown-body span.float-left span {
    margin: 13px 0 0;
  }

  .github-light-markdown-body span.float-right {
    display: block;
    float: right;
    margin-left: 13px;
    overflow: hidden;
  }

  .github-light-markdown-body span.float-right > span {
    display: block;
    margin: 13px auto 0;
    overflow: hidden;
    text-align: right;
  }

  .github-light-markdown-body code,
  .github-light-markdown-body tt {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: rgba(175, 184, 193, 0.2);
    border-radius: 6px;
  }

  .github-light-markdown-body code br,
  .github-light-markdown-body tt br {
    display: none;
  }

  .github-light-markdown-body del code {
    text-decoration: inherit;
  }

  .github-light-markdown-body samp {
    font-size: 85%;
  }

  .github-light-markdown-body pre code {
    font-size: 100%;
  }

  .github-light-markdown-body pre > code {
    padding: 0;
    margin: 0;
    word-break: normal;
    white-space: pre;
    background: transparent;
    border: 0;
  }

  .github-light-markdown-body .highlight {
    margin-bottom: 16px;
  }

  .github-light-markdown-body .highlight pre {
    margin-bottom: 0;
    word-break: normal;
  }

  .github-light-markdown-body .highlight pre,
  .github-light-markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    color: #1f2328;
    background-color: #f6f8fa;
    border-radius: 6px;
  }

  .github-light-markdown-body pre code,
  .github-light-markdown-body pre tt {
    display: inline;
    max-width: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    line-height: inherit;
    word-wrap: normal;
    background-color: transparent;
    border: 0;
  }

  .github-light-markdown-body .csv-data td,
  .github-light-markdown-body .csv-data th {
    padding: 5px;
    overflow: hidden;
    font-size: 12px;
    line-height: 1;
    text-align: left;
    white-space: nowrap;
  }

  .github-light-markdown-body .csv-data .blob-num {
    padding: 10px 8px 9px;
    text-align: right;
    background: #ffffff;
    border: 0;
  }

  .github-light-markdown-body .csv-data tr {
    border-top: 0;
  }

  .github-light-markdown-body .csv-data th {
    font-weight: 600;
    background: #f6f8fa;
    border-top: 0;
  }

  .github-light-markdown-body [data-footnote-ref]::before {
    content: '[';
  }

  .github-light-markdown-body [data-footnote-ref]::after {
    content: ']';
  }

  .github-light-markdown-body .footnotes {
    font-size: 12px;
    color: #656d76;
    border-top: 1px solid #d0d7de;
  }

  .github-light-markdown-body .footnotes ol {
    padding-left: 16px;
  }

  .github-light-markdown-body .footnotes ol ul {
    display: inline-block;
    padding-left: 16px;
    margin-top: 16px;
  }

  .github-light-markdown-body .footnotes li {
    position: relative;
  }

  .github-light-markdown-body .footnotes li:target::before {
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -24px;
    pointer-events: none;
    content: '';
    border: 2px solid #0969da;
    border-radius: 6px;
  }

  .github-light-markdown-body .footnotes li:target {
    color: #1f2328;
  }

  .github-light-markdown-body .footnotes .data-footnote-backref g-emoji {
    font-family: monospace;
  }

  .github-light-markdown-body .pl-c {
    color: #57606a;
  }

  .github-light-markdown-body .pl-c1,
  .github-light-markdown-body .pl-s .pl-v {
    color: #0550ae;
  }

  .github-light-markdown-body .pl-e,
  .github-light-markdown-body .pl-en {
    color: #6639ba;
  }

  .github-light-markdown-body .pl-smi,
  .github-light-markdown-body .pl-s .pl-s1 {
    color: #24292f;
  }

  .github-light-markdown-body .pl-ent {
    color: #116329;
  }

  .github-light-markdown-body .pl-k {
    color: #cf222e;
  }

  .github-light-markdown-body .pl-s,
  .github-light-markdown-body .pl-pds,
  .github-light-markdown-body .pl-s .pl-pse .pl-s1,
  .github-light-markdown-body .pl-sr,
  .github-light-markdown-body .pl-sr .pl-cce,
  .github-light-markdown-body .pl-sr .pl-sre,
  .github-light-markdown-body .pl-sr .pl-sra {
    color: #0a3069;
  }

  .github-light-markdown-body .pl-v,
  .github-light-markdown-body .pl-smw {
    color: #953800;
  }

  .github-light-markdown-body .pl-bu {
    color: #82071e;
  }

  .github-light-markdown-body .pl-ii {
    color: #f6f8fa;
    background-color: #82071e;
  }

  .github-light-markdown-body .pl-c2 {
    color: #f6f8fa;
    background-color: #cf222e;
  }

  .github-light-markdown-body .pl-sr .pl-cce {
    font-weight: bold;
    color: #116329;
  }

  .github-light-markdown-body .pl-ml {
    color: #3b2300;
  }

  .github-light-markdown-body .pl-mh,
  .github-light-markdown-body .pl-mh .pl-en,
  .github-light-markdown-body .pl-ms {
    font-weight: bold;
    color: #0550ae;
  }

  .github-light-markdown-body .pl-mi {
    font-style: italic;
    color: #24292f;
  }

  .github-light-markdown-body .pl-mb {
    font-weight: bold;
    color: #24292f;
  }

  .github-light-markdown-body .pl-md {
    color: #82071e;
    background-color: #ffebe9;
  }

  .github-light-markdown-body .pl-mi1 {
    color: #116329;
    background-color: #dafbe1;
  }

  .github-light-markdown-body .pl-mc {
    color: #953800;
    background-color: #ffd8b5;
  }

  .github-light-markdown-body .pl-mi2 {
    color: #eaeef2;
    background-color: #0550ae;
  }

  .github-light-markdown-body .pl-mdr {
    font-weight: bold;
    color: #8250df;
  }

  .github-light-markdown-body .pl-ba {
    color: #57606a;
  }

  .github-light-markdown-body .pl-sg {
    color: #8c959f;
  }

  .github-light-markdown-body .pl-corl {
    text-decoration: underline;
    color: #0a3069;
  }

  .github-light-markdown-body g-emoji {
    display: inline-block;
    min-width: 1ch;
    font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 1em;
    font-style: normal !important;
    font-weight: 400;
    line-height: 1;
    vertical-align: -0.075em;
  }

  .github-light-markdown-body g-emoji img {
    width: 1em;
    height: 1em;
  }

  .github-light-markdown-body .task-list-item {
    list-style-type: none;
  }

  .github-light-markdown-body .task-list-item label {
    font-weight: 400;
  }

  .github-light-markdown-body .task-list-item.enabled label {
    cursor: pointer;
  }

  .github-light-markdown-body .task-list-item + .task-list-item {
    margin-top: 4px;
  }

  .github-light-markdown-body .task-list-item .handle {
    display: none;
  }

  .github-light-markdown-body .task-list-item-checkbox {
    margin: 0 0.2em 0.25em -1.4em;
    vertical-align: middle;
  }

  .github-light-markdown-body .contains-task-list:dir(rtl) .task-list-item-checkbox {
    margin: 0 -1.6em 0.25em 0.2em;
  }

  .github-light-markdown-body .contains-task-list {
    position: relative;
  }

  .github-light-markdown-body .contains-task-list:hover .task-list-item-convert-container,
  .github-light-markdown-body .contains-task-list:focus-within .task-list-item-convert-container {
    display: block;
    width: auto;
    height: 24px;
    overflow: visible;
    clip: auto;
  }

  .github-light-markdown-body ::-webkit-calendar-picker-indicator {
    filter: invert(50%);
  }

  .github-light-markdown-body .markdown-alert {
    padding: 8px 16px;
    margin-bottom: 16px;
    color: inherit;
    border-left: 0.25em solid #d0d7de;
  }

  .github-light-markdown-body .markdown-alert > :first-child {
    margin-top: 0;
  }

  .github-light-markdown-body .markdown-alert > :last-child {
    margin-bottom: 0;
  }

  .github-light-markdown-body .markdown-alert .markdown-alert-title {
    display: flex;
    font-weight: 500;
    align-items: center;
    line-height: 1;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-note {
    border-left-color: #0969da;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-note .markdown-alert-title {
    color: #0969da;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-important {
    border-left-color: #8250df;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-important .markdown-alert-title {
    color: #8250df;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-warning {
    border-left-color: #9a6700;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-warning .markdown-alert-title {
    color: #9a6700;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-tip {
    border-left-color: #1f883d;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-tip .markdown-alert-title {
    color: #1a7f37;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-caution {
    border-left-color: #cf222e;
  }

  .github-light-markdown-body .markdown-alert.markdown-alert-caution .markdown-alert-title {
    color: #d1242f;
  }
`;
