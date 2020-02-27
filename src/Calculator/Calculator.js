import React, { Component } from "react";
import axios from "axios";

import classes from "./Calculator.module.css";
import Result from '../Result/Result';

class Calculator extends Component {
  state = {
    apiKey: "uHkAGJkTzX9PzOijHv5DmohLuxeTv6hJ",
    origin: "15.047528,120.688474",
    destinationList: "14.552333,121.004194:14.598770,120.974470",
    isValid: true,
    error: "",
    results: null
  };

  calculate = event => {
    event.preventDefault();

    const baseUrl = "https://api.tomtom.com/routing/1/calculateRoute/";

    // const origin = "15.047528,120.688474";
    // const dest = "14.552333,121.004194:14.598770,120.974470";

    let url =
      baseUrl +
      `${this.state.origin.trim()}:${this.state.destinationList.trim()}/json?avoid=unpavedRoads&key=${this.state.apiKey.trim()}`;
    axios
      .get(url)
      .then(response => {
        let legs = null;
        console.log(response.data);

        if (response.data.routes.length > 0) {
          legs = response.data.routes[0].legs.map((leg, i) => {
            return <Result key={i} {...leg.summary} />;
          });
        }
        this.setState({ results: legs });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: "Encountered an error. Please check provided values."
        });
      });
    // console.log("Calculated", this.state.origin, this.state.destinationList);
  };

  apiKeyHandler = event => {
    this.setState({ apiKey: event.target.value });
  };

  originHandler = event => {
    this.setState({ origin: event.target.value });
  };

  destinationHandler = event => {
    this.setState({ destinationList: event.target.value });
  };

  checkValidity = () => {
    let isValid = true;

    isValid = this.state.apiKey.trim().length > 0 && isValid;
    isValid = this.state.origin.trim().length > 0 && isValid;
    isValid = this.state.destinationList.trim().length > 0 && isValid;

    this.setState({ isValid: isValid });
  };

  render() {
    // console.log("[render]", this.state);

    const results = this.state.results;
    // this.calculate();
    return (
      <div className={classes.Calculator}>
        <h1>Distance Calculator</h1>
        <form onSubmit={this.calculate}>
          <p>
            Provide your <a href="https://developer.tomtom.com/">TomTom</a> API Key. The provided key might run out of free
            credits if used many times.
          </p>
          <input
            type="text"
            name="apiKey"
            onChange={this.apiKeyHandler}
            value={this.state.apiKey}
          />
          <p>
            Provide the origin coordinates. For example: 15.047528,120.688474
          </p>
          <input
            type="text"
            name="origin"
            onChange={this.originHandler}
            value={this.state.origin}
            placeholder="Origin Coordinates"
          />
          <p>Provide destination coordinates separated by colon (:)</p>
          <p>For example: 14.552333,121.004194:14.598770,120.974470</p>
          <textarea
            name="destinations"
            rows="10"
            value={this.state.destinationList}
            onChange={this.destinationHandler}
          />
        </form>
        <button onClick={this.calculate} disabled={!this.state.isValid}>
          Calculate
        </button>
        <h3>Results:</h3>
        {results}
        {this.state.error.length > 0 ? (
          <p className={classes.error}>{this.state.error}</p>
        ) : null}
        <p>Source code available here: <a href="https://github.com/mamertofabian/distance-calculator">https://github.com/mamertofabian/distance-calculator</a></p>
      </div>
    );
  }
}

export default Calculator;
