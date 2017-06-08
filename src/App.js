import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { thermostat: [] }
  }

  componentDidMount() {
    var _this = this;
    this.serverRequest =
      axios
        .get('https://thermostat-api.herokuapp.com/thermostats/1')
        .then(function(response) {
          _this.setState({
            thermostat: response.data.thermostat
          });
        })
  }

  render() {
    return (
      <div>
        <h1>Thermostat Number { this.state.thermostat.id }</h1>
        <h2>Current Temperature: { this.state.thermostat.temperature }&deg;C</h2>
      </div>
    )
  }
}

export default App;
