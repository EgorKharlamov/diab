import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import './App.css';
import {requester} from './helpers/requester';

const App: React.FC = () => {
  const [data, setData] = useState<string>();

  useEffect(()=>{
    const getUser = async() => {
      return await requester(`{me 
        {login 
          {login pass email {value verified} phone {value}}
        }
      }`).then((result) => {
        if (result.data.errors) {
          return setData(result.data.errors[0].message);
        }
      });
    };
    getUser();
  },[]);

  return !data ? (<span>Loading...</span>) : (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/list' component={List}/>
      </Switch>
      <div>{data}</div>
    </div>
  );
};

export default App;
