import { StyleSheet, View } from "react-native";

export const Container = ({ children, addStyles }) => {
  return <View style={{ ...styles.bg, ...addStyles }}>{children}</View>;
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
});
