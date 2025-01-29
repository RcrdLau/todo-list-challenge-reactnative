import React from "react";
import Header from "@/components/Header";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
} from "react-native";
import MyList from "@/components/MyList";

export default function HomeScreen() {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.horizontalContainer}
      showsHorizontalScrollIndicator={false} // Esconde o indicador de rolagem
    >
      <Header title={"My List"} />
      <MyList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  horizontalContainer: {
    flexDirection: "column",
    padding: 0,
    width: "100%",
  },
});
