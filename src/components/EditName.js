import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditName extends Component {
  static PropTypes = {
    name: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || ''
    };
  }

  onChange = e => {
    this.setState({name: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onUpdate('name', this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.state.name} onChange={this.onChange}/> 
        <input type="submit" value="update"/>
      </form>
    );
  }
}

export default EditName;