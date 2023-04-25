import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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
} from "react-native";
import { KeyboardAvoidingWrapper } from "../components/KeyboardAvoidingWrapper";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handlePress = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  return (
    <KeyboardAvoidingWrapper>
      <View style={[styles.addPhotoBg, styles.bg]}>
        {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
        <Text style={styles.regText}>Registration</Text>
        <View
          style={{
            ...styles.form,
            marginBottom: isShowKeyboard ? 16 : 27,
          }}
        >
          <TextInput
            style={[
              styles.inputText,
              isShowKeyboard === "login" && styles.InputFocus,
            ]}
            onFocus={() => setIsShowKeyboard(true)}
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
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                style={styles.eyeButton}
                name={showPassword ? "eye-off-outline" : "eye-outline"}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* </KeyboardAvoidingView> */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonContainer}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.rulesText}>Already have an account? Sign in</Text>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  addPhotoBg: {
    // position: "absolute",
    width: 120,
    height: 120,
    left: 128,
    top: 203,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  bg: {
    // position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    // top: 263,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  buttonContainer: {
    height: 51,
    // marginTop: 43,
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
    marginBottom: 45,
  },
});
