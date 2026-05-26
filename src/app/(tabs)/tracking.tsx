import { Alert, FlatList, Image, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { getAuth } from "@react-native-firebase/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, QueryDocumentSnapshot } from "@react-native-firebase/firestore";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { DarkMode, DarkModePalette } from "../stylesheet/dark";
import { LightMode, LightModePalette } from "../stylesheet/light";

// The point in time I learn about formatable string.

interface record {
	id : string,
	startTime : number,
	stepsCount : number,
	timeTaken : number,
};

export const recordConverter = {
	toFirestore(run: record) {
		return {
			startTime : run.startTime,
			stepsCount : run.stepsCount,
			timeTaken : run.timeTaken,
		}
	},
	fromFirestore(snapshot: QueryDocumentSnapshot): record {
		const data = snapshot.data();
		return {
			id : snapshot.id,
			startTime : data.startTime || 0,
			stepsCount : data.stepsCount || 0,
			timeTaken : data.timeTaken || 0,
		}
	}
}

export default function Tracking() {
	// Variables
	const [history, setHistory] = useState<record[]>([]);
	const [loading, setLoading] = useState(true);

	// Defining images and appearances
	const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
	const ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

	const TopImage = require("../assets/images/top_light.png");

	// Load data on screen loaded.
	useFocusEffect(useCallback(() => {
		// Purpose of this is to check if the user is still on this screen.
		let isMounted = true;
		const auth = getAuth();
		const user = auth.currentUser;

		if (!user) {
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			setLoading(true);
			try {
				const db = getFirestore();
				const dataQuery = query(
					collection(db, `users/${user.uid}/activities`).withConverter(recordConverter),
					orderBy("startTime", "desc")
				);

				const queryResult = await getDocs(dataQuery);
				const records : record[] = queryResult.docs.map(doc => doc.data());

				if (isMounted) {
					setHistory(records);
					setLoading(false);
				}

				// console.log(records);
			} catch (error : any) {
				console.error(error);
				if (isMounted) setLoading(false);
			}
		}

		fetchData();

		return () => {
			isMounted = false;
		}
	}, []))

	// Handling data removal:
	const removeData = async (item : record) => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (!user) return;

		Alert.alert(
			"Delete record",
			"Would you like to delete this record?",
			[
				{ text : "No", style : "cancel" },
				{ text : "Yes", style : "destructive", onPress : async () => {
					try {
						const db = getFirestore();
						// Laser targetting the fucking thing
						const docRef = doc(db, `users/${user.uid}/activities`, item.id);

						await deleteDoc(docRef);
						console.log("Removal successful. Your balls are now gone.");
						setHistory(prevHistory => prevHistory.filter(run => run.id !== item.id));
					} catch (error : any) {
						console.error(error);
					}
				}}
			]
		)
	}

	// Format helping function:
	const formatDate = (timestamp : number) => new Date(timestamp).toLocaleString();
	const formatDuration = (ms : number) => {
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
				style = {TrackingStyleSheet.container}
			>
				<Image 
					source = {TopImage}
					style = {TrackingStyleSheet.top_logo}
				/>
				<Text style = {[ColorScheme.title, {fontSize : 25, fontWeight : "bold"}]}>Track Board</Text>
				<FlatList 
					style = {TrackingStyleSheet.trackboard_view}
					data = {history}
					keyExtractor = {(item) => item.id}
					ListHeaderComponent = {() => (
					<View style = {[TrackingStyleSheet.trackboard_header, {borderColor : ColorPalette.color1}]}>
						<Text style = {[TrackingStyleSheet.trackboard_header_text, {flex : 1.25, color : ColorPalette.text}]}>Start Time</Text>
						<Text style = {[TrackingStyleSheet.trackboard_header_text, {flex : 1, color : ColorPalette.text, borderColor : ColorPalette.color1, borderLeftWidth : 0.5, borderRightWidth : 0.5}]}>Step Count</Text>
						<Text style = {[TrackingStyleSheet.trackboard_header_text, {flex : 1, color : ColorPalette.text}]}>Time Taken</Text>
					</View>)}
					renderItem = {({item}) => (
					<Pressable 
						style = {[TrackingStyleSheet.trackboard_row, {borderColor : ColorPalette.color1}]}
						disabled = {loading}
						onLongPress = {() => removeData(item)}
					>
						<Text style = {[TrackingStyleSheet.trackboard_text, {flex : 1.25, color : ColorPalette.text}]}>{formatDate(item.startTime)}</Text>
						<Text style = {[TrackingStyleSheet.trackboard_text, {flex : 1, color : ColorPalette.text, borderColor : ColorPalette.color1, borderLeftWidth : 0.5, borderRightWidth : 0.5}]}>{item.stepsCount}</Text>
						<Text style = {[TrackingStyleSheet.trackboard_text, {flex : 1, color : ColorPalette.text}]}>{formatDuration(item.timeTaken)}</Text>
					</Pressable>)}
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
	trackboard_view : {
		flexDirection : "column",
		padding : 10,
		width : "100%",
	},
	trackboard_header : {
		flexDirection : "row",
		alignItems : "stretch",
		borderWidth : 0.5
	},
	trackboard_header_text : {
		fontSize : 15,
		textAlign : "center",
		fontWeight : "bold",
		paddingVertical : 10,
	},
	trackboard_row : {
		flexDirection : "row",
		alignItems : "stretch",
		borderBottomWidth : 0.5,
		borderLeftWidth : 0.5,
		borderRightWidth : 0.5,
	},
	trackboard_text : {
		fontSize : 15,
		textAlign : "center",
		paddingVertical : 10,
	}
});