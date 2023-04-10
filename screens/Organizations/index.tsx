import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import BoxList from '../../components/BoxList'
import { palette } from '../../helpers/theme'
import { useAppDispatch } from '../../store/hooks'
import { setOrganizationId } from '../../store/service/slice'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { type RootStackParamList } from '../../App'
import { useQuery } from 'react-query'
import {
  getOrganizations,
  type Organization,
  type Organizations as OrganizationsType
} from '../../requests/organizations'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gov.blue.dark,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function Organizations({ navigation }: Props) {
  const dispatch = useAppDispatch()
  const [organizations, setOrganizations] = useState<OrganizationsType>([])
  useQuery('get_organizations', async () => await getOrganizations(), {
    onSuccess: setOrganizations
  })

  return (
    <View style={styles.container}>
      <BoxList
        data={organizations}
        onSelectItem={(organization: Organization) => {
          // TODO maybe this is not needed if all vars are passed in props
          dispatch(setOrganizationId(organization.id))
          navigation.navigate('Offices', { organizationId: organization.id, organizationName: organization.name })
        }}
      />
    </View>
  )
}
