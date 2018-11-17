import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import '../css/Users.css';
import { Link } from '@reach/router';

class Users extends Component {
  state = { users: [], articles: [], comments: [], loading: true };
  render() {
    return (
      <main>
        <h1>Users:</h1>
        <section className="users-container">
          {this.state.loading === false ? (
            this.state.users.map(user => {
              return (
                <div key={user._id} className="users-box">
                  <Link className="links" to={`/users/${user.username}`}>
                    Username: {user.username} <br />
                    Real name: {user.name} <br />
                    Articles written:{' '}
                    {
                      this.state.articles.filter(
                        article => article.created_by.username === user.username
                      ).length
                    }{' '}
                    <br />
                    Total article Popularity:{' '}
                    {this.state.articles.reduce((acc, curr) => {
                      return curr.created_by.username === user.username
                        ? (acc += curr.votes)
                        : acc;
                    }, 0)}
                    <h6>Avatar:</h6>
                    <img src={user.avatar_url} alt="avatar" />
                  </Link>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
        </section>
      </main>
    );
  }

  componentDidMount() {
    this.getUsers();
    this.getArticles();
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

  getArticles = () => {
    api.fetchAllArticles().then(articles => {
      this.setState({ articles });
    });
  };
}

export default Users;
