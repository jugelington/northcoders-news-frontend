import React from 'react';
import PropTypes from 'prop-types';

const DeleteButton = ({ user, item, handleDelete, category }) => {
  return (
    <div className="delete-button">
      {user._id ===
        (item.created_by._id ? item.created_by._id : item.created_by) && (
        <button
          onClick={event => handleDelete(event, category)}
          value={item._id}
        >
          Delete
        </button>
      )}
    </div>
  );
};

DeleteButton.propTypes = {
  user: PropTypes.object,
  item: PropTypes.object,
  handleDelete: PropTypes.func,
  category: PropTypes.string
};
export default DeleteButton;
