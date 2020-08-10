import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SummaryRoutes from './Routes/SummaryDashboard';
import Team from './Routes/Team';


function App() {
  return (
    <div className="App">
        <Router>
          <Route path="/" exact component={SummaryRoutes}/>
          <Route path="/teams" component={Team}/>
        </Router>
    </div>
  );
}

export default App;