import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View className="h-full bg-red-500 pt-20">
      <View className="justify-center px-10 pt-20">
        <Image
          className="h-20 w-full"
          source={{ uri: "https://links.papareact.com/mg9" }}
        />
      </View>

      <Text className="text-white text-center mt-5">
        You and {userSwiped.displayName} have liked each other!
      </Text>

      <View className="flex-row justify-evenly mt-8">
        <Image
          className="h-32 w-32 rounded-full"
          source={{
            uri: loggedInProfile.photoURL,
          }}
        />
        <Image
          className="h-32 w-32 rounded-full"
          source={{
            uri: userSwiped.photoURL,
          }}
        />
      </View>

      <TouchableOpacity
        className="bg-white m-5 px-10 py-6 rounded-full mt-20"
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text className="text-center">Send a Message</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white m-5 px-10 py-6 rounded-full mt-2"
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text className="text-center">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
