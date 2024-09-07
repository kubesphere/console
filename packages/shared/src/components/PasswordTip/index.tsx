/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { Success } from '@kubed/icons';
import { Progress } from '@kubed/components';
import { Pattern } from '../../constants';

const getStrength = (value: string): number => {
  if (isEmpty(value)) {
    return -1;
  }

  if (!Pattern.PATTERN_PASSWORD.test(value)) {
    return 0;
  }

  let ret = 0;
  if (Pattern.PATTERN_WORD.test(value)) {
    ret += 4;
  }

  if (Pattern.PATTERN_NUMBER.test(value)) {
    ret += 2;
  }

  if (Pattern.PATTERN_CHARACTERS.test(value)) {
    ret += 2;
  }

  if (value.length >= 6 && value.length < 12) {
    ret += 2;
  } else if (value.length >= 12) {
    ret += 4;
  }

  return ret;
};

const getColor = (value: string) => {
  const strength = getStrength(value);

  if (strength >= 0 && strength < 6) {
    return { width: 33, color: 'error' };
  }
  if (strength >= 6 && strength < 8) {
    return { width: 66, color: 'warning' };
  }
  if (strength >= 8) {
    return { width: 100, color: 'success' };
  }
  return { width: 0, color: '#fff' };
};

export const PasswordTipWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background};
  color: ${({ theme }) => theme.palette.accents_8};

  .tip {
    margin: 12px 0 0;
    color: ${({ theme }) => theme.palette.accents_5};
  }
`;

export const TipInner = styled.div`
  margin-top: 5px;
  padding: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.accents_1};
`;

export const TipItem = styled.div`
  display: flex;
  align-items: center;
  line-height: 26px;

  .kubed-icon {
    margin-right: 8px;
  }
`;

type TipProps = {
  password: string;
  className?: string;
  hasProgress?: boolean;
};

const PasswordTip = ({ password, className, hasProgress }: TipProps) => {
  const { color, width } = getColor(password);
  return (
    <PasswordTipWrapper className={className}>
      <p className="tip-title">{t('PASSWORD_MUST')}</p>
      <TipInner>
        <TipItem>
          <Success size={16} variant={Pattern.PATTERN_WORD.test(password) ? 'coloured' : 'dark'} />
          {t('PASSWORD_LETTER')}
        </TipItem>
        <TipItem>
          <Success
            size={16}
            variant={Pattern.PATTERN_NUMBER.test(password) ? 'coloured' : 'dark'}
          />
          {t('PASSWORD_NUMBER')}
        </TipItem>
        <TipItem>
          <Success
            size={16}
            variant={Pattern.PATTERN_CHARACTERS.test(password) ? 'coloured' : 'dark'}
          />
          {t('PASSWORD_CHARACTERS')}
        </TipItem>
        <TipItem>
          <Success size={16} variant={password.length >= 8 ? 'coloured' : 'dark'} />
          {t('PASSWORD_LENGTH')}
        </TipItem>
      </TipInner>
      {hasProgress && (
        <>
          <p className="tip-title">{t('PASSWORD_STRENGTH')}</p>
          <Progress color={color} value={width} />
          <p className="tip">{t('PASSWORD_STRENGTH_DESC')}</p>
        </>
      )}
    </PasswordTipWrapper>
  );
};

export default PasswordTip;
