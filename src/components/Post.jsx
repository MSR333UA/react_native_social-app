import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CommentIcon from "../../assets/icons/message-circle.svg";
import LikeIcon from "../../assets/icons/thumbs-up.svg";
import MapIcon from "../../assets/icons/map-pin.svg";

export const Post = () => {
  return (
    <View
      style={{
        height: 300,
        marginBottom: 32,
      }}
    >
      <Image
        source={require("../../assets/images/Rect.png")}
        style={styles.image}
      />
      <Text style={styles.imgTitle}>Захід сонця над Чорним морем</Text>
      <View
        style={{
          ...styles.icons,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.icons}>
            <CommentIcon style={{ marginRight: 8, fill: "#FF6C00" }} />
            <Text style={styles.iconNumber}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 24,
              ...styles.icons,
            }}
          >
            <LikeIcon style={{ marginRight: 8, stroke: "#FF6C00" }} />
            <Text style={styles.iconNumber}>200</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.icons}>
          <MapIcon style={{ marginRight: 8 }} />
          <Text style={styles.locationText}>Ukraine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 240,
    width: "100%",
    // marginRight: "auto",
    // marginLeft: "auto",
    borderRadius: 8,
    marginBottom: 8,
  },
  imgTitle: {
    marginBottom: 8,
    fontFamily: "RobotoMedium",

    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  iconNumber: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  locationText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
