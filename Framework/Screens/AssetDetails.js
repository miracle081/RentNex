import { Alert, Image, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Theme } from '../Components/Theme'
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { formatMoney } from '../Components/FormatMoney'
import { AppContext } from '../Components/globalVariables'
import { AppButton } from '../Components/AppButton'

export function AssetDetails({ navigation }) {
    const { mode, userInfo, setPreloader, setDoc, doc, token } = useContext(AppContext)
    const [showMore, setShowMore] = useState(false);
    const [defaultImg, setDefaultImg] = useState(doc.image);


    const handleShow = () => setShowMore(!showMore)
    const imgStyle = (img) => img == defaultImg ? { height: 50, width: 50, opacity: 0.5 } : { height: 60, width: 60 }

    const callNumber = (phone) => {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert("Call!", 'Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };


    return (
        <View style={{ flex: 1, backgroundColor: Theme.colors.light.bg }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={{ width: "100%", height: 260, }} source={{ uri: defaultImg }} />

                <View style={{ padding: 15, flex: 1 }}>
                    <View style={{ borderBlockColor: Theme.colors.light.line, borderBottomWidth: 1, paddingBottom: 10 }}>
                        <View style={{ gap: 10, flexDirection: "row", justifyContent: "space-between", }}>
                            <Text style={{ flex: 1, fontSize: 20, fontFamily: Theme.fonts.text600, color: Theme.colors.light.text1 }}>{doc.name}</Text>
                            <Text style={{ fontSize: 18, color: Theme.colors.green }}>₦{formatMoney(doc.amount)}</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between", }}>
                            <View style={{ alignItems: "center", flexDirection: "row", }}>
                                <AntDesign name="clockcircleo" size={14} style={{ paddingRight: 10, color: Theme.colors.primary }} />
                                <Text style={{ fontSize: 14, lineHeight: 20, fontFamily: Theme.fonts.text500, color: Theme.colors.light.text2 }}>Status: {doc.status ? "Sold Out" : "Available"}</Text>
                            </View>
                            <View style={{ alignItems: "center", flexDirection: "row", }}>
                                <Ionicons name="person-outline" size={14} style={{ paddingRight: 10, color: Theme.colors.primary }} />
                                <Text style={{ fontSize: 14, lineHeight: 20, fontFamily: Theme.fonts.text500, color: Theme.colors.light.text2 }}>Posted: {new Date(doc.created_at).toLocaleString()}</Text>
                            </View>
                        </View>

                    </View>


                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: Theme.fonts.text500, color: Theme.colors.light.text1 }}>Asset description</Text>
                        <Text numberOfLines={showMore ? null : 10}
                            style={{ fontSize: 14, lineHeight: 20, fontFamily: Theme.fonts.text500, color: Theme.colors.light.text2 }}>{doc.description}</Text>
                        <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={handleShow}>
                            <Text style={{ color: Theme.colors.primary, fontSize: 14, fontFamily: Theme.fonts.text500 }}>{showMore ? "Show Less" : "Show More"}</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={{ padding: 15, marginTop: 10, flex: 1 }}>
                    <Text style={{ fontSize: 18, fontFamily: Theme.fonts.text500, color: Theme.colors.light.text1 }}>Other deatils</Text>
                    <View style={{ flexDirection: "row", marginVertical: 5 }}>
                        <Ionicons name="location" size={14} style={{ paddingRight: 5, color: Theme.colors.primary, marginTop: 4 }} />
                        <Text style={{ fontSize: 13, lineHeight: 20, fontFamily: Theme.fonts.text500, color: Theme.colors.light.text2 }}>{doc.location}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("AssetMap", { latitude: doc.latitude, longitude: doc.longitude })} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <FontAwesome5 name="map-marked-alt" size={18} color={Theme.colors.primary} />
                        <Text style={{ color: Theme.colors.primary, fontSize: 16 }}>View on Map</Text>
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1, padding: 15, marginBottom: 20, flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
                    <Text style={{ color: Theme.colors.primary, fontSize: 16, fontFamily: Theme.fonts.text500 }}>{doc.phone}</Text>
                    <AppButton onPress={() => { callNumber(doc.phone) }}
                        style={{ paddingHorizontal: 20 }}
                    >
                        <AntDesign name="phone" size={17} style={{ paddingRight: 10, color: "white" }} /> Call
                    </AppButton>
                </View>
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})