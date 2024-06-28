import styled from 'styled-components';
import { Panel } from '@ks-console/shared';

export const PanelWapper = styled(Panel)`
  display: flex;
  & > div {
    min-width: 200px;
    margin-right: 20px;
  }
`;
export const MonitorPanel = styled(Panel)`
  padding: 0;
  .recharts-legend-wrapper {
    opacity: 0;
  }
`;
export const Conditions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
`;
