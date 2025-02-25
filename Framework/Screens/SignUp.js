import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, } from 'react'
import { Theme } from '../Components/Theme';
import { Button, } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from "yup"
import { AppContext } from '../Components/globalVariables';
import { AppButton } from '../Components/AppButton';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/settings';
import { errorMessage } from '../Components/formatErrorMessage';
import { doc, setDoc } from 'firebase/firestore';

const validation = yup.object({
    firstname: yup.string().min(3).required(),
    lastname: yup.string().min(3).required(),
    phone: yup.number().min(11).required(),
    email: yup.string().min(5).email().required(),
    password: yup.string().min(6).required(),
})

export function SignUp({ navigation }) {
    const { setUserUID, setPreloader } = useContext(AppContext);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.container}>
                <Formik
                    initialValues={{ firstname: "", lastname: "", phone: "", email: "", password: "" }}
                    onSubmit={(value) => {
                        setPreloader(true)
                        createUserWithEmailAndPassword(auth, value.email, value.password)
                            .then((data) => {
                                const { uid } = data.user

                                setDoc(doc(db, "users", uid), {
                                    firstname: value.firstname,
                                    lastname: value.lastname,
                                    phone: value.phone,
                                    email: value.email,
                                    userUID: uid,
                                    image: null,
                                    balance: 0,
                                    createAt: new Date().getTime(),
                                }).then(() => {
                                    setPreloader(false)
                                    setUserUID(uid)
                                    navigation.replace("Homescreen")
                                }).catch(e => {
                                    setPreloader(false)
                                    console.log(e);
                                    Alert.alert("Error!", errorMessage(e.code))
                                })
                            })
                            .catch(e => {
                                console.log(e);
                                Alert.alert("Error!", errorMessage(e.code))
                            })

                    }}
                    validationSchema={validation}
                >
                    {(prop) => {
                        return (

                            <View style={{ flex: 1, justifyContent: "center", }}>
                                <Text style={{ fontSize: 35, textAlign: "center", fontFamily: Theme.fonts.text600 }}>Create an Account</Text>
                                <View style={styles.label}>
                                    <Text style={{ fontFamily: Theme.fonts.text500 }}>First name:</Text>
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.input}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={prop.handleChange("firstname")}
                                    />
                                    <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.firstname && prop.errors.firstname}</Text>
                                </View>
                                <View style={styles.label}>
                                    <Text style={{ fontFamily: Theme.fonts.text500 }}>Last name:</Text>
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.input}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={prop.handleChange("lastname")}
                                    />
                                    <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.lastname && prop.errors.lastname}</Text>
                                </View>
                                <View style={styles.label}>
                                    <Text style={{ fontFamily: Theme.fonts.text500 }}>Phone number:</Text>
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.input}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={prop.handleChange("phone")}
                                    />
                                    <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.phone && prop.errors.phone}</Text>
                                </View>
                                <View style={styles.label}>
                                    <Text style={{ fontFamily: Theme.fonts.text500 }}>Email:</Text>
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.input}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={prop.handleChange("email")}
                                    />
                                    <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.email && prop.errors.email}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: Theme.fonts.text500 }}>Password :</Text>
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.input}
                                        autoCapitalize='none'
                                        autoComplete='off'
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        keyboardType='default'
                                        onChangeText={prop.handleChange("password")}
                                    />
                                    <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.password && prop.errors.password}</Text>
                                </View>
                                <Button mode='text' style={{ fontSize: 12, alignSelf: "flex-end" }} onPress={() => { navigation.navigate("ForgotPassword") }}>Forgot Password?</Button>

                                {/* <Button mode='contained-tonal' style={{ marginVertical: 15 }}  buttonColor={Theme.colors.primary + 30} > Log In</Button> */}
                                <AppButton onPress={prop.handleSubmit}>Sign Up</AppButton>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 15, marginVertical: 30, fontFamily: Theme.fonts.text300 }}>I have an account</Text>
                                    <Button mode='text' onPress={() => { navigation.navigate("SignIn") }}>Sign in</Button>
                                </View>
                            </View>
                        )
                    }}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#ffffff00",
    },
    input: {
        borderColor: Theme.colors.primary,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        fontSize: 15,
        marginTop: 10

    },
    label: {
        marginBottom: 7
    }
})