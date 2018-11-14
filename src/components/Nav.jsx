import React from 'react';
import './nav.css';
import { Link } from '@reach/router';
import football from '../images/football.png';
import coding from '../images/coding.png';
import cooking from '../images/cooking.png';
import infinity from '../images/infinity.png';
import write from '../images/write.png';

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <figure className="nav-buttons">
          <figcaption>All Articles</figcaption>
          <img src={infinity} alt="all articles" />
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
      <Link to="/write">
        <figure className="nav-buttons">
          <figcaption>Write Article</figcaption>
          <img src={write} alt="write an article" />
        </figure>
      </Link>
    </nav>
  );
};

export default Nav;
