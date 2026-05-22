import { Dimensions, StyleSheet } from "react-native";

export const LightModePalette = {
    base : "#C0C2D0", 
    accent : "#CBCDD8", 
    vignette : "#ACADBF", 
    color1 : "#FF2893", 
    color2 : "#FF89C4", 
    white : "#FFFFFF", 
};

const screenDimensions = Dimensions.get('screen');

export const LightMode = StyleSheet.create({
    main : {
        width : screenDimensions.width,
        height : screenDimensions.height,
    },
    title : {
        fontFamily : "GoogleSansFlex_400Regular",
        fontSize : 60,
        color : LightModePalette.color1,
        paddingVertical : 10, 
    },
    content : {
        fontFamily : "GoogleSansFlex_400Regular",
        fontSize : 40,
        color : LightModePalette.color2,
    },
})

export default function Light() {
    return null;
}