import React, { Component } from 'react';

class Juices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      juices: []
    };
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
        {juices.map(juice =>
          <div className="juice">
            <h3> {juice.name} </h3>
            <p> ${juice.price}.00 </p>
          </div>
        )}
      </div>
    );
  }

}


export default Juices;