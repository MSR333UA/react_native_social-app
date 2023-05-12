import { Keyboard, StyleSheet, Text, View } from "react-native";

import { LogoutBtn } from "../../components/LogoutBtn";
import { Header } from "../../components/Header";
import { UserInfo } from "../../components/UserInfo";
import { Container } from "../../components/Container";
import { Post } from "../../components/Post";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export const DefaultScreen = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  // const { photo, state } = route.params;

  useEffect(() => {
    if (route.params) {
      setData((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);
  // console.log("data", data);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={styles.title}>Publications</Text>
        <LogoutBtn
          addStyles={{ position: "absolute", top: 55, right: 16 }}
          onPress={() => navigation.navigate("Login")}
        />
      </Header>
      <Container addStyles={{ flex: 1 }}>
        <View style={styles.wrap}>
          <UserInfo />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            // const {
            //   id,
            //   nickname,
            //   email,
            //   name,
            //   location,
            //   photo,
            //   userAvatar,
            //   commentsNumber = 0,
            //   likesNumber = 0,
            //   coords,
            // } = item;
            const { photo, state } = item;
            return (
              <View style={styles.post}>
                <Post
                  // data={{
                  //   id,
                  //   name,
                  //   location,
                  //   photo,
                  //   commentsNumber,
                  //   likesNumber,
                  //   coords,
                  // }}
                  data={{ photo, state }}
                  showComments={() =>
                    navigation.navigate("Comments", {
                      photo,

                      prevScreen: "DefaultScreen",
                    })
                  }
                  showLocation={() =>
                    navigation.navigate("Map", {
                      photo,
                      // coords,
                      prevScreen: "DefaultScreen",
                    })
                  }
                />
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
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
