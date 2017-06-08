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
        <div className="thermostat">
			    <div className="temperature">{ this.state.thermostat.temperature }<span className="degrees">&deg;C</span></div>
			    <div className="thermostat-number">Thermostat { this.state.thermostat.id }</div>
		    </div>
      </div>
    )
  }
}

export default App;
