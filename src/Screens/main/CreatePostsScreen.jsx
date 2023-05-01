import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Image,
} from "react-native";
import { Header } from "../../components/Header";

import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import MapIcon from "../../../assets/icons/map-pin.svg";
import CameraIcon from "../../../assets/icons/camera.svg";
import CrossIcon from "../../../assets/icons/delete-cross.svg";
import { Container } from "../../components/Container";
import { KeyboardAvoidingView } from "react-native";
import { TextBtn } from "../../components/TextBtn";
import { SubmitBtn } from "../../components/SubmitBtn";
import { Dimensions } from "react-native";

const initialState = {
  title: "",
  location: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = () => {
    if (isDisable) return;

    setIsShownKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
    navigation.navigate("Home");
  };

  const handleKeyboardHide = () => {
    Keyboard.dismiss();
  };

  const keyboardVerticalOffset = Dimensions.get("window").height * 0.3; // set to a percentage of the screen height that works for your design
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header>
          <Text style={styles.title}>Create a publication</Text>
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 16,
              top: 55,
            }}
            onPress={() => navigation.navigate("DefaultScreen")}
          >
            <GoBackIcon />
          </TouchableOpacity>
        </Header>
        <Container>
          <View>
            <View>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                keyboardVerticalOffset={keyboardVerticalOffset}
              >
                <View style={{ marginBottom: isShownKeyboard ? 0 : 32 }}>
                  {!photo ? (
                    <>
                      <View style={styles.imgBg}>
                        <Image
                          style={styles.img}
                          source={require("../../../assets/images/Rectangle.png")}
                        />
                        <TouchableOpacity style={styles.cameraBtn}>
                          <CameraIcon />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.text}>Redact</Text>
                    </>
                  ) : (
                    <>
                      <View style={{ ...styles.imgBg }}>
                        <TouchableOpacity style={styles.cameraBtn}>
                          <CameraIcon />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.text}>Upload a photo</Text>
                    </>
                  )}
                </View>
                <TextInput
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, title: value }))
                  }
                  value={state.title}
                  placeholder="Title..."
                  // placeholderTextColor="#BDBDBD"
                  style={styles.input}
                />
                <View>
                  <MapIcon style={styles.inputIcon} />
                  <TextInput
                    value={state.location}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        location: value,
                      }))
                    }
                    placeholder="The area..."
                    style={{
                      ...styles.input,
                      paddingLeft: 30,
                      marginTop: 16,
                      marginBottom: 32,
                    }}
                  />
                </View>
                {isLoading ? (
                  <ActivityIndicator size={"small"} color={"#FF6C00"} />
                ) : (
                  <SubmitBtn
                    onPress={handleSubmit}
                    text={"Publish"}
                    disabled={isDisable}
                  />
                )}
              </KeyboardAvoidingView>
            </View>
          </View>
        </Container>
      </View>
    </TouchableWithoutFeedback>
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
  img: {
    position: "relative",
    width: "100%",
    borderRadius: 8,
  },
  cameraBtn: {
    width: 60,
    height: 60,

    backgroundColor: "{photo?(rgba(255, 255, 255, 0.3)):( #FFFFFF)}",

    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
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
