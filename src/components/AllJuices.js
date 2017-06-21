import React, { Component } from 'react';
import Juice from './Juice';
import PropTypes from 'prop-types';
import AddJuiceForm from './AddJuiceForm';
import request from 'superagent';
import apiUrl from '../config';

class AllJuices extends Component {
  static PropTypes = {
    juices: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      juices: []
    };
  }

  componentDidMount() {
    request
      .get(`${apiUrl}/juices`)
      .end((err, res) => this.setState({juices: res.body}));
  }

  onJuiceAdd = juice => {
    //make a call to API to post
    let nextId = this.state.juices.length + 1;
    this.state.juices.push({
      name: juice.name,
      price: juice.price,
      _id: nextId
    });
    this.setState(this.state);
  }

  onJuiceRemove = index => {
    //make call to api to delete juice from DB
    this.state.juices.splice(index, 1);
    this.setState(this.state);
  }

  render() {
    const { juices } = this.state;
    return (
      <div>
        <h1> All Juices </h1>
        {juices.map((juice, index) => 
          <Juice
            key = { juice._id }
            name = { juice.name } 
            _id = { juice._id }
            onRemove={() => this.onJuiceRemove(index)}
          />)}
          <h3>Add Juice</h3>
          <AddJuiceForm onAdd={ this.onJuiceAdd }/>
      </div>  
    );
  }
}

export default AllJuices;