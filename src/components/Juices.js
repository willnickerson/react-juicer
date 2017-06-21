import React from 'react';
import { Route, Switch } from 'react-router-dom';
import JuiceDetail from './JuiceDetail';
import AllJuices from './AllJuices';

export default function Juices(props) {
  return(
    <div> 
        <Switch>
          <Route exact path='/juices' component={ AllJuices }/>}/>
          <Route path='/juices/:juiceId' component={ JuiceDetail }/>
        </Switch>
    </div>
  );
}