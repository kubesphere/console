/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 300px;
`;

export const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding-bottom: 32px;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 1px solid #d8dee5;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
`;

export const ActionButtonsWrapper = styled.div`
  display: inline-block;
`;

export const Icon = styled.img`
  max-width: 104px;
  height: auto;
`;

export const BasicInfo = styled.div`
  padding-bottom: 26px;

  & > div {
    display: flex;
  }

  .desc-label {
    width: 140px;
  }

  .desc-content {
    flex: 1;
    word-break: break-word;

    p {
      margin: 0;
    }
  }
`;

const SectionTitle = styled.h5`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${({ theme }) => theme.palette.accents_8};
`;

export const BasicInfoTitle = styled(SectionTitle)`
  padding-bottom: 8px;
`;

export const TagsWrapper = styled.div`
  &:not(:last-of-type) {
    padding-bottom: 20px;
  }
`;

export const TagsTitle = styled(SectionTitle)`
  padding-bottom: 8px;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled(SectionTitle)`
  padding: 0 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.palette.accents_2};
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;
