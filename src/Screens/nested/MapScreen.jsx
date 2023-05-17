import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import { Header } from "../../components/Header";

export const MapScreen = ({ navigation, route }) => {
  const [showPhoto, setShowPhoto] = useState(true);
  // console.log("route.params.coords", route.params);
  const {
    coords: { latitude, longitude },
    photo,
  } = route.params;
  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.title}>Maps</Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 11,
            top: 50,
            padding: 5,
          }}
          onPress={() => navigation.goBack()}
        >
          <GoBackIcon />
        </TouchableOpacity>
      </Header>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="your picture 📸" />
      </MapView>
      {showPhoto && (
        <TouchableOpacity onPress={() => setShowPhoto(false)}>
          <Image source={{ uri: photo }} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    position: "absolute",
    bottom: 500,
    right: 30,
    width: 200,
    height: 150,
    borderRadius: 20,
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "RobotoMedium",
    lineHeight: 35,
    color: "#212121",
    fontSize: 17,
    lineHeight: 22,
  },
});
