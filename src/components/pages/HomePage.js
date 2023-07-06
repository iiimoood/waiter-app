import React from 'react';
import Tables from '../features/Tables';

const HomePage = () => {
  return (
    <div>
      <span className="row me-1 mb-3">
        <h1 className="col-9 col-md-10 col-xl-11">All tables</h1>
      </span>
      <Tables />
    </div>
  );
};

export default HomePage;
