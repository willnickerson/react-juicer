import React, { Component } from 'react';
import Ingredient from './Ingredient';
import AddItemForm from './AddItemForm';
import request from 'superagent';
import apiUrl from '../config';

class AllIngredients extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ingredients: []
    };
  }

  componentDidMount() {
    request
      .get(`${apiUrl}/ingredients`)
      .end((err, res) => this.setState({ingredients: res.body}));
  }

  onIngredientAdd = ingredient => {
    request
      .post(`${apiUrl}/ingredients`)
      .send(ingredient)
      .end((err ,res) => {
        this.state.ingredients.push(res.body);
        this.setState(this.state);
      });
  }

  onIngredientRemove = index => {
    request
      .delete(`${apiUrl}/ingredients/${this.state.ingredients[index]._id}`)
      .end((err, res) => {
        this.state.ingredients.splice(index, 1);
        this.setState(this.state);
      });
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <h1> All Ingredients </h1>
        {ingredients.map((ingredient, index) => 
          <Ingredient
            key = { ingredient._id }
            name = { ingredient.name } 
            _id = { ingredient._id }
            description = { ingredient.description }
            imgUrl = { ingredient.imgUrl }
            onRemove={() => this.onIngredientRemove(index)}
          />)}

          <h3>Add Ingredient </h3>
          <AddItemForm onAdd={ this.onIngredientAdd }/>
      </div>  
    );
  }
}

export default AllIngredients;