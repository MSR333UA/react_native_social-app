import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/auth/RegistrationScreen";
import { LoginScreen } from "../Screens/auth/LoginScreen";
import { PostsScreen } from "../Screens/main/PostsScreen";
import { DefaultScreen } from "../Screens/nested/DefaultScreen";
import { Home } from "../Screens/Home";
import { CameraScreen } from "../Screens/CameraScreen";

const Stack = createStackNavigator();

export const AuthRoute = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }} // Робить інтерфейс чистішим та сфокусованішим та заберає заголовок
    >
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
