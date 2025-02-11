import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppButton } from '../Components/AppButton'
import { Theme } from '../Components/Theme'

export function Profile({ navigation }) {
    const [visibility, setVisibility] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.container}>
                <Text>Profile</Text>
                <AppButton onPress={() => navigation.navigate("EditProfile")}
                    style={{ borderColor: Theme.colors.green, borderWidth: 1 }} buttonColor={"#ffffff0d"} textColor={Theme.colors.green}>Edit Profile</AppButton>

                <AppButton onPress={() => setVisibility(true)}
                    style={{ borderColor: Theme.colors.red, borderWidth: 1 }} buttonColor={"#ffffff0d"} textColor={Theme.colors.red}>Log Out</AppButton>

                <Modal
                    visible={visibility}
                    animationType="slide"
                    transparent
                >
                    <View style={{ paddingTop: 50, backgroundColor: "#000000a1", flex: 1, justifyContent: "center" }}>
                        <Pressable onPress={() => setVisibility(false)} style={{ flex: 1 }}></Pressable>
                        <View style={{ padding: 20, gap: 20, backgroundColor: "white", paddingVertical: 50 }}>
                            <Text>Are you sure you want to log out?</Text>
                            <AppButton onPress={() => navigation.navigate("Intro")}
                                buttonColor={Theme.colors.red}>Yes, Log Out</AppButton>
                        </View>
                    </View>

                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
})