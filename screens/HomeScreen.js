import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { useRef } from "react";

const DUMMY_DATA = [
  {
    displayName: "Rafal Pompa",
    job: "esssaa",
    photoURL: "https://nafakcie.pl/wp-content/uploads/2022/08/gigachad-1.jpg",
    age: 22,
  },
  {
    displayName: "Sonny Sangha",
    job: "IT",
    photoURL: "https://avatars.githubusercontent.com/u/24712956?v=4",
    age: 27,
  },
  {
    displayName: "Elon Musk",
    job: "Money making",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Elon_Musk_Royal_Society.jpg/640px-Elon_Musk_Royal_Society.jpg",
    age: 44,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);

  return (
    <SafeAreaView className="flex-1">
      {/* HEADER */}
      <View className="flex-row items-center justify-between relative px-5 top-2">
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
      <View className="flex-1 -mt-6">
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  textAlign: "left",
                  color: "#4DED30",
                },
              },
            },
          }}
          onSwipedLeft={() => {
            console.log("NOPE");
          }}
          onSwipedRight={() => {
            console.log("MATCH");
          }}
          verticalSwipe={false}
          renderCard={(card) => (
            <View
              className="relative bg-white h-5/6 rounded-xl"
              style={styles.cardShadow}
            >
              <Image
                source={{
                  uri: card.photoURL,
                }}
                className="absolute top-0 h-full w-full rounded-xl"
              />
              <View className="absolute bottom-0 bg-neutral-400/[.2] w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl">
                <View>
                  <Text className="text-white text-3xl font-bold">
                    {card.displayName}
                  </Text>
                  <Text className="text-white text-lg">{card.job}</Text>
                </View>
                <Text className="text-white text-2xl font-bold">
                  {card.age}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      {/* END OF SWIPER CARDS */}

      {/* BOTTOM BUTTONS */}
      <View className="flex flex-row justify-evenly bottom-6">
        {/* LEFT BUTTON*/}
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={30} color="red" />
        </TouchableOpacity>
        {/* RIGHT BUTTON */}
        <TouchableOpacity
          className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={30} color="green" />
        </TouchableOpacity>
      </View>
      {/* END OF BOTTOM BUTTONS */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 20,
  },
});
