import React from 'react';
import { Link } from '@reach/router';
import '../css/UserDisplay.css';
import coding from '../images/coding.png';

const UserDisplay = ({ username, avatarUrl }) => {
  return (
    <Link to={`/users/${username}`} className="user links">
      <img
        className="avatar"
        src={avatarUrl !== '' ? avatarUrl : coding}
        alt="avatar"
      />
      <br />
      {username}
    </Link>
  );
};

export default UserDisplay;
