
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Nav from './Components/Nav';
import Data from './Components/Data';
import Home from './Components/Home'



 

function App() {
  


  return (

    <div className=''>
    <Router>
        <Nav active={'home'} />
        <Route exact path={'/'}  component= {Home}/>
        <Route path={'/data'} component={Data}/>
    
    </Router>
</div>


    
  );
}

export default App;
