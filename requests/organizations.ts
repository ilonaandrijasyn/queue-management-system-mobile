import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { z } from 'zod'
import { generateError } from 'zod-error'

const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

const organizationsSchema = z.array(organizationSchema)

export type Organization = z.infer<typeof organizationSchema>

export type Organizations = z.infer<typeof organizationsSchema>

export const getOrganizations = async () => {
  const response = await axiosInstance.get(API_URL.ORGANIZATIONS)
  const parsedResponse = organizationsSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}
