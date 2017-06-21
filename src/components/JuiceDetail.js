import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';
import apiUrl from '../config';
import Ingredient from './Ingredient';

class JuiceDetail extends Component {
  static PropTypes = {
    _id: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      allIngredients: [],
      juice: {
        ingredients: []
      }
    };
  }
  onRemoveIngredient(index) {
    this.state.juice.ingredients.splice(index, 1);
    this.setState(this.state);
  }
  componentDidMount() {
    request
      .get(`${apiUrl}/api/juices/${this.props.match.params.juiceId}`)
      .end((err, res) => {
        this.setState({juice: res.body});
      });
    
    request
      .get(`${apiUrl}/api/ingredients`)
      .end((err, res) => {
        this.setState({allIngredients: res.body});
      });
  }

  render() {
    const { juice } = this.state;
    const { allIngredients } = this.state;
    return (
      <div>
        <h2>{juice.name} </h2>
        <h4>Description</h4>
        <p>{juice.description}</p>
        <h4>Ingredients</h4>
        <ul className="ingredients-list">
          {juice.ingredients.map((ingredient, index) =>  
            <Ingredient name={ingredient.name} 
              description={ingredient.description} 
              _id={ingredient._id} 
              key={ingredient._id}
              onRemove={() => this.onRemoveIngredient(index)}/>)}
        </ul>

        <select>
          {allIngredients.map((ingredient, map) => 
            <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
          )}
        </select>
      </div>
    );
  }
}

export default JuiceDetail;