import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "../Screens/auth/RegistrationScreen";
import { LoginScreen } from "../Screens/auth/LoginScreen";
import { PostsScreen } from "../Screens/main/PostsScreen";
import { DefaultScreen } from "../Screens/nested/DefaultScreen";

const Stack = createNativeStackNavigator();

export const AuthRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ headerShown: false }} // Робить ітерфейс чистішим та сфокусованішим та заберає заголовок
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
