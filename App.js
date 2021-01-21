import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";

export default class extends React.Component {
  getLoctaion = async () => {
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
  };

  componentDidMount() {
    this.getLoctaion();
  }

  reder() {
    return <Loading />;
  }
}
