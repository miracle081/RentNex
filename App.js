import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Intro } from './Framework/Screeens/Intro';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Lobster_400Regular } from "@expo-google-fonts/lobster"

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({ Lobster_400Regular });
        await Font.loadAsync({});
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
      <Intro />
    </View>
  );
}
