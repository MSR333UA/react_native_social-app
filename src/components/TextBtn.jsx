import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const TextBtn = ({
  handlePress,
  text,
  isHiddenPassword,
  textTab,
  position,
}) => {
  return (
    <View style={styles.btn}>
      <Text style={styles.btnText}>{text} </Text>
      <TouchableOpacity
        onPress={() => handlePress(!isHiddenPassword)}
        style={{ ...position }}
      >
        <Text style={styles.btnText}>{textTab}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    // flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});
