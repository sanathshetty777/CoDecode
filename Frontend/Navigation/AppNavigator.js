// AppNavigator.js
import React from "react";
import Login from "../Screens/Authentication/Login"
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../Screens/Home/HomeScreen";
import BookingScreen from "../Screens/BookingScreen";
import FAQScreen from "../Screens/FAQScreen";
import ContactScreen from "../Screens/ContactScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import OwnedvehicleScreen from "../Screens/OwnedvehicleScreen";
import ProfileScreen from "../Screens/ProfileScreen";


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="FAQ" component={FAQScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen}/>
        <Stack.Screen name="Ownedvehicle" component={OwnedvehicleScreen}/>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        
         </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;