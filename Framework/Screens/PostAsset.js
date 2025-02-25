import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Image, Pressable, ScrollView, StyleSheet, Dimensions, FlatList, StatusBar, SafeAreaView, KeyboardAvoidingView, Platform, } from "react-native";
import { Theme } from '../Components/Theme';
import * as Imagepicker from "expo-image-picker"
import { AppContext } from '../Components/globalVariables';
import { AppButton } from '../Components/AppButton';
import { addDoc, collection } from 'firebase/firestore';
import { errorMessage } from '../Components/formatErrorMessage';
import { db } from '../Firebase/settings';


export function PostAsset({ navigation }) {
    const { setPreloader, userUID, } = useContext(AppContext);

    const [image, setimage] = useState(null);
    const [phone, setphone] = useState("");
    const [assetname, setAssetname] = useState("");
    const [location, setLocation] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");


    useEffect(() => {
        // setPreloader(false);
        // console.log(token.access);

    }, []);

    async function picker() {
        const result = await Imagepicker.launchImageLibraryAsync({
            mediaType: Imagepicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        })
        if (!result.canceled) {
            const { uri } = result.assets[0];
            setimage(uri)
        }
    }

    function makeAPost() {
        if (!image || !assetname || !description || !location || !phone || !phone) {
            Alert.alert("Incomplete inputs", "Please provide a image, Corporate name,Short name, Incorporation number, Office Address, email,  phone number.");
            return;
        }
        setPreloader(true);
        addDoc(collection(db, "assets"), {
            name: assetname,
            location,
            phone,
            description,
            amount,
            image,
            userUID,
            createAt: new Date().getTime(),
            statu: "Available"
        }).then(() => {
            setPreloader(false)
            navigation.goBack()
        }).catch(e => {
            setPreloader(false)
            console.log(e);
            Alert.alert("Error!", errorMessage(e.code))
        })

    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "height" : null} style={{ flex: 1 }}>
                <View style={styles.body}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.formContainer}>

                            <Text style={[styles.header, { marginTop: 10 }]}>Post an Asset</Text>
                            <Text style={styles.text}>
                                Please ensure that all information provided is accurate and up-to-date. Once submitted, our team will review your application promptly.
                            </Text>

                            <Text style={[styles.label, { marginTop: 10 }]}>Name</Text>
                            <TextInput
                                style={styles.inputStyle}
                                keyboardType='default'
                                autoCapitalize='words'
                                mode='outlined'
                                onChangeText={(text) => setAssetname(text.trim())}
                            />


                            <Text style={[styles.label, { marginTop: 10 }]}>Location</Text>
                            <TextInput
                                style={styles.inputStyle}
                                keyboardType='default'
                                autoCapitalize='words'
                                mode='outlined'
                                onChangeText={(text) => setLocation(text.trim())}
                            />

                            <Text style={[styles.label, { marginTop: 10 }]}>Amount</Text>
                            <TextInput
                                style={styles.inputStyle}
                                keyboardType='number-pad'
                                mode='outlined'
                                onChangeText={(text) => setAmount(text.trim())}
                            />

                            {/* <Text style={[styles.label, { marginTop: 10 }]}>Company Email Address</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType='default'
                            mode='outlined'
                            onChangeText={inp => setEmail(inp.trim())}
                            autoCapitalize='none'
                            /> */}

                            <Text style={[styles.label, { marginTop: 10 }]}>Phone Number</Text>
                            <TextInput
                                style={styles.inputStyle}
                                keyboardType='default'
                                mode='outlined'
                                onChangeText={inp => setphone(inp.trim())}
                            />
                            <Text style={[styles.label, { marginTop: 10 }]}>Description</Text>
                            <TextInput
                                style={styles.inputStyle}
                                keyboardType='default'
                                mode='outlined'
                                onChangeText={inp => setDescription(inp.trim())}
                                multiline
                                numberOfLines={5}
                            />

                            {image ?
                                <TouchableOpacity onPress={picker}>
                                    <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
                                </TouchableOpacity>
                                :
                                <AppButton onPress={picker} buttonColor={"transparent"} textColor={Theme.colors.primary}>Select image</AppButton>
                            }


                            <View style={{ marginTop: 10, }}>
                                <AppButton onPress={makeAPost}>Post</AppButton>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: StatusBar.currentHeight
    },
    body: {
        flex: 1,
        marginHorizontal: 10,
    },
    header: {
        fontSize: 18,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.light.text1
    },
    text: {
        fontSize: 14,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.light.text2
    },
    formContainer: {
        padding: 10,
        marginTop: 10,
        flex: 1
    },
    inputStyle: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 8,
        marginBottom: 10,
        borderRadius: 10,
        width: "100%",
        fontSize: 18
    },
    label: {
        color: Theme.colors.light.text1,
        marginBottom: 5,
        fontSize: 14,
        fontFamily: Theme.fonts.text400
    },
    reasons: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 20,
        alignItems: "center",
        borderColor: Theme.colors.light.bg2,
        borderBottomWidth: 1
    },
    radio: {
        padding: 3,
        borderWidth: 2,
        borderRadius: 50,
    },
    radioInner: {
        padding: 5,
        width: 20,
        height: 20,
        borderRadius: 50,
    },
})