import React from 'react';
import './nav.css';
import { Link } from '@reach/router';
import football from '../images/football.png';
import coding from '../images/coding.png';
import cooking from '../images/cooking.png';
import home from '../images/home.png';

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <img src={home} alt="home" />
      </Link>
      <Link to="/topics/football">
        <img src={football} alt="football" />
      </Link>
      <Link to="/topics/coding">
        <img src={coding} alt="coding" />
      </Link>
      <Link to="/topics/cooking">
        <img src={cooking} alt="cooking" />
      </Link>
    </nav>
  );
};

export default Nav;
