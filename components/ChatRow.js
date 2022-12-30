import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
      style={styles.cardShadow}
      onPress={() =>
        navigation.navigate("Message", {
          matchDetails,
        })
      }
    >
      <Image
        className="rounded-full h-16 w-16 mr-4"
        source={{
          uri: matchedUserInfo?.photoURL,
        }}
        // matchedUserInfo?.photoURL
        //                ^ very important (at some point might be null)
      />
      <View>
        <Text className="text-lg font-semibold">
          {matchedUserInfo?.displayName}
        </Text>
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
