import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View, Text, Button, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

type Props = {
  data: ScannedData;
  onCancelHandler: () => void;
  onSubmitHandler: (data: Required<ScannedData>) => void;
};

export type ScannedData = StockFormData;

type StockFormData = {
  stockNumber: string;
  description: string;
  heatNumber: string;
  weight: number;
  stockInOrOut: string;
};

function DataForm({ data, onCancelHandler, onSubmitHandler }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StockFormData>({
    defaultValues: {
      stockNumber: data.stockNumber,
      description: data.description,
      heatNumber: data.heatNumber,
      weight: 0,
      stockInOrOut: "IN",
    },
  });

  const onSubmit = (data: ScannedData) => onSubmitHandler(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory form</Text>
      <View>
        <Text style={styles.label} nativeID="stockNumber">
          Stock number
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.inputContainer}
              accessibilityLabel="input"
              accessibilityLabelledBy="stockNumber"
              placeholder="Stock number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="stockNumber"
        />
        {errors.stockNumber && <Text>This is required.</Text>}
      </View>

      <View>
        <Text style={styles.label} nativeID="description">
          Description
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.inputContainer}
              accessibilityLabel="input"
              accessibilityLabelledBy="description"
              placeholder="Description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="description"
        />
        {errors.description && <Text>This is required.</Text>}
      </View>

      <View>
        <Text style={styles.label} nativeID="heatNumber">
          Heat number
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.inputContainer}
              accessibilityLabel="input"
              accessibilityLabelledBy="heatNumber"
              placeholder="Heat number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="heatNumber"
        />
        {errors.heatNumber && <Text>This is required.</Text>}
      </View>

      <View>
        <Text style={styles.label} nativeID="weight">
          Weight in kg
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.inputContainer}
              accessibilityLabel="input"
              accessibilityLabelledBy="weight"
              placeholder="Weight"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value?.toString()}
            />
          )}
          name="weight"
        />
        {errors.weight && <Text>This is required.</Text>}
      </View>

      <View>
        <Text style={styles.label} nativeID="stockInOrOut">
          Usage
        </Text>
        <Controller
          name="stockInOrOut"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group value={value || "IN"} onValueChange={onChange}>
              <RadioButton.Item label="Stock in" value="IN" />
              <RadioButton.Item label="Stock out" value="OUT" />
            </RadioButton.Group>
          )}
        />
      </View>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <Button
        title="Cancel"
        onPress={() => {
          onCancelHandler();
          reset();
        }}
      />
    </View>
  );
}

export default DataForm;

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
  label: {
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    borderRadius: 5,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
