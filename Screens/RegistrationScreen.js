import React, { useState } from "react";
import { AntDesign, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";

const halfWindowsWidth = Dimensions.get("window").width / 2;

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    // console.log(state);
    // setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("../assets/images/imgBg.png")}
        >
          <View
            style={{
              ...styles.bgForm,
              ...Platform.select({
                android: {
                  height: isShowKeyboard ? 390 : 550,
                },
                ios: {
                  height: isShowKeyboard ? 670 : 550,
                },
              }),
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.avatar,
                  backgroundColor: "#F6F6F6",
                }}
              >
                <TouchableOpacity style={styles.addCross}>
                  {photo ? (
                    <>
                      <Image source={{ uri: photo }} style={styles.avatar} />
                      <SimpleLineIcons name="close" size={25} color="#BDBDBD" />
                    </>
                  ) : (
                    <AntDesign name="pluscircleo" color="#FF6C00" size={25} />
                  )}
                </TouchableOpacity>
              </View>

              <Text style={styles.regText}>Registration</Text>
              <TextInput
                style={[
                  styles.inputText,
                  isShowKeyboard && state.login && styles.InputFocus,
                ]}
                onFocus={() => setIsShowKeyboard(true)}
                onBlur={() => setIsShowKeyboard(false)}
                placeholder="Login"
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              ></TextInput>
              <TextInput
                style={[styles.inputText, isShowKeyboard && styles.InputFocus]}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder="Email address"
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              ></TextInput>
              <View
                style={[
                  styles.passwordContainer,
                  isShowKeyboard && styles.InputFocus,
                ]}
              >
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  onFocus={() => setIsShowKeyboard(true)}
                  placeholder="Password"
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    style={styles.eyeButton}
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                  />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonContainer}
              onPress={handleKeyboardHide}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.rulesText}>
              Already have an account? Sign in
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },

  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -60,
    left: halfWindowsWidth - 75,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarIcon: {
    position: "absolute",
    right: halfWindowsWidth - 90,
  },
  addCross: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
  },

  bgForm: {
    // position: "absolute",
    width: "100%",
    // height: "100%",
    left: 0,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  buttonContainer: {
    height: 51,
    marginTop: 27,
    marginBottom: 16,
    marginHorizontal: 32,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "RobotoRegular",
    color: "#FFFFFF",
  },
  regText: {
    // position: "absolute",
    // width: 184,
    // height: 35,
    // left: "50%",
    // marginLeft: -92, // to center the element horizontally
    // top: 0,

    marginTop: 92,
    marginBottom: 32,

    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    // fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,

    color: "#212121",
  },

  form: {
    marginHorizontal: 16,
  },
  inputText: {
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    height: 50,
    marginBottom: 16,

    // top: calc(50% - 19px/2 + 0.5px);

    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    // fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    // position: "absolute",
    // left: 16,
    // right: 16,
    // top: 423,
  },
  InputFocus: {
    borderColor: "#FF6C00",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    color: "#212121",
    height: 50,
    marginBottom: 16,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    height: 50,
  },

  eyeButton: {
    padding: 5,
    paddingRight: 15,
    fontSize: 24,
    color: "#1B4371",
  },
  rulesText: {
    fontFamily: "RobotoRegular",

    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginBottom: 78,
  },
});
