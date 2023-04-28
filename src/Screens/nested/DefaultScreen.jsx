import { Keyboard, StyleSheet, Text, View } from "react-native";

import { LogoutBtn } from "../../components/LogoutBtn";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "../../components/Header";

export const DefaultScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={styles.title}>Publications</Text>
        {/* <MaterialIcons name="logout" size={24} color="#BDBDBD" /> */}
        <LogoutBtn
          addStyles={{ position: "absolute", top: 55, right: 16 }}
          onPress={Keyboard.dismiss()}
        />
      </Header>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    // fontFamily: "Roboto-Medium",
    fontWeight: "500",
    lineHeight: 35,
    color: "#212121",
    fontSize: 17,
    lineHeight: 22,
  },
});
