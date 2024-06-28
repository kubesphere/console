import { get } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import SideMenu from '../../components/SideMenu';
import menuData from '../../routes/menuData';
import { MainContent, MainSection, SideBar, SideBarInner, SideShadow } from './styles';

export default function DocLayout() {
  const { category, slug } = useParams();

  const [isScroll, setIsScroll] = useState(false);
  const categoryMenu = get(menuData, category || '', []);

  useEffect(() => {
    const scrollHandler = () => setIsScroll(document.documentElement.scrollTop > 80);
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <>
      <MainSection>
        <SideBar>
          <SideBarInner isScroll={isScroll}>
            {categoryMenu.map((item: any) => {
              return (
                <SideMenu
                  title={item.title}
                  category={category!}
                  menu={item.menu}
                  key={item.title}
                  slug={slug}
                />
              );
            })}
          </SideBarInner>
        </SideBar>
        <SideShadow />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainSection>
    </>
  );
}
