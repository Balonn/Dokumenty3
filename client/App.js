import * as React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dodaj from "./screens/dodaj";
import listaDokumentow from "./screens/lista-dokumentow";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dodaj" component={Dodaj} />
        <Stack.Screen name="listaDokumentow" component={listaDokumentow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Wybierz akcję</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Dodaj")}
      >
        <Text style={styles.buttonText}>Dodaj dokument</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("listaDokumentow")}
      >
        <Text style={styles.buttonText}>Lista dokumentów</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#e91e63",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "white",
  },
});
