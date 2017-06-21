import React, { Component } from 'react';
import PropTypes from 'prop-types';

class JuiceDetail extends Component {
  static PropTypes = {
    _id: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      allIngredients: []
    };
  }

  componentDidMount() {
    this.props._id = this.props.match.params.juiceId;
  }

  render() {
    return (
      <div>
        <h1>Working </h1>
        <p>{this.props.match.params.juiceId}</p>
      </div>
    );
  }
}

export default JuiceDetail;