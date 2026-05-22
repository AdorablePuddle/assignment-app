import { StyleSheet, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { DarkMode, DarkModePalette } from "./stylesheet/dark";
import { LightMode, LightModePalette } from "./stylesheet/light";


export default function Preference() {
    const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
    const ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

    return (
        <View style = {ColorScheme.main}>
            <LinearGradient
                colors = {[
                    ColorPalette.accent,
                    ColorPalette.vignette,
                ]}
                style = {PreferenceStyleSheet.container}
            >
                
            </LinearGradient>
        </View>
    );
}

const PreferenceStyleSheet = StyleSheet.create({
    container : {
        flex : 1,
        paddingVertical : 50,
        flexDirection : "column",
        alignItems : "center",
    },
});