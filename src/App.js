import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route, 
  Link 
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Juices from './components/Juices';
import Ingredients from './components/Ingredients';

export default  function App(props) {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <h1>ReactJuicer</h1>
          <div className="nav">
            <li className="nav-link">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="/juices">Juices</Link>
            </li>
            <li className="nav-link">
              <Link to="/ingredients">Ingredients</Link>   
            </li>
          </div>
        </div>
          <Switch>
            <Route path="/juices" component={ Juices }/>
            <Route path="/ingredients" component={ Ingredients }/>
            <Route redirect="/" component={ Home }/>
          </Switch>
      </div>
    </Router>
  );
}
