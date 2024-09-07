/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const ClustersWrapper = styled.div`
  max-width: 1440px;
  padding: 40px 20px 0;
  margin: 0 auto;

  .cluster-banner {
    & > div {
      background-color: ${({ theme }) => theme.palette.accents_0};
    }
  }

  .btn-add {
    padding-left: 23px;
    padding-right: 23px;
  }

  .mb8 {
    margin-bottom: 8px;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  //padding: 6px 12px;

  .search-bar {
    flex: 1 1;
  }
`;

export const Main = styled.div`
  margin-top: 20px;
  padding-bottom: 32px;

  .empty-icon {
    .kubed-icon {
      margin-bottom: 0;
    }
  }

  .cluster-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

export const ClusterList = styled.div``;

export const NoResultTitle = styled.div``;
