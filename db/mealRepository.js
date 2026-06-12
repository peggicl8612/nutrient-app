/* 產生簡單 UUID（之後可換 expo-crypto） */
function generateId() {
    // 日期 + 隨機字串 (2, 9)代表從第2個字元開始取9個字元
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/* 今天日期 YYYY-MM-DD */
export function getTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    /* 月份從0開始，所以+1，padStart(2, '0')代表如果月份只有1位數，則在前面補0 */
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

/* 新增一筆餐點 */
export async function addMeal(db, meal) {
    const now = new Date().toISOString();
    const id = generateId();

    await db.runAsync(
        `INSERT INTO meals (
          id, date, meal_type, food_name, calories, protein, carbs, fat, fiber, photo_url, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        id,
        meal.date,
        meal.mealType,
        meal.foodName,
        meal.calories ?? 0,
        meal.protein ?? 0,
        meal.carbs ?? 0,
        meal.fat ?? 0,
        meal.fiber ?? 0,
        meal.photoUrl ?? null,
        now,
        now
    );
    return id;
}

/* 查詢某天的所有餐點 */
export async function getMealsByDate(db, date) {
    return db.getAllAsync(
        'SELECT * FROM meals WHERE date = ? ORDER BY created_at DESC',
        date
    );
}


/* 查詢某天的營養加總 */
export async function getNutrientSummary(db, date) {
    return db.getFirstAsync(
        `SELECT
           COALESCE(SUM(calories), 0) AS totalCalories,
           COALESCE(SUM(protein), 0) AS totalProtein,
           COALESCE(SUM(carbs), 0) AS totalCarbs,
           COALESCE(SUM(fat), 0) AS totalFat,
           COUNT(*)
        FROM meals
        WHERE date = ?`,
        date
    );
}

/* 刪除一筆餐點 */
export async function deleteMeal(db, id) {
    await db.runAsync('DELETE FROM meals WHERE id = ?', id);
}

/* 讀取設定 */
export async function getSetting(db, key) {
    const row = await db.getFirstAsync(
        'SELECT value FROM settings WHERE key = ?',
        key
    );
    return row?.value ?? null;
}

/* 寫入設定 */
export async function setSetting(db, key, value) {
    await db.runAsync(
        'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
        key,
        String(value)
    );
}