import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signIn } = useAuth();

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Login" onPress={signIn} />
    </View>
  );
};

export default LoginScreen;
