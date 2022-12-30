import { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "../components/ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );

  return matches.length > 0 ? (
    <FlatList
      className="h-full"
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View>
      <Text>No matches at the moment!🥶</Text>
    </View>
  );
};

export default ChatList;
