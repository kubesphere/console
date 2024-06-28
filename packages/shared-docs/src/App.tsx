import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Group, Button, useTheme, Snippet } from '@kubed/components';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-feather';
import TextTransition, { presets } from 'react-text-transition';

const HomeWrapper = styled.div`
  background: linear-gradient(to left, #44bd93, #26a678);
`;

const HeroWrapper = styled.div`
  padding-top: 80px;
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  z-index: 980;
`;

const HeroInner = styled('div')<React.ComponentPropsWithoutRef<any>>`
  width: ${props => props.theme.layout.pageWidthWithMargin};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .hero-button {
    font-weight: 400;
  }
`;

const HeroTitle = styled.h1`
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  color: #fff;
`;

const HeroDesc = styled.div`
  font-size: 16px;
  text-align: center;
  width: 700px;
  color: #e3e9ef;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
`;

const Footer = styled.div`
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e3e9ef;
`;

const commandPrefix = 'import ';
const examples = ['* as Shared', '{ TimeSelector }', 'type { PathParams }'];
const packageName = '@ks-console/shared';
const importCommand = `${commandPrefix} ${examples
  .map(example => `${example} ${packageName}`)
  .join(' ')}`;

export default function Home() {
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const intervalId = setInterval(() => setIndex(i => i + 1), 5000);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <HomeWrapper>
      <HeroWrapper>
        <HeroInner themeType={theme.type}>
          <HeroTitle>@ks-console/shared</HeroTitle>
          <HeroDesc>{t('DOCS_DESCRIPTIONS')}</HeroDesc>
          <Group style={{ marginTop: '45px' }}>
            <Link to="/docs/components">
              <Button
                shadow
                radius="xl"
                size="lg"
                className="hero-button"
                color="secondary"
                rightIcon={<ArrowRight size={15} />}
              >
                {t('get-started')}
              </Button>
            </Link>
          </Group>
          <Snippet
            style={{ marginTop: '70px', border: 'none', width: '450px' }}
            valueToCopy={importCommand}
          >
            {commandPrefix}
            <TextTransition
              springConfig={presets.wobbly}
              inline
              text={examples[index % examples.length]}
            />{' '}
            from "{packageName}"
          </Snippet>
        </HeroInner>
      </HeroWrapper>
      <Footer>© 2021 KubeSphere.io</Footer>
    </HomeWrapper>
  );
}
