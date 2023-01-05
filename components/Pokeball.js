
import { View, StyleSheet, Animated, Easing } from "react-native";


export default function Pokeball() {
    const spinValue = new Animated.Value(0);
    Animated.loop(
        Animated.timing(
          spinValue,
          {
           toValue: 1,
           duration: 3000,
           easing: Easing.linear,
           useNativeDriver: true
          }
        )
       ).start();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <Animated.View style={[styles.container, {transform: [{rotate: spin}]}]}>
            <View style={styles.upper_half}/>   
            <View style={styles.lower_half}/>
            <View style={styles.middle_line}/>
            <View style={styles.inner_circle_outer}/>
            <View style={styles.inner_circle_inner}/>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 100,
        overflow: "hidden",
    },
    upper_half: {
        backgroundColor: '#F00',
        width: 200,
        height: 100,
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
    },
    lower_half: {
        backgroundColor: '#EEE',
        width: 200,
        height: 100,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    middle_line: {
        position: "absolute",
        alignSelf: "center",
        width: 200,
        height: 20,
        backgroundColor: '#000',
    }, 
    inner_circle_outer: {
        position: "absolute",
        backgroundColor: '#000',
        alignSelf: "center",
        width: 60,
        height: 60,
        borderRadius: 30,
    }, 
    inner_circle_inner: {
        position: "absolute",
        backgroundColor: "#FFF",
        alignSelf: "center",
        width: 30,
        height: 30,
        borderRadius: 15,
    }

});