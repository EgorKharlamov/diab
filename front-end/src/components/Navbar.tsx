import React from 'react';
import { useSelector } from 'react-redux';
import NavItem from './NavItem';
import s from '../styles/UI/Navbar.module.sass';
import { iState } from '../store';
import { withTranslation } from '../../i18n';

const Navbar = ({ navPoints, t }:any) => {
  const user = useSelector<iState, iState['user']>((state) => state.user);

  const name = user.login.valueShowed || 'Guest';

  return (
    <div className={`${s.navbar}`}>
      <div className={`${s['navbar--grid']} wrapper`}>
        <div className={`${s['logo-container']}`}>
          <h1 className={`${s.h1} bold`}>
            {name === 'Guest'
              ? t('helloGuest')
              : t('helloUser', { name })}
          </h1>
        </div>

        <nav className={`${s.nav}`}>
          <ul className={`${s.ul}`}>
            {navPoints.map((el:iNavPoint) => NavItem(el))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

interface iNavbar {
  navPoints: iNavPoint[]
}
interface iNavPoint {
  id: number
  link: string
  name: string
}
Navbar.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation(['common'])(Navbar);
