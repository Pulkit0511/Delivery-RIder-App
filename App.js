import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/Home";
import CurrentOrder from "./src/screens/CurrentOrder";
import ProfileScreen from "./src/screens/Profile";
import Header from "./src/components/Header";

// Tab navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {/* Status bar with current location */}
        <Header />
        {/* Tab navigator */}
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="CurrentOrder" component={CurrentOrder} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default App;
