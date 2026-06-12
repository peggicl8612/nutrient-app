// 紀錄
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import {addMeal, getTodayDate} from '../../db/mealRepository';

export default function RecordScreen() {

  const db = useSQLiteContext();
  const [message, setMessage] = useState('');

  async function handleAddMeal() {
    await addMeal(db, {
      date: getTodayDate(),
      mealType: 'lunch',
      foodName: 'Test Food',
      calories: 520,
      protein: 30,
      carbs: 60,
      fat: 15
    });
    setMessage('已新增一筆餐點！回到首頁查看熱量');

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>餐時紀錄</Text>
      <Text style={styles.subtitle}>新增餐點、上傳照片</Text>

      <Pressable style={styles.button} onPress={handleAddMeal}>
        <Text style={ styles.buttonText}>新增餐點</Text>
      </Pressable>

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.textTitle,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    marginTop: 16,
    color: colors.textSecondary,
    fontSize: 14,
  },
});