import { Image, Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { getAuth, signInAnonymously, signInWithEmailAndPassword } from '@react-native-firebase/auth';

import { useRouter } from "expo-router";
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
	
	const router = useRouter();
	
	// Defining images and appearances
	const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
	const ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");

	// Login flow:
	const handleLogin = async () => {
		setWarning("");
		if (!email || !password) {
			setWarning("Email or password needed.");
			return;
		}

		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error : any) {
			switch (error.code) {
				case 'auth/user-disabled':
				case 'auth/invalid-credential':
				case 'auth/invalid-email':
				case 'auth/wrong-password':
					setWarning("Email or password is incorrect.");
					break;
				case 'auth/too-many-request':
					setWarning("Too many requests, please try again later.");
					break;
				default:
					setWarning("Unexpected Error: " + error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	// Registration flow:
	const handleRegistration = async () => {
		router.push("/(auth)/register");
	}

	// Guest login:
	const handleGuestLogin = async () => {
		setWarning("");
		setLoading(true);
		try {
			await signInAnonymously(auth);
		} catch (error : any) {
			console.log(   "Error code: " + error.code);
			console.log("Error message: " + error.message);
			setWarning("Something went wrong while logging in as Guest.");
		}
		setLoading(false);
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
						editable = {!loading}
					/>
					<TextInput
						style = {[
							LoginStyleSheet.password_field,
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
					<Text style = {LoginStyleSheet.warning}>
						{
							warning
						}
					</Text>
					<Pressable
						style = {({pressed}) => [
							LoginStyleSheet.login_button,
							{
								borderColor : ColorPalette.white,
								borderWidth: 2,
								backgroundColor : (pressed)? ColorPalette.color1 : ColorPalette.color2
							}
						]}
						onPress = {handleLogin}
						disabled = {loading}
					>
						<Text style = {LoginStyleSheet.login_button_text}>Login</Text>
					</Pressable>
					<Pressable
						style = {({pressed}) => [
							LoginStyleSheet.login_button,
							{
								borderColor : ColorPalette.white,
								borderWidth: 2,
								backgroundColor : (pressed)? ColorPalette.color1 : ColorPalette.color2,
							}
						]}
						onPress = {handleRegistration}
						disabled = {loading}
					>
						<Text style = {[
							LoginStyleSheet.login_button_text,
							{
								fontSize : 15,
							}
						]}>Register</Text>
					</Pressable>
					<Pressable
						style = {({pressed}) => [
							LoginStyleSheet.guest_button,
						]}
						onPress = {handleGuestLogin}
						disabled = {loading}
					>
						<Text style = {[
							LoginStyleSheet.login_button_text,
							{
								fontSize : 15,
							}
						]}>Continue as guest</Text>
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
	warning : {
		fontSize : 15,
		color : "#ff0000",
		fontStyle : "italic",
		textAlign : "center",
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
		margin : 10,
	},
	guest_button : {
		padding : 3,
		width : 150,
	},
	login_button_text : {
		textAlign : "center",
		fontSize : 25,
		color : "#ffffff",
	}
});