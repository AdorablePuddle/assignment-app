import { Text, useColorScheme, View } from "react-native";

import { DarkMode } from "./(tabs)/stylesheet/dark";
import { LightMode } from "./(tabs)/stylesheet/light";


export default function Home() {
    const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
    return (
        <View style = {ColorScheme.main}>
            <Text style = {ColorScheme.content}>Oops!</Text>
        </View>
    );
}