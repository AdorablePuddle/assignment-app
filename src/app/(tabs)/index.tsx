import { Image, ImageBackground, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useState } from "react";
import { DarkMode, DarkModePalette } from "../stylesheet/dark";
import { LightMode, LightModePalette } from "../stylesheet/light";

export default function Home() {
	// Variables
	const [isRecording, setIsRecording] = useState(false);

	// Defining images and appearances
	const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
	const ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");
	const DistanceImage = require("../assets/images/distance_light.png");

	const recordButton = () => {
		setIsRecording(!isRecording);
	}

	return (
		<View style = {ColorScheme.main}>
			<LinearGradient
				colors = {[
					ColorPalette.accent,
					ColorPalette.vignette,
				]}
				style = {HomeStyleSheet.container}
			>
				<Image 
					source = {TopImage}
					style = {HomeStyleSheet.top_logo}
				/>
				<Text style = {[ColorScheme.title, HomeStyleSheet.title]}>Distance</Text>
				<ImageBackground
					source = {DistanceImage}
					resizeMode = "stretch"
					style = {HomeStyleSheet.image}
				>
					<Text style = {[ColorScheme.content, HomeStyleSheet.text]}>0m</Text>
				</ImageBackground>
				<Pressable
					onPress = {recordButton}
					style = {({pressed}) => [
						HomeStyleSheet.button,
						{
							borderColor : ColorPalette.white,
							borderWidth: 5,
							backgroundColor : (pressed)? ColorPalette.color1 : ColorPalette.color2
						}
					]}
				>
					<Text style = {[HomeStyleSheet.button_text, {color : ColorPalette.white}]}>{(isRecording)? "Stop Recording" : "Start Recording"}</Text>
				</Pressable>
			</LinearGradient>
		</View>
	);
}

const HomeStyleSheet = StyleSheet.create({
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
	image : {
		justifyContent : "center",
		alignItems : "center",
		width : 400,
		height : 200
	},
	title : {
		fontWeight : "bold",
	},
	text : {
		textAlign : "center",
	},
	button : {
		paddingVertical : 10,
		width : 200,
		borderRadius : 10,
	},
	button_text : {
		fontSize : 20,
		textAlign : "center",
	}
});