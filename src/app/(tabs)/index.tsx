import { Image, ImageBackground, Pressable, StyleSheet, Text, ToastAndroid, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useState } from "react";
import { DarkMode, DarkModePalette } from "../stylesheet/dark";
import { LightMode, LightModePalette } from "../stylesheet/light";

import {
	isStepCountingSupported,
	startStepCounterUpdate,
	stopStepCounterUpdate
} from "@dongminyu/react-native-step-counter";

import { collection, doc, FieldValue, getFirestore, setDoc } from "@react-native-firebase/firestore";

import { getAuth } from "@react-native-firebase/auth";

export default function Home() {
	// Variables
	const [isRecording, setIsRecording] = useState(false);
	const [stepCounter, setStepCounter] = useState(0);
	const [startTime, setStartTime] = useState(0);
	const [previousTime, setPreviousTime] = useState(0);

	const auth = getAuth();
	const user = auth.currentUser;

	// Defining images and appearances
	const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
	const ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");
	const DistanceImage = require("../assets/images/distance_light.png");

	const recordButton = async () => {
		// Insert step tracking logic here.
		if (!isRecording === true) {
			const status = await isStepCountingSupported();
			setStartTime(Date.now());
			setStepCounter(0);

			if (status.supported && status.granted) {
				startStepCounterUpdate(new Date(), (data) => {
					setStepCounter(data.steps);
				});
			}
		} else {
			stopStepCounterUpdate();
			const currentTime = Date.now();
			setPreviousTime(currentTime - startTime);

			// Save data:
			saveData(currentTime - startTime);
		}
		setIsRecording(!isRecording);
	}

	const saveData = async (duration : number) => {
		if (user == null) {
			console.log("User is null. Cannot save data.");
			return;
		}
		try {
			const rid = startTime.toString(); // rid == Run ID

			/* 
			Old version.
			await firestore() // Data is saved in /users/{userID}/activities/{dateStr}/
				.collection("users")
				.doc(user.uid)
				.collection("activities")
				.doc(rid)
				.set({
					startTime : startTime,
					stepsCount : stepCounter,
					timeTaken : duration,

					// Logged time for Debugging:
					loggedTime : FieldValue.serverTimestamp()
				}, {merge : true})
			*/
			
			const database = getFirestore();
			const docRef = doc(collection(doc(collection(database, "users"), user.uid), "activities"), rid);
			await setDoc(docRef, {
				startTime : startTime,
				stepsCount : stepCounter,
				timeTaken : duration,

				// Logged time for Debugging:
				loggedTime : FieldValue.serverTimestamp()
			}, {merge : true})

			ToastAndroid.showWithGravity(
				"Data saved!",
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM,
			)
			console.log("Data saved for user " + user.uid);
		} catch (error : any) {
			console.error(error)
		}
		
	}

	const gatTimeString = (ms : number) : string => {
		const miliseconds = ms % 1000;
		const totalSeconds = Math.floor(ms / 1000);
		const seconds = totalSeconds % 60;
		const totalMinutes = Math.floor(totalSeconds / 60);
		const minutes = totalMinutes % 60;
		const hours = Math.floor(totalMinutes / 60);
		return `${hours}:${(minutes < 10)? "0" : ""}${minutes}:${(seconds < 10)? "0" : ""}${seconds}.${(miliseconds < 10)? "00" : ((miliseconds < 100)? "0" : "")}${miliseconds}`;
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
				<Text style = {[ColorScheme.title, HomeStyleSheet.title]}>Steps</Text>
				<ImageBackground
					source = {DistanceImage}
					resizeMode = "stretch"
					style = {HomeStyleSheet.image}
				>
					<Text testID = "step_counter" style = {[ColorScheme.content, HomeStyleSheet.text]}>{stepCounter}</Text>
				</ImageBackground>
				<Text style = {[
					HomeStyleSheet.timer_text,
					{
						color : ColorPalette.color1,
					}
				]}>
					Previous Time: {gatTimeString(previousTime)}
				</Text>
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
	timer_text : {
		textAlign : "center",
		fontSize : 20,
		paddingBottom : 15,
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