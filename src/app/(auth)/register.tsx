import { Image, StyleSheet, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { DarkMode, DarkModePalette } from "../stylesheet/dark";
import { LightMode, LightModePalette } from "../stylesheet/light";

export default function Login() {
	// Variables
	
	// Defining images and appearances
	const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
	const ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");

	return (
		<View style = {ColorScheme.main}>
			<LinearGradient
				colors = {[
					ColorPalette.accent,
					ColorPalette.vignette,
				]}
				style = {RegisterStyleSheet.container}
			>
				<Image 
					source = {TopImage}
					style = {RegisterStyleSheet.top_logo}
				/>
				
			</LinearGradient>
		</View>
	);
}

const RegisterStyleSheet = StyleSheet.create({
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
});