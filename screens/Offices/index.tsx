import React, { useState } from 'react'
import { View } from 'react-native'
import BoxList from '../../components/BoxList'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import { useQuery } from 'react-query'
import { getOffices } from '../../requests/offices'
import { commonStyles } from '../../helpers/commonStyles'
import Typography from '../../components/Typography'

type Props = NativeStackScreenProps<RootStackParamList, 'Offices'>

interface OfficeI {
  id: string
  name: string
}

export default function Offices({ navigation, route }: Props) {
  const organizationId = route.params.organizationId
  const [offices, setOffices] = useState<OfficeI[]>([])
  const { isLoading, isError } = useQuery('get_offices', async () => await getOffices(organizationId), {
    onSuccess: (response) => {
      setOffices(response)
    }
  })

  if (isLoading) {
    return (
      <View style={commonStyles.page}>
        <Typography variant="h2">{'Načítám pobočky'}</Typography>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={commonStyles.page}>
        <Typography variant="h2">{'Nepodařilo se načíst pobočky'}</Typography>
      </View>
    )
  }

  if (offices.length === 0) {
    return (
      <View style={commonStyles.page}>
        <Typography variant="h2">{'Nejsou k dispozici žádné pobočky'}</Typography>
      </View>
    )
  }

  return (
    <View style={commonStyles.page}>
      <BoxList
        data={offices}
        onSelectItem={(office: OfficeI) => {
          navigation.navigate('Services', { officeId: office.id, officeName: office.name })
        }}
      />
    </View>
  )
}
