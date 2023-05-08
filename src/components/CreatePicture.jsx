import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import { Entypo } from "@expo/vector-icons";
import CameraIcon from "../../assets/icons/camera.svg";

export const CreatePicture = ({ setPhoto, setModalVisible, openCamera }) => {
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const photo = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setCameraPermission(photo.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {cameraPermission && (
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <CameraIcon width={30} height={30} fill={"#e4e1e0e2"} />
          <Text style={styles.text}>Camera</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Entypo name="images" size={30} color="#e4e1e0e2" />
        <Text style={styles.text}>Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    height: 150,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ea9b55d5",
  },
  camera: {
    height: 300,
    marginTop: 50,
  },

  text: {
    fontFamily: "RobotoMedium",
    fontSize: 27,
    color: "#e4e1e0e2",
  },
});
