import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Go to chat screen"
        onPress={() => navigation.navigate("Chat")}
      />
      <Button title="Log out" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
