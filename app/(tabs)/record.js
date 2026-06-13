// 紀錄
import { useCallback, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { SafeAreaView } from 'react-native-safe-area-context';

import MealTypePicker from '../../components/MealTypePicker';
import NutrientInput from '../../components/NutrientInput';
import MealRecordCard from '../../components/MealRecordCard';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import { MEAL_TYPES } from '../../constants/meals';
import { addMeal, getMealsByDate, getTodayDate } from '../../db/mealRepository';

function parseNumber(text) {
  const n = parseFloat(text);
  return Number.isFinite(n) ? n : 0;
}

function createCustomNutrient() {
  return {id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name: '', value: ''};
}



const EMPTY_FORM = {
  foodName: '',
  calories: '',
  protein: '',
  carbs: '',
  fat: '',
};

const CARD_HEIGHT = 120;
const VISIBLE_COUNT = 3;



export default function RecordScreen() {
  const db = useSQLiteContext();
  const [mealType, setMealType] = useState(MEAL_TYPES[0].id);
  const [form, setForm] = useState(EMPTY_FORM);
  const [todayMeals, setTodayMeals] = useState([]);
  const [saving, setSaving] = useState(false);
  const [customNutrients, setCustomNutrients] = useState([]);


  const loadTodayMeals = useCallback(async () => {
    const meals = await getMealsByDate(db, getTodayDate());
    setTodayMeals(meals);
  }, [db]);


function addCustomNutrient() { 
  setCustomNutrients((prev) => [...prev, createCustomNutrient()]);
}

function updateCustomNutrient(id, field, text) { 
  setCustomNutrients((prev) =>
    prev.map((item) => (item.id === id ? { ...item, [field]: text } : item))
  ); 
}

function deleteCustomNutrient(id) {
  setCustomNutrients((prev) => prev.filter((item) => item.id !== id));
}

  useFocusEffect(
    useCallback(() => {
      loadTodayMeals();
    }, [loadTodayMeals])
  );

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    const foodName = form.foodName.trim();
    if (!foodName) {
      Alert.alert('請輸入餐點名稱');
      return;
    }
    if (form.calories.trim() === '') {
      Alert.alert('請輸入熱量');
      return;
    }

    setSaving(true);

    

    try {
      await addMeal(db, {
        date: getTodayDate(),
        mealType,
        foodName,
        calories: parseNumber(form.calories),
        protein: parseNumber(form.protein),
        carbs: parseNumber(form.carbs),
        fat: parseNumber(form.fat),

        customNutrients: customNutrients
        .filter((n) => n.name.trim() && n.value.trim())
        .map((n) => ({
          name: n.name.trim(),
          value: parseNumber(n.value),
          unit: 'g',
        })),

      });
      setForm(EMPTY_FORM);
      setMealType(MEAL_TYPES[0].id);
      setCustomNutrients([]);
      await loadTodayMeals();
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>餐時紀錄</Text>
          <Text style={styles.subtitle}>輸入食物名稱與營養成分</Text>

          <Text style={styles.sectionLabel}>餐別</Text>
          <MealTypePicker value={mealType} onChange={setMealType} />

          <Text style={styles.sectionLabel}>食物名稱 *</Text>
          <TextInput
            style={styles.textInput}
            value={form.foodName}
            onChangeText={(v) => updateField('foodName', v)}
            placeholder="例如：雞胸便當、拿鐵"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={[styles.sectionLabel, { marginTop: 8 }]}>營養成分</Text>
          <NutrientInput
            label="熱量"
            unit="kcal"
            required
            value={form.calories}
            onChangeText={(v) => updateField('calories', v)}
            accentColor={colors.primary}
          />
          <View style={styles.macroRow}>
            <View style={styles.macroCol}>
              <NutrientInput
                label="蛋白質"
                unit="g"
                value={form.protein}
                onChangeText={(v) => updateField('protein', v)}
                accentColor={colors.protein}
              />
            </View>
            <View style={styles.macroCol}>
              <NutrientInput
                label="碳水"
                unit="g"
                value={form.carbs}
                onChangeText={(v) => updateField('carbs', v)}
                accentColor={colors.carbs}
              />
            </View>
            <View style={styles.macroCol}>
              <NutrientInput
                label="脂質"
                unit="g"
                value={form.fat}
                onChangeText={(v) => updateField('fat', v)}
                accentColor={colors.fat}
              />
            </View>
          </View>

          {/* 自定義營養成分 */}
        {customNutrients.map((item) => (
          <View key={item.id} style={styles.customRow}>
            <TextInput
              style={styles.customNameInput}
              value={item.name}
              onChangeText={(v) => updateCustomNutrient(item.id, 'name', v)}
              placeholder="營養素名稱"
              placeholderTextColor={colors.textSecondary}
            />
            <View style={styles.customValueRow}>
              <TextInput
                style={styles.customValueInput}
                value={item.value}
                onChangeText={(v) => updateCustomNutrient(item.id, 'value', v)}
                keyboardType="decimal-pad"
                placeholder="0"
                placeholderTextColor={colors.textSecondary}
              />
              <Text style={styles.customUnit}>g</Text>
            </View>
            <Pressable
              onPress={() => deleteCustomNutrient(item.id)}
              hitSlop={8}
              style={styles.removeBtn}
            >
              <Ionicons name="close-circle-outline" size={22} color={colors.textSecondary} />
            </Pressable>
          </View>
))}

<Pressable style={styles.addBtn} onPress={addCustomNutrient}>
  <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
  <Text style={styles.addBtnText}>新增營養成分</Text>
</Pressable>

          <Pressable
            style={[styles.submitBtn, saving && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={saving}
          >
            <Text style={styles.submitText}>
              {saving ? '儲存中…' : '儲存餐點'}
            </Text>
          </Pressable>

          {todayMeals.length > 0 && (
            <View style={styles.listSection}>
              <Text style={styles.sectionLabel}>今日已記錄（{todayMeals.length}）</Text>
              <ScrollView
                style={{ maxHeight: CARD_HEIGHT * VISIBLE_COUNT }}
                nestedScrollEnabled
                showsVerticalScrollIndicator={true}
              >
                {todayMeals.map((meal) => (
                  <MealRecordCard key={meal.id} meal={meal} />
                ))}

              </ScrollView>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 40 },
  title: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.textTitle,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 10,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textBody,
    marginBottom: 20,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 8,
  },
  macroCol: { flex: 1 },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listSection: { marginTop: 32 },
  mealCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  mealName: {
    fontSize: 15,
    color: colors.textBody,
    marginBottom: 4,
  },
  mealMeta: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  customNameInput: {
    flex: 1.2,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.textBody,
  },
  customValueRow: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingRight: 12,
  },
  customValueInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.textBody,
  },
  customUnit: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  removeBtn: {
    padding: 4,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 8,
  },
  addBtnText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});
