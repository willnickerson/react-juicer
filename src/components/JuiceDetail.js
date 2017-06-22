import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from 'superagent';
import apiUrl from '../config';
import Ingredient from './Ingredient';
import EditName from './EditName';
import EditDescription from './EditDescription';

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
      selectValue: '',
      hasIngredient: false,
      addMessage: 'Add an ingredient!',
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
      .end((err, res) => {
        if(err) console.error(err); //eslint-disable-line
        this.props.history.push('/juices');
      });
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

  onSelectChange = e => {
    this.setState({selectValue: e.target.value});
  }

  onAddIngredient = () => {
    const selectedId = this.state.selectValue;
    const juiceIngredients = this.state.juice.ingredients;
    let hasIngredient = false;
    if(selectedId === '') {
      this.setState({addMessage: 'Select an ingredient'});
      return hasIngredient = true;
    }
    for(let i = 0; i < juiceIngredients.length; i++) {
      if(juiceIngredients[i]._id === selectedId) {
        this.setState({addMessage: 'Already has that ingredient'});
        return hasIngredient = true;
      }
    }
    if(!hasIngredient) {
      const newIngredient = this.state.allIngredients.find(ingredient => ingredient._id === this.state.selectValue);
      juiceIngredients.push(newIngredient);
      request
        .put(`${apiUrl}/juices/${this.state.juice._id}/ingredient/${selectedId}`)
        .send(this.state.juice)
        .end((err, res) => {
          this.setState({addMessage: 'Add an ingredient!'});
          this.setState(this.state);
        });
    }
  }
  componentDidMount() {
    request
      .get(`${apiUrl}/juices/${this.props.match.params.juiceId}`)
      .end((err, res) => {
        this.setState({juice: res.body});
      });
    
    request
      .get(`${apiUrl}/ingredients`)
      .end((err, res) => {
        this.setState({allIngredients: res.body});
      });
  }

  render() {
    const { juice } = this.state;
    const { allIngredients } = this.state;
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
        <div className="add-ingredient">
          <select onChange={this.onSelectChange} value={this.state.selectValue}>
            <option value="">select an ingredient</option>
            {allIngredients.map((ingredient, map) => 
              <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
            )}
          </select>
          <button onClick={this.onAddIngredient}>Add</button>
          <p>{this.state.addMessage}</p>
        </div>
      </div>
    );
  }
}

export default JuiceDetail;