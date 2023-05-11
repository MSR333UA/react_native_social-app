import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  TextInput,
  Dimensions,
  Keyboard,
  Animated,
} from "react-native";
import { Header } from "../../components/Header";
import { Container } from "../../components/Container";
import { Comments } from "../../components/Comments";

import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import SendIcon from "../../../assets/icons/send.svg";

const windowsWidth = Dimensions.get("window").width;

export const CommentsScreen = ({ navigation, route }) => {
  const [userComment, setUserComment] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const { id, photo, commentsNumber, prevScreen } = route.params;

  const inputRef = useRef(null);
  const inputHeight = useRef(new Animated.Value(50)).current;

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
      toValue: 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(inputHeight, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header>
          <Text style={styles.title}>Comments</Text>
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 11,
              top: 50,
              padding: 5,
            }}
            onPress={() => navigation.navigate(prevScreen)}
          >
            <GoBackIcon />
          </TouchableOpacity>
        </Header>
        <Container>
          <Image
            source={require("../../../assets/images/Rect.png")}
            style={styles.image}
          />
          <Comments />
        </Container>
        <View
          style={{
            position: "absolute",
            bottom: isShownKeyboard ? keyboardHeight - 60 : 8,
            left: 16,
            marginBottom: 16,
          }}
        >
          <Animated.View style={{ height: inputHeight }}>
            <TextInput
              placeholder="Comment on..."
              value={userComment}
              onChangeText={setUserComment}
              maxLength={150}
              multiline={true}
              style={[
                styles.input,
                isShownKeyboard && styles.animatedInputFocus,
              ]}
              onFocus={() => {
                setIsShownKeyboard(true);
                handleFocus();
              }}
              onBlur={() => {
                setIsShownKeyboard(false);
                handleBlur();
              }}
              ref={inputRef}
            />
          </Animated.View>
          <TouchableOpacity style={styles.inputButton}>
            <SendIcon />
          </TouchableOpacity>
        </View>
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
  image: {
    height: 240,
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    padding: 16,
    paddingTop: 16,
    alignItems: "center",
    width: windowsWidth - 32,
    minHeight: 50,
    paddingRight: 50,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",

    marginBottom: 16,
  },

  inputButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },

  animatedInputFocus: {
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
});
