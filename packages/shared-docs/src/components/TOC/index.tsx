import React, { useRef, useEffect, useState } from 'react';
import cx from 'classnames';
import styled from 'styled-components';
import { Text } from '@kubed/components';

interface Heading {
  depth: number;
  text: string;
  properties: {
    id: string;
  };
}

interface TableOfContentsProps {
  headings: Heading[];
  withTabs: boolean;
}

const TocWrapper = styled.nav`
  width: 200px;
  padding-left: 15px;
  -webkit-font-smoothing: antialiased;
`;

const TocInner = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 80px;
`;

const TocTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  margin-top: 20px;
`;

const TocItems = styled.div`
  border-left: 1px solid ${({ theme }) => theme.palette.accents_2};

  .toc-link {
    display: block;
    margin-left: -1px;
    font-size: 14px;
    line-height: 28px;
    border-left: 1px solid transparent;
    font-family: ProximaNova, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
    text-transform: capitalize;
    color: ${({ theme }) => theme.palette.accents_6};
  }

  .toc-link__active {
    color: ${({ theme }) => theme.palette.primary};
    border-left: 1px solid ${({ theme }) => theme.palette.primary};
  }
`;

function getActiveElement(rects: DOMRect[]) {
  if (rects.length === 0) {
    return -1;
  }

  const closest = rects.reduce(
    (acc, item, index) => {
      if (Math.abs(acc.position) < Math.abs(item.y)) {
        return acc;
      }

      return {
        index,
        position: item.y,
      };
    },
    { index: 0, position: rects[0].y },
  );

  return closest.index;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TOC({ headings, withTabs }: TableOfContentsProps) {
  const [active, setActive] = useState(0);

  const slugs = useRef<HTMLDivElement[]>([]);
  const filteredHeadings = headings.filter(heading => heading.depth >= 1);

  useEffect(() => {
    slugs.current = filteredHeadings.map(
      heading => document.getElementById(heading.properties.id) as HTMLDivElement,
    );
  }, [headings]);

  const handleScroll = () => {
    setActive(getActiveElement(slugs.current.map(d => d.getBoundingClientRect())));
  };

  useEffect(() => {
    setActive(getActiveElement(slugs.current.map(d => d.getBoundingClientRect())));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (filteredHeadings.length === 0) {
    return null;
  }

  const items = filteredHeadings.map((heading, index) => {
    const slug = heading.properties.id;
    return (
      <Text
        key={slug}
        component="a"
        size="sm"
        href={`#${slug}`}
        style={{ paddingLeft: (heading.depth - 1) * 15, cursor: 'pointer' }}
        className={cx('toc-link', { 'toc-link__active': active === index })}
        onClick={event => {
          event.preventDefault();
          const element = document.getElementById(slug);
          window.scrollTo({
            top: (element?.getBoundingClientRect().top || 0) + window.pageYOffset - 80 - 10,
            behavior: 'smooth',
          });
        }}
      >
        {heading.text}
      </Text>
    );
  });

  return (
    <TocWrapper>
      <TocInner>
        <TocTitle>Quick Nav</TocTitle>
        <TocItems>{items}</TocItems>
      </TocInner>
    </TocWrapper>
  );
}
