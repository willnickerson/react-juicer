import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route, 
  Link 
} from 'react-router-dom';
import './App.css';
import Juices from './components/Juices';
import Ingredients from './components/Ingredients';
// import JuiceDetail from './components/JuiceDetail';

export default  function App(props) {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <h2>React Juicer</h2>
          <div className="nav">
            <li className="nav-link">
              <Link to="/juices">Juices</Link>
            </li>
            <li className="nav-link">
              <Link to="/ingredients">Ingredients</Link>   
            </li>
          </div>
        </div>
        <p className="App-intro">
          Let's make some juice!
        </p>
        <Switch>
          <Route path="/juices" component={ Juices }/>
          <Route path="/ingredients" component={ Ingredients }/>
          <Route redirect="/"/>
        </Switch>
      </div>
    </Router>
  );
}
