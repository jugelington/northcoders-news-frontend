import React from 'react';

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

export default DeleteButton;
