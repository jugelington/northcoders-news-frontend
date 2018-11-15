import React, { Component } from 'react';

class SortArticles extends Component {
  render() {
    return (
      <select onChange={this.handleChange}>
        <option value="null">Sort by</option>
        <option value="votes descending">Loved</option>
        <option value="votes ascending">Hated</option>
        <option value="created_at descending">Newest</option>
        <option value="created_at ascending">Oldest</option>
      </select>
    );
  }

  handleChange = event => {
    const { value } = event.target;
    const sort = value.split(' ')[0];
    const direction = value.split(' ')[1];
    this.props.alterSort(sort, direction);
  };
}

export default SortArticles;
