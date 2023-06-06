import { StyleSheet, Text, View } from "react-native";

import { LogoutBtn } from "../../components/LogoutBtn";
import { Header } from "../../components/Header";
import { UserInfo } from "../../components/UserInfo";
import { Container } from "../../components/Container";
import { Post } from "../../components/Post";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { authLogOut } from "../../redux/auth/authOperations";

import { getAllPosts } from "../../firebase/storageOperations";

export const DefaultScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  // console.log("data", data);

  useEffect(() => {
    //Отримання інформації з бази данних
    getAllPosts(setData);
  }, []);
  // useEffect(() => { //Отримання інформації з телефона
  //   if (route.params) {
  //     setData((prevState) => [route.params, ...prevState]);
  //   }
  // }, [route.params]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={styles.title}>Publications</Text>
        <LogoutBtn
          addStyles={{ position: "absolute", top: 55, right: 16 }}
          onPress={() => dispatch(authLogOut())}
        />
      </Header>
      <Container addStyles={{ flex: 1 }}>
        <FlatList
          style={{ paddingTop: 32 }}
          data={data}
          renderItem={({ item }) => {
            const {
              id,
              nickname,
              title,
              location,
              photo,
              userId,
              commentsNumber = 0,
              likesNumber = 0,
              coords,
              userAvatar,
              email,
            } = item;
            // const { photo, state } = item;
            return (
              <View style={styles.post}>
                <View style={styles.wrap}>
                  <UserInfo
                    userAvatar={userAvatar}
                    nickname={nickname}
                    email={email}
                  />
                </View>
                <Post
                  data={{
                    id,
                    title,
                    location,
                    photo,
                    commentsNumber,
                    likesNumber,
                    coords,
                    userId,
                    nickname,
                  }}
                  // data={{ photo, state }} //передавання інформації локально
                  showComments={() =>
                    navigation.navigate("Comments", {
                      id,
                      photo,
                      commentsNumber,
                      prevScreen: "DefaultScreen",
                    })
                  }
                  showLocation={() =>
                    navigation.navigate("Map", {
                      photo,
                      coords,
                      prevScreen: "DefaultScreen",
                    })
                  }
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
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
  // post: {
  //   flexDirection: "column",
  // },

  wrap: {
    marginBottom: 32,
  },
});
