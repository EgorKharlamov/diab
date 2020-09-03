import React from 'react';
import { Link } from '../../i18n';
import s from '../styles/UI/NavItem.module.sass';

const NavItem = ({ id, link, name }:iNavPoint) => (
  <>
    <li key={id} className={`${s.li}`}>
      <Link href={link}>
        <a className={`${s.a}`}>{name}</a>
      </Link>
    </li>
  </>
);
interface iNavPoint {
  id: number
  link: string
  name: string
}
export default NavItem;
