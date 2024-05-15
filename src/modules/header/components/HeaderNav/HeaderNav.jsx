import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';

import { icons as sprite } from 'shared/icons';
import style from './HeaderNav.module.scss';
import NavList from '../NavList/NavList';
import { SocialMedia } from 'shared/components';

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayMenuRef = useRef(null);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'unset' : 'hidden';
  };

  return (
    <>
      <NavList className={style.navList} />

      {isTabletOrMobile && (
        <>
          <div className={style.thumbMenu} onClick={toggleMenu}>
            <svg className={style.mobileMenu}>
              <use xlinkHref={`${sprite}#burger-menu`} />
            </svg>
          </div>

          <CSSTransition
            in={isMenuOpen}
            timeout={300}
            unmountOnExit
            nodeRef={overlayMenuRef}
          >
            {(state) => (
              <div>
                {state === 'entered' && (
                  <div className={style.backdrop} onClick={toggleMenu}></div>
                )}
                <div
                  ref={overlayMenuRef}
                  className={`${style.overlayMenu} ${
                    state === 'entered' ? style.entered : ''
                  }`}
                >
                  <button className={style.closeButton} onClick={toggleMenu}>
                    <svg className={style.closeMenu}>
                      <use xlinkHref={`${sprite}#close`} />
                    </svg>
                  </button>

                  <NavList className={style.navMenuMobile} />
                  <SocialMedia className={style.iconMobile} />
                </div>
              </div>
            )}
          </CSSTransition>
        </>
      )}
    </>
  );
};

export default HeaderNav;
