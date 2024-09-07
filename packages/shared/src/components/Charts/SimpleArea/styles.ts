/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ChartWrapper = styled.div`
  position: relative;
  border-radius: 4px;
  height: auto !important;

  & + .chart_wrapper {
    margin-top: 8px;
  }

  &.height_not_auto {
    height: 100% !important;
    margin-bottom: 0;
  }

  .chart_content {
    padding-top: 40px;
  }

  .recharts-surface {
    margin-left: -8px;
  }

  .recharts-legend-wrapper {
    height: auto !important;
    padding-top: 4px;
    & > div {
      white-space: nowrap;
      flex-wrap: wrap;
      column-gap: 8px;
    }
  }

  .recharts-tooltip-wrapper {
    z-index: 999;
  }

  &.chart_dark {
    color: #fff !important;
    background-color: #242e42 !important;
    .recharts-cartesian-axis {
      text {
        fill: #79879c;
      }
    }

    .recharts-cartesian-grid {
      line {
        stroke: #79879c;
      }
    }
  }
  &.chart_light {
    color: #242e42 !important;
    background-color: #f9fbfd !important;
  }
`;
export const Title = styled.div`
  position: absolute;
  left: 13px;
  top: 12px;
  min-height: 20px;
  line-height: 20px;
  font-weight: bold;
  z-index: 10;
`;
