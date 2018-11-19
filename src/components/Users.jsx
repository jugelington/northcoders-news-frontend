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
    const { loading, users } = this.state;
    return (
      <main>
        <h1>Users</h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            <section className="users-container">
              {users.map(user => (
                <UserSummary user={user} key={user._id} />
              ))}
            </section>
          </>
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
