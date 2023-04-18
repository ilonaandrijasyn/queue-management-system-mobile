import React, { useState } from 'react'
import { View } from 'react-native'
import BoxList from '../../components/BoxList'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import { useQuery } from 'react-query'
import { getServices, type Service, type Services as ServicesType } from '../../requests/services'
import { commonStyles } from '../../helpers/commonStyles'

type Props = NativeStackScreenProps<RootStackParamList, 'Services'>

export default function Services({ route, navigation }: Props) {
  const officeId = route.params.officeId

  const [services, setServices] = useState<ServicesType>([])
  useQuery('get_services', async () => await getServices(officeId), {
    onSuccess: (response) => {
      setServices(response)
    }
  })

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
