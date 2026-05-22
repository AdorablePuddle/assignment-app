import * as SecureStore from 'expo-secure-store';
import { Appearance, Image, ScrollView, StyleSheet, Switch, Text, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useEffect, useState } from 'react';
import { DarkMode, DarkModePalette } from "../stylesheet/dark";
import { LightMode, LightModePalette } from "../stylesheet/light";

function setAppearance(appearance : string) {
	SecureStore.setItem("appearance", appearance);
}

export default function Preference() {
	// Variables
	const [darkModeToggle, setDarkModeToggle] = useState(Appearance.getColorScheme());

	const storedColorScheme = useColorScheme();
	const isDarkMode = storedColorScheme === "dark";

	const toggleDarkMode = (value : boolean) => {
		const newColorScheme = (value)? "dark" : "light";
		Appearance.setColorScheme(newColorScheme);
		setAppearance(newColorScheme);

		setDarkModeToggle(newColorScheme);
	}

	// Defining images and appearances
	const ColorScheme = (isDarkMode)? DarkMode : LightMode;
	const ColorPalette = (isDarkMode)? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");

	useEffect(() => {
		Appearance.addChangeListener(({colorScheme}) => setDarkModeToggle(colorScheme));
	}, []);

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
						<Text style = {[PreferenceStyleSheet.setting_text, {color : ColorPalette.color1}]}>Dark Mode</Text>
						<Switch 
							trackColor = {{false : ColorPalette.white, true : ColorPalette.color2}}
							thumbColor = {ColorPalette.color1}
							onValueChange = {toggleDarkMode}
							value = {(darkModeToggle === "dark")? true : false}
						/>
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
		flexDirection : "row",
		justifyContent : "space-around",
	},
	setting_text : {
		fontSize : 20,
	},
});