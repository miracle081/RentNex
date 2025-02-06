import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Intro } from "../Screeens/Intro"
import { Homescreen } from "../Screeens/Homescreen"
import { SignIn } from "../Screeens/SignIn"
import { NavigationContainer } from "@react-navigation/native"

const Stack = createNativeStackNavigator()

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Homescreen" component={Homescreen} />
                <Stack.Screen name="SignIn" component={SignIn} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
