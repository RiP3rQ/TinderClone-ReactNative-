import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signIn, loading } = useAuth();

  return (
    <View>
      <Text>{loading ? "Loading..." : "LoginScreen wita"}</Text>
      <Button title="Login" onPress={signIn} />
    </View>
  );
};

export default LoginScreen;
