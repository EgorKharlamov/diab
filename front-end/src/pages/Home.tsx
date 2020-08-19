import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="App">
      <h1>Project Home</h1>
      {/* Link to List.js */}
      
      <Link to={'./list'}>
        <button >
                  My List
        </button>
      </Link>
    </div>
  );
};

export default Home;
