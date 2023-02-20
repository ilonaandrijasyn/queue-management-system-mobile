import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ServiceState {
  office: string | null
  address: string | null
  service: string | null
}

const initialState: ServiceState = {
  office: null,
  address: null,
  service: null
}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setOffice: (state, action: PayloadAction<string>) => {
      state.service = action.payload
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.service = action.payload
    },
    setService: (state, action: PayloadAction<string>) => {
      state.service = action.payload
    }
  }
})

export const { setOffice, setAddress, setService } = serviceSlice.actions

export default serviceSlice.reducer
