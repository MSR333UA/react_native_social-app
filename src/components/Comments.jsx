import React from "react";

import { Image, StyleSheet, View, Text } from "react-native";

export const Comments = () => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "space-between",
      }}
    >
      <Image
        source={require("../../assets/images/avatar.png")}
        style={{
          ...styles.avatar,
          marginRight: 0,
          marginLeft: 10,
        }}
      />
      <View style={styles.comment}>
        <View>
          <Text style={styles.nicknameText}>Natali</Text>
          <Text style={styles.commentText}>
            Lorem ipsum dolor sit amet consectetur
          </Text>
          <View>
            <Text style={styles.commentDate}>09 may, 2023 | 18:00</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
  },
  comment: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 6,
    borderTopRightRadius: 0,
  },
  commentText: {
    marginBottom: 8,
    fontFamily: "RobotoRegular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  nicknameText: {
    marginBottom: 8,
    fontFamily: "RobotoMedium",

    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "RobotoRegular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
});
