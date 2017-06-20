import React, { Component } from 'react';
import Juice from './Juice';
import AddJuiceForm from './AddJuiceForm';
import request from 'superagent';
import apiUrl from '../config';

class Juices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      juices: [],
    };
  }

  onJuiceAdd = juice => {
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

  componentDidMount() {
    request
      .get(`${apiUrl}/api/juices`)
      .end((err, res) => this.setState({juices: res.body}));
  }

  render() {
    const { juices } = this.state;

    return(
      <div className="juices-view">
        <h2>Juices</h2>
        {juices.map((juice, index) => <Juice 
          name= { juice.name } 
          key={ juice._id } 
          onRemove={() => this.onJuiceRemove(index)}
        />)}
        <h3>Add Juice</h3>
        <AddJuiceForm onAdd={this.onJuiceAdd}/>
      </div>
    );
  }

}


export default Juices;