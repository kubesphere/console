/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { HandUpDuotone, MessageRead, MessageCircleDuotone, NotePencilDuotone } from '@kubed/icons';
import { useClickAway } from 'react-use';
import {
  ContactTitle,
  ContactContent,
  FeedbackButton,
  FeedbackContent,
  FeedbackItem,
  FeedbackRoot,
  ContactWrapper,
  FeedbackList,
  SlackButton,
} from './Feedback.styles';

export const Feedback = () => {
  const LINKS = [
    {
      name: t('HELP_US_IMPROVE'),
      icon: <HandUpDuotone />,
      url: 'https://f.howxm.com/xs/u/34CZKM1J3ADE',
    },
    {
      name: t('FEEDBACK'),
      icon: <NotePencilDuotone />,
      url: 'https://jinshuju.net/f/PnhKBj',
    },
    {
      name: t('EXPERIENCE_COMMENT'),
      icon: <MessageCircleDuotone />,
      url: 'https://jinshuju.net/f/bKsHRY',
    },
  ];
  const [contentOpen, setContentOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickAway(menuRef, () => {
    setContentOpen(false);
  });
  return (
    <div ref={menuRef}>
      <FeedbackRoot>
        <FeedbackButton
          onClick={() => {
            setContentOpen(!contentOpen);
          }}
        >
          <MessageRead fill={'#e9eaec'} color={'#7d828d'} size={16} />
        </FeedbackButton>
      </FeedbackRoot>
      {contentOpen && (
        <FeedbackContent>
          <FeedbackList>
            {LINKS.map(link => (
              <FeedbackItem key={link.name}>
                {link.icon}
                <a href={link.url} target={'_blank'}>
                  {link.name}
                </a>
              </FeedbackItem>
            ))}
          </FeedbackList>
          <ContactWrapper>
            <ContactTitle>{t('CONTENT_NAME')}</ContactTitle>
            <ContactContent>
              <img src="/assets/qr_code.png" alt="" />
              <img src="/assets/slack_new.svg" alt="" />
              <span style={{ textAlign: 'center' }}>{t('QR_CODE')}</span>
              <SlackButton href="https://app.slack.com/client/TABN5CPK6/CAB8E4BLY" target="_blank">
                {t('JOIN_GROUP')}
              </SlackButton>
            </ContactContent>
          </ContactWrapper>
        </FeedbackContent>
      )}
    </div>
  );
};
