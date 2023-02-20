import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import { Provider } from 'react-redux'
import { store } from './store'
import OfficeAddress from './screens/OfficeAddress'

export type RootStackParamList = {
  Home: undefined
  OfficeAddress: { officeId: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Choose' }} />
          <Stack.Screen name="OfficeAddress" component={OfficeAddress} options={{ title: 'Choose address' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
