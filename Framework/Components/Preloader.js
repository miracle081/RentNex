import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, } from 'react-native';
// import AnimatedLottieView from 'lottie-react-native';
import { AppContext } from './globalVariables';
import { Theme } from './Theme';

export function Preloader() {
    const { preloader } = useContext(AppContext);
    return (
        <>
            {
                preloader ?
                    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
                        <ActivityIndicator color={Theme.colors.primary} size={"large"} />
                    </View>
                    : null
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d3d3d383',
        zIndex: 2
    },
});

