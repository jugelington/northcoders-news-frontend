import React, { Component } from 'react';
import { Link } from '@reach/router';
import '../css/LoginBar.css';
import PropTypes from 'prop-types';

class LoginBar extends Component {
  state = {
    username: 'jessjelly'
  };

  render() {
    const { user, loginError } = this.props;
    const { username } = this.state;

    return user !== null ? (
      <Link to={`/users/${user.username}`}>
        <div className="user-bar">
          <img
            src={user.avatar_url}
            alt="my profile"
            className="login-avatar"
          />
          <p>{user.name}</p>
        </div>{' '}
      </Link>
    ) : (
      <>
        <form className="login-bar" onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            {' '}
            {!loginError ? (
              <p> Hi there! Who are you?</p>
            ) : (
              <p>
                Login Failed!
                <br /> Please try again.
              </p>
            )}
          </label>
          <input
            id="username"
            type="text"
            onChange={this.handleChange}
            value={username}
          />
          <br />
          <button>Log in</button>
        </form>
        <main />
      </>
    );
  }

  handleChange = event => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    const { username } = this.state;
    const { login } = this.props;
    event.preventDefault();
    login(username);
  };
}

LoginBar.propTypes = {
  user: PropTypes.object,
  loginError: PropTypes.bool
};
export default LoginBar;
