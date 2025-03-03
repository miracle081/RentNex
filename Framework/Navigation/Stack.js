import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Intro } from "../Screens/Intro"
import { Homescreen } from "../Screens/Homescreen"
import { SignIn } from "../Screens/SignIn"
import { Profile } from "../Screens/Profile"
import { NavigationContainer } from "@react-navigation/native"
import { EditProfile } from "../Screens/EditProfile"
import { SignUp } from "../Screens/SignUp"
import { FundAccount } from "../Screens/FundAccount"
import { Pay } from "../Screens/Pay"
import { Posts } from "../Screens/Posts"
import { EditPost } from "../Screens/EditPost"
import { AssetDetails } from "../Screens/AssetDetails"
import { ForgotPassword } from "../Screens/ForgotPassword"

const Stack = createNativeStackNavigator()

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Homescreen">
                <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
                <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="FundAccount" component={FundAccount} />
                <Stack.Screen name="Pay" component={Pay} />
                <Stack.Screen name="Posts" component={Posts} />
                <Stack.Screen name="AssetDetails" component={AssetDetails} options={{ title: "Asset Details" }} />
                <Stack.Screen name="EditPost" component={EditPost} options={{ title: "Edit Post" }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: "Forgotten Password" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}