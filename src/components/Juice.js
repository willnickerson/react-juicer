import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import request from 'superagent';
import apiUrl from '../config';

class Juice extends Component {
  static PropTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      ingredients: []
    };
  }

  componentDidMount() {
    request
      .get(`${apiUrl}/api/juices/${this.props._id}`)
      .end((err, res) => this.setState({ ingredients: res.body.ingredients }));
  }

  render() {
    const { ingredients } = this.state;
    
    return (
      <div className="juice">
        <Link key={ this.props._id } to={`/juices/${this.props._id}`}>
          <h3> { this.props.name }</h3>
        </Link>
        <button onClick={this.props.onRemove}>remove</button>
        <p> { this.props.price } </p>
        <ul className="ingredients-list">
          {ingredients.map(ingredient => <li key={ ingredient._id }>{ ingredient.name }</li>)}
        </ul>
      </div>
    );
  }
}

export default Juice; 