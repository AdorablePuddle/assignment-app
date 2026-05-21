import * as SecureStore from 'expo-secure-store';
import { StyleSheet, useColorScheme, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { DarkMode, DarkModePalette } from "./stylesheet/dark";
import { LightMode, LightModePalette } from "./stylesheet/light";

async function getDarkMode() {
    let result = await SecureStore
}

export default function Login() {
    const ColorScheme = (useColorScheme() === "dark")? DarkMode : LightMode;
    const ColorPalette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette;

    return (
        <View style = {ColorScheme.main}>
            <LinearGradient
                colors = {[
                    ColorPalette.accent,
                    ColorPalette.vignette,
                ]}
                style = {LoginStyleSheet.container}
            >
                
            </LinearGradient>
        </View>
    );
}

const LoginStyleSheet = StyleSheet.create({
    container : {
        flex : 1,
        paddingVertical : 50,
        flexDirection : "column",
        alignItems : "center",
    },
});