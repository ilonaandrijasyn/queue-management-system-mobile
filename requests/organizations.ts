import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { z } from 'zod'

const officeSchema = z.object({
  id: z.string().uuid()
})

const organizationsSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string()
  })
)

export type Organizations = z.infer<typeof organizationsSchema>

export const getOrganizations = async () => {
  try {
    const response = await axiosInstance.get(API_URL.ORGANIZATIONS)
    const parsedResponse = organizationsSchema.safeParse(response.data)
    if (!parsedResponse.success) {
      // TODO save error state to redux
      return null
    }
    return parsedResponse.data
  } catch (e) {
    // TODO save error to redux
    return null
  }
}
