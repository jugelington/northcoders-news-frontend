import React, { Component } from 'react';

class SortArticles extends Component {
  render() {
    return (
      <select onChange={this.handleChange}>
        <option value="null">Sort by</option>
        <option value="votes">Most Popular</option>
        <option value="created_at">Most Recent</option>
      </select>
    );
  }

  handleChange = event => {
    this.props.alterSort(event.target.value);
  };
}

export default SortArticles;
