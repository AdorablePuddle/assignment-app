import { Image, Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useState } from "react";
import { DarkMode, DarkModePalette } from "../stylesheet/dark";
import { LightMode, LightModePalette } from "../stylesheet/light";

export default function Login() {
	// Variables
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	
	// Defining images and appearances
	const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
	const ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");

	// Login flow:
	const handleLogin = async () => {
		
	}

	// Registration flow:
	const handleRegistration = async () => {
		
	}

	// Guest login:
	const handleGuestLogin = async () => {

	}

	return (
		<View style = {ColorScheme.main}>
			<LinearGradient
				colors = {[
					ColorPalette.accent,
					ColorPalette.vignette,
				]}
				style = {LoginStyleSheet.container}
			>
				<Image 
					source = {TopImage}
					style = {LoginStyleSheet.top_logo}
				/>
				<View style = {LoginStyleSheet.login_field}>
					<Text style = {[
						ColorScheme.title,
						LoginStyleSheet.title_text
					]}>
						Login to Puddle&apos;s StepApp
					</Text>
					<TextInput
						style = {[
							LoginStyleSheet.email_field,
						]}
						onChangeText = {setEmail}
						value = {email}
						placeholder = "Email"
						keyboardType = "email-address"
					/>
					<TextInput
						style = {[
							LoginStyleSheet.password_field,
						]}
						onChangeText = {setPassword}
						value = {password}
						placeholder = "Password"
						secureTextEntry = {true}
					/>
					<Pressable
						style = {[
							LoginStyleSheet.login_button
						]}
						onPress = {handleLogin}
					>
						<Text style = {LoginStyleSheet.login_button_text}>Login</Text>
					</Pressable>
				</View>
			</LinearGradient>
		</View>
	);
}

const LoginStyleSheet = StyleSheet.create({
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
	login_field : {
		flex : 1,
		flexDirection : "column",
		padding : 30,
		alignItems : "center",
	},
	title_text : {
		fontSize : 25,
		fontWeight : "bold",
	},
	email_field : {
		width : 325,
		borderColor : "#ffffff",
		borderWidth : 2,
		borderRadius : 3,
		padding : 10,
		margin : 5,
		fontSize : 15,
		color : "#ffffff",
	},
	password_field : {
		width : 325,
		borderColor : "#ffffff",
		borderWidth : 2,
		borderRadius : 3,
		padding : 10,
		margin : 5,
		fontSize : 15,
		color : "#ffffff",
	},
	login_button : {
		borderColor : "#ffffff",
		borderWidth : 2,
		borderRadius : 3,
		padding : 3,
		width : 150,
	},
	login_button_text : {
		textAlign : "center",
		fontSize : 25,
		color : "#ffffff",
	}
});