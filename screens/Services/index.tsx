import React, { useState } from 'react'
import { View } from 'react-native'
import BoxList from '../../components/BoxList'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import { useQuery } from 'react-query'
import { getServices, type Service, type Services as ServicesType } from '../../requests/services'
import { commonStyles } from '../../helpers/commonStyles'
import Typography from '../../components/Typography'

type Props = NativeStackScreenProps<RootStackParamList, 'Services'>

export default function Services({ route, navigation }: Props) {
  const officeId = route.params.officeId

  const [services, setServices] = useState<ServicesType>([])
  const { isLoading, isError } = useQuery('get_services', async () => await getServices(officeId), {
    onSuccess: (response) => {
      setServices(response)
    }
  })

  if (isLoading) {
    return (
      <View style={commonStyles.page}>
        <Typography variant="h2">{'Načítám služby'}</Typography>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={commonStyles.page}>
        <Typography variant="h2">{'Nepodařilo se načíst služby'}</Typography>
      </View>
    )
  }

  if (services.length === 0) {
    return (
      <View style={commonStyles.page}>
        <Typography variant="h2">{'Nejsou k dispozici žádné služby'}</Typography>
      </View>
    )
  }

  return (
    <View style={commonStyles.page}>
      <BoxList
        data={services}
        onSelectItem={(service: Service) => {
          navigation.navigate('QueueInfo', { officeId, serviceId: service.id, serviceName: service.name })
        }}
      />
    </View>
  )
}
