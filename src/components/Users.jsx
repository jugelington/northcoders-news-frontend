import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import '../css/Users.css';
import { Link } from '@reach/router';

class Users extends Component {
  state = { users: [], loading: true };
  render() {
    return (
      <main>
        <h1>Users:</h1>
        {this.state.loading === false ? (
          this.state.users.map(user => {
            return (
              <div key={user._id} className="users-box">
                <Link className="links" to={`/users/${user.username}`}>
                  <h6>Username:</h6> {user.username}
                  <br />
                  <h6>Real name:</h6> {user.name}
                  <br />
                  <h6>Avatar:</h6>
                  <img src={user.avatar_url} alt="avatar" />
                </Link>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </main>
    );
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    api.fetchAllUsers().then(users => this.setState({ users, loading: false }));
  };
}

export default Users;
