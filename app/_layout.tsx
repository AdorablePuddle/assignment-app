import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name = "index" options = {{ title: "Home" }} />
			<Stack.Screen name = "login" options = {{ title: "Login" }} />
			<Stack.Screen name = "preference" options = {{ title: "Setting" }} />
			<Stack.Screen name = "tracking" options = {{ title: "Trackboard" }} />
		</Stack>
	);
}
