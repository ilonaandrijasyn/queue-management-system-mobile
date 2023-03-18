import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { z } from 'zod'
import { getOfficeAddress } from '../helpers/offices'

const officeSchema = z.object({
  id: z.string().uuid(),
  street: z.string(),
  block: z.string(),
  building: z.nullable(z.string()),
  city: z.string(),
  postCode: z.string(),
  country: z.string()
})

const officesSchema = z.array(officeSchema)

export type Office = z.infer<typeof officeSchema>
export type Offices = z.infer<typeof officesSchema>

export const getOffices = async (organizationId: string) => {
  try {
    const response = await axiosInstance.get(`${API_URL.ORGANIZATIONS}/${organizationId}/offices`)
    const parsedResponse = officesSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      // TODO save error state to redux
      return []
    }
    return parsedResponse.data.map((office) => ({
      id: office.id,
      name: getOfficeAddress(office)
    }))
  } catch (e) {
    // TODO save error to redux
    return []
  }
}
