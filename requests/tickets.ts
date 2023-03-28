import { axiosInstance } from '../config/axios'
import { myTicketSchema, ticketsSchema } from '../types'
import { generateError } from 'zod-error'
import { getPhoneId } from '../helpers/device'
import { z } from 'zod'

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

export const getMyTicket = async (serviceId: string) => {
  const phoneId = await getPhoneId()
  if (phoneId === null) {
    throw new Error('no phone id')
  }
  const response = await axiosInstance.get(`tickets/service/${serviceId}/device/${phoneId}`)
  const parsedResponse = myTicketSchema.safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}

export const createTicket = async (serviceId: string) => {
  const phoneId = await getPhoneId()
  if (phoneId === null) {
    throw new Error('no phone id')
  }
  return await axiosInstance.post('tickets/create', { serviceId, phoneId })
}

export const getMyTicketsCount = async () => {
  const phoneId = await getPhoneId()
  if (phoneId === null) {
    throw new Error('no phone id')
  }
  const response = await axiosInstance.get(`tickets/device/${phoneId}`)
  const parsedResponse = z.number().safeParse(response.data)
  if (!parsedResponse.success) {
    const e = generateError(parsedResponse.error)
    console.error(e.message)
    throw e
  }
  return parsedResponse.data
}
