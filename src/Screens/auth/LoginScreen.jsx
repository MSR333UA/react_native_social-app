import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
  Animated,
} from "react-native";
import { useDispatch } from "react-redux";
import { authLogin } from "../../redux/auth/authOperations";

import { Ionicons } from "@expo/vector-icons";
import { TextBtn } from "../../components/TextBtn";

const windowsWidth = Dimensions.get("window").width;

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShownKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const [showInput, setShowInput] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const inputRef = useRef(null);
  const inputHeight = useRef(new Animated.Value(490)).current;

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
      toValue: 550,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(inputHeight, {
      toValue: 490,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setIsShownKeyboard(false);
      Keyboard.dismiss();
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // console.log(state);
    setIsLoading(true);
    await dispatch(authLogin(state));
    setIsLoading(false);
    setState(initialState);
    // navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bgImage}
          source={require("../../../assets/images/imgBg.png")}
        >
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "padding"} 
          > */}
          {/* <View
              style={{
                // position: "absolute",
                bottom: isShowKeyboard ? keyboardHeight - 300 : 0,
              }}
            > */}
          <Animated.View
            style={{
              ...styles.bgForm,
              height: inputHeight,
            }}
          >
            <Text style={styles.title}>Login</Text>
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
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
            />
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
                  <Text style={styles.buttonText}>Sing In</Text>
                </TouchableOpacity>
                <TextBtn
                  handlePress={() => navigation.navigate("Register")}
                  text={"Don't have an account?"}
                  textTab={"Sing Up"}
                  position={{
                    alignItems: "center",
                    marginBottom: 144,
                  }}
                />
              </>
            )}
          </Animated.View>
          {/* </View> */}
          {/* </KeyboardAvoidingView> */}
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

  bgForm: {
    width: "100%",

    left: 0,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    marginTop: 32,
    marginBottom: 32,

    fontFamily: "RobotoMedium",
    fontStyle: "normal",
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
  InputFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
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
    marginBottom: 144,
  },
});
