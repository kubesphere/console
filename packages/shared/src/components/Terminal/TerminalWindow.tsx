/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { useLocalStorage } from '@kubed/hooks';
import { Question } from '@kubed/icons';
import type { ModalProps } from '@kubed/components';

import {
  PADDING,
  StyledModal,
  Wrapper,
  Doc,
  HelpDoc,
  HideHelpDocButton,
  ShowHelpDocButton,
} from './TerminalWindow.styles';

export interface TerminalWindowProps extends ModalProps {
  content: ReactNode;
  tips: ReactNode;
  localStorageKey?: string;
  onToggleHelpDoc?: () => void;
  showToggleButton?: boolean;
  tipStyles?: CSSProperties;
}

export function TerminalWindow({
  content,
  tips,
  localStorageKey,
  onToggleHelpDoc,
  showToggleButton = true,
  tipStyles,
  ...rest
}: TerminalWindowProps) {
  const terminalLocalStorageKey = `${globals.user?.username}-${localStorageKey}`;
  const [helpDocVisibleString, setHelpDocVisibleString] = useLocalStorage({
    key: terminalLocalStorageKey,
  });

  const [helpDocVisible, setHelpDocVisible] = useState<boolean>(helpDocVisibleString !== 'false');
  const toggleHelpDoc = (visible: boolean) => {
    setHelpDocVisibleString(String(visible));
    setHelpDocVisible(visible);
  };

  const hideHelpDoc = () => toggleHelpDoc(false);

  const showHelpDoc = () => toggleHelpDoc(true);

  useEffect(() => {
    onToggleHelpDoc?.();
  }, [helpDocVisible]);

  const renderDoc = () => {
    if (showToggleButton) {
      return (
        <>
          {helpDocVisible ? (
            <HelpDoc style={tipStyles}>
              <Doc>{tips}</Doc>
              <HideHelpDocButton onClick={hideHelpDoc}>
                {t('HIDE_HELP_INFORMATION')}
              </HideHelpDocButton>
            </HelpDoc>
          ) : (
            <ShowHelpDocButton onClick={showHelpDoc}>
              <Question size={24} />
            </ShowHelpDocButton>
          )}
        </>
      );
    }

    return (
      <HelpDoc style={tipStyles}>
        <Doc>{tips}</Doc>
      </HelpDoc>
    );
  };

  return (
    <StyledModal
      width={`calc(100vw - ${PADDING}px)`}
      style={{ minWidth: '1000px', paddingBottom: 0 }}
      footer={null}
      {...rest}
    >
      <Wrapper>
        {content}
        {renderDoc()}
      </Wrapper>
    </StyledModal>
  );
}
