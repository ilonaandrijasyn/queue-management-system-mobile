import React, { useState } from 'react'
import { View } from 'react-native'
import BoxList from '../../components/BoxList'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import { useQuery } from 'react-query'
import {
  getOrganizations,
  type Organization,
  type Organizations as OrganizationsType
} from '../../requests/organizations'
import { commonStyles } from '../../helpers/commonStyles'
import Typography from '../../components/Typography'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function Organizations({ navigation }: Props) {
  const [organizations, setOrganizations] = useState<OrganizationsType>([])
  const { isError, isLoading } = useQuery('get_organizations', async () => await getOrganizations(), {
    onSuccess: setOrganizations
  })

  if (isLoading) {
    return (
      <View style={commonStyles.page}>
        <Typography variant="h2">{'Načítám organizace'}</Typography>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={commonStyles.page}>
        <Typography variant="h2">{'Nepodařilo se načíst organizace'}</Typography>
      </View>
    )
  }

  if (organizations.length === 0) {
    return (
      <View style={commonStyles.page}>
        <Typography variant="h2">{'Nejsou k dispozici žádné organizace'}</Typography>
      </View>
    )
  }

  return (
    <View style={commonStyles.page}>
      <BoxList
        data={organizations}
        onSelectItem={(organization: Organization) => {
          navigation.navigate('Offices', { organizationId: organization.id, organizationName: organization.name })
        }}
      />
    </View>
  )
}
