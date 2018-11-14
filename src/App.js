import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import ArticlePage from './components/ArticlePage';
import LoginBar from './components/LoginBar';
import * as api from './api';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Write from './components/Write';

class App extends Component {
  state = {
    user: {
      _id: '5bd31619f920ba73ca051541',
      username: 'jessjelly',
      name: 'Jess Jelly',
      avatar_url:
        'https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg',
      __v: 0
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <LoginBar
          login={this.login}
          logout={this.logout}
          loggedIn={this.state.loggedIn}
          user={this.state.user ? this.state.user : null}
        />
        <Auth user={this.state.user}>
          <Router>
            <Articles path="/" />
            <Articles path="/topics/:topic_slug" />
            <ArticlePage
              path="/articles/:article_id"
              user={this.state.user ? this.state.user : null}
              // userId={this.state.user ? this.state.user._id : null}
            />
            <Profile path="/users/:username" />
            <Write
              path="/write"
              userId={this.state.user ? this.state.user._id : null}
            />
          </Router>
        </Auth>
        <Footer />
      </div>
    );
  }

  login = username => {
    api
      .fetchUser(username)
      .then(user => this.setState({ user, loggedIn: true }));
  };

  logout = () => {
    this.setState({ user: null, loggedIn: false });
  };
}

export default App;
