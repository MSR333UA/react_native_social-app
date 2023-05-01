import { Keyboard, StyleSheet, Text, View } from "react-native";

import { LogoutBtn } from "../../components/LogoutBtn";
import { Header } from "../../components/Header";
import { UserInfo } from "../../components/UserInfo";
import { Container } from "../../components/Container";

export const DefaultScreen = ({ navigation }) => {
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
        <UserInfo />
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
});
