import React, { Component } from 'react';
import Juice from './Juice';
import AddJuiceForm from './AddJuiceForm';

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
    console.log(this.juices);
    this.setState(this.state);
  }

  componentDidMount() {
    this.setState({
      juices: [
        {
          name: 'Green Machine',
          _id: 1,
          price: 7,
        },
        {
          name: 'Pear-adise',
          _id: 2,
          price: 8
        },
        {
          name: 'Supreme Green',
          _id: 3,
          price: 9
        }
      ]
    });
  }

  render() {
    const { juices } = this.state;

    return(
      <div className="juices-view">
        <h2>Juices</h2>
        {juices.map(juice => <Juice name= { juice.name } key={ juice._id }/>)}
        <h3>Add Juice</h3>
        <AddJuiceForm onAdd={this.onJuiceAdd}/>
      </div>
    );
  }

}


export default Juices;