import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import request from 'superagent';
import apiUrl from '../config';

class IngredientSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allIngredients: [],
      selectValue: '',
      addMessage: 'Add an Ingredient!'
    };
  }
  static PropTypes = {
    onAdd: PropTypes.func.isRequired,
    juiceIngredients: PropTypes.array.isRequired
  }

  componentDidMount() {
    request
      .get(`${apiUrl}/ingredients`)
      .end((err, res) => {
        this.setState({allIngredients: res.body});
      });
  }

  onChange = e => {
    this.setState({selectValue: e.target.value});
  }

  onSubmit = () => {
    const selectedId = this.state.selectValue;
    let hasIngredient = false;

    if(selectedId === '') {
      this.setState({addMessage: 'Select an ingredient'});
      return hasIngredient = true;
    }
    for(let i = 0; i < this.props.juiceIngredients.length; i++) {
      if(this.props.juiceIngredients[i]._id === selectedId) {
        this.setState({addMessage: 'Already has that ingredient'});
        return hasIngredient = true;
      }
    }

    if(!hasIngredient) {
      const newIngredient = this.state.allIngredients.find(ingredient => ingredient._id === this.state.selectValue);
      this.props.onAdd(newIngredient);
    }
  }

  render() {
    return (
      <div className={css(styles.addForm)}>
        <select onChange={this.onChange} value={this.state.selectValue}>
          <option value="">select an ingredient</option>
          {this.state.allIngredients.map((ingredient, map) => 
            <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
          )}
        </select>
        <button onClick={this.onSubmit}>Add</button>
        <p>{this.state.addMessage}</p>
      </div>
    );
  }
}

export default IngredientSelect;

const styles = StyleSheet.create({
  addForm: {
    textAlign: 'center',
    margin: '25px auto'
  }
});