import React from 'react';
import PropTypes from 'prop-types';

const Error = ({
  location: {
    state: { status, msg }
  }
}) => {
  return (
    <main>
      <div id="error-box">
        <h2>
          Error - {status} <br />
          {msg}
        </h2>
      </div>
    </main>
  );
};

Error.propTypes = {
  location: PropTypes.object
};

export default Error;
