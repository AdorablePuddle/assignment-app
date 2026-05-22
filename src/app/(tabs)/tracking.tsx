import { Image, StyleSheet, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { DarkMode, DarkModePalette } from "../stylesheet/dark";
import { LightMode, LightModePalette } from "../stylesheet/light";

export default function Tracking() {
	// Variables

	// Defining images and appearances
	let ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
	let ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");

	return (
		<View style = {ColorScheme.main}>
			<LinearGradient
				colors = {[
					ColorPalette.accent,
					ColorPalette.vignette,
				]}
				style = {TrackingStyleSheet.container}
			>
				<Image 
					source = {TopImage}
					style = {TrackingStyleSheet.top_logo}
				/>
				
			</LinearGradient>
		</View>
	);
}

const TrackingStyleSheet = StyleSheet.create({
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