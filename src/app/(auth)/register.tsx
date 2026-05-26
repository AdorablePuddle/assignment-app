import { Image, Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth';

import { useState } from "react";

import { DarkMode, DarkModePalette } from "../stylesheet/dark";
import { LightMode, LightModePalette } from "../stylesheet/light";

export default function Login() {
	// Variables
	const [email, setEmail] = useState("");
	const [warning, setWarning] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const auth = getAuth();
	
	// Defining images and appearances
	const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
	const ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");

	// Registration flow:
	const handleRegistration = async () => {
		setWarning("");
		if (!email || !password) {
			setWarning("Email or password needed.");
			return;
		}

		setLoading(true);

		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (error : any) {
			switch (error.code) {
				case 'auth/email-already-in-use':
					setWarning("This email is already in use.");
					break;
				case 'auth/invalid-email':
					setWarning("The email is malformed or invalid.");
					break;
				case 'auth/weak-password':
					setWarning("Password must be 8 characters long, including an uppercase character, lowercase character and a number.");
					break;
				default:
					setWarning("Unexpected error: " + error.code);
					console.error("   Error code: " + error.code);
					console.error("Error message: " + error.message);
					break;
			}
		} finally {
			setLoading(false);
		}
	}

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
				<View style = {RegisterStyleSheet.login_field}>
					<Text style = {[
						ColorScheme.title,
						RegisterStyleSheet.title_text
					]}>
						Sign in to Puddle&apos;s StepApp
					</Text>
					<TextInput
						style = {[
							RegisterStyleSheet.email_field,
							{
								color : ColorPalette.text,
							}
						]}
						onChangeText = {setEmail}
						value = {email}
						placeholder = "Email"
						keyboardType = "email-address"
						editable = {!loading}
					/>
					<TextInput
						style = {[
							RegisterStyleSheet.password_field,
							{
								color : ColorPalette.text,
							}
						]}
						onChangeText = {setPassword}
						value = {password}
						placeholder = "Password"
						secureTextEntry = {true}
						editable = {!loading}
					/>
					{
						// Error checks:
					}
					<Text style = {RegisterStyleSheet.warning}>
						{
							warning
						}
					</Text>
					<Pressable
						style = {({pressed}) => [
							RegisterStyleSheet.register_button,
							{
								borderColor : ColorPalette.white,
								borderWidth: 2,
								backgroundColor : (pressed)? ColorPalette.color1 : ColorPalette.color2
							}
						]}
						onPress = {handleRegistration}
						disabled = {loading}
					>
						<Text style = {RegisterStyleSheet.register_button_text}>Register</Text>
					</Pressable>
				</View>
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
	title_text : {
		fontSize : 25,
		fontWeight : "bold",
	},
	login_field : {
		flex : 1,
		flexDirection : "column",
		padding : 30,
		alignItems : "center",
	},
	email_field : {
		width : 325,
		borderColor : "#ffffff",
		borderWidth : 2,
		borderRadius : 3,
		padding : 10,
		margin : 5,
		fontSize : 15,
	},
	password_field : {
		width : 325,
		borderColor : "#ffffff",
		borderWidth : 2,
		borderRadius : 3,
		padding : 10,
		margin : 5,
		fontSize : 15,
	},
	warning : {
		fontSize : 15,
		color : "#ff0000",
		fontStyle : "italic",
		textAlign : "center",
	},
	register_button : {
		borderColor : "#ffffff",
		borderWidth : 2,
		borderRadius : 3,
		padding : 3,
		width : 150,
		margin : 10,
	},
	register_button_text : {
		textAlign : "center",
		fontSize : 25,
		color : "#ffffff",
	}
});