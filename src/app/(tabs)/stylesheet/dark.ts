import { Dimensions, StyleSheet } from "react-native";

export const DarkModePalette = {
    base : "#C0C2D0", 
    accent : "#CBCDD8", 
    vignette : "#ACADBF", 
    color1 : "#FF2893", 
    color2 : "#FF89C4", 
    white : "#FFFFFF", 
};

const screenDimensions = Dimensions.get('screen');

export const DarkMode = StyleSheet.create({
    main : {
        width : screenDimensions.width,
        height : screenDimensions.height,
    },
    title : {
        fontFamily : "GoogleSansFlex_400Regular",
        fontSize : 60,
        color : DarkModePalette.color1,
        paddingVertical : 10, 
    },
    content : {
        fontFamily : "GoogleSansFlex_400Regular",
        fontSize : 40,
        color : DarkModePalette.color2,
    },
})

export default function Dark() {
    return null;
}