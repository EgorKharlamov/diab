import React from 'react';
import { Link } from 'react-router-dom';

const List: React.FC = () => {
  return (
    <div className="App">
      <h1>Project List</h1>
      {/* Link to List.js */}
      <Link to={'./'}>

        <button >
                    Home page
        </button>
      </Link>
    </div>
  );
};

export default List;
