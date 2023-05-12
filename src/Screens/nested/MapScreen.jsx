import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import { Header } from "../../components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";

export const MapScreen = ({ navigation }) => {
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
          latitude: 48.58722,
          longitude: 38.0,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{ latitude: 48.58722, longitude: 38.0 }}
          title="Дохлі москалі 💩"
        />
      </MapView>
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
