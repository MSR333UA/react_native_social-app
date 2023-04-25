import { StyleSheet, View } from "react-native";
import { AuthRoute } from "./AuthRoute";

export const Main = ({ onLayoutRootView }) => {
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <AuthRoute />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
