import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "565a8c5f2e82722d20074f009fd4ed39";

export default class extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
        name,
        sys: { country },
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      temp,
      condition: weather[0].main,
      city: name,
      country,
    });
  };

  getLoctaion = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you", "so saaad");
    }
  };

  componentDidMount() {
    this.getLoctaion();
  }

  render() {
    const { isLoading, temp, condition, city, country } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather
        temp={Math.round(temp)}
        condition={condition}
        city={city}
        country={country}
      />
    );
  }
}
