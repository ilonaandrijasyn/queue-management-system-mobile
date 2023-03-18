import React from 'react'
import { StyleSheet, View } from 'react-native'
import { palette } from '../../helpers/theme'
import BoxList from '../../components/BoxList'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import { useAppDispatch } from '../../store/hooks'
import { setService } from '../../store/service/slice'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gov.blue.dark,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Vyzvednuti zasilky'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Poslani balicku'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Czech point'
  }
]

type Props = NativeStackScreenProps<RootStackParamList, 'Service'>

export default function Service({ route, navigation }: Props) {
  const dispatch = useAppDispatch()
  // TODO is it better to get this from state?
  const serviceId = route.params.serviceId
  console.log(serviceId)
  return (
    <View style={styles.container}>
      <BoxList
        data={data}
        onSelectItem={(id: string) => {
          dispatch(setService(id))
          navigation.navigate('QueueInfo')
        }}
      />
    </View>
  )
}
