import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';
import apiUrl from '../config';
import Ingredient from './Ingredient';
import EditName from './EditName';
import EditDescription from './EditDescription';
import IngredientSelect from './IngredientSelect';

class JuiceDetail extends Component {
  static PropTypes = {
    _id: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      allIngredients: [],
      juice: {
        ingredients: []
      },
      showEdit: {
        name: false,
        description: false,
        imgUrl: false,
      }
    };
  }

  onRemoveIngredient(index) {
    this.state.juice.ingredients.splice(index, 1);
    request
      .put(`${apiUrl}/juices/${this.state.juice._id}`)
      .send(this.state.juice)
      .end((err, res) => this.setState(this.state));
  }

  onRemove = () => {
    request
      .delete(`${apiUrl}/juices/${this.state.juice._id}`)
      .end((err, res) => this.props.history.push('/juices'));
  }

  onUpdateField = (field, childState) => {
    const newJuice = this.state.juice;
    const newShowEdit = this.state.showEdit;

    newJuice[field] = childState[field];
    newShowEdit[field] = false;

    request
      .put(`${apiUrl}/juices/${this.state.juice._id}`)
      .send(newJuice)
      .end((err, res) => {
        this.setState({
          juice: newJuice,
          showEdit: newShowEdit
        });
      });  
  }

  onAddIngredient = newIngredient => {
    const juiceIngredients = this.state.juice.ingredients;
    juiceIngredients.push(newIngredient);
    request
      .put(`${apiUrl}/juices/${this.state.juice._id}/ingredient/${newIngredient._id}`)
      .send(this.state.juice)
      .end((err, res) => {
        this.setState({addMessage: 'Add an ingredient!'});
        this.setState(this.state);
      });
  }
  componentDidMount() {
    request
      .get(`${apiUrl}/juices/${this.props.match.params.juiceId}`)
      .end((err, res) => {
        this.setState({juice: res.body});
      });
  }

  render() {
    const { juice } = this.state;
    return (
      <div>
        <h2>{juice.name} 
          <button onClick={this.onRemove}>delete</button>
          <button onClick={() => this.setState({showEdit: {
            name: true,
            description: true,
            imgUrl: false
          }
          })}>edit</button>
        </h2>
        {this.state.showEdit.name ? <EditName
          name={this.state.juice.name}
          onUpdate={this.onUpdateField}/> : null}

        <h4>Description</h4>
        <p>{juice.description}</p>

        {this.state.showEdit.description ? <EditDescription
          description={this.state.juice.description}
          onUpdate={this.onUpdateField}/> : null}

        <h4>Ingredients</h4>
        <ul className="ingredients-list">
          {juice.ingredients.map((ingredient, index) =>  
            <Ingredient name={ingredient.name} 
              description={ingredient.description} 
              _id={ingredient._id} 
              key={ingredient._id}
              onRemove={() => this.onRemoveIngredient(index)}/>)}
        </ul>
        <IngredientSelect 
          juiceIngredients={this.state.juice.ingredients} 
          onAdd={this.onAddIngredient}/>
      </div>
    );
  }
}

export default JuiceDetail;