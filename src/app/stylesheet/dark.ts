import { Dimensions, StyleSheet } from "react-native";

export const DarkModePalette = {
    base : "#373737", 
    accent : "#404040", 
    vignette : "#4a4a4a", 
    color1 : "#00e4e4", 
    color2 : "#00b3b6",  
    white : "#FFFFFF",
    warning : "#FF0000",
    text : "#FFFFFF",
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