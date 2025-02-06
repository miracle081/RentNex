import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export function Intro() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Text style={styles.header}>RentNex</Text>
                <ScrollView horizontal style={{}}>
                    <Image source={require("../../assets/slide1.jpg")} style={styles.img} />
                    <Image source={require("../../assets/slide2.jpg")} style={styles.img} />
                    <Image source={require("../../assets/slide3.jpg")} style={styles.img} />
                </ScrollView>
                <Text style={styles.header}>RentNex</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    header: {
        fontFamily: "Lobster_400Regular",
        fontSize: 40
    },
    img: {
        width: 350,
        height: 200,
        borderRadius: 10,
        marginRight: 5
    }
});