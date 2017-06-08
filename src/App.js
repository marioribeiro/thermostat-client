import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { thermostat: [] }
  }

  componentDidMount() {
    this.updateTemperature();
    setInterval(
      () => this.updateTemperature(),
      2000
    );
  }

  updateTemperature() {
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
      <div className="container">
        <div className="thermostat-info">
          <h1>Thermostat Number { this.state.thermostat.id }</h1>
          <h2>Current Temperature: { this.state.thermostat.temperature }&deg;C</h2>
        </div>
      </div>
    )
  }
}

export default App;
