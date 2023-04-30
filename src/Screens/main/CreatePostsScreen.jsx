import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
} from "react-native";
import { Header } from "../../components/Header";

import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import MapIcon from "../../../assets/icons/map-pin.svg";
import CameraIcon from "../../../assets/icons/camera.svg";
import CrossIcon from "../../../assets/icons/delete-cross.svg";
import { Container } from "../../components/Container";
import { KeyboardAvoidingView } from "react-native";
import { TextBtn } from "../../components/TextBtn";

export const CreatePostsScreen = () => {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header>
        <Text style={styles.title}>Create a publication</Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            left: 16,
            top: 55,
          }}
        >
          <GoBackIcon />
        </TouchableOpacity>
      </Header>
      <Container>
        <TouchableWithoutFeedback>
          <View>
            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={{ marginBottom: isShownKeyboard ? 0 : 32 }}>
                  <View style={styles.imgBg}>
                    <TouchableOpacity style={styles.cameraBtn}>
                      <CameraIcon />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.text}>Upload a photo</Text>
                </View>
                <TextInput
                  placeholder="Title..."
                  // placeholderTextColor="#BDBDBD"
                  style={styles.input}
                />
                <View>
                  <MapIcon style={styles.inputIcon} />
                  <TextInput
                    placeholder="The area..."
                    style={{
                      ...styles.input,
                      paddingLeft: 30,
                      marginTop: 16,
                      marginBottom: 32,
                    }}
                  />
                </View>
                {/* <TextBtn/>s */}
              </KeyboardAvoidingView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "RobotoMedium",
    lineHeight: 35,
    color: "#212121",
    fontSize: 17,
    lineHeight: 22,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgBg: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderStyle: "solid",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "E8E8E8",
  },
  cameraBtn: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
    fontSize: 14,
    lineHeight: 19,
    marginTop: 8,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    alignItems: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "RobotoRegular",
  },
  inputIcon: {
    position: "absolute",
    top: 28,
  },
});
