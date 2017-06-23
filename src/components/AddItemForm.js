import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

class AddItemForm extends Component {
  static PropTypes = {
    onAdd: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      imgUrl: ''
    };
  }

  onNameChange = e => {
    this.setState({name: e.target.value});
  }

  onDescriptionChange = e => {
    this.setState({description: e.target.value});
  }

  onImgUrlChange = e => {
    this.setState({imgUrl: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onAdd(this.state);
    this.setState({
      name: '',
      description: '',
      imgUrl: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className={css(styles.addForm)}>
        <label htmlFor="name">name: </label>
        <input className={css(styles.formInput)} type="text" value={this.state.name} onChange={this.onNameChange}/>

        <label htmlFor="description">description: </label>
        <input className={css(styles.formInput)} type="text" value={this.state.description} onChange={this.onDescriptionChange}/>

        <label htmlFor="imgUrl">Image Url: </label>
        <input className={css(styles.formInput)} type="text" value={this.state.imgUrl} onChange={this.onImgUrlChange}/>
        <input type="submit" value="Add!"/>
      </form> 
    );
  }
}

export default AddItemForm;


const styles = StyleSheet.create({
  addForm: {
    margin: '30px auto 75px auto',
    width: '70%'
  },
  formInput: {
    marginRight: '25px'
  }
});