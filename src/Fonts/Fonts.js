import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    InterMedium: require("../../assets/fonts/InterMedium.ttf"),
    RobotoRegular: require("../../assets/fonts/RobotoRegular.ttf"),

    RobotoBold: require("../../assets/fonts/RobotoBold.ttf"),
    RobotoMedium: require("../../assets/fonts/RobotoMedium.ttf"),
  });
};
