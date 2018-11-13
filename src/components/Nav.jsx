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
        <figure className="nav-buttons">
          <figcaption>Home</figcaption>
          <img src={home} alt="home" />
        </figure>
      </Link>
      <Link to="/topics/football">
        <figure className="nav-buttons">
          <figcaption>Football</figcaption>
          <img src={football} alt="football" />
        </figure>
      </Link>
      <Link to="/topics/coding">
        <figure className="nav-buttons">
          <figcaption>Coding</figcaption>
          <img src={coding} alt="coding" />
        </figure>
      </Link>
      <Link to="/topics/cooking">
        <figure className="nav-buttons">
          <figcaption>Cooking</figcaption>
          <img src={cooking} alt="cooking" />
        </figure>
      </Link>
    </nav>
  );
};

export default Nav;
