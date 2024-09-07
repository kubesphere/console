/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { MouseEvent } from 'react';
import clsx from 'classnames';
import { Field } from '@kubed/components';

import { createCenterWindowOpt, Icon } from '@ks-console/shared';
import type { Tool } from './types';
import { getToolGroups } from './utils';
import { useActions } from './hooks';
import { ToolsHeader } from './ToolsHeader';
import { ToolsFooter } from './ToolsFooter';
import {
  Root,
  Wrapper,
  Content,
  Group,
  GroupTitle,
  GroupTools,
  StyledEntity,
} from './Tools.styles';

interface ToolsProps {
  isShown: boolean;
}

export function Tools({ isShown }: ToolsProps) {
  const toolGroups = getToolGroups();

  const actions = useActions();

  const handleThirdPartyToolClick = (event: MouseEvent<HTMLDivElement>, tool: Tool) =>
    window.open(tool.link, '_blank');

  const handleInternalToolClick = (event: MouseEvent<HTMLDivElement>, tool: Tool) => {
    const { title, link, name } = tool;

    if (name === 'docs') {
      window.open(link);
    }

    if (event.shiftKey && name === 'kubectl') {
      const features = createCenterWindowOpt({
        width: 1200,
        height: 800,
        scrollbars: 1,
        resizable: 1,
      });
      return window.open(link, title, features);
    }

    actions[name].open();
  };

  return (
    <>
      <Root $isShown={isShown} className="ks-Toolbox-tools">
        <Wrapper>
          <ToolsHeader />
          <Content>
            {toolGroups.map(group => (
              <Group key={group.name}>
                <GroupTitle as="h6">{group.title}</GroupTitle>
                <GroupTools>
                  {group.tools.map(tool => {
                    const { name, icon, title, description, link, isThirdPartyTool, isDisabled } =
                      tool;

                    const isFinalDisabled = isDisabled;

                    return (
                      <StyledEntity
                        key={name ?? link}
                        className={clsx({ disabled: isFinalDisabled })}
                        hoverable
                        onClick={(event: MouseEvent<HTMLDivElement>) => {
                          if (isFinalDisabled) {
                            return;
                          }

                          if (isThirdPartyTool) {
                            handleThirdPartyToolClick(event, tool);
                          } else {
                            handleInternalToolClick(event, tool);
                          }
                        }}
                      >
                        <Field
                          className="toolbox-item-content"
                          avatar={<Icon name={icon} size={40} />}
                          value={title}
                          label={description}
                        />
                      </StyledEntity>
                    );
                  })}
                </GroupTools>
              </Group>
            ))}
          </Content>
          <ToolsFooter />
        </Wrapper>
      </Root>
      {Object.values(actions).map(action => action.modal)}
    </>
  );
}
