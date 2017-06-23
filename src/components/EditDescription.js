import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditDescription extends Component {
  static PropTypes = {
    description: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description || ''
    };
  }

  onChange = e => {
    this.setState({description: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onUpdate('description', this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <textarea name="" id="" cols="60" rows="5" onChange={this.onChange} value={this.state.description} />
        <input type="submit" value="update"/>
      </form>
    );
  }
}

export default EditDescription;