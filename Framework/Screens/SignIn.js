import { StyleSheet, Text, View } from 'react-native'
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../Components/globalVariables';

export function SignIn({ navigation, route }) {
    const { userInfo, userUID } = useContext(AppContext)
    console.log(userInfo);


    const { userID } = route.params
    return (
        <SafeAreaView>
            <View>
                <Text>SignIn</Text>
                <Text>User Id: {userID}, {userUID}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})