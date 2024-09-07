/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useCallback, useEffect } from 'react';
import type { ReactNodeArray } from 'react';
import clsx from 'classnames';
import { merge } from 'lodash';
import type { EmblaOptionsType } from 'embla-carousel-react';
import useEmblaCarousel from 'embla-carousel-react';

import { Arrow } from './Arrow';
import { Slides, Viewport, Container, Slide, Dots, Dot } from './Carousel.styles';

interface CarouselProps {
  emblaOptions: EmblaOptionsType;
  slides: ReactNodeArray;
  classNames?: {
    slideContainer?: string;
    slide?: string;
  };
}

function Carousel({ slides, emblaOptions, classNames }: CarouselProps) {
  const finalOptions = merge(null, emblaOptions, {});

  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(finalOptions);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(index => emblaApi?.scrollTo(index), [emblaApi]);

  const onInit = useCallback(api => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback(api => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div>
      <Slides>
        <Viewport ref={emblaRef}>
          <Container className={classNames?.slideContainer}>
            {slides.map((element, index) => (
              <Slide key={index} className={classNames?.slide}>
                {element}
              </Slide>
            ))}
          </Container>
        </Viewport>
        <Arrow
          className={clsx('arrow', 'arrow-left')}
          direction="left"
          disabled={prevDisabled}
          onClick={scrollPrev}
        />
        <Arrow
          className={clsx('arrow', 'arrow-right')}
          direction="right"
          disabled={nextDisabled}
          onClick={scrollNext}
        />
      </Slides>
      <Dots>
        {scrollSnaps.map((_, index) => (
          <Dot key={index} $isActive={index === selectedIndex} onClick={() => scrollTo(index)} />
        ))}
      </Dots>
    </div>
  );
}

export { Carousel };
