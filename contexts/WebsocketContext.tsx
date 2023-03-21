import { createContext } from 'react'
import { io, type Socket } from 'socket.io-client'

// TODO maybe export base url to const
export const socket = io('http://localhost:3000')
export const WebsocketContext = createContext<Socket>(socket)
export const WebsocketProvider = WebsocketContext.Provider
