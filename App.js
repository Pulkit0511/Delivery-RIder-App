import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import LoginScreen from "./src/screens/Login";
import HomeScreen from "./src/screens/Home";
import CurrentOrder from "./src/screens/CurrentOrder";
import ProfileScreen from "./src/screens/Profile";
import Header from "./src/components/Header";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {loggedIn ? (
        <SafeAreaView style={styles.container}>
          {/* Status bar with current location */}
          <Header />
          {/* Tab navigator */}
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
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
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
