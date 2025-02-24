import { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView, FlatList, RefreshControl } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Theme } from '../Components/Theme';
import { AppContext } from '../Components/globalVariables';
import Carousel from 'react-native-reanimated-carousel';
import { faAngleRight, faArrowRight, faBell, faBriefcase, faHeadset, faLocationDot, faMagnifyingGlass, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { formatMoney } from "../Components/FormatMoney";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../Firebase/settings";
import { StatusBar } from "expo-status-bar";
import { Searchbar } from "react-native-paper";


export function Posts({ navigation }) {
    const screenWidth = Dimensions.get("screen").width
    const { userUID, userInfo, setPreloader, setDoc, } = useContext(AppContext)
    const [postData, setPostData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);


    function getAssets() {
        const q = collection(db, "assets")

        onSnapshot(query(q, where("userUID", "==", userUID)), (snapShot) => {
            const all = []
            snapShot.forEach(item => {
                all.push({ ...item.data(), docID: item.id })
            });
            setPostData(all)
            console.log(all);

        })
    }

    useEffect(() => {
        getAssets()
    }, [])

    useEffect(() => setSearchedData(postData), [postData]);


    function handleSearch(input) {
        const newData = postData.filter(item => {
            return item.name.toLowerCase().includes(input.toLowerCase()) ||
                item.location.toLowerCase().includes(input.toLowerCase())
        })
        setSearchedData(newData);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white", paddingTop: StatusBar.currentHeight }}>

            <View style={styles.constainer}>
                <View style={[styles.topBar, { marginBottom: 10, }]}>
                    <Searchbar
                        placeholder="Search Assets"
                        onChangeText={handleSearch}
                        // value={searchQuery}
                        style={{ backgroundColor: Theme.colors.light.layer, borderWidth: 1, borderColor: Theme.colors.primary, height: 40, flex: 1 }}
                        inputStyle={{ minHeight: 5, }}
                    />
                </View>
                <View style={{ marginTop: 10, flex: 1 }}>
                    {searchedData.length > 0 ?
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={searchedData} contentContainerStyle={{ paddingBottom: 10, gap: 10, }}
                            renderItem={({ item, index }) => {
                                // console.log(item);
                                return (
                                    <View key={index} style={{ width: (95 / 100) * screenWidth, backgroundColor: Theme.colors.light.layer, padding: 5, paddingBottom: 10, marginRight: 10, borderRadius: 13, borderColor: Theme.colors.primary + 20, borderWidth: 1 }}>
                                        <Image style={{ width: "100%", height: 180, borderRadius: 10, }} source={{ uri: item.image }} />
                                        <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text600, color: Theme.colors.light.text1 }}>{item.name}</Text>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <View activeOpacity={0.7} style={[styles.allJobs, { paddingStart: 0 }]}>
                                                <FontAwesomeIcon icon={faLocationDot} color={Theme.colors.primary} size={15} />
                                                <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text500, color: Theme.colors.light.text2 }}>{item.location}</Text>
                                            </View>
                                            <Text style={{ fontSize: 18, color: Theme.colors.green }}>₦{formatMoney(item.amount)}</Text>
                                        </View>
                                        <View style={{ backgroundColor: "#00000008", padding: 5, borderRadius: 5 }}>
                                            <Text numberOfLines={2} style={{ fontSize: 15, fontFamily: Theme.fonts.text500, color: Theme.colors.text }}>{item.description}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                                            <TouchableOpacity onPress={() => { setDoc(item); navigation.navigate("EditPost"); }}
                                                style={{ backgroundColor: Theme.colors.blueMedium, padding: 5, borderRadius: 100, width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Ionicons name="document-text-outline" size={20} color="white" />
                                                <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: "white" }}>Edit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { setDoc(item); }}
                                                style={{ backgroundColor: Theme.colors.red, padding: 5, borderRadius: 100, width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Ionicons name="trash" size={20} color="white" />
                                                <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: "white" }}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            }} />
                        :
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 30 }}>
                            <View style={{ width: 130, height: 130, alignItems: "center", justifyContent: "center", backgroundColor: Theme.colors.light.bg2, borderRadius: 100 }}>
                                <FontAwesome5 name="clipboard-list" size={60} color={Theme.colors.primary} />
                            </View>
                            <Text style={{ fontSize: 20, color: Theme.colors.light.text1, fontFamily: Theme.fonts.text600, textTransform: "capitalize", marginTop: 20 }}>No asset yet</Text>
                            {/* <Text style={{ color: Theme.colors.light.text2, textAlign: 'center', marginTop: 10 }}>Your personal assets is currently empty. Start buying form Assets to fill it up</Text> */}
                        </View>
                    }
                </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        padding: 10,
        paddingTop: 0,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dp: {
        borderRadius: 50,
        width: 40,
        height: 40
    },
    allJobs: {
        borderRadius: 10,
        paddingHorizontal: 10,
        padding: 3,
        flexDirection: "row",
        gap: 3,
        alignItems: 'center'
    },
    status: {
        borderWidth: 0.7,
        paddingHorizontal: 10,
        borderRadius: 50,
        height: 20,
        justifyContent: "center"
    },

})