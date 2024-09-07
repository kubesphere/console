/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { css } from 'styled-components';

const lightboxStyles = css`
  .yarl__fullsize {
    height: 100%;
    width: 100%;
  }
  .yarl__relative {
    position: relative;
  }
  .yarl__portal {
    bottom: 0;
    left: 0;
    opacity: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    transition: opacity var(--yarl__fade_animation_duration, 0.25s)
      var(--yarl__fade_animation_timing_function, ease);
    z-index: var(--yarl__portal_zindex, 9999);
  }
  .yarl__portal_open {
    opacity: 1;
  }
  .yarl__container {
    background-color: var(--yarl__container_background_color, var(--yarl__color_backdrop, #000));
    bottom: 0;
    left: 0;
    outline: 0;
    overflow: hidden;
    overscroll-behavior: var(--yarl__controller_overscroll-behavior, contain);
    position: absolute;
    right: 0;
    top: 0;
    touch-action: var(--yarl__controller_touch_action, none);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .yarl__carousel {
    align-content: center;
    align-items: stretch;
    display: flex;
    flex: 0 0 auto;
    height: 100%;
    justify-content: center;
    opacity: var(--yarl__pull_down_opacity, 1);
    -webkit-transform: translate(var(--yarl__swipe_offset, 0), var(--yarl__pull_down_offset, 0));
    transform: translate(var(--yarl__swipe_offset, 0), var(--yarl__pull_down_offset, 0));
    width: calc(
      100% + (var(--yarl__carousel_slides_count) - 1) *
        (
          100% + var(--yarl__carousel_spacing_px, 0) * 1px +
            var(--yarl__carousel_spacing_percent, 0) * 1%
        )
    );
  }
  .yarl__carousel_with_slides {
    -webkit-column-gap: calc(
      var(--yarl__carousel_spacing_px, 0) * 1px + 100 /
        (
          var(--yarl__carousel_slides_count) * 100 + (var(--yarl__carousel_slides_count) - 1) *
            var(--yarl__carousel_spacing_percent, 0)
        ) * var(--yarl__carousel_spacing_percent, 0) * 1%
    );
    -moz-column-gap: calc(
      var(--yarl__carousel_spacing_px, 0) * 1px + 100 /
        (
          var(--yarl__carousel_slides_count) * 100 + (var(--yarl__carousel_slides_count) - 1) *
            var(--yarl__carousel_spacing_percent, 0)
        ) * var(--yarl__carousel_spacing_percent, 0) * 1%
    );
    column-gap: calc(
      var(--yarl__carousel_spacing_px, 0) * 1px + 100 /
        (
          var(--yarl__carousel_slides_count) * 100 + (var(--yarl__carousel_slides_count) - 1) *
            var(--yarl__carousel_spacing_percent, 0)
        ) * var(--yarl__carousel_spacing_percent, 0) * 1%
    );
  }
  .yarl__flex_center {
    align-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .yarl__slide {
    flex: 1;
    overflow: hidden;
    padding: calc(
      var(--yarl__carousel_padding_px, 0) * 1px + 100 /
        (
          var(--yarl__carousel_slides_count) * 100 + (var(--yarl__carousel_slides_count) - 1) *
            var(--yarl__carousel_spacing_percent, 0)
        ) * var(--yarl__carousel_padding_percent, 0) * 1%
    );
    position: relative;
  }
  [dir='rtl'] .yarl__slide {
    --yarl__direction: -1;
  }
  .yarl__slide_image {
    -webkit-touch-callout: none;
    max-height: 100%;
    max-width: 100%;
    -o-object-fit: contain;
    object-fit: contain;
    touch-action: var(--yarl__controller_touch_action, none);
    -moz-user-select: none;
    user-select: none;
    -webkit-user-select: none;
  }
  @media screen and (min-width: 800px) {
    .yarl__slide_image {
      -webkit-backface-visibility: hidden;
      -webkit-transform: translateZ(0);
      -webkit-transform-style: preserve-3d;
    }
  }
  .yarl__slide_image_cover {
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    width: 100%;
  }
  .yarl__slide_image_loading {
    opacity: 0;
  }
  .yarl__slide_placeholder {
    left: 50%;
    line-height: 0;
    position: absolute;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }
  .yarl__slide_loading {
    -webkit-animation: yarl__delayed_fadein 1s linear;
    animation: yarl__delayed_fadein 1s linear;
    color: var(--yarl__slide_icon_loading_color, var(--yarl__color_button, hsla(0, 0%, 100%, 0.8)));
  }
  .yarl__slide_loading line {
    -webkit-animation: yarl__stroke_opacity 1s linear infinite;
    animation: yarl__stroke_opacity 1s linear infinite;
  }
  .yarl__slide_loading line:first-of-type {
    -webkit-animation-delay: -1.875s;
    animation-delay: -1.875s;
  }
  .yarl__slide_loading line:nth-of-type(2) {
    -webkit-animation-delay: -1.75s;
    animation-delay: -1.75s;
  }
  .yarl__slide_loading line:nth-of-type(3) {
    -webkit-animation-delay: -1.625s;
    animation-delay: -1.625s;
  }
  .yarl__slide_loading line:nth-of-type(4) {
    -webkit-animation-delay: -1.5s;
    animation-delay: -1.5s;
  }
  .yarl__slide_loading line:nth-of-type(5) {
    -webkit-animation-delay: -1.375s;
    animation-delay: -1.375s;
  }
  .yarl__slide_loading line:nth-of-type(6) {
    -webkit-animation-delay: -1.25s;
    animation-delay: -1.25s;
  }
  .yarl__slide_loading line:nth-of-type(7) {
    -webkit-animation-delay: -1.125s;
    animation-delay: -1.125s;
  }
  .yarl__slide_loading line:nth-of-type(8) {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .yarl__slide_error {
    color: var(--yarl__slide_icon_error_color, red);
    height: var(--yarl__slide_icon_error_size, 48px);
    width: var(--yarl__slide_icon_error_size, 48px);
  }
  @media (prefers-reduced-motion) {
    .yarl__portal,
    .yarl__slide {
      transition: unset;
    }
    .yarl__slide_loading,
    .yarl__slide_loading line {
      -webkit-animation: unset;
      animation: unset;
    }
  }
  .yarl__toolbar {
    bottom: auto;
    display: flex;
    justify-content: flex-end;
    left: auto;
    padding: var(--yarl__toolbar_padding, 8px);
    position: absolute;
    right: 0;
    top: 0;
  }
  [dir='rtl'] .yarl__toolbar {
    bottom: auto;
    left: 0;
    right: auto;
    top: 0;
  }
  .yarl__icon {
    height: var(--yarl__icon_size, 32px);
    width: var(--yarl__icon_size, 32px);
  }
  .yarl__button {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--yarl__button_background_color, transparent);
    border: var(--yarl__button_border, 0);
    color: var(--yarl__color_button, hsla(0, 0%, 100%, 0.8));
    cursor: pointer;
    -webkit-filter: var(--yarl__button_filter, drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8)));
    filter: var(--yarl__button_filter, drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8)));
    line-height: 0;
    margin: var(--yarl__button_margin, 0);
    outline: none;
    padding: var(--yarl__button_padding, 8px);
  }
  .yarl__button:focus {
    color: var(--yarl__color_button_active, #fff);
  }
  .yarl__button:focus:not(:focus-visible) {
    color: var(--yarl__color_button, hsla(0, 0%, 100%, 0.8));
  }
  .yarl__button:focus-visible {
    color: var(--yarl__color_button_active, #fff);
  }
  @media (hover: hover) {
    .yarl__button:focus-visible:hover,
    .yarl__button:focus:hover,
    .yarl__button:hover {
      color: var(--yarl__color_button_active, #fff);
    }
  }
  .yarl__button:disabled {
    color: var(--yarl__color_button_disabled, hsla(0, 0%, 100%, 0.4));
    cursor: default;
  }
  .yarl__navigation_next,
  .yarl__navigation_prev {
    padding: var(--yarl__navigation_button_padding, 24px 16px);
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .yarl__navigation_prev {
    left: 0;
  }
  [dir='rtl'] .yarl__navigation_prev {
    left: unset;
    right: 0;
    -webkit-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotate(180deg);
  }
  .yarl__navigation_next {
    right: 0;
  }
  [dir='rtl'] .yarl__navigation_next {
    left: 0;
    right: unset;
    -webkit-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotate(180deg);
  }
  .yarl__no_scroll {
    height: 100%;
    overflow: hidden;
    overscroll-behavior: none;
  }
  @-webkit-keyframes yarl__delayed_fadein {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes yarl__delayed_fadein {
    0% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes yarl__stroke_opacity {
    0% {
      stroke-opacity: 1;
    }
    to {
      stroke-opacity: 0.125;
    }
  }
  @keyframes yarl__stroke_opacity {
    0% {
      stroke-opacity: 1;
    }
    to {
      stroke-opacity: 0.125;
    }
  }

  .yarl__counter {
    bottom: var(--yarl__counter_bottom, unset);
    color: var(--yarl__counter_color, var(--yarl__color_button, hsla(0, 0%, 100%, 0.8)));
    -webkit-filter: var(--yarl__counter_filter, drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8)));
    filter: var(--yarl__counter_filter, drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8)));
    left: var(--yarl__counter_left, 0);
    line-height: var(--yarl__counter_line_height, var(--yarl__icon_size, 32px));
    margin: var(--yarl__counter_margin, var(--yarl__toolbar_padding, 8px));
    padding: var(--yarl__counter_padding, var(--yarl__button_padding, 8px));
    position: var(--yarl__counter_position, absolute);
    right: var(--yarl__counter_right, unset);
    top: var(--yarl__counter_top, 0);
    -webkit-user-select: var(--yarl__counter_user_select, none);
    -moz-user-select: var(--yarl__counter_user_select, none);
    user-select: var(--yarl__counter_user_select, none);
  }
`;

export default lightboxStyles;
