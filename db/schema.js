export const DATABASE_VERSION = 2;

export const CREATE_MEALS_TABLE = `
  CREATE TABLE IF NOT EXISTS meals (
    id          TEXT PRIMARY KEY NOT NULL, 
    date        TEXT NOT NULL,
    meal_type   TEXT NOT NULL,
    food_name   TEXT NOT NULL,
    calories    REAL NOT NULL DEFAULT 0,
    protein     REAL NOT NULL DEFAULT 0,
    carbs       REAL NOT NULL DEFAULT 0,
    fat         REAL NOT NULL DEFAULT 0,
    fiber       REAL DEFAULT 0,
    custom_nutrients TEXT DEFAULT '[]',
    photo_url   TEXT,
    remote_id   TEXT,
    synced_at   TEXT,
    created_at  TEXT NOT NULL,
    updated_at  TEXT NOT NULL
  );
`;

export const CREATE_SETTINGS_TABLE = `
  CREATE TABLE IF NOT EXISTS settings (
    key   TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
  );
`;

export const CREATE_MEALS_DATE_INDEX = `
  CREATE INDEX IF NOT EXISTS idx_meals_date ON meals (date);
`;

/* App 啟動時由 SQLiteProvider 呼叫，建立 / 升級資料表 */
export async function migrateDatabase(db) {
    const { user_version: currentVersion } = await db.getFirstAsync(
        'PRAGMA user_version'
    );

    if (currentVersion >= DATABASE_VERSION) {
        return;
    }

    if (currentVersion === 0) {
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            PRAGMA foreign_keys = ON;
            ${CREATE_MEALS_TABLE}
            ${CREATE_SETTINGS_TABLE}
            ${CREATE_MEALS_DATE_INDEX}
            `);
        
        // 預設每日目標熱量
        await db.runAsync(
            'INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)',
            'daily_calories_goal',
            '2000'
        );

        // 未來升級範例：
        // if (currentVersion === 1) { ... }
        
      await db.execAsync(`PRAGMA user_version = 2`);
      return;
    }
  
  /* 自定義營養成分 */
  if (currentVersion === 1) {
    await db.execAsync(`
      ALTER TABLE meals ADD COLUMN custom_nutrients TEXT DEFAULT '[]';
      PRAGMA user_version = 2;
      `)
  }
}

