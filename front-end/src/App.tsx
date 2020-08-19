import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import './App.css';

import axios from 'axios';

const App: React.FC = () => {
  const [data, setData] = useState({res: []});


  
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/list' component={List}/>
      </Switch>
    </div>
  );
};

export default App;
