import React, { Component } from 'react';
import Juice from './Juice';
import AddItemForm from './AddItemForm';
import request from 'superagent';
import apiUrl from '../config';

class AllJuices extends Component {

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
    request
      .post(`${apiUrl}/juices`)
      .send(juice)
      .end((err ,res) => {
        this.state.juices.push(res.body);
        this.setState(this.state);
      });
  }

  onJuiceRemove = index => {
    request
      .delete(`${apiUrl}/juices/${this.state.juices[index]._id}`)
      .end((err, res) => {
        this.state.juices.splice(index, 1);
        this.setState(this.state);
      });
  }

  render() {
    const { juices } = this.state;
    return (
      <div>
        <h1> All Juices </h1>
        {juices.map((juice, index) => 
          <Juice
            imgUrl = { juice.imgUrl }
            key = { juice._id }
            name = { juice.name } 
            _id = { juice._id }
            onRemove={() => this.onJuiceRemove(index)}
          />)}
          <h2>Add Juice</h2>
          <AddItemForm onAdd={ this.onJuiceAdd }/>
      </div>  
    );
  }
}

export default AllJuices;