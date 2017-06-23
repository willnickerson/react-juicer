import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Ingredient = props => {
  return(
    <div className="ingredient">
      <h3>
        <Link to={`/ingredients/${props._id}`}> {props.name} </Link>
        <button className="delete-button" onClick={props.onRemove}>X</button>
      </h3>
      {props.imgUrl ? <img src={props.imgUrl}/> : null}
      <p> {props.description} </p>
    </div>
  );
};

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string,
  onRemove: PropTypes.func.isRequired
};

export default Ingredient;