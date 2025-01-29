import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PlusIconProps {
  color: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ color }) => {
  return (
    <View style={[styles.container, { borderColor: color }]}>
      <Text style={[styles.plusText, { color: color }]}>+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  plusText: {
    fontSize: 16,
  },
});

export default PlusIcon;
