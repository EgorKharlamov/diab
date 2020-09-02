import React from 'react';
import { Link } from '../../i18n';

const Navbar = ({ navPoints }:iNavbar) => (
  <nav>
    <ul>
      {navPoints.map((el) => <li key={el.id}><Link href={el.link}><a>{el.name}</a></Link></li>)}
    </ul>
  </nav>
);

interface iNavbar {
  navPoints: iNavPoint[]
}
interface iNavPoint {
  id: number
  link: string
  name: string
}

export default Navbar;
