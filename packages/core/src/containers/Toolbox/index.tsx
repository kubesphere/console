/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import Draggable from 'react-draggable';
import type { DraggableProps, DraggableEventHandler } from 'react-draggable';

import { Hammer } from '@kubed/icons';
import { useHover, useLocalStorage } from '@kubed/hooks';

import { parser } from '@ks-console/shared';
import { KS_TOOLBOX_POSITION_KEY, DEFAULT_KS_TOOLBOX_POSITION } from './constants';
import { getToolGroups } from './utils';
import { Tools } from './Tools';
import { Root, ToolboxButton } from './styles';
import { Feedback } from './Feedback/Feedback';
import { useMarketplaceConfigQuery } from '../../stores/marketplace';

type DefaultPosition = DraggableProps['defaultPosition'];

const { safeParseJSON } = parser;

export default function Toolbox() {
  const toolGroups = getToolGroups();
  const [position, setPosition] = useLocalStorage({
    key: KS_TOOLBOX_POSITION_KEY,
    defaultValue: JSON.stringify(DEFAULT_KS_TOOLBOX_POSITION),
  });
  const defaultPosition = safeParseJSON(position, DEFAULT_KS_TOOLBOX_POSITION) as DefaultPosition;
  const { isHovered, ref } = useHover<HTMLDivElement>();

  const handleStop: DraggableEventHandler = (e, data) => {
    const { x } = DEFAULT_KS_TOOLBOX_POSITION;
    const y = Math.max(Math.min(data.y, 0), -900);
    const value = JSON.stringify({ x, y });
    setPosition(value);
  };

  if (toolGroups.length === 0) {
    return null;
  }
  const { isOnline } = useMarketplaceConfigQuery({
    isIgnoreErrorNotify: true,
  });

  return (
    <>
      <Draggable
        axis="y"
        defaultPosition={defaultPosition}
        cancel="div.ks-Toolbox-tools, div.kubed-modal-root"
        onStop={handleStop}
      >
        <Root ref={ref}>
          <ToolboxButton>
            <Hammer variant="light" size={16} />
          </ToolboxButton>
          <Tools isShown={isHovered} />
        </Root>
      </Draggable>
      {isOnline ? <Feedback /> : null}
    </>
  );
}
