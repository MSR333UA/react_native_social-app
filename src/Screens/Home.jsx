import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CreatePostsScreen, PostsScreen, ProfileScreen } from "./main";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsIcon from "../../assets/icons/toolbar/grid.svg";
import UserIcon from "../../assets/icons/toolbar/user.svg";
import PlusIcon from "../../assets/icons/toolbar/union.svg";

const Tab = createBottomTabNavigator();

export const Home = () => {
  const [isCreateScreen, setIsCreateScreen] = useState(true);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        backBehavior: "history",
        tabBarStyle: {
          height: 85,
          paddingHorizontal: 85,
          paddingTop: 10,
          paddingBottom: 30,
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <PostsIcon fill={focused ? "#1B4371" : "#ffffff"} size={size} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <PlusIcon fill={focused ? "#1B4371" : "#ffffff"} size={size} />
          ),
          tabBarItemStyle: {
            maxWidth: 70,
            height: 40,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
          },
        }}
        name={isCreateScreen ? "Create" : "Profile"}
        component={isCreateScreen ? CreatePostsScreen : ProfileScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <UserIcon fill={focused ? "#1B4371" : "#ffffff"} size={size} />
          ),
        }}
        name={isCreateScreen ? "Profile" : "Create"}
        component={isCreateScreen ? ProfileScreen : CreatePostsScreen}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
