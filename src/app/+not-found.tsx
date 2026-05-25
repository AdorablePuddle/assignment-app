import { Text, useColorScheme, View } from "react-native";

import { DarkMode } from "./stylesheet/dark";
import { LightMode } from "./stylesheet/light";


export default function Home() {
    const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
    return (
        <View style = {ColorScheme.main}>
            <Text style = {ColorScheme.content}>Oops!</Text>
        </View>
    );
}