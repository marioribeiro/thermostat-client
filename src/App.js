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
    setInterval(
      () => this.PowerSaveMode(),
      2000
    );
  }

  updateTemperature() {
    var _this = this;
    _this.serverRequest =
      axios
        .get('https://thermostat-api.herokuapp.com/thermostats/1')
        .then(function(response) {
          _this.setState({
            thermostat: response.data.thermostat
          });
        })
  }

  PowerSaveMode() {
    const inPowerSaveMode = this.state.thermostat.power_save_mode;
      if (inPowerSaveMode) {
        return (
          <img className="psm" alt="Power Save Mode is On" src="psm_on.png" />
        )} else
        return (
          <img className="psm" alt="Power Save Mode is Off" src="psm_off.png" />
        )}

  increaseTemperature(){
    axios
      .post('https://thermostat-api.herokuapp.com/thermostats/1/temperature/increase')
  }

  decreaseTemperature(){
    axios
      .post('https://thermostat-api.herokuapp.com/thermostats/1/temperature/decrease')
  }

  render() {
    return (
      <div className="container">
        <div className="thermostat">
			    <div className="temperature">{ this.state.thermostat.temperature }<span className="degrees">&deg;C</span></div>
          <div className="power-save-mode">{ this.PowerSaveMode() }</div>
			    <div className="thermostat-number">Thermostat { this.state.thermostat.id }</div>
          <div className="controls">
            <a className="increase-temp" onClick={this.increaseTemperature} >+</a>
            <a className="decrease-temp" onClick={this.decreaseTemperature}>-</a>
        </div>
		    </div>
      </div>
    )
  }
}

export default App;
