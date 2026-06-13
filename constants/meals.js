import { colors } from './colors';

export const MEAL_TYPES = [
    { id: 'breakfast', label: '早餐', color: colors.mealBreakfast },
    { id: 'lunch', label: '午餐', color: colors.mealLunch },
    { id: 'snack', label: '點心', color: colors.mealSnack },
    { id: 'dinner', label: '晚餐', color: colors.mealDinner },
    { id: 'night', label: '宵夜', color: colors.mealNight },
];

export function getMealTypeById(id) {
    /* surface 是預設值 */
    return MEAL_TYPES.find((meals) => meals.id === id) ?? { label: id, color: colors.surface };
}


