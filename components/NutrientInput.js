import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../constants/colors';

export default function NutrientInput({
  label,
  value,
  onChangeText,
  unit,
  required = false,
  accentColor = colors.primary,
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <View style={[styles.dot, { backgroundColor: accentColor }]} />
        <Text style={styles.label}>
          {label}
          {required ? <Text style={styles.required}> *</Text> : null}
        
        </Text>
      </View>
      <View style={styles.inputRow} >
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="decimal-pad"
        placeholder="0"
        placeholderTextColor={colors.textSecondary}
      />
              {unit ? <Text style={styles.unit}>{unit}</Text> : null}
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    flex: 1,
    fontSize: 14,
    color: colors.textBody,
  },
  required: { color: colors.error },
  unit: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingRight: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textBody,
  },
  
});
