import {colors} from '../constants/colors';
import { StyleSheet, View, Text } from 'react-native';
import { getMealTypeById } from '../constants/meals';


const NUTRIENT_FIELD = [
    { key: 'protein', label: '蛋白質', unit: 'g', color: colors.protein},
    { key: 'carbs', label: '碳水', unit: 'g', color: colors.carbs},
    { key: 'fat', label: '脂質', unit: 'g', color: colors.fat},
    { key: 'fiber', label: '膳食纖維', unit: 'g', color: colors.fiber }
]

export default function MealRecordCard({ meal }) {
    const mealType = getMealTypeById(meal.meal_type);
    const customList = (() => {
        try {
            return JSON.parse(meal.custom_nutrients || '[]');
        } catch (error) {
            return [];
        }
    })();



    return (
        <View style={styles.card} >
            <View style={styles.header} >
                <Text style={styles.name} numberOfLines={1} >{meal.food_name}</Text>
                {/* badge 是標籤 */}
                <View style={[styles.badge, { backgroundColor: mealType.color }]} >
                    <Text style={styles.badgeText}>{mealType.label}</Text>
                </View>
            </View>

            <Text style={styles.calories}>{Math.round(meal.calories)} kcal</Text>
            
            <View style={styles.nutrients}>
  {NUTRIENT_FIELD.filter((field) => meal[field.key] > 0).map((field) => (
    <Text key={field.key} style={[styles.nutrient, { backgroundColor: field.color }]}  >
      {field.label} {meal[field.key]}{field.unit}
    </Text>
  ))}
  {customList
  .filter((item) => item.value > 0)
  .map((item, i) => (
    <Text key={`custom-${i}`} style={[styles.nutrient, { backgroundColor: colors.primaryBg }]}>
      {item.name} {item.value}{item.unit ?? 'g'}
    </Text>
  ))}
</View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 14,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    name: {
      flex: 1,
      fontSize: 15,
      color: colors.textBody,
      marginRight: 8,
    },
    badge: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 12,
    },
    badgeText: {
      fontSize: 12,
      color: colors.textPrimary,
      fontWeight: '600',
    },
    calories: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: 8,
    },
    nutrients: {
      flexDirection: 'row',
        flexWrap: 'wrap',
      gap: 8,
    },
    nutrient: {
        borderRadius: 99,
        paddingVertical: 4,
        opacity: 0.7,
        paddingHorizontal: 8,
      fontSize: 12,
    },
  });

  
