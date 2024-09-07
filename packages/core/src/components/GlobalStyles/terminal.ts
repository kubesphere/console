/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { css } from 'styled-components';

const terminalStyles = css`
  .xterm {
    cursor: text;
    position: relative;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  .xterm.focus,
  .xterm:focus {
    outline: none;
  }

  .xterm .xterm-helpers {
    position: absolute;
    top: 0;
    /**
     * The z-index of the helpers must be higher than the canvases in order for
     * IMEs to appear on top.
     */
    z-index: 5;
  }

  .xterm .xterm-helper-textarea {
    padding: 0;
    border: 0;
    margin: 0;
    /* Move textarea out of the screen to the far left, so that the cursor is not visible */
    position: absolute;
    opacity: 0;
    left: -9999em;
    top: 0;
    width: 0;
    height: 0;
    z-index: -5;
    /** Prevent wrapping so the IME appears against the textarea at the correct position */
    white-space: nowrap;
    overflow: hidden;
    resize: none;
  }

  .xterm .composition-view {
    /* TODO: Composition position got messed up somewhere */
    background: #000;
    color: #fff;
    display: none;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
  }

  .xterm .composition-view.active {
    display: block;
  }

  .xterm .xterm-viewport {
    /* On OS X this is required in order for the scroll bar to appear fully opaque */
    background-color: #000;
    overflow-y: scroll;
    cursor: default;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .xterm .xterm-screen {
    position: relative;
  }

  .xterm .xterm-screen canvas {
    position: absolute;
    left: 0;
    top: 0;
  }

  .xterm .xterm-scroll-area {
    visibility: hidden;
  }

  .xterm-char-measure-element {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: -9999em;
    line-height: normal;
  }

  .xterm.enable-mouse-events {
    /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
    cursor: default;
  }

  .xterm.xterm-cursor-pointer,
  .xterm .xterm-cursor-pointer {
    cursor: pointer;
  }

  .xterm.column-select.focus {
    /* Column selection mode */
    cursor: crosshair;
  }

  .xterm .xterm-accessibility,
  .xterm .xterm-message {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    color: transparent;
  }

  .xterm .live-region {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .xterm-dim {
    opacity: 0.5;
  }

  .xterm-underline-1 {
    text-decoration: underline;
  }

  .xterm-underline-2 {
    text-decoration: double underline;
  }

  .xterm-underline-3 {
    text-decoration: wavy underline;
  }

  .xterm-underline-4 {
    text-decoration: dotted underline;
  }

  .xterm-underline-5 {
    text-decoration: dashed underline;
  }

  .xterm-strikethrough {
    text-decoration: line-through;
  }

  .xterm-screen .xterm-decoration-container .xterm-decoration {
    z-index: 6;
    position: absolute;
  }

  .xterm-decoration-overview-ruler {
    z-index: 7;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: none;
  }

  .xterm-decoration-top {
    z-index: 2;
    position: relative;
  }
`;

export default terminalStyles;
