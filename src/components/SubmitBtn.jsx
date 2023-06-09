import { Text, TouchableOpacity, StyleSheet } from "react-native";

export const SubmitBtn = ({ text, onPress, position, disabled = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...position,
        ...styles.btn,
        backgroundColor: disabled ? "#F6F6F6" : "#FF6C00",
      }}
    >
      <Text
        style={{ ...styles.BtnText, color: disabled ? "#BDBDBD" : "#FFFFFF" }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    height: 50,
    padding: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  BtnText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
  },
});
