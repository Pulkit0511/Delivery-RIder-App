import React from "react";
import { View, Text } from "react-native";

const Header = ({ location }) => {
  return (
    <View
      style={{
        height: 50,
        backgroundColor: "lightgray",
        justifyContent: "center",
        paddingHorizontal: 10,
      }}
    >
      <Text>
        Current Location:{" "}
        {location ? `${location.latitude}, ${location.longitude}` : "Unknown"}
      </Text>
    </View>
  );
};

export default Header;
