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
      1000
    );
    setInterval(
      () => this.PowerSaveMode(),
      1000
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

  changePowerSaveMode(e){
    e.preventDefault();
    axios
        .post('https://thermostat-api.herokuapp.com/thermostats/1/power-save-mode')
  }

  PowerSaveMode() {
    const inPowerSaveMode = this.state.thermostat.power_save_mode;
      if (inPowerSaveMode) {
        return (
          <a href="#" role="button" onClick={this.changePowerSaveMode}><img className="psm" alt="Power Save Mode is On" src="psm_on.png" /></a>
        )} else
        return (
          <a href="#" role="button" onClick={this.changePowerSaveMode}><img className="psm" alt="Power Save Mode is Off" src="psm_off.png"/></a>
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
            <a className="increase-temp" onClick={this.increaseTemperature}>+</a>
            <a className="decrease-temp" onClick={this.decreaseTemperature}>-</a>
        </div>
		    </div>
      </div>
    )
  }
}

export default App;
