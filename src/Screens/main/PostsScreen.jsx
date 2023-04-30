import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultScreen } from "../nested/DefaultScreen";
import { CommentsScreen } from "../nested/CommentsScreen";
import { MapScreen } from "../nested/MapScreen";

const Stack = createNativeStackNavigator();

export const PostsScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="DefaultScreen"
    >
      <Stack.Screen name="DefaultScreen" component={DefaultScreen} />
      <Stack.Screen name="Comments" component={CommentsScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};
