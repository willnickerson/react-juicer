import React, { Component } from 'react';
import Ingredient from './Ingredient';
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

  // onJuiceAdd = juice => {
  //   request
  //     .post(`${apiUrl}/juices`)
  //     .send(juice)
  //     .end((err ,res) => {
  //       this.state.juices.push(res.body);
  //       this.setState(this.state);
  //     });
  // }

  // onJuiceRemove = index => {
  //   request
  //     .delete(`${apiUrl}/juices/${this.state.juices[index]._id}`)
  //     .end((err, res) => {
  //       this.state.juices.splice(index, 1);
  //       this.setState(this.state);
  //     });
  // }

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
            onRemove={() => this.onJuiceRemove(index)}
          />)}
          {/*<h3>Add Juice</h3>
          <AddJuiceForm onAdd={ this.onJuiceAdd }/>*/}
      </div>  
    );
  }
}

export default AllIngredients;