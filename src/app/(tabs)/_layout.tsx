import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { DarkModePalette } from "../stylesheet/dark";
import { LightModePalette } from "../stylesheet/light";

export default function TabLayout() {
    const Palette = (useColorScheme() === "dark")? DarkModePalette : LightModePalette

    return (
        <Tabs
            screenOptions = {{
                tabBarActiveTintColor: Palette.color1,
                tabBarInactiveTintColor: Palette.white,
                headerStyle : {
                    backgroundColor: Palette.vignette,
                },
                headerShadowVisible : false,
                headerTintColor : Palette.base,
                tabBarStyle : {
                    backgroundColor: Palette.vignette,
                }
            }}
        >
			<Tabs.Screen 
                name = "index" 
                options = {{ 
                    title: "Home",
                    headerShown : false,
                    tabBarIcon : ({ color, focused }) => (
                        <Ionicons name = {focused? "footsteps" : "footsteps-outline"} color = {color} size = {24} />
                    ),
                }} 
            />
			<Tabs.Screen 
                name = "preference" 
                options = {{ 
                    title: "Setting",
                    headerShown : false,
                    tabBarIcon : ({ color, focused }) => (
                        <Ionicons name = {focused? "settings-sharp" : "settings-outline"} color = {color} size = {24} />
                    ),
                }} 
            />
			<Tabs.Screen 
                name = "tracking" 
                options = {{ 
                    title: "Trackboard",
                    headerShown : false,
                    tabBarIcon : ({ color, focused }) => (
                        <Ionicons name = {focused? "analytics-sharp" : "analytics-outline"} color = {color} size = {24} />
                    ),
                }} 
            />
			<Tabs.Screen 
                name = "stylesheet/dark" 
                options = {{ 
                    title: "Login",
                    headerShown : false,
                    href : null  
                }} 
            />
			<Tabs.Screen 
                name = "stylesheet/light" 
                options = {{ 
                    title: "Login",
                    headerShown : false,
                    href : null  
                }} 
            />
        </Tabs>
    );
}