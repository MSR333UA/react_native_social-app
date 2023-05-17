import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CommentIcon from "../../assets/icons/message-circle.svg";
import LikeIcon from "../../assets/icons/thumbs-up.svg";
import MapIcon from "../../assets/icons/map-pin.svg";
import Toast from "react-native-toast-message";
import { uploadLikeToDB } from "../firebase/storageOperations";
import { useSelector } from "react-redux";

export const Post = React.memo(({ data, showComments, showLocation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    id,
    title,
    location,
    photo,
    commentsNumber,
    likesNumber,
    coords,
    // userId,
    // nickname,

    // photo, // Якщо локально
    // state: { location, title },
  } = data;

  const { userId, nickname } = useSelector((state) => state.auth);

  const checkLocation = () => {
    if (!coords) {
      Toast.show({
        type: "info",
        text1: "Location not specified",
      });
      return;
    }
    showLocation();
  };

  return (
    <View
      style={{
        height: 300,
        marginBottom: 32,
      }}
    >
      {isLoading && <ActivityIndicator size={"small"} color={"#FF6C00"} />}
      <>
        <Image
          source={{ uri: photo }}
          onLoad={() => setIsLoading(false)}
          style={styles.image}
        />
        <Text style={styles.imgTitle}>{title}</Text>
        <View
          style={{
            ...styles.icons,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.icons} onPress={showComments}>
              <CommentIcon
                style={
                  commentsNumber > 0
                    ? { marginRight: 8, fill: "#FF6C00" }
                    : { marginRight: 8, stroke: "#BDBDBD" }
                }
              />
              <Text
                style={
                  commentsNumber > 0
                    ? { color: "#212121" }
                    : { ...styles.iconNumber }
                }
              >
                {commentsNumber}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: 24,
                ...styles.icons,
              }}
              onPress={() => uploadLikeToDB(id, userId, nickname, likesNumber)}
            >
              <LikeIcon
                style={
                  likesNumber > 0
                    ? { marginRight: 8, stroke: "#FF6C00" }
                    : { marginRight: 8, stroke: "#BDBDBD" }
                }
              />
              <Text
                style={
                  likesNumber > 0
                    ? { color: "#212121" }
                    : { ...styles.iconNumber }
                }
              >
                {likesNumber}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.icons} onPress={checkLocation}>
            <MapIcon style={{ marginRight: 8 }} />
            <Text style={styles.locationText}>{location}</Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
});

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
