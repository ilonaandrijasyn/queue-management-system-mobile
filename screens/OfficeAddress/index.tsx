import React from 'react'
import { StyleSheet, View } from 'react-native'
import { palette } from '../../helpers/theme'
import BoxList from '../../components/BoxList'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gov.blue.dark,
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    color: 'red',
    backgroundColor: 'blue'
  }
})

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Pobocka 1'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Pobocka 2'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Pobocka 3'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d472',
    title: 'Pobocka 4'
  }
]

type Props = NativeStackScreenProps<RootStackParamList, 'OfficeAddress'>

export default function OfficeAddress({ route }: Props) {
  const officeId = route.params.officeId
  console.log(officeId)
  return (
    <View style={styles.container}>
      <BoxList
        data={data}
        onSelectItem={(id: string) => {
          console.log('selected', id)
        }}
      />
    </View>
  )
}
