import * as SecureStore from 'expo-secure-store';
import { Alert, Appearance, Image, Pressable, ScrollView, StyleSheet, Switch, Text, useColorScheme, View } from "react-native";

import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut } from '@react-native-firebase/auth';
import { LinearGradient } from "expo-linear-gradient";

import { useEffect, useState } from 'react';
import { DarkMode, DarkModePalette } from "../stylesheet/dark";
import { LightMode, LightModePalette } from "../stylesheet/light";

function setAppearance(appearance : string) {
	SecureStore.setItem("appearance", appearance);
}

export default function Preference() {
	// Variables
	const [isLoading, setIsLoading] = useState(false);
	const [darkModeToggle, setDarkModeToggle] = useState(Appearance.getColorScheme());

	const storedColorScheme = useColorScheme();
	const isDarkMode = storedColorScheme === "dark";

	const auth = getAuth();
	const user = auth.currentUser;

	// Defining images and appearances
	const ColorScheme = (isDarkMode)? DarkMode : LightMode;
	const ColorPalette = (isDarkMode)? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");

	useEffect(() => {
		Appearance.addChangeListener(({colorScheme}) => setDarkModeToggle(colorScheme));
	}, []);

	// Functionality:

	const toggleDarkMode = (value : boolean) => {
		const newColorScheme = (value)? "dark" : "light";
		Appearance.setColorScheme(newColorScheme);
		setAppearance(newColorScheme);

		setDarkModeToggle(newColorScheme);
	}

	// Logging out
	const loggingOut = async () => {
		try {
			await signOut(auth);

		} catch (error : any) {
			console.error(error)
		}
	}

	// Deleting account
	const deleteAccountConfirmation = () => {
		Alert.alert(
			"Deleting Account",
			"This action cannot be undone. None of your user data will be saved.",
			[
				{text : "Cancel", style: "cancel"},
				{text : "Proceed", style: "destructive", onPress: () => deleteAccount()}
			]
		)
	}

	const deleteUserData = async (uid: string) => {
		console.log("Deleting data for user: ", uid);
		// Wiping data from here:

		console.log("Finish data removal");
	}

	const deleteAccount = async (retryPassword?: string) => {
		if (!user) return;

		try {
			if (retryPassword && user.email) {
				const credential = EmailAuthProvider.credential(user.email, retryPassword);
				await reauthenticateWithCredential(user, credential);
			}

			await deleteUserData(user.uid);

			await deleteUser(user);
		} catch (error : any) {	
			console.log("   Error code: " + error.code);
			console.log("Error message: " + error.message);

			if (error.code === "auth/requires-recent-login") {
				console.log("Prompting...");
				Alert.alert(
					"Error",
					"For security reason, please log out and log back in before deleting account."
				);
			} else if (error.code === "auth/wrong-password") {
				Alert.alert("Error", "Incorrect password.");
				console.error("Account deletion voided.");
			} else {
				Alert.alert("Error", "Unknown error occurred.");
				console.error("Account deletion voided.");
			}
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<View style = {ColorScheme.main}>
			<LinearGradient
				colors = {[
					ColorPalette.accent,
					ColorPalette.vignette,
				]}
				style = {PreferenceStyleSheet.container}
			>
				<Image 
					source = {TopImage}
					style = {PreferenceStyleSheet.top_logo}
				/>
				<ScrollView style = {PreferenceStyleSheet.setting_view}>
					{
						// Each view is a section of the setting.
					}
					<Text style = {[PreferenceStyleSheet.setting_title, {color : ColorPalette.color1}]}>
						Appearance
					</Text>
					<View style = {PreferenceStyleSheet.setting_options}>
						<View style = {PreferenceStyleSheet.setting_box}>
							<Text style = {[PreferenceStyleSheet.setting_text, {color : ColorPalette.color1}]}>Dark Mode</Text>
							<Switch 
								trackColor = {{false : ColorPalette.white, true : ColorPalette.color2}}
								thumbColor = {ColorPalette.color1}
								onValueChange = {toggleDarkMode}
								value = {(darkModeToggle === "dark")? true : false}
								disabled = {isLoading}
							/>
						</View>
					</View>
					<Text style = {[PreferenceStyleSheet.setting_title, {color : ColorPalette.color1}]}>
						Account
					</Text>
					<View style = {[
						PreferenceStyleSheet.setting_options,
						{
							borderWidth : 0,
						}
					]}>
						<Pressable
							style = {({pressed}) => [
								{
									borderColor : ColorPalette.white,
									borderWidth: 2,
									backgroundColor : (pressed)? ColorPalette.color1 : ColorPalette.color2
								},
								PreferenceStyleSheet.setting_logout_box,
							]}
							disabled = {isLoading}
						>
							<Text
								style = {[
									PreferenceStyleSheet.setting_text,
									{
										color : ColorPalette.white,
									}
								]}
								onPress = {loggingOut}
							>
								Log out
							</Text>
						</Pressable>
						<Pressable
							disabled = {isLoading}
						>
							<Text
								style = {[
									PreferenceStyleSheet.setting_text,
									{
										color : ColorPalette.warning,
									}
								]}
								onPress = {deleteAccountConfirmation}
							>
								Delete Account
							</Text>
						</Pressable>
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	);
}

const PreferenceStyleSheet = StyleSheet.create({
	container : {
		flex : 1,
		flexDirection : "column",
		alignItems : "center",
	},
	top_logo : {
		resizeMode : "stretch",
		width : "130%",
		height : "15%",
	},
	setting_view : {
		flexDirection : "column",
		width : "100%",
		paddingHorizontal : 10,
	},
	setting_title : {
		fontSize : 35,
		fontWeight : "bold",
	},
	setting_options : {
		flexDirection : "column",
		borderColor : "#ffffff",
		borderWidth : 1,
		borderRadius : 3,
		paddingVertical : 5,
		marginVertical : 5,
	},
	setting_box : {
		flexDirection : "row",
		justifyContent : "space-around",
	},
	setting_text : {
		fontSize : 20,
		textAlign : "center",
	},
	setting_logout_box : {
		paddingVertical : 10,
		paddingHorizontal : 30,
		margin : 5,
	}
});