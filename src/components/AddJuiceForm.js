import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddJuiceForm extends Component {
  static PropTypes = {
    onAdd: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: 0
    };
  }

  onNameChange = e => {
    this.setState({name: e.target.value});
  }

  onPriceChange = e => {
    this.setState({price: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onAdd(this.state);
    this.setState({
      name: '',
      price: '0'
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="name">name: </label>
        <input type="text" value={this.state.name} onChange={this.onNameChange}/>

        <label htmlFor="price">price: $</label>
        <input type="text" value={this.state.price} onChange={this.onPriceChange}/>
        <input type="submit" value="Add Juice"/>
      </form> 
    );
  }
}

export default AddJuiceForm;