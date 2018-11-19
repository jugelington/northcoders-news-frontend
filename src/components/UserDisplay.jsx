import React from 'react';
import { Link } from '@reach/router';
import '../css/UserDisplay.css';
import coding from '../images/coding.png';
import PropTypes from 'prop-types';

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

UserDisplay.propTypes = {
  username: PropTypes.string,
  avatarUrl: PropTypes.string
};

export default UserDisplay;
