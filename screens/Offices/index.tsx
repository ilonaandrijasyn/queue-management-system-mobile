import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { palette } from '../../helpers/theme'
import BoxList from '../../components/BoxList'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import { useQuery } from 'react-query'
import { getOffices } from '../../requests/offices'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gov.blue.dark,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = NativeStackScreenProps<RootStackParamList, 'Offices'>

interface OfficeI {
  id: string
  name: string
}

export default function Offices({ navigation, route }: Props) {
  const organizationId = route.params.organizationId
  const [offices, setOffices] = useState<OfficeI[]>([])
  useQuery('get_offices', async () => await getOffices(organizationId), {
    onSuccess: (response) => {
      setOffices(response)
    }
  })

  return (
    <View style={styles.container}>
      <BoxList
        data={offices}
        onSelectItem={(office: OfficeI) => {
          navigation.navigate('Services', { officeId: office.id, officeName: office.name })
        }}
      />
    </View>
  )
}
