import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Container } from "../../components/Container";
import CrossIcon from "../../../assets/icons/delete-cross.svg";
import { LogoutBtn } from "../../components/LogoutBtn";
import { AntDesign } from "@expo/vector-icons";

const halfWindowsWidth = Dimensions.get("window").width / 2;

export const ProfileScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.bcgImage}
        source={require("../../../assets/images/imgBg.png")}
      >
        <Container addStyles={styles.container}>
          <TouchableOpacity>
            <View style={styles.avatar}>
              {isLoading ? (
                <ActivityIndicator size={"small"} color={"#FF6C00"} />
              ) : (
                <>
                  {!photo ? (
                    <>
                      <Image
                        source={require("../../../assets/images/avatar.png")}
                      />
                      <CrossIcon
                        name="close"
                        size={25}
                        color="#BDBDBD"
                        style={styles.deleteCross}
                      />
                    </>
                  ) : (
                    <AntDesign
                      name="pluscircleo"
                      color="#FF6C00"
                      size={25}
                      style={{
                        ...styles.addCross,
                        backgroundColor: "#F6F6F6",
                      }}
                    />
                  )}
                </>
              )}
            </View>
          </TouchableOpacity>
          <LogoutBtn
            addStyles={{ position: "absolute", top: 25, right: 16 }}
            // addStyles={{ marginLeft: "auto" }}
            onPress={() => navigation.navigate("Login")}
          />
        </Container>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
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
});
