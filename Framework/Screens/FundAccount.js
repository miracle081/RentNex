import { Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button } from 'react-native-paper'
import { Theme } from '../Components/Theme'
import { Formik } from 'formik'
import * as yup from "yup"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { formatMoney } from '../Components/FormatMoney'
import { AppContext } from '../Components/globalVariables'
import { ToastApp } from '../Components/Toast'


const validationSchema = yup.object({
    amount: yup.number().required().min(200, "Amount must be greater than or equal to ₦200.00").max(100000),
})

export function FundAccount({ navigation }) {
    const { email, setPreloader } = useContext(AppContext)
    const [modalVisibility, setModalVisibility] = useState(false);
    const [amount, setAmount] = useState(0);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };


    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <Formik
                    style={{ flex: 1 }}
                    initialValues={{ amount: "" }}
                    onSubmit={(value) => {
                        closeModal();
                        setAmount(Number(value.amount));
                        // ToastApp("You are trying to fund your account", "LONG")
                    }}
                    validationSchema={validationSchema}
                >
                    {(prop) => {
                        return (
                            <View style={styles.form}>
                                <Text style={styles.header}>Paystack Card</Text>
                                <View style={{ alignItems: "center" }}>
                                    <Image source={require("../../assets/card1.png")} style={{ width: 300, height: 400, }} />
                                </View>
                                <Text style={styles.placeholder}>Please enter your account email, and a password reset link will be sent to your email.</Text>
                                <Text style={styles.placeholder}>Fund amount</Text>
                                <TextInput
                                    style={[styles.input, { marginBottom: 0 }]}
                                    autoCapitalize="none"
                                    onChangeText={prop.handleChange("amount")}
                                />
                                <Text style={[styles.error, { display: prop.errors.amount ? "flex" : "none" }]}>{prop.errors.amount}</Text>

                                <TouchableOpacity onPress={prop.handleSubmit} style={styles.appBTN}>
                                    <Text style={{ fontSize: 16, color: "white", fontFamily: Theme.fonts.text600 }}>Continue</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                </Formik>
                <Modal
                    visible={modalVisibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                        <Pressable style={{ flex: 1 }} onPress={closeModal} >
                        </Pressable>
                        <View style={{ backgroundColor: "#fcfbff", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                <TouchableOpacity onPress={closeModal}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={24}
                                        color='#787A8D'
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginBottom: 20 }}>

                                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={[styles.header, { fontSize: 25 }]}>Confirm Transaction</Text>
                                </View>
                                <View style={{ marginTop: 20, margin: 15, }}>

                                    <View style={{ alignItems: 'center', marginBottom: 20, justifyContent: "space-between", flexDirection: "row" }}>
                                        <Text style={styles.modalText}>Payment Method</Text>
                                        <Text style={[styles.modalText, { color: Theme.colors.text, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>Paystack(ATM Card)</Text>
                                    </View>

                                    <View style={{ alignItems: 'center', marginBottom: 20, justifyContent: "space-between", flexDirection: "row" }}>
                                        <Text style={styles.modalText}>Fee</Text>
                                        <Text style={[styles.modalText, { color: Theme.colors.text, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>1.8%</Text>
                                    </View>

                                    <View style={{ alignItems: 'center', marginBottom: 20, justifyContent: "space-between", flexDirection: "row" }}>
                                        <Text style={styles.modalText}>Amount</Text>
                                        <Text style={[styles.modalText, { color: Theme.colors.text, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>₦{formatMoney(amount)}</Text>
                                    </View>

                                    <View style={{ alignItems: 'center', marginBottom: 30, justifyContent: "space-between", flexDirection: "row" }}>
                                        <Text style={styles.modalText}>Total</Text>
                                        <Text style={[styles.modalText, { color: Theme.colors.green, fontSize: 20, fontWeight: "bold", fontFamily: null }]}>₦{formatMoney(amount + ((1.8 / 100) * amount))}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => { closeModal(); navigation.navigate("Pay", { amount: amount }) }} style={styles.appBTN}>
                                        <Text style={{ fontSize: 16, color: "white", fontFamily: Theme.fonts.text600 }}>Pay Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
        backgroundColor: "white"
    },
    form: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center"
    },
    header: {
        fontSize: 35,
        fontFamily: Theme.fonts.text700,
        color: Theme.colors.green
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        width: "100%",
        fontSize: 18
    },
    placeholder: {
        fontFamily: Theme.fonts.text400,
        marginTop: 10
    },
    error: {
        fontFamily: Theme.fonts.text400,
        color: "#d70000",
        marginStart: 7
    },
    appBTN: {
        borderWidth: 1,
        borderColor: Theme.colors.green,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: Theme.colors.green
    },
    modalText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 16
    }
})