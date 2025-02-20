import { View, Text, Alert, } from "react-native";
import { Paystack } from 'react-native-paystack-webview';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useContext } from "react";
import { Theme } from "../Components/Theme";
import { db } from "../Firebase/settings";
import { AppContext } from "../Components/globalVariables";

export function Pay({ navigation, route }) {
    const { userUID, setPreloader, userInfo } = useContext(AppContext);
    const { amount } = route.params
    return (
        <View style={{ flex: 1 }}>
            <Paystack
                paystackKey={"pk_test_92fcc0077ec7f42a73ff01c87db79c3698b06dec"}
                amount={amount + ((1.8 / 100) * amount)}
                billingEmail={userInfo.email}
                activityIndicatorColor={Theme.colors.green}
                onCancel={() => {
                    navigation.goBack()
                }}
                onSuccess={() => {
                    setPreloader(true);
                    updateDoc(doc(db, "users", userUID), {
                        balance: amount + Number(userInfo.balance)
                    }).then(() => {
                        setPreloader(false);
                        Alert.alert(
                            "Payment successful",
                            `Payment of ${amount} was successful`,
                            [{ text: "Ok", onPress: () => navigation.pop(2) }]
                        )
                    }).catch(() => {
                        setPreloader(false);
                        Alert.alert(
                            "Payment Status",
                            `Something went wrong.`,
                            [{ text: "Try Again", onPress: () => navigation.goBack() }]
                        )
                    })
                }}
                autoStart={true}
            />
        </View>
    )
}