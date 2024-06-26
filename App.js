import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  PermissionsAndroid,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import LoginScreen from "./src/screens/Login";
import HomeScreen from "./src/screens/Home";
import CurrentOrder from "./src/screens/CurrentOrder";
import ProfileScreen from "./src/screens/Profile";
import Header from "./src/components/Header";
import * as Location from "expo-location";

const Tab = createBottomTabNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NavigationContainer>
      <StatusBar />
      {loggedIn ? (
        <SafeAreaView style={styles.container}>
          <Header location={location} />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: "#FFA500",
              tabBarInactiveTintColor: "#fff",
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home";
                } else if (route.name === "CurrentOrder") {
                  iconName = focused ? "clipboard-list" : "clipboard-list";
                } else if (route.name === "Profile") {
                  iconName = focused ? "user" : "user";
                }

                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="CurrentOrder" component={CurrentOrder} />
            <Tab.Screen name="Profile">
              {() => <ProfileScreen location={location} />}
            </Tab.Screen>
          </Tab.Navigator>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <LoginScreen />
        </SafeAreaView>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: "#007bff",
    borderTopWidth: 0,
    elevation: 0,
  },
});

export default App;
