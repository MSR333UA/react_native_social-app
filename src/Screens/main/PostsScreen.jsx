import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultScreen } from "../nested/DefaultScreen";

const Stack = createNativeStackNavigator();

export const PostsScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="DefaultScreen"
    >
      <Stack.Screen name="DefaultScreen" component={DefaultScreen} />
    </Stack.Navigator>
  );
};
