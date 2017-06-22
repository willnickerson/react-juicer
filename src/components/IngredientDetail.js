import React, { Component } from 'react';
import request from 'superagent';
import apiUrl from '../config';

class IngredientDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: {}
    };
  }
  componentDidMount() {
    request
      .get(`${apiUrl}/ingredients/${this.props.match.params.ingredientId}`)
      .end((err, res) => {
        this.setState({ingredient: res.body});
      });
  }

  render() {
    const { ingredient } = this.state;
    return (
      <h3>{ingredient.name}</h3>
    );
  }
}

export default IngredientDetail;