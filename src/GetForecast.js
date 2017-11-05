import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import CurrentWeather from './CurrentWeather';
import SpinnerLoader from './SpinnerLoader';

class GetForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.initialLat,
      long: props.initialLong,
      temp: null,
      text: "",
      code: "",
      location: "",
      forecast: [],
      loaded: false
    };

    this._handleGeoPosition = this._handleGeoPosition.bind(this);
    this._retrieveWeather = this._retrieveWeather.bind(this);
  }

  _retrieveWeather() {
    $.ajax({
      url: 'https://simple-weather.p.mashape.com/weatherdata?lat=' + this.state.lat + '&lng=' + this.state.long,
      dataType: 'json',
      cache: false,
      success: function(response) {
        console.log('res', response.query.results.channel.item.condition)
        this.setState({
          temp: ''+(Math.round((9.0/5.0)*response.query.results.channel.item.condition.temp+32.0)),
          text: response.query.results.channel.item.condition.text,
          code: response.query.results.channel.item.condition.code,
          location: response.query.results.channel.location.city,
          forecast: response.query.results.channel.item.forecast,
          loaded: true
        });
        //console.log(response.query.results.channel.item);
      }.bind(this),
      error: function(err) {
        console.log(err);
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", "Fjf77FOibZmshKCEuVDW3cWTiSu1p1zQ8TjjsnwEA3jel5W7TQ");
      }
    });
  }

  _handleGeoPosition(coords) {
    this.setState({
      lat: coords.coords.latitude,
      long: coords.coords.longitude
    });
    this._retrieveWeather();
  }

  _getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._handleGeoPosition);
    } else {
      alert("Geolocation failed. Please use https or enable location in your browser");
    }
  }

  componentDidMount() {
    this._getLocation();
  }

  render() {
    const hasLoaded = this.state.loaded;
    return (
      <div>
        {(hasLoaded) ? <CurrentWeather {...this.state} /> : <SpinnerLoader />}
      </div>
    );
  }
}

// Prop Types
GetForecast.defaultProps = {
  initialLat: 40.7128,
  initialLong: 74.0060
};

GetForecast.propTypes = {
  initialLat: PropTypes.number.isRequired,
  initialLong: PropTypes.number.isRequired
};

export default GetForecast;
