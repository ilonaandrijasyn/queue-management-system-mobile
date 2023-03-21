import { axiosInstance } from '../config/axios'
import { ticketsSchema } from '../types'
import { generateError } from 'zod-error'

export const getAllTicketsForService = async (serviceId: string) => {
  const response = await axiosInstance.get(`tickets/service/${serviceId}`)
  const parsedResponse = ticketsSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}
