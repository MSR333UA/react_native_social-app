import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Container } from "../../components/Container";
import CrossIcon from "../../../assets/icons/delete-cross.svg";
import { LogoutBtn } from "../../components/LogoutBtn";
import { AntDesign } from "@expo/vector-icons";
import { Post } from "../../components/Post";
import { useDispatch, useSelector } from "react-redux";
import {
  authLogOut,
  changeUserPhotoURL,
} from "../../redux/auth/authOperations";
import {
  deleteImageFromStorage,
  uploadImageToStorage,
} from "../../firebase/storageOperations";
import { ModalView } from "../../components/ModalView";
import { CreatePicture } from "../../components/CreatePicture";
import { collection, where, onSnapshot, query } from "firebase/firestore";
import { authSlice } from "../../redux/auth/authSlice";
import { db } from "../../firebase/config";

const halfWindowsWidth = Dimensions.get("window").width / 2;
const { changeAvatar } = authSlice.actions;

export const ProfileScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newAvatarURL, setNewAvatarURL] = useState(null);
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { userId, nickname, email, avatarURL } = useSelector(
    (state) => state.auth
  );
  console.log("avatarURL", avatarURL);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.photo);
    }
  }, [route]);

  const getUserPosts = async () => {
    const q = await query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );
    await onSnapshot(q, (snapshot) => {
      const postsArray = snapshot.docs.map((doc) => {
        const post = doc.data();
        return { id: doc.id, ...post };
      });
      setData(postsArray);
    });
  };

  useEffect(() => {
    getUserPosts();
    changeUserAvatar();
  }, []);

  useEffect(() => {
    changeUserAvatar();
  }, [photo]);

  const changeUserAvatar = async () => {
    if (!photo) {
      return;
    }
    setIsLoading(true);
    if (avatarURL) {
      await deleteImageFromStorage("usersAvatars", email);
      dispatch(changeAvatar({ avatarURL: null }));
    }
    const URL = await uploadImageToStorage(photo, "usersAvatars", email);
    await dispatch(changeUserPhotoURL({ URL }));
    setIsLoading(false);
    setNewAvatarURL(URL);
  };

  const openCamera = () => {
    setModalVisible(false);
    navigation.navigate("Camera", { prevScreen: "Profile" });
  };

  // useEffect(() => {
  //   if (route.params) {
  //     setData((prevState) => [route.params, ...prevState]);
  //   }
  // }, [route.params]);
  // console.log("dataProfile", data);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.bcgImage}
        source={require("../../../assets/images/imgBg.png")}
      >
        <Container addStyles={styles.container}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {avatarURL || newAvatarURL ? (
              <View>
                {isLoading && (
                  <ActivityIndicator size={"small"} color={"#FF6C00"} />
                )}
                <>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: newAvatarURL ? newAvatarURL : avatarURL,
                    }}
                    onLoad={() => setIsLoading(false)}
                  />
                  <CrossIcon
                    name="close"
                    size={25}
                    color="#BDBDBD"
                    style={styles.deleteCross}
                  />
                </>
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
          <LogoutBtn
            addStyles={{ position: "absolute", top: 25, right: 16 }}
            // addStyles={{ marginLeft: "auto" }}
            onPress={() => dispatch(authLogOut())}
          />
          <Text style={styles.title}>{nickname}</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              const {
                id,
                name,
                location,
                photo,
                commentsNumber = 0,
                likesNumber = 0,
                coords,
              } = item;
              return (
                <Post
                  data={{
                    name,
                    location,
                    photo,
                    commentsNumber,
                    likesNumber,
                    coords,
                  }}
                  showComments={() =>
                    navigation.navigate("Comments", {
                      id,
                      photo,
                      commentsNumber,
                      prevScreen: "Profile",
                    })
                  }
                  showLocation={() =>
                    navigation.navigate("Map", {
                      photo,
                      coords,
                      prevScreen: "Profile",
                    })
                  }
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
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
        </Container>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    marginTop: 150,
    paddingTop: 22,
    paddingBottom: 42,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bcgImage: {
    width: "100%",
    height: "100%",
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -80,
    left: halfWindowsWidth - 75,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  deleteCross: {
    position: "absolute",
    top: 75,
    right: -18,
    borderRadius: 50,
  },
  avatarIcon: {
    position: "absolute",
    right: halfWindowsWidth - 90,
  },
  addCross: {
    position: "absolute",
    top: 81,
    right: -12.5,
  },
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "RobotoMedium",
    lineHeight: 35,
    color: "#212121",
    paddingTop: 60,
    marginBottom: 33,
    fontSize: 30,
    lineHeight: 30,
  },
});
