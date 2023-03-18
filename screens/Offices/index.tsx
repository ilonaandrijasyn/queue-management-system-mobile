import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { palette } from '../../helpers/theme'
import BoxList from '../../components/BoxList'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import { useAppDispatch } from '../../store/hooks'
import { useQuery } from 'react-query'
import { getOffices } from '../../requests/offices'
import { setOfficeId } from '../../store/service/slice'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gov.blue.dark,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = NativeStackScreenProps<RootStackParamList, 'Offices'>

interface OfficesI {
  id: string
  name: string
}

export default function Offices({ navigation, route }: Props) {
  const dispatch = useAppDispatch()
  const organizationId = route.params.organizationId
  const [offices, setOffices] = useState<OfficesI[]>([])
  useQuery('get_offices', async () => await getOffices(organizationId), {
    onSuccess: (response) => {
      setOffices(response)
    }
  })

  return (
    <View style={styles.container}>
      <BoxList
        data={offices}
        onSelectItem={(id: string) => {
          // TODO maybe this is not needed if all vars are passed in props
          dispatch(setOfficeId(id))
          navigation.navigate('Service', { organizationId, officeId: id })
        }}
      />
    </View>
  )
}
