import { StyleSheet, Text, View } from "react-native";

export default function About() {
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>Hello World From Screen 1</Text>
        </View>
    );
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		flexDirection : "row",
		backgroundColor : "#404040",
		justifyContent : "center",
		alignItems : "center",
	},
	text : {
		color : "#f0f0f0",
	}
})