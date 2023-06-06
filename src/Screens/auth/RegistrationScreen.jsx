import React, { useState, useEffect, useRef } from "react";
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
import { Animated } from "react-native";
import { useDispatch } from "react-redux";

import { authRegister } from "../../redux/auth/authOperations";
import { uploadImageToStorage } from "../../firebase/storageOperations";

import { ModalView } from "../../components/ModalView";
import { CreatePicture } from "../../components/CreatePicture";
import { TextBtn } from "../../components/TextBtn";

import { AntDesign, Ionicons } from "@expo/vector-icons";
import CrossIcon from "../../../assets/icons/delete-cross.svg";
const windowsWidth = Dimensions.get("window").width;

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation, route }) => {
  const [state, setState] = useState(initialState);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowKeyboard, setIsShownKeyboard] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [showInput, setShowInput] = useState(false);

  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const inputHeight = useRef(new Animated.Value(550)).current;

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.photo);
    }
  }, [route]);
  // console.log(navigation);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setIsShownKeyboard(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsShownKeyboard(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleKeyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    Animated.timing(inputHeight, {
      toValue: 655,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(inputHeight, {
      toValue: 550,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setIsShownKeyboard(false);
      Keyboard.dismiss();
    });
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    if (!photo) {
      await dispatch(authRegister(state));
      setIsLoading(false);
      setState(initialState);
      return;
    }
    const imageURL = await uploadImageToStorage(
      photo,
      "usersAvatars",
      state.email
    );
    await dispatch(authRegister({ ...state, imageURL }));
    setIsLoading(false);
    setState(initialState);
    navigation.navigate("Home");
  };

  const openCamera = () => {
    setModalVisible(false);
    navigation.navigate("Camera", { prevScreen: "Register" });
  };
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("../../../assets/images/imgBg.png")}
        >
          <View>
            {/* <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            > */}
            <Animated.View
              style={{
                ...styles.bgForm,
                height: inputHeight,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                {photo ? (
                  <View style={styles.avatar}>
                    <Image
                      style={{ height: 120, borderRadius: 16 }}
                      source={{ uri: photo }}
                    />
                    <CrossIcon
                      name="close"
                      size={25}
                      color="#BDBDBD"
                      style={styles.deleteCross}
                    />
                  </View>
                ) : (
                  <View style={styles.avatar}>
                    <AntDesign
                      name="pluscircleo"
                      color="#FF6C00"
                      size={25}
                      style={{
                        ...styles.addCross,
                        backgroundColor: "#F6F6F6",
                      }}
                    />
                  </View>
                )}
              </TouchableOpacity>

              <Text style={styles.title}>Registration</Text>
              <TextInput
                style={[
                  styles.inputText,
                  showInput === "login" && styles.InputFocus,
                ]}
                onFocus={() => {
                  setIsShownKeyboard(true);
                  handleFocus();
                  setShowInput("login");
                }}
                onBlur={() => {
                  setIsShownKeyboard(false);
                  handleBlur();
                  setShowInput(false);
                }}
                ref={inputRef}
                placeholder="Login"
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              ></TextInput>
              <TextInput
                style={[
                  styles.inputText,
                  showInput === "email" && styles.InputFocus,
                ]}
                onFocus={() => {
                  setIsShownKeyboard(true);
                  handleFocus();
                  setShowInput("email");
                }}
                onBlur={() => {
                  setIsShownKeyboard(false);
                  setShowInput(false);
                  handleBlur();
                }}
                ref={inputRef}
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
                  showInput === "password" && styles.InputFocus,
                ]}
              >
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  onFocus={() => {
                    setIsShownKeyboard(true);
                    handleFocus();
                    setShowInput("password");
                  }}
                  onBlur={() => {
                    setIsShownKeyboard(false);
                    handleBlur();
                    setShowInput(false);
                  }}
                  ref={inputRef}
                  placeholder="Password"
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
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
                    style={{ paddingBottom: 78 }}
                    handlePress={() => navigation.navigate("Login")}
                    text={"Already have an account?"}
                    textTab={"Sing In"}
                    position={{
                      alignItems: "center",
                      // marginBottom: 78,
                    }}
                  />
                </>
              )}
            </Animated.View>
            {/* </KeyboardAvoidingView> */}
          </View>
        </ImageBackground>
        <ModalView
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          width={200}
          height={150}
        >
          <CreatePicture
            setPhoto={(photo) => setPhoto(photo)}
            setModalVisible={setModalVisible}
            openCamera={openCamera}
          />
        </ModalView>
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
    left: windowsWidth - 280,
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

    width: windowsWidth - 32,
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
