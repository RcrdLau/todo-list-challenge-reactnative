import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Header from "@/components/Header";
import AddItem from "@/components/AddItem";

export default function TabTwoScreen() {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.horizontalContainer}
      showsHorizontalScrollIndicator={false}
    >
      <Header title={"New Item"} />
      <AddItem />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "column",
    padding: 0,
    width: "100%",
  },
});
