import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IngredientDetail from './IngredientDetail';
import AllIngredients from './AllIngredients';

export default function Ingredients(props) {
  return(
    <div> 
        <Switch>
          <Route exact path='/ingredients' component={ AllIngredients }/>}/>
          <Route path='/ingredients/:ingredientId' component={ IngredientDetail }/>
        </Switch>
    </div>
  );
}