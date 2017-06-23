import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route, 
  Link 
} from 'react-router-dom';
import './App.css';
import { StyleSheet, css } from 'aphrodite';
import Home from './components/Home';
import Juices from './components/Juices';
import Ingredients from './components/Ingredients';

export default  function App(props) {
  return (
    <Router>
      <div className="App">
        <div className={css(styles.appHeader)}>
          <h1>ReactJuicer</h1>
          <div className={css(styles.nav)}>
            <li className={css(styles.navItem)}>
              <Link className={css(styles.navLink)} to="/">Home</Link>
            </li>
            <li className={css(styles.navItem)}>
              <Link className={css(styles.navLink)} to="/juices">Juices</Link>
            </li>
            <li className={css(styles.navItem)}>
              <Link className={css(styles.navLink)} to="/ingredients">Ingredients</Link>   
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

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: '#222',
    height: '150px',
    padding: '20px',
    color: 'white',
    textAlign: 'center'
  },

  nav: {
    listStyleType: 'none',
    textDecoration: 'none',
  },

  navItem: {
    display: 'inline-block',
    margin: '0 20px',
  },

  navLink: {
    color: 'white',
    textDecoration: 'none'
  }
});
