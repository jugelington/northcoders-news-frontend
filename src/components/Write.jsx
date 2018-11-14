import React, { Component } from 'react';
import * as api from '../api';

class Write extends Component {
  state = {
    title: '',
    body: '',
    belongs_to: 'football'
  };

  render() {
    return (
      <main>
        <h1>What do you want to say?</h1>
        <form onSubmit={this.handleSubmit}>
          Title:{' '}
          <input
            id="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <br />
          Topic:
          <select id="belongs_to" onChange={this.handleChange}>
            <option value="football">Football</option>
            <option value="coding">Coding</option>
            <option value="cooking">Cooking</option>
          </select>
          <br />
          Body:{' '}
          <textarea
            value={this.state.body}
            onChange={this.handleChange}
            id="body"
          />
          <br />
          <button>Submit</button>
        </form>
      </main>
    );
  }

  handleChange = event => {
    const { value, id } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const article = {
      title: this.state.title,
      body: this.state.body,
      belongs_to: this.state.belongs_to,
      created_by: this.props.userId
    };

    api
      .postArticle(article, this.state.belongs_to)
      .then(res => this.props.navigate(`/articles/${res.newArticle._id}`));
  };
}

export default Write;
