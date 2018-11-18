import React from 'react';

const handleChange = (event, alterSort, category) => {
  const { value } = event.target;
  const sort = value.split(' ')[0];
  const direction = value.split(' ')[1];
  alterSort(sort, direction, category);
};

const SortItems = ({ alterSort, category }) => {
  return (
    <select onChange={event => handleChange(event, alterSort, category)}>
      <option value="null">Sort by</option>
      <option value="votes descending">Loved</option>
      <option value="votes ascending">Hated</option>
      <option value="created_at descending">Newest</option>
      <option value="created_at ascending">Oldest</option>
    </select>
  );
};
export default SortItems;
