import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, } from 'react'
import { Theme } from '../Components/Theme';
import { Button, } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from "yup"
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../Firebase/settings';
import { AppContext } from '../Components/globalVariables';
import { AppButton } from '../Components/AppButton';
// import { errorMessage } from '../Components/formatErrorMessage';

export function SignIn({ navigation }) {
    const { setUserUID, setPreloader } = useContext(AppContext);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.container}>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={(value) => {
                        console.log(value);

                    }}
                >
                    {(prop) => {
                        return (

                            <View style={{ flex: 1, justifyContent: "center", }}>
                                <Text style={{ fontSize: 35, textAlign: "center", fontFamily: Theme.fonts.text600 }}>LogIn</Text>
                                <View style={styles.label}>
                                    <Text style={{ fontFamily: Theme.fonts.text500 }}>Email:</Text>
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.input}
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={prop.handleChange("email")}
                                    />
                                    {/* <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.email && prop.errors.email}</Text> */}
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
                                    {/* <Text style={{ fontSize: 13, color: Theme.colors.red, fontFamily: Theme.fonts.text400 }}>{prop.touched.password && prop.errors.password}</Text> */}
                                </View>
                                <Button mode='text' style={{ fontSize: 12, alignSelf: "flex-end" }} onPress={() => { navigation.navigate("ForgotPassword") }}>Forgot Password?</Button>

                                {/* <Button mode='contained-tonal' style={{ marginVertical: 15 }}  buttonColor={Theme.colors.primary + 30} > Log In</Button> */}
                                <AppButton onPress={prop.handleSubmit}>Login</AppButton>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{ fontSize: 15, marginVertical: 30, fontFamily: Theme.fonts.text300 }}>Im a new user</Text>
                                    <Button mode='text' onPress={() => { navigation.navigate("SignUp") }}>Sign Up</Button>
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