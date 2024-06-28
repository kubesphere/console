import styled from 'styled-components';

export const ChartWrapper = styled.div`
  position: relative;
  border-radius: 4px;
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
  top: 8px;
  min-height: 20px;
  line-height: 20px;
  font-weight: bold;
  z-index: 10;
`;
