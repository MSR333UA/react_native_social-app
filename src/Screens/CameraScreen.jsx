import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import GoBackIcon from "../../assets/icons/arrow-left.svg";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export const CameraScreen = ({ navigation, route }) => {
  const [photo, setPhoto] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const { prevScreen } = route.params;

  const takePhoto = async () => {
    const shot = await camera.takePictureAsync();
    setPhoto(shot.uri);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#6B6B6B" }}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <GoBackIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraButton}>
          <FontAwesome name="camera" size={24} color="#6B6B6B" />
        </TouchableOpacity>
      </View>
      {photo ? (
        <View>
          <Image source={{ uri: photo }} style={{ height: "100%" }} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonWrap}
              onPress={() => navigation.navigate(prevScreen, { photo: photo })}
            >
              <FontAwesome name="save" size={40} color="#6B6B6B" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrap}
              onPress={() => setPhoto(null)}
            >
              <AntDesign name="delete" size={40} color="#6B6B6B" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => setCamera(ref)}
          ></Camera>
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={takePhoto}
            >
              <View style={styles.border} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cycle} onPress={toggleCameraType}>
            <Entypo name="cycle" size={30} color="#e4e1e0e2" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    bottom: 5,
    left: 16,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#F6FAF4",
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    height: "83%",
    borderRadius: 8,
    borderRadius: 50,
  },
  border: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#3e3d3d",
    borderRadius: "50%",
    width: 70,
    height: 70,

    bottom: -5,
    right: -5,
  },
  bottomBar: {
    height: "10%",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6B6B6B",
  },
  topBar: {
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6B6B6B",
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    backgroundColor: "#FEFBFA",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    height: 60,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonWrap: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#FEFBFA",
  },
  cameraButton: {
    position: "absolute",
    bottom: -20,
    right: -20,

    width: 60,
    height: 60,
    borderRadius: 50,
  },
  cycle: {
    position: "absolute",
    bottom: 45,
    right: 20,
  },
});
