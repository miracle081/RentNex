import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Intro } from "../Screens/Intro"
import { Homescreen } from "../Screens/Homescreen"
import { SignIn } from "../Screens/SignIn"
import { Profile } from "../Screens/Profile"
import { NavigationContainer } from "@react-navigation/native"
import { EditProfile } from "../Screens/EditProfile"

const Stack = createNativeStackNavigator()

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Intro">
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
