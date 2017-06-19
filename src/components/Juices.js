import React, { Component } from 'react';
import Juice from './Juice';
import AddJuiceForm from './AddJuiceForm';
import request from 'superagent';

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
      .get('http://earth-house.herokuapp.com/api/juices')
      .end((err, res) => this.setState({juices: res.body}));
    
    // this.setState({
    //   juices: [
    //     {
    //       name: 'Green Machine',
    //       _id: 1,
    //       price: 7,
    //     },
    //     {
    //       name: 'Pear-adise',
    //       _id: 2,
    //       price: 8
    //     },
    //     {
    //       name: 'Supreme Green',
    //       _id: 3,
    //       price: 9
    //     }
    //   ]
    // });
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