// 首頁
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { useCallback, useState } from 'react';
import { getNutrientSummary, getTodayDate } from '../../db/mealRepository';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [totalCalories, setTotalCalories] = useState(0);

  useFocusEffect(
    useCallback(() => {
      async function load() {
        const summary = await getNutrientSummary(db, getTodayDate());
        setTotalCalories(Math.round(summary?.totalCalories ?? 0))
      }
      load();
    }, [db])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>營養食刻</Text>
      <Text style={styles.subtitle}>紀錄每一克營養成分</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>今日熱量：{ totalCalories} kcal</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 32,
    fontWeight: '600',
    color: colors.textTitle,
    marginBottom: 4,
    
    
  },
  subtitle: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 12, 
    paddingHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3, // Android 陰影
  },
  cardText: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.textBody,
  }
});
