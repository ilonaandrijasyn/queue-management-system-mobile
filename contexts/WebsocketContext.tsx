import { createContext } from 'react'
import { io, type Socket } from 'socket.io-client'
import { API_URL } from '../helpers/consts'

export const socket = io(API_URL)
export const WebsocketContext = createContext<Socket>(socket)
export const WebsocketProvider = WebsocketContext.Provider
