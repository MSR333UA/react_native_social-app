import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

const halfWindowsWidth = Dimensions.get("window").width / 2;
const halfWindowsHeight = Dimensions.get("window").height / 2;

export const ModalView = ({
  children,
  modalVisible,
  setModalVisible,
  width,
  height,
  backgroundColor,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View
        style={{
          ...styles.modalView,
          width: width,
          height: height,
          top: halfWindowsHeight - height / 2,
          left: halfWindowsWidth - width / 2,
          backgroundColor: backgroundColor,
        }}
      >
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    position: "absolute",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
