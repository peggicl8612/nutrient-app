// Root Layout（最外層）
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDatabase } from '../db/schema';
import { ZenOldMincho_400Regular } from '@expo-google-fonts/zen-old-mincho'; 

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [loaded] = useFonts({
        ZenOldMincho_400Regular,
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SQLiteProvider databaseName="nutrient-app.db" onInit={migrateDatabase}>
            <Stack screenOptions={{ headerShown: false }} />
        </SQLiteProvider>
    )
}