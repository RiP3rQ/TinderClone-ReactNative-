import { View, Text } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>LoginScreen {user}</Text>
    </View>
  );
};

export default LoginScreen;
