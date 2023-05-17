import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen } from "../Screens/auth/RegistrationScreen";
import { LoginScreen } from "../Screens/auth/LoginScreen";
import { Home } from "../Screens/Home";
import { CameraScreen } from "../Screens/CameraScreen";

const Stack = createStackNavigator();

export const AuthRoute = ({ stateChange }) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }} // Робить інтерфейс чистішим та сфокусованішим та заберає заголовок
    >
      {!stateChange && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </>
      )}
      {stateChange && (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
