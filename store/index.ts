import { configureStore } from '@reduxjs/toolkit'
import serviceSlice from './service/slice'

export const store = configureStore({
  reducer: {
    service: serviceSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
