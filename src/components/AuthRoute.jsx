import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "../Screens/RegistrationScreen";
import { LoginScreen } from "../Screens/LoginScreen";

const Stack = createNativeStackNavigator();

export const AuthRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ headerShown: false }} // Робить ітерфейс чистішим та сфокусованішим та заберає заголовок
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
