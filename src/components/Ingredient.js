import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';


const Ingredient = props => {
  return(
    <div className="ingredient">
      <h4>{props.name} <button onClick={props.onRemove}>X</button></h4>
      <p> {props.description} </p>
    </div>
  );
};

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Ingredient;