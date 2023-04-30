import { Text, TouchableOpacity } from "react-native";

export const SubmitBtn = ({ text, onPress, position, disabled = false }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};
