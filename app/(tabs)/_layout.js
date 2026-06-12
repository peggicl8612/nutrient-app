// Tab navigator（Tab 群組內層）
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // 隱藏標題
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                },
            }}
        >
            <Tabs.Screen
                name="record"
                options={{
                    title: '紀錄',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle-outline" size={size} color={ color} />
                    )
                }}
            />

            <Tabs.Screen
                name="index"
            options={{
                title: '首頁',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={ color} />
                )
            }}
            />

            <Tabs.Screen
                name="report"
                options={{
                    title: '報表',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bar-chart-outline" size={size} color={ color} />
                    )
                }}
            />

            <Tabs.Screen
                name="setting"
                options={{
                    title: '設定',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    )
                }}
            />

        </Tabs>
    )
}