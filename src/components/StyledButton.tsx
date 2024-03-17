import React from "react";
import { Button, StyleSheet, View } from "react-native";

type Props = {
  title: string;
  onClickHandler: () => void;
};

function StyledButton({ title, onClickHandler }: Props) {
  return (
    <View style={styles.container}>
      <Button title={title} onPress={onClickHandler} />
    </View>
  );
}

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    width: 180,
  },
});
