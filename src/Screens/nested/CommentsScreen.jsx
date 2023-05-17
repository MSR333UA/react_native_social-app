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
  FlatList,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { uploadCommentToDB } from "../../firebase/storageOperations";
import moment from "moment";
import "moment/locale/uk";

import { Header } from "../../components/Header";
import { Container } from "../../components/Container";
import { Comments } from "../../components/Comments";

import GoBackIcon from "../../../assets/icons/arrow-left.svg";
import SendIcon from "../../../assets/icons/send.svg";
import { useSelector } from "react-redux";

const windowsWidth = Dimensions.get("window").width;

export const CommentsScreen = ({ navigation, route }) => {
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const inputRef = useRef(null);
  const inputHeight = useRef(new Animated.Value(90)).current;

  const { userId, nickname, avatarURL } = useSelector((state) => state.auth);
  const { id, photo, commentsNumber, prevScreen } = route.params;

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
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(inputHeight, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const getComments = async () => {
    await onSnapshot(collection(db, "posts", id, "comments"), (snapshot) => {
      const commentsArray = snapshot.docs.map((doc) => {
        const post = doc.data();
        return { id: doc.id, ...post };
      });
      setComments(commentsArray);
    });
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmit = async () => {
    const date = moment().format("DD MMMM, YYYY | HH:mm");
    const text = userComment;
    await uploadCommentToDB({
      id,
      userId,
      avatarURL,
      nickname,
      commentsNumber,
      text,
      date,
    });

    setUserComment("");
    handleKeyboardHide();
    console.log("text", text);
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
        <Container addStyles={{ flex: 1 }}>
          <Image source={{ uri: photo }} style={styles.image} />
          {comments && (
            <FlatList
              data={comments}
              renderItem={({ item, index }) => {
                return (
                  <Comments
                    index={index}
                    item={item}
                    commentsLength={comments.length}
                    StoredUserId={userId}
                  />
                );
              }}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
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
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.inputButton}
          >
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
    // width: "100%",
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
