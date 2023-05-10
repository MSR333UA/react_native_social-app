import { Keyboard, StyleSheet, Text, View } from "react-native";

import { LogoutBtn } from "../../components/LogoutBtn";
import { Header } from "../../components/Header";
import { UserInfo } from "../../components/UserInfo";
import { Container } from "../../components/Container";
import { Post } from "../../components/Post";
import { useState } from "react";

export const DefaultScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

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
        <View style={styles.post}>
          <View style={styles.wrap}>
            <UserInfo />
          </View>
          <Post
            data={{
              data,
            }}
            showComments={() =>
              navigation.navigate("Comments", {
                data,
                prevScreen: "Profile",
              })
            }
          />
        </View>
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
  // wrap: {
  //   width: "95%",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
});
