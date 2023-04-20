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

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function Organizations({ navigation }: Props) {
  const [organizations, setOrganizations] = useState<OrganizationsType>([])
  const { isError } = useQuery('get_organizations', async () => await getOrganizations(), {
    onSuccess: setOrganizations
  })

  return (
    <View style={commonStyles.page}>
      {isError ? (
        'Nepodařilo se načíst organizace'
      ) : (
        <BoxList
          data={organizations}
          onSelectItem={(organization: Organization) => {
            navigation.navigate('Offices', { organizationId: organization.id, organizationName: organization.name })
          }}
        />
      )}
    </View>
  )
}
