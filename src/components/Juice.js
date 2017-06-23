import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import styles from '../styles/item';
import request from 'superagent';
import apiUrl from '../config';

class Juice extends Component {
  static PropTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    imgUrl: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      ingredients: []
    };
  }

  componentDidMount() {
    request
      .get(`${apiUrl}/juices/${this.props._id}`)
      .end((err, res) => this.setState({ ingredients: res.body.ingredients }));
  }

  render() {
    const { ingredients } = this.state;
    
    return (
      <div className={css(styles.item)}>
        <Link to={`/juices/${this.props._id}`}>
          <h3> { this.props.name }</h3>
        </Link>
        <button onClick={this.props.onRemove} className="delete-button">remove</button>
        <img className={css(styles.itemImage)} src={this.props.imgUrl}/>
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {ingredients.map(ingredient => <li key={ ingredient._id }>- { ingredient.name }</li>)}
        </ul>
      </div>
    );
  }
}

export default Juice; 