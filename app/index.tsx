import { Text, useColorScheme, View } from "react-native";

import { DarkMode } from "./stylesheet/dark";
import { LightMode } from "./stylesheet/light";

export default function About() {
	const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
    return (
        <View style = {ColorScheme.main}>
            <Text style = {ColorScheme.content}>Hello World From Screen 1</Text>
        </View>
    );
}