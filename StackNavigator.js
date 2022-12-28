import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider } from "./hooks/useAuth";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const user = false;

  return (
    <NavigationContainer>
      {/* HOC - HIGHER ORDER COMPONENT */}
      <AuthProvider>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default StackNavigator;
