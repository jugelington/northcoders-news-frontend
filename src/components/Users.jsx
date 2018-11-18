import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import '../css/Users.css';
import UserSummary from './UserSummary';

class Users extends Component {
  state = {
    users: [],
    loading: true
  };
  render() {
    return (
      <main className="users-container">
        {this.state.loading ? (
          <Loading />
        ) : (
          this.state.users.map(user => (
            <UserSummary user={user} key={user._id} />
          ))
        )}
      </main>
    );
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    api
      .fetchAllUsers()
      .then(users => this.setState({ users, loading: false }))
      .catch(() =>
        this.props.navigate('/error', {
          state: { status: 404, msg: 'Users not Found' }
        })
      );
  };
}

export default Users;
