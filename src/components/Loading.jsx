import Loader from 'react-loader-spinner';
import React from 'react';

const Loading = () => {
  return (
    <div className="loader">
      <Loader
        type="ThreeDots"
        color="rgb(41, 41, 41)"
        height="100"
        width="100"
      />
    </div>
  );
};

export default Loading;
