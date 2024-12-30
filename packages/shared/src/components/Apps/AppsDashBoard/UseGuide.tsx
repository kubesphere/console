import React, { useEffect } from 'react';
import Icon from '../../Icon';
import { Card } from './Card';
import styled from 'styled-components';
import { openpitrixStore } from '../../../stores';

const GuideWrapper = styled.div`
  margin-bottom: 12px;
`;

const GuideContent = styled.div`
  padding: 12px 20px;
`;

const StepList = styled.div`
  display: flex;
  margin-top: 12px;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1;
  position: relative;
  background-color: #f9fbfd;
  padding: 12px;
  border-radius: 4px;
  min-height: 84px;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -36px;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    display: flex;
    justify-content: center;
  }

  .step-icon {
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }

  .step-content {
    flex: 1;
  }

  .step-title {
    margin-bottom: 4px;
  }

  .step-desc {
    color: #79879c;
    font-size: 12px;
  }
`;

const IconWrapper = styled(Icon)`
  cursor: pointer;
`;

const { useAppList } = openpitrixStore;
export const UseGuide: React.FC = () => {
  const { data } = useAppList(
    { workspace: undefined },
    {
      autoFetch: true,

      params: {
        status: 'active',
        noLimit: true,
        categoryID: 'all',
        otherQuery: { label: 'application.kubesphere.io/repo-name=upload' },
      },
    },
  );

  const [isGuideVisible, setIsGuideVisible] = React.useState(false);

  useEffect(() => {
    setIsGuideVisible(!data?.length);
  }, [data]);

  const steps = [
    {
      icon: 'plug-circle-duotone',
      title: t('USE_GUIDE_STEP_1'),
    },
    {
      icon: 'apps-duotone',
      title: t('USE_GUIDE_STEP_2'),
    },
    {
      icon: 'cloud-shield-duotone',
      title: t('USE_GUIDE_STEP_3'),
    },
    {
      icon: 'apps',
      title: t('USE_GUIDE_STEP_4'),
    },
  ];

  return (
    <GuideWrapper>
      <Card
        title={
          <>
            <Icon name="book-3-duotone" size={20} />
            {t('USE_GUIDE_TITLE')}
          </>
        }
        operations={
          <IconWrapper
            name={isGuideVisible ? 'chevron-up' : 'chevron-down'}
            size={20}
            onClick={() => setIsGuideVisible(!isGuideVisible)}
          />
        }
      >
        {isGuideVisible && (
          <GuideContent>
            <div>{t('USE_GUIDE_DESC')}</div>
            <div>{t('USE_GUIDE_DESC2')}</div>
            <StepList>
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <Step>
                    <Icon name={step.icon} className="step-icon" />
                    <div className="step-content">
                      <div className="step-title">{`${index + 1}. ${step.title}`}</div>
                    </div>
                  </Step>
                  {index < steps.length - 1 && (
                    <Icon
                      name="more-duotone"
                      size={20}
                      style={{
                        color: '#79879c',
                        width: '36px',
                        alignSelf: 'center',
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </StepList>
          </GuideContent>
        )}
      </Card>
    </GuideWrapper>
  );
};

export default UseGuide;
