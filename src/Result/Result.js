import React from 'react';
import classes from './Result.module.css';

const Result = (props) => {
  return (
    <div className={classes.Result}>
      <p>Distance: <strong>{(props.lengthInMeters / 1000).toFixed(2)} KM</strong></p>
      <p>TravelTime: <strong>{(props.travelTimeInSeconds / 60).toFixed(2)} minutes</strong></p>
      <p>Traffic Delay: <strong>{(props.trafficDelayInSeconds / 60).toFixed(2)} minutes</strong></p>
      <p>DepartureTime: <strong>{props.departureTime}</strong></p>
      <p>ArrivalTime: <strong>{props.arrivalTime}</strong></p>
      <hr />
    </div>
  );
}

export default Result