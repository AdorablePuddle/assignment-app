import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { Appearance } from "react-native";

import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from "@react-native-firebase/auth";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
	const [isReady, setIsReady] = useState(false);
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const subscriber = onAuthStateChanged(getAuth(), (user) => {
			setUser(user);
			if (initializing) setInitializing(false);
		});
		return subscriber;
	}, [initializing]);

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
		if (isReady && !initializing) {
			SplashScreen.hideAsync().catch(() => {});
		}
	}, [isReady, initializing]);

	useEffect(() => {
		if (initializing || !isReady) return;

		const inAppGroup = segments[0] === "(tabs)";
		const inAuthGroup = segments[0] === "(auth)";

		if (!user && !inAuthGroup) {
			router.replace("/(auth)/login");
		} else if (user && !inAppGroup) {
			router.replace("/(tabs)");
		}
	}, [user, initializing, isReady, segments, router]);

	return (
		<Stack screenOptions = {{ headerShown : false }}>
			<Stack.Screen name = "(auth)" options = {{ headerShown : false }} />
			<Stack.Screen name = "(tabs)" options = {{ headerShown : false }} />
		</Stack>
	);
}
