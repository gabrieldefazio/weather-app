import React from 'react';
import PropTypes from 'prop-types';

function DailyForecast({ dailyForecast }) {
  return (
    <tr>
      <td>{dailyForecast.day}</td>
      <td><i className={'weather-small icon-' + dailyForecast.code}></i></td>
      <td>{(Math.round((9.0/5.0)*dailyForecast.high+32.0)) + ' / ' + (Math.round((9.0/5.0)*dailyForecast.low+32.0))}</td>
    </tr>
  );
};

DailyForecast.propTypes = {
  dailyForecast: PropTypes.object.isRequired
};

export default DailyForecast;
