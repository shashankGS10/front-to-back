import { View, Text, Button } from "react-native";
import React from "react";
import { Link } from "@react-navigation/native";

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Link to="/Fetch">
        <Text>Get Pokemons using Fetch</Text>
      </Link>
      <Link to="/Axios">
        <Text>Get Pokemons using Axios</Text>
      </Link>
      <Link to="/AsyncFetch">
        <Text>Get Pokemons using Async Fetch</Text>
      </Link>
      <Link to="/AsyncAxios">
        <Text>Get Pokemons using Async Axios</Text>
      </Link>
      <Link to="/ErrorDay">
        <Text>Error Test</Text>
      </Link>
    </View>
  );
};

export default HomeScreen;
