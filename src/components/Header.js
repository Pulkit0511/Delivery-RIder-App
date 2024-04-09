import { View, Text } from "react-native";

export default Header = () => {
  return (
    <View
      style={{
        height: 50,
        backgroundColor: "lightgray",
        justifyContent: "center",
        paddingHorizontal: 10,
      }}
    >
      <Text>Current Location: Your Location</Text>
    </View>
  );
};
