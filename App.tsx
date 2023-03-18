import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Organizations from './screens/Organizations'
import { Provider } from 'react-redux'
import { store } from './store'
import OfficeAddress from './screens/OfficeAddress'
import Service from './screens/Service'
import QueueInfo from './screens/QueueInfo'
import { QueryClient, QueryClientProvider } from 'react-query'

export type RootStackParamList = {
  Home: undefined
  OfficeAddress: { officeId: string }
  Service: { serviceId: string }
  QueueInfo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const queryClient = new QueryClient()

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Organizations} options={{ title: 'Choose office' }} />
            <Stack.Screen name="OfficeAddress" component={OfficeAddress} options={{ title: 'Choose address' }} />
            <Stack.Screen name="Service" component={Service} options={{ title: 'Choose service' }} />
            <Stack.Screen name="QueueInfo" component={QueueInfo} options={{ title: 'Queue info' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}
