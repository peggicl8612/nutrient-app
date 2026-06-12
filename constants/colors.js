// constants/colors.js
// 配色來源：nutrient-animation 網站

export const colors = {
    // ── 背景 ──
    background: '#FAFAF7',       // 頁面主背景
    surface: '#FFFFFF',          // 卡片、面板
    surfaceMuted: 'rgba(255, 255, 255, 0.55)', // 半透明面板
  
    // ── 文字 ──
    textPrimary: '#575757',      // 主標題、數值
    textTitle: '#444444',        // 區塊標題
    textBody: '#333333',         // 表單內文
    textSecondary: '#9A9A9A',    // 副標題、標籤
    textMuted: '#6B6B6B',        // 說明文字
    textHint: '#777777',         // 次要提示
  
    // ── 主色（按鈕、熱量、強調）──
    primary: '#3D4A66',          // 深藍灰（熱量數字、按鈕）
    primaryMid: '#5A6A8A',       // 中藍灰（按鈕漸層起點）
    primaryLight: '#7A8AB0',     // 淺藍灰（進度條）
    primaryBg: 'rgba(90, 106, 138, 0.08)', // 淺色背景區塊
  
    // ── 邊框 / 陰影 ──
    border: 'rgba(0, 0, 0, 0.08)',
    borderLight: 'rgba(17, 17, 17, 0.06)',
    shadow: '#000000',
    cardShadow: 'rgba(100, 140, 180, 0.1)',
  
    // ── 巨量營養素 ──
    protein: '#6A9FD4',          // 蛋白質（冰晶星球）
    carbs: '#E8A060',              // 碳水化合物（氣態星球）
    fat: '#C4A8E8',                // 脂質
    fiber: '#A08CFF',              // 膳食纖維（類地星球）
  
    // ── 星球光暈（可選，做漸層或 glow 效果）──
    proteinGlow: 'rgba(100, 160, 255, 0.2)',
    carbsGlow: 'rgba(255, 160, 90, 0.2)',
    fiberGlow: 'rgba(160, 140, 255, 0.15)',
  
    // ── 餐別色（早餐 / 午餐 / 點心 / 晚餐 / 宵夜）──
    mealBreakfast: '#F3E7C4',
    mealLunch: '#E8F0D8',
    mealSnack: '#F5E6DC',
    mealDinner: '#E4E0F0',
    mealNight: '#D8E4F0',
  
    // ── 狀態色 ──
    error: '#B54A4A',
    loading: '#5A6A8A',
  };