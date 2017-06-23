import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditName from './EditName';
import EditDescription from './EditDescription';

import request from 'superagent';
import apiUrl from '../config';

class IngredientDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredient: {},
      showEdit: {
        name: false,
        description: false,
        imgUrl: false,
      }
    };
  }
  componentDidMount() {
    request
      .get(`${apiUrl}/ingredients/${this.props.match.params.ingredientId}`)
      .end((err, res) => {
        this.setState({ingredient: res.body});
      });
  }

  onRemove = () => {
    request
      .delete(`${apiUrl}/ingredients/${this.state.ingredient._id}`)
      .end((err, res) => this.props.history.push('/ingredients'));
  }

  onUpdateField = (field, childState) => {
    const newIngredient = this.state.ingredient;
    const newShowEdit = this.state.showEdit;

    newIngredient[field] = childState[field];
    newShowEdit[field] = false;

    request
      .put(`${apiUrl}/ingredients/${this.state.ingredient._id}`)
      .send(newIngredient)
      .end((err, res) => {
        this.setState({
          ingredient: newIngredient,
          showEdit: newShowEdit
        });
      });  
  }

  render() {
    const { ingredient } = this.state;
    return (
      <div>
        <div className="edit-controls">
          <Link to="/ingredients">Back to all juices</Link>
          <button className="delete-button" onClick={this.onRemove}>delete</button>
          <button onClick={() => this.setState({showEdit: {
            name: true,
            description: true,
            imgUrl: false
          }
          })}>edit</button>
        </div>
        <h2>{ ingredient.name }</h2>
        {this.state.showEdit.name ? <EditName
          name={this.state.ingredient.name}
          onUpdate={this.onUpdateField}/> : null}
        <img src={ ingredient.imgUrl } alt=""/>
        <div className="description">
            <p>{ ingredient.description }</p>

          {this.state.showEdit.description ? <EditDescription
            description={this.state.ingredient.description}
            onUpdate={this.onUpdateField}/> : null}
        </div>
      </div>

    );
  }
}

export default IngredientDetail;