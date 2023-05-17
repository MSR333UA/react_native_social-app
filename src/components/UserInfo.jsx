import { Image, StyleSheet, Text, View } from "react-native";

export const UserInfo = ({ userAvatar, nickname, email }) => {
  // if (data.length === 0) {
  //   return null; // Або поверніть пустий розмітку, якщо масив порожній
  // }
  // const { email, userAvatar, nickname } = data[0];

  // console.log("data", email);
  return (
    <View style={styles.user}>
      {userAvatar ? (
        <Image style={styles.avatar} source={{ uri: userAvatar }} />
      ) : (
        <View
          style={{
            ...styles.avatar,
            backgroundColor: "#F6F6F6",
          }}
        />
      )}

      <View style={styles.textWrap}>
        <Text style={styles.name}>{nickname}</Text>
        <Text style={styles.email}>{email}</Text>
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
