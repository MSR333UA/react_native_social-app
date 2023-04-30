import { Image, StyleSheet, Text, View } from "react-native";

export const UserInfo = () => {
  return (
    <View style={styles.user}>
      <Image
        style={styles.avatar}
        source={require("../../assets/images/avatar.png")}
      />

      <View style={styles.textWrap}>
        <Text style={styles.name}>Natalia Romanova</Text>
        <Text style={styles.email}>email@example.com</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    // marginBottom: 32,s
  },
  avatar: {
    marginRight: 10,
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  textWrap: {
    justifyContent: "center",
  },
  name: {
    fontFamily: "RobotoBold",

    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
