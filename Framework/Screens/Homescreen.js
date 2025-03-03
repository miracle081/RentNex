import { useEffect, useState, useCallback, useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, Alert, ScrollView, FlatList, RefreshControl, StatusBar } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../Components/Theme';
import { AppContext } from '../Components/globalVariables';
import Carousel from 'react-native-reanimated-carousel';
import { faAngleRight, faArrowRight, faBell, faBriefcase, faHeadset, faLocationDot, faMagnifyingGlass, faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons";
import { formatMoney } from "../Components/FormatMoney";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/settings";
import { Assets } from "./Assets";
import { PostAsset } from "./PostAsset";
import { SafeAreaView } from "react-native-safe-area-context";


const carouselLinks = [
  "https://delete-accound.profiterworld.com/app-carousel-img/slide1.png",
  "https://delete-accound.profiterworld.com/app-carousel-img/slide4.png",
  "https://images.pexels.com/photos/534228/pexels-photo-534228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

function Home({ navigation }) {
  const screenWidth = Dimensions.get("screen").width
  const { userUID, userInfo, setUserInfo, setPreloader, setDoc, allAssts, setAllAssts } = useContext(AppContext)


  function getAssets() {
    onSnapshot(collection(db, "assets"), (snapShot) => {
      const all = []
      snapShot.forEach(item => {
        all.push({ ...item.data(), docID: item.id })
      });
      setAllAssts(all)
    })
  }

  function getUser() {
    // getDoc(doc(db, "users", userUID))
    //   .then(res => {
    //     // setUserInfo(res.data());
    //   })
    onSnapshot(doc(db, "users", userUID), user => {
      user.exists() ? setUserInfo(user.data()) : null;
    })
  };

  useEffect(() => {
    getAssets();
    getUser()
  }, [])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", marginTop: StatusBar.currentHeight }}>
      <View style={styles.constainer}>
        <View style={[styles.topBar, { marginBottom: 10 }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Image source={{ uri: userInfo.image }}
              defaultSource={require("../../assets/user.png")} style={styles.dp} />
            <View style={{ gap: 0 }}>
              <Text style={{ fontSize: 12, fontFamily: Theme.fonts.text400 }}> Welcome!</Text>
              <Text style={{ fontSize: 18, fontFamily: Theme.fonts.text600 }}>{userInfo.firstname} {userInfo.lastname}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Help")}>
              <FontAwesomeIcon icon={faHeadset} style={{ marginEnd: 10 }} size={20} color={Theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("")}>
              <FontAwesomeIcon icon={faBell} size={20} color={Theme.colors.light.text1} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginVertical: 10, }}>
          <Carousel
            loop
            width={screenWidth - 20}
            height={170}
            autoPlay={true}
            data={carouselLinks}
            style={{ borderRadius: 10 }}
            scrollAnimationDuration={2000}
            renderItem={({ index }) => (
              <Image style={{ width: '100%', height: 170, borderRadius: 10, }} source={{ uri: carouselLinks[index] }} defaultSource={require("../../assets/icon.png")} />
            )}
          />
        </View>

        {/* <View style={{ backgroundColor: Theme.colors.primary + 20, padding: 15, borderRadius: 15, marginTop: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text600, color: Theme.colors.primary }}>Empower your future with profiter.</Text>
                <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text300, }}>Invest spare change, own real estate today.</Text>
              </View>
              <Image source={require("../../assets/logo.png")} style={{ height: 80, width: 80 }} />
            </View>
          </View> */}

        <View style={{ marginTop: 10, flex: 1 }}>
          <View style={[styles.topBar, { marginBottom: 10 }]}>
            <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text600 }}>Top Assets</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Assets")} style={styles.allJobs}>
              <Text style={{ fontSize: 14, fontFamily: Theme.fonts.text500, color: Theme.colors.primary }}>View More</Text>
              <FontAwesomeIcon icon={faAngleRight} color={Theme.colors.primary} size={14} />
            </TouchableOpacity>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false} data={allAssts.slice(0, 3).sort((a, b) => b.createAt - a.createAt)} style={{ flex: 1, paddingBottom: 10 }}
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
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                    <Text style={{ color: Theme.colors[item.status == "Rented" ? "red" : "primary"], fontSize: 16, fontFamily: Theme.fonts.text500 }}>{item.status}</Text>

                    <TouchableOpacity onPress={() => { setDoc(item); navigation.navigate("AssetDetails"); }}
                      style={{ backgroundColor: Theme.colors.primary, padding: 5, borderRadius: 100, width: 150, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="cart-outline" size={20} color="white" />
                      <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: "white" }}>Rent now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }} />

        </View>
      </View>
    </SafeAreaView >
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


const Tab = createBottomTabNavigator();

export function Homescreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          }
          else if (route.name === 'PostAsset') {
            iconName = focused ? 'add-circle' : 'file-tray-stacked-outline';
          }
          else if (route.name === 'Assets') {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.gray,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Assets" component={Assets} />
      <Tab.Screen name="PostAsset" component={PostAsset} options={{ title: "Post Asset" }} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}