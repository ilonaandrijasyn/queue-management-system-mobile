import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Organizations from './screens/Organizations'
import { Provider } from 'react-redux'
import { store } from './store'
import Offices from './screens/Offices'
import Service from './screens/Service'
import QueueInfo from './screens/QueueInfo'
import { QueryClient, QueryClientProvider } from 'react-query'

export type RootStackParamList = {
  Home: undefined
  Offices: { organizationId: string }
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
            <Stack.Screen name="Home" component={Organizations} options={{ title: 'Choose organization' }} />
            <Stack.Screen name="Offices" component={Offices} options={{ title: 'Choose office' }} />
            <Stack.Screen name="Service" component={Service} options={{ title: 'Choose service' }} />
            <Stack.Screen name="QueueInfo" component={QueueInfo} options={{ title: 'Queue info' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}
