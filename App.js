import * as React from 'react';
import { Intro } from './Framework/Screens/Intro';
import { StackNavigator } from './Framework/Navigation/Stack';
import { AppProvider } from './Framework/Components/globalVariables';


export default function App() {

  return (
    <AppProvider>
      <StackNavigator />
    </AppProvider>
  )
}