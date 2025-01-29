import { useItems } from "@/context/listContext";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const MyList = () => {
  const { items, clearCompletedItems, toggleCompleted } = useItems();

  const renderTask = ({ item }: { item: Task }) => (
    <View style={[styles.card, item.completed && styles.completedCard]}>
      <Text style={[styles.taskTitle, item.completed && styles.completedText]}>
        {item.title}
      </Text>
      <TouchableOpacity
        style={[styles.button, item.completed && styles.buttonCompleted]}
        onPress={() => toggleCompleted(item.id)}
      >
        <Text style={styles.buttonText}>
          {item.completed ? "Undo" : "Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearCompletedItems}
        activeOpacity={0.7} // Suaviza o clique
      >
        <Text style={styles.clearButtonText}>Clear Completed Tasks</Text>
      </TouchableOpacity>
      {items.length === 0 ? (
        <Text style={styles.noListItensText}>
          You don't have any tasks left, try adding one.
        </Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.list}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  noListItensText: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Sombra no Android
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedCard: {
    backgroundColor: "white",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
  button: {
    backgroundColor: "#6200ee",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  clearButton: {
    margin: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonCompleted: {
    backgroundColor: "gray",
  },

  clearButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyList;
