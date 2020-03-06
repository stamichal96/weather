import React from 'react';

import Weather from './components/weather';
import Form from './components/form';

import './assets/weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const APIkey = "6110c71e90ea0c1327f49f21fd36b505";

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };
    this.getWeather();

    this.weatherIcon = {
      Thunderstrom: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Fog: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    }
  }

  getWeatherIcon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstrom })
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle })
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.weatherIcon.Rain })
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weatherIcon.Snow })
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: this.weatherIcon.Fog })
        break;
      case rangeID === 800:
        this.setState({ icon: this.weatherIcon.Clear })
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.weatherIcon.Clouds })
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds })
    }
  }

  calculateCelsius(temp) {
    let celsius = Math.floor(temp - 273.15)
    return celsius
  }

  getWeather = async (e) => {

    e.preventDefault()

    const city = e.target.elements.city.value
    const country = e.target.elements.country.value

    if (city && country) {
      const APIcall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`);
      const response = await APIcall.json()

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calculateCelsius(response.main.temp),
        temp_min: this.calculateCelsius(response.main.temp_min),
        temp_max: this.calculateCelsius(response.main.temp_max),
        description: response.weather[0].description,
      })
      this.getWeatherIcon(this.weatherIcon, response.weather[0].id)
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <div className="App">
        <Form
          load={this.getWeather}
          error={this.state.error}
        />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
