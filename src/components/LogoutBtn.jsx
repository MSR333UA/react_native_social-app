import { TouchableOpacity } from "react-native";
import LogoutIcon from "../../assets/icons/log-out.svg";

export const LogoutBtn = ({ onPress, addStyles }) => {
  return (
    <TouchableOpacity style={{ ...addStyles }} onPress={onPress}>
      <LogoutIcon height={24} width={24} />
    </TouchableOpacity>
  );
};
