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
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState([]);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      // all passes
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passesUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      // fetch FILTERED data from firebase to variable as objects
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passesUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swipe left on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    // console info
    console.log(`You swipe right on ${userSwiped.displayName}`);

    // Check if the user swiped on you...
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (DocumentSnapshot) => {
        if (DocumentSnapshot.exists()) {
          // User has matched with you before you matched with them...
          console.log(`LETS GO! You matched with ${userSwiped.displayName}!`);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
          // CREATE A MATCH!
          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });
          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          // User has swiped as first interaction between the two...
          console.log(`You swiped on ${userSwiped.displayName}!`);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  };

  return (
    <SafeAreaView className="flex-1 top-2">
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
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
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
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          backgroundColor={"#4FD0E9"}
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
          renderCard={(card) =>
            card ? (
              <View
                className="relative bg-white h-5/6 rounded-xl"
                style={styles.cardShadow}
                key={card.id}
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
            ) : (
              <View
                className="relative bg-white h-4/5 rounded-xl justify-center items-center"
                style={styles.cardShadow}
              >
                <Text className="pb-5 font-bold">No more profiles!</Text>
                <Image
                  className="h-20 w-20"
                  source={{
                    uri: "https://links.papareact.com/6gb",
                  }}
                />
              </View>
            )
          }
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
