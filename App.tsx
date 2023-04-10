import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Organizations from './screens/Organizations'
import { Provider } from 'react-redux'
import { store } from './store'
import Offices from './screens/Offices'
import Services from './screens/Services'
import QueueInfo from './screens/QueueInfo'
import { QueryClient, QueryClientProvider } from 'react-query'
import { socket, WebsocketProvider } from './contexts/WebsocketContext'

export type RootStackParamList = {
  Home: undefined
  Offices: { organizationId: string; organizationName: string }
  Services: { officeId: string; officeName: string }
  QueueInfo: { officeId: string; serviceId: string; serviceName: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const queryClient = new QueryClient()

export default function App() {
  return (
    <WebsocketProvider value={socket}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Organizations} options={{ title: 'Choose organization' }} />
              <Stack.Screen
                name="Offices"
                component={Offices}
                options={({ route }) => ({ title: route.params.organizationName })}
              />
              <Stack.Screen
                name="Services"
                component={Services}
                options={({ route }) => ({ title: route.params.officeName })}
              />
              <Stack.Screen
                name="QueueInfo"
                component={QueueInfo}
                options={({ route }) => ({ title: route.params.serviceName })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </Provider>
    </WebsocketProvider>
  )
}
