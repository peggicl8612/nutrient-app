import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../constants/colors';
import { MEAL_TYPES } from '../constants/meals';

export default function MealTypePicker({ value, onChange }) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.row}
        >
            {MEAL_TYPES.map((meal) => {
                const selected = value === meal.id;
                return (
                    <Pressable
                        key={meal.id}
                        onPress={() => onChange(meal.id)}
                        style={[
                            styles.chip,
                            { backgroundColor: selected ? meal.color : colors.surface },
                            selected && styles.chipSelected,
                        ]}
                    >
                        <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                            {meal.label}
                        </Text>
                    </Pressable>
                )
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: { gap: 8, paddingVertical: 12 },
    chip: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },
    chipSelected: {
        color: colors.textPrimary,
    },
    chipText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    chipTextSelected: {
        color: colors.textPrimary,
        fontWeight: '600',
    },
})
  
