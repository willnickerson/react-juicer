import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';
import styles from '../styles/detail';
import request from 'superagent';
import apiUrl from '../config';
import Ingredient from './Ingredient';
import EditName from './EditName';
import EditDescription from './EditDescription';
import IngredientSelect from './IngredientSelect';

class JuiceDetail extends Component {
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

  componentDidMount() {
    request
      .get(`${apiUrl}/juices/${this.props.match.params.juiceId}`)
      .end((err, res) => {
        this.setState({juice: res.body});
      });
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

  render() {
    const { juice } = this.state;
    return (
      <div className="juice-detail">

        <div className={css(styles.editControls)}>
          <Link to="/juices">Back to all juices</Link>
          <button onClick={this.onRemove}>delete</button>
          <button onClick={() => this.setState({showEdit: {
            name: true,
            description: true,
            imgUrl: false
          }
          })}>edit</button>
        </div>

        <div className={css(styles.title)}>
          <h2>{juice.name}</h2>
          {this.state.showEdit.name ? <EditName
            name={this.state.juice.name}
            onUpdate={this.onUpdateField}/> : null}
        </div>

        <div className={css(styles.left)}>
          <img src={this.state.juice.imgUrl} alt=""/>
        </div>

        <div className={css(styles.right)}>
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
                imgUrl={ingredient.imgUrl}
                onRemove={() => this.onRemoveIngredient(index)}/>)}
          </ul>
          <IngredientSelect 
            juiceIngredients={this.state.juice.ingredients} 
            onAdd={this.onAddIngredient}/>
        </div>

      </div>
    );
  }
}

export default JuiceDetail;

// const styles = StyleSheet.create({
//   title: {
//     textAlign: 'center'
//   },
//   editControls: {
//     textAlign: 'center',
//     margin: '20px auto'
//   },
//   left: {
//     width: '25%',
//     margin: '0 12.5%',
//     float: 'left'
//   },
//   right: {
//     width: '45%',
//     margin: '0 2.5%',
//     float: 'right'
//   }

// });