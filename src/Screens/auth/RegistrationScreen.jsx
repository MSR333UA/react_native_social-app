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
  Button,
} from "react-native";
import { TextBtn } from "../../components/TextBtn";
import CrossIcon from "../../../assets/icons/delete-cross.svg";

const halfWindowsWidth = Dimensions.get("window").width / 2;

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState(null);
  // console.log(navigation);
  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
    navigation.navigate("Home");
  };
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("../../../assets/images/imgBg.png")}
        >
          <View
            style={{
              ...styles.bgForm,
              ...Platform.select({
                // android: {
                //   height: isShowKeyboard ? 390 : 550,
                // },
                ios: {
                  height: isShowKeyboard ? 670 : 550,
                },
              }),
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TouchableOpacity>
                <View style={styles.avatar}>
                  {photo ? (
                    <>
                      <Image
                        source={require("../../../assets/images/avatar.png")}
                      />
                      <CrossIcon
                        name="close"
                        size={25}
                        color="#BDBDBD"
                        style={styles.deleteCross}
                      />
                    </>
                  ) : (
                    <AntDesign
                      name="pluscircleo"
                      color="#FF6C00"
                      size={25}
                      style={{
                        ...styles.addCross,
                        backgroundColor: "#F6F6F6",
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>

              <Text style={styles.title}>Registration</Text>
              <TextInput
                style={[
                  styles.inputText,
                  isShowKeyboard === "login" && styles.InputFocus,
                ]}
                onFocus={() => setIsShowKeyboard("login")}
                onBlur={() => setIsShowKeyboard(false)}
                placeholder="Login"
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              ></TextInput>
              <TextInput
                style={[
                  styles.inputText,
                  isShowKeyboard === "email" && styles.InputFocus,
                ]}
                onFocus={() => setIsShowKeyboard("email")}
                onBlur={() => setIsShowKeyboard(false)}
                placeholder="Email address"
                autoComplete="email"
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              ></TextInput>
              <View
                style={[
                  styles.passwordContainer,
                  isShowKeyboard === "password" && styles.InputFocus,
                ]}
              >
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  onFocus={() => setIsShowKeyboard("password")}
                  onBlur={() => setIsShowKeyboard(false)}
                  placeholder="Password"
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    style={styles.eyeButton}
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                  />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            {!isShowKeyboard && (
              <>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonContainer}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TextBtn
                  handlePress={() => navigation.navigate("Login")}
                  text={"Already have an account?"}
                  textTab={"Sing In"}
                  position={{
                    alignItems: "center",
                    marginBottom: 78,
                  }}
                />
              </>
            )}
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
  // avatarIcon: {
  //   position: "absolute",
  //   right: halfWindowsWidth - 90,
  // },
  addCross: {
    position: "absolute",
    top: 81,
    right: -12.5,
  },
  deleteCross: {
    position: "absolute",
    top: 75,
    right: -18,
    borderRadius: 50,
    height: 24,
  },
  bgForm: {
    width: "100%",

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
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "RobotoRegular",
    color: "#FFFFFF",
  },
  title: {
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

    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
  },
  InputFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
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
});
