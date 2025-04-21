'use client';
import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Collapse } from '@mui/material';
import Slide from '@mui/material/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { ICategory, ISubcategory } from '@packages/common';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStore } from '../../../providers';
const Wrapper = styled(Box)`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: transparent;
  z-index: 101;
  margin: 0;
  width: 300px;
  display: ${(props) =>
    (props?.isHidden as boolean) === true ? 'none' : 'block'};
`;
const ImageWrapper = styled.div`
  /* background-color: blue; */
  width: 100%;
  position: relative;
  & > div {
    position: unset !important;
  }
  .image {
    object-fit: contain;
    width: 100%;
    max-width: 220px !important;
    position: relative !important;
    height: unset !important;
  }
`;
const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  align-items: center;
  background-color: #0b0b0b;
  padding: 5px 12px 5px 5px;
  border: 1px solid #e8e8e8;
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #fff;
  font-size: 17px;
  max-height: 17px;
`;
const MenuSectionWrapper = styled.div`
  padding: 10px;
`;
const SubMenuSectionWrapper = styled.div`
  padding: 10px 10px 0 22px;
`;
const LinkContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 18px;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
`;
const LinkWrapper = styled.div`
  display: flex;
  font-weight: 600;
`;
const SubLinkWrapper = styled.div`
  padding-bottom: 10px;
  text-align: left;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: #000;
  &:hover {
    color: #5a5a5a;
  }
`;
const CustomIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  max-height: 14px;
  margin: auto;
`;

interface SubcategoryType {
  id: number;
  title: string;
  url: string;
  path: string;
}

interface IMenuSubcategory extends ISubcategory {
  path: string;
}
type MenuItemType = {
  id: number;
  title: string;
  isOpen: boolean;
  subcategories: IMenuSubcategory[];
};

interface ICategorySubcategory extends ICategory {
  subcategories: ISubcategory[];
}

const baseApiURL = process.env.NEXT_PUBLIC_BASE_URL;
const fetchSubcategory = async () => {
  const { data } = await axios.get(`${baseApiURL}category`);
  return data;
};

type MenuType = Array<MenuItemType>;
const SideMenu: FC = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<MenuItemType[]>({
    queryKey: ['categories'],
    queryFn: () => fetchSubcategory(),
  });
  const { isSideMenuOpen, toggleSideMenu } = useStore();
  const [menuList, setMenuList] = useState<Array<MenuItemType>>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        let newMenuList: Array<MenuItemType> = [];
        if (categories && categories?.length > 0) {
          categories.forEach((menuItem: MenuItemType) => {
            let newMenuItem = { ...menuItem, isOpen: false };
            menuItem.subcategories.forEach(
              (submenuItem: IMenuSubcategory, index) => {
                newMenuItem.subcategories[index].path =
                  `/subcategory/${submenuItem.id}`;
              },
            );
            newMenuList.push(newMenuItem);
          });
        }
        setMenuList(newMenuList);
      } catch (error: any) {
        console.log('Error Message=>', error?.message);
      }
    };
    fetch();
  }, [categories]);
  const handleMenuClick = (index: number) => {
    let newMenuList: MenuType = [];
    menuList.forEach((menuItem, menuIndex) => {
      let newIsOpen: boolean;
      if (menuIndex === index) {
        newIsOpen = !menuList[index].isOpen;
      } else {
        newIsOpen = false;
      }
      newMenuList.push({ ...menuItem, isOpen: newIsOpen });
    });
    setMenuList(newMenuList);
  };
  return (
    <Wrapper isHidden={!isSideMenuOpen}>
      <Slide
        in={isSideMenuOpen}
        direction={'right'}
        style={{
          backgroundColor: '#e8e8e8',
          height: '100vh',
        }}
      >
        <div>
          <HeaderWrapper>
            <ImageWrapper>
              <Image
                src={'/images/main-logo.png'}
                fill
                alt="a golden closet logo"
                priority
                className="image"
              />
            </ImageWrapper>
            <Icon icon={faTimes} onClick={toggleSideMenu}></Icon>
          </HeaderWrapper>
          <MenuSectionWrapper>
            <LinkContainer onClick={toggleSideMenu}>
              <LinkWrapper>
                <CustomLink href="/" replace>
                  Home
                </CustomLink>
              </LinkWrapper>
            </LinkContainer>
            {menuList.map((item, index) => (
              <>
                <LinkContainer
                  key={item.id}
                  onClick={() => handleMenuClick(index)}
                >
                  <LinkWrapper>{item.title}</LinkWrapper>
                  <CustomIcon
                    icon={item.isOpen ? faChevronDown : faChevronRight}
                    onClick={() => handleMenuClick(index)}
                  />
                </LinkContainer>
                {item.subcategories.length > 0 && (
                  <Collapse in={item.isOpen}>
                    <SubMenuSectionWrapper>
                      {item.subcategories.map((subMenuItem, i) => (
                        <SubLinkWrapper key={i} onClick={toggleSideMenu}>
                          <CustomLink href={subMenuItem.path} replace>
                            {subMenuItem.title}
                          </CustomLink>
                        </SubLinkWrapper>
                      ))}
                    </SubMenuSectionWrapper>
                  </Collapse>
                )}
              </>
            ))}
          </MenuSectionWrapper>
        </div>
      </Slide>
    </Wrapper>
  );
};
// sx={{ width: `calc(100px + 16px)` }}
export default SideMenu;
