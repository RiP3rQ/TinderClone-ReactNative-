import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView>
      {/* HEADER */}
      <View className="flex-row items-center justify-between relative px-5">
        {/* AVATAR ELEMENT*/}
        <TouchableOpacity onPress={logout}>
          <Image
            source={{
              uri: user.photoURL,
            }}
            className="h-10 w-10 rounded-full"
          />
        </TouchableOpacity>
        {/* LOGO ELEMENT*/}
        <TouchableOpacity>
          <Image source={require("../logo.png")} className="h-12 w-12" />
        </TouchableOpacity>
        {/* MESSAGES ELEMENT */}
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={45} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* END OF HEADER */}

      {/* SWIPER CARDS */}
    </SafeAreaView>
  );
};

export default HomeScreen;
