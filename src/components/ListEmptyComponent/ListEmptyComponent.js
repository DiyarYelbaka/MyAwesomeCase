import { View, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";

const ListEmptyComponent = () => {
    return (
        <View style={styles.container} >
            <LottieView
                source={require("../../assets/lottie/empty_animation.json")}
                autoPlay
                style={styles.empty}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty:{
        width: '100%',
        height: 140,
        marginTop:30 
    }
})

export default ListEmptyComponent