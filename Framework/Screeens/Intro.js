import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppButton } from '../Components/AppButton';
import { Theme } from '../Components/Theme';

export function Intro() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.header}>RentNex</Text>
                <View style={{ height: 230 }}>
                    <ScrollView horizontal>
                        <Image source={require("../../assets/slide1.jpg")} style={styles.img} />
                        <Image source={require("../../assets/slide2.jpg")} style={styles.img} />
                        <Image source={require("../../assets/slide3.jpg")} style={styles.img} />
                    </ScrollView>
                    <Text style={{}}>RentNex</Text>
                </View>

                <View style={{ gap: 10 }}>
                    <AppButton>Get Started</AppButton>
                    <AppButton style={{ backgroundColor: "white", borderWidth: 1, borderColor: Theme.colors.primary }} textColor={Theme.colors.primary}>Sign In</AppButton>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: "space-between"
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