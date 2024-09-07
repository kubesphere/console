/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import { getSuitableValue } from '../../utils/monitoring';
import { ContainerStyle, ForegroundStyle, WaveStyle, Wave2Style } from './styles';

const WIDTH = 100;
const HEIGHT = 100;
const MAX_WAVE_ANGLE = 20;

export default function VolumeUseChart({ rate, className }: { rate: number; className?: string }) {
  const getWavePath = () => {
    const sineCount = 2;

    const top = HEIGHT * (1 - rate);
    const halfSineWidth = WIDTH / (sineCount * 4);
    const angle = (0.5 - Math.abs(0.5 - rate)) * MAX_WAVE_ANGLE;

    return `
      M0 ${top}

      Q ${halfSineWidth} ${top + angle}, ${halfSineWidth * 2} ${top}
      T ${halfSineWidth * 4} ${top}

      T ${halfSineWidth * 6} ${top}
      T ${halfSineWidth * 8} ${top}

      T ${halfSineWidth * 10} ${top}
      T ${halfSineWidth * 12} ${top}

      T ${halfSineWidth * 14} ${top}
      T ${halfSineWidth * 16} ${top}

      V 100
      H 0

      Z
    `;
  };

  const renderForeground = () => {
    const percentage = getSuitableValue(rate, '%');

    return (
      <ForegroundStyle>
        <h3>{percentage}%</h3>
      </ForegroundStyle>
    );
  };

  const renderCapacity = () => {
    const viewBox = `0 0 ${WIDTH} ${HEIGHT}`;
    const path = getWavePath();

    return (
      <svg width="100%" height="100%" viewBox={viewBox} preserveAspectRatio="none">
        <WaveStyle d={path} />
        <Wave2Style d={path} />
      </svg>
    );
  };

  return (
    <ContainerStyle className={className}>
      {renderForeground()}
      {renderCapacity()}
    </ContainerStyle>
  );
}
