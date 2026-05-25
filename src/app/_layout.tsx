import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { Appearance } from "react-native";

import { FirebaseAuthTypes, getAuth, onAuthStateChanged, signOut } from "@react-native-firebase/auth";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
	const [isReady, setIsReady] = useState(false);
	const [initializing, setInitializing] = useState(true);
	const [isNavigationReady, setIsNavigationReady] = useState(false);
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

	const auth = getAuth();

	const segments = useSegments();
	const router = useRouter();

	// Get auth
	useEffect(() => {
		const subscriber = onAuthStateChanged(getAuth(), async (user) => {
			if (user && user.isAnonymous && initializing) {
				try {
					console.log("Returning user is a Guest. Clearing session...");
					setUser(null);
					if (initializing) setInitializing(false);
					await signOut(auth);
					return;
				} catch (e) {
					console.error("Failed to clear guest session on startup: ", e);
				}
			} else {
				if (!user)
					console.log("No active user session found.");
				else 
					console.log("Found user session: " + user.email);
				setUser(user);
			}
			if (initializing) setInitializing(false);
		});
		return subscriber;
	}, [auth, initializing]);

	// Get theme
	useEffect(() => {
		async function getAppearance() {
			let result = await SecureStore.getItemAsync("appearance");
			if (result) {
				if (result === "dark" || result === "light") {
					Appearance.setColorScheme(result);
					setIsReady(true);
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

	// Route control
	useEffect(() => {
		if (initializing || !isReady) return;

		const inAppGroup = segments[0] === "(tabs)";
		const inAuthGroup = segments[0] === "(auth)";

		if (!user) {
			if (!inAuthGroup) {
				console.log("RE-ROUTING -> No user found. Forcing to Login Screen.");
				router.replace("/(auth)/login");
			} else {
				setIsNavigationReady(true);
			}
		} else {
			if (!inAppGroup) {
				console.log("RE-ROUTING -> User authenticated. Sending to App Dashboard.");
				router.replace("/(tabs)");
			} else {
				setIsNavigationReady(true);
			}
		}
	}, [user, initializing, isReady, segments, router]);

	// Splash Screen
	useEffect(() => {
		if (isNavigationReady) {
			SplashScreen.hideAsync().catch(() => {});
		}
	}, [isNavigationReady]);
		
	// if (initializing || !isReady) return null;

	return (
		<Stack screenOptions = {{ headerShown : false }}>
			<Stack.Screen name = "(auth)" options = {{ headerShown : false }} />
			<Stack.Screen name = "(tabs)" options = {{ headerShown : false }} />
		</Stack>
	);
}
