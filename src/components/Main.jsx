import { StyleSheet, View } from "react-native";
import { AuthRoute } from "./AuthRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authStateUserChange } from "../redux/auth/authOperations";

export const Main = ({ onLayoutRootView }) => {
  const { stateChange } = useSelector((state) => state.auth);
  // console.log(stateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateUserChange());
  }, []);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {stateChange !== null && <AuthRoute stateChange={stateChange} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
