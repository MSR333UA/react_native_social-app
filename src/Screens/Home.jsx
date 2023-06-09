import React, { useState } from "react";
import { CreatePostsScreen, PostsScreen, ProfileScreen } from "./main";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsIcon from "../../assets/icons/toolbar/grid.svg";
import UserIcon from "../../assets/icons/toolbar/user.svg";
import PlusIcon from "../../assets/icons/toolbar/union.svg";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const [isCreateScreen, setIsCreateScreen] = useState(true);

  // const dispatch = useDispatch();

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
          display: "none",
        },
      }}
    >
      <Tab.Screen
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <PostsIcon fill={"#ffffff"} size={size} />
          ),
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            if (routeName === "Comments" || routeName === "Map") {
              return { display: "none" };
            }
            return {
              height: 85,
              paddingHorizontal: 85,
              paddingTop: 10,
              paddingBottom: 30,
              backgroundColor: "#FFFFFF",
            };
          })(route),
        })}
        name="Posts"
        component={PostsScreen}
        listeners={() => ({
          tabPress: () => {
            navigation.navigate("DefaultScreen");
            setIsCreateScreen(true);
          },
        })}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return isCreateScreen ? (
              <PlusIcon size={size} />
            ) : (
              <UserIcon stroke={"#FFFFFF"} size={size} />
            );
          },
          tabBarStyle: isCreateScreen
            ? { display: "none" }
            : {
                height: 85,
                paddingHorizontal: 85,
                paddingTop: 10,
                paddingBottom: 30,
                backgroundColor: "#FFFFFF",
              },
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
          tabBarIcon: ({ focused, color, size }) => {
            return isCreateScreen ? (
              <UserIcon stroke={"#212121"} size={size} />
            ) : (
              <PlusIcon fill={"rgba(33, 33, 33, 0.8)"} size={size} />
            );
          },
        }}
        name={isCreateScreen ? "Profile" : "Create"}
        component={isCreateScreen ? ProfileScreen : CreatePostsScreen}
        listeners={() => ({
          tabPress: () => {
            setIsCreateScreen(!isCreateScreen);
          },
        })}
      />
    </Tab.Navigator>
  );
};
