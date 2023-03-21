import { axiosInstance } from '../config/axios'
import { API_URL } from '../helpers/consts'
import { z } from 'zod'
import { generateError } from 'zod-error'

const serviceSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
})

const servicesSchema = z.array(serviceSchema)

export type Service = z.infer<typeof serviceSchema>
export type Services = z.infer<typeof servicesSchema>

export const getServices = async (officeId: string) => {
  const response = await axiosInstance.get(`${API_URL.OFFICES}/${officeId}${API_URL.SERVICES}`)
  const parsedResponse = servicesSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}
