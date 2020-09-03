import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavItem from './NavItem';
import s from '../styles/UI/Navbar.module.sass';
import { iState } from '../store';
import { i18n, withTranslation } from '../../i18n';
import Button from './UI/Button';
import { AppActions } from '../store/app/actions';

const Navbar = ({ navPoints, t }:any) => {
  const dispatch = useDispatch();
  const user = useSelector<iState, iState['user']>((state) => state.user);

  const name = user.login.valueShowed || 'Guest';

  const changeThemeDarkHandler = () => {
    dispatch(AppActions.changeTheme({ theme: 'dark' }));
  };
  const changeThemeDefaultHandler = () => {
    dispatch(AppActions.changeTheme({ theme: 'default' }));
  };
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
            {navPoints.map((el:iNavPoint) => (
              <NavItem
                key={el.id}
                id={el.id}
                link={el.link}
                name={el.name}
              />
            ))}
          </ul>
        </nav>
        <Button textButton={t('buttons:changeLangEn')} title={t('buttons:changeLangEn')} onClickP={() => i18n.changeLanguage('en')} />
        <Button textButton={t('buttons:changeLangRu')} title={t('buttons:changeLangRu')} onClickP={() => i18n.changeLanguage('ru')} />

        <Button textButton="dark mode" title="dark mode" onClickP={changeThemeDarkHandler} />
        <Button textButton="default mode" title="default mode" onClickP={changeThemeDefaultHandler} />

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
