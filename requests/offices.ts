import { axiosInstance } from '../config/axios'
import { z } from 'zod'
import { getOfficeAddress } from '../helpers/offices'
import { generateError } from 'zod-error'

const officeSchema = z.object({
  id: z.string().uuid(),
  street: z.string(),
  block: z.string(),
  building: z.nullable(z.string()),
  city: z.string(),
  postCode: z.string(),
  countryCode: z.string()
})

const officesSchema = z.array(officeSchema)

export type Office = z.infer<typeof officeSchema>
export type Offices = z.infer<typeof officesSchema>

export const getOffices = async (organizationId: string) => {
  const response = await axiosInstance.get(`/organizations/${organizationId}/offices`)
  const parsedResponse = officesSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data.map((office) => ({
    id: office.id,
    name: getOfficeAddress(office)
  }))
}
