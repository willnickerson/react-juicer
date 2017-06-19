import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Juice extends Component {
  static PropTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      ingredients: []
    };
  }

  componentDidMount() {
    this.setState({
      ingredients: [
        {
          name: 'carrot',
          _id: 1
        },
        {
          name: 'apple',
          _id: 2
        }
      ]
    });
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div className="juice-detail">
        <h3> { this.props.name } </h3>
        <p> { this.props.price } </p>
        <ul className="ingredients-list">
          {ingredients.map(ingredient => <li>{ingredient.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default Juice; 