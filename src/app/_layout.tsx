import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { Appearance } from "react-native";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function getAppearance() {
			let result = await SecureStore.getItemAsync("appearance");
			if (result) {
				if (result === "dark" || result === "light") {
					Appearance.setColorScheme(result);
					return;
				}
			}
			alert("No preference data found. Defaulting to dark mode. Preference changes is available in setting.");
			await SecureStore.setItemAsync("appearance", "dark");
			Appearance.setColorScheme("dark");
			setIsReady(true);
		}
		getAppearance();
	}, []);

	useEffect(() => {
		if (isReady) {
			SplashScreen.hideAsync().catch(() => {});
		}
	}, [isReady]);

	return (
		<Stack screenOptions = {{ headerShown : false }}>
			<Stack.Screen name = "(tabs)" options = {{ headerShown : false }} />
		</Stack>
	);
}
